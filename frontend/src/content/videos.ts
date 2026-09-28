import type { MediaCredit, VideoAsset } from "@/types";

/*
 * Zentrale Videoverwaltung – Hintergrundvideos der Seiten-Banner
 * ---------------------------------------------------------------------------
 * Alle Clips stammen von Pexels (Pexels-Lizenz, siehe content/licenses.ts):
 * kostenlos, auch kommerziell, ohne Pflicht zur Namensnennung, Bearbeitung erlaubt.
 * Wir nennen die Urheber:innen trotzdem im Impressum (Bild- und Videonachweis).
 *
 * Die Dateien liegen selbst gehostet unter public/videos – es wird beim Abspielen
 * KEINE Verbindung zu Pexels aufgebaut (wichtig für den Datenschutz).
 *
 * Aufbereitung (ffmpeg): gekürzt, nahtlos geloopt (Ende blendet in den Anfang),
 * leicht farbkorrigiert, ohne Tonspur, H.264 mit "faststart".
 *   <name>.mp4         1920 × 1080 (Desktop/Tablet)
 *   <name>-mobile.mp4   540 × 960  (Hochformat-Ausschnitt fürs Smartphone)
 *   src/assets/videos/<name>.jpg  Standbild aus dem ersten Frame (Poster)
 *
 * Video austauschen: neue Dateien unter gleichem Namen ablegen und hier die
 * Quellenangaben anpassen. Regel: Jeder Clip trägt Quell-Link und Urheber:in.
 */

import posterBodenverlegung from "@/assets/videos/bodenverlegung.jpg";
import posterEntruempelung from "@/assets/videos/entruempelung.jpg";
import posterGartenpflege from "@/assets/videos/gartenpflege.jpg";
import posterKontakt from "@/assets/videos/kontakt.jpg";
import posterLeistungen from "@/assets/videos/leistungen.jpg";
import posterMalerarbeiten from "@/assets/videos/malerarbeiten.jpg";
import posterMontageservice from "@/assets/videos/montageservice.jpg";
import posterStartseite from "@/assets/videos/startseite.jpg";
import posterUeberUns from "@/assets/videos/ueber-uns.jpg";
import posterUmzuege from "@/assets/videos/umzuege.jpg";
import posterUmzugskartons from "@/assets/videos/umzugskartons.jpg";

/** Einzelne Pexels-Clips (Rohmaterial), aus denen die Seitenvideos geschnitten sind. */
const clips = {
  // Quelle: https://www.pexels.com/video/low-angle-shot-of-men-loading-boxes-in-the-back-of-a-van-9507654/
  // Urheber: K2 Production
  transporterBeladen: {
    title: "Kartons werden in einen Transporter geladen",
    author: "K2 Production",
    authorUrl: "https://www.pexels.com/@k2production/",
    sourceUrl: "https://www.pexels.com/video/low-angle-shot-of-men-loading-boxes-in-the-back-of-a-van-9507654/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/person-drilling-a-screw-in-a-wood-4957789/
  // Urheberin: Tima Miroshnichenko
  schraubeBohren: {
    title: "Akkuschrauber dreht eine Schraube ins Holz",
    author: "Tima Miroshnichenko",
    authorUrl: "https://www.pexels.com/@tima-miroshnichenko/",
    sourceUrl: "https://www.pexels.com/video/person-drilling-a-screw-in-a-wood-4957789/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/movers-carrying-a-couch-7463990/
  // Urheber: RDNE Stock project
  sofaHinaustragen: {
    title: "Zwei Umzugshelfer tragen ein Sofa hinaus",
    author: "RDNE Stock project",
    authorUrl: "https://www.pexels.com/@rdne/",
    sourceUrl: "https://www.pexels.com/video/movers-carrying-a-couch-7463990/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/video-of-a-house-interior-7578554/
  // Urheber: Kindel Media
  holzbodenWohnraum: {
    title: "Kamerafahrt über einen hellen Holzboden im Wohnraum",
    author: "Kindel Media",
    authorUrl: "https://www.pexels.com/@kindelmedia/",
    sourceUrl: "https://www.pexels.com/video/video-of-a-house-interior-7578554/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/person-painting-a-wall-6473946/
  // Urheberin: Tima Miroshnichenko
  malerTotale: {
    title: "Maler streicht eine Wand mit der Teleskoprolle",
    author: "Tima Miroshnichenko",
    authorUrl: "https://www.pexels.com/@tima-miroshnichenko/",
    sourceUrl: "https://www.pexels.com/video/person-painting-a-wall-6473946/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/person-painting-a-wall-6473944/
  // Urheberin: Tima Miroshnichenko
  malerNah: {
    title: "Farbrolle in Nahaufnahme an der Wand",
    author: "Tima Miroshnichenko",
    authorUrl: "https://www.pexels.com/@tima-miroshnichenko/",
    sourceUrl: "https://www.pexels.com/video/person-painting-a-wall-6473944/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/lawn-mowing-with-electric-mower-in-spring-31290564/
  // Urheber: Karl Byron
  rasenMaehen: {
    title: "Rasenmäher im Gegenlicht auf einer Frühlingswiese",
    author: "Karl Byron",
    authorUrl: "https://www.pexels.com/@karl-byron-568836130/",
    sourceUrl: "https://www.pexels.com/video/lawn-mowing-with-electric-mower-in-spring-31290564/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/a-person-trimming-plants-4153438/
  // Urheber: Zbigniew Bielecki
  heckeSchneiden: {
    title: "Buchsbaum wird mit der Akku-Heckenschere geschnitten",
    author: "Zbigniew Bielecki",
    authorUrl: "https://www.pexels.com/@zbigniew-bielecki-102835/",
    sourceUrl: "https://www.pexels.com/video/a-person-trimming-plants-4153438/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/two-men-carrying-boxes-7464109/
  // Urheber: RDNE Stock project
  kartonsTragen: {
    title: "Zwei Umzugshelfer tragen Kartons durch eine helle Wohnung",
    author: "RDNE Stock project",
    authorUrl: "https://www.pexels.com/@rdne/",
    sourceUrl: "https://www.pexels.com/video/two-men-carrying-boxes-7464109/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/video-of-a-man-putting-hinge-7314251/
  // Urheberin: Karolina Grabowska (Kaboompics)
  scharnierMontage: {
    title: "Scharnier wird mit Handschuh und Akkuschrauber montiert",
    author: "Karolina Grabowska (Kaboompics)",
    authorUrl: "https://www.pexels.com/@karola-g/",
    sourceUrl: "https://www.pexels.com/video/video-of-a-man-putting-hinge-7314251/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/a-woman-sweeping-the-floor-6865253/
  // Urheber: cottonbro studio
  besenrein: {
    title: "Parkettboden wird mit Besen und Kehrschaufel gefegt",
    author: "cottonbro studio",
    authorUrl: "https://www.pexels.com/@cottonbro/",
    sourceUrl: "https://www.pexels.com/video/a-woman-sweeping-the-floor-6865253/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/movers-setting-up-boxes-for-packaging-7463917/
  // Urheber: RDNE Stock project
  teamPackt: {
    title: "Zwei Umzugshelfer bereiten Kartons zum Packen vor",
    author: "RDNE Stock project",
    authorUrl: "https://www.pexels.com/@rdne/",
    sourceUrl: "https://www.pexels.com/video/movers-setting-up-boxes-for-packaging-7463917/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/woman-using-her-cellphone-7205255/
  // Urheber: SHVETS production
  kundinSmartphone: {
    title: "Frau schreibt zwischen Umzugskartons auf dem Smartphone",
    author: "SHVETS production",
    authorUrl: "https://www.pexels.com/@shvets-production/",
    sourceUrl: "https://www.pexels.com/video/woman-using-her-cellphone-7205255/",
    platform: "Pexels",
  },
  // Quelle: https://www.pexels.com/video/a-room-with-many-boxes-stacked-on-top-of-each-other-4553292/
  // Urheber: cottonbro studio
  kartonsImLicht: {
    title: "Gestapelte Umzugskartons im Sonnenlicht",
    author: "cottonbro studio",
    authorUrl: "https://www.pexels.com/@cottonbro/",
    sourceUrl: "https://www.pexels.com/video/a-room-with-many-boxes-stacked-on-top-of-each-other-4553292/",
    platform: "Pexels",
  },
} satisfies Record<string, MediaCredit>;

function video(name: string, poster: VideoAsset["poster"], description: string, credits: MediaCredit[], focus?: string): VideoAsset {
  return { src: `/videos/${name}.mp4`, mobileSrc: `/videos/${name}-mobile.mp4`, poster, description, credits, focus };
}

export const videos = {
  /** Startseite: Brand-Film – alle sechs Leistungen in 14 Sekunden */
  startseite: video("startseite", posterStartseite, "Zusammenschnitt: Umzug, Montage, Entrümpelung, Boden, Malerarbeiten und Gartenpflege", [
    clips.transporterBeladen,
    clips.schraubeBohren,
    clips.sofaHinaustragen,
    clips.holzbodenWohnraum,
    clips.malerTotale,
    clips.rasenMaehen,
  ]),
  /** Leistungsübersicht: zweiter Zusammenschnitt mit anderen Motiven */
  leistungen: video("leistungen", posterLeistungen, "Zusammenschnitt aller Leistungen", [
    clips.holzbodenWohnraum,
    clips.kartonsTragen,
    clips.scharnierMontage,
    clips.besenrein,
    clips.malerNah,
    clips.heckeSchneiden,
  ]),
  umzuege: video("umzuege", posterUmzuege, "Umzugsteam trägt Kartons in die neue Wohnung", [clips.kartonsTragen], "45% center"),
  montageservice: video("montageservice", posterMontageservice, "Montage eines Scharniers mit dem Akkuschrauber", [clips.scharnierMontage]),
  entruempelung: video("entruempelung", posterEntruempelung, "Umzugshelfer tragen ein Sofa aus dem Haus", [clips.sofaHinaustragen]),
  bodenverlegung: video("bodenverlegung", posterBodenverlegung, "Heller Wohnraum mit neuem Holzboden", [clips.holzbodenWohnraum]),
  malerarbeiten: video("malerarbeiten", posterMalerarbeiten, "Maler streicht eine Wand", [clips.malerTotale], "35% center"),
  gartenpflege: video("gartenpflege", posterGartenpflege, "Rasenmähen im Frühling", [clips.rasenMaehen], "30% center"),
  ueberUns: video("ueber-uns", posterUeberUns, "Team bereitet Umzugskartons vor", [clips.teamPackt], "45% center"),
  kontakt: video("kontakt", posterKontakt, "Kundin schreibt zwischen Umzugskartons eine Nachricht", [clips.kundinSmartphone], "30% center"),
  /** Ruhiges Motiv für Impressum, Datenschutz und 404 */
  umzugskartons: video("umzugskartons", posterUmzugskartons, "Umzugskartons im Sonnenlicht", [clips.kartonsImLicht]),
} satisfies Record<string, VideoAsset>;

/** Alle verwendeten Clips (ohne Dubletten) – für den Bild- und Videonachweis im Impressum. */
export const videoCredits: MediaCredit[] = Object.values(clips);
