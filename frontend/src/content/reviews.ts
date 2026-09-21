import { Hammer } from "lucide-react";

import { GoogleLogo } from "@/components/brand/google-logo";
import type { ReviewPlatform } from "@/types";

/**
 * Bewertungsportale auf der Startseite.
 *
 * Bewusst ohne erfundene Kundenstimmen: Die Firma ist neu im Netz und sammelt
 * die ersten echten Bewertungen erst.
 *
 * TODO: Sobald die Profile freigeschaltet sind, hier `href` ergänzen und die
 * Karten in der Sektion wieder verlinken (siehe components/sections/reviews.tsx).
 */
export const reviewPlatforms: ReviewPlatform[] = [
  {
    name: "Google",
    channel: "Bewertungen im Business-Profil",
    description:
      "Unser Google-Business-Profil wird gerade eingerichtet. Sobald es freigeschaltet ist, können Sie uns dort mit einem Klick öffentlich bewerten.",
    status: "Profil im Aufbau",
    logo: GoogleLogo,
  },
  {
    name: "MyHammer",
    channel: "Handwerker-Portal",
    description:
      "Auf MyHammer finden Sie uns in Kürze als Anbieter – mit Bewertungen aus abgeschlossenen Aufträgen, die nur echte Auftraggeber abgeben können.",
    status: "Profil im Aufbau",
    logo: Hammer,
  },
];
