import type { CSSProperties } from "react";

type HouseProps = {
  /**
   * base   – dunkles Haus mit dunklen Fenstern (Grundzustand)
   * lights – nur die beleuchteten Fenster (Overlay, wird per opacity eingeblendet)
   * home   – Haus in Markenfarben mit Licht (Overlay für die Ankunft)
   */
  variant: "base" | "lights" | "home";
  style?: CSSProperties;
  className?: string;
};

/**
 * Haus-Silhouette der Umzugs-Story.
 * Licht und Markenfarben liegen als eigene SVG-Ebenen übereinander. Animiert wird nur
 * deren `opacity` – das Haus selbst muss dafür nie neu gezeichnet werden.
 */
export function House({ variant, className, style }: HouseProps) {
  return (
    <svg viewBox="0 0 180 170" aria-hidden className={className} style={style}>
      {variant === "base" && (
        <>
          <HouseShape body="fill-ink-600" roof="fill-ink-700" door="fill-ink-700" />
          <Windows className="fill-ink-950" />
        </>
      )}
      {variant === "home" && <HouseShape body="fill-sand-100" roof="fill-brand-500" door="fill-brand-700" />}
      {variant !== "base" && <Windows className="fill-brand-200" />}
      <g className="stroke-ink-800" strokeWidth={2.5}>
        <path d="M49 92v28M34 106h30M131 92v28M116 106h30M90 42v20M80 52h20" />
      </g>
    </svg>
  );
}

function HouseShape({ body, roof, door }: { body: string; roof: string; door: string }) {
  return (
    <>
      <rect x="118" y="22" width="16" height="36" className={roof} />
      <rect x="18" y="72" width="144" height="98" className={body} />
      <path d="M4 80 L90 12 L176 80 Z" className={roof} />
      <rect x="76" y="112" width="28" height="58" rx="3" className={door} />
    </>
  );
}

function Windows({ className }: { className: string }) {
  return (
    <g className={className}>
      <rect x="34" y="92" width="30" height="28" rx="2" />
      <rect x="116" y="92" width="30" height="28" rx="2" />
      <circle cx="90" cy="52" r="10" />
    </g>
  );
}
