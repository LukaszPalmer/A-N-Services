import { ServicePage } from "@/components/templates/service-page";
import { getService } from "@/content/services";
import { createMetadata } from "@/lib/metadata";

const service = getService("entruempelung");

export const metadata = createMetadata({
  title: service.seoTitle,
  description: service.seoDescription,
  path: service.href,
  ogImage: service.slug,
});

export default function EntruempelungPage() {
  return <ServicePage service={service} />;
}
