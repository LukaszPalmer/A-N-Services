import { Clock, Mail, MapPin, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Kontakt",
  description: `Jetzt kostenloses Angebot anfordern: Kontaktieren Sie ${siteConfig.name} per Formular, Telefon oder WhatsApp.`,
  path: "/kontakt",
});

export default function KontaktPage() {
  const { contact } = siteConfig;

  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        breadcrumb="Kontakt"
        title={
          <>
            Lassen Sie uns über Ihr <span className="text-brand-400">Vorhaben</span> sprechen.
          </>
        }
        description="Kostenlos und unverbindlich: Schreiben Sie uns oder rufen Sie an – wir sind rund um die Uhr erreichbar und melden uns innerhalb von 24 Stunden mit einem Festpreis-Angebot."
      />

      <Section tone="sand">
        <Container className="grid items-start gap-8 lg:grid-cols-12">
          <div className="rounded-5xl bg-white p-6 shadow-lifted ring-1 ring-ink-900/5 sm:p-10 lg:col-span-7">
            <h2 className="text-2xl font-semibold text-ink-950 sm:text-3xl">Anfrage senden</h2>
            <p className="mt-2 text-ink-600">Je mehr wir wissen, desto genauer wird Ihr Angebot.</p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-4 lg:col-span-5">
            <ContactCard icon={Phone} title="Telefon" href={contact.phoneHref}>
              {contact.phone}
            </ContactCard>
            <ContactCard icon={MessageCircle} title="WhatsApp" href={contact.whatsappHref}>
              Schnell per Nachricht
            </ContactCard>
            <ContactCard icon={Mail} title="E-Mail" href={contact.emailHref}>
              {contact.email}
            </ContactCard>
            <ContactCard icon={MapPin} title="Adresse">
              {contact.address.street}, {contact.address.zip} {contact.address.city}
            </ContactCard>
            <ContactCard icon={Clock} title="Erreichbarkeit">
              24 Stunden geöffnet
              {contact.openingHours.map((slot) => (
                <span key={slot.days} className="mt-0.5 block text-sm font-normal text-ink-500">
                  {slot.days}: {slot.hours}
                </span>
              ))}
            </ContactCard>

            <div className="relative aspect-[16/10] overflow-hidden rounded-4xl">
              <Image
                src={images.schluessel.src}
                alt={images.schluessel.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 35vw, 100vw"
                className="object-cover"
              />
              <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-ink-950 backdrop-blur">
                Antwort innerhalb von 24 h
              </p>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}

type ContactCardProps = {
  icon: LucideIcon;
  title: string;
  href?: string;
  children: ReactNode;
};

function ContactCard({ icon, title, href, children }: ContactCardProps) {
  const content = (
    <>
      <IconBadge icon={icon} variant={href ? "solid" : "soft"} />
      <span>
        <span className="block text-sm text-ink-500">{title}</span>
        <span className="mt-0.5 block font-medium text-ink-950">{children}</span>
      </span>
    </>
  );

  const className = "flex items-center gap-4 rounded-3xl bg-white p-4 pr-6 ring-1 ring-ink-900/5";

  return href ? (
    <a
      href={href}
      className={`${className} transition hover:-translate-y-0.5 hover:shadow-soft`}
      {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
