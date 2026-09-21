"use client";

import { useEffect, useLayoutEffect, useRef } from "react";

type CountUpProps = {
  value: number;
  /** Zeichen direkt vor der Zahl, z. B. "+" oder "<" */
  prefix?: string;
  /** Zeichen direkt hinter der Zahl, z. B. "+" oder "/7" */
  suffix?: string;
  /** Dauer der Animation in Millisekunden */
  duration?: number;
};

/** 1500 → "1.500". Bewusst ohne Intl, damit Server und Client identisch rendern. */
function formatNumber(value: number) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

// Setzt den Startwert noch vor dem ersten Paint. Auf dem Server gibt es kein Layout.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/**
 * Zählt von 0 auf `value` hoch, sobald das Element in den sichtbaren Bereich scrollt.
 *
 * Im HTML steht von Anfang an der Endwert – ohne JavaScript, ohne IntersectionObserver
 * oder bei `prefers-reduced-motion` bleibt er einfach stehen. Die Ziffern werden direkt
 * über `textContent` gesetzt statt über State: das spart ~60 Renders pro Sekunde und
 * hält Server- und Client-Markup identisch.
 */
export function CountUp({ value, prefix = "", suffix = "", duration = 1600 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const render = (n: number) => {
      el.textContent = `${prefix}${formatNumber(n)}${suffix}`;
    };

    render(0);

    let frame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        observer.disconnect();

        const startedAt = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - startedAt) / duration, 1);
          // easeOutExpo – schnell los, sanft aus
          const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          render(Math.round(value * eased));
          if (progress < 1) frame = requestAnimationFrame(tick);
        };
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      render(value);
    };
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {formatNumber(value)}
      {suffix}
    </span>
  );
}
