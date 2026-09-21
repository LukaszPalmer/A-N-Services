import { BadgeEuro, Clock, Handshake, Layers, ShieldCheck, Users } from "lucide-react";

import type { Feature } from "@/types";

/** Gründe für A&N Service – Startseite & "Über uns" */
export const usps: Feature[] = [
  {
    title: "Festpreis-Garantie",
    description: "Verbindliches Angebot nach Besichtigung – ohne versteckte Kosten.",
    icon: BadgeEuro,
  },
  {
    title: "Voll versichert",
    description: "Ihr Hab und Gut ist während Transport und Montage abgesichert.",
    icon: ShieldCheck,
  },
  {
    title: "Erfahrenes Team",
    description: "Geschulte, feste Mitarbeiter statt wechselnder Aushilfen.",
    icon: Users,
  },
  {
    title: "Rund um die Uhr da",
    description: "24 Stunden geöffnet: Wir halten Termine – auch kurzfristig und am Wochenende.",
    icon: Clock,
  },
  {
    title: "Alles von einem Team",
    description: "Umzug, Montage, Entrümpelung, Boden, Farbe und Garten – ein Ansprechpartner.",
    icon: Layers,
  },
  {
    title: "Persönlicher Service",
    description: "Ehrliche Beratung auf Augenhöhe, vor Ort und am Telefon.",
    icon: Handshake,
  },
];
