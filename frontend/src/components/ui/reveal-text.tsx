import { Fragment } from "react";

import { cn } from "@/lib/utils";

type RevealTextProps = {
  /** Normaler Teil der Überschrift */
  text: string;
  /** Hervorgehobener Teil – kursive Serife in Markenfarbe (wie <Highlight>) */
  accent?: string;
  /** Hervorhebung in einer eigenen Zeile */
  accentOnNewLine?: boolean;
  accentClassName?: string;
  /** Verzögerung vor dem ersten Wort (ms) */
  delay?: number;
  /** Versatz zwischen zwei Wörtern (ms) */
  stagger?: number;
};

/**
 * Überschrift, deren Wörter nacheinander von unten "aufsteigen".
 *
 * Reines CSS (keyframes `rise`), läuft ohne JavaScript und damit auch vor der
 * Hydrierung. Der komplette Text steht normal im HTML – Suchmaschinen und
 * Screenreader lesen ihn wie jeden anderen Text. Bei "Bewegung reduzieren" steht
 * er sofort da.
 */
export function RevealText({
  text,
  accent,
  accentOnNewLine = false,
  accentClassName,
  delay = 0,
  stagger = 70,
}: RevealTextProps) {
  const words = [
    ...text.split(/\s+/).filter(Boolean).map((word) => ({ word, isAccent: false })),
    ...(accent ?? "").split(/\s+/).filter(Boolean).map((word) => ({ word, isAccent: true })),
  ];
  const firstAccent = words.findIndex((entry) => entry.isAccent);

  return words.map(({ word, isAccent }, index) => (
    <Fragment key={`${word}-${index}`}>
      {accentOnNewLine && index === firstAccent && index > 0 && <br />}
      <span className={cn("-mb-[0.16em] inline-block overflow-hidden pb-[0.16em] align-bottom", isAccent && "-mr-[0.08em] pr-[0.08em]")}>
        <span
          className={cn(
            "inline-block animate-rise motion-reduce:animate-none",
            isAccent && "font-serif text-[1.08em] leading-none font-normal tracking-[-0.01em] text-brand-400 italic",
            isAccent && accentClassName,
          )}
          style={{ animationDelay: `${delay + index * stagger}ms` }}
        >
          {word}
        </span>
      </span>
      {index < words.length - 1 && " "}
    </Fragment>
  ));
}
