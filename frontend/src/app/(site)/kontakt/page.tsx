import { ArrowUpRight, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";

import { WhatsAppLogo } from "@/components/brand/whatsapp-logo";
import { ContactForm } from "@/components/forms/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceArea } from "@/components/sections/service-area";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { videos } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata = createMetadata({
  title: "Kontakt & kostenloses Angebot – Umzugsfirma Moers",
  description: `Kostenloses Festpreis-Angebot anfordern: ${siteConfig.name} in Moers per Formular, Telefon (${siteConfig.contact.phone}) oder WhatsApp erreichen – 24 Stunden am Tag, Antwort innerhalb von 24 h.`,
  path: "/kontakt",
  ogImage: "kontakt",
});

export default function KontaktPage() {
  const { contact } = siteConfig;
  const whatsappLink = `${contact.whatsappHref}?text=${encodeURIComponent(
    `Hallo ${siteConfig.name}, ich hätte gern ein unverbindliches Angebot.`,
  )}`;

  return (
    <>
      <PageHero
        eyebrow="Kontakt · 24/7 erreichbar"
        breadcrumb="Kontakt"
        path="/kontakt"
        video={videos.kontakt}
        title="Lassen Sie uns über Ihr"
        accent="Vorhaben sprechen."
        description="Kostenlos und unverbindlich: Schreiben Sie uns oder rufen Sie an – wir sind rund um die Uhr erreichbar und melden uns innerhalb von 24 Stunden mit einem Festpreis-Angebot."
      />

      <Section tone="sand">
        <Container size="wide" className="grid items-start gap-8 lg:grid-cols-12">
          <div className="rounded-5xl bg-white p-6 shadow-deep ring-1 ring-ink-900/5 sm:p-10 lg:col-span-7 lg:p-12">
            <h2 className="text-3xl font-semibold tracking-[-0.03em] text-ink-950 sm:text-4xl">Anfrage senden</h2>
            <p className="mt-3 text-ink-600">Je mehr wir wissen, desto genauer wird Ihr Angebot.</p>
            <div className="mt-10">
              <ContactForm />
            </div>
          </div>

          <aside className="space-y-3 lg:sticky lg:top-32 lg:col-span-5">
            <ContactCard icon={Phone} title="Telefon – rund um die Uhr" href={contact.phoneHref} highlight>
              {contact.phone}
            </ContactCard>
            <ContactCard icon={WhatsAppLogo} title="WhatsApp" href={whatsappLink}>
              Schnell per Nachricht oder Videoanruf
            </ContactCard>
            <ContactCard icon={Mail} title="E-Mail" href={contact.emailHref}>
              {contact.email}
            </ContactCard>
            <ContactCard icon={MapPin} title="Adresse" href={contact.mapsHref}>
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
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/60 to-transparent" />
              <p className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-ink-950 shadow-soft">
                <span className="size-2 rounded-full bg-emerald-500" aria-hidden />
                Antwort innerhalb von 24 h
              </p>
            </div>
          </aside>
        </Container>
      </Section>

      <ServiceArea tone="white" />
    </>
  );
}

type ContactCardProps = {
  icon: LucideIcon | typeof WhatsAppLogo;
  title: string;
  href?: string;
  highlight?: boolean;
  children: ReactNode;
};

function ContactCard({ icon: Icon, title, href, highlight = false, children }: ContactCardProps) {
  const content = (
    <>
      <span
        className={cn(
          "grid size-12 shrink-0 place-items-center rounded-2xl",
          highlight ? "bg-brand-500 text-white shadow-glow" : "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
        )}
      >
        <Icon className="size-5" aria-hidden />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-ink-500">{title}</span>
        <span className="mt-0.5 block font-medium break-words text-ink-950">{children}</span>
      </span>
      {href && (
        <ArrowUpRight className="size-5 shrink-0 text-ink-300 transition duration-300 group-hover:rotate-45 group-hover:text-brand-500" aria-hidden />
      )}
    </>
  );

  const className = "group flex items-center gap-4 rounded-3xl bg-white p-4 pr-5 ring-1 ring-ink-900/5";

  return href ? (
    <a
      href={href}
      className={`${className} transition duration-300 hover:-translate-y-0.5 hover:shadow-lifted`}
      {...(href.startsWith("http") && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  ) : (
    <div className={className}>{content}</div>
  );
}
