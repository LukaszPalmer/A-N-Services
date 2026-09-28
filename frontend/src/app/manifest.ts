import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/** Web-App-Manifest: Name, Farben und Icon, wenn die Seite auf dem Homescreen landet. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${siteConfig.name} – ${siteConfig.primaryKeyword}`,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a1320",
    theme_color: "#0a1320",
    lang: "de",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
