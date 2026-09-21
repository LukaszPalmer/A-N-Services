import type { Stat } from "@/types";

/**
 * Kennzahlen für Trust-Leiste & "Über uns".
 * Die Werte werden beim Scrollen hochgezählt (siehe components/ui/count-up.tsx).
 *
 * Keine Bewertungs-Kennzahl hier: Die Bewertungsprofile sind erst im Aufbau
 * (siehe sections/reviews.tsx) – eine Sternebewertung wäre an dieser Stelle erfunden.
 *
 * TODO: "+10" und "<500" sind geschätzt – bitte mit echten Zahlen des Kunden
 * bestätigen oder entfernen.
 */
export const stats: Stat[] = [
  { value: 10, prefix: "+", label: "Jahre Erfahrung" },
  { value: 500, prefix: "<", label: "Erfolgreiche Aufträge" },
  { value: 6, label: "Leistungen im Angebot" },
  { value: 24, suffix: "/7", label: "Erreichbar für Sie" },
];
