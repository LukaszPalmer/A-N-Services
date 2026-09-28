import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

/** Impressum und Datenschutz fehlen bewusst – sie sind auf "noindex" gesetzt. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes = [
    { path: "/", priority: 1 },
    { path: "/leistungen", priority: 0.9 },
    ...services.map((service) => ({ path: service.href, priority: 0.9 })),
    { path: "/kontakt", priority: 0.8 },
    { path: "/ueber-uns", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: new URL(path, siteConfig.url).toString(),
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
