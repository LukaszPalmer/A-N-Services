"use client";

import { type RefObject, useEffect, useEffectEvent } from "react";

import { clamp01 } from "@/lib/animation";

/**
 * Meldet den Scroll-Fortschritt (0–1) eines hohen Elements:
 * 0 = Oberkante erreicht den oberen Viewport-Rand, 1 = Unterkante erreicht den unteren.
 *
 * Läuft über requestAnimationFrame und löst selbst keine React-Re-Renders aus –
 * ideal, um CSS-Variablen direkt am DOM-Element zu setzen.
 * Bei "Bewegung reduzieren" (Systemeinstellung) wird einmalig 1 gemeldet.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
) {
  const handleProgress = useEffectEvent(onProgress);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      handleProgress(1);
      return;
    }

    let frame = 0;

    const measure = () => {
      frame = 0;
      const rect = element.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      handleProgress(scrollable > 0 ? clamp01(-rect.top / scrollable) : 1);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [ref]);
}
