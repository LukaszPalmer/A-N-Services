import type { ServiceSlug } from "@/types";

export type ContactRequest = {
  name: string;
  email: string;
  phone: string;
  service: ServiceSlug | "kombination" | "sonstiges";
  date: string;
  fromZip: string;
  toZip: string;
  message: string;
  privacyAccepted: boolean;
};

export function parseContactForm(formData: FormData): ContactRequest {
  const get = (key: string) => String(formData.get(key) ?? "").trim();

  return {
    name: get("name"),
    email: get("email"),
    phone: get("phone"),
    service: get("service") as ContactRequest["service"],
    date: get("date"),
    fromZip: get("fromZip"),
    toZip: get("toZip"),
    message: get("message"),
    privacyAccepted: formData.get("privacy") === "on",
  };
}

/**
 * Sendet eine Kontaktanfrage.
 *
 * TODO(Backend): Hier die echte Anbindung einbauen – z. B. Route Handler
 * (`app/api/contact/route.ts`) oder Server Action mit E-Mail-Versand/CRM.
 * Bis dahin: In Entwicklung wird die Anfrage nur geloggt; in Produktion schlägt
 * sie bewusst fehl, damit keine Anfragen unbemerkt verloren gehen.
 */
export async function sendContactRequest(request: ContactRequest): Promise<void> {
  if (process.env.NODE_ENV === "production") {
    throw new Error("Kontaktformular ist noch nicht an ein Backend angebunden.");
  }

  console.info("[Kontaktanfrage – nur Entwicklung]", request);
  await new Promise((resolve) => setTimeout(resolve, 800));
}
