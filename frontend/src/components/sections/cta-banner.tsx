import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";

import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";

type CtaBannerProps = {
  title?: string;
  description?: string;
};

export function CtaBanner({
  title = "Bereit für einen entspannten Umzug?",
  description = "Erzählen Sie uns von Ihrem Vorhaben – Sie erhalten innerhalb von 24 Stunden ein unverbindliches Festpreis-Angebot.",
}: CtaBannerProps) {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <div className="relative isolate grid overflow-hidden rounded-5xl bg-brand-500 lg:grid-cols-2">
          <div aria-hidden className="absolute inset-0 -z-10 bg-dots-light" />
          <span
            aria-hidden
            className="absolute -bottom-28 left-[38%] -z-10 text-[20rem] leading-none font-semibold text-white/10 select-none"
          >
            &amp;
          </span>

          <div className="px-7 py-14 sm:px-12 sm:py-16 lg:py-20">
            <h2 className="text-3xl leading-[1.1] font-semibold text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/85">{description}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/kontakt" variant="dark" size="lg">
                Angebot anfordern
                <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
              </ButtonLink>
              <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "lg" })}>
                <Phone aria-hidden />
                Jetzt anrufen
              </a>
            </div>
          </div>

          <div className="relative min-h-72 lg:m-3 lg:min-h-0">
            <Image
              src={images.schluessel.src}
              alt={images.schluessel.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover lg:rounded-4xl"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
