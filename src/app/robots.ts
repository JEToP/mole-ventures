import type { MetadataRoute } from "next";

// Genera /robots.txt: consente la scansione di tutto il sito e indica ai motori
// di ricerca dove trovare la sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://moleventure.com/sitemap.xml",
    host: "https://moleventure.com",
  };
}
