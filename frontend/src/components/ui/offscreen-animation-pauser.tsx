"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/** Elemente mit Endlos-Animationen (Laufband, Radar, Pulsringe, Stempel, Lichtstreifen …) */
const SELECTOR =
  ".animate-marquee, .animate-spin-slow, .animate-float, .animate-pulse-ring, .animate-bounce, .animate-puff, .beam";

/**
 * Pausiert Endlos-Animationen, solange ihr Abschnitt nicht im Bild ist.
 *
 * Browser lassen CSS-Animationen auch außerhalb des sichtbaren Bereichs weiterlaufen –
 * und jede laufende Animation macht jede Style-Berechnung teurer. Beim Scrollen durch
 * die Umzugs-Story (eine Style-Berechnung pro Frame) fiel das auf Smartphones ins Gewicht.
 *
 * Beobachtet werden bewusst nur die umgebenden Abschnitte (<section>), nicht jedes
 * einzelne Element – weniger Beobachtungsziele = weniger Arbeit pro Frame.
 * Außerhalb des Bildes setzt die Komponente `data-offscreen="true"`, globals.css
 * hält die Endlos-Animationen darin dann an.
 */
export function OffscreenAnimationPauser() {
  const pathname = usePathname();

  useEffect(() => {
    const containers = new Set<HTMLElement>();
    document.querySelectorAll<HTMLElement>(SELECTOR).forEach((element) => {
      containers.add(element.closest<HTMLElement>("section") ?? element);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.offscreen = String(!entry.isIntersecting);
        }
      },
      { rootMargin: "100px 0px" },
    );
    containers.forEach((container) => observer.observe(container));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
