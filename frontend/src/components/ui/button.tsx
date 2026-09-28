import type { Route } from "next";
import Link from "next/link";
import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

const variants = {
  primary: "shine bg-brand-500 text-white shadow-glow hover:bg-brand-600 hover:shadow-glow-lg",
  dark: "shine bg-ink-950 text-white hover:bg-ink-800",
  outline:
    "border border-ink-900/15 bg-white text-ink-900 hover:border-ink-950 hover:bg-ink-950 hover:text-white",
  light: "shine bg-white text-ink-950 hover:bg-sand-100",
  glass: "border border-white/20 bg-white/10 text-white backdrop-blur-md hover:border-white/35 hover:bg-white/20",
  whatsapp: "shine bg-whatsapp text-white hover:bg-whatsapp-dark",
} as const;

const sizes = {
  sm: "h-10 px-5 text-sm",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
} as const;

export type ButtonStyleProps = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
};

/** Klassen für Buttons – auch für `<a href="tel:…">` & Co. nutzbar. */
export function buttonStyles(
  { variant = "primary", size = "md" }: ButtonStyleProps = {},
  className?: string,
) {
  return cn(
    "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-medium whitespace-nowrap",
    "transition-all duration-300 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60",
    "[&_svg]:size-[1.15em] [&_svg]:shrink-0",
    variants[variant],
    sizes[size],
    className,
  );
}

type ButtonProps = ComponentProps<"button"> & ButtonStyleProps;

export function Button({ variant, size, className, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={buttonStyles({ variant, size }, className)} {...props} />;
}

type ButtonLinkProps = Omit<ComponentProps<"a">, "href" | "ref"> &
  ButtonStyleProps & {
    href: Route;
  };

/** Interne Navigation im Button-Look (typisierte Routen via `typedRoutes`). */
export function ButtonLink({ variant, size, className, href, ...props }: ButtonLinkProps) {
  return <Link href={href} className={buttonStyles({ variant, size }, className)} {...props} />;
}
