import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  /** Überschrift-Ebene – Standard h2 */
  as?: "h1" | "h2";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow variant={isDark ? "dark" : "soft"}>{eyebrow}</Eyebrow>}
      <Heading
        className={cn(
          "mt-6 text-[2.15rem] leading-[1.04] font-semibold tracking-[-0.035em] sm:text-5xl lg:text-[3.6rem]",
          isDark ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </Heading>
      {description && (
        <p
          className={cn(
            "mt-6 text-lg leading-relaxed",
            align === "center" && "mx-auto max-w-2xl",
            isDark ? "text-white/65" : "text-ink-600",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

/**
 * Hebt einzelne Wörter in Überschriften hervor: kursive Serifenschrift in Markenfarbe.
 * Der Kontrast Geometrie ↔ Serife ist ein fester Teil der Marke.
 */
export function Highlight({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("font-serif text-[1.08em] leading-none font-normal tracking-[-0.01em] text-brand-500 italic", className)}>
      {children}
    </span>
  );
}
