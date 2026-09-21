import type { ReactNode } from "react";

import { ServiceCard } from "@/components/sections/service-card";
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

export function ServicesGrid({
  eyebrow = "Unsere Leistungen",
  title = (
    <>
      Ein Anruf. <Highlight>Alles erledigt.</Highlight>
    </>
  ),
  description = "Umzug, Montage, Entrümpelung, Boden, Farbe und Garten – bei uns bekommen Sie alles von einem Team, perfekt aufeinander abgestimmt.",
  services = allServices,
  tone = "white",
}: ServicesGridProps) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <div className={cn("mt-14 grid gap-6 md:grid-cols-2", services.length > 2 && "lg:grid-cols-3")}>
          {services.map((service) => (
            <div key={service.slug} className="reveal flex">
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
