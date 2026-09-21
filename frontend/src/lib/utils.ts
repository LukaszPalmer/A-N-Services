import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Kombiniert Tailwind-Klassen und löst Konflikte auf (z. B. `px-4` vs. `px-6`). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
