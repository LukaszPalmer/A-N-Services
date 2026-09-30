import { siteConfig } from "@/config/site";
import { reviewProfile } from "@/content/reviews";
import { services } from "@/content/services";
import type { FaqItem, Service } from "@/types";

/*
 * Strukturierte Daten (schema.org, JSON-LD) für Google und KI-Suchsysteme.
 * ---------------------------------------------------------------------------
 * Alle Knoten verweisen per `@id` aufeinander: Die Firma (LocalBusiness) wird
 * einmal im Layout beschrieben, Leistungs-, FAQ- und Breadcrumb-Daten der
 * einzelnen Seiten hängen sich daran. So entsteht ein zusammenhängender
 * "Knowledge Graph" – genau das, was Google (inkl. KI-Übersichten) und
 * Antwortmaschinen wie ChatGPT oder Perplexity auswerten.
 *
 * Prüfen: https://search.google.com/test/rich-results
 *         https://validator.schema.org/
 */

type JsonLdObject = Record<string, unknown>;

/** Absolute URL zur öffentlichen Domain */
export const absoluteUrl = (path: string) => new URL(path, siteConfig.url).toString();

const ids = {
  business: absoluteUrl("/#business"),
  website: absoluteUrl("/#website"),
};

const areaServed = [
  ...siteConfig.serviceArea.cities.map((name) => ({ "@type": "City", name })),
  ...siteConfig.serviceArea.regions.map((name) => ({ "@type": "AdministrativeArea", name })),
  { "@type": "Country", name: "Deutschland" },
];

/** Die Firma – Umzugsunternehmen und Handwerksbetrieb mit Sitz in Moers */
export function businessJsonLd(): JsonLdObject {
  const { contact } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": ["MovingCompany", "HomeAndConstructionBusiness"],
    "@id": ids.business,
    name: siteConfig.name,
    description: siteConfig.description,
    slogan: siteConfig.claim,
    url: absoluteUrl("/"),
    logo: absoluteUrl("/brand/icon-512.png"),
    image: absoluteUrl("/og/startseite.jpg"),
    telephone: contact.phone,
    email: contact.email,
    founder: { "@type": "Person", name: siteConfig.owner },
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.address.street,
      postalCode: contact.address.zip,
      addressLocality: contact.address.city,
      addressRegion: contact.address.region,
      addressCountry: "DE",
    },
    hasMap: contact.mapsHref,
    // Profile auf anderen Plattformen. Bewusst ohne `aggregateRating`: Google untersagt,
    // Bewertungen fremder Websites (hier MyHammer) als eigene Sterne auszuzeichnen.
    sameAs: [reviewProfile.profileUrl],
    areaServed,
    // Rund um die Uhr geöffnet
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    currenciesAccepted: "EUR",
    // siehe content/faq.ts ("Welche Zahlungsmöglichkeiten gibt es?")
    paymentAccepted: "Barzahlung, Überweisung, EC-Karte",
    knowsAbout: services.flatMap((service) => [service.title, ...service.keywords.slice(0, 3)]),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Leistungen",
      itemListElement: services.map((service) => ({
        "@type": "Offer",
        itemOffered: { "@id": serviceId(service) },
      })),
    },
  };
}

/** Die Website selbst – inkl. Nennung der umsetzenden Agentur */
export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": ids.website,
    url: absoluteUrl("/"),
    name: siteConfig.name,
    description: siteConfig.description,
    inLanguage: "de-DE",
    publisher: { "@id": ids.business },
    creator: {
      "@type": "Organization",
      name: siteConfig.webdesign.name,
      url: siteConfig.webdesign.url,
    },
  };
}

const serviceId = (service: Service) => `${absoluteUrl(service.href)}#service`;

/** Eine Leistung (Detailseite) inkl. Leistungsbausteinen */
export function serviceJsonLd(service: Service): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": serviceId(service),
    name: service.headline,
    serviceType: service.title,
    description: service.seoDescription,
    url: absoluteUrl(service.href),
    image: absoluteUrl(service.image.src.src),
    provider: { "@id": ids.business },
    areaServed,
    keywords: service.keywords.join(", "),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: service.title,
      itemListElement: service.features.map((feature) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: feature.title, description: feature.description },
      })),
    },
  };
}

/** Häufige Fragen einer Seite */
export function faqJsonLd(items: FaqItem[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** Brotkrumen-Pfad einer Seite */
export function breadcrumbJsonLd(trail: { label: string; href: string }[]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.label,
      item: absoluteUrl(crumb.href),
    })),
  };
}
