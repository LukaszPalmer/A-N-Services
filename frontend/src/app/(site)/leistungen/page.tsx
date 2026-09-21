import { CtaBanner } from "@/components/sections/cta-banner";
import { Faq } from "@/components/sections/faq";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessSteps } from "@/components/sections/process-steps";
import { ServiceShowcase } from "@/components/sections/service-showcase";
import { siteConfig } from "@/config/site";
import { generalFaq } from "@/content/faq";
import { images } from "@/content/images";
import { services } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Leistungen",
  description: `Umzüge, Montage, Entrümpelung, Bodenverlegung, Malerarbeiten und Gartenpflege – alle Leistungen von ${siteConfig.name} im Überblick.`,
  path: "/leistungen",
});

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        eyebrow="Leistungen"
        breadcrumb="Leistungen"
        image={images.einzug}
        title={
          <>
            Alles für Ihren Neustart – <span className="text-brand-400">von einem Team.</span>
          </>
        }
        description="Wir kombinieren Umzug, Montage und Entrümpelung so, dass Sie nur einen Ansprechpartner und einen Termin brauchen."
      />
      <ServiceShowcase services={services} />
      <ProcessSteps tone="sand" />
      <Faq items={generalFaq} />
      <CtaBanner
        title="Welche Leistung passt zu Ihnen?"
        description="Wir beraten Sie gern persönlich und stellen Ihnen ein Paket zusammen, das genau zu Ihrem Vorhaben passt."
      />
    </>
  );
}
