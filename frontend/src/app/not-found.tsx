import { ArrowLeft, Phone } from "lucide-react";

import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { ButtonLink, buttonStyles } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { RevealText } from "@/components/ui/reveal-text";
import { VideoBackground } from "@/components/ui/video-background";
import { siteConfig } from "@/config/site";
import { videos } from "@/content/videos";

// Liegt außerhalb der Route Group "(site)", daher Header/Footer hier direkt einbinden.
export default function NotFound() {
  return (
    <>
      <Header />
      <main className="flex-1 px-2 pt-2 sm:px-3 sm:pt-3">
        <section className="relative isolate flex min-h-[calc(100svh-1rem)] items-center overflow-hidden rounded-4xl bg-ink-950 sm:rounded-5xl">
          <VideoBackground video={videos.umzugskartons} preload />
          <div aria-hidden className="absolute inset-0 -z-10 bg-ink-950/70" />
          <div aria-hidden className="absolute inset-0 -z-10 bg-grain opacity-[0.06]" />

          <Container size="narrow" className="relative py-32 text-center">
            <p className="text-outline text-[9rem] leading-none font-semibold tracking-[-0.06em] text-brand-400 sm:text-[13rem]">
              404
            </p>
            <h1 className="mt-4 text-3xl leading-tight font-semibold tracking-[-0.035em] text-white sm:text-5xl">
              <RevealText text="Diese Seite ist wohl" accent="schon umgezogen." delay={100} />
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-lg text-white/70">
              Die gesuchte Seite existiert nicht (mehr). Kein Problem – wir bringen Sie zurück.
            </p>
            <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
              <ButtonLink href="/" size="lg">
                <ArrowLeft aria-hidden />
                Zur Startseite
              </ButtonLink>
              <a href={siteConfig.contact.phoneHref} className={buttonStyles({ variant: "glass", size: "lg" })}>
                <Phone aria-hidden />
                {siteConfig.contact.phone}
              </a>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
