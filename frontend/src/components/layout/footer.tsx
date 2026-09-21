import { Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { SpeedLines } from "@/components/brand/speed-lines";
import { Container } from "@/components/ui/container";
import { legalNav, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import type { NavItem } from "@/types";

const companyNav: NavItem[] = [
  { label: "Alle Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt", href: "/kontakt" },
];

export function Footer() {
  const { contact } = siteConfig;
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-ink-950 text-white/70">
      <div aria-hidden className="absolute inset-0 bg-dots-light" />
      <div
        aria-hidden
        className="absolute -top-40 -right-40 size-[28rem] rounded-full bg-brand-500/15 blur-3xl"
      />

      <Container className="relative">
        <div className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" />
            <p className="mt-6 max-w-sm leading-relaxed">{siteConfig.description}</p>
            <p className="mt-6 inline-flex items-center gap-3 text-lg font-medium text-white">
              <SpeedLines className="w-6 text-brand-500" />
              {siteConfig.claim}
            </p>
          </div>

          <FooterColumn title="Leistungen" className="lg:col-span-2 lg:col-start-6">
            {services.map((service) => (
              <FooterLink key={service.slug} item={{ label: service.title, href: service.href }} />
            ))}
          </FooterColumn>

          <FooterColumn title="Unternehmen" className="lg:col-span-2">
            {companyNav.map((item) => (
              <FooterLink key={item.href} item={item} />
            ))}
          </FooterColumn>

          <FooterColumn title="Kontakt" className="lg:col-span-3">
            <li>
              <a href={contact.phoneHref} className="flex gap-3 transition-colors hover:text-white">
                <Phone className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                {contact.phone}
              </a>
            </li>
            <li>
              <a href={contact.emailHref} className="flex gap-3 transition-colors hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
              <address className="not-italic">
                {contact.address.street}
                <br />
                {contact.address.zip} {contact.address.city}
              </address>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
              <span>
                <span className="block font-medium text-white">24 Stunden geöffnet</span>
                {contact.openingHours.map((slot) => (
                  <span key={slot.days} className="mt-1 block text-sm">
                    {slot.days}: {slot.hours}
                  </span>
                ))}
              </span>
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-8 pb-28 text-sm sm:flex-row sm:items-center sm:justify-between lg:pb-8">
          <p>
            © {year} {siteConfig.name}. Alle Rechte vorbehalten.
          </p>
          <ul className="flex gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  className,
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="text-sm font-semibold tracking-[0.14em] text-white uppercase">{title}</h2>
      <ul className="mt-6 space-y-4">{children}</ul>
    </div>
  );
}

function FooterLink({ item }: { item: NavItem }) {
  return (
    <li>
      <Link href={item.href} className="transition-colors hover:text-white">
        {item.label}
      </Link>
    </li>
  );
}
