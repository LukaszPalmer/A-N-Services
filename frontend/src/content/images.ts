import type { ImageAsset, MediaCredit } from "@/types";

/*
 * Zentrale Bildverwaltung
 * ---------------------------------------------------------------------------
 * Alle Bilder liegen lokal unter src/assets/images (max. 2400 px breit) und werden
 * selbst ausgeliefert – beim Seitenaufruf entsteht KEINE Verbindung zu Pexels oder
 * Unsplash. Neue Pexels-Fotos sind einheitlich leicht farbkorrigiert
 * (Sättigung −7 %, Kontrast +4 %), damit sie zu den Videos passen.
 *
 * Lizenzen (Details: content/licenses.ts):
 *   Pexels-Lizenz   – kostenlos, auch kommerziell, Namensnennung nicht nötig
 *   Unsplash-Lizenz – kostenlos, auch kommerziell, Namensnennung nicht nötig
 * Die Urheber:innen nennen wir trotzdem im Impressum (Bild- und Videonachweis).
 *
 * Bild austauschen: neue Datei in src/assets/images ablegen, hier den Import und
 * die Quellenangabe (`credit`) ändern. Breite/Höhe und Blur-Platzhalter berechnet
 * Next.js automatisch.
 *
 * Regel: Jeder Import trägt einen Kommentar mit Quell-Link und Fotograf:in.
 */

// Quelle: https://www.pexels.com/photo/men-carrying-boxes-inside-the-house-7464232/
// Fotograf: RDNE Stock project
import umzugTeamKartons from "@/assets/images/umzug-team-kartons.jpg";

// Quelle: https://www.pexels.com/photo/unrecognizable-man-hands-assembling-baby-cot-5217124/
// Fotograf: Yan Krukau
import montageInbusschluessel from "@/assets/images/montage-inbusschluessel.jpg";

// Quelle: https://www.pexels.com/photo/close-up-shot-of-men-carrying-a-couch-7464393/
// Fotograf: RDNE Stock project
import entruempelungSofaRaustragen from "@/assets/images/entruempelung-sofa-raustragen.jpg";

// Quelle: https://www.pexels.com/photo/crop-man-installing-laminate-flooring-4263067/
// Fotograf:in: kelly (Pexels)
import bodenLaminatVerlegen from "@/assets/images/boden-laminat-verlegen.jpg";

// Quelle: https://unsplash.com/photos/a-paint-roller-applying-blue-paint-to-a-white-wall-Cl-OpYWFFm0
// Fotograf: Theme Photos
import malerFarbrolleWand from "@/assets/images/maler-farbrolle-wand.jpg";

// Quelle: https://unsplash.com/photos/person-pruning-juniper-bush-with-shears-PKcTuA_CRAo
// Fotografin: Crystal Jo
import gartenHeckenschnitt from "@/assets/images/garten-heckenschnitt.jpg";

// Quelle: https://unsplash.com/photos/an-empty-room-with-white-walls-and-wooden-floors-WrqAto1j19Y
// Fotograf: Alex Tyson
import raumBesenrein from "@/assets/images/raum-besenrein.jpg";

// Quelle: https://unsplash.com/photos/couple-happily-moving-into-a-new-home-x8l4lN6-xd0
// Fotograf: Vitaly Gariev
import schluesseluebergabe from "@/assets/images/schluesseluebergabe.jpg";

// Quelle: https://www.pexels.com/photo/man-in-black-zip-up-jacket-and-blue-denim-jeans-sitting-on-brown-wooden-table-7464726/
// Fotograf: RDNE Stock project
import teamUmzugshelfer from "@/assets/images/team-umzugshelfer.jpg";

// Quelle: https://www.pexels.com/photo/close-up-shot-of-men-carrying-a-couch-7464662/
// Fotograf: RDNE Stock project
import teamSofaTragen from "@/assets/images/team-sofa-tragen.jpg";

const rdne = { author: "RDNE Stock project", authorUrl: "https://www.pexels.com/@rdne/", platform: "Pexels" } as const;

export const images = {
  umzug: {
    src: umzugTeamKartons,
    alt: "Zwei Umzugshelfer in Arbeitskleidung tragen Kartons durch eine helle Wohnung",
    credit: {
      ...rdne,
      title: "Umzugsteam trägt Kartons",
      sourceUrl: "https://www.pexels.com/photo/men-carrying-boxes-inside-the-house-7464232/",
    },
  },
  montage: {
    src: montageInbusschluessel,
    alt: "Hände montieren ein Holzmöbel präzise mit dem Inbusschlüssel",
    credit: {
      title: "Möbelmontage mit Inbusschlüssel",
      author: "Yan Krukau",
      authorUrl: "https://www.pexels.com/@yankrukov/",
      sourceUrl: "https://www.pexels.com/photo/unrecognizable-man-hands-assembling-baby-cot-5217124/",
      platform: "Pexels",
    },
  },
  entruempelung: {
    src: entruempelungSofaRaustragen,
    alt: "Zwei Helfer tragen ein Sofa bei einer Entrümpelung aus dem Haus",
    credit: {
      ...rdne,
      title: "Sofa wird hinausgetragen",
      sourceUrl: "https://www.pexels.com/photo/close-up-shot-of-men-carrying-a-couch-7464393/",
    },
  },
  boden: {
    src: bodenLaminatVerlegen,
    alt: "Handwerker verlegt Laminat Diele für Diele mit dem Gummihammer",
    credit: {
      title: "Laminat wird verlegt",
      author: "kelly",
      authorUrl: "https://www.pexels.com/@kelly/",
      sourceUrl: "https://www.pexels.com/photo/crop-man-installing-laminate-flooring-4263067/",
      platform: "Pexels",
    },
  },
  maler: {
    src: malerFarbrolleWand,
    alt: "Farbrolle trägt taubenblaue Wandfarbe gleichmäßig auf eine weiße Wand auf",
    credit: {
      title: "Farbrolle an der Wand",
      author: "Theme Photos",
      authorUrl: "https://unsplash.com/@themephotos",
      sourceUrl: "https://unsplash.com/photos/a-paint-roller-applying-blue-paint-to-a-white-wall-Cl-OpYWFFm0",
      platform: "Unsplash",
    },
  },
  garten: {
    src: gartenHeckenschnitt,
    alt: "Gärtner schneidet mit Handschuhen und Gartenschere eine grüne Hecke in Form",
    credit: {
      title: "Heckenschnitt",
      author: "Crystal Jo",
      authorUrl: "https://unsplash.com/@crystalsjo",
      sourceUrl: "https://unsplash.com/photos/person-pruning-juniper-bush-with-shears-PKcTuA_CRAo",
      platform: "Unsplash",
    },
  },
  besenrein: {
    src: raumBesenrein,
    alt: "Leerer, heller Raum mit Holzboden – besenrein übergeben",
    credit: {
      title: "Besenreiner Raum",
      author: "Alex Tyson",
      authorUrl: "https://unsplash.com/@alextyson195",
      sourceUrl: "https://unsplash.com/photos/an-empty-room-with-white-walls-and-wooden-floors-WrqAto1j19Y",
      platform: "Unsplash",
    },
  },
  schluessel: {
    src: schluesseluebergabe,
    alt: "Paar freut sich über die Schlüssel zur neuen Wohnung",
    credit: {
      title: "Schlüsselübergabe",
      author: "Vitaly Gariev",
      authorUrl: "https://unsplash.com/@silverkblack",
      sourceUrl: "https://unsplash.com/photos/couple-happily-moving-into-a-new-home-x8l4lN6-xd0",
      platform: "Unsplash",
    },
  },
  team: {
    src: teamUmzugshelfer,
    alt: "Lächelnder Umzugshelfer in Arbeitskleidung verschließt einen Umzugskarton",
    credit: {
      ...rdne,
      title: "Umzugshelfer beim Packen",
      sourceUrl:
        "https://www.pexels.com/photo/man-in-black-zip-up-jacket-and-blue-denim-jeans-sitting-on-brown-wooden-table-7464726/",
    },
  },
  teamSofa: {
    src: teamSofaTragen,
    alt: "Zwei Umzugshelfer tragen gemeinsam ein grünes Sofa durch einen hellen Raum",
    credit: {
      ...rdne,
      title: "Team trägt ein Sofa",
      sourceUrl: "https://www.pexels.com/photo/close-up-shot-of-men-carrying-a-couch-7464662/",
    },
  },
} satisfies Record<string, ImageAsset & { credit: MediaCredit }>;

/** Alle Bildnachweise – für das Impressum */
export const imageCredits: MediaCredit[] = Object.values(images).map((image) => image.credit);
