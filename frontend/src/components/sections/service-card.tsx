import { ArrowUpRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import type { Service } from "@/types";

type ServiceCardProps = {
  service: Service;
  /** Laufende Nummer ("01") */
  index: number;
  /** Große Kachel im Bento-Raster */
  featured?: boolean;
  className?: string;
};

/**
 * Bildkarte einer Leistung: Foto füllt die Karte, Text liegt auf einem Verlauf.
 * Hover (Desktop): Bild zoomt langsam, Pfeil dreht, Stichpunkte fahren ein.
 * Auf Touch-Geräten sind alle Inhalte ohne Hover sichtbar.
 */
export function ServiceCard({ service, index, featured = false, className }: ServiceCardProps) {
  return (
    <article
      className={cn(
        "group relative isolate flex w-full flex-col justify-end overflow-hidden rounded-4xl bg-ink-950 p-6 text-white sm:p-8",
        featured ? "min-h-[30rem] lg:min-h-full" : "min-h-[26rem]",
        className,
      )}
    >
      <Image
        src={service.image.src}
        alt={service.image.alt}
        fill
        placeholder="blur"
        sizes={featured ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"}
        className="-z-20 object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.06]"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-linear-to-t from-ink-950 via-ink-950/60 to-ink-950/0" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-brand-700/50 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Kopfzeile */}
      <div className="absolute inset-x-6 top-6 flex items-start justify-between sm:inset-x-8 sm:top-8">
        <span className="inline-flex items-center gap-2 rounded-full bg-ink-950/45 py-1.5 pr-3.5 pl-2 text-xs font-medium text-white/90 ring-1 ring-white/15 backdrop-blur-sm">
          <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-white">
            <service.icon className="size-3.5" strokeWidth={2} aria-hidden />
          </span>
          <span className="tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        </span>
        <span className="grid size-12 place-items-center rounded-full bg-white text-ink-950 transition duration-500 group-hover:rotate-45 group-hover:bg-brand-500 group-hover:text-white">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>

      <p className="text-sm font-medium text-brand-300">{service.tagline}</p>
      <h3 className={cn("mt-2 font-semibold tracking-[-0.03em]", featured ? "text-4xl sm:text-5xl" : "text-3xl")}>
        {service.title}
      </h3>
      <p className={cn("mt-3 leading-relaxed text-white/75", featured ? "max-w-lg text-lg" : "line-clamp-3")}>
        {service.description}
      </p>

      <ul
        className={cn(
          "mt-5 flex flex-wrap gap-2 transition duration-500 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100",
          featured && "lg:translate-y-0 lg:opacity-100",
        )}
      >
        {service.highlights.map((highlight) => (
          <li
            key={highlight}
            className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-white/90 ring-1 ring-white/15"
          >
            <Check className="size-3 text-brand-300" strokeWidth={3} aria-hidden />
            {highlight}
          </li>
        ))}
      </ul>

      {/* Der Link spannt über die ganze Karte (after:inset-0) */}
      <Link href={service.href} className="absolute inset-0 z-10 rounded-4xl">
        <span className="sr-only">
          {service.title} – mehr erfahren
        </span>
      </Link>
    </article>
  );
}
