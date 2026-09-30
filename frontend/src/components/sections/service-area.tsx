import { MapPin, Navigation } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Lage der Orte relativ zu Moers – grobe Himmelsrichtung (Grad, 0 = Norden) und
 * Entfernungsring (1 = nah, 3 = weiter). Nur für die Grafik; keine exakte Karte.
 */
const radarPositions: Record<string, { angle: number; ring: 1 | 2 | 3 }> = {
  Duisburg: { angle: 95, ring: 1 },
  "Neukirchen-Vluyn": { angle: 250, ring: 1 },
  Rheinberg: { angle: 350, ring: 2 },
  "Kamp-Lintfort": { angle: 305, ring: 2 },
  Krefeld: { angle: 185, ring: 2 },
  Dinslaken: { angle: 40, ring: 2 },
  Oberhausen: { angle: 70, ring: 3 },
  Kempen: { angle: 215, ring: 3 },
  Düsseldorf: { angle: 150, ring: 3 },
};

const ringRadius = { 1: 22, 2: 33, 3: 44 } as const;

/**
 * Einsatzgebiet: Städte als echter Text (wichtig für lokale Suche und KI-Antworten
 * auf Fragen wie "Umzugsfirma in der Nähe von Krefeld") plus Radar-Grafik als Blickfang.
 */
export function ServiceArea({ tone = "sand", serviceName }: { tone?: SectionTone; serviceName?: string }) {
  const { cities, regions, note } = siteConfig.serviceArea;
  const [homeCity, ...otherCities] = cities;

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container size="wide" className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div>
          <SectionHeading
            eyebrow="Einsatzgebiet"
            title={
              <>
                Zu Hause in {homeCity}. <Highlight>Unterwegs am Niederrhein.</Highlight>
              </>
            }
            description={`${serviceName ? `${serviceName} vom Team aus ${homeCity}` : `Von unserem Standort in ${homeCity} aus`} sind wir in der ganzen Region im Einsatz – kurze Anfahrt, schnelle Termine. ${note}.`}
          />

          <ul className="mt-10 flex flex-wrap gap-3.5 sm:gap-4">
            {cities.map((city, index) => (
              <li
                key={city}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium ring-1",
                  index === 0 ? "bg-brand-500 text-white ring-brand-500" : "bg-white text-ink-800 ring-ink-900/10",
                )}
              >
                <MapPin className={cn("size-3.5", index === 0 ? "text-white" : "text-brand-500")} aria-hidden />
                {city}
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-ink-500">
            Außerdem: {regions.join(", ")} · {note}.
          </p>
        </div>

        {/* Radar-Grafik – reine Deko */}
        <div aria-hidden className="reveal relative mx-auto aspect-square w-full max-w-[34rem]">
          <div className="absolute inset-0 rounded-full bg-ink-950 shadow-deep" />
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="absolute inset-0 bg-grid-light opacity-70" />
            {/* Rotierender Radarstrahl (transform → GPU) */}
            <div className="absolute inset-0 animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,transparent_300deg,rgb(249_106_22/0.35)_360deg)] [animation-duration:9s]" />
          </div>
          {[1, 2, 3].map((ring) => (
            <div
              key={ring}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10"
              style={{ width: `${ringRadius[ring as 1 | 2 | 3] * 2}%`, height: `${ringRadius[ring as 1 | 2 | 3] * 2}%` }}
            />
          ))}

          {otherCities.map((city) => {
            const position = radarPositions[city];
            if (!position) return null;
            const radius = ringRadius[position.ring];
            const radians = (position.angle * Math.PI) / 180;
            const left = 50 + radius * Math.sin(radians);
            const top = 50 - radius * Math.cos(radians);
            return (
              <span
                key={city}
                className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
                style={{ left: `${left}%`, top: `${top}%` }}
              >
                <span className="relative grid size-2.5 place-items-center">
                  <span className="absolute size-2.5 animate-pulse-ring rounded-full bg-brand-400" />
                  <span className="relative size-2.5 rounded-full bg-brand-400 ring-4 ring-brand-400/20" />
                </span>
                <span className="text-[0.65rem] font-medium whitespace-nowrap text-white/70 sm:text-xs">{city}</span>
              </span>
            );
          })}

          {/* Moers im Zentrum */}
          <span className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2">
            <span className="grid size-14 place-items-center rounded-full bg-brand-500 text-white shadow-glow-lg ring-8 ring-brand-500/20">
              <Navigation className="size-6 rotate-45" aria-hidden />
            </span>
            <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-ink-950 shadow-soft">{homeCity}</span>
          </span>
        </div>
      </Container>
    </Section>
  );
}
