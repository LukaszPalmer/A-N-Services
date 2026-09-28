import { ArrowRight, BadgeEuro, Clock, Phone, ShieldCheck } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { OnlineViewing } from "@/components/sections/online-viewing";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceArea } from "@/components/sections/service-area";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServicesGrid } from "@/components/sections/services-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Highlight } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { serviceJsonLd } from "@/lib/structured-data";
import type { Service } from "@/types";

const heroFacts = [
  { icon: BadgeEuro, label: "Festpreis nach Besichtigung" },
  { icon: ShieldCheck, label: "Voll versichert" },
  { icon: Clock, label: "24/7 erreichbar" },
];

/**
 * Gemeinsame Vorlage für alle Leistungs-Detailseiten.
 * Inhalte kommen aus `content/services.ts` – neue Leistung = neuer Eintrag + neue Route.
 */
export function ServicePage({ service }: { service: Service }) {
  // Die drei nächsten Leistungen aus der Liste (am Ende wieder von vorn) als Querverweis
  const current = services.findIndex((s) => s.slug === service.slug);
  const otherServices = [...services.slice(current + 1), ...services.slice(0, current)].slice(0, 3);

  return (
    <>
      <JsonLd data={serviceJsonLd(service)} />

      <PageHero
        eyebrow={`${service.title} · ${siteConfig.contact.address.city} & Niederrhein`}
        title={`${service.headline}.`}
        accent={`${service.tagline}.`}
        description={service.description}
        video={service.video}
        breadcrumb={service.title}
        path={service.href}
        parent={{ label: "Leistungen", href: "/leistungen" }}
        footer={
          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
            {heroFacts.map((fact) => (
              <li key={fact.label} className="flex items-center gap-2">
                <fact.icon className="size-4 text-brand-400" aria-hidden />
                {fact.label}
              </li>
            ))}
          </ul>
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

      <ServiceIntro service={service} />

      <FeatureGrid
        eyebrow="Leistungen im Überblick"
        title={
          <>
            Alles rund um <Highlight>{service.title}</Highlight>
          </>
        }
        features={service.features}
      />

      <ProcessSteps tone="white" />

      <OnlineViewing tone="sand" />

      <ServiceArea tone="white" serviceName={service.title} />

      <Faq items={service.faq} tone="sand" />

      <ServicesGrid
        eyebrow="Weitere Leistungen"
        title={
          <>
            Noch mehr <Highlight>für Ihr Zuhause</Highlight>
          </>
        }
        description="Kombinieren Sie unsere Leistungen – ein Ansprechpartner, ein Angebot, ein Termin."
        services={otherServices}
      />

      <CtaBanner />
    </>
  );
}
