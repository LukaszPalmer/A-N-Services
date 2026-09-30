import type { ComponentProps, ReactNode } from "react";

import { cn } from "@/lib/utils";

const controlStyles = cn(
  "w-full rounded-2xl border border-ink-900/10 bg-white px-4 text-ink-950 shadow-xs transition",
  "placeholder:text-ink-400 hover:border-ink-900/20",
  "focus:border-brand-500 focus:ring-4 focus:ring-brand-500/15 focus:outline-none",
  "aria-invalid:border-red-400 aria-invalid:focus:border-red-500 aria-invalid:focus:ring-red-500/15",
);

type FieldProps = {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  /** Fehlermeldung – das Eingabefeld verweist per `aria-describedby` auf `${htmlFor}-error` */
  error?: string;
  className?: string;
  children: ReactNode;
};

/** Label + Eingabefeld + optionaler Hinweis bzw. Fehlermeldung */
export function Field({ label, htmlFor, required, hint, error, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={htmlFor} className="text-sm font-medium text-ink-800">
        {label}
        {required && <span className="text-brand-600"> *</span>}
      </label>
      {children}
      {error ? (
        <p id={`${htmlFor}-error`} className="text-sm font-medium text-red-700">
          {error}
        </p>
      ) : (
        hint && <p className="text-xs text-ink-500">{hint}</p>
      )}
    </div>
  );
}

/** Props, die ein Eingabefeld als fehlerhaft markieren und mit der Meldung aus `Field` verknüpfen */
export function errorProps(id: string, error?: string) {
  return error ? { "aria-invalid": true, "aria-describedby": `${id}-error` } : {};
}

export function Input({ className, ...props }: ComponentProps<"input">) {
  return <input className={cn(controlStyles, "h-12", className)} {...props} />;
}

export function Textarea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea className={cn(controlStyles, "min-h-36 resize-y py-3", className)} {...props} />;
}

export function Select({ className, ...props }: ComponentProps<"select">) {
  return <select className={cn(controlStyles, "h-12 appearance-none pr-10", className)} {...props} />;
}
