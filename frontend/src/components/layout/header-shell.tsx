"use client";

import { type ReactNode, useSyncExternalStore } from "react";

function subscribe(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}

const getScrolled = () => window.scrollY > 24;

/**
 * Setzt `data-scrolled` am Header, sobald die Seite gescrollt ist.
 * React rendert nur, wenn der Wert tatsächlich kippt – nicht bei jedem Scroll-Event.
 * Die Optik steuern die Kinder per `group-data-[scrolled=true]/header:`.
 */
export function HeaderShell({ children }: { children: ReactNode }) {
  const scrolled = useSyncExternalStore(subscribe, getScrolled, () => false);

  return (
    <header
      data-scrolled={scrolled}
      className="group/header fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 transition-[padding] duration-500 sm:px-5 sm:pt-4 data-[scrolled=true]:sm:pt-3"
    >
      {children}
    </header>
  );
}
