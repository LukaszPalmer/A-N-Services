import { Phone } from "lucide-react";

import { WhatsAppLogo } from "@/components/brand/whatsapp-logo";
import { buttonStyles } from "@/components/ui/button";
import { siteConfig } from "@/config/site";

/**
 * Feste Aktionsleiste am unteren Bildschirmrand – nur auf Mobilgeräten.
 *
 * Ein Handwerksbetrieb wird vom Handy aus kontaktiert. Anruf und WhatsApp sind
 * dadurch von jeder Seite aus einen Daumen entfernt, ohne dass zurück nach oben
 * gescrollt werden muss.
 *
 * z-30: Das Mobile-Menü (z-40) legt sich darüber, sobald es geöffnet ist.
 * Der Footer bekommt unten zusätzlichen Abstand, damit die Leiste nichts verdeckt.
 */
export function MobileContactBar() {
  const { contact } = siteConfig;
  const whatsappLink = `${contact.whatsappHref}?text=${encodeURIComponent(
    `Hallo ${siteConfig.name}, ich hätte gern ein unverbindliches Angebot.`,
  )}`;

  return (
    <div className="fixed inset-x-0 bottom-0 z-30 border-t border-ink-900/10 bg-white/90 backdrop-blur-xl lg:hidden">
      <div className="mx-auto flex max-w-md gap-2.5 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
        <a href={contact.phoneHref} className={buttonStyles({ variant: "dark" }, "flex-1")}>
          <Phone aria-hidden />
          Anrufen
        </a>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonStyles({}, "flex-1 bg-whatsapp shadow-none hover:bg-whatsapp-dark")}
        >
          <WhatsAppLogo className="size-4" />
          WhatsApp
        </a>
      </div>
    </div>
  );
}
