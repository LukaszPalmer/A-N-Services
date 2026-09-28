"use client";

import { type RefObject, useEffect, useEffectEvent } from "react";

import { clamp01 } from "@/lib/animation";

/**
 * Meldet den Scroll-Fortschritt (0–1) eines hohen Elements:
 * 0 = Oberkante erreicht den oberen Viewport-Rand, 1 = Unterkante erreicht den unteren.
 *
 * Performance:
 * - Läuft über requestAnimationFrame (max. ein Messwert pro Frame) und löst selbst
 *   keine React-Re-Renders aus – ideal, um Styles direkt am DOM zu setzen.
 * - Der Scroll-Listener ist nur aktiv, solange das Element (fast) sichtbar ist
 *   (IntersectionObserver). Außerhalb kostet der Abschnitt keine Rechenzeit.
 * - Die Höhe wird nur bei Größenänderungen gemessen, nicht in jedem Frame.
 *
 * Bei "Bewegung reduzieren" (Systemeinstellung) wird einmalig 1 gemeldet.
 */
export function useScrollProgress(
  ref: RefObject<HTMLElement | null>,
  onProgress: (progress: number) => void,
  onResize?: () => void,
) {
  const handleProgress = useEffectEvent(onProgress);
  const handleResize = useEffectEvent(() => onResize?.());

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      handleResize();
      handleProgress(1);
      return;
    }

    let frame = 0;
    let listening = false;
    let top = 0;
    let scrollable = 1;

    const measureLayout = () => {
      const rect = element.getBoundingClientRect();
      top = rect.top + window.scrollY;
      scrollable = Math.max(1, rect.height - window.innerHeight);
      handleResize();
    };

    const update = () => {
      frame = 0;
      handleProgress(clamp01((window.scrollY - top) / scrollable));
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    const onResizeEvent = () => {
      measureLayout();
      schedule();
    };

    const start = () => {
      if (listening) return;
      listening = true;
      measureLayout();
      update();
      window.addEventListener("scroll", schedule, { passive: true });
    };

    const stop = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", schedule);
      // Endzustand sauber setzen, falls schnell herausgescrollt wurde
      update();
    };

    const observer = new IntersectionObserver(([entry]) => (entry?.isIntersecting ? start() : stop()), {
      rootMargin: "200px 0px",
    });
    observer.observe(element);

    // Erste Werte sofort setzen (z. B. bei Reload mitten auf der Seite)
    measureLayout();
    update();

    const resizeObserver = new ResizeObserver(onResizeEvent);
    resizeObserver.observe(element);
    window.addEventListener("resize", onResizeEvent);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("resize", onResizeEvent);
      window.removeEventListener("scroll", schedule);
    };
  }, [ref]);
}
