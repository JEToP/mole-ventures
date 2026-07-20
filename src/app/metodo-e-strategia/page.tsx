import IlNostroMetodoSection from "@/components/approccio/IlNostroMetodoSection";
import { OG_IMAGE } from "@/lib/seo";

export const metadata = {
  title: {
    absolute: "Metodo e Sviluppo Aziendale PMI | Il Nostro Approccio | Mole Venture",
  },
  description:
    "Scopri il nostro metodo. Lavoriamo all'interno dell'ecosistema aziendale per ottimizzare le operazioni e garantire lo sviluppo della tua impresa.",
  alternates: {
    canonical: "/metodo-e-strategia",
  },
  openGraph: {
    title: "Metodo e Sviluppo Aziendale PMI | Il Nostro Approccio | Mole Venture",
    description:
      "Scopri il nostro metodo. Lavoriamo all'interno dell'ecosistema aziendale per ottimizzare le operazioni e garantire lo sviluppo della tua impresa.",
    url: "/metodo-e-strategia",
    siteName: "Mole Venture",
    locale: "it_IT",
    type: "website",
    images: [OG_IMAGE],
  },
};

export default function Approccio() {
  return (
    <>
      {/* H1 SEO (nascosto visivamente, presente nel DOM per i motori di ricerca) */}
      <h1 className="sr-only">Il nostro approccio allo sviluppo aziendale</h1>
      <IlNostroMetodoSection />
    </>
  );
}
