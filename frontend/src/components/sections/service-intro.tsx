import { ArrowRight, BadgeEuro, Check, Clock, MapPin, ShieldCheck, Sparkles, Video } from "lucide-react";
import Image from "next/image";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { Service } from "@/types";

/**
 * Einleitung auf den Leistungs-Detailseiten: Text + "Das Wichtigste in Kürze".
 *
 * Die Faktenbox ist bewusst als Definitionsliste (<dl>) aufgebaut: kurze, eindeutige
 * Aussagen, die Google-Snippets und KI-Antworten direkt übernehmen können.
 */
export function ServiceIntro({ service }: { service: Service }) {
  const { cities } = siteConfig.serviceArea;
  const facts = [
    { icon: Sparkles, label: "Leistung", value: service.features.map((feature) => feature.title).join(", ") },
    { icon: MapPin, label: "Einsatzgebiet", value: `${cities.slice(0, 4).join(", ")} und der ganze Niederrhein` },
    { icon: BadgeEuro, label: "Preis", value: "Verbindlicher Festpreis nach kostenloser Besichtigung" },
    { icon: Video, label: "Besichtigung", value: "Vor Ort oder per WhatsApp-Videoanruf" },
    { icon: Clock, label: "Erreichbarkeit", value: "24 Stunden, 7 Tage die Woche – Angebot in 24 h" },
    { icon: ShieldCheck, label: "Absicherung", value: "Voll versichert während Transport und Montage" },
  ];

  return (
    <Section>
      <Container size="wide" className="grid items-start gap-16 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={service.title}
            title={
              <>
                Was wir für Sie <Highlight>erledigen.</Highlight>
              </>
            }
          />
          <p className="mt-6 text-lg leading-relaxed text-ink-600 sm:text-xl">{service.intro}</p>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {service.highlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-3 rounded-2xl bg-sand-50 px-4 py-3.5 text-sm font-medium text-ink-900 ring-1 ring-ink-900/5"
              >
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500 text-white">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden />
                </span>
                {highlight}
              </li>
            ))}
          </ul>

          <div className="reveal-image relative mt-10 aspect-[16/9] overflow-hidden rounded-4xl">
            <Image
              src={service.image.src}
              alt={service.image.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>

          <ButtonLink href="/kontakt" size="lg" className="mt-10">
            Kostenloses Angebot anfordern
            <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
          </ButtonLink>
        </div>

        <aside className="relative overflow-hidden rounded-5xl bg-ink-950 p-8 text-white shadow-deep sm:p-10 lg:sticky lg:top-32 lg:col-span-5">
          <div
            aria-hidden
            className="absolute -top-32 -right-32 size-80 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.3),transparent_65%)]"
          />
          <h2 className="relative text-2xl font-semibold tracking-tight">Das Wichtigste in Kürze</h2>
          <p className="relative mt-2 text-sm text-white/55">
            {service.headline} – {siteConfig.name}
          </p>
          <dl className="relative mt-8 space-y-5">
            {facts.map((fact) => (
              <div key={fact.label} className="flex gap-4 border-t border-white/10 pt-5 first:border-t-0 first:pt-0">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/25">
                  <fact.icon className="size-4.5" strokeWidth={1.75} aria-hidden />
                </span>
                <div>
                  <dt className="text-xs font-semibold tracking-[0.14em] text-white/45 uppercase">{fact.label}</dt>
                  <dd className="mt-1 leading-relaxed text-white/90">{fact.value}</dd>
                </div>
              </div>
            ))}
          </dl>
        </aside>
      </Container>
    </Section>
  );
}
