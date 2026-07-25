import type { MetadataRoute } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

// Dominio canonico REALE: www.moleventure.com redirige (301) a moleventure.com,
// quindi il canonico servito è senza www. La sitemap deve elencare gli URL finali.
const BASE_URL = "https://moleventure.com";

// Genera /sitemap.xml con TUTTE le pagine in TUTTE le lingue.
// Ogni voce include le annotazioni hreflang (alternates.languages): così Google
// capisce che IT ed EN sono la stessa pagina in lingue diverse e non le tratta
// come contenuto duplicato.
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const pages: { path: AppPathname; priority: number }[] = [
    { path: "/", priority: 1 },
    { path: "/metodo-e-strategia", priority: 0.8 },
    { path: "/aree-di-intervento", priority: 0.8 },
    { path: "/insights", priority: 0.7 },
    { path: "/contatti", priority: 0.7 },
  ];

  const absolute = (locale: (typeof routing.locales)[number], path: AppPathname) =>
    `${BASE_URL}${getPathname({ locale, href: path })}`.replace(/\/$/, "") || BASE_URL;

  return pages.flatMap(({ path, priority }) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, absolute(locale, path)])
    );

    return routing.locales.map((locale) => ({
      url: absolute(locale, path),
      lastModified,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages },
    }));
  });
}
