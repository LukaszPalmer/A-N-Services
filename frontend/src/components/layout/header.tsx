import { ArrowRight, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { HeaderShell } from "@/components/layout/header-shell";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { ButtonLink } from "@/components/ui/button";
import { mainNav, siteConfig } from "@/config/site";

const navLinkStyles =
  "relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-white/75 transition-colors hover:bg-white/[0.07] hover:text-white";
const navLinkActiveStyles =
  "text-white after:absolute after:bottom-0.5 after:left-1/2 after:size-1 after:-translate-x-1/2 after:rounded-full after:bg-brand-500";

/**
 * Schwebender Header als dunkle Glas-Leiste.
 * Liegt über den Video-Bannern (alle Seiten starten mit einem dunklen Banner) und
 * wird beim Scrollen dichter (siehe HeaderShell).
 */
export function Header() {
  return (
    <HeaderShell>
      <div
        className={
          "relative mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full pr-2 pl-4 sm:pl-5 " +
          "bg-ink-950/45 ring-1 ring-white/10 backdrop-blur-md transition-[background-color,box-shadow] duration-500 sm:backdrop-blur-xl " +
          "group-data-[scrolled=true]/header:bg-ink-950/85 group-data-[scrolled=true]/header:shadow-deep"
        }
      >
        <Logo tone="light" />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                {item.children ? (
                  <NavDropdown item={item} className={navLinkStyles} activeClassName={navLinkActiveStyles} />
                ) : (
                  <NavLink href={item.href} className={navLinkStyles} activeClassName={navLinkActiveStyles}>
                    {item.label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={siteConfig.contact.phoneHref}
            className="hidden items-center gap-2.5 rounded-full py-2 pr-4 pl-2 text-sm font-medium text-white/85 transition-colors hover:text-white xl:inline-flex"
          >
            <span className="relative grid size-8 place-items-center rounded-full bg-white/10 ring-1 ring-white/15">
              <Phone className="size-3.5 text-brand-400" aria-hidden />
              <span aria-hidden className="absolute -top-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 ring-2 ring-ink-950" />
            </span>
            <span className="leading-tight">
              <span className="block">{siteConfig.contact.phone}</span>
              <span className="block text-[0.7rem] text-white/50">{siteConfig.contact.openingHoursShort}</span>
            </span>
          </a>
          <ButtonLink href="/kontakt" className="hidden h-12 sm:inline-flex">
            Angebot anfordern
            <ArrowRight className="transition-transform group-hover/button:translate-x-0.5" aria-hidden />
          </ButtonLink>
          <MobileNav items={mainNav} />
        </div>
      </div>
    </HeaderShell>
  );
}
