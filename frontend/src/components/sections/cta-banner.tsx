import { ArrowRight, Clock, Phone } from "lucide-react";
import Image from "next/image";

import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";

type CtaBannerProps = {
  title?: string;
  /** Hervorgehobener Schluss der Überschrift (kursive Serife) */
  accent?: string;
  description?: string;
};

/**
 * Abschluss-Aufruf mit umlaufendem Lichtstreifen am Rand ("Border Beam").
 * Der Streifen rotiert per transform – kostet praktisch keine Rechenleistung.
 */
export function CtaBanner({
  title = "Bereit für einen",
  accent = "entspannten Umzug?",
  description = "Erzählen Sie uns von Ihrem Vorhaben – Sie erhalten innerhalb von 24 Stunden ein unverbindliches Festpreis-Angebot.",
}: CtaBannerProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container size="wide">
        <div className="beam rounded-5xl p-px shadow-deep">
          <div className="relative isolate grid overflow-hidden rounded-[calc(2.5rem-1px)] bg-ink-950 lg:grid-cols-2">
            <div aria-hidden className="absolute inset-0 -z-10 bg-grid-light [mask-image:linear-gradient(to_right,#000,transparent_70%)]" />
            <div
              aria-hidden
              className="absolute -bottom-40 -left-40 -z-10 size-[36rem] rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.35),transparent_62%)]"
            />

            <div className="px-7 py-14 sm:px-12 sm:py-16 lg:py-20 xl:px-16">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/[0.07] px-3.5 py-1.5 text-xs font-semibold tracking-[0.16em] text-brand-300 uppercase ring-1 ring-white/15">
                <Clock className="size-3.5" aria-hidden />
                Antwort in 24 Stunden
              </p>
              <h2 className="mt-6 text-4xl leading-[1.02] font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {title}{" "}
                <span className="font-serif text-[1.08em] font-normal tracking-[-0.01em] text-brand-400 italic">
                  {accent}
                </span>
              </h2>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/70">{description}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <ButtonLink href="/kontakt" size="lg">
                  Angebot anfordern
                  <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
                </ButtonLink>
                <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "lg" })}>
                  <Phone aria-hidden />
                  Jetzt anrufen
                </a>
              </div>
            </div>

            <div className="relative min-h-80 overflow-hidden lg:m-3 lg:min-h-0 lg:rounded-4xl">
              <Image
                src={images.schluessel.src}
                alt={images.schluessel.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="reveal-image object-cover"
              />
              <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/50 via-transparent to-transparent lg:bg-linear-to-r lg:from-ink-950/40" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
