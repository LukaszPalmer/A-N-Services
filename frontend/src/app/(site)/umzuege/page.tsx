import { ServicePage } from "@/components/templates/service-page";
import { getService } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

const service = getService("umzuege");

export const metadata = createMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: service.href,
  ogImage: service.slug,
});

export default function UmzuegePage() {
  return <ServicePage service={service} />;
}
