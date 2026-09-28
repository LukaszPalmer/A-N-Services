import { Quote } from "lucide-react";
import Image from "next/image";

import { CtaBanner } from "@/components/sections/cta-banner";
import { FeatureGrid } from "@/components/sections/feature-grid";
import { PageHero } from "@/components/sections/page-hero";
import { ServiceArea } from "@/components/sections/service-area";
import { StatsBar } from "@/components/sections/stats-bar";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { usps } from "@/content/usps";
import { videos } from "@/content/videos";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Über uns – Ihr Team für Umzug & Handwerk in Moers",
  description: `Lernen Sie ${siteConfig.name} kennen: Inhaber ${siteConfig.owner} und ein eingespieltes Team für Umzüge, Montage, Entrümpelung, Boden, Farbe und Garten in Moers und am Niederrhein.`,
  path: "/ueber-uns",
  ogImage: "ueber-uns",
});

export default function UeberUnsPage() {
  return (
    <>
      <PageHero
        eyebrow="Über uns"
        breadcrumb="Über uns"
        path="/ueber-uns"
        video={videos.ueberUns}
        overlapBottom
        title="Menschen, die"
        accent="anpacken."
        description={`Hinter ${siteConfig.name} steht ein eingespieltes Team aus Moers mit einem Ziel: dass Sie Ihren Umzug entspannt erleben.`}
      />

      <StatsBar />

      {/* TODO: Texte mit echter Firmengeschichte, Gründer & Team ersetzen */}
      <Section>
        <Container size="wide" className="grid items-center gap-20 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Unsere Geschichte"
              title={
                <>
                  Aus Leidenschaft für <Highlight>entspannte Umzüge.</Highlight>
                </>
              }
            />
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-600">
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
                Heute begleiten wir von {siteConfig.contact.address.city} aus Familien, Senioren,
                Studierende und Unternehmen am ganzen Niederrhein – mit festen Mitarbeitern, eigenem
                Fuhrpark und einer Erreichbarkeit rund um die Uhr. Jeden Auftrag behandeln wir so,
                als wäre es unser eigener Umzug.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="reveal-image relative aspect-[4/3] overflow-hidden rounded-5xl shadow-deep">
              <Image
                src={images.teamSofa.src}
                alt={images.teamSofa.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            <figure className="relative -mt-20 ml-6 max-w-sm overflow-hidden rounded-4xl bg-ink-950 p-7 text-white shadow-deep sm:-mr-6 sm:ml-auto">
              <div
                aria-hidden
                className="absolute -top-20 -right-20 size-56 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.35),transparent_65%)]"
              />
              <Quote className="relative size-8 text-brand-500" aria-hidden />
              <blockquote className="relative mt-4 font-serif text-2xl leading-snug text-white italic">
                „Wir packen das – das ist nicht nur unser Motto, sondern unser Versprechen.“
              </blockquote>
              <figcaption className="relative mt-5 text-sm text-white/60">
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
            Worauf Sie sich <Highlight>verlassen können.</Highlight>
          </>
        }
        features={usps}
      />

      <ServiceArea tone="white" />

      <CtaBanner />
    </>
  );
}
