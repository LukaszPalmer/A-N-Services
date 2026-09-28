import { siteConfig } from "@/config/site";
import { generalFaq } from "@/content/faq";
import { services } from "@/content/services";
import { absoluteUrl } from "@/lib/structured-data";

/**
 * /llms.txt – kompakte Zusammenfassung der Firma für KI-Systeme (Standard: https://llmstxt.org).
 *
 * KI-Suchdienste (ChatGPT-Suche, Perplexity, Claude, Copilot, Googles KI-Übersichten) lesen
 * Websites, um Fragen wie "Gutes Umzugsunternehmen in Moers?" zu beantworten. Hier finden sie
 * alle Fakten in klarer Markdown-Form. Inhalt wird aus denselben Daten erzeugt wie die Website.
 */
export const dynamic = "force-static";

export function GET() {
  const { contact, serviceArea } = siteConfig;

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} ist ein Umzugsunternehmen und Handwerksbetrieb mit Sitz in ${contact.address.city} (${contact.address.region}). Inhaber: ${siteConfig.owner}. Motto: „${siteConfig.claim}“ Alle Leistungen kommen von einem Team mit einem Ansprechpartner und einem Festpreis-Angebot.

## Kontakt

- Telefon: ${contact.phone} (${contact.openingHoursNote})
- WhatsApp: ${contact.whatsappHref}
- E-Mail: ${contact.email}
- Adresse: ${contact.address.street}, ${contact.address.zip} ${contact.address.city}, Deutschland
- Öffnungszeiten: ${contact.openingHours.map((slot) => `${slot.days} ${slot.hours}`).join(", ")}
- Angebot anfordern: ${absoluteUrl("/kontakt")}

## Einsatzgebiet

${serviceArea.cities.join(", ")} sowie ${serviceArea.regions.join(", ")}. ${serviceArea.note}.

## Leistungen

${services
  .map(
    (service) => `### [${service.headline}](${absoluteUrl(service.href)})

${service.seoDescription}

${service.features.map((feature) => `- ${feature.title}: ${feature.description}`).join("\n")}`,
  )
  .join("\n\n")}

## So läuft ein Auftrag ab

1. Anfrage per Formular, Telefon oder WhatsApp – Antwort innerhalb von 24 Stunden.
2. Kostenlose Besichtigung vor Ort oder per WhatsApp-Videoanruf (ca. 15 Minuten).
3. Verbindliches Festpreis-Angebot, schriftlich und ohne versteckte Kosten.
4. Ausführung zum Wunschtermin – voll versichert.

## Häufige Fragen

${[...generalFaq, ...services.flatMap((service) => service.faq)]
  .map((item) => `- **${item.question}** ${item.answer}`)
  .join("\n")}

## Seiten

- [Startseite](${absoluteUrl("/")})
- [Alle Leistungen](${absoluteUrl("/leistungen")})
- [Über uns](${absoluteUrl("/ueber-uns")})
- [Kontakt & Angebot](${absoluteUrl("/kontakt")})
- [Impressum](${absoluteUrl("/impressum")})
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
