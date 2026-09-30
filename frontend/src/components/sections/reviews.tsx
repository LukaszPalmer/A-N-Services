import { ArrowRight, ArrowUpRight, BadgeCheck, ChevronDown, Hammer, MoveHorizontal, UserRound } from "lucide-react";

import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { StarRating } from "@/components/ui/star-rating";
import { reviewProfile, reviews } from "@/content/reviews";
import { cn, formatDate } from "@/lib/utils";
import type { Review } from "@/types";

/** Bis zu dieser Länge (Zeichen) steht eine Bewertung groß – kurze Stimmen geben der Wand Rhythmus */
const SHORT_REVIEW_LENGTH = 110;

const externalLinkStyles =
  "font-medium text-white underline decoration-white/30 underline-offset-4 transition hover:decoration-brand-400";

/**
 * Kundenbewertungen von MyHammer.
 *
 * Oben die Gesamtnote über ALLE Bewertungen – so, wie MyHammer sie ausweist. Darunter eine
 * Auswahl der 5-Sterne-Bewertungen als "Bewertungswand": unter 1024 px eine wischbare Reihe,
 * darüber ein Mauerwerk-Raster aus CSS-Spalten, eingeklappt auf gut zwei Reihen. Aufgeklappt
 * wird per <details> + :has() – ohne JavaScript, alle Texte stehen immer vollständig im HTML.
 * Der Hinweis unter der Wand erfüllt die Informationspflicht aus UWG § 5b Abs. 3
 * (woher die Bewertungen stammen und wie ihre Echtheit sichergestellt wird).
 *
 * Daten, Reihenfolge und Pflegeregeln: content/reviews.ts
 */
export function Reviews() {
  const { platform, rating, count, reviewsUrl, policyUrl, asOf } = reviewProfile;
  const ratingText = rating.toLocaleString("de-DE", { minimumFractionDigits: 1 });

  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-dots-light [mask-image:radial-gradient(ellipse_at_center,#000_20%,transparent_70%)]" />
      <div
        aria-hidden
        className="absolute -top-64 -right-64 size-[44rem] rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.18),transparent_62%)]"
      />
      <div
        aria-hidden
        className="absolute -bottom-72 left-1/2 size-[48rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.22),transparent_62%)]"
      />

      <Container size="wide" className="relative">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <SectionHeading
            tone="dark"
            eyebrow="Bewertungen"
            title={
              <>
                Unsere Kunden <Highlight className="text-brand-400">packen aus.</Highlight>
              </>
            }
            description={`Was Kunden auf ${platform} über uns schreiben: eine Auswahl echter Bewertungen, Wort für Wort übernommen. Alle Bewertungen können Sie jederzeit direkt auf ${platform} nachlesen.`}
            className="lg:col-span-7"
          />

          {/* Gesamtnote – Durchschnitt aller Bewertungen laut MyHammer */}
          <div className="reveal relative overflow-hidden rounded-4xl bg-white p-7 text-ink-950 shadow-deep sm:p-8 lg:col-span-5">
            <span
              aria-hidden
              className="pointer-events-none absolute -top-14 -right-4 font-serif text-[11rem] leading-none text-brand-500/10 italic select-none"
            >
              &amp;
            </span>

            <div className="relative flex items-center gap-3.5">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-ink-950 text-white">
                <Hammer className="size-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-lg leading-tight font-semibold">{platform}</p>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                  <BadgeCheck className="size-4 text-brand-500" aria-hidden />
                  Geprüft von {platform}
                </p>
              </div>
            </div>

            <p className="sr-only">
              Durchschnittlich {ratingText} von 5 Sternen aus {count} Bewertungen auf {platform}.
            </p>
            <div aria-hidden className="relative mt-7 flex items-end gap-5">
              <span className="text-gradient-brand text-7xl leading-[0.8] font-semibold tracking-[-0.05em] tabular-nums sm:text-8xl">
                {ratingText}
              </span>
              <span className="pb-0.5">
                <StarRating rating={rating} trackClassName="text-ink-100" className="[&_svg]:size-5" />
                <span className="mt-2 block text-sm text-ink-500">aus {count} Bewertungen</span>
              </span>
            </div>

            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "dark", size: "lg" }, "relative mt-8 w-full")}
            >
              Alle Bewertungen lesen
              <ArrowUpRight
                className="transition-transform group-hover/button:translate-x-0.5 group-hover/button:-translate-y-0.5"
                aria-hidden
              />
              <span className="sr-only">(auf {platform}, öffnet in neuem Tab)</span>
            </a>
            <p className="relative mt-3 text-center text-xs text-ink-500">Stand: {formatDate(asOf)}</p>
          </div>
        </div>

        <div className="group/wall mt-14 sm:mt-16">
          <div className="relative lg:max-h-[52rem] lg:overflow-hidden lg:group-has-[details[open]]/wall:max-h-none">
            <ul
              aria-label={`Ausgewählte Bewertungen von ${platform}`}
              className={cn(
                // Smartphone & Tablet: wischbare Reihe, die bis an den Bildschirmrand läuft
                "-mx-5 flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-4 [scrollbar-width:none] sm:-mx-8 sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden",
                // Desktop: Mauerwerk-Raster aus CSS-Spalten
                "lg:mx-0 lg:block lg:columns-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0",
              )}
            >
              {reviews.map((review) => (
                <li
                  key={`${review.date}-${review.location}`}
                  className="reveal flex w-[85%] max-w-sm shrink-0 snap-start sm:w-[58%] md:w-[44%] lg:mb-5 lg:w-auto lg:max-w-none lg:break-inside-avoid"
                >
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>

            {/* Weicher Auslauf der eingeklappten Wand */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-72 bg-linear-to-t from-ink-950 via-ink-950/80 to-transparent lg:block lg:group-has-[details[open]]/wall:hidden"
            />
          </div>

          <p className="mt-3 flex items-center gap-2 text-sm text-white/55 lg:hidden">
            <MoveHorizontal className="size-4 text-brand-400" aria-hidden />
            Wischen für weitere Bewertungen
          </p>

          <details className="group mt-8 hidden lg:block">
            <summary
              className={buttonStyles(
                { variant: "glass", size: "md" },
                "mx-auto flex w-fit cursor-pointer list-none [&::-webkit-details-marker]:hidden",
              )}
            >
              <span className="group-open:hidden">Alle {reviews.length} Bewertungen anzeigen</span>
              <span className="hidden group-open:inline">Weniger anzeigen</span>
              <ChevronDown className="transition-transform duration-300 group-open:rotate-180" aria-hidden />
            </summary>
          </details>
        </div>

        <div className="mt-12 flex flex-col gap-8 border-t border-white/10 pt-10 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
          <p className="max-w-3xl text-sm leading-relaxed text-white/55">
            Auswahl unserer 5-Sterne-Bewertungen, wörtlich übernommen von{" "}
            <a href={reviewsUrl} target="_blank" rel="noopener noreferrer" className={externalLinkStyles}>
              {platform}
            </a>{" "}
            (Nachnamen gekürzt). Die Gesamtnote von {ratingText} umfasst alle {count} Bewertungen. Auf {platform} ist
            jede Bewertung an einen über die Plattform vergebenen oder per Rechnung belegten Auftrag gebunden – mehr
            dazu in der{" "}
            <a href={policyUrl} target="_blank" rel="noopener noreferrer" className={externalLinkStyles}>
              Bewertungsrichtlinie von {platform}
            </a>
            .
          </p>
          <ButtonLink href="/kontakt" size="lg" className="self-start lg:self-auto">
            Kostenloses Angebot
            <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
          </ButtonLink>
        </div>
      </Container>
    </Section>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const isShort = review.text.length <= SHORT_REVIEW_LENGTH;

  return (
    <figure className="group relative flex w-full flex-col overflow-hidden rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition duration-500 hover:bg-white/[0.07] hover:ring-brand-500/40 sm:p-7">
      <span
        aria-hidden
        className="pointer-events-none absolute top-1 right-5 font-serif text-[6.5rem] leading-none text-white/[0.07] italic transition-colors duration-500 select-none group-hover:text-brand-500/30"
      >
        “
      </span>

      <div className="relative flex items-center justify-between gap-4">
        <StarRating rating={review.rating} label={`${review.rating} von 5 Sternen`} />
        <time dateTime={review.date} className="text-xs text-white/55">
          {formatDate(review.date)}
        </time>
      </div>

      <blockquote
        cite={reviewProfile.reviewsUrl}
        className={cn(
          "relative mt-5 flex-1",
          isShort
            ? "text-xl leading-snug font-medium tracking-[-0.015em] text-white/90"
            : "text-[0.95rem] leading-relaxed text-white/75",
        )}
      >
        <p>
          <ReviewText text={review.text} highlight={review.highlight} />
        </p>
      </blockquote>

      <figcaption className="relative mt-6 flex items-center gap-3 border-t border-white/10 pt-5 text-sm">
        <span
          aria-hidden
          className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-500/15 font-semibold text-brand-300 ring-1 ring-brand-500/25"
        >
          {review.name ? initials(review.name) : <UserRound className="size-4.5" strokeWidth={1.75} />}
        </span>
        <span>
          <span className="block font-semibold text-white">{review.name ?? `${reviewProfile.platform}-Kunde`}</span>
          <span className="block text-white/55">
            {review.location} · {review.service}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/** Setzt den wörtlichen Ausschnitt `highlight` farbig ab – fehlt er im Text, bleibt alles schlicht. */
function ReviewText({ text, highlight }: Pick<Review, "text" | "highlight">) {
  const start = highlight ? text.indexOf(highlight) : -1;
  if (!highlight || start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-md bg-brand-500/20 px-1 text-white box-decoration-clone">{highlight}</mark>
      {text.slice(start + highlight.length)}
    </>
  );
}

/** "Lea G." → "LG" */
function initials(name: string) {
  return name
    .split(/\s+/)
    .map((part) => part.charAt(0))
    .join("");
}
