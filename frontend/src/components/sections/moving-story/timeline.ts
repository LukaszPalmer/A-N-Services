import { easeInOutCubic, easeOutBack, easeOutCubic, range } from "@/lib/animation";

/**
 * Zeitleiste der Umzugs-Story – Abschnitte des Scroll-Fortschritts (0–1).
 * Reihenfolge entspricht `movingStorySteps` in content/moving-story.ts.
 * Nach dem letzten Abschnitt bleibt das Endbild kurz stehen, bevor die Szene weiterscrollt.
 */
export const PHASES = [
  { start: 0.02, end: 0.24 }, // Verpacken – Kartons fallen und stapeln sich
  { start: 0.24, end: 0.42 }, // Verladen  – Kartons wandern in den Transporter
  { start: 0.42, end: 0.8 }, //  Transport – Fahrt durch die Stadt, Sonnenaufgang
  { start: 0.8, end: 0.94 }, //  Ankunft   – neues Zuhause leuchtet auf
] as const;

/** Szenen-Geometrie in "u" (1u ≙ --u, skaliert mit der Breite der Szene) */
export const WORLD_WIDTH = 108;
export const TRUCK = { left: 22, width: 24, distance: 42 };

// Kartons: Position vor dem alten Haus + Weg in den Laderaum (dx/dy)
export const BOXES = [
  { left: 11, bottom: 6, width: 5.5, dx: 17, dy: 1 },
  { left: 16.8, bottom: 6, width: 5, dx: 13, dy: 1 },
  { left: 13.5, bottom: 10.7, width: 4.6, dx: 17, dy: 3.5 },
];

export function getActiveStep(progress: number) {
  return PHASES.reduce((active, phase, index) => (progress >= phase.start ? index : active), 0);
}

/** Alle Animationswerte (0–1 bzw. Faktoren) für einen Scroll-Fortschritt. */
export function getSceneValues(progress: number) {
  const phases = PHASES.map(({ start, end }) => range(progress, start, end));
  const [pack = 0, load = 0, drive = 0, arrive = 0] = phases;
  const driving = Math.sin(Math.PI * drive);

  return {
    progress,
    phases,
    drive: easeInOutCubic(drive),
    driving,
    oldLights: 1 - easeOutCubic(load),
    arrive: easeOutCubic(arrive),
    arrivePop: Math.max(0, easeOutBack(range(arrive, 0.35, 1))),
    boxes: BOXES.map((_, index) => {
      const drop = range(pack, index * 0.28, index * 0.28 + 0.44);
      const loadBox = easeInOutCubic(range(load, index * 0.18, index * 0.18 + 0.64));
      return {
        drop: easeOutBack(drop),
        load: loadBox,
        opacity: Math.min(1, drop * 4) * (1 - range(loadBox, 0.75, 1)),
      };
    }),
  };
}

export type SceneValues = ReturnType<typeof getSceneValues>;

type AnimatedStyle = { transform?: string; opacity?: string };

/**
 * Übersetzt die Werte in Styles für die animierten Elemente (Schlüssel = `data-anim`).
 *
 * Es werden ausschließlich `transform` und `opacity` gesetzt – beides kann der
 * Browser auf der GPU zusammensetzen, ohne Layout oder Neuzeichnen.
 *
 * @param u   Szenen-Einheit → CSS-Länge (Server: `calc(n * var(--u))`, Client: Pixel)
 * @param pan Kameraschwenk bei voller Fahrt in derselben Längeneinheit wie `u`
 */
export function getSceneStyles(
  values: SceneValues,
  u: (n: number) => string,
  pan: (factor: number) => string,
): Record<string, AnimatedStyle> {
  const fixed = (n: number) => n.toFixed(4);
  const styles: Record<string, AnimatedStyle> = {
    stars: { opacity: fixed((1 - values.progress) * 0.7) },
    sun: {
      opacity: fixed(values.progress * 0.85),
      transform: `translate3d(-50%, calc(45% + ${u((1 - values.progress) * 20)}), 0)`,
    },
    dawn: { opacity: fixed(values.progress) },
    skylineFar: { transform: `translate3d(${pan(values.drive * 0.3)}, 0, 0)` },
    skylineNear: { transform: `translate3d(${pan(values.drive * 0.6)}, 0, 0)` },
    world: { transform: `translate3d(${pan(values.drive)}, 0, 0)` },
    oldGlow: { opacity: fixed(values.oldLights) },
    oldLights: { opacity: fixed(values.oldLights) },
    newGlow: { opacity: fixed(values.arrive) },
    newHouse: { opacity: fixed(values.arrive) },
    truck: {
      transform: `translate3d(${u(values.drive * TRUCK.distance)}, 0, 0)`,
    },
    trail: { opacity: fixed(values.driving) },
    beam: { opacity: fixed(0.2 + values.driving * 0.5) },
    wheel: { transform: `rotate(${(values.drive * 1440).toFixed(1)}deg)` },
    badge: {
      opacity: fixed(values.arrive),
      transform: `translate3d(-50%, 0, 0) scale(${fixed(values.arrivePop)})`,
    },
    hint: { opacity: fixed(1 - Math.min(1, values.progress * 12)) },
  };

  values.phases.forEach((phase, index) => {
    styles[`bar${index}`] = { transform: `scaleX(${fixed(phase)})` };
  });

  values.boxes.forEach((box, index) => {
    const geometry = BOXES[index]!;
    styles[`box${index}`] = {
      opacity: fixed(box.opacity),
      transform: `translate3d(${u(box.load * geometry.dx)}, ${u((1 - box.drop) * -34 + box.load * geometry.dy)}, 0) scale(${fixed(1 - box.load * 0.25)})`,
    };
  });

  return styles;
}

/**
 * Stützpunkte für die Scroll-Timeline-Keyframes (Web Animations API).
 * 200 Stützpunkte = alle 0,5 % Scroll-Fortschritt ein Wert – dazwischen interpoliert
 * der Browser linear; die Easing-Kurven bleiben so optisch erhalten.
 */
export const KEYFRAME_SAMPLES = 200;

/** Keyframes je animiertem Element (Schlüssel = `data-anim`) über den gesamten Fortschritt 0–1. */
export function buildSceneKeyframes(u: (n: number) => string, pan: (factor: number) => string) {
  const keyframes = new Map<string, Keyframe[]>();
  for (let index = 0; index <= KEYFRAME_SAMPLES; index++) {
    const offset = index / KEYFRAME_SAMPLES;
    for (const [key, style] of Object.entries(getSceneStyles(getSceneValues(offset), u, pan))) {
      const list = keyframes.get(key) ?? [];
      list.push({ offset, ...style });
      keyframes.set(key, list);
    }
  }
  return keyframes;
}

/** Geometrie in Szenen-Einheiten für statische Positionen: 1u ≙ `--u`. */
export const u = (value: number) => `calc(${value} * var(--u))`;

/** Startbild für das Server-Rendering (Szene steht am Anfang, noch kein Schwenk). */
export const initialSceneStyles = getSceneStyles(getSceneValues(0), u, () => "0px");
