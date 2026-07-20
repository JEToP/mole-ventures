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
