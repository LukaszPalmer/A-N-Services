import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/** Leistungsübersicht als abwechselnde Bild/Text-Reihen. */
export function ServiceShowcase({ services }: { services: Service[] }) {
  return (
    <Section>
      <Container className="space-y-24 sm:space-y-32">
        {services.map((service, index) => (
          <article key={service.slug} id={service.slug} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className={cn("reveal relative", index % 2 === 1 && "lg:order-2")}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-5xl shadow-lifted">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <span className="absolute -bottom-6 left-8 grid size-16 place-items-center rounded-3xl bg-brand-500 text-white shadow-glow">
                <service.icon className="size-7" strokeWidth={1.75} aria-hidden />
              </span>
            </div>

            <div>
              <Eyebrow>{service.tagline}</Eyebrow>
              <h2 className="mt-5 text-3xl font-semibold text-ink-950 sm:text-4xl">{service.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-600">{service.intro}</p>

              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {service.features.slice(0, 4).map((feature) => (
                  <li key={feature.title} className="flex gap-3">
                    <feature.icon className="mt-0.5 size-5 shrink-0 text-brand-500" strokeWidth={1.75} aria-hidden />
                    <span>
                      <span className="block font-medium text-ink-950">{feature.title}</span>
                      <span className="block text-sm text-ink-600">{feature.description}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonLink href={service.href} variant="dark" className="mt-10">
                Mehr zu {service.title}
                <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
              </ButtonLink>
            </div>
          </article>
        ))}
      </Container>
    </Section>
  );
}
