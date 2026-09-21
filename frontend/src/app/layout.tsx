import type { Metadata, Viewport } from "next";
import { Outfit } from "next/font/google";

import { siteConfig } from "@/config/site";

import "./globals.css";

// Outfit – geometrische Sans-Serif wie im Original-Design
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} – Umzüge, Montagen & Entrümpelungen`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  openGraph: {
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#0a1320",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={outfit.variable}>
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
