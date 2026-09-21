import { ArrowRight, Phone } from "lucide-react";

import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { OnlineViewing } from "@/components/sections/online-viewing";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceIntro } from "@/components/sections/service-intro";
import { ServicesGrid } from "@/components/sections/services-grid";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Highlight } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import type { Service } from "@/types";

/**
 * Gemeinsame Vorlage für alle Leistungs-Detailseiten (Umzüge, Montage, Entrümpelung).
 * Inhalte kommen aus `content/services.ts` – neue Leistung = neuer Eintrag + neue Route.
 */
export function ServicePage({ service }: { service: Service }) {
  // Die drei nächsten Leistungen aus der Liste (am Ende wieder von vorn) als Querverweis
  const current = services.findIndex((s) => s.slug === service.slug);
  const otherServices = [...services.slice(current + 1), ...services.slice(0, current)].slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={service.title}
        title={service.tagline}
        description={service.description}
        image={service.image}
        breadcrumb={service.title}
      >
        <ButtonLink href="/kontakt" size="lg">
          Kostenloses Angebot
          <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
        </ButtonLink>
        <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "lg" })}>
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

      <ProcessSteps />

      <OnlineViewing />

      <Faq items={service.faq} />

      <ServicesGrid
        eyebrow="Weitere Leistungen"
        title={
          <>
            Noch mehr <Highlight>für Ihr Zuhause</Highlight>
          </>
        }
        description="Kombinieren Sie unsere Leistungen – ein Ansprechpartner, ein Angebot, ein Termin."
        services={otherServices}
        tone="sand"
      />

      <CtaBanner />
    </>
  );
}
