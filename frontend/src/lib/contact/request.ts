import { services } from "@/content/services";
import type { ServiceSlug } from "@/types";

/*
 * Kontaktformular: Felder, Grenzen und Prüfung.
 * Wird im Formular (Browser) und in der Server Action genutzt – hier also nichts Server-Exklusives.
 */

export type ContactService = ServiceSlug | "kombination" | "sonstiges";

/** Eine geprüfte Anfrage – alle Texte bereinigt */
export type ContactRequest = {
  name: string;
  email: string;
  /** optional */
  phone: string;
  service: ContactService;
  /** Wunschtermin JJJJ-MM-TT, optional */
  date: string;
  /** Postleitzahlen, optional */
  fromZip: string;
  toZip: string;
  message: string;
};

export type ContactField = keyof ContactRequest | "privacy";
export type ContactFieldErrors = Partial<Record<ContactField, string>>;

export type ContactFormState = {
  status: "idle" | "success" | "error";
  message: string;
  /** Hinweise direkt am jeweiligen Feld */
  errors?: ContactFieldErrors;
  /** Eingaben zurück ins Formular: React leert es nach dem Absenden – bei Fehlern soll nichts verloren gehen */
  values?: Partial<Record<ContactField, string>>;
};

export const contactFields: ContactField[] = [
  "name",
  "email",
  "phone",
  "service",
  "date",
  "fromZip",
  "toZip",
  "message",
  "privacy",
];

/** Unsichtbares Feld als Spam-Falle – nur Bots füllen es aus */
export const HONEYPOT_FIELD = "kontakt_referenz";

/** Obergrenzen – dieselben Werte stehen als `maxLength` im Formular */
export const contactLimits = { name: 100, email: 254, phone: 40, message: 5000 } as const;

/** Auswahl "Leistung": alle Leistungen plus zwei Sammeloptionen */
export const contactServiceOptions: { value: ContactService; label: string }[] = [
  ...services.map((service) => ({ value: service.slug, label: service.title })),
  { value: "kombination", label: "Kombination mehrerer Leistungen" },
  { value: "sonstiges", label: "Sonstiges" },
];

export function contactServiceLabel(service: ContactService) {
  return contactServiceOptions.find((option) => option.value === service)?.label ?? service;
}

/** Text eines Formularfelds – Dateien und fehlende Felder ergeben "" */
export function formText(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

/** Einzeilige Angaben: Zeilenumbrüche und Steuerzeichen raus – schützt u. a. die E-Mail-Kopfzeilen */
function singleLine(value: string) {
  return value
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Mehrzeiliger Text: Zeilenumbrüche vereinheitlichen, übrige Steuerzeichen entfernen */
function multiLine(value: string) {
  return value
    .replace(/\r\n?/g, "\n")
    .replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, "")
    .trim();
}

// Bewusst schlicht: ein @, ein Punkt in der Domain, keine Zeichen, die Adresszeilen verwirren könnten
const emailPattern = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;
const zipPattern = /^\d{5}$/;

function isValidDate(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
}

/** Liest und prüft die Formulardaten. Liefert entweder die bereinigte Anfrage oder Hinweise je Feld. */
export function parseContactRequest(
  formData: FormData,
): { request: ContactRequest; errors?: undefined } | { request?: undefined; errors: ContactFieldErrors } {
  const request: ContactRequest = {
    name: singleLine(formText(formData, "name")),
    email: singleLine(formText(formData, "email")),
    phone: singleLine(formText(formData, "phone")),
    service: singleLine(formText(formData, "service")) as ContactService,
    date: singleLine(formText(formData, "date")),
    fromZip: singleLine(formText(formData, "fromZip")),
    toZip: singleLine(formText(formData, "toZip")),
    message: multiLine(formText(formData, "message")),
  };

  const errors: ContactFieldErrors = {};

  if (!request.name) errors.name = "Bitte geben Sie Ihren Namen an.";
  else if (request.name.length > contactLimits.name) errors.name = `Bitte höchstens ${contactLimits.name} Zeichen.`;

  if (request.email.length > contactLimits.email || !emailPattern.test(request.email)) {
    errors.email = "Bitte geben Sie eine gültige E-Mail-Adresse an.";
  }

  if (request.phone.length > contactLimits.phone) errors.phone = `Bitte höchstens ${contactLimits.phone} Zeichen.`;

  if (!contactServiceOptions.some((option) => option.value === request.service)) {
    errors.service = "Bitte wählen Sie eine Leistung aus.";
  }

  if (request.date && !isValidDate(request.date)) errors.date = "Bitte wählen Sie ein gültiges Datum.";
  if (request.fromZip && !zipPattern.test(request.fromZip)) errors.fromZip = "Bitte eine 5-stellige PLZ.";
  if (request.toZip && !zipPattern.test(request.toZip)) errors.toZip = "Bitte eine 5-stellige PLZ.";

  if (!request.message) errors.message = "Bitte beschreiben Sie kurz Ihr Vorhaben.";
  else if (request.message.length > contactLimits.message) {
    errors.message = `Bitte kürzen Sie Ihre Nachricht auf höchstens ${contactLimits.message.toLocaleString("de-DE")} Zeichen.`;
  }

  if (formText(formData, "privacy") !== "on") errors.privacy = "Bitte stimmen Sie der Datenschutzerklärung zu.";

  return Object.keys(errors).length > 0 ? { errors } : { request };
}
