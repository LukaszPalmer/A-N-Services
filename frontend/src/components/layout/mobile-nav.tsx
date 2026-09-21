"use client";

import { ArrowRight, Clock, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";

import { NavLink } from "@/components/layout/nav-link";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import type { NavItem } from "@/types";

export function MobileNav({ items }: { items: NavItem[] }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  // Scroll sperren & mit Escape schließen, solange das Menü offen ist
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-11 place-items-center rounded-full border border-ink-900/10 text-ink-950 transition hover:bg-ink-50"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-x-0 top-20 bottom-0 z-40 flex animate-fade-in flex-col overflow-y-auto bg-white px-5 pt-6 pb-8 sm:px-8"
        >
          <nav aria-label="Mobile Navigation">
            <ul className="divide-y divide-ink-900/5">
              {items.map((item) => (
                <li key={item.href} className="py-1">
                  <NavLink
                    href={item.href}
                    onClick={close}
                    className="flex items-center justify-between py-4 text-2xl font-medium text-ink-950"
                    activeClassName="text-brand-600"
                  >
                    {item.label}
                    <ArrowRight className="size-5 text-ink-300" aria-hidden />
                  </NavLink>

                  {/* Unterpunkte (Leistungen) direkt ausklappen – die Liste ist kurz genug */}
                  {item.children && (
                    <ul className="mb-3 grid gap-0.5">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <NavLink
                            href={child.href}
                            onClick={close}
                            className="flex items-center gap-3 rounded-2xl py-2.5 pl-1 text-lg text-ink-600"
                            activeClassName="font-medium text-brand-600"
                          >
                            <span aria-hidden className="size-1.5 shrink-0 rounded-full bg-brand-400" />
                            {child.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto grid gap-3 pt-10">
            <ButtonLink href="/kontakt" size="lg" onClick={close}>
              Kostenloses Angebot anfordern
            </ButtonLink>
            <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "outline", size: "lg" })}>
              <Phone aria-hidden />
              {siteConfig.contact.phone}
            </a>
            <p className="flex items-center justify-center gap-2 text-sm text-ink-500">
              <Clock className="size-4 text-brand-500" aria-hidden />
              {siteConfig.contact.openingHoursNote}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
