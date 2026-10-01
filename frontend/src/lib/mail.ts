import "server-only";

import { Resend } from "resend";

import { siteConfig } from "@/config/site";

export type OutgoingMail = {
  subject: string;
  text: string;
  html: string;
  /** Antwortadresse – bei Kontaktanfragen die Person, die angefragt hat */
  replyTo?: { name: string; address: string };
};

/** Absender – die Domain ist bei Resend verifiziert (DNS: `resend._domainkey`, `send`) */
const fromAddress = `website@${siteConfig.contact.email.split("@")[1]}`;

/** Anzeigename für Mail-Header: Zeichen entfernen, die die Adressangabe zerschießen würden */
function displayName(name: string) {
  return `"${name.replace(/["<>\\\r\n]/g, "").trim()}"`;
}

/**
 * Verschickt eine E-Mail über Resend an unsere Kontaktadresse (`siteConfig.contact.email`),
 * zugestellt wird sie ins IONOS-Postfach.
 *
 * Der API-Key kommt nur aus der Umgebungsvariable `RESEND_API_KEY`: lokal aus `.env.local`, live aus
 * Vercel (Settings → Environment Variables). Das Repository ist öffentlich – Schlüssel gehören
 * weder in den Code noch in `.env.example`.
 *
 * Die anfragende Person steht in Reply-To, "Antworten" im Postfach schreibt also direkt ihr.
 */
export async function sendMail({ subject, text, html, replyTo }: OutgoingMail) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) throw new Error("RESEND_API_KEY ist nicht gesetzt.");

  const { error } = await new Resend(apiKey).emails.send({
    from: `${displayName(`${siteConfig.name} · Website`)} <${fromAddress}>`,
    to: siteConfig.contact.email,
    replyTo: replyTo ? `${displayName(replyTo.name)} <${replyTo.address}>` : undefined,
    subject,
    text,
    html,
  });
  // Resend wirft nicht, sondern meldet Fehler im Rückgabewert
  if (error) throw new Error(`Resend: ${error.name} – ${error.message}`);
}
