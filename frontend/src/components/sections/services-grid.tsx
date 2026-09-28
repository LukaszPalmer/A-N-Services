import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

import { ServiceCard } from "@/components/sections/service-card";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { services as allServices } from "@/content/services";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

type ServicesGridProps = {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  services?: Service[];
  tone?: SectionTone;
};

/**
 * Leistungen als Bento-Raster (alle sechs) bzw. als gleichmäßiges Raster (Auswahl,
 * z. B. "Weitere Leistungen" auf den Detailseiten).
 */
export function ServicesGrid({
  eyebrow = "Unsere Leistungen",
  title = (
    <>
      Ein Anruf. <Highlight>Alles erledigt.</Highlight>
    </>
  ),
  description = "Umzug, Montage, Entrümpelung, Boden, Farbe und Garten – in Moers und am ganzen Niederrhein bekommen Sie bei uns alles von einem Team, perfekt aufeinander abgestimmt.",
  services = allServices,
  tone = "white",
}: ServicesGridProps) {
  const isBento = services.length === allServices.length;

  return (
    <Section tone={tone}>
      <Container size="wide">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
          {isBento && (
            <ButtonLink href="/leistungen" variant="dark" className="self-start lg:self-auto">
              Alle Leistungen im Überblick
              <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
            </ButtonLink>
          )}
        </div>

        <div
          className={cn(
            "mt-14 grid gap-4 sm:gap-5",
            isBento ? "md:grid-cols-2 lg:grid-cols-12 lg:grid-rows-[repeat(2,minmax(24rem,auto))]" : "md:grid-cols-2 lg:grid-cols-3",
          )}
        >
          {services.map((service, index) => (
            <div
              key={service.slug}
              className={cn(
                "reveal flex",
                isBento && index === 0 && "md:col-span-2 lg:col-span-7 lg:row-span-2",
                isBento && (index === 1 || index === 2) && "lg:col-span-5",
                isBento && index > 2 && "lg:col-span-4",
              )}
            >
              <ServiceCard
                service={service}
                index={allServices.findIndex((s) => s.slug === service.slug)}
                featured={isBento && index === 0}
              />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
