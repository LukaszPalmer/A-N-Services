import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * Suchmaschinen und KI-Suchdienste dürfen alles lesen.
 * Die KI-Crawler sind ausdrücklich aufgeführt: Wer in Antworten von Google (KI-Übersichten),
 * ChatGPT, Perplexity, Claude oder Copilot als Empfehlung auftauchen will, muss für deren
 * Crawler erreichbar sein.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      {
        userAgent: [
          "Googlebot",
          "Google-Extended",
          "Bingbot",
          "GPTBot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "ClaudeBot",
          "Claude-SearchBot",
          "Claude-User",
          "PerplexityBot",
          "Perplexity-User",
          "Applebot",
          "Applebot-Extended",
        ],
        allow: "/",
      },
    ],
    sitemap: new URL("/sitemap.xml", siteConfig.url).toString(),
  };
}
