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

export type MediaPlatform = "Pexels" | "Unsplash";

export type MediaLicense = {
  name: string;
  url: string;
  /** Kurzfassung der Nutzungsrechte (für Impressum & Datenschutz) */
  summary: string;
};

/** Quellenangabe für ein Bild oder einen Videoclip */
export type MediaCredit = {
  /** Motiv, wie es auf der Website eingesetzt wird */
  title: string;
  /** Urheber:in laut Plattform */
  author: string;
  authorUrl?: string;
  /** Originalseite auf der Plattform – belegt Herkunft und Lizenz */
  sourceUrl: string;
  platform: MediaPlatform;
};

export type ImageAsset = {
  src: StaticImageData;
  alt: string;
  credit?: MediaCredit;
};

/** Hintergrundvideo eines Seiten-Banners (selbst gehostet unter public/videos) */
export type VideoAsset = {
  /** Querformat 1920 × 1080 */
  src: string;
  /** Hochformat-Ausschnitt 540 × 960 für Smartphones */
  mobileSrc: string;
  /** Standbild: sofort sichtbar (LCP) und Ersatz bei "Bewegung reduzieren" oder Datensparmodus */
  poster: StaticImageData;
  /** Kurzbeschreibung des Motivs (Impressum, Pflege) */
  description: string;
  /** Bildausschnitt auf schmalen Bildschirmen (CSS object-position), Standard: Mitte */
  focus?: string;
  /** Quellen aller verwendeten Clips */
  credits: MediaCredit[];
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
  /** Hintergrundvideo im Banner der Detailseite */
  video: VideoAsset;
  /** H1 der Detailseite mit Hauptsuchbegriff und Ort, z. B. "Umzug in Moers" */
  headline: string;
  /** Seitentitel für Google (Firmenname hängt das Titel-Template an), max. ~55 Zeichen */
  seoTitle: string;
  /** Meta-Description für Google, ca. 140–160 Zeichen, mit Ort und Nutzenversprechen */
  seoDescription: string;
  /** Verwandte Suchbegriffe – für strukturierte Daten und llms.txt (nicht als Meta-Keywords) */
  keywords: string[];
  /** Stichpunkte für die Service-Karte */
  highlights: string[];
  /** Leistungsbausteine auf der Detailseite */
  features: Feature[];
  faq: FaqItem[];
};
