import { ArrowRight, Sparkles, Star } from "lucide-react";

import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { reviewPlatforms } from "@/content/reviews";

/**
 * Bewertungen – bewusst ohne Kundenstimmen.
 *
 * Die Firma ist neu im Netz und sammelt die ersten echten Bewertungen erst.
 * Statt Platzhalter-Zitaten zeigen wir die beiden Portale (Google, MyHammer)
 * und bitten bestehende Kunden um ihre Bewertung.
 *
 * TODO: Sobald die Profile online sind, `href` in content/reviews.ts ergänzen
 * und die <article> hier durch einen <a> ersetzen.
 */
export function Reviews() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-dots-light" />
      <div
        aria-hidden
        className="absolute -bottom-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-brand-500/20 blur-3xl"
      />

      <Container className="relative">
        <SectionHeading
          tone="dark"
          align="center"
          eyebrow="Bewertungen"
          title={
            <>
              Noch jung im Netz – <Highlight>nicht im Handwerk.</Highlight>
            </>
          }
          description={`${siteConfig.name} ist gerade erst online gegangen. Unsere Profile bei Google und MyHammer sind im Aufbau, echte Bewertungen sammeln wir Schritt für Schritt. Erfundene Kundenstimmen finden Sie hier deshalb nicht – dafür bald echte.`}
        />

        <ul className="mx-auto mt-14 grid max-w-3xl gap-5 sm:grid-cols-2">
          {reviewPlatforms.map((platform) => (
            <li key={platform.name} className="reveal flex">
              {/* Noch kein Link – die Profile sind erst im Aufbau */}
              <article className="flex w-full flex-col rounded-4xl bg-white/5 p-7 ring-1 ring-white/10 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-white shadow-soft">
                    <platform.logo className="w-6 text-brand-600" />
                  </span>
                  <div>
                    <p className="text-lg leading-tight font-semibold text-white">{platform.name}</p>
                    <p className="mt-1 text-sm text-white/55">{platform.channel}</p>
                  </div>
                </div>

                <p className="mt-6 flex-1 leading-relaxed text-white/75">{platform.description}</p>

                <p className="mt-7 inline-flex w-fit items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold tracking-[0.12em] text-brand-300 uppercase ring-1 ring-white/15">
                  <Sparkles className="size-3.5" aria-hidden />
                  {platform.status}
                </p>
              </article>
            </li>
          ))}
        </ul>

        {/* Bitte um Bewertung an bestehende Kunden */}
        <div className="reveal mx-auto mt-5 max-w-3xl rounded-4xl bg-brand-500 px-7 py-8 sm:px-10">
          <div className="flex flex-col gap-7 sm:flex-row sm:items-center sm:gap-8">
            <div className="flex-1">
              <h3 className="flex items-center gap-3 text-xl font-semibold text-white sm:text-2xl">
                <Star className="size-6 shrink-0 fill-current" aria-hidden />
                Waren Sie Kunde bei uns?
              </h3>
              <p className="mt-3 leading-relaxed text-white/85">
                Dann freuen wir uns über Ihre Bewertung – sie hilft anderen bei der Entscheidung.
                Schreiben Sie uns kurz, wir schicken Ihnen den Link, sobald die Profile online sind.
              </p>
            </div>
            <ButtonLink href="/kontakt" variant="dark" size="lg" className="shrink-0 self-start sm:self-auto">
              Bewertung abgeben
              <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
            </ButtonLink>
          </div>
        </div>
      </Container>
    </Section>
  );
}
