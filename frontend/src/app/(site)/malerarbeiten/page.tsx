import { ServicePage } from "@/components/templates/service-page";
import { getService } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

const service = getService("malerarbeiten");

export const metadata = createMetadata({
  title: service.title,
  description: service.description,
  path: service.href,
});

export default function MalerarbeitenPage() {
  return <ServicePage service={service} />;
}
