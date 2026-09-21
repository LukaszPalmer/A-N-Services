import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Feature } from "@/types";

type FeatureGridProps = {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  features: Feature[];
  tone?: SectionTone;
};

export function FeatureGrid({ eyebrow, title, description, features, tone = "sand" }: FeatureGridProps) {
  return (
    <Section tone={tone}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="reveal group rounded-4xl bg-white p-7 ring-1 ring-ink-900/5 transition duration-300 hover:-translate-y-1 hover:shadow-lifted"
            >
              <IconBadge
                icon={feature.icon}
                className="transition-colors duration-300 group-hover:bg-brand-500 group-hover:text-white"
              />
              <h3 className="mt-6 text-xl font-semibold text-ink-950">{feature.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
