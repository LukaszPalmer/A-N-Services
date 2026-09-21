import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

/** Typografie für Fließtext-Seiten (Impressum, Datenschutz, …). */
export function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "max-w-3xl text-ink-700",
        "[&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-ink-950 [&_h2:first-child]:mt-0",
        "[&_h3]:mt-8 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-ink-950",
        "[&_p]:mt-4 [&_p]:leading-relaxed",
        "[&_ul]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5",
        "[&_a]:font-medium [&_a]:text-brand-600 [&_a]:underline [&_a]:underline-offset-4",
        className,
      )}
      {...props}
    />
  );
}
