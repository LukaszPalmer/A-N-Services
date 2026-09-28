import { ArrowRight, ArrowUpRight, CheckCircle2, Phone } from "lucide-react";
import Link from "next/link";

import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealText } from "@/components/ui/reveal-text";
import { VideoBackground } from "@/components/ui/video-background";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { videos } from "@/content/videos";

const trustPoints = ["Festpreis-Garantie", "Voll versichert", "Angebot in 24 h", "Rund um die Uhr erreichbar"];

/**
 * Startseiten-Hero: bildschirmfüllender Brand-Film (alle sechs Leistungen),
 * darüber die H1 mit dem wichtigsten Suchbegriff und der Markenclaim.
 */
export function Hero() {
  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <div className="relative isolate flex h-[calc(100svh-1rem)] max-h-[68rem] min-h-[42rem] flex-col justify-end overflow-hidden rounded-4xl bg-ink-950 sm:h-[calc(100svh-1.5rem)] sm:rounded-5xl">
        <VideoBackground video={videos.startseite} preload controlClassName="bottom-20 sm:bottom-24" />

        {/* Lesbarkeit: Verlauf von unten (Mobile) bzw. links (Desktop), oben für den Header */}
        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/65 to-ink-950/20 lg:via-ink-950/40" />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-linear-to-r from-ink-950/85 via-ink-950/30 to-transparent lg:block" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink-950/70 to-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grain opacity-[0.06]" />
        <div
          aria-hidden
          className="absolute -bottom-48 -left-40 -z-10 size-[42rem] rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.35),transparent_62%)]"
        />

        <Container size="wide" className="relative pt-32 pb-24 sm:pb-28 lg:pb-24">
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Eyebrow variant="dark" live className="animate-fade-up">
                {siteConfig.contact.openingHoursShort} · Moers & Niederrhein
              </Eyebrow>

              <h1 className="mt-6 text-[clamp(2.3rem,6.4vw,5rem)] leading-[0.98] font-semibold tracking-[-0.045em] text-white max-sm:text-[clamp(2.1rem,9.4vw,3rem)]">
                <RevealText text={`Ihr ${siteConfig.primaryKeyword}.`} accent={siteConfig.claim} accentOnNewLine delay={120} />
              </h1>

              <p className="mt-5 max-w-2xl animate-fade-up text-base leading-relaxed text-white/75 [animation-delay:650ms] sm:mt-6 sm:text-lg md:text-xl">
                Umzüge, Möbelmontage, Entrümpelung, Bodenverlegung, Malerarbeiten und Gartenpflege – von einem Team,
                zum fairen Festpreis. Für Moers, Duisburg, Krefeld und den ganzen Niederrhein.
              </p>

              <div className="mt-7 flex animate-fade-up flex-col gap-3 [animation-delay:800ms] sm:mt-8 sm:flex-row">
                <ButtonLink href="/kontakt" size="lg">
                  Kostenloses Angebot
                  <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
                </ButtonLink>
                <a
                  href={siteConfig.contact.phoneHref}
                  className={buttonStyles({ variant: "glass", size: "lg" }, "hidden sm:inline-flex")}
                >
                  <Phone aria-hidden />
                  {siteConfig.contact.phone}
                </a>
              </div>

              <ul className="mt-6 grid animate-fade-up grid-cols-2 gap-x-4 gap-y-2 text-[0.8rem] text-white/80 [animation-delay:950ms] sm:mt-8 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-2.5 sm:text-sm">
                {trustPoints.map((point) => (
                  <li key={point} className="flex items-center gap-2">
                    <CheckCircle2 className="size-4 text-brand-400" aria-hidden />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Schnellzugriff auf alle Leistungen (Desktop) */}
            <nav
              aria-label="Leistungen"
              className="hidden animate-fade-up rounded-4xl bg-ink-950/55 p-3 ring-1 ring-white/15 backdrop-blur-md [animation-delay:1100ms] lg:col-span-4 lg:block"
            >
              <p className="px-3 pt-2 pb-3 text-xs font-semibold tracking-[0.18em] text-white/50 uppercase">
                Sechs Leistungen · ein Team
              </p>
              <ul>
                {services.map((service, index) => (
                  <li key={service.slug}>
                    <Link
                      href={service.href}
                      className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 text-white/85 transition hover:bg-white/10 hover:text-white"
                    >
                      <span className="w-5 text-xs text-white/35 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
                      <service.icon className="size-4 text-brand-400" strokeWidth={1.75} aria-hidden />
                      <span className="flex-1 font-medium">{service.title}</span>
                      <ArrowUpRight
                        className="size-4 -translate-x-1 text-white/0 transition duration-300 group-hover:translate-x-0 group-hover:text-brand-300"
                        aria-hidden
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </Container>
      </div>
    </section>
  );
}
