import { ArrowLeft } from "lucide-react";

import { SpeedLines } from "@/components/brand/speed-lines";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

// Liegt außerhalb der Route Group "(site)", daher Header/Footer hier direkt einbinden.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex flex-1 items-center py-24 sm:py-32">
        <Container size="narrow" className="text-center">
          <SpeedLines className="mx-auto w-16 text-brand-500" />
          <p className="mt-6 text-7xl font-semibold tracking-tight text-ink-950 sm:text-8xl">404</p>
          <h1 className="mt-4 text-2xl font-semibold text-ink-950 sm:text-3xl">
            Diese Seite ist wohl schon umgezogen.
          </h1>
          <p className="mt-4 text-lg text-ink-600">
            Die gesuchte Seite existiert nicht (mehr). Kein Problem – wir bringen Sie zurück.
          </p>
          <ButtonLink href="/" size="lg" className="mt-10">
            <ArrowLeft aria-hidden />
            Zur Startseite
          </ButtonLink>
        </Container>
      </main>
      <Footer />
    </>
  );
}
