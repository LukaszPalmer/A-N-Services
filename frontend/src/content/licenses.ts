import type { MediaLicense, MediaPlatform } from "@/types";

/**
 * Lizenzen aller Bilder und Videos der Website.
 *
 * Es werden ausschließlich Medien verwendet, deren Lizenz die kommerzielle Nutzung
 * auf einer Firmenwebsite ohne Namensnennung erlaubt. Die Urheber:innen nennen wir
 * trotzdem – im Bild- und Videonachweis des Impressums (freiwillig, aus Fairness
 * und damit die Herkunft jederzeit nachweisbar ist).
 *
 * Wichtig beim Austausch: nur Medien mit einer dieser Lizenzen verwenden
 * (bei Unsplash NICHT "Unsplash+", das ist eine andere, kostenpflichtige Lizenz).
 */
export const licenses: Record<MediaPlatform, MediaLicense> = {
  Pexels: {
    name: "Pexels-Lizenz",
    url: "https://www.pexels.com/de-de/lizenz/",
    summary:
      "Kostenlose Nutzung, auch kommerziell; Namensnennung nicht erforderlich; Bearbeitung erlaubt (z. B. Zuschnitt, Farbanpassung, Kürzung). Nicht erlaubt: unveränderter Weiterverkauf, Weitergabe als eigene Stock-Medien sowie der Eindruck, abgebildete Personen oder Marken würden unser Unternehmen empfehlen.",
  },
  Unsplash: {
    name: "Unsplash-Lizenz",
    url: "https://unsplash.com/de/lizenz",
    summary:
      "Kostenlose Nutzung, auch kommerziell; Namensnennung nicht erforderlich; Bearbeitung erlaubt. Nicht erlaubt: unveränderter Weiterverkauf und der Aufbau eines konkurrierenden Bilddienstes.",
  },
};
