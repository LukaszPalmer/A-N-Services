import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { Hero } from "@/components/sections/hero";
import { MovingStory } from "@/components/sections/moving-story/moving-story";
import { OnlineViewing } from "@/components/sections/online-viewing";
import { ProcessSteps } from "@/components/sections/process-steps";
import { Reviews } from "@/components/sections/reviews";
import { ServicesGrid } from "@/components/sections/services-grid";
import { StatsBar } from "@/components/sections/stats-bar";
import { WhyUs } from "@/components/sections/why-us";
import { generalFaq } from "@/content/faq";

export default function HomePage() {
  return (
    <>
      <Hero />
      <StatsBar />
      <ServicesGrid />
      <WhyUs />
      <ProcessSteps />
      <OnlineViewing />
      <Reviews />
      <Faq items={generalFaq} />
      <MovingStory />
      <CtaBanner />
    </>
  );
}
