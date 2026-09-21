import type { CSSProperties } from "react";

/** Umzugstransporter in Markenfarben – Räder drehen sich über `--drive`. */
export function Truck({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 240 120" overflow="visible" aria-hidden className={className} style={style}>
      <defs>
        <linearGradient id="truck-beam" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#ffd1a8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd1a8" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Scheinwerferkegel – heller während der Fahrt */}
      <path
        d="M230 72 L340 54 L340 106 Z"
        fill="url(#truck-beam)"
        style={{ opacity: "calc(0.2 + var(--driving) * 0.5)" }}
      />

      {/* Laderaum */}
      <rect x="4" y="8" width="158" height="84" rx="8" className="fill-sand-50" />
      <rect x="4" y="66" width="158" height="7" className="fill-brand-500" />
      <path d="M12 16v70" className="stroke-sand-200" strokeWidth={2} />
      <g transform="translate(16 32)" className="stroke-brand-500" strokeWidth={4} strokeLinecap="round" fill="none">
        <path d="M14 2h22M4 12h32M18 22h18" />
      </g>
      <text x="60" y="47" fontSize="12.5" fontWeight={600} className="fill-ink-900">
        Wir packen das.
      </text>

      {/* Fahrerhaus */}
      <path
        d="M166 30h36a10 10 0 0 1 8.5 4.7l18 29a10 10 0 0 1 1.5 5.3V86a6 6 0 0 1-6 6h-58z"
        className="fill-brand-500"
      />
      <path d="M174 38h26l14 22h-40z" className="fill-ink-900" />
      <path d="M182 41l-4 15" className="stroke-white/40" strokeWidth={3} strokeLinecap="round" />
      <path d="M172 64v24" className="stroke-brand-700/40" strokeWidth={2} />
      <rect x="178" y="68" width="10" height="3" rx="1.5" className="fill-brand-700" />
      <rect x="223" y="72" width="7" height="8" rx="2" className="fill-brand-100" />
      <rect x="204" y="86" width="30" height="8" rx="3" className="fill-ink-700" />

      {/* Fahrgestell & Räder */}
      <rect x="0" y="86" width="210" height="8" rx="3" className="fill-ink-800" />
      {[46, 190].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy={98} r={16} className="fill-ink-950" />
          <circle cx={cx} cy={98} r={16} className="fill-none stroke-ink-700" strokeWidth={2} />
          <g
            style={{
              transform: "rotate(calc(var(--drive) * 1440deg))",
              transformBox: "fill-box",
              transformOrigin: "center",
            }}
          >
            <circle cx={cx} cy={98} r={8} className="fill-ink-300" />
            <path d={`M${cx - 8} 98h16M${cx} 90v16`} className="stroke-ink-500" strokeWidth={2.5} />
          </g>
        </g>
      ))}
    </svg>
  );
}
