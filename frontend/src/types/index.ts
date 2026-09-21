import type { LucideIcon } from "lucide-react";
import type { Route } from "next";
import type { StaticImageData } from "next/image";
import type { ComponentType } from "react";

export type NavItem = {
  label: string;
  href: Route;
  /** Untermenü – z. B. alle Leistungen unter "Leistungen" */
  children?: NavItem[];
};

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
};

export type Feature = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type FaqItem = {
  question: string;
  answer: string;
};

export type ProcessStep = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export type Stat = {
  /** Zielwert des Zählers – wird beim Scrollen von 0 hochgezählt */
  value: number;
  /** Zeichen direkt vor der Zahl, z. B. "+" oder "<" */
  prefix?: string;
  /** Zeichen direkt hinter der Zahl, z. B. "+" oder "/7" */
  suffix?: string;
  label: string;
};

export type ReviewPlatform = {
  /** Portalname, z. B. "Google" */
  name: string;
  /** Kurze Einordnung unter dem Namen, z. B. "Handwerker-Portal" */
  channel: string;
  description: string;
  /** Aktueller Stand des Profils, z. B. "Profil im Aufbau" */
  status: string;
  /** Logo bzw. Symbol des Portals – nimmt eine className entgegen */
  logo: ComponentType<{ className?: string }>;
};

export type ServiceSlug =
  | "umzuege"
  | "montageservice"
  | "entruempelung"
  | "bodenverlegung"
  | "malerarbeiten"
  | "gartenpflege";

export type Service = {
  slug: ServiceSlug;
  href: Route;
  /** Name in Navigation & Karten, z. B. "Umzüge" */
  title: string;
  /** Kurzer Claim für Karten & Hero */
  tagline: string;
  /** 1–2 Sätze für Karten & Meta-Description */
  description: string;
  /** Einleitungstext auf der Detailseite */
  intro: string;
  icon: LucideIcon;
  image: ImageAsset;
  /** Stichpunkte für die Service-Karte */
  highlights: string[];
  /** Leistungsbausteine auf der Detailseite */
  features: Feature[];
  faq: FaqItem[];
};
