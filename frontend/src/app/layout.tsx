import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Outfit } from "next/font/google";

import { OffscreenAnimationPauser } from "@/components/ui/offscreen-animation-pauser";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { siteConfig } from "@/config/site";

import "./globals.css";

// Outfit – geometrische Sans-Serif, Basis der Marke (auch das Logo ist daraus gezeichnet)
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

// Instrument Serif kursiv – Akzentschrift für hervorgehobene Wörter in Überschriften
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Umzugsunternehmen Moers – Umzug, Montage & Entrümpelung | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.webdesign.name,
  publisher: siteConfig.name,
  category: "Umzugsunternehmen",
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
    images: [{ url: "/og/startseite.jpg", width: 1200, height: 630, alt: `${siteConfig.name} – ${siteConfig.primaryKeyword}` }],
  },
  twitter: { card: "summary_large_image", images: ["/og/startseite.jpg"] },
  robots: {
    index: true,
    follow: true,
    // Große Bild-Vorschauen und ausführliche Textauszüge in der Google-Suche (inkl. KI-Übersichten) erlauben
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { telephone: false },
  other: {
    // Regionale Zuordnung für lokale Suche
    "geo.region": siteConfig.contact.address.regionCode,
    "geo.placename": siteConfig.contact.address.city,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1320",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${outfit.variable} ${instrumentSerif.variable}`}>
      <body className="flex min-h-dvh flex-col">
        {children}
        <RevealObserver />
        <OffscreenAnimationPauser />
      </body>
    </html>
  );
}
