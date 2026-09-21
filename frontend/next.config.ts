import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Typsichere Links: <Link href="/tippfehler"> wird zum TypeScript-Fehler
  typedRoutes: true,
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
