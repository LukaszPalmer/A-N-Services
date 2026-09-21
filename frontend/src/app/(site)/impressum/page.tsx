import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = {
  ...createMetadata({
    title: "Impressum",
    description: `Impressum und Anbieterkennzeichnung von ${siteConfig.name}.`,
    path: "/impressum",
  }),
  robots: { index: false },
};

// TODO: Restliche rechtsverbindliche Angaben vom Kunden einholen
// (Anschrift, Telefon, Rechtsform, USt-IdNr., ggf. Handelsregister und Aufsichtsbehörde)
export default function ImpressumPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero eyebrow="Rechtliches" breadcrumb="Impressum" title="Impressum" />
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
              Telefon: {contact.phone}
              <br />
              E-Mail: <a href={contact.emailHref}>{contact.email}</a>
              <br />
              Erreichbarkeit: {contact.openingHoursNote}
            </p>

            <h2>Verantwortlich für den Inhalt</h2>
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
          </Prose>
        </Container>
      </Section>
    </>
  );
}
