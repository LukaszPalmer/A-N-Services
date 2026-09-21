/** Kleine Helfer für scroll-gesteuerte Animationen (Werte immer 0–1). */

export const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

/** Lokaler Fortschritt innerhalb eines Abschnitts [start, end] des Gesamtfortschritts. */
export const range = (progress: number, start: number, end: number) =>
  clamp01((progress - start) / (end - start));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export const easeInOutCubic = (t: number) =>
  t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

/** Leichtes Überschwingen – für "Pop"-Effekte. */
export const easeOutBack = (t: number) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};
