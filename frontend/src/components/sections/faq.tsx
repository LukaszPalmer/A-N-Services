import { MessageCircle, Phone, Plus } from "lucide-react";

import { JsonLd } from "@/components/seo/json-ld";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { faqJsonLd } from "@/lib/structured-data";
import type { FaqItem } from "@/types";

type FaqProps = {
  items: FaqItem[];
  tone?: SectionTone;
};

/**
 * Akkordeon mit nativem <details> – barrierefrei und ohne JavaScript.
 * Die Antworten stehen vollständig im HTML (auch zugeklappt) und zusätzlich als
 * FAQPage-Daten – ideal für Google-Snippets und KI-Antworten.
 */
export function Faq({ items, tone = "white" }: FaqProps) {
  return (
    <Section tone={tone}>
      <JsonLd data={faqJsonLd(items)} />

      <Container size="wide" className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        {/* Bleibt beim Scrollen durch die Fragen stehen */}
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <SectionHeading
            eyebrow="Häufige Fragen"
            title={
              <>
                Gut zu <Highlight>wissen.</Highlight>
              </>
            }
            description="Die wichtigsten Antworten auf einen Blick – und für alles andere sind wir rund um die Uhr erreichbar."
          />

          <div className="relative mt-10 overflow-hidden rounded-4xl bg-ink-950 p-7 text-white sm:p-8">
            <div
              aria-hidden
              className="absolute -top-24 -right-24 size-64 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.35),transparent_65%)]"
            />
            <span className="relative grid size-12 place-items-center rounded-2xl bg-brand-500 text-white shadow-glow">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <p className="relative mt-5 text-lg font-semibold">Ihre Frage ist nicht dabei?</p>
            <p className="relative mt-2 text-sm leading-relaxed text-white/65">
              Persönliche Beratung – kostenlos, unverbindlich und rund um die Uhr erreichbar.
            </p>
            <div className="relative mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/kontakt" size="sm">
                Frage stellen
              </ButtonLink>
              <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "sm" })}>
                <Phone aria-hidden />
                {siteConfig.contact.phone}
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-3 lg:col-span-7">
          {items.map((item, index) => (
            <details
              key={item.question}
              name="faq"
              className="group rounded-3xl bg-white ring-1 ring-ink-900/8 transition duration-300 open:shadow-lifted open:ring-brand-200 hover:ring-ink-900/15"
            >
              <summary className="flex cursor-pointer list-none items-center gap-5 px-6 py-5 text-left sm:px-7 sm:py-6 [&::-webkit-details-marker]:hidden">
                <span className="w-6 shrink-0 text-sm font-medium text-ink-300 tabular-nums transition-colors group-open:text-brand-500">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="flex-1 font-medium text-ink-950 sm:text-lg">{item.question}</h3>
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-sand-100 text-ink-700 transition duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white">
                  <Plus className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="px-6 pb-7 pl-17 leading-relaxed text-ink-600 sm:px-7 sm:pl-[4.75rem]">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
