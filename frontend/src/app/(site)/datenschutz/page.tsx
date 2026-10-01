import Link from "next/link";

import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Prose } from "@/components/ui/prose";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { licenses } from "@/content/licenses";
import { videos } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Datenschutz",
  description: `Datenschutzerklärung von ${siteConfig.name}: welche Daten beim Besuch dieser Website verarbeitet werden – und welche nicht.`,
  path: "/datenschutz",
  noIndex: true,
});

/*
 * TODO vor dem Livegang:
 * - Hosting prüfen: Stand jetzt Vercel (Vorschau). Bei anderem Hoster Abschnitt 2 anpassen.
 * - Auftragsverarbeitungsverträge (Art. 28 DSGVO) abschließen: mit Resend (Versand des
 *   Kontaktformulars, resend.com/legal/dpa) und mit IONOS (Postfach, IONOS-Kundenbereich) –
 *   Abschnitt 6, lib/mail.ts.
 * - Text juristisch prüfen lassen (Anwalt oder Generator, z. B. e-recht24).
 */
export default function DatenschutzPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        compact
        eyebrow="Rechtliches"
        breadcrumb="Datenschutz"
        path="/datenschutz"
        video={videos.umzugskartons}
        title="Datenschutzerklärung"
      />
      <Section>
        <Container>
          <Prose>
            <p>Stand: September 2026</p>

            <h2>1. Verantwortlicher</h2>
            <p>
              {siteConfig.name}, Inhaber {siteConfig.owner}
              <br />
              {contact.address.street}, {contact.address.zip} {contact.address.city}
              <br />
              Telefon: {contact.phone}
              <br />
              E-Mail: <a href={contact.emailHref}>{contact.email}</a>
            </p>

            <h2>2. Hosting und Server-Logfiles</h2>
            <p>
              Diese Website wird bei der Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, USA
              gehostet. Beim Aufruf einer Seite verarbeitet der Server automatisch technisch notwendige
              Daten: IP-Adresse, Datum und Uhrzeit, aufgerufene Seite, Referrer-URL sowie Browser und
              Betriebssystem. Das ist erforderlich, um die Website auszuliefern und ihre Sicherheit zu
              gewährleisten (Art. 6 Abs. 1 lit. f DSGVO). Eine Übermittlung in die USA erfolgt auf
              Grundlage des EU-US Data Privacy Framework bzw. von Standardvertragsklauseln. Die Logfiles
              werden nach kurzer Zeit automatisch gelöscht.
            </p>

            <h2>3. Keine Cookies, kein Tracking</h2>
            <p>
              Diese Website setzt keine Cookies und verwendet keine Analyse-, Tracking- oder
              Werbedienste. Es gibt deshalb auch kein Cookie-Banner.
            </p>

            <h2>4. Schriftarten</h2>
            <p>
              Die verwendeten Schriftarten (Outfit und Instrument Serif) sind lokal auf unserem Server
              eingebunden. Beim Seitenaufruf wird keine Verbindung zu Google Fonts oder anderen
              Schriftanbietern aufgebaut.
            </p>

            <h2>5. Bilder und Videos</h2>
            <p>
              Alle Fotos und Hintergrundvideos liegen auf unserem eigenen Server und werden von dort
              ausgeliefert. Beim Anzeigen entsteht keine Verbindung zu den Bildplattformen, von denen
              sie stammen (Pexels, Unsplash) – es werden also keine Daten an diese Anbieter übertragen.
              Die Videos laufen stumm, enthalten keine Tracking-Funktionen und werden nicht geladen, wenn
              Ihr Gerät den Datensparmodus oder die Einstellung „Bewegung reduzieren“ nutzt; über den
              Pause-Knopf im Banner können Sie sie jederzeit anhalten.
            </p>
            <p>
              Nutzungsrechte: Die Medien verwenden wir unter der{" "}
              <a href={licenses.Pexels.url} target="_blank" rel="noopener noreferrer">
                {licenses.Pexels.name}
              </a>{" "}
              bzw. der{" "}
              <a href={licenses.Unsplash.url} target="_blank" rel="noopener noreferrer">
                {licenses.Unsplash.name}
              </a>
              . Die einzelnen Urheberinnen und Urheber finden Sie im{" "}
              <Link href="/impressum#bildnachweis">Bild- und Videonachweis im Impressum</Link>.
            </p>

            <h2>6. Kontaktformular</h2>
            <p>
              Wenn Sie uns über das Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben (Name,
              E-Mail, optional Telefon, Leistung, Termin, Postleitzahlen und Nachricht) zur Bearbeitung
              der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert (Art. 6 Abs. 1 lit. b
              DSGVO). Die Daten löschen wir, sobald sie für die Bearbeitung nicht mehr erforderlich sind
              und keine gesetzlichen Aufbewahrungspflichten bestehen.
            </p>
            <p>
              Ihre Angaben werden verschlüsselt an unseren Server übertragen und von dort über den
              E-Mail-Versanddienst Resend (Plus Five Five, Inc., 2261 Market Street #5039, San Francisco,
              CA 94114, USA) als E-Mail (TLS-verschlüsselt) an unser Postfach bei unserem E-Mail-Anbieter
              IONOS SE, Elgendorfer Str. 57, 56410 Montabaur, weitergeleitet. Resend verarbeitet die Daten
              in unserem Auftrag auf Grundlage eines Auftragsverarbeitungsvertrags; der Versand läuft
              über Server in der EU (Irland). Eine Übermittlung in die USA ist dabei nicht
              ausgeschlossen und erfolgt auf Grundlage des EU-US Data Privacy Framework bzw. von
              Standardvertragsklauseln. Andere Dienste sind am Versand nicht beteiligt. Zum Schutz vor massenhaft automatisiert abgeschickten Anfragen hält der Server Ihre
              IP-Adresse kurzzeitig im Arbeitsspeicher vor; dauerhaft gespeichert wird sie dafür nicht
              (Art. 6 Abs. 1 lit. f DSGVO).
            </p>

            <h2>7. Kontakt per Telefon, E-Mail und WhatsApp</h2>
            <p>
              Wenn Sie uns anrufen oder schreiben, verarbeiten wir Ihre Angaben zur Bearbeitung Ihres
              Anliegens (Art. 6 Abs. 1 lit. b DSGVO). Die WhatsApp-Schaltflächen sind einfache Links:
              Erst wenn Sie darauf tippen, öffnet sich WhatsApp (WhatsApp Ireland Ltd., Merrion Road,
              Dublin 4, Irland). Für die Verarbeitung innerhalb von WhatsApp gelten die
              Datenschutzbestimmungen von WhatsApp.
            </p>

            <h2>8. Link zu Google Maps</h2>
            <p>
              Unsere Adresse ist mit Google Maps verlinkt. Eine Karte ist nicht eingebettet – Daten an
              Google werden erst übertragen, wenn Sie den Link aktiv anklicken.
            </p>

            <h2>9. Kundenbewertungen von MyHammer</h2>
            <p>
              Auf unserer Startseite zeigen wir ausgewählte Bewertungen, die Kundinnen und Kunden öffentlich
              auf unserem Profil bei MyHammer (MyHammer GmbH, Dircksenstr. 4, 10179 Berlin) abgegeben haben.
              Die Texte sind fest in diese Website übernommen: Es wird kein Widget geladen, und beim
              Seitenaufruf werden keine Daten an MyHammer übertragen. Erst wenn Sie einen Link zu MyHammer
              anklicken, gelten dort die Datenschutzbestimmungen von MyHammer.
            </p>
            <p>
              Von den Verfasserinnen und Verfassern nennen wir nur den Vornamen mit abgekürztem Nachnamen
              (bei anonymen Bewertungen „MyHammer-Kunde“) sowie den Ort, jeweils wie auf MyHammer angegeben.
              Grundlage ist unser berechtigtes Interesse, öffentlich abgegebene Bewertungen unseres Betriebs
              zu zeigen (Art. 6 Abs. 1 lit. f DSGVO). Wer seine Bewertung hier nicht sehen möchte, kann
              jederzeit widersprechen – eine kurze Nachricht genügt, dann entfernen wir sie.
            </p>

            <h2>10. Ihre Rechte</h2>
            <ul>
              <li>Auskunft über Ihre gespeicherten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung, Löschung oder Einschränkung der Verarbeitung (Art. 16–18 DSGVO)</li>
              <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Beschwerde bei einer Aufsichtsbehörde, z. B. der Landesbeauftragten für Datenschutz und
                Informationsfreiheit Nordrhein-Westfalen (Art. 77 DSGVO)
              </li>
            </ul>
            <p>
              Für alle Anliegen genügt eine formlose Nachricht an{" "}
              <a href={contact.emailHref}>{contact.email}</a>.
            </p>
          </Prose>
        </Container>
      </Section>
    </>
  );
}
