import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const tones = {
  white: "bg-white text-ink-900",
  sand: "bg-sand-50 text-ink-900",
  dark: "bg-ink-950 text-white",
} as const;

export type SectionTone = keyof typeof tones;

type SectionProps = ComponentProps<"section"> & {
  tone?: SectionTone;
};

export function Section({ tone = "white", className, ...props }: SectionProps) {
  return <section className={cn("relative py-24 sm:py-32", tones[tone], className)} {...props} />;
}
