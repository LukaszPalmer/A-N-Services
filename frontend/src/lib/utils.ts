import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Kombiniert Tailwind-Klassen und löst Konflikte auf (z. B. `px-4` vs. `px-6`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * "2026-08-22" → "22. August 2026". Feste Zeitzone, damit das Datum nirgends um einen Tag verrutscht.
 * Nur in Server-Komponenten verwenden – Intl kann sich zwischen Server und Browser unterscheiden.
 */
export function formatDate(isoDate: string) {
  return new Date(`${isoDate}T00:00:00Z`).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
