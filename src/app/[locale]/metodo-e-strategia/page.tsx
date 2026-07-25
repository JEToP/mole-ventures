import IlNostroMetodoSection from "@/components/approccio/IlNostroMetodoSection";
import { OG_IMAGE } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "method", pathname: "/metodo-e-strategia" });
}

export default function Approccio() {
  const t = useTranslations("Method");
  return (
    <>
      {/* H1 SEO (nascosto visivamente, presente nel DOM per i motori di ricerca) */}
      <h1 className="sr-only">{t("seoH1")}</h1>
      <IlNostroMetodoSection />
    </>
  );
}
