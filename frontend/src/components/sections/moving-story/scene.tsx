import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import { SpeedLines } from "@/components/brand/speed-lines";
import { House } from "@/components/sections/moving-story/house";
import { MovingBox } from "@/components/sections/moving-story/moving-box";
import { Skyline } from "@/components/sections/moving-story/skyline";
import { u } from "@/components/sections/moving-story/timeline";
import { Truck } from "@/components/sections/moving-story/truck";

/**
 * Szenen-Koordinaten in "u" (1u ≙ --u, skaliert mit der Breite):
 * Die "Welt" ist 108u breit. Ist sie breiter als der Bildschirm (Mobile),
 * schwenkt die Kamera während der Fahrt mit (--pan).
 */
const WORLD_WIDTH = 108;
const TRUCK = { left: 22, width: 24, distance: 42 };

// Kartons: Position vor dem alten Haus + Weg in den Laderaum (dx/dy)
const BOXES = [
  { left: 11, bottom: 6, width: 5.5, dx: 17, dy: 1 },
  { left: 16.8, bottom: 6, width: 5, dx: 13, dy: 1 },
  { left: 13.5, bottom: 10.7, width: 4.6, dx: 17, dy: 3.5 },
];

const STARS = [
  [6, 12], [14, 30], [22, 8], [31, 22], [38, 40], [47, 14], [55, 30], [63, 9],
  [70, 24], [78, 38], [84, 12], [91, 28], [96, 6], [43, 48], [18, 46], [73, 50],
];

const worldPan = (factor = 1) => `translateX(calc(var(--drive) * var(--pan) * ${factor}))`;

export function MovingStoryScene() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden [--u:1.9cqw] @container sm:[--u:1.25cqw] lg:[--u:1cqw]"
      style={{ "--pan": `min(0px, calc(100cqw - ${WORLD_WIDTH} * var(--u)))` } as CSSProperties}
    >
      {/* Himmel: Sterne verblassen, Sonne geht auf */}
      {STARS.map(([left, top]) => (
        <span
          key={`${left}-${top}`}
          className="absolute size-0.5 rounded-full bg-white sm:size-1"
          style={{ left: `${left}%`, top: `${top}%`, opacity: "calc((1 - var(--progress)) * 0.7)" }}
        />
      ))}
      <div
        className="absolute bottom-0 left-1/2 rounded-full bg-[radial-gradient(circle,var(--color-brand-400)_0%,rgb(234_82_12/0.35)_40%,transparent_70%)] blur-2xl"
        style={{
          width: u(80),
          height: u(80),
          opacity: "calc(var(--progress) * 0.8)",
          transform: `translate(-50%, calc(45% + (1 - var(--progress)) * ${u(20)}))`,
        }}
      />
      <div
        className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-brand-600/25 via-brand-900/10 to-transparent"
        style={{ opacity: "var(--progress)" }}
      />

      {/* Stadt im Hintergrund (Parallax) */}
      <Skyline
        layer="far"
        className="absolute left-0"
        style={{ bottom: u(6), width: u(130), height: u(30), transform: worldPan(0.3) }}
      />
      <Skyline
        layer="near"
        className="absolute left-0"
        style={{ bottom: u(6), width: u(130), height: u(30), transform: worldPan(0.6) }}
      />

      {/* Welt: Straße, Häuser, Kartons, Transporter */}
      <div className="absolute bottom-0 left-0" style={{ width: u(WORLD_WIDTH), height: u(40), transform: worldPan() }}>
        <div className="absolute bg-ink-900" style={{ left: u(-30), width: u(170), bottom: 0, height: u(4.5) }} />
        <div className="absolute bg-ink-700" style={{ left: u(-30), width: u(170), bottom: u(4.5), height: u(1.5) }} />
        <div
          className="absolute"
          style={{
            left: u(-30),
            width: u(170),
            bottom: u(2),
            height: u(0.35),
            backgroundImage: `repeating-linear-gradient(90deg, rgb(255 255 255 / 0.18) 0 ${u(3)}, transparent 0 ${u(6)})`,
          }}
        />

        {/* Altes Zuhause – Lichter gehen beim Auszug aus */}
        <div
          className="absolute rounded-full bg-brand-300/30 blur-2xl"
          style={{ left: u(4), bottom: u(8), width: u(15), height: u(12), opacity: "var(--old-lights)" }}
        />
        <House lightsVar="--old-lights" className="absolute" style={{ left: u(3), bottom: u(6), width: u(17) }} />

        {/* Neues Zuhause – leuchtet bei Ankunft in Markenfarben auf */}
        <div
          className="absolute rounded-full bg-brand-400/40 blur-3xl"
          style={{ left: u(86), bottom: u(4), width: u(24), height: u(20), opacity: "var(--arrive)" }}
        />
        <House
          lightsVar="--arrive"
          revealVar="--arrive"
          className="absolute"
          style={{ left: u(89), bottom: u(6), width: u(18) }}
        />

        {BOXES.map((box, index) => (
          <MovingBox
            key={index}
            className="absolute"
            style={{
              left: u(box.left),
              bottom: u(box.bottom),
              width: u(box.width),
              opacity: `var(--box-${index}-opacity)`,
              transform: `translate(calc(var(--load-${index}) * ${u(box.dx)}), calc((1 - var(--box-${index})) * ${u(-34)} + var(--load-${index}) * ${u(box.dy)})) scale(calc(1 - var(--load-${index}) * 0.25))`,
            }}
          />
        ))}

        {/* Transporter */}
        <div
          className="absolute"
          style={{
            left: u(TRUCK.left),
            bottom: u(1.2),
            width: u(TRUCK.width),
            transform: `translate(calc(var(--drive) * ${u(TRUCK.distance)}), calc(var(--bounce) * ${u(0.25)}))`,
          }}
        >
          <div className="absolute right-full flex flex-col gap-1" style={{ bottom: u(4), marginRight: u(1), opacity: "var(--driving)" }}>
            <SpeedLines className="text-brand-400" style={{ width: u(8) }} />
          </div>
          <div className="absolute" style={{ left: u(-1), bottom: u(1.5), opacity: "var(--driving)" }}>
            {[0, 0.3, 0.6].map((delay) => (
              <span
                key={delay}
                className="absolute block animate-puff rounded-full bg-white/30 motion-reduce:animate-none"
                style={{ width: u(1.6), height: u(1.6), animationDelay: `${delay}s` }}
              />
            ))}
          </div>
          <Truck className="relative block w-full" />
        </div>

        {/* Ankunfts-Badge */}
        <div
          className="absolute flex origin-bottom items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap text-ink-950 shadow-lifted"
          style={{
            left: u(96),
            bottom: u(25),
            opacity: "var(--arrive)",
            transform: "translateX(-50%) scale(var(--arrive-pop))",
          }}
        >
          <span className="grid size-6 place-items-center rounded-full bg-brand-500 text-white">
            <Check className="size-3.5" strokeWidth={3} />
          </span>
          Angekommen
        </div>
      </div>
    </div>
  );
}
