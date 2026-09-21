import { MessageCircle, Phone, Plus } from "lucide-react";

import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import type { FaqItem } from "@/types";

type FaqProps = {
  items: FaqItem[];
  tone?: SectionTone;
};

/** Akkordeon mit nativem <details> – barrierefrei und ohne JavaScript. */
export function Faq({ items, tone = "white" }: FaqProps) {
  return (
    <Section tone={tone}>
      <Container className="grid gap-12 lg:grid-cols-12">
        {/* Bleibt beim Scrollen durch die Fragen stehen */}
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeading
            eyebrow="Häufige Fragen"
            title={
              <>
                Gut zu <Highlight>wissen</Highlight>
              </>
            }
            description="Die wichtigsten Antworten auf einen Blick."
          />

          <div className="mt-10 rounded-4xl bg-sand-100 p-6 sm:p-7">
            <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600 shadow-soft">
              <MessageCircle className="size-5" aria-hidden />
            </span>
            <p className="mt-5 font-semibold text-ink-950">Ihre Frage ist nicht dabei?</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-600">
              Persönliche Beratung – kostenlos, unverbindlich und rund um die Uhr erreichbar.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/kontakt" variant="dark" size="sm">
                Frage stellen
              </ButtonLink>
              <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "outline", size: "sm" })}>
                <Phone aria-hidden />
                Anrufen
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-3 lg:col-span-7">
          {items.map((item) => (
            <details
              key={item.question}
              name="faq"
              className="group rounded-3xl bg-white ring-1 ring-ink-900/8 transition open:shadow-soft open:ring-brand-200"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 px-6 py-5 text-left font-medium text-ink-950 sm:text-lg [&::-webkit-details-marker]:hidden">
                {item.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-sand-100 text-ink-700 transition duration-300 group-open:rotate-45 group-open:bg-brand-500 group-open:text-white">
                  <Plus className="size-4" aria-hidden />
                </span>
              </summary>
              <p className="px-6 pb-6 leading-relaxed text-ink-600">{item.answer}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
