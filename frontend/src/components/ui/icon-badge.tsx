import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

const variants = {
  soft: "bg-brand-50 text-brand-600 ring-1 ring-brand-100",
  solid: "bg-brand-500 text-white shadow-glow",
  white: "bg-white text-brand-600 shadow-soft",
  dark: "bg-white/10 text-brand-300 ring-1 ring-white/15",
} as const;

const sizes = {
  md: "size-12 rounded-2xl [&_svg]:size-5.5",
  lg: "size-14 rounded-2xl [&_svg]:size-6",
} as const;

type IconBadgeProps = {
  icon: LucideIcon;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  className?: string;
};

export function IconBadge({ icon: Icon, variant = "soft", size = "md", className }: IconBadgeProps) {
  return (
    <span className={cn("grid shrink-0 place-items-center", variants[variant], sizes[size], className)}>
      <Icon aria-hidden strokeWidth={1.75} />
    </span>
  );
}
