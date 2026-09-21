import type { ReactNode } from "react";

import { SpeedLines } from "@/components/brand/speed-lines";
import { cn } from "@/lib/utils";

const variants = {
  solid: "bg-brand-500 text-white",
  soft: "bg-brand-50 text-brand-700 ring-1 ring-brand-100",
  dark: "bg-white/10 text-brand-300 ring-1 ring-white/15",
} as const;

type EyebrowProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
};

/** Kleines Label über Überschriften – mit den Speed-Lines aus dem Logo. */
export function Eyebrow({ children, variant = "soft", className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold tracking-[0.14em] uppercase",
        variants[variant],
        className,
      )}
    >
      <SpeedLines className="w-4" />
      {children}
    </span>
  );
}
