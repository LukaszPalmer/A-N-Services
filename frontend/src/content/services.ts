import {
  Armchair,
  Brush,
  Building2,
  CalendarDays,
  CookingPot,
  Drill,
  Droplets,
  Flower2,
  Grid2x2,
  House,
  Lamp,
  Layers,
  LayoutGrid,
  Leaf,
  Package,
  PackageOpen,
  PaintRoller,
  Palette,
  Recycle,
  Ruler,
  Scissors,
  Shrub,
  Signpost,
  Sparkles,
  SprayCan,
  Sprout,
  SunSnow,
  Truck,
  Tv,
  Wallpaper,
  Warehouse,
  Wrench,
} from "lucide-react";

import { images } from "@/content/images";
import type { Service, ServiceSlug } from "@/types";

/**
 * Alle Leistungen von A&N Service.
 * Die Reihenfolge hier bestimmt die Reihenfolge in Navigation, Footer,
 * Leistungsübersicht und Kontaktformular.
 * Neue Leistung = neuer Eintrag hier + neuer Ordner unter app/(site)/<slug>/.
 */
export const services: Service[] = [
  {
    slug: "umzuege",
    href: "/umzuege",
    title: "Umzüge",
    tagline: "Stressfrei ins neue Zuhause",
    description:
      "Privat-, Firmen- und Fernumzüge sowie einzelne Möbeltransporte – geplant, verpackt, transportiert und wieder aufgebaut.",
    intro:
      "Ein Umzug ist mehr als Kisten schleppen. Wir übernehmen die komplette Organisation – von der Halteverbotszone über das sichere Verpacken bis zum Aufbau in Ihrem neuen Zuhause. Sie lehnen sich zurück, wir packen das.",
    icon: Truck,
    image: images.umzug,
    highlights: ["Privat- & Firmenumzüge", "Möbeltransporte", "Halteverbotszone inklusive"],
    features: [
      {
        title: "Privatumzug",
        description: "Vom WG-Zimmer bis zum Einfamilienhaus – termintreu und sorgfältig.",
        icon: House,
      },
      {
        title: "Firmenumzug",
        description: "Büros und Praxen, auch am Wochenende, damit Ihr Betrieb weiterläuft.",
        icon: Building2,
      },
      {
        title: "Fernumzug",
        description: "Deutschlandweit mit festen Ansprechpartnern und klarem Zeitplan.",
        icon: Signpost,
      },
      {
        title: "Verpackungsservice",
        description: "Wir liefern Material und verpacken Geschirr, Kleidung und Wertsachen sicher.",
        icon: Package,
      },
      {
        title: "Möbeltransport",
        description: "Einzelne Möbelstücke oder ganze Einrichtungen – gepolstert und gesichert.",
        icon: Truck,
      },
      {
        title: "Ein- & Auspacken",
        description: "Auf Wunsch packen wir am Ziel wieder aus und entsorgen das Material.",
        icon: PackageOpen,
      },
    ],
    faq: [
      {
        question: "Wie früh sollte ich meinen Umzug buchen?",
        answer:
          "Idealerweise 4–6 Wochen vorher, besonders zum Monatsende und in den Sommermonaten. Kurzfristige Termine machen wir aber möglich, wann immer es geht.",
      },
      {
        question: "Kümmern Sie sich um die Halteverbotszone?",
        answer:
          "Ja. Wir beantragen die Halteverbotszone bei der Behörde und stellen die Schilder rechtzeitig auf – vor Ihrer alten und Ihrer neuen Adresse.",
      },
      {
        question: "Sind meine Möbel während des Umzugs versichert?",
        answer:
          "Ja, Ihr Umzugsgut ist während Transport und Montage über unsere Haftpflicht- und Transportversicherung abgesichert.",
      },
    ],
  },
  {
    slug: "montageservice",
    href: "/montageservice",
    title: "Montageservice",
    tagline: "Aufgebaut, angeschlossen, fertig",
    description:
      "Möbel-, Küchen- und Lampenmontage vom Profi. Präzise, schnell und mit dem richtigen Werkzeug.",
    intro:
      "Ob neuer Kleiderschrank, komplette Küche oder die Deckenlampe im Wohnzimmer: Unsere Monteure bauen fachgerecht auf, ab und um – sauber, zügig und mit Blick fürs Detail.",
    icon: Wrench,
    image: images.montage,
    highlights: ["Möbel- & Küchenmontage", "Lampen & Wandmontage", "Ab- und Aufbau beim Umzug"],
    features: [
      {
        title: "Möbelmontage",
        description: "Schränke, Betten, Regale – auch Systemmöbel aller gängigen Hersteller.",
        icon: Armchair,
      },
      {
        title: "Küchenmontage",
        description: "Ab-, Um- und Aufbau Ihrer Küche inklusive Anpassarbeiten.",
        icon: CookingPot,
      },
      {
        title: "Lampen & Leuchten",
        description: "Deckenleuchten, Pendel- und Wandlampen sicher angebracht.",
        icon: Lamp,
      },
      {
        title: "Wandmontage",
        description: "TV-Halterungen, Regale, Gardinenstangen und Bilder – exakt ausgerichtet.",
        icon: Tv,
      },
      {
        title: "Demontage",
        description: "Fachgerechter Abbau vor dem Umzug, damit nichts beschädigt wird.",
        icon: Drill,
      },
      {
        title: "Kleinreparaturen",
        description: "Scharniere nachstellen, Griffe tauschen, Türen einhängen.",
        icon: Wrench,
      },
    ],
    faq: [
      {
        question: "Bauen Sie auch Möbel auf, die ich selbst gekauft habe?",
        answer:
          "Ja, wir montieren Möbel aller gängigen Hersteller – egal ob online bestellt oder aus dem Möbelhaus mitgenommen.",
      },
      {
        question: "Bringen Sie das Werkzeug mit?",
        answer:
          "Selbstverständlich. Unsere Monteure kommen mit vollständiger Ausrüstung inklusive Bohrmaschine, Wasserwaage und Befestigungsmaterial.",
      },
      {
        question: "Wie wird der Montageservice abgerechnet?",
        answer:
          "Nach Aufwand oder als Festpreis – Sie erhalten vorab ein transparentes Angebot, damit es keine Überraschungen gibt.",
      },
    ],
  },
  {
    slug: "entruempelung",
    href: "/entruempelung",
    title: "Entrümpelung",
    tagline: "Platz schaffen – besenrein übergeben",
    description:
      "Wohnungs-, Keller- und Haushaltsauflösungen inklusive fachgerechter Entsorgung und besenreiner Übergabe.",
    intro:
      "Ob Keller, Dachboden oder komplette Haushaltsauflösung: Wir räumen diskret und zügig, trennen fachgerecht und hinterlassen die Räume besenrein. Verwertbares wird gespendet oder recycelt.",
    icon: Recycle,
    image: images.entruempelung,
    highlights: ["Wohnungs- & Haushaltsauflösung", "Keller, Dachboden & Garage", "Besenreine Übergabe"],
    features: [
      {
        title: "Haushaltsauflösung",
        description: "Einfühlsam und diskret – auch im Trauerfall oder bei Umzug ins Pflegeheim.",
        icon: House,
      },
      {
        title: "Keller & Dachboden",
        description: "Wir schaffen Platz, wo sich über Jahre einiges angesammelt hat.",
        icon: Warehouse,
      },
      {
        title: "Fachgerechte Entsorgung",
        description: "Sortiert nach Wertstoffen und umweltgerecht entsorgt.",
        icon: Recycle,
      },
      {
        title: "Spenden & Wiederverwerten",
        description: "Gut Erhaltenes geben wir an soziale Einrichtungen weiter.",
        icon: Leaf,
      },
      {
        title: "Besenreine Übergabe",
        description: "Räume werden übergabefertig hinterlassen – ideal für Vermieter.",
        icon: Sparkles,
      },
      {
        title: "Gewerbe-Entrümpelung",
        description: "Büros, Lager und Ladenflächen – planbar und termintreu.",
        icon: Building2,
      },
    ],
    faq: [
      {
        question: "Was kostet eine Entrümpelung?",
        answer:
          "Das hängt von Menge, Zugänglichkeit und Entsorgungsart ab. Nach einer kostenlosen Besichtigung erhalten Sie einen verbindlichen Festpreis.",
      },
      {
        question: "Muss ich während der Entrümpelung anwesend sein?",
        answer:
          "Nicht zwingend. Nach Absprache arbeiten wir auch selbstständig und übergeben Ihnen anschließend die Schlüssel.",
      },
      {
        question: "Werden verwertbare Gegenstände angerechnet?",
        answer:
          "Ja, wertvolle Möbel oder Gegenstände können mit den Kosten verrechnet werden. Das besprechen wir bei der Besichtigung.",
      },
    ],
  },
  {
    slug: "bodenverlegung",
    href: "/bodenverlegung",
    title: "Bodenverlegung",
    tagline: "Neuer Boden, neues Raumgefühl",
    description:
      "Laminat, Vinyl und PVC fachgerecht verlegt – inklusive Untergrund, Trittschalldämmung und Sockelleisten.",
    intro:
      "Kaum etwas verändert einen Raum so sehr wie ein neuer Boden. Wir prüfen den Untergrund, gleichen ihn aus und verlegen Laminat, Vinyl oder PVC sauber bis in die letzte Ecke – Sockelleisten und Übergangsprofile inklusive. Den alten Belag nehmen wir gleich mit.",
    icon: Ruler,
    image: images.boden,
    highlights: ["Laminat, Vinyl & PVC", "Untergrund & Trittschalldämmung", "Sockelleisten inklusive"],
    features: [
      {
        title: "Laminat verlegen",
        description: "Klick-Laminat schwimmend verlegt, exakt eingepasst und mit sauberer Dehnungsfuge.",
        icon: Layers,
      },
      {
        title: "Vinyl & Designboden",
        description: "Robust, leise und pflegeleicht – ideal für Küche, Flur und Kinderzimmer.",
        icon: LayoutGrid,
      },
      {
        title: "PVC & Teppichboden",
        description: "Bahnenware millimetergenau zugeschnitten und faltenfrei verklebt.",
        icon: Grid2x2,
      },
      {
        title: "Untergrund & Dämmung",
        description: "Ausgleichsmasse, Trittschalldämmung und Feuchtigkeitssperre für ein ebenes Ergebnis.",
        icon: Droplets,
      },
      {
        title: "Sockelleisten & Profile",
        description: "Leisten, Übergangs- und Abschlussprofile passgenau montiert.",
        icon: Ruler,
      },
      {
        title: "Altbelag entfernen",
        description: "Alter Teppich, PVC oder Laminat raus – die Entsorgung übernehmen wir mit.",
        icon: Recycle,
      },
    ],
    faq: [
      {
        question: "Muss der alte Boden vorher raus?",
        answer:
          "Nicht immer. Fliesen oder fester Estrich können oft als Untergrund bleiben. Alten Teppich, weichen PVC oder lose Dielen entfernen wir – die Entsorgung ist im Angebot enthalten.",
      },
      {
        question: "Wie lange dauert das Verlegen?",
        answer:
          "Ein durchschnittliches Zimmer mit rund 20 m² schaffen wir meist an einem Tag, inklusive Sockelleisten. Größere Flächen planen wir vorher gemeinsam durch.",
      },
      {
        question: "Kann ich den Raum sofort wieder nutzen?",
        answer:
          "Bei schwimmend verlegtem Laminat und Klick-Vinyl ja – direkt nach dem letzten Handgriff. Vollflächig verklebte Böden brauchen je nach Kleber 24 bis 48 Stunden.",
      },
    ],
  },
  {
    slug: "malerarbeiten",
    href: "/malerarbeiten",
    title: "Malerarbeiten",
    tagline: "Frische Farbe, saubere Kanten",
    description:
      "Maler- und Tapezierarbeiten für Wände und Decken – sorgfältig abgedeckt, deckend gestrichen und randscharf abgesetzt.",
    intro:
      "Ob Renovierung vor dem Einzug oder Schönheitsreparatur bei der Übergabe: Wir spachteln, grundieren, tapezieren und streichen. Möbel und Böden decken wir vollständig ab, Kanten kleben wir sauber ab – und am Ende ist aus der Baustelle wieder eine Wohnung geworden.",
    icon: PaintRoller,
    image: images.maler,
    highlights: ["Wände & Decken streichen", "Tapezieren & Tapete entfernen", "Schönheitsreparaturen"],
    features: [
      {
        title: "Wände & Decken",
        description: "Deckend gestrichen in der Farbe Ihrer Wahl – ohne Streifen und sichtbare Ansätze.",
        icon: PaintRoller,
      },
      {
        title: "Tapezierarbeiten",
        description: "Raufaser, Vlies oder Fototapete – blasenfrei und mit passgenauem Muster.",
        icon: Wallpaper,
      },
      {
        title: "Spachteln & Grundieren",
        description: "Risse, Löcher und Dübellöcher verschwinden spurlos unter der neuen Farbe.",
        icon: Brush,
      },
      {
        title: "Lackierarbeiten",
        description: "Türen, Zargen, Fensterrahmen und Heizkörper frisch und gleichmäßig lackiert.",
        icon: SprayCan,
      },
      {
        title: "Schönheitsreparaturen",
        description: "Für die Wohnungsübergabe: Löcher zu, Wände einheitlich, Vermieter zufrieden.",
        icon: Sparkles,
      },
      {
        title: "Farbberatung",
        description: "Wir zeigen Muster und finden den Ton, der zu Raum und Lichtverhältnissen passt.",
        icon: Palette,
      },
    ],
    faq: [
      {
        question: "Muss ich die Möbel ausräumen?",
        answer:
          "Nein. Wir rücken die Möbel in die Raummitte und decken sie zusammen mit dem Boden vollständig ab. Auf Wunsch lagern wir sie während der Arbeiten aus – der Transporter steht ohnehin vor der Tür.",
      },
      {
        question: "Wie lange dauert es, bis ich den Raum wieder nutzen kann?",
        answer:
          "Moderne Dispersionsfarben sind nach wenigen Stunden trocken und geruchsarm. In der Regel ist der Raum am nächsten Tag wieder voll nutzbar.",
      },
      {
        question: "Besorgen Sie Farbe und Tapete?",
        answer:
          "Ja. Wir kaufen das Material in der gewünschten Qualität ein – der Einkauf steht transparent und nachvollziehbar in Ihrem Angebot.",
      },
    ],
  },
  {
    slug: "gartenpflege",
    href: "/gartenpflege",
    title: "Gartenpflege",
    tagline: "Gepflegt durch jede Jahreszeit",
    description:
      "Rasen, Hecken, Beete und Laub – als regelmäßige Pflege nach Plan oder als einmaliger Frühjahrs- und Herbstputz.",
    intro:
      "Vom wöchentlichen Rasenschnitt bis zum großen Herbstputz: Wir halten Ihren Garten in Form – für Eigentümer, Vermieter und Hausverwaltungen. Auf Wunsch übernehmen wir die Pflege regelmäßig nach festem Plan, damit Sie sich um nichts mehr kümmern müssen.",
    icon: Shrub,
    image: images.garten,
    highlights: ["Rasen- & Heckenschnitt", "Beetpflege & Unkraut", "Grünschnitt-Entsorgung inklusive"],
    features: [
      {
        title: "Rasenpflege",
        description: "Mähen, Kanten stechen, vertikutieren und nachsäen für einen dichten, grünen Rasen.",
        icon: Sprout,
      },
      {
        title: "Hecken- & Baumschnitt",
        description: "Formschnitt und Auslichten – fachgerecht und zur richtigen Jahreszeit.",
        icon: Scissors,
      },
      {
        title: "Beetpflege",
        description: "Unkraut entfernen, Boden lockern, mulchen und neu bepflanzen.",
        icon: Flower2,
      },
      {
        title: "Laub & Grünschnitt",
        description: "Wir räumen auf und nehmen das Schnittgut direkt zur Entsorgung mit.",
        icon: Leaf,
      },
      {
        title: "Herbst- & Winterdienst",
        description: "Laub, Schnee und Streugut – dank 24-Stunden-Bereitschaft auch kurzfristig.",
        icon: SunSnow,
      },
      {
        title: "Pflege nach Plan",
        description: "Feste Termine übers ganze Jahr, ein Ansprechpartner, ein fester Preis pro Einsatz.",
        icon: CalendarDays,
      },
    ],
    faq: [
      {
        question: "Bieten Sie auch regelmäßige Pflege an?",
        answer:
          "Ja. Wir vereinbaren feste Intervalle – wöchentlich, 14-tägig oder monatlich – und kommen, ohne dass Sie nachfragen müssen. Sie haben einen Ansprechpartner und einen festen Preis pro Einsatz.",
      },
      {
        question: "Entsorgen Sie den Grünschnitt?",
        answer:
          "Ja. Laub, Schnittgut und Astwerk nehmen wir direkt mit und entsorgen alles fachgerecht. Die Entsorgung ist in unserem Angebot enthalten.",
      },
      {
        question: "Arbeiten Sie auch für Vermieter und Hausverwaltungen?",
        answer:
          "Gern. Für Mehrfamilienhäuser und Gewerbeflächen erstellen wir Jahres-Pflegepläne mit fester Rechnungsstellung und dokumentierten Einsätzen.",
      },
    ],
  },
];

export function getService(slug: ServiceSlug): Service {
  const service = services.find((s) => s.slug === slug);
  if (!service) throw new Error(`Unbekannter Service: ${slug}`);
  return service;
}
