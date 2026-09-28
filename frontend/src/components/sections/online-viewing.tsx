import { BadgeEuro, Check, Mic, Phone, PhoneOff, Video } from "lucide-react";
import Image from "next/image";

import { LogoMark } from "@/components/brand/logo";
import { WhatsAppLogo } from "@/components/brand/whatsapp-logo";
import { buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconBadge } from "@/components/ui/icon-badge";
import { Section, type SectionTone } from "@/components/ui/section";
import { Highlight, SectionHeading } from "@/components/ui/section-heading";
import { siteConfig } from "@/config/site";
import { images } from "@/content/images";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Termin vereinbaren",
    description:
      "Eine kurze Nachricht per WhatsApp genügt. Meist klappt der Anruf noch am selben Tag – auch abends oder am Wochenende.",
  },
  {
    title: "Videoanruf starten",
    description:
      "Wir rufen Sie an, Sie gehen mit der Kamera einmal durch die Räume. Kein Besuch, kein Aufräumen, keine Wartezeit.",
  },
  {
    title: "Festpreis erhalten",
    description:
      "Wir sehen Umfang, Etage und Zugang – und Sie bekommen Ihr verbindliches Angebot schriftlich, ohne versteckte Kosten.",
  },
];

const benefits = ["Kostenlos & unverbindlich", "Dauert rund 15 Minuten", "Rund um die Uhr möglich"];

/**
 * Online-Besichtigung per WhatsApp – die digitale Alternative zum Vor-Ort-Termin
 * aus Schritt 2 des Ablaufs (siehe content/process.ts).
 */
export function OnlineViewing({ tone = "white" }: { tone?: SectionTone }) {
  const whatsappLink = `${siteConfig.contact.whatsappHref}?text=${encodeURIComponent(
    `Hallo ${siteConfig.name}, ich hätte gern eine kostenlose Online-Besichtigung per WhatsApp.`,
  )}`;

  return (
    <Section tone={tone} className="overflow-hidden">
      <Container size="wide" className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div>
          <SectionHeading
            eyebrow="Online-Besichtigung"
            title={
              <>
                Besichtigung per <Highlight>WhatsApp</Highlight> – in 15 Minuten.
              </>
            }
            description="Sie müssen für ein Angebot niemanden in die Wohnung lassen. Im Videoanruf gehen Sie einmal mit der Kamera durch die Räume, wir erfassen alles Nötige – und Sie bekommen Ihren Festpreis."
          />

          <ol className="relative mt-12 space-y-8 before:absolute before:top-2 before:bottom-2 before:left-[1.1rem] before:w-px before:bg-linear-to-b before:from-brand-500 before:to-brand-500/0">
            {steps.map((step, index) => (
              <li key={step.title} className="reveal relative flex gap-5">
                <span
                  className={cn(
                    "relative grid size-9 shrink-0 place-items-center rounded-full bg-ink-950 text-sm font-semibold text-white ring-4",
                    tone === "sand" ? "ring-sand-50" : "ring-white",
                  )}
                >
                  {index + 1}
                </span>
                <div>
                  <h3 className="font-semibold text-ink-950">{step.title}</h3>
                  <p className="mt-1 leading-relaxed text-ink-600">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles({ variant: "whatsapp", size: "lg" })}
            >
              <WhatsAppLogo className="size-5" />
              Termin per WhatsApp
            </a>
            <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "outline", size: "lg" })}>
              <Phone aria-hidden />
              Lieber anrufen
            </a>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2.5 text-sm text-ink-600">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2">
                <span className="grid size-4.5 place-items-center rounded-full bg-brand-500 text-white">
                  <Check className="size-2.5" strokeWidth={3.5} aria-hidden />
                </span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        {/* Illustration: so sieht der Videoanruf aus */}
        <div className="reveal relative mx-auto w-full max-w-[20rem]">
          <div
            aria-hidden
            className="absolute -inset-24 -z-10 rounded-full bg-[radial-gradient(circle,rgb(249_106_22/0.22),transparent_60%)]"
          />
          <div
            aria-hidden
            className="absolute top-10 -left-16 -z-10 hidden size-40 rounded-full bg-[radial-gradient(circle,rgb(37_211_102/0.25),transparent_65%)] sm:block"
          />
          <div className="relative rotate-2 rounded-[2.9rem] bg-ink-950 p-2.5 shadow-deep ring-1 ring-ink-900/10 transition duration-700 hover:rotate-0">
            <div className="relative aspect-[9/17] overflow-hidden rounded-[2.1rem]">
              <Image
                src={images.besenrein.src}
                alt={images.besenrein.alt}
                fill
                placeholder="blur"
                sizes="304px"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-b from-ink-950/75 via-ink-950/10 to-ink-950/85"
              />

              {/* Kopfzeile des Anrufs */}
              <div className="absolute inset-x-3 top-3 flex items-center gap-2.5 rounded-2xl bg-white/10 p-2.5 ring-1 ring-white/15 backdrop-blur-md">
                <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-ink-950 text-white">
                  <LogoMark withWordmark={false} className="h-5 w-auto" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-white">{siteConfig.name}</span>
                  <span className="block text-[0.65rem] text-white/70">Videoanruf läuft</span>
                </span>
                <span className="rounded-full bg-red-500 px-2 py-0.5 text-[0.6rem] font-bold tracking-wider text-white">
                  LIVE
                </span>
              </div>

              <p className="absolute inset-x-4 top-1/2 -translate-y-1/2 rounded-2xl bg-ink-950/55 px-4 py-3 text-center text-sm leading-snug text-white backdrop-blur-sm">
                „Zeigen Sie uns einmal den Flur und den Keller.“
              </p>

              {/* Anruf-Leiste */}
              <div className="absolute inset-x-3 bottom-3 flex items-center justify-center gap-3">
                <span className="grid size-11 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md">
                  <Video className="size-5" aria-hidden />
                </span>
                <span className="grid size-11 place-items-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md">
                  <Mic className="size-5" aria-hidden />
                </span>
                <span className="grid size-11 place-items-center rounded-full bg-red-500 text-white">
                  <PhoneOff className="size-5" aria-hidden />
                </span>
              </div>
            </div>
          </div>

          <div className="absolute -right-2 bottom-20 flex animate-float items-center gap-3 rounded-2xl bg-white p-3 pr-5 shadow-deep ring-1 ring-ink-900/5 sm:-right-10">
            <IconBadge icon={BadgeEuro} variant="solid" />
            <div>
              <p className="text-sm font-semibold text-ink-950">Festpreis danach</p>
              <p className="mt-0.5 text-xs text-ink-500">schriftlich in 24 h</p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
