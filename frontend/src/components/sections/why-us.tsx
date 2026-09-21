import { Award } from "lucide-react";
import Image from "next/image";

import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { usps } from "@/content/usps";

export function WhyUs() {
  return (
    <Section tone="sand" className="overflow-hidden">
      {/* Das "&" als großes Marken-Wasserzeichen */}
      <span
        aria-hidden
        className="pointer-events-none absolute -top-20 -right-8 text-[18rem] leading-none font-semibold text-brand-500/[0.07] select-none sm:text-[26rem]"
      >
        &amp;
      </span>

      <Container className="relative grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Bildkomposition */}
        <div className="reveal relative mx-auto w-full max-w-xl lg:col-span-5 lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-5xl shadow-lifted">
            <Image
              src={images.einzug.src}
              alt={images.einzug.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[40%_center]"
            />
          </div>
          <div className="absolute -right-4 -bottom-8 w-44 overflow-hidden rounded-3xl border-4 border-sand-50 shadow-lifted sm:-right-10 sm:w-56">
            <div className="relative aspect-square">
              <Image
                src={images.besenrein.src}
                alt={images.besenrein.alt}
                fill
                placeholder="blur"
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute top-8 -left-4 flex items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-lifted sm:-left-8">
            <IconBadge icon={Award} variant="solid" />
            <div>
              {/* TODO: Wert mit Kunde abstimmen */}
              <p className="text-xl leading-none font-semibold text-ink-950">+10 Jahre</p>
              <p className="mt-1 text-sm text-ink-500">Erfahrung</p>
            </div>
          </div>
        </div>

        {/* Inhalte */}
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow={`Warum ${siteConfig.name}`}
            title={
              <>
                Wir packen das – <Highlight>damit Sie es nicht müssen.</Highlight>
              </>
            }
            description="Ein Umzug gehört zu den stressigsten Momenten im Leben. Unser Anspruch: Sie sollen ihn entspannt erleben. Dafür stehen wir mit unserem Namen."
          />

          <ul className="mt-12 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {usps.map((usp) => (
              <li key={usp.title} className="reveal flex gap-4">
                <IconBadge icon={usp.icon} variant="white" />
                <div>
                  <h3 className="font-semibold text-ink-950">{usp.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-600">{usp.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
