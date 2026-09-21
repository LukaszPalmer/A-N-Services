import type { ReactNode } from "react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { MobileContactBar } from "@/components/layout/mobile-contact-bar";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

/**
 * Layout der öffentlichen Website (Route Group "(site)").
 * Weitere Bereiche – z. B. später ein Admin-Dashboard – bekommen eine eigene Route Group
 * mit eigenem Layout, ohne dass sich die URLs ändern.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd />
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

/** Strukturierte Daten für Google (LocalBusiness → MovingCompany + Handwerk). */
function JsonLd() {
  const { contact } = siteConfig;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "HomeAndConstructionBusiness"],
    name: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    telephone: contact.phone,
    email: contact.email,
    founder: { "@type": "Person", name: siteConfig.owner },
    // Sitz in Moers, Aufträge regional und deutschlandweit (siehe content/faq.ts)
    areaServed: [
      { "@type": "City", name: contact.address.city },
      { "@type": "Country", name: "DE" },
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.zip,
      addressLocality: contact.address.city,
      addressCountry: "DE",
    },
    // Rund um die Uhr geöffnet
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: service.title,
          description: service.description,
          url: new URL(service.href, siteConfig.url).toString(),
        },
      })),
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
    />
  );
}
