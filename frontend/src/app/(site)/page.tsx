import { BrandTicker } from "@/components/sections/brand-ticker";
import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { MovingStory } from "@/components/sections/moving-story/moving-story";
import { OnlineViewing } from "@/components/sections/online-viewing";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Reviews } from "@/components/sections/reviews";
import { ServiceArea } from "@/components/sections/service-area";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsBar } from "@/components/sections/stats-bar";
import { WhyUs } from "@/components/sections/why-us";
import { siteConfig } from "@/config/site";
import { generalFaq } from "@/content/faq";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: `Umzugsunternehmen Moers – Umzug, Montage & Entrümpelung | ${siteConfig.name}`,
  description: `${siteConfig.name} – Ihr Umzugsunternehmen in Moers: Umzüge, Möbelmontage, Entrümpelung, Bodenverlegung, Malerarbeiten & Gartenpflege. Festpreis, versichert, 24/7 erreichbar.`,
  path: "/",
  absoluteTitle: true,
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <BrandTicker />
      <ServicesGrid />
      <WhyUs />
      <ProcessSteps />
      <OnlineViewing />
      <Reviews />
      <Faq items={generalFaq} />
      <ServiceArea />
      <MovingStory />
      <CtaBanner />
    </>
  );
}
