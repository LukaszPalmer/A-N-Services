import type { ReactNode } from "react";

import { SpeedLines } from "@/components/brand/speed-lines";
import { cn } from "@/lib/utils";

const variants = {
  solid: "bg-brand-500 text-white shadow-glow",
  soft: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  dark: "bg-white/[0.07] text-brand-300 ring-1 ring-white/15 backdrop-blur-md",
} as const;

type EyebrowProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  /** Pulsierender Punkt statt Speed-Lines – signalisiert "live / jetzt erreichbar" */
  live?: boolean;
  className?: string;
};

/** Kleines Label über Überschriften – mit den Speed-Lines aus dem Logo. */
export function Eyebrow({ children, variant = "soft", live = false, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full py-1.5 pr-3.5 pl-3 text-[0.7rem] font-semibold tracking-[0.18em] uppercase sm:text-xs",
        variants[variant],
        className,
      )}
    >
      {live ? (
        <span aria-hidden className="relative grid size-2 place-items-center">
          <span className="absolute size-2 animate-pulse-ring rounded-full bg-emerald-400" />
          <span className="relative size-2 rounded-full bg-emerald-400" />
        </span>
      ) : (
        <SpeedLines className="w-4" />
      )}
      {children}
    </span>
  );
}
