import { initialSceneStyles } from "@/components/sections/moving-story/timeline";

/**
 * Umzugstransporter in Markenfarben.
 *
 * Scheinwerferkegel und Radnaben sind eigene HTML-Ebenen über der statischen
 * Karosserie: Beim Fahren ändern sich nur deren `opacity`/`transform` – die
 * Karosserie-Grafik wird nie neu gezeichnet. Positionen in % der Grafik (240 × 120).
 */
export function Truck() {
  return (
    <div className="relative aspect-[2/1] w-full">
      {/* Scheinwerferkegel – heller während der Fahrt */}
      <div
        data-anim="beam"
        className="absolute bg-linear-to-r from-brand-200/90 to-brand-200/0 will-change-[opacity] [clip-path:polygon(0_34.6%,100%_0,100%_100%)]"
        style={{ left: "95.8%", top: "45%", width: "45.8%", height: "43.3%", ...initialSceneStyles.beam }}
      />

      <svg viewBox="0 0 240 120" overflow="visible" aria-hidden className="absolute inset-0 size-full">
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

        {/* Fahrgestell & Reifen (statisch) */}
        <rect x="0" y="86" width="210" height="8" rx="3" className="fill-ink-800" />
        {[46, 190].map((cx) => (
          <g key={cx}>
            <circle cx={cx} cy={98} r={16} className="fill-ink-950" />
            <circle cx={cx} cy={98} r={16} className="fill-none stroke-ink-700" strokeWidth={2} />
          </g>
        ))}
      </svg>

      {/* Radnaben – drehen sich per transform */}
      {[46, 190].map((cx) => (
        <div
          key={cx}
          data-anim="wheel"
          className="absolute aspect-square will-change-transform"
          style={{
            left: `${((cx - 8) / 240) * 100}%`,
            top: `${(90 / 120) * 100}%`,
            width: `${(16 / 240) * 100}%`,
            ...initialSceneStyles.wheel,
          }}
        >
          <svg viewBox="0 0 16 16" aria-hidden className="block size-full">
            <circle cx="8" cy="8" r="8" className="fill-ink-300" />
            <path d="M0 8h16M8 0v16" className="stroke-ink-500" strokeWidth={2.5} />
          </svg>
        </div>
      ))}
    </div>
  );
}
