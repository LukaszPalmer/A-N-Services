import { Clock, Phone } from "lucide-react";

import { Logo } from "@/components/brand/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { NavDropdown } from "@/components/layout/nav-dropdown";
import { NavLink } from "@/components/layout/nav-link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { mainNav, siteConfig } from "@/config/site";

const navLinkStyles =
  "relative px-4 py-2 text-[0.95rem] font-medium text-ink-800 transition-colors after:absolute after:inset-x-4 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-full after:bg-brand-500 after:transition-transform after:duration-300 hover:text-ink-950 hover:after:scale-x-100";
const navLinkActiveStyles = "text-ink-950 after:scale-x-100";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* Blur liegt auf einer eigenen Ebene, damit das fixe Mobile-Menü nicht im Header "gefangen" ist */}
      <div aria-hidden className="absolute inset-0 -z-10 border-b border-ink-900/5 bg-white/80 backdrop-blur-xl" />

      <Container className="flex h-20 items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Hauptnavigation" className="hidden lg:block">
          <ul className="flex items-center gap-1">
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

        <div className="flex items-center gap-3">
          <div className="hidden xl:flex xl:flex-col xl:items-end xl:leading-none">
            <a
              href={siteConfig.contact.phoneHref}
              className="inline-flex items-center gap-2 text-sm font-medium text-ink-800 transition-colors hover:text-brand-600"
            >
              <Phone className="size-4 text-brand-500" aria-hidden />
              {siteConfig.contact.phone}
            </a>
            <span className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-medium text-ink-500">
              <Clock className="size-3" aria-hidden />
              {siteConfig.contact.openingHoursShort}
            </span>
          </div>
          <ButtonLink href="/kontakt" className="hidden sm:inline-flex">
            Angebot anfordern
          </ButtonLink>
          <MobileNav items={mainNav} />
        </div>
      </Container>
    </header>
  );
}
