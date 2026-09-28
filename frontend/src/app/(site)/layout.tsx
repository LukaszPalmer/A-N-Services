import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { JsonLd } from "@/components/seo/json-ld";
import { businessJsonLd, websiteJsonLd } from "@/lib/structured-data";

/**
 * Layout der öffentlichen Website (Route Group "(site)").
 * Weitere Bereiche – z. B. später ein Admin-Dashboard – bekommen eine eigene Route Group
 * mit eigenem Layout, ohne dass sich die URLs ändern.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Firma + Website als Grundknoten der strukturierten Daten (siehe lib/structured-data.ts) */}
      <JsonLd data={[businessJsonLd(), websiteJsonLd()]} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink-950 focus:px-5 focus:py-3 focus:text-white"
      >
        Zum Inhalt springen
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer />
      <MobileContactBar />
    </>
  );
}
