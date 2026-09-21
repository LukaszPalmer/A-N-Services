import { CalendarCheck, ClipboardList, MessageSquareText, Truck } from "lucide-react";

import type { ProcessStep } from "@/types";

export const processSteps: ProcessStep[] = [
  {
    title: "Anfrage senden",
    description: "Formular ausfüllen oder anrufen – wir melden uns innerhalb von 24 Stunden.",
    icon: MessageSquareText,
  },
  {
    title: "Kostenlose Besichtigung",
    description: "Vor Ort oder per WhatsApp-Videoanruf erfassen wir Umfang und Besonderheiten.",
    icon: ClipboardList,
  },
  {
    title: "Festpreis-Angebot",
    description: "Sie erhalten ein transparentes Angebot – verbindlich und ohne Kleingedrucktes.",
    icon: CalendarCheck,
  },
  {
    title: "Wir packen das",
    description: "Am Wunschtermin erledigen wir alles – Sie genießen Ihr neues Zuhause.",
    icon: Truck,
  },
];
