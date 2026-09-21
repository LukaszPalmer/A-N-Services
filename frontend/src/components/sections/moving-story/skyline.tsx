import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

type Building = { x: number; w: number; h: number };
type WindowLight = { x: number; y: number };

const WIDTH = 130;
const HEIGHT = 30;

/** Deterministischer Zufall – identisch auf Server & Client (kein Hydration-Mismatch). */
function seeded(seed: number) {
  let state = seed;
  return () => {
    state = (state * 16807) % 2147483647;
    return (state - 1) / 2147483646;
  };
}

function createSkyline(seed: number, minHeight: number, maxHeight: number) {
  const random = seeded(seed);
  const buildings: Building[] = [];
  const windows: WindowLight[] = [];

  for (let x = 0; x < WIDTH; ) {
    const w = 4 + Math.round(random() * 6);
    const h = minHeight + Math.round(random() * (maxHeight - minHeight));
    buildings.push({ x, w, h });

    for (let wx = x + 1; wx < x + w - 1; wx += 1.6) {
      for (let wy = HEIGHT - h + 1.5; wy < HEIGHT - 1.5; wy += 2.2) {
        if (random() > 0.78) windows.push({ x: wx, y: wy });
      }
    }
    x += w + (random() > 0.7 ? 1 : 0);
  }

  return { buildings, windows };
}

const layers = {
  far: createSkyline(7, 10, 22),
  near: createSkyline(42, 5, 14),
};

type SkylineProps = {
  layer: keyof typeof layers;
  className?: string;
  style?: CSSProperties;
};

/** Stadtsilhouette (130 × 30 Szenen-Einheiten) mit einzelnen beleuchteten Fenstern. */
export function Skyline({ layer, className, style }: SkylineProps) {
  const { buildings, windows } = layers[layer];

  return (
    <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden className={cn("overflow-visible", className)} style={style}>
      <g className={layer === "far" ? "fill-ink-900" : "fill-ink-800"}>
        {buildings.map((b) => (
          <rect key={b.x} x={b.x} y={HEIGHT - b.h} width={b.w} height={b.h} />
        ))}
      </g>
      <g className={layer === "far" ? "fill-brand-200/25" : "fill-brand-200/50"}>
        {windows.map((w) => (
          <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width={0.8} height={1} />
        ))}
      </g>
    </svg>
  );
}
