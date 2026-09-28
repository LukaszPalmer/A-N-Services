"use client";

import { ArrowUpRight, Clock, Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { WhatsAppLogo } from "@/components/brand/whatsapp-logo";
import { NavLink } from "@/components/layout/nav-link";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import type { NavItem } from "@/types";

/**
 * Mobiles Vollbild-Menü.
 *
 * Wird per Portal direkt in <body> gerendert: Der Header trägt `backdrop-filter`,
 * und ein fixiertes Element darin würde sich sonst am Header statt am Bildschirm
 * ausrichten. Der Header (z-50) bleibt über dem Menü (z-40) – so ist der
 * Schließen-Knopf immer an derselben Stelle.
 */
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
        className="grid size-12 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/15 transition hover:bg-white/20"
      >
        {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
        <span className="sr-only">{open ? "Menü schließen" : "Menü öffnen"}</span>
      </button>

      {open && createPortal(<MenuPanel items={items} onNavigate={close} />, document.body)}
    </div>
  );
}

function MenuPanel({ items, onNavigate }: { items: NavItem[]; onNavigate: () => void }) {
  const whatsappLink = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(
    `Hallo ${siteConfig.name}, ich hätte gern ein unverbindliches Angebot.`,
  )}`;

  return (
    <div
      id="mobile-menu"
      className="fixed inset-0 z-40 flex animate-fade-in flex-col overflow-y-auto bg-ink-950 px-5 pt-28 pb-8 text-white [animation-duration:300ms] sm:px-8 lg:hidden"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-grid-light opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -right-40 size-[30rem] rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.28),transparent_65%)]"
      />

      <nav aria-label="Mobile Navigation" className="relative">
        <ul className="space-y-1">
          {items.map((item, index) => (
            <li key={item.href} className="animate-fade-up" style={{ animationDelay: `${80 + index * 70}ms` }}>
              <NavLink
                href={item.href}
                onClick={onNavigate}
                className="flex items-baseline gap-4 py-2.5 text-[2.5rem] leading-none font-semibold tracking-tight text-white"
                activeClassName="text-brand-400"
              >
                <span className="w-7 text-xs font-medium tracking-[0.2em] text-white/35 tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {item.label}
              </NavLink>

              {/* Unterpunkte (Leistungen) direkt als Kacheln – die Liste ist kurz genug */}
              {item.children && (
                <ul className="mt-3 mb-5 grid grid-cols-2 gap-2 pl-11">
                  {services.map((service) => (
                    <li key={service.href}>
                      <NavLink
                        href={service.href}
                        onClick={onNavigate}
                        className="flex items-center gap-2.5 rounded-2xl bg-white/[0.06] px-3 py-3 text-sm font-medium text-white/80 ring-1 ring-white/10 transition hover:bg-white/10"
                        activeClassName="bg-brand-500/15 text-white ring-brand-500/40"
                      >
                        <service.icon className="size-4 shrink-0 text-brand-400" strokeWidth={1.75} aria-hidden />
                        <span className="truncate">{service.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>

      <div className="relative mt-auto grid animate-fade-up gap-3 pt-10 [animation-delay:320ms]">
        <ButtonLink href="/kontakt" size="lg" onClick={onNavigate}>
          Kostenloses Angebot anfordern
          <ArrowUpRight aria-hidden />
        </ButtonLink>
        <div className="grid grid-cols-2 gap-3">
          <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "lg" })}>
            <Phone aria-hidden />
            Anrufen
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonStyles({ variant: "whatsapp", size: "lg" })}
          >
            <WhatsAppLogo className="size-4" />
            WhatsApp
          </a>
        </div>
        <p className="mt-2 flex items-center justify-center gap-2 text-sm text-white/55">
          <Clock className="size-4 text-brand-400" aria-hidden />
          {siteConfig.contact.openingHoursNote}
        </p>
      </div>
    </div>
  );
}
