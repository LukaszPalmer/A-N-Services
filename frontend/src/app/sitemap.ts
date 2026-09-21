import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "/",
    "/leistungen",
    ...services.map((service) => service.href),
    "/ueber-uns",
    "/kontakt",
  ];

  return routes.map((route) => ({
    url: new URL(route, siteConfig.url).toString(),
    changeFrequency: "monthly",
    priority: route === "/" ? 1 : 0.8,
  }));
}
