import { Phone } from "lucide-react";

import { WhatsAppLogo } from "@/components/brand/whatsapp-logo";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * Schwebende Aktionsleiste am unteren Bildschirmrand – nur auf Mobilgeräten.
 *
 * Ein Handwerksbetrieb wird vom Handy aus kontaktiert. Anruf und WhatsApp sind
 * dadurch von jeder Seite aus einen Daumen entfernt, ohne dass zurück nach oben
 * gescrollt werden muss.
 *
 * z-30: Das Mobile-Menü (z-40) legt sich darüber, sobald es geöffnet ist.
 * Der Footer bekommt unten zusätzlichen Abstand, damit die Leiste nichts verdeckt.
 * Bewusst ohne backdrop-filter: auf günstigen Smartphones ruckelt sonst das Scrollen.
 */
export function MobileContactBar() {
  const { contact } = siteConfig;
  const whatsappLink = `${contact.whatsappHref}?text=${encodeURIComponent(
    `Hallo ${siteConfig.name}, ich hätte gern ein unverbindliches Angebot.`,
  )}`;

  return (
    <div className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 mx-auto max-w-md lg:hidden">
      <div className="flex gap-2 rounded-full bg-ink-950/95 p-1.5 shadow-deep ring-1 ring-white/10">
        <a href={contact.phoneHref} className={buttonStyles({ variant: "primary" }, "flex-1 shadow-none")}>
          <Phone aria-hidden />
          Anrufen
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({ variant: "whatsapp" }, "flex-1")}
        >
          <WhatsAppLogo className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
