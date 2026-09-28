import Link from "next/link";

import {
  LOGO_VIEWBOX_X,
  LOGO_WIDTH,
  MARK_AMP,
  MARK_HOUSE,
  MARK_LINES,
  WORD_AMP,
  WORD_AN,
  WORD_SERVICE,
} from "@/components/brand/logo-paths";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Wort-Bild-Marke A&N Service.
 *
 * Signet „Haus in Bewegung": Dach, rechte Wand und Boden als Kontur – die linke
 * Wand löst sich in drei orangefarbene Speed-Lines auf (Umzug = Zuhause in Bewegung).
 * Im Haus das „&" aus dem Firmennamen. Rechts die Wortmarke „A&N" mit
 * orangefarbenem „&" über dem auf gleiche Breite ausgetriebenen „SERVICE".
 *
 * Alles liegt als Vektorpfad vor (logo-paths.ts) und sieht damit überall identisch
 * aus – unabhängig von geladenen Schriften. Favicon: app/icon.svg (gleiches Signet
 * auf dunkler Kachel). Beide zusammen ändern.
 */
export function Logo({ tone = "dark", className }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} – zur Startseite`}
      className={cn("group/logo inline-flex shrink-0 items-center", className)}
    >
      <LogoMark
        className={cn("h-11 w-auto", isLight ? "text-white" : "text-ink-950")}
        subtleClassName={isLight ? "fill-white/60" : "fill-ink-500"}
      />
    </Link>
  );
}

/** Nur die Grafik – z. B. für Footer-Wasserzeichen oder Social-Media-Bilder. */
export function LogoMark({
  className,
  subtleClassName = "fill-ink-500",
  withWordmark = true,
}: {
  className?: string;
  subtleClassName?: string;
  withWordmark?: boolean;
}) {
  const width = withWordmark ? LOGO_WIDTH - LOGO_VIEWBOX_X : 64 - LOGO_VIEWBOX_X;

  return (
    <svg viewBox={`${LOGO_VIEWBOX_X} 0 ${width} 64`} aria-hidden className={className}>
      <path
        d={MARK_HOUSE}
        fill="none"
        stroke="currentColor"
        strokeWidth={4.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Speed-Lines: ziehen beim Hover kurz nach links – das Haus "fährt los" */}
      <path
        d={MARK_LINES}
        className="stroke-brand-500 transition-transform duration-500 ease-out group-hover/logo:-translate-x-1"
        strokeWidth={4.8}
        strokeLinecap="round"
      />
      <path d={MARK_AMP} className="fill-brand-500" />

      {withWordmark && (
        <>
          <path d={WORD_AN} fill="currentColor" />
          <path d={WORD_AMP} className="fill-brand-500" />
          <path d={WORD_SERVICE} className={subtleClassName} />
        </>
      )}
    </svg>
  );
}
