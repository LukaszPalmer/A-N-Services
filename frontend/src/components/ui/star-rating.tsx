import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type StarRatingProps = {
  /** 0 bis 5 – Nachkommastellen füllen den nächsten Stern anteilig (4,7 → letzter Stern zu 70 %) */
  rating: number;
  /** Vorgelesener Text, z. B. "5 von 5 Sternen". Ohne Label ist die Grafik für Screenreader ausgeblendet. */
  label?: string;
  /** Farbe der leeren Sterne – passend zum Untergrund */
  trackClassName?: string;
  className?: string;
};

/** Fünf Sterne in Markenfarbe. Größe über `[&_svg]:size-*` in `className`. */
export function StarRating({ rating, label, trackClassName = "text-white/15", className }: StarRatingProps) {
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={cn("inline-flex gap-0.5 text-brand-400 [&_svg]:size-4 [&_svg]:shrink-0", className)}
    >
      {[0, 1, 2, 3, 4].map((index) => {
        const fill = Math.min(Math.max(rating - index, 0), 1);
        return (
          <span key={index} className="relative">
            <Star className={cn("fill-current", trackClassName)} strokeWidth={1.5} aria-hidden />
            {fill > 0 && (
              <span className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${Math.round(fill * 100)}%` }}>
                <Star className="fill-current" strokeWidth={1.5} aria-hidden />
              </span>
            )}
          </span>
        );
      })}
    </span>
  );
}
