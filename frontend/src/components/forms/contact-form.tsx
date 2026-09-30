"use client";

import { ArrowRight, CheckCircle2, ChevronDown, CircleAlert, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";
import { errorProps, Field, Input, Select, Textarea } from "@/components/ui/form-field";
import { submitContactForm } from "@/lib/contact/actions";
import { contactLimits, contactServiceOptions, HONEYPOT_FIELD, type ContactFormState } from "@/lib/contact/request";
import { cn } from "@/lib/utils";

const initialState: ContactFormState = { status: "idle", message: "" };

/**
 * Kontaktformular. Abgeschickt wird per Server Action (lib/contact/actions.ts): Die Anfrage
 * landet als E-Mail im IONOS-Postfach. Weil die Action direkt am <form> hängt, funktioniert
 * das Absenden auch, bevor das JavaScript der Seite geladen ist.
 */
export function ContactForm() {
  const [state, formAction] = useActionState(submitContactForm, initialState);
  const { errors = {}, values = {} } = state;
  const formRef = useRef<HTMLFormElement>(null);

  // Nach einer Fehlermeldung direkt ins erste markierte Feld springen
  useEffect(() => {
    if (state.errors) formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']")?.focus();
  }, [state]);

  return (
    <form ref={formRef} action={formAction} className="relative grid gap-5 sm:grid-cols-2">
      <Field label="Name" htmlFor="contact-name" required error={errors.name}>
        <Input
          id="contact-name"
          name="name"
          autoComplete="name"
          required
          maxLength={contactLimits.name}
          defaultValue={values.name ?? ""}
          placeholder="Max Mustermann"
          {...errorProps("contact-name", errors.name)}
        />
      </Field>

      <Field label="E-Mail" htmlFor="contact-email" required error={errors.email}>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={contactLimits.email}
          defaultValue={values.email ?? ""}
          placeholder="max@beispiel.de"
          {...errorProps("contact-email", errors.email)}
        />
      </Field>

      <Field label="Telefon" htmlFor="contact-phone" error={errors.phone}>
        <Input
          id="contact-phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          maxLength={contactLimits.phone}
          defaultValue={values.phone ?? ""}
          placeholder="0123 456789"
          {...errorProps("contact-phone", errors.phone)}
        />
      </Field>

      <Field label="Leistung" htmlFor="contact-service" required error={errors.service}>
        <div className="relative">
          {/* `key`: React übernimmt ein neues defaultValue bei <select> nicht – so wird die Auswahl
              nach einer Fehlermeldung neu aufgebaut und bleibt erhalten */}
          <Select
            key={values.service ?? ""}
            id="contact-service"
            name="service"
            required
            defaultValue={values.service ?? ""}
            {...errorProps("contact-service", errors.service)}
          >
            <option value="" disabled>
              Bitte wählen
            </option>
            {contactServiceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
          <ChevronDown
            className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink-400"
            aria-hidden
          />
        </div>
      </Field>

      <Field label="Wunschtermin" htmlFor="contact-date" error={errors.date}>
        <Input
          id="contact-date"
          name="date"
          type="date"
          defaultValue={values.date ?? ""}
          {...errorProps("contact-date", errors.date)}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Von (PLZ)" htmlFor="contact-from" error={errors.fromZip}>
          <Input
            id="contact-from"
            name="fromZip"
            inputMode="numeric"
            maxLength={5}
            pattern="[0-9]{5}"
            title="5-stellige Postleitzahl"
            defaultValue={values.fromZip ?? ""}
            placeholder="12345"
            {...errorProps("contact-from", errors.fromZip)}
          />
        </Field>
        <Field label="Nach (PLZ)" htmlFor="contact-to" error={errors.toZip}>
          <Input
            id="contact-to"
            name="toZip"
            inputMode="numeric"
            maxLength={5}
            pattern="[0-9]{5}"
            title="5-stellige Postleitzahl"
            defaultValue={values.toZip ?? ""}
            placeholder="54321"
            {...errorProps("contact-to", errors.toZip)}
          />
        </Field>
      </div>

      <Field label="Ihre Nachricht" htmlFor="contact-message" required error={errors.message} className="sm:col-span-2">
        <Textarea
          id="contact-message"
          name="message"
          required
          maxLength={contactLimits.message}
          defaultValue={values.message ?? ""}
          placeholder="Erzählen Sie uns kurz von Ihrem Vorhaben: Wohnungsgröße, Etage, Aufzug, besondere Gegenstände …"
          {...errorProps("contact-message", errors.message)}
        />
      </Field>

      {/* Spam-Falle: für Menschen unsichtbar und per Tab nicht erreichbar – Bots füllen das Feld aus */}
      <div aria-hidden className="absolute -left-[9999px] size-px overflow-hidden">
        <label htmlFor="contact-reference">Bitte dieses Feld leer lassen</label>
        <input id="contact-reference" name={HONEYPOT_FIELD} type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-ink-600">
          <input
            id="contact-privacy"
            type="checkbox"
            name="privacy"
            required
            defaultChecked={values.privacy === "on"}
            className="mt-0.5 size-5 shrink-0 rounded-md accent-brand-500"
            {...errorProps("contact-privacy", errors.privacy)}
          />
          <span>
            Ich habe die{" "}
            <Link href="/datenschutz" className="font-medium text-ink-950 underline underline-offset-4 hover:text-brand-600">
              Datenschutzerklärung
            </Link>{" "}
            gelesen und bin mit der Verarbeitung meiner Daten zur Bearbeitung der Anfrage einverstanden. *
          </span>
        </label>
        {errors.privacy && (
          <p id="contact-privacy-error" className="mt-2 pl-8 text-sm font-medium text-red-700">
            {errors.privacy}
          </p>
        )}
      </div>

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
