import { SpeedLines } from "@/components/brand/speed-lines";
import { Marquee } from "@/components/ui/marquee";
import { services } from "@/content/services";
import { usps } from "@/content/usps";

/**
 * Zwei gekreuzte Laufbänder: oben die Leistungen (Orange), darunter die
 * Versprechen (Nachtblau). Reines Deko-/Branding-Element – die Inhalte stehen
 * auf der Seite ohnehin noch einmal als richtige Links und Texte.
 */
export function BrandTicker() {
  return (
    <section aria-label="Unsere Leistungen und Versprechen" className="relative overflow-hidden py-16 sm:py-24">
      <div className="relative -mx-[5vw] -rotate-2 bg-brand-500 py-4 shadow-glow-lg sm:py-6">
        <Marquee duration={38}>
          {services.map((service) => (
            <span
              key={service.slug}
              className="flex items-center gap-6 px-6 text-3xl font-semibold tracking-[-0.03em] whitespace-nowrap text-white sm:gap-10 sm:px-10 sm:text-6xl"
            >
              {service.title}
              <SpeedLines className="w-8 text-white/45 sm:w-12" />
            </span>
          ))}
        </Marquee>
      </div>
      <div className="relative -mx-[5vw] -mt-2 rotate-1 bg-ink-950 py-3.5 sm:py-4">
        <Marquee duration={46} reverse>
          {usps.map((usp) => (
            <span
              key={usp.title}
              className="flex items-center gap-4 px-5 text-sm font-medium tracking-[0.16em] whitespace-nowrap text-white/80 uppercase sm:px-8 sm:text-base"
            >
              <usp.icon className="size-4 text-brand-400" strokeWidth={1.75} aria-hidden />
              {usp.title}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
