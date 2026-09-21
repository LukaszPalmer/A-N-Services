import type { ImageAsset } from "@/types";

/*
 * Zentrale Bildverwaltung
 * ---------------------------------------------------------------------------
 * Alle Bilder liegen lokal unter src/assets/images (2400px, von Unsplash geladen).
 * Lizenz: Unsplash License – kostenlos, auch kommerziell, keine Namensnennung nötig.
 * https://unsplash.com/license
 *
 * Bild austauschen: neue Datei in src/assets/images ablegen und hier den Import ändern.
 * Breite/Höhe und Blur-Platzhalter berechnet Next.js automatisch.
 *
 * Regel: Jeder Import trägt einen Kommentar mit Quell-Link und Fotograf.
 */

// Quelle: https://unsplash.com/photos/couple-sitting-among-moving-boxes-in-new-home-QpRjfYmGtbk
// Fotograf: Vitaly Gariev
import heroPaarUmzugskartons from "@/assets/images/hero-paar-umzugskartons.jpg";

// Quelle: https://unsplash.com/photos/couple-carrying-moving-boxes-into-a-new-home-vV5iOAidkQE
// Fotograf: Vitaly Gariev
import umzugKartonsTragen from "@/assets/images/umzug-kartons-tragen.jpg";

// Quelle: https://unsplash.com/photos/-Ifr1HGFeW8
// Fotograf: Caleb Woods
import montageSchraubenzieher from "@/assets/images/montage-schraubenzieher.jpg";

// Quelle: https://unsplash.com/photos/a-garage-filled-with-lots-of-clutter-and-tools-iQgzdRbxbDI
// Fotograf: Richard Bell
import entruempelungGarage from "@/assets/images/entruempelung-garage.jpg";

// Quelle: https://unsplash.com/photos/an-empty-room-with-white-walls-and-wooden-floors-WrqAto1j19Y
// Fotograf: Alex Tyson
import raumBesenrein from "@/assets/images/raum-besenrein.jpg";

// Quelle: https://unsplash.com/photos/couple-carrying-boxes-into-a-new-home-KqqKF9lDg8Q
// Fotograf: Vitaly Gariev
import neuesZuhauseEinzug from "@/assets/images/neues-zuhause-einzug.jpg";

// Quelle: https://unsplash.com/photos/couple-happily-moving-into-a-new-home-x8l4lN6-xd0
// Fotograf: Vitaly Gariev
import schluesseluebergabe from "@/assets/images/schluesseluebergabe.jpg";

// Quelle: https://unsplash.com/photos/couple-holding-moving-boxes-and-plant-k9_AOod2Mj0
// Fotograf: Vitaly Gariev
import paarKartonsPflanze from "@/assets/images/paar-kartons-pflanze.jpg";

// Quelle: https://unsplash.com/photos/empty-room-with-wooden-floor-and-large-window-4YhNRgL59Fc
// Fotograf: Christian Lue
import bodenAltbauDielen from "@/assets/images/boden-altbau-dielen.jpg";

// Quelle: https://unsplash.com/photos/a-paint-roller-applying-blue-paint-to-a-white-wall-Cl-OpYWFFm0
// Fotograf: Theme Photos
import malerFarbrolleWand from "@/assets/images/maler-farbrolle-wand.jpg";

// Quelle: https://unsplash.com/photos/person-pruning-juniper-bush-with-shears-PKcTuA_CRAo
// Fotografin: Crystal Jo
import gartenHeckenschnitt from "@/assets/images/garten-heckenschnitt.jpg";

export const images = {
  hero: {
    src: heroPaarUmzugskartons,
    alt: "Glückliches Paar sitzt entspannt zwischen Umzugskartons in der neuen Wohnung",
  },
  umzug: {
    src: umzugKartonsTragen,
    alt: "Paar trägt Umzugskartons in das neue Zuhause",
  },
  montage: {
    src: montageSchraubenzieher,
    alt: "Hände arbeiten präzise mit Werkzeug an einer Montage",
  },
  entruempelung: {
    src: entruempelungGarage,
    alt: "Vollgestellte Garage mit Werkzeug und Gerümpel vor der Entrümpelung",
  },
  boden: {
    src: bodenAltbauDielen,
    alt: "Heller Altbauraum mit frisch verlegtem Holzboden und Sonnenlicht am Fenster",
  },
  maler: {
    src: malerFarbrolleWand,
    alt: "Farbrolle trägt taubenblaue Wandfarbe gleichmäßig auf eine weiße Wand auf",
  },
  garten: {
    src: gartenHeckenschnitt,
    alt: "Gärtner schneidet mit Handschuhen und Gartenschere eine grüne Hecke in Form",
  },
  besenrein: {
    src: raumBesenrein,
    alt: "Leerer, heller Raum mit Holzboden – besenrein übergeben",
  },
  einzug: {
    src: neuesZuhauseEinzug,
    alt: "Paar betritt mit Umzugskartons das neue Zuhause",
  },
  schluessel: {
    src: schluesseluebergabe,
    alt: "Paar freut sich über die Schlüssel zur neuen Wohnung",
  },
  kontakt: {
    src: paarKartonsPflanze,
    alt: "Lachendes Paar mit Umzugskarton und Pflanze",
  },
} satisfies Record<string, ImageAsset>;
