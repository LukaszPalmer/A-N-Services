import { ArrowRight, CheckCircle2, Phone, ShieldCheck } from "lucide-react";
import Image from "next/image";

import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { IconBadge } from "@/components/ui/icon-badge";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { services } from "@/content/services";

const trustPoints = ["Festpreis-Garantie", "Voll versichert", "Angebot in 24 h", "Rund um die Uhr erreichbar"];

/** Startseiten-Hero – angelehnt an das Original-Design, modernisiert als "Inset-Card". */
export function Hero() {
  return (
    <section className="px-2 pt-2 sm:px-4 sm:pt-4">
      <div className="relative isolate flex min-h-[28rem] items-end overflow-hidden rounded-4xl bg-ink-950 sm:min-h-[44rem] sm:rounded-5xl lg:min-h-[38rem] lg:items-center">
        {/* Bildausschnitt je Breite: mobil eng auf das Paar, zum Desktop hin nach rechts,
            damit links Platz für die Überschrift bleibt. */}
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          preload
          placeholder="blur"
          sizes="100vw"
          className="-z-20 object-cover object-[57%_center] sm:object-[62%_center] lg:object-[68%_center]"
        />
        {/* Lesbarkeit: Verlauf von links (Desktop) bzw. unten (Mobile) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/70 to-ink-950/10 lg:bg-linear-to-r lg:from-ink-950/95 lg:via-ink-950/60 lg:to-transparent"
        />
        <div
          aria-hidden
          className="absolute top-1/3 -left-40 -z-10 size-[30rem] rounded-full bg-brand-500/25 blur-3xl"
        />

        <Container className="relative pt-20 pb-14 sm:pt-32 sm:pb-32 lg:pt-12 lg:pb-20 xl:pt-14 xl:pb-24">
          <div className="max-w-2xl lg:max-w-3xl">
            <Eyebrow variant="solid" className="animate-fade-up">
              24 Stunden für Sie da
            </Eyebrow>

            <h1 className="mt-5 animate-fade-up text-[1.75rem] leading-[1.12] font-semibold text-white [animation-delay:100ms] sm:mt-6 sm:text-5xl sm:leading-[1.05] 2xl:text-6xl">
              {siteConfig.name} – Ihr Partner für{" "}
              <span className="text-brand-400">Umzug, Montage</span> und alles,{" "}
              <span className="text-brand-400">was danach kommt.</span>
            </h1>

            <p className="mt-4 max-w-xl animate-fade-up text-base leading-relaxed text-white/75 [animation-delay:200ms] sm:mt-6 sm:text-lg md:text-xl lg:max-w-2xl">
              Vom ersten Karton bis zum gepflegten Garten: Wir ziehen um, montieren, entrümpeln,
              verlegen Böden, streichen Wände und halten Ihr Grün in Form – zuverlässig, versichert
              und zum fairen Festpreis.
            </p>

            <div className="mt-7 flex animate-fade-up flex-col gap-3 [animation-delay:300ms] sm:mt-10 sm:flex-row lg:mt-8">
              <ButtonLink href="/kontakt" size="lg">
                Kostenloses Angebot
                <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
              </ButtonLink>
              <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "lg" })}>
                <Phone aria-hidden />
                {siteConfig.contact.phone}
              </a>
            </div>

            <ul className="mt-7 flex animate-fade-up flex-wrap gap-x-5 gap-y-2.5 text-sm text-white/80 [animation-delay:400ms] sm:mt-10 sm:gap-x-6 sm:gap-y-3 lg:mt-8">
              {trustPoints.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-brand-400" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </Container>

        {/* Schwebende Glas-Karte (Desktop) */}
        <div className="absolute right-8 bottom-24 hidden w-[22rem] animate-fade-up rounded-3xl border border-white/15 bg-white/10 p-5 text-white shadow-lifted backdrop-blur-xl [animation-delay:600ms] xl:block">
          <div className="flex items-center gap-4">
            <IconBadge icon={ShieldCheck} variant="solid" />
            <div>
              <p className="font-semibold">Sechs Leistungen, ein Team</p>
              <p className="text-sm text-white/70">Ein Ansprechpartner, ein Festpreis</p>
            </div>
          </div>
          <ul className="mt-4 flex flex-wrap gap-2 border-t border-white/10 pt-4">
            {services.map((service) => (
              <li
                key={service.slug}
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1 text-xs font-medium"
              >
                <service.icon className="size-3.5 text-brand-300" aria-hidden />
                {service.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
