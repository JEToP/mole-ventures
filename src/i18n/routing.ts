import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // Lingue supportate. L'italiano è la lingua di default.
  locales: ["it", "en"],
  defaultLocale: "it",

  // "as-needed": la lingua di default (IT) NON ha prefisso negli URL — così le
  // pagine italiane restano agli indirizzi attuali già indicizzati
  // (es. /metodo-e-strategia). L'inglese va sotto /en/... .
  localePrefix: "as-needed",

  // IMPORTANTE (SEO): niente redirect automatico in base alla lingua del browser.
  // Senza questo, Googlebot (che crawla spesso con Accept-Language: en) verrebbe
  // spostato da "/" a "/en", compromettendo l'indicizzazione italiana esistente.
  // Ogni URL serve sempre la propria lingua; si cambia solo dallo switcher.
  localeDetection: false,

  // Slug degli URL tradotti per lingua. La chiave (sinistra) è il nome interno
  // della cartella in app/[locale]/; il valore mappa lo slug pubblico per lingua.
  pathnames: {
    "/": "/",
    "/metodo-e-strategia": {
      it: "/metodo-e-strategia",
      en: "/method-and-strategy",
    },
    "/aree-di-intervento": {
      it: "/aree-di-intervento",
      en: "/areas-of-intervention",
    },
    // "insights" è già una parola inglese ed è la keyword: stesso slug per entrambe.
    "/insights": "/insights",
    "/contatti": {
      it: "/contatti",
      en: "/contact",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
