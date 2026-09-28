import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: ReactNode;
  /** Sekunden für einen kompletten Durchlauf */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Endloses Laufband.
 *
 * Der Inhalt wird zweimal nebeneinander gerendert und per `translate3d` um genau
 * eine Hälfte verschoben – das läuft komplett auf der GPU, ohne JavaScript.
 * Die Kopie ist für Screenreader ausgeblendet. Bei "Bewegung reduzieren" steht es still.
 */
export function Marquee({ children, duration = 40, reverse = false, className }: MarqueeProps) {
  return (
    <div className={cn("flex overflow-hidden", className)}>
      <div
        className="flex w-max shrink-0 animate-marquee will-change-transform"
        style={
          {
            "--marquee-duration": `${duration}s`,
            animationDirection: reverse ? "reverse" : undefined,
          } as CSSProperties
        }
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div aria-hidden className="flex shrink-0 items-center">
          {children}
        </div>
      </div>
    </div>
  );
}
