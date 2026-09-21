import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { createMetadata } from "@/lib/metadata";

export const metadata = {
  ...createMetadata({
    title: "Datenschutz",
    description: `Datenschutzerklärung von ${siteConfig.name}.`,
    path: "/datenschutz",
  }),
  robots: { index: false },
};

// TODO: Vollständige Datenschutzerklärung (z. B. über einen Generator oder Anwalt) einfügen,
// sobald Hosting, Kontaktformular-Backend und ggf. Analytics feststehen.
export default function DatenschutzPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero eyebrow="Rechtliches" breadcrumb="Datenschutz" title="Datenschutzerklärung" />
      <Section>
        <Container>
          <Prose>
            <h2>1. Verantwortlicher</h2>
            <p>
              {siteConfig.name}, {contact.address.street}, {contact.address.zip} {contact.address.city}
              <br />
              E-Mail: <a href={contact.emailHref}>{contact.email}</a>
            </p>

            <h2>2. Kontaktformular</h2>
            <p>
              Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben zur
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
            </p>

            <h2>3. Ihre Rechte</h2>
            <ul>
              <li>Auskunft über Ihre gespeicherten Daten</li>
              <li>Berichtigung, Löschung oder Einschränkung der Verarbeitung</li>
              <li>Widerspruch gegen die Verarbeitung</li>
              <li>Datenübertragbarkeit</li>
            </ul>

            <p>[Platzhalter – vollständige Datenschutzerklärung folgt]</p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
