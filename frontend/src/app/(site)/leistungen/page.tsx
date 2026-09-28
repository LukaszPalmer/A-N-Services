import { ArrowRight, Phone } from "lucide-react";
import Link from "next/link";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceArea } from "@/components/sections/service-area";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { generalFaq } from "@/content/faq";
import { services } from "@/content/services";
import { videos } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leistungen – Umzug, Montage, Entrümpelung & Handwerk in Moers",
  description: `Alle Leistungen von ${siteConfig.name} in Moers und am Niederrhein: Umzüge, Möbel- & Küchenmontage, Entrümpelung, Bodenverlegung, Malerarbeiten und Gartenpflege – von einem Team, zum Festpreis.`,
  path: "/leistungen",
  ogImage: "leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen · Moers & Niederrhein"
        breadcrumb="Leistungen"
        path="/leistungen"
        video={videos.leistungen}
        title="Alles für Ihren Neustart –"
        accent="von einem Team."
        description="Umzug, Montage, Entrümpelung, Boden, Farbe und Garten: Wir kombinieren unsere Leistungen so, dass Sie nur einen Ansprechpartner, ein Angebot und einen Termin brauchen."
        footer={
          <nav aria-label="Sprungmarken zu den Leistungen">
            <ul className="flex flex-wrap gap-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/leistungen#${service.slug}`}
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white ring-1 ring-white/15 transition hover:bg-white/20"
                  >
                    <service.icon className="size-4 text-brand-400" strokeWidth={1.75} aria-hidden />
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        }
      >
        <ButtonLink href="/kontakt" size="lg">
          Kostenloses Angebot
          <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
        </ButtonLink>
        {/* Mobil übernimmt die feste Kontaktleiste unten den Anruf-Button */}
        <a
          href={siteConfig.contact.phoneHref}
          className={buttonStyles({ variant: "glass", size: "lg" }, "hidden sm:inline-flex")}
        >
          <Phone aria-hidden />
          {siteConfig.contact.phone}
        </a>
      </PageHero>
      <ServiceShowcase services={services} />
      <ProcessSteps />
      <ServiceArea tone="white" />
      <Faq items={generalFaq} tone="sand" />
      <CtaBanner
        title="Welche Leistung"
        accent="passt zu Ihnen?"
        description="Wir beraten Sie gern persönlich und stellen Ihnen ein Paket zusammen, das genau zu Ihrem Vorhaben passt."
      />
    </>
  );
}
