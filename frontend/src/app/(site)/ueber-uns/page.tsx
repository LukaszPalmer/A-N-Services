import { Quote } from "lucide-react";
import Image from "next/image";

import { CtaBanner } from "@/components/sections/cta-banner";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { StatsBar } from "@/components/sections/stats-bar";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { usps } from "@/content/usps";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Über uns",
  description: `Lernen Sie ${siteConfig.name} kennen – Ihr zuverlässiges Team für Umzüge, Montagen und Entrümpelungen.`,
  path: "/ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        breadcrumb="Über uns"
        image={images.kontakt}
        title={
          <>
            Menschen, die <span className="text-brand-400">anpacken.</span>
          </>
        }
        description={`Hinter ${siteConfig.name} steht ein eingespieltes Team mit einem Ziel: dass Sie Ihren Umzug entspannt erleben.`}
      />

      <StatsBar />

      {/* TODO: Texte mit echter Firmengeschichte, Gründer & Team ersetzen */}
      <Section>
        <Container className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Unsere Geschichte"
              title={
                <>
                  Aus Leidenschaft für <Highlight>entspannte Umzüge</Highlight>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-600">
              <p>
                {siteConfig.name} ist aus einer einfachen Idee von Inhaber {siteConfig.owner}{" "}
                entstanden: Umziehen, Aufbauen und Ausräumen sollte nicht Stress bedeuten, sondern
                einen guten Neuanfang.
              </p>
              <p>
                Daraus sind über die Jahre sechs Leistungen geworden, die ineinandergreifen – Umzug,
                Montage, Entrümpelung, Bodenverlegung, Malerarbeiten und Gartenpflege. So muss
                niemand fünf Firmen koordinieren, um eine Wohnung bezugsfertig zu bekommen.
              </p>
              <p>
                Heute begleiten wir Familien, Senioren, Studierende und Unternehmen – mit festen
                Mitarbeitern, eigenem Fuhrpark und einer Erreichbarkeit rund um die Uhr. Jeden
                Auftrag behandeln wir so, als wäre es unser eigener Umzug.
              </p>
            </div>
          </div>

          <div className="reveal relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-5xl shadow-lifted">
              <Image
                src={images.umzug.src}
                alt={images.umzug.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figure className="relative -mt-16 ml-6 max-w-sm rounded-3xl bg-ink-950 p-6 text-white shadow-lifted sm:ml-auto sm:-mr-6">
              <Quote className="size-7 text-brand-500" aria-hidden />
              <blockquote className="mt-3 leading-relaxed text-white/85">
                „Wir packen das – das ist nicht nur unser Motto, sondern unser Versprechen.“
              </blockquote>
              <figcaption className="mt-4 text-sm text-white/60">
                {siteConfig.owner} – Inhaber, {siteConfig.name}
              </figcaption>
            </figure>
          </div>
        </Container>
      </Section>

      <FeatureGrid
        eyebrow="Unsere Werte"
        title={
          <>
            Worauf Sie sich <Highlight>verlassen können</Highlight>
          </>
        }
        features={usps}
      />

      <CtaBanner />
    </>
  );
}
