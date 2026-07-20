import { Metadata } from 'next';
import { OG_IMAGE } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: "Aree di intervento per lo sviluppo d'impresa | Mole Venture",
  },
  description:
    "Scopri le aree di intervento su cui lavoriamo per attuare il piano di sviluppo della tua impresa.",
  alternates: {
    canonical: "/aree-di-intervento",
  },
  openGraph: {
    title: "Aree di intervento per lo sviluppo d'impresa | Mole Venture",
    description:
      "Scopri le aree di intervento su cui lavoriamo per attuare il piano di sviluppo della tua impresa.",
    url: "/aree-di-intervento",
    siteName: "Mole Venture",
    locale: "it_IT",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
