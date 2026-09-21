import type { CSSProperties } from "react";

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

export const BOX_COUNT = 3;

export function getActiveStep(progress: number) {
  return PHASES.reduce((active, phase, index) => (progress >= phase.start ? index : active), 0);
}

/**
 * Übersetzt den Scroll-Fortschritt in CSS-Variablen, die die Szene per `calc()` nutzt.
 * So bewegt sich alles über transform/opacity – ohne React-Re-Render pro Frame.
 */
export function getSceneVars(progress: number): Record<`--${string}`, number> {
  const phases = PHASES.map(({ start, end }) => range(progress, start, end));
  const [pack, load, drive, arrive] = phases;
  const driving = Math.sin(Math.PI * drive);

  const vars: Record<`--${string}`, number> = {
    "--progress": progress,
    "--drive": easeInOutCubic(drive),
    "--driving": driving,
    "--bounce": Math.sin(drive * 70) * driving,
    "--old-lights": 1 - easeOutCubic(load),
    "--arrive": easeOutCubic(arrive),
    "--arrive-pop": Math.max(0, easeOutBack(range(arrive, 0.35, 1))),
  };

  phases.forEach((value, index) => {
    vars[`--phase-${index}`] = value;
  });

  for (let index = 0; index < BOX_COUNT; index++) {
    const drop = range(pack, index * 0.28, index * 0.28 + 0.44);
    const loadBox = easeInOutCubic(range(load, index * 0.18, index * 0.18 + 0.64));
    vars[`--box-${index}`] = easeOutBack(drop);
    vars[`--load-${index}`] = loadBox;
    vars[`--box-${index}-opacity`] = Math.min(1, drop * 4) * (1 - range(loadBox, 0.75, 1));
  }

  return vars;
}

/** Startwerte für das Server-Rendering (Szene steht am Anfang). */
export const initialSceneStyle = getSceneVars(0) as CSSProperties;

/** Geometrie in Szenen-Einheiten: 1u ≙ `--u` (skaliert mit der Szenenbreite). */
export const u = (value: number) => `calc(${value} * var(--u))`;
