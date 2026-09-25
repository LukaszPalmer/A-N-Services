import { services } from "@/content/services";
import type { NavItem } from "@/types";

/** Zentrale Firmendaten. */
const name = "A&N Service";

export const siteConfig = {
  name,
  /** Inhaber – für Impressum, Datenschutz und strukturierte Daten */
  owner: "Ahmad Alnasar",
  claim: "Wir packen das.",
  description: `${name} – Ihr Experte für Umzüge, Montage, Entrümpelung, Bodenverlegung, Malerarbeiten und Gartenpflege. Zuverlässig, versichert, zum fairen Festpreis und rund um die Uhr erreichbar.`,
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  locale: "de_DE",
  contact: {
    phone: "+49 178 6668590",
    phoneHref: "tel:+491786668590",
    email: "kontakt@services-an.de",
    emailHref: "mailto:kontakt@services-an.de",
    whatsappHref: "https://wa.me/491786668590",
    address: {
      street: "Homberger Straße 83",
      zip: "47441",
      city: "Moers",
    },
    /** 24/7 – wird im Footer, auf der Kontaktseite und in den strukturierten Daten ausgegeben */
    openingHours: [{ days: "Mo – So", hours: "00:00 – 24:00 Uhr" }],
    openingHoursNote: "24 Stunden geöffnet – rund um die Uhr für Sie erreichbar.",
    openingHoursShort: "24 h geöffnet",
  },
} as const;

/**
 * Hauptnavigation. "Leistungen" trägt alle Einzelleistungen als Untermenü
 * (Desktop: Dropdown im Header, Mobil: eingerückte Liste im Menü).
 * Die Untereinträge kommen direkt aus `content/services.ts` – eine neue Leistung
 * dort anlegen genügt, die Navigation aktualisiert sich mit.
 */
export const mainNav: NavItem[] = [
  {
    label: "Leistungen",
    href: "/leistungen",
    children: services.map((service) => ({ label: service.title, href: service.href })),
  },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export const legalNav: NavItem[] = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
];
