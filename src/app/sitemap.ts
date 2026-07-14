import type { MetadataRoute } from "next";

// Dominio canonico (vedi redirect in next.config.ts: *.moleventure.it → www.moleventure.com)
const BASE_URL = "https://www.moleventure.com";

// Genera /sitemap.xml con le pagine principali del sito, così i motori di
// ricerca le scoprono e indicizzano correttamente (intervento tecnico richiesto).
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const routes: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/metodo-e-strategia", priority: 0.8 },
    { path: "/aree-di-intervento", priority: 0.8 },
    { path: "/insights", priority: 0.7 },
    { path: "/contatti", priority: 0.7 },
  ];

  return routes.map(({ path, priority }) => ({
    url: `${BASE_URL}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
