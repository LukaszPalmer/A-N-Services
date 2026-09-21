import type { CSSProperties } from "react";

/** Umzugskarton mit Klebeband & Etikett. */
export function MovingBox({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 40 34" aria-hidden className={className} style={style}>
      <rect x="1" y="3" width="38" height="30" rx="2" className="fill-sand-400" />
      <rect x="1" y="3" width="38" height="7" rx="2" className="fill-sand-300" />
      <rect x="17" y="3" width="6" height="30" className="fill-sand-200/80" />
      <rect x="5" y="17" width="9" height="8" rx="1" className="fill-sand-50" />
      <path d="M7 20h5M7 22.5h3" className="stroke-brand-500" strokeWidth={1.2} strokeLinecap="round" />
    </svg>
  );
}
