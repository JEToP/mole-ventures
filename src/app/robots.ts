import type { MetadataRoute } from "next";

// Genera /robots.txt: consente la scansione di tutto il sito e indica ai motori
// di ricerca dove trovare la sitemap.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Le vCard sono file di download per i QR code dei founder, non pagine
      // di contenuto: escluse dalla scansione per non interferire con la SEO.
      disallow: ["/vcard/"],
    },
    sitemap: "https://moleventure.com/sitemap.xml",
    host: "https://moleventure.com",
  };
}
