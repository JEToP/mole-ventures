import { Metadata } from 'next';
import { OG_IMAGE } from "@/lib/seo";
import { buildPageMetadata } from "@/lib/seo";
import type { Locale } from "@/i18n/routing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  return buildPageMetadata({ locale, page: "areas", pathname: "/aree-di-intervento" });
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
