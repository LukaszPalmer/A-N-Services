"use server";

import { headers } from "next/headers";

import { siteConfig } from "@/config/site";
import { buildContactEmail } from "@/lib/contact/email";
import {
  contactFields,
  formText,
  HONEYPOT_FIELD,
  parseContactRequest,
  type ContactFormState,
} from "@/lib/contact/request";
import { sendMail } from "@/lib/mail";

const successState: ContactFormState = {
  status: "success",
  message: "Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
};

const failureMessage = `Die Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an: ${siteConfig.contact.phone}`;

/**
 * Bremse gegen Massen-Absendungen: höchstens 5 Anfragen pro IP-Adresse in 10 Minuten.
 * Liegt nur im Arbeitsspeicher der jeweiligen Server-Instanz – kein vollständiger Schutz,
 * aber genug gegen einen Bot, der dasselbe Formular im Sekundentakt abschickt.
 */
const rateLimit = { max: 5, windowMs: 10 * 60_000 };
const recentByIp = new Map<string, number[]>();

function isRateLimited(ip: string) {
  const now = Date.now();

  // Abgelaufene Einträge sofort verwerfen – IP-Adressen werden nicht länger als nötig vorgehalten
  for (const [key, times] of recentByIp) {
    const fresh = times.filter((time) => now - time < rateLimit.windowMs);
    if (fresh.length > 0) recentByIp.set(key, fresh);
    else recentByIp.delete(key);
  }
  // Speicher begrenzen, falls sehr viele verschiedene Adressen auf einmal senden
  if (recentByIp.size >= 1000) recentByIp.clear();

  const recent = [...(recentByIp.get(ip) ?? []), now];
  recentByIp.set(ip, recent);
  return recent.length > rateLimit.max;
}

async function clientIp() {
  const list = await headers();
  return list.get("x-real-ip") ?? list.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unbekannt";
}

/**
 * Kontaktformular absenden: prüfen und als E-Mail ins IONOS-Postfach schicken (siehe lib/mail.ts).
 * Server Actions sind öffentlich per POST erreichbar – deshalb wird hier alles erneut geprüft.
 */
export async function submitContactForm(_previous: ContactFormState, formData: FormData): Promise<ContactFormState> {
  // Spam-Falle: Das unsichtbare Feld füllen nur Bots aus. Sie bekommen die normale
  // Erfolgsmeldung, damit sie nichts dazulernen – verschickt wird nichts.
  if (formText(formData, HONEYPOT_FIELD)) return successState;

  // Eingaben für den Fehlerfall zurückgeben (gekürzt – die Antwort geht an den Browser zurück)
  const values = Object.fromEntries(contactFields.map((field) => [field, formText(formData, field).slice(0, 6000)]));

  const parsed = parseContactRequest(formData);
  if (parsed.errors) {
    return { status: "error", message: "Bitte prüfen Sie die markierten Angaben.", errors: parsed.errors, values };
  }

  if (isRateLimited(await clientIp())) {
    return {
      status: "error",
      message: `Es wurden gerade sehr viele Anfragen gesendet. Bitte versuchen Sie es später noch einmal oder rufen Sie uns an: ${siteConfig.contact.phone}`,
      values,
    };
  }

  const { request } = parsed;
  try {
    await sendMail({
      ...buildContactEmail(request, new Date()),
      replyTo: { name: request.name, address: request.email },
    });
    return successState;
  } catch (error) {
    // Nur die technische Ursache loggen – keine Angaben aus dem Formular
    console.error("[Kontaktformular] Versand fehlgeschlagen:", error instanceof Error ? error.message : error);
    return { status: "error", message: failureMessage, values };
  }
}
