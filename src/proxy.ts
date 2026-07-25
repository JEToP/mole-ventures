import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Applica il proxy i18n a tutte le route TRANNE:
  //  - /api e /vcard          → route handler (contatti, download vCard)
  //  - /_next, /_vercel       → interni Next
  //  - qualsiasi file con "."  → robots.txt, sitemap.xml, favicon, immagini,
  //                              file di verifica Google, ecc.
  matcher: ["/((?!api|vcard|_next|_vercel|.*\\..*).*)"],
};
