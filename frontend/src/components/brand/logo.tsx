import Link from "next/link";

import { SpeedLines } from "@/components/brand/speed-lines";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoProps = {
  tone?: "dark" | "light";
  className?: string;
};

/**
 * Wortmarke A&N Service.
 *
 * Aufbau: abgerundetes Signet mit den Speed-Lines und dem orangefarbenen „&",
 * daneben der Schriftzug „A&N" über dem gesperrten „SERVICE".
 * Das Signet gibt es als Favicon ebenfalls unter app/icon.svg – beide zusammen ändern.
 */
export function Logo({ tone = "dark", className }: LogoProps) {
  const isLight = tone === "light";

  return (
    <Link
      href="/"
      aria-label={`${siteConfig.name} – zur Startseite`}
      className={cn("group/logo inline-flex items-center gap-2.5", className)}
    >
      <span
        className={cn(
          "relative grid size-11 shrink-0 place-items-center overflow-hidden rounded-2xl",
          "transition-transform duration-300 group-hover/logo:-translate-y-0.5",
          isLight ? "bg-white/10 ring-1 ring-white/20" : "bg-ink-950",
        )}
      >
        <SpeedLines className="absolute -left-1.5 w-9 text-white/20" />
        <span className="relative text-[1.45rem] leading-none font-semibold text-brand-500">&amp;</span>
      </span>

      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "text-[1.35rem] leading-none font-semibold tracking-tight",
            isLight ? "text-white" : "text-ink-950",
          )}
        >
          A<span className="text-brand-500">&amp;</span>N
        </span>
        <span
          className={cn(
            "mt-1.5 text-[0.62rem] leading-none font-semibold tracking-[0.28em] uppercase",
            isLight ? "text-white/55" : "text-ink-400",
          )}
        >
          Service
        </span>
      </span>
    </Link>
  );
}
