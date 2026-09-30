import type { Review, ReviewProfile } from "@/types";

/*
 * Kundenbewertungen – übernommen aus unserem MyHammer-Profil.
 * Quelle: https://www.my-hammer.de/auftragnehmer/a-n-service/bewertungen
 * ---------------------------------------------------------------------------
 * Regeln für die Pflege (UWG und DSGVO):
 * - Texte wörtlich übernehmen – inkl. Tippfehlern. Nichts kürzen, umformulieren oder "verbessern".
 * - Nachnamen auf den Anfangsbuchstaben kürzen ("Lea G."), anonyme Bewertungen ohne `name`.
 * - Angezeigt werden nur 5-Sterne-Bewertungen mit Text. Note und Anzahl in `reviewProfile`
 *   beziehen sich aber immer auf ALLE Bewertungen, genau wie MyHammer sie ausweist –
 *   sonst wäre die Auswahl irreführend.
 * - Antworten des Betriebs werden nicht übernommen.
 * - Reihenfolge = Anzeigereihenfolge: Ausführliche, aussagekräftige Bewertungen zuerst, kurze im
 *   Wechsel dazwischen. Die ersten Karten sieht man sofort (Smartphone: Wischreihe, Desktop: obere
 *   Reihe der Bewertungswand), der Rest steht hinter "Alle Bewertungen anzeigen".
 * - Neue Bewertung: passend einsortieren und `rating`, `count` und `asOf` aktualisieren.
 *
 * Bewusst KEINE strukturierten Daten (AggregateRating/Review): Google untersagt, Bewertungen
 * fremder Websites als eigene Sterne auszuzeichnen. Stattdessen ist das Profil per `sameAs`
 * mit der Firma verknüpft (lib/structured-data.ts).
 */

export const reviewProfile: ReviewProfile = {
  platform: "MyHammer",
  profileUrl: "https://www.my-hammer.de/auftragnehmer/a-n-service",
  reviewsUrl: "https://www.my-hammer.de/auftragnehmer/a-n-service/bewertungen",
  policyUrl: "https://www.my-hammer.de/bewertungsrichtlinie",
  rating: 4.7,
  count: 17,
  asOf: "2026-09-30",
};

export const reviews: Review[] = [
  {
    location: "Köln",
    rating: 5,
    date: "2026-09-26",
    service: "Regionaler Umzug",
    text: "Klare Empfehlung! Die Möbel wurden gut verpackt und der Umzug verlief reibungslos und unglaublich schnell. Wir sind aus dem 4. Stock ohne Aufzug in den 2. Stock gezogen - Respekt an die 4 Jungs, die innerhalb von nur 7h fertig waren inkl. Ab- und Aufbau aller Möbel (80qm Wohnung). Super freundlich - sowohl die Abstimmung vor dem Termin als auch beim Umzug selbst ein wirklich tolles und extrem nettes Team! Vielen lieben Dank.",
    highlight: "Respekt an die 4 Jungs, die innerhalb von nur 7h fertig waren",
  },
  {
    name: "Gudrun S.",
    location: "Duisburg",
    rating: 5,
    date: "2026-08-15",
    service: "Regionaler Umzug",
    text: "Sehr nette junge Leute! Pünktlich, zuverlässig, höflich, freundlich und fix. Herzlichen Dank! Gerne wieder!",
    highlight: "Pünktlich, zuverlässig, höflich, freundlich und fix.",
  },
  {
    location: "Much",
    rating: 5,
    date: "2026-09-29",
    service: "Regionaler Umzug",
    text: "Es war alles perfekt. Von der anfänglichen Kommunikation über Beauftragung und Terminvereinbarung bis hin zur Durchführung unseres Umzugs ist wirklich alles zu unserer vollsten Zufriedenheit gelaufen. Vielen Dank an die tollen und sehr sympathischen Mitarbeiter.",
    highlight: "Es war alles perfekt.",
  },
  {
    name: "Lea G.",
    location: "Bonn",
    rating: 5,
    date: "2026-08-22",
    service: "Regionaler Umzug",
    text: "Super Arbeit! Ich hatte einen Schrank, ein Regal und ein Bett zum demontieren und transportieren. Alles wurde innerhalb von 50 Minuten abgebaut, verpackt und in den Transporter geladen. Und das obwohl ich im 3. Stock ohne Aufzug gewohnt habe. Kommunikation lief auch immer sehr gut. Stau bedingt kam das Team etwas später, aber ich wurde immer telefonisch auf dem Laufenden gehalten. Gerne wieder👍🏻",
    highlight: "innerhalb von 50 Minuten abgebaut, verpackt und in den Transporter geladen",
  },
  {
    location: "Dortmund",
    rating: 5,
    date: "2026-08-20",
    service: "Bundesweiter Umzug",
    text: "Super gemacht, schnelle zuverlässige Arbeit! Sehr empfehlenswert",
  },
  {
    name: "Yannik L.",
    location: "Dortmund",
    rating: 5,
    date: "2026-08-28",
    service: "Bundesweiter Umzug",
    text: "Die beiden jungen Herren, die den Umzug gemacht haben, haben ihren Job sehr zuverlässig erledigt. Ich habe sie als sehr höflich und zuvorkommend erlebt. Sie haben ohne Aufpreis sogar Dinge transportiert, über die vorher gar kein Transport vereinbart war. Für den verhältnismäßig, wie ich finde, günstigen Preis gibt es absolut keinen Einwand. Top Dienstleistung!👍🏻",
    highlight: "ohne Aufpreis sogar Dinge transportiert",
  },
  {
    location: "Köln",
    rating: 5,
    date: "2026-09-16",
    service: "Transport und Überführung",
    text: "Super schnell alles eingeladen und sorgfältig und sicher verpackt. Sehr nettes Team. Nette Kommunikation. Und auch super schnell alles wieder ausgeladen. Wir sind sehr zufrieden.",
    highlight: "sorgfältig und sicher verpackt",
  },
  {
    location: "Stolberg",
    rating: 5,
    date: "2026-08-21",
    service: "Regionaler Umzug",
    text: "Sehr nett, schnell und professionell gearbeitet. Wir sind sehr zufrieden.",
  },
  {
    name: "Jörn Z.",
    location: "Bedburg",
    rating: 5,
    date: "2026-09-05",
    service: "Regionaler Umzug",
    text: "Sehr freundlich und schnelle korrekte Arbeit..... immer wieder gerne",
  },
  {
    location: "Erftstadt",
    rating: 5,
    date: "2026-08-20",
    service: "Transport und Überführung",
    text: "die Arbeiten wurde schnell, sauber , durch Fachleute erledigt",
  },
  {
    location: "Köln",
    rating: 5,
    date: "2026-09-11",
    service: "Regionaler Umzug",
    text: "Gute Arbeit pünktlich und zufrrlässig",
  },
];
