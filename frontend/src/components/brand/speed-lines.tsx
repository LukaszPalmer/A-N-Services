import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * Die drei "Bewegungslinien" aus dem Logo – das wiederkehrende Marken-Motiv
 * (Logo, Labels, Deko-Elemente). Farbe über `text-*`, Größe über `w-*`.
 */
export function SpeedLines({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg
      viewBox="0 0 28 16"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      aria-hidden
      className={cn("h-auto shrink-0", className)}
      style={style}
    >
      <path d="M11 2.5h15M3 8h23M14 13.5h12" />
    </svg>
  );
}
