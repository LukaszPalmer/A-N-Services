import { MARK_AMP, MARK_HOUSE, MARK_LINES } from "@/components/brand/logo-paths";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Runder "Stempel": Claim als Kreisschrift, die sich langsam dreht, in der Mitte
 * das Signet. Gedreht wird ein HTML-Wrapper um den Text-Ring – CSS-Animationen direkt
 * auf einem <svg> laufen nicht auf der GPU und würden jeden Frame neu gezeichnet.
 */
export function RotatingBadge({ className }: { className?: string }) {
  const text = `${siteConfig.claim.replace(".", "")} · ${siteConfig.contact.openingHoursShort} · ${siteConfig.claim.replace(".", "")} · Moers · `;

  return (
    <div aria-hidden className={cn("relative grid size-36 place-items-center rounded-full bg-brand-500 shadow-glow-lg", className)}>
      <div className="absolute inset-0 animate-spin-slow will-change-transform [animation-duration:18s]">
        <svg viewBox="0 0 200 200" className="size-full">
          <defs>
            <path id="badge-circle" d="M100 100m-76 0a76 76 0 1 1 152 0a76 76 0 1 1-152 0" />
          </defs>
          <text className="fill-white text-[15.5px] font-semibold tracking-[0.2em] uppercase">
            <textPath href="#badge-circle" textLength="470">
              {text}
            </textPath>
          </text>
        </svg>
      </div>
      <svg viewBox="6 8 52 50" className="relative w-14">
        <path d={MARK_HOUSE} fill="none" stroke="#fff" strokeWidth={4.8} strokeLinecap="round" strokeLinejoin="round" />
        <path d={MARK_LINES} stroke="#fff" strokeOpacity={0.6} strokeWidth={4.8} strokeLinecap="round" />
        <path d={MARK_AMP} fill="#fff" />
      </svg>
    </div>
  );
}
