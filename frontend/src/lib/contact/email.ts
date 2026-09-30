import { siteConfig } from "@/config/site";
import { contactServiceLabel, type ContactRequest } from "@/lib/contact/request";
import { formatDate } from "@/lib/utils";

/** Alles, was aus dem Formular kommt, wird vor dem Einsetzen ins HTML maskiert */
function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * E-Mail an unser Postfach zu einer Kontaktanfrage – als Klartext und als schlichtes HTML
 * (Tabellen und Inline-Styles, damit es auch in Outlook & Co. ordentlich aussieht).
 */
export function buildContactEmail(request: ContactRequest, receivedAt: Date) {
  const service = contactServiceLabel(request.service);
  const received = new Intl.DateTimeFormat("de-DE", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "Europe/Berlin",
  }).format(receivedAt);
  const website = new URL(siteConfig.url).host;
  const route = request.fromZip || request.toZip ? `${request.fromZip || "–"} → ${request.toZip || "–"}` : "–";
  const phoneHref = request.phone.replace(/[^\d+]/g, "");

  // [Bezeichnung, Klartext, optional HTML mit Link]
  const rows: [string, string, string?][] = [
    ["Name", request.name],
    ["E-Mail", request.email, `<a href="mailto:${escapeHtml(request.email)}" style="color:#ea520c">${escapeHtml(request.email)}</a>`],
    [
      "Telefon",
      request.phone || "–",
      request.phone && phoneHref
        ? `<a href="tel:${escapeHtml(phoneHref)}" style="color:#ea520c">${escapeHtml(request.phone)}</a>`
        : undefined,
    ],
    ["Leistung", service],
    ["Wunschtermin", request.date ? formatDate(request.date) : "–"],
    ["Von → nach (PLZ)", route],
  ];

  const subject = `Neue Anfrage: ${service} – ${request.name}`;

  const text = [
    `Neue Anfrage über das Kontaktformular auf ${website}`,
    "",
    ...rows.map(([label, value]) => `${label}: ${value}`),
    "",
    "Nachricht:",
    request.message,
    "",
    "---",
    `Eingegangen am ${received} Uhr · Einwilligung zur Datenschutzerklärung erteilt.`,
    `Einfach auf diese E-Mail antworten – die Antwort geht direkt an ${request.name}.`,
  ].join("\n");

  const html = `<!doctype html>
<html lang="de">
<body style="margin:0;padding:0;background:#f5efe6;font-family:Arial,Helvetica,sans-serif;color:#0a1320">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f5efe6;padding:24px 12px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden">
<tr><td style="background:#0a1320;padding:22px 28px;color:#ffffff;font-size:18px;font-weight:bold">
Neue Anfrage <span style="color:#ff8a3d">·</span> ${escapeHtml(service)}
</td></tr>
<tr><td style="padding:24px 28px">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="font-size:15px;line-height:1.5">
${rows
  .map(
    ([label, value, htmlValue]) =>
      `<tr><td style="padding:6px 16px 6px 0;color:#4a6382;white-space:nowrap;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;font-weight:bold;vertical-align:top">${htmlValue ?? escapeHtml(value)}</td></tr>`,
  )
  .join("\n")}
</table>
<p style="margin:24px 0 8px;color:#4a6382;font-size:12px;letter-spacing:0.08em;text-transform:uppercase">Nachricht</p>
<div style="padding:16px 18px;background:#fbf8f4;border-radius:12px;font-size:15px;line-height:1.6">${escapeHtml(request.message).replace(/\n/g, "<br>")}</div>
<p style="margin:24px 0 0;font-size:14px;color:#354c68">Einfach auf diese E-Mail antworten – die Antwort geht direkt an ${escapeHtml(request.name)}.</p>
</td></tr>
<tr><td style="padding:16px 28px;background:#fbf8f4;font-size:12px;line-height:1.5;color:#4a6382">
Eingegangen am ${escapeHtml(received)} Uhr über das Kontaktformular auf ${escapeHtml(website)} · Einwilligung zur Datenschutzerklärung erteilt.
</td></tr>
</table>
</td></tr>
</table>
</body>
</html>`;

  return { subject, text, html };
}
