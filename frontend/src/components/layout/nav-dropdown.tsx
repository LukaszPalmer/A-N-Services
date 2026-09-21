"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/**
 * "Leistungen" im Desktop-Header: Trigger-Link plus Panel mit allen Leistungen.
 *
 * Das Panel öffnet per CSS bei Hover und bei Tastaturfokus (`focus-within`) –
 * dadurch braucht es keinen State und bleibt auch ohne JavaScript bedienbar.
 * Client Component nur wegen `usePathname` für den Aktiv-Zustand.
 */
export function NavDropdown({
  item,
  className,
  activeClassName,
}: {
  item: NavItem;
  className?: string;
  activeClassName?: string;
}) {
  const pathname = usePathname();
  const routes = [item.href, ...(item.children ?? []).map((child) => child.href)];
  const isActive = routes.some((href) => pathname === href || pathname.startsWith(`${href}/`));

  return (
    <div className="group/nav relative">
      <Link
        href={item.href}
        aria-current={isActive ? "page" : undefined}
        className={cn("inline-flex items-center gap-1", className, isActive && activeClassName)}
      >
        {item.label}
        <ChevronDown
          className="size-4 text-ink-400 transition-transform duration-300 group-hover/nav:rotate-180"
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          // linksbündig am Trigger, damit das Panel bei 1024px nicht aus dem Viewport läuft
          "invisible absolute top-full left-0 z-50 pt-3 opacity-0",
          "transition duration-200 group-hover/nav:visible group-hover/nav:opacity-100",
          "group-focus-within/nav:visible group-focus-within/nav:opacity-100",
        )}
      >
        <div className="w-[32rem] rounded-4xl border border-ink-900/8 bg-white p-2.5 shadow-lifted">
          <ul className="grid grid-cols-2 gap-1">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.href}
                  className="group/item flex items-start gap-3 rounded-3xl p-3 transition hover:bg-sand-50"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600 transition duration-300 group-hover/item:bg-brand-500 group-hover/item:text-white">
                    <service.icon className="size-5" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-ink-950">{service.title}</span>
                    <span className="mt-0.5 block truncate text-sm text-ink-500">{service.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/leistungen"
            className="group/all mt-1 flex items-center justify-between rounded-3xl bg-ink-950 px-5 py-3.5 text-sm font-medium text-white transition duration-300 hover:bg-brand-500"
          >
            Alle Leistungen im Überblick
            <ArrowRight className="size-4 transition-transform group-hover/all:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
