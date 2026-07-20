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
