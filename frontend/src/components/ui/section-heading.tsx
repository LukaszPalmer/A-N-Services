import type { ReactNode } from "react";

import { Eyebrow } from "@/components/ui/eyebrow";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isDark = tone === "dark";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && <Eyebrow variant={isDark ? "dark" : "soft"}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "mt-5 text-3xl leading-[1.1] font-semibold sm:text-4xl lg:text-5xl",
          isDark ? "text-white" : "text-ink-950",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-5 text-lg leading-relaxed", isDark ? "text-white/70" : "text-ink-600")}>
          {description}
        </p>
      )}
    </div>
  );
}

/** Hebt einzelne Wörter in Überschriften in der Markenfarbe hervor. */
export function Highlight({ children }: { children: ReactNode }) {
  return <span className="text-brand-500">{children}</span>;
}
