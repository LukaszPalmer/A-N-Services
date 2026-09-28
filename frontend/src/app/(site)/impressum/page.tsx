import { MediaCredits } from "@/components/sections/media-credits";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { videos } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Impressum",
  description: `Impressum und Anbieterkennzeichnung von ${siteConfig.name}, Inhaber ${siteConfig.owner}, ${siteConfig.contact.address.city}.`,
  path: "/impressum",
  noIndex: true,
});

// TODO: Restliche rechtsverbindliche Angaben vom Kunden einholen
// (Rechtsform, USt-IdNr., ggf. Handelsregister, Handwerkskammer und Aufsichtsbehörde)
export default function ImpressumPage() {
  const { contact, webdesign } = siteConfig;

  return (
    <>
      <PageHero
        compact
        eyebrow="Rechtliches"
        breadcrumb="Impressum"
        path="/impressum"
        video={videos.umzugskartons}
        title="Impressum"
      />
      <Section>
        <Container>
          <Prose>
            <h2>Angaben gemäß § 5 DDG</h2>
            <p>
              {siteConfig.name}
              <br />
              Inhaber: {siteConfig.owner}
              <br />
              {contact.address.street}
              <br />
              {contact.address.zip} {contact.address.city}
            </p>

            <h2>Kontakt</h2>
            <p>
              Telefon: <a href={contact.phoneHref}>{contact.phone}</a>
              <br />
              E-Mail: <a href={contact.emailHref}>{contact.email}</a>
              <br />
              Erreichbarkeit: {contact.openingHoursNote}
            </p>

            <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
            <p>
              {siteConfig.owner}, {contact.address.street}, {contact.address.zip}{" "}
              {contact.address.city}
            </p>

            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: [DE000000000]</p>

            <h2>Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>

            <MediaCredits />

            <h2>Webdesign &amp; Umsetzung</h2>
            <p>
              Konzeption, Design und Entwicklung dieser Website:{" "}
              <a href={webdesign.url} target="_blank" rel="noopener">
                {webdesign.name}
              </a>
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
