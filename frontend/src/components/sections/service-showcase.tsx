import { ArrowRight } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Section } from "@/components/ui/section";
import { cn } from "@/lib/utils";
import type { Service } from "@/types";

/** Leistungsübersicht als abwechselnde Bild/Text-Reihen mit großer Nummer. */
export function ServiceShowcase({ services }: { services: Service[] }) {
  return (
    <Section>
      <Container size="wide" className="space-y-28 sm:space-y-40">
        {services.map((service, index) => (
          <article
            key={service.slug}
            id={service.slug}
            className="grid scroll-mt-32 items-center gap-12 lg:grid-cols-2 lg:gap-20"
          >
            <div className={cn("group relative", index % 2 === 1 && "lg:order-2")}>
              <div className="reveal-image relative aspect-[4/3] overflow-hidden rounded-5xl shadow-deep">
                <Image
                  src={service.image.src}
                  alt={service.image.alt}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
                <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/40 via-transparent to-transparent" />
              </div>
              <span className="absolute -bottom-7 left-8 grid size-16 place-items-center rounded-3xl bg-brand-500 text-white shadow-glow-lg ring-8 ring-white">
                <service.icon className="size-7" strokeWidth={1.6} aria-hidden />
              </span>
            </div>

            <div className="relative">
              <span
                aria-hidden
                className="text-outline pointer-events-none absolute -top-16 -left-2 text-[8rem] leading-none font-semibold tracking-[-0.06em] text-ink-900/10 select-none sm:-top-20 sm:text-[10rem]"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <Eyebrow className="relative">{service.tagline}</Eyebrow>
              <h2 className="relative mt-6 text-4xl font-semibold tracking-[-0.035em] text-ink-950 sm:text-5xl">
                {service.headline}
              </h2>
              <p className="relative mt-5 text-lg leading-relaxed text-ink-600">{service.intro}</p>

              <ul className="relative mt-8 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                {service.features.slice(0, 4).map((feature) => (
                  <li key={feature.title} className="flex gap-3.5">
                    <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100">
                      <feature.icon className="size-4.5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span>
                      <span className="block font-medium text-ink-950">{feature.title}</span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-ink-600">{feature.description}</span>
                    </span>
                  </li>
                ))}
              </ul>

              <ButtonLink href={service.href} variant="dark" size="lg" className="relative mt-10">
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
