import "server-only";

import { createTransport } from "nodemailer";

import { siteConfig } from "@/config/site";

export type OutgoingMail = {
  subject: string;
  text: string;
  html: string;
  /** Antwortadresse – bei Kontaktanfragen die Person, die angefragt hat */
  replyTo?: { name: string; address: string };
};

/**
 * Verschickt eine E-Mail über das IONOS-Postfach an unsere Kontaktadresse (`siteConfig.contact.email`).
 *
 * Zugangsdaten kommen nur aus Umgebungsvariablen: lokal aus `.env.local`, live aus Vercel
 * (Settings → Environment Variables). Das Repository ist öffentlich – Passwörter gehören
 * weder in den Code noch in `.env.example`.
 *
 * Absender ist das Postfach selbst (IONOS nimmt nur eigene Absenderadressen an). Die anfragende
 * Person steht in Reply-To, "Antworten" im Postfach schreibt also direkt ihr.
 */
export async function sendMail({ subject, text, html, replyTo }: OutgoingMail) {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;
  if (!user || !pass) throw new Error("SMTP_USER oder SMTP_PASSWORD ist nicht gesetzt.");

  const port = Number(process.env.SMTP_PORT || 465);
  const transporter = createTransport({
    host: process.env.SMTP_HOST || "smtp.ionos.de",
    port,
    // 465: verschlüsselt ab dem ersten Byte · 587: STARTTLS, Verschlüsselung erzwungen
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    connectionTimeout: 10_000,
    greetingTimeout: 10_000,
    socketTimeout: 20_000,
  });

  try {
    await transporter.sendMail({
      from: { name: `${siteConfig.name} · Website`, address: user },
      to: siteConfig.contact.email,
      replyTo,
      subject,
      text,
      html,
    });
  } finally {
    transporter.close();
  }
}
