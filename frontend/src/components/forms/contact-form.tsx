"use client";

import { ArrowRight, CheckCircle2, ChevronDown, CircleAlert, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/form-field";
import { siteConfig } from "@/config/site";
import { services } from "@/content/services";
import { parseContactForm, sendContactRequest } from "@/lib/api/contact";
import { cn } from "@/lib/utils";

type FormState = {
  status: "idle" | "success" | "error";
  message: string;
};

const initialState: FormState = { status: "idle", message: "" };

async function submitContactForm(_previous: FormState, formData: FormData): Promise<FormState> {
  try {
    await sendContactRequest(parseContactForm(formData));
    return {
      status: "success",
      message: "Vielen Dank für Ihre Anfrage! Wir melden uns innerhalb von 24 Stunden bei Ihnen.",
    };
  } catch {
    return {
      status: "error",
      message: `Die Anfrage konnte leider nicht gesendet werden. Bitte rufen Sie uns an: ${siteConfig.contact.phone}`,
    };
  }
}

export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);

  return (
    <form action={formAction} className="grid gap-5 sm:grid-cols-2">
      <Field label="Name" htmlFor="contact-name" required>
        <Input id="contact-name" name="name" autoComplete="name" required placeholder="Max Mustermann" />
      </Field>

      <Field label="E-Mail" htmlFor="contact-email" required>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="max@beispiel.de"
        />
      </Field>

      <Field label="Telefon" htmlFor="contact-phone">
        <Input id="contact-phone" name="phone" type="tel" autoComplete="tel" placeholder="0123 456789" />
      </Field>

      <Field label="Leistung" htmlFor="contact-service" required>
        <div className="relative">
          <Select id="contact-service" name="service" required defaultValue="">
            <option value="" disabled>
              Bitte wählen
            </option>
            {services.map((service) => (
              <option key={service.slug} value={service.slug}>
                {service.title}
              </option>
            ))}
            <option value="kombination">Kombination mehrerer Leistungen</option>
            <option value="sonstiges">Sonstiges</option>
          </Select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-400"
            aria-hidden
          />
        </div>
      </Field>

      <Field label="Wunschtermin" htmlFor="contact-date">
        <Input id="contact-date" name="date" type="date" />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Von (PLZ)" htmlFor="contact-from">
          <Input id="contact-from" name="fromZip" inputMode="numeric" maxLength={5} placeholder="12345" />
        </Field>
        <Field label="Nach (PLZ)" htmlFor="contact-to">
          <Input id="contact-to" name="toZip" inputMode="numeric" maxLength={5} placeholder="54321" />
        </Field>
      </div>

      <Field label="Ihre Nachricht" htmlFor="contact-message" required className="sm:col-span-2">
        <Textarea
          id="contact-message"
          name="message"
          required
          placeholder="Erzählen Sie uns kurz von Ihrem Vorhaben: Wohnungsgröße, Etage, Aufzug, besondere Gegenstände …"
        />
      </Field>

      <label className="flex items-start gap-3 text-sm text-ink-600 sm:col-span-2">
        <input
          type="checkbox"
          name="privacy"
          required
          className="mt-0.5 size-5 shrink-0 rounded-md accent-brand-500"
        />
        <span>
          Ich habe die{" "}
          <Link href="/datenschutz" className="font-medium text-ink-950 underline underline-offset-4 hover:text-brand-600">
            Datenschutzerklärung
          </Link>{" "}
          gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage einverstanden. *
        </span>
      </label>

      <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink-500">* Pflichtfelder</p>
        <SubmitButton />
      </div>

      <div aria-live="polite" className="sm:col-span-2">
        {state.status !== "idle" && (
          <p
            role="status"
            className={cn(
              "flex items-start gap-3 rounded-2xl p-4 text-sm font-medium",
              state.status === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800",
            )}
          >
            {state.status === "success" ? (
              <CheckCircle2 className="size-5 shrink-0" aria-hidden />
            ) : (
              <CircleAlert className="size-5 shrink-0" aria-hidden />
            )}
            {state.message}
          </p>
        )}
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <>
          <LoaderCircle className="animate-spin" aria-hidden />
          Wird gesendet …
        </>
      ) : (
        <>
          Anfrage absenden
          <ArrowRight className="transition-transform group-hover/button:translate-x-1" aria-hidden />
        </>
      )}
    </Button>
  );
}
