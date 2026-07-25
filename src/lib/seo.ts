// Immagine di anteprima condivisa per Open Graph (LinkedIn, WhatsApp, Slack...).
// Nota: Next.js NON fa merge profondo dell'oggetto `openGraph` tra layout e
// pagina — ogni pagina che definisce `openGraph` lo sovrascrive per intero.
// Per questo ogni pagina deve includere esplicitamente `images: [OG_IMAGE]`.
export const OG_IMAGE = {
  url: "/images/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Mole Venture",
};

const SITE_URL = "https://moleventure.com";

// Dati strutturati (JSON-LD, schema.org): aiutano Google a riconoscere
// Mole Venture come entità/brand, non solo come pagina web. Invisibili
// all'utente, nessun impatto sul rendering del sito.
export const ORGANIZATION_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Mole Venture",
  url: SITE_URL,
  logo: `${SITE_URL}/images/team/vcard/logo-avatar.jpg`,
  email: "info@moleventure.com",
  sameAs: ["https://www.linkedin.com/company/mole-venture/"],
};

export const WEBSITE_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Mole Venture",
  url: SITE_URL,
};

// ── Metadata per pagina e per lingua ─────────────────────────────────────────
// Genera title/description tradotti + canonical della lingua corrente + i tag
// hreflang che collegano la versione IT a quella EN (e viceversa): è ciò che
// evita che Google legga le due lingue come contenuto duplicato.
import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { routing, type Locale, type AppPathname } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";

const OG_LOCALE: Record<Locale, string> = {
  it: "it_IT",
  en: "en_US",
};

export async function buildPageMetadata({
  locale,
  page,
  pathname,
}: {
  locale: Locale;
  /** chiave dentro il namespace "Metadata" dei file messages */
  page: "home" | "method" | "areas" | "insights" | "contact";
  pathname: AppPathname;
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `Metadata.${page}` });
  const title = t("title");
  const description = t("description");

  const canonical = getPathname({ locale, href: pathname });
  const languages: Record<string, string> = Object.fromEntries(
    routing.locales.map((l) => [l, getPathname({ locale: l, href: pathname })])
  );
  // x-default: versione da servire a chi non corrisponde a nessuna lingua
  // dichiarata. Puntiamo alla lingua di default (italiano).
  languages["x-default"] = getPathname({
    locale: routing.defaultLocale,
    href: pathname,
  });

  // Dichiara all'Open Graph che esiste anche l'altra lingua.
  const alternateLocale = routing.locales
    .filter((l) => l !== locale)
    .map((l) => OG_LOCALE[l]);

  return {
    title: { absolute: title },
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Mole Venture",
      locale: OG_LOCALE[locale],
      alternateLocale,
      type: "website",
      images: [OG_IMAGE],
    },
  };
}
