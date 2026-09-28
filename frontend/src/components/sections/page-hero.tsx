import { ChevronRight } from "lucide-react";
import type { Route } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { JsonLd } from "@/components/seo/json-ld";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { RevealText } from "@/components/ui/reveal-text";
import { VideoBackground } from "@/components/ui/video-background";
import { breadcrumbJsonLd } from "@/lib/structured-data";
import { cn } from "@/lib/utils";
import type { VideoAsset } from "@/types";

type Crumb = { label: string; href: Route };

type PageHeroProps = {
  eyebrow: string;
  /** H1 – bei Leistungsseiten mit Hauptsuchbegriff und Ort */
  title: string;
  /** Hervorgehobener Schluss der H1 (kursive Serife) */
  accent?: string;
  description?: ReactNode;
  video: VideoAsset;
  /** Aktuelle Seite für die Breadcrumb-Navigation */
  breadcrumb: string;
  /** Pfad der aktuellen Seite (für die strukturierten Breadcrumb-Daten) */
  path: Route;
  /** Zwischenebene, z. B. "Leistungen" auf den Leistungsseiten */
  parent?: Crumb;
  /** Kompakte Höhe – für Rechtstexte */
  compact?: boolean;
  /** Mehr Platz unten, wenn eine Karte (z. B. Kennzahlen) über den Rand ragt */
  overlapBottom?: boolean;
  /** Buttons unter dem Text */
  children?: ReactNode;
  /** Zusatzinhalt am unteren Rand, z. B. Fakten-Leiste */
  footer?: ReactNode;
};

/** Hero für Unterseiten – Video-Banner in der Formensprache der Startseite. */
export function PageHero({
  eyebrow,
  title,
  accent,
  description,
  video,
  breadcrumb,
  path,
  parent,
  compact = false,
  overlapBottom = false,
  children,
  footer,
}: PageHeroProps) {
  const trail: Crumb[] = [{ label: "Startseite", href: "/" }, ...(parent ? [parent] : []), { label: breadcrumb, href: path }];

  return (
    <section className="px-2 pt-2 sm:px-3 sm:pt-3">
      <JsonLd data={breadcrumbJsonLd(trail)} />

      <div
        className={cn(
          "relative isolate flex flex-col justify-end overflow-hidden rounded-4xl bg-ink-950 sm:rounded-5xl",
          compact ? "min-h-[26rem] sm:min-h-[30rem]" : "min-h-[36rem] sm:min-h-[40rem] lg:min-h-[44rem]",
        )}
      >
        <VideoBackground video={video} preload />

        <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/60 to-ink-950/25" />
        <div aria-hidden className="absolute inset-0 -z-10 hidden bg-linear-to-r from-ink-950/85 via-ink-950/35 to-transparent md:block" />
        <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-40 bg-linear-to-b from-ink-950/70 to-transparent" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-grain opacity-[0.06]" />
        <div
          aria-hidden
          className="absolute -bottom-56 -left-40 -z-10 size-[38rem] rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.3),transparent_62%)]"
        />

        <Container
          size="wide"
          className={cn(
            "relative pt-32",
            compact ? "pb-12 sm:pb-14" : "pb-14 sm:pb-20",
            overlapBottom && "pb-24 sm:pb-28",
          )}
        >
          <nav aria-label="Breadcrumb" className="mb-8 animate-fade-in">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
              {trail.map((crumb, index) => {
                const isLast = index === trail.length - 1;
                return (
                  <li key={crumb.href} className="flex items-center gap-1.5">
                    {isLast ? (
                      <span aria-current="page" className="text-white">
                        {crumb.label}
                      </span>
                    ) : (
                      <>
                        <Link href={crumb.href} className="transition-colors hover:text-white">
                          {crumb.label}
                        </Link>
                        <ChevronRight className="size-3.5" aria-hidden />
                      </>
                    )}
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="max-w-5xl">
            <Eyebrow variant="dark" className="animate-fade-up">
              {eyebrow}
            </Eyebrow>
            <h1
              className={cn(
                "mt-6 leading-[1] font-semibold tracking-[-0.045em] text-white",
                compact ? "text-[clamp(2.2rem,7vw,4.5rem)]" : "text-[clamp(2.2rem,6.4vw,4.25rem)]",
              )}
            >
              <RevealText text={title} accent={accent} accentOnNewLine delay={100} />
            </h1>
            {description && (
              <p className="mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-white/75 [animation-delay:500ms] sm:text-lg md:text-xl">
                {description}
              </p>
            )}
            {children && (
              <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:650ms] sm:flex-row">
                {children}
              </div>
            )}
          </div>

          {footer && <div className="mt-12 animate-fade-up [animation-delay:800ms]">{footer}</div>}
        </Container>
      </div>
    </section>
  );
}
