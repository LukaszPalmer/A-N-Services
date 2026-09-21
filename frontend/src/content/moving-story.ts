export type MovingStoryStep = {
  label: string;
  title: string;
  text: string;
};

/** Texte der scroll-animierten Umzugs-Story auf der Startseite (Reihenfolge = Animationsphasen). */
export const movingStorySteps: MovingStoryStep[] = [
  {
    label: "Verpacken",
    title: "Sorgfältig verpackt.",
    text: "Jeder Karton gepolstert, beschriftet und sicher verschlossen – auch Ihr Lieblingsgeschirr.",
  },
  {
    label: "Verladen",
    title: "Sicher verladen.",
    text: "Möbel und Kartons werden gepolstert, fixiert und platzsparend verstaut. Nichts verrutscht.",
  },
  {
    label: "Transport",
    title: "Auf direktem Weg.",
    text: "Erfahrene Fahrer, geplante Route, feste Ankunftszeit – regional und deutschlandweit.",
  },
  {
    label: "Ankunft",
    title: "Willkommen zu Hause.",
    text: "Wir tragen alles an seinen Platz, bauen auf und übergeben besenrein. Sie genießen den Neuanfang.",
  },
];
