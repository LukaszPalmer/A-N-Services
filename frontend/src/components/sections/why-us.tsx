import { Award } from "lucide-react";
import Image from "next/image";

import { RotatingBadge } from "@/components/brand/rotating-badge";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { usps } from "@/content/usps";

export function WhyUs() {
  return (
    <Section tone="dark" className="overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid-light [mask-image:radial-gradient(ellipse_at_center,#000_30%,transparent_75%)]" />
      <div
        aria-hidden
        className="absolute top-1/4 -right-60 size-[44rem] rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.2),transparent_62%)]"
      />

      <Container size="wide" className="relative grid items-center gap-20 lg:grid-cols-12 lg:gap-14">
        {/* Bildkomposition */}
        <div className="relative mx-auto w-full max-w-xl lg:col-span-5 lg:mx-0">
          <div className="reveal-image relative aspect-[4/5] overflow-hidden rounded-5xl ring-1 ring-white/10">
            <Image
              src={images.team.src}
              alt={images.team.alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="object-cover object-[35%_center]"
            />
            <div aria-hidden className="absolute inset-0 bg-linear-to-t from-ink-950/60 via-transparent to-transparent" />
          </div>

          <div className="absolute -right-3 -bottom-10 w-40 overflow-hidden rounded-3xl shadow-deep ring-4 ring-ink-950 sm:-right-10 sm:w-52">
            <div className="relative aspect-square">
              <Image
                src={images.besenrein.src}
                alt={images.besenrein.alt}
                fill
                placeholder="blur"
                sizes="208px"
                className="object-cover"
              />
            </div>
          </div>

          <div className="absolute top-8 -left-3 flex animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 text-ink-950 shadow-deep sm:-left-8">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-500 text-white shadow-glow">
              <Award className="size-5" strokeWidth={1.75} aria-hidden />
            </span>
            <div>
              {/* TODO: Wert mit Kunde abstimmen */}
              <p className="text-xl leading-none font-semibold">+10 Jahre</p>
              <p className="mt-1 text-sm text-ink-500">Erfahrung</p>
            </div>
          </div>

          <RotatingBadge className="absolute -bottom-14 left-6 hidden size-32 sm:grid" />
        </div>

        {/* Inhalte */}
        <div className="lg:col-span-7">
          <SectionHeading
            tone="dark"
            eyebrow={`Warum ${siteConfig.name}`}
            title={
              <>
                Wir packen das – <Highlight className="text-brand-400">damit Sie es nicht müssen.</Highlight>
              </>
            }
            description="Ein Umzug gehört zu den stressigsten Momenten im Leben. Unser Anspruch: Sie sollen ihn entspannt erleben. Dafür stehen wir mit unserem Namen – in Moers und am ganzen Niederrhein."
          />

          <ul className="mt-12 grid gap-3 sm:grid-cols-2">
            {usps.map((usp, index) => (
              <li
                key={usp.title}
                className="reveal group relative overflow-hidden rounded-3xl bg-white/[0.04] p-6 ring-1 ring-white/10 transition duration-500 hover:bg-white/[0.07] hover:ring-brand-500/40"
              >
                <span className="absolute top-5 right-6 text-xs font-medium text-white/25 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="grid size-12 place-items-center rounded-2xl bg-brand-500/15 text-brand-300 ring-1 ring-brand-500/25 transition duration-500 group-hover:bg-brand-500 group-hover:text-white">
                  <usp.icon className="size-5.5" strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-semibold text-white">{usp.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-white/60">{usp.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
