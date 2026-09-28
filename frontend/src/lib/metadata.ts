import type { Metadata } from "next";

import { siteConfig } from "@/config/site";

type PageMetadataInput = {
  /** Seitentitel – der Firmenname wird per Template angehängt */
  title: string;
  /** Meta-Description: 140–160 Zeichen, Suchbegriff + Ort + Nutzen + Handlungsaufforderung */
  description: string;
  path: string;
  /**
   * Social-Media-Vorschaubild unter public/og (1200 × 630), z. B. "umzuege".
   * Erzeugt mit Logo, Seitentitel und Telefonnummer – sieht in WhatsApp, Facebook & Co. aus wie eine Anzeige.
   */
  ogImage?: string;
  /** Titel ohne angehängten Firmennamen verwenden (Startseite) */
  absoluteTitle?: boolean;
  /** Nicht in den Suchindex aufnehmen (Impressum, Datenschutz) */
  noIndex?: boolean;
};

/** Einheitliche Metadaten (Canonical, Open Graph, Twitter/X) für jede Seite. */
export function createMetadata({
  title,
  description,
  path,
  ogImage = "startseite",
  absoluteTitle = false,
  noIndex = false,
}: PageMetadataInput): Metadata {
  const fullTitle = absoluteTitle ? title : `${title} | ${siteConfig.name}`;
  const image = { url: `/og/${ogImage}.jpg`, width: 1200, height: 630, alt: fullTitle };

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      type: "website",
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image.url],
    },
    ...(noIndex && { robots: { index: false, follow: true } }),
  };
}
