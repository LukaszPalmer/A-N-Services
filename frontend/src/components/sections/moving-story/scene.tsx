import { Check } from "lucide-react";
import type { CSSProperties } from "react";

import { SpeedLines } from "@/components/brand/speed-lines";
import { House } from "@/components/sections/moving-story/house";
import { MovingBox } from "@/components/sections/moving-story/moving-box";
import { Skyline } from "@/components/sections/moving-story/skyline";
import { BOXES, initialSceneStyles as s, TRUCK, u, WORLD_WIDTH } from "@/components/sections/moving-story/timeline";
import { Truck } from "@/components/sections/moving-story/truck";

/**
 * Szenen-Koordinaten in "u" (1u ≙ --u, skaliert mit der Breite):
 * Die "Welt" ist 108u breit. Ist sie breiter als der Bildschirm (Mobile),
 * schwenkt die Kamera während der Fahrt mit.
 *
 * Alle Elemente mit `data-anim` animiert moving-story.tsx per transform/opacity
 * (Scroll-Timeline bzw. Fallback). Es sind durchweg HTML-Container – Animationen auf
 * <svg>-Elementen könnte der Browser nicht auf der GPU ausführen. `will-change` legt
 * sie auf eigene GPU-Ebenen, damit nichts neu gezeichnet werden muss.
 * Keine CSS-Filter (blur) – weiche Lichter sind radiale Verläufe.
 */

const STARS = [
  [6, 12], [14, 30], [22, 8], [31, 22], [38, 40], [47, 14], [55, 30], [63, 9],
  [70, 24], [78, 38], [84, 12], [91, 28], [96, 6], [43, 48], [18, 46], [73, 50],
];

const glow = (color: string) => `radial-gradient(closest-side, ${color}, transparent)`;

export function MovingStoryScene() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden [--u:1.9cqw] @container sm:[--u:1.25cqw] lg:[--u:1cqw]"
    >
      {/* Messhilfe: 100u breit – daraus berechnet moving-story.tsx die Pixel pro u */}
      <div data-u-probe className="invisible absolute top-0 left-0 h-px" style={{ width: u(100) }} />

      {/* Himmel: Sterne verblassen, Sonne geht auf */}
      <div data-anim="stars" className="absolute inset-0 will-change-[opacity]" style={s.stars}>
        {STARS.map(([left, top]) => (
          <span
            key={`${left}-${top}`}
            className="absolute size-0.5 rounded-full bg-white sm:size-1"
            style={{ left: `${left}%`, top: `${top}%` }}
          />
        ))}
      </div>
      <div
        data-anim="sun"
        className="absolute bottom-0 left-1/2 rounded-full will-change-transform"
        style={{
          width: u(90),
          height: u(90),
          backgroundImage: "radial-gradient(closest-side, rgb(255 138 61 / 0.95), rgb(234 82 12 / 0.35) 55%, transparent)",
          ...s.sun,
        }}
      />
      <div
        data-anim="dawn"
        className="absolute inset-x-0 bottom-0 h-3/4 bg-linear-to-t from-brand-600/25 via-brand-900/10 to-transparent will-change-[opacity]"
        style={s.dawn}
      />

      {/* Stadt im Hintergrund (Parallax) */}
      <div
        data-anim="skylineFar"
        className="absolute left-0 will-change-transform"
        style={{ bottom: u(6), width: u(130), height: u(30), ...s.skylineFar }}
      >
        <Skyline layer="far" className="block size-full" />
      </div>
      <div
        data-anim="skylineNear"
        className="absolute left-0 will-change-transform"
        style={{ bottom: u(6), width: u(130), height: u(30), ...s.skylineNear }}
      >
        <Skyline layer="near" className="block size-full" />
      </div>

      {/* Welt: Straße, Häuser, Kartons, Transporter */}
      <div
        data-anim="world"
        className="absolute bottom-0 left-0 will-change-transform"
        style={{ width: u(WORLD_WIDTH), height: u(40), ...s.world }}
      >
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
          data-anim="oldGlow"
          className="absolute will-change-[opacity]"
          style={{ left: u(1), bottom: u(6), width: u(21), height: u(16), backgroundImage: glow("rgb(255 176 112 / 0.35)"), ...s.oldGlow }}
        />
        <House variant="base" className="absolute" style={{ left: u(3), bottom: u(6), width: u(17) }} />
        <div
          data-anim="oldLights"
          className="absolute will-change-[opacity]"
          style={{ left: u(3), bottom: u(6), width: u(17), ...s.oldLights }}
        >
          <House variant="lights" className="block w-full" />
        </div>

        {/* Neues Zuhause – leuchtet bei Ankunft in Markenfarben auf */}
        <div
          data-anim="newGlow"
          className="absolute will-change-[opacity]"
          style={{ left: u(82), bottom: u(2), width: u(32), height: u(26), backgroundImage: glow("rgb(255 138 61 / 0.45)"), ...s.newGlow }}
        />
        <House variant="base" className="absolute" style={{ left: u(89), bottom: u(6), width: u(18) }} />
        <div
          data-anim="newHouse"
          className="absolute will-change-[opacity]"
          style={{ left: u(89), bottom: u(6), width: u(18), ...s.newHouse }}
        >
          <House variant="home" className="block w-full" />
        </div>

        {BOXES.map((box, index) => (
          <div
            key={index}
            data-anim={`box${index}`}
            className="absolute will-change-transform"
            style={{ left: u(box.left), bottom: u(box.bottom), width: u(box.width), ...s[`box${index}`] }}
          >
            <MovingBox className="block w-full" />
          </div>
        ))}

        {/* Transporter */}
        <div
          data-anim="truck"
          className="absolute will-change-transform"
          style={{ left: u(TRUCK.left), bottom: u(1.2), width: u(TRUCK.width), ...s.truck }}
        >
          <div className="truck-bounce">
            <div data-anim="trail" className="will-change-[opacity]" style={s.trail}>
              <div className="absolute right-full flex flex-col gap-1" style={{ bottom: u(4), marginRight: u(1) }}>
                <SpeedLines className="text-brand-400" style={{ width: u(8) }} />
              </div>
              <div className="absolute" style={{ left: u(-1), bottom: u(1.5) }}>
                {[0, 0.3, 0.6].map((delay) => (
                  <span
                    key={delay}
                    className="absolute block animate-puff rounded-full bg-white/30 motion-reduce:animate-none"
                    style={{ width: u(1.6), height: u(1.6), animationDelay: `${delay}s` } as CSSProperties}
                  />
                ))}
              </div>
            </div>
            <Truck />
          </div>
        </div>

        {/* Ankunfts-Badge */}
        <div
          data-anim="badge"
          className="absolute flex origin-bottom items-center gap-2 rounded-full bg-white py-1.5 pr-4 pl-1.5 text-sm font-semibold whitespace-nowrap text-ink-950 shadow-lifted will-change-transform"
          style={{ left: u(96), bottom: u(25), ...s.badge }}
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
