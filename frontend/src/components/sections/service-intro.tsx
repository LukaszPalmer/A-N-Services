import { ArrowRight, Check } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { usps } from "@/content/usps";
import type { Service } from "@/types";

/** Einleitung auf den Leistungs-Detailseiten: Text + Vorteils-Karte. */
export function ServiceIntro({ service }: { service: Service }) {
  return (
    <Section>
      <Container className="grid items-start gap-14 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={service.title}
            title={
              <>
                Was wir für Sie <Highlight>erledigen</Highlight>
              </>
            }
          />
          <p className="mt-6 text-lg leading-relaxed text-ink-600">{service.intro}</p>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {service.highlights.map((highlight) => (
              <li key={highlight} className="flex items-center gap-3 font-medium text-ink-900">
                <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <ButtonLink href="/kontakt" size="lg" className="mt-10">
            Kostenloses Angebot anfordern
            <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
          </ButtonLink>
        </div>

        <aside className="reveal rounded-5xl bg-ink-950 p-8 text-white sm:p-10 lg:col-span-5">
          <h3 className="text-2xl font-semibold">Ihre Vorteile mit {siteConfig.name}</h3>
          <ul className="mt-8 space-y-6">
            {usps.slice(0, 4).map((usp) => (
              <li key={usp.title} className="flex gap-4">
                <IconBadge icon={usp.icon} variant="dark" />
                <div>
                  <p className="font-medium">{usp.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/65">{usp.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </Container>
    </Section>
  );
}
