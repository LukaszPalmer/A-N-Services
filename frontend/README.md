# A&N Service – Frontend

Website für A&N Service, Inhaber Ahmad Alnasar – Umzüge, Montage, Entrümpelung,
Bodenverlegung, Malerarbeiten und Gartenpflege. Rund um die Uhr erreichbar.
**Stack:** Next.js 16 (App Router, Turbopack) · React 19 · TypeScript (strict) · Tailwind CSS v4

## Befehle

```bash
npm run dev        # Entwicklung → http://localhost:3000
npm run build      # Produktions-Build
npm run start      # Produktions-Server
npm run lint       # ESLint
npm run typecheck  # Routen-Typen generieren + tsc
```

Umgebungsvariablen: `.env.example` nach `.env.local` kopieren.

## Kontaktformular (E-Mail-Versand)

Anfragen aus dem Formular gehen per Server Action (`src/lib/contact/actions.ts`) als E-Mail an
`kontakt@services-an.de` – verschickt über das IONOS-Postfach selbst (SMTP, `src/lib/mail.ts`).
„Antworten“ im Postfach schreibt direkt der anfragenden Person (Reply-To).

Nötige Umgebungsvariablen: `SMTP_USER` und `SMTP_PASSWORD` (Postfach-Zugangsdaten),
optional `SMTP_HOST` (Standard `smtp.ionos.de`) und `SMTP_PORT` (Standard `465`).
Lokal in `.env.local`, live in Vercel unter **Settings → Environment Variables** – danach
neu deployen. Das Repository ist öffentlich: Zugangsdaten niemals committen.
Wird das Postfach-Passwort bei IONOS geändert, muss es an beiden Stellen nachgezogen werden.

## Ordnerstruktur

```
src/
├── app/                        # Nur Routing (App Router)
│   ├── (site)/                 # Route Group: öffentliche Website mit Header/Footer
│   │   ├── layout.tsx          #   Header, Footer, Skip-Link, JSON-LD
│   │   ├── page.tsx            #   /               Startseite
│   │   ├── leistungen/         #   /leistungen     Übersicht
│   │   ├── umzuege/            #   /umzuege         ┐
│   │   ├── montageservice/     #   /montageservice  │
│   │   ├── entruempelung/      #   /entruempelung   ├ nutzen alle
│   │   ├── bodenverlegung/     #   /bodenverlegung  │ templates/service-page
│   │   ├── malerarbeiten/      #   /malerarbeiten   │
│   │   ├── gartenpflege/       #   /gartenpflege    ┘
│   │   ├── ueber-uns/          #   /ueber-uns
│   │   ├── kontakt/            #   /kontakt
│   │   ├── impressum/          #   /impressum
│   │   └── datenschutz/        #   /datenschutz
│   ├── layout.tsx              # Root-Layout: <html>, Font, globale Metadaten
│   ├── globals.css             # Design-Tokens (Farben, Schatten, Animationen)
│   ├── not-found.tsx           # 404
│   ├── sitemap.ts · robots.ts  # SEO
│   └── icon.svg · opengraph-image.jpg
│
├── components/
│   ├── ui/                     # Basis-Bausteine ohne Fachlogik (Button, Container, Section, …)
│   ├── brand/                  # Logo, Speed-Lines, Fremdmarken (Google, WhatsApp)
│   ├── layout/                 # Header, Footer, Navigation (Leistungen-Dropdown,
│   │                           #   mobile Kontaktleiste am unteren Rand)
│   ├── sections/               # Wiederverwendbare Seitenabschnitte (Hero, FAQ, CTA, …)
│   │   └── moving-story/       #   Scroll-Animation "Von Tür zu Tür" (Szene, Zeitleiste, SVGs)
│   ├── templates/              # Seitenvorlagen (z. B. Leistungs-Detailseite)
│   └── forms/                  # Formulare (Client Components)
│
├── content/                    # Alle Texte & Daten – hier werden Inhalte gepflegt
│   ├── images.ts               #   ⚠ zentrale Bildverwaltung inkl. Quelllinks
│   ├── services.ts · usps.ts · process.ts · faq.ts · stats.ts · reviews.ts
│
├── config/site.ts              # Firmendaten, Kontakt, Navigation
├── hooks/                      # React-Hooks (z. B. useScrollProgress)
├── lib/                        # Hilfsfunktionen (cn, Metadaten, Animation)
│   ├── contact/                #   Kontaktformular: Prüfung, E-Mail-Inhalt, Server Action
│   └── mail.ts                 #   E-Mail-Versand über das IONOS-Postfach (nur Server)
├── types/                      # Gemeinsame TypeScript-Typen
└── assets/images/              # Lokale Bilder (automatisch optimiert + Blur-Platzhalter)
```

**Prinzipien**

- `app/` enthält nur Routing, UI liegt in `components/`, Inhalte in `content/`.
- Server Components per Default; `"use client"` nur, wo Interaktion nötig ist
  (Mobile-Menü, aktiver Nav-Link, Kontaktformular).
- Typsichere Links über `typedRoutes`: ein Tippfehler in einem `href` bricht den Build.
- Keine Barrel-Files (`index.ts`), sondern direkte Imports über `@/…`.

## Design-System

In `src/app/globals.css` (`@theme`) definiert und als Tailwind-Klassen nutzbar:

| Token      | Einsatz                                   | Beispiel                     |
| ---------- | ----------------------------------------- | ---------------------------- |
| `brand-*`  | Signal-Orange: CTAs, Akzente, das „&“     | `bg-brand-500`               |
| `ink-*`    | Nachtblau: Text, dunkle Flächen           | `text-ink-950`, `bg-ink-950` |
| `sand-*`   | Karton-Beige: ruhige Hintergründe         | `bg-sand-50`                 |
| `whatsapp` | Nur für WhatsApp-Aktionen (Markenfarbe)   | `bg-whatsapp`                |

Schrift: **Outfit** (wie im Original). Marken-Motive: die Speed-Lines aus dem Logo,
das orangefarbene „&“ als Wasserzeichen, abgerundete „Inset“-Hero-Karten.

## Leistung hinzufügen oder ändern

1. Eintrag in `src/content/services.ts` ergänzen (inkl. `slug`, `href`, Bild, Features, FAQ).
2. `ServiceSlug` in `src/types/index.ts` um den neuen Slug erweitern.
3. Ordner `src/app/(site)/<slug>/page.tsx` anlegen – vier Zeilen, siehe bestehende Seiten.
4. Bild in `src/assets/images/` ablegen und in `src/content/images.ts` mit Quell-Link
   und Fotograf-Kommentar importieren.

Navigation, Footer, Übersichtsseite, Sitemap, Kontaktformular und strukturierte Daten
ziehen ihre Einträge aus `services.ts` und aktualisieren sich dadurch automatisch.

## Offene Punkte (TODO)

- [x] Firmenname, Inhaber, Öffnungszeiten (24/7), Telefon und Anschrift in `src/config/site.ts`
- [x] Logo & Favicon (`components/brand/logo.tsx`, `app/icon.svg`)
- [ ] E-Mail-Adresse und Domain (`site.ts`, `.env.example`)
- [ ] Kennzahlen in `src/content/stats.ts` und „+10 Jahre“ in `why-us.tsx` bestätigen
- [x] MyHammer-Bewertungen eingebunden (`src/content/reviews.ts`) – Google-Profil folgt
- [ ] Eigene Fotos statt Unsplash (`src/content/images.ts`)
- [ ] Impressum & Datenschutz mit rechtsgültigen Texten (Rechtsform, USt-IdNr.)
- [x] Kontaktformular → IONOS-Postfach (`src/lib/contact/`, Zugangsdaten nur als Umgebungsvariablen)
- [ ] Auftragsverarbeitungsvertrag mit IONOS abschließen (IONOS-Kundenbereich)
