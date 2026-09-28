import { ArrowUpRight, Clock, Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { Logo } from "@/components/brand/logo";
import { SpeedLines } from "@/components/brand/speed-lines";
import { WhatsAppLogo } from "@/components/brand/whatsapp-logo";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Highlight } from "@/components/ui/section-heading";
import { legalNav, siteConfig } from "@/config/site";
import { services } from "@/content/services";
import type { NavItem } from "@/types";

const companyNav: NavItem[] = [
  { label: "Alle Leistungen", href: "/leistungen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Kontakt & Angebot", href: "/kontakt" },
];

export function Footer() {
  const { contact, webdesign } = siteConfig;
  const year = new Date().getFullYear();
  // Wortmarke: das "&" im Firmennamen bekommt die Markenfarbe
  const [nameBefore, nameAfter = ""] = siteConfig.name.split("&");
  const whatsappLink = `${contact.whatsappHref}?text=${encodeURIComponent(
    `Hallo ${siteConfig.name}, ich hätte gern ein unverbindliches Angebot.`,
  )}`;

  return (
    <footer className="relative isolate overflow-hidden bg-ink-950 text-white/65">
      <div aria-hidden className="absolute inset-0 -z-10 bg-grid-light [mask-image:linear-gradient(to_bottom,#000,transparent_70%)]" />
      <div
        aria-hidden
        className="absolute -top-64 left-1/2 -z-10 size-[56rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.22),transparent_62%)]"
      />

      <Container className="relative">
        {/* Abschluss-CTA */}
        <div className="flex flex-col gap-10 border-b border-white/10 pt-20 pb-16 sm:pt-28 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.18em] text-brand-300 uppercase">
              <SpeedLines className="w-4" />
              {contact.openingHoursShort} · {contact.address.city} & Niederrhein
            </p>
            <p className="mt-6 text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-white sm:text-6xl">
              Ihr nächster Schritt? <Highlight className="text-brand-400">Ein Anruf.</Highlight>
            </p>
            <a
              href={contact.phoneHref}
              className="group mt-8 inline-flex items-center gap-4 text-2xl font-medium text-white transition-colors hover:text-brand-300 sm:text-3xl"
            >
              <span className="grid size-12 place-items-center rounded-full bg-brand-500 shadow-glow transition-transform duration-500 group-hover:rotate-12 sm:size-14">
                <Phone className="size-5 sm:size-6" aria-hidden />
              </span>
              {contact.phone}
            </a>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/kontakt" size="lg">
              Kostenloses Angebot
              <ArrowUpRight className="transition-transform group-hover/button:rotate-45" aria-hidden />
            </ButtonLink>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "glass", size: "lg" })}
            >
              <WhatsAppLogo className="size-4 text-whatsapp" />
              WhatsApp
            </a>
          </div>
        </div>

        <div className="grid gap-12 py-16 lg:grid-cols-12">
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
              <a href={contact.emailHref} className="flex gap-3 break-all transition-colors hover:text-white">
                <Mail className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                {contact.email}
              </a>
            </li>
            <li>
              <a
                href={contact.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="flex gap-3 transition-colors hover:text-white"
              >
                <MapPin className="mt-0.5 size-4 shrink-0 text-brand-500" aria-hidden />
                <address className="not-italic">
                  {siteConfig.name}
                  <br />
                  {contact.address.street}
                  <br />
                  {contact.address.zip} {contact.address.city}
                </address>
              </a>
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
      </Container>

      {/* Riesige Wortmarke als Abschluss – reine Deko */}
      <p
        aria-hidden
        className="pointer-events-none -mb-[0.18em] text-center text-[14.5vw] leading-none font-bold tracking-[-0.05em] whitespace-nowrap text-white/[0.04] select-none"
      >
        {nameBefore}
        <span className="text-brand-500/20">&amp;</span>
        {nameAfter}
      </p>

      <div className="relative border-t border-white/10 bg-ink-950">
        <Container className="flex flex-col gap-4 py-7 pb-28 text-sm sm:flex-row sm:items-center sm:justify-between lg:pb-7">
          <p>
            © {year} {siteConfig.name} · Inhaber {siteConfig.owner}
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
            <ul className="flex gap-6">
              {legalNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="transition-colors hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Webdesign-Nachweis: Markenname als Linktext (kein Keyword-Anker) – so bewertet Google
                Footer-Credits als natürliche Nennung. */}
            <p>
              Webdesign &amp; Entwicklung:{" "}
              <a
                href={webdesign.url}
                target="_blank"
                rel="noopener"
                className="font-medium text-white/85 underline decoration-brand-500/60 underline-offset-4 transition-colors hover:text-white hover:decoration-brand-500"
              >
                {webdesign.name}
              </a>
            </p>
          </div>
        </Container>
      </div>
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
      <h2 className="text-xs font-semibold tracking-[0.18em] text-white uppercase">{title}</h2>
      <ul className="mt-6 space-y-3.5">{children}</ul>
    </div>
  );
}

function FooterLink({ item }: { item: NavItem }) {
  return (
    <li>
      <Link href={item.href} className="group inline-flex items-center gap-2 transition-colors hover:text-white">
        <span className="h-px w-0 bg-brand-500 transition-all duration-300 group-hover:w-3" aria-hidden />
        {item.label}
      </Link>
    </li>
  );
}
