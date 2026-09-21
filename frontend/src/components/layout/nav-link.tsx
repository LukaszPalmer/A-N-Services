"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type NavLinkProps = {
  href: Route;
  children: ReactNode;
  className?: string;
  activeClassName?: string;
  onClick?: () => void;
};

/** Link mit Aktiv-Zustand (aria-current) für die Navigation. */
export function NavLink({ href, children, className, activeClassName, onClick }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(`${href}/`);

  return (
    <Link
      href={href}
      onClick={onClick}
      aria-current={isActive ? "page" : undefined}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  );
}
