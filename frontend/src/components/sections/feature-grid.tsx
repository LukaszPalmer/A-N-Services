import type { ReactNode } from "react";

import { Container } from "@/components/ui/container";
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
      <Container size="wide">
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li
              key={feature.title}
              className="reveal group relative overflow-hidden rounded-4xl bg-white p-8 ring-1 ring-ink-900/5 transition duration-500 hover:-translate-y-1.5 hover:shadow-lifted"
            >
              {/* Orangefarbener Schimmer von oben rechts beim Hover */}
              <div
                aria-hidden
                className="absolute -top-24 -right-24 size-56 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.18),transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between">
                <span className="grid size-14 place-items-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition duration-500 group-hover:bg-brand-500 group-hover:text-white group-hover:shadow-glow">
                  <feature.icon className="size-6" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="text-sm font-medium text-ink-300 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="relative mt-7 text-xl font-semibold text-ink-950">{feature.title}</h3>
              <p className="relative mt-2 leading-relaxed text-ink-600">{feature.description}</p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
