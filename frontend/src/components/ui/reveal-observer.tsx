"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

const SELECTOR = ".reveal, .reveal-image, .reveal-line";

/**
 * Blendet Elemente mit `reveal`, `reveal-image` oder `reveal-line` beim ersten
 * Hineinscrollen ein (Styles in globals.css).
 *
 * Warum per IntersectionObserver statt CSS-Scroll-Timeline: Scroll-gesteuerte
 * Animationen zwingen den Browser bei JEDEM Scroll-Frame zu einer Style-Berechnung –
 * auch für Elemente weit außerhalb des Bildes. Hier wird jedes Element genau einmal
 * umgeschaltet; danach kostet es nichts mehr.
 *
 * Ohne JavaScript oder bei "Bewegung reduzieren" ist alles sofort sichtbar
 * (die Ausblendung greift nur unter `html[data-motion="on"]`).
 */
export function RevealObserver() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const elements = [...document.querySelectorAll<HTMLElement>(SELECTOR)].filter(
      (element) => element.dataset.revealed === undefined,
    );

    // Was bereits im Bild ist, bleibt einfach stehen – kein Aufblitzen beim Laden
    const viewportHeight = window.innerHeight;
    const pending = elements.filter((element) => {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewportHeight && rect.bottom > 0) {
        element.dataset.revealed = "";
        return false;
      }
      return true;
    });

    document.documentElement.dataset.motion = "on";

    const observer = new IntersectionObserver(
      (entries) => {
        let order = 0;
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const element = entry.target as HTMLElement;
          // Gleichzeitig sichtbar werdende Elemente leicht versetzt einblenden
          element.style.transitionDelay = `${Math.min(order++, 5) * 90}ms`;
          element.addEventListener("transitionend", () => element.style.removeProperty("transition-delay"), {
            once: true,
          });
          element.dataset.revealed = "";
          observer.unobserve(element);
        }
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    pending.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
