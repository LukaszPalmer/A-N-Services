"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { services } from "@/content/services";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";

/**
 * "Leistungen" im Desktop-Header: Trigger-Link plus Mega-Menü mit allen Leistungen.
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
          className="size-4 text-white/50 transition-transform duration-300 group-hover/nav:rotate-180"
          aria-hidden
        />
      </Link>

      <div
        className={cn(
          // linksbündig am Trigger, damit das Panel bei 1024px nicht aus dem Viewport läuft
          "invisible absolute top-full -left-24 z-50 translate-y-2 pt-4 opacity-0",
          "transition duration-300 ease-out group-hover/nav:visible group-hover/nav:translate-y-0 group-hover/nav:opacity-100",
          "group-focus-within/nav:visible group-focus-within/nav:translate-y-0 group-focus-within/nav:opacity-100",
        )}
      >
        <div className="w-[40rem] rounded-4xl bg-ink-950/95 p-3 shadow-deep ring-1 ring-white/10 backdrop-blur-xl">
          <ul className="grid grid-cols-2 gap-1.5">
            {services.map((service) => (
              <li key={service.slug}>
                <Link
                  href={service.href}
                  className="group/item flex items-center gap-3.5 rounded-3xl p-2.5 transition hover:bg-white/[0.06]"
                >
                  <span className="relative size-14 shrink-0 overflow-hidden rounded-2xl">
                    <Image
                      src={service.image.src}
                      alt=""
                      fill
                      sizes="56px"
                      className="object-cover transition duration-500 group-hover/item:scale-110"
                    />
                    <span className="absolute inset-0 grid place-items-center bg-ink-950/45 text-white transition group-hover/item:bg-brand-500/80">
                      <service.icon className="size-5" strokeWidth={1.75} aria-hidden />
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block font-medium text-white">{service.title}</span>
                    <span className="mt-0.5 block truncate text-sm text-white/50">{service.tagline}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/leistungen"
            className="group/all mt-2 flex items-center justify-between rounded-3xl bg-brand-500 px-5 py-4 text-sm font-medium text-white transition duration-300 hover:bg-brand-600"
          >
            Alle Leistungen im Überblick – ein Team, ein Festpreis
            <ArrowRight className="size-4 transition-transform group-hover/all:translate-x-1" aria-hidden />
          </Link>
        </div>
      </div>
    </div>
  );
}
