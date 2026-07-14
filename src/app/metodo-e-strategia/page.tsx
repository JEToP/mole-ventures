import IlNostroMetodoSection from "@/components/approccio/IlNostroMetodoSection";

export const metadata = {
  title: {
    absolute: "Metodo e Sviluppo Aziendale PMI | Il Nostro Approccio | Mole Venture",
  },
  description:
    "Scopri il nostro metodo. Lavoriamo all'interno dell'ecosistema aziendale per ottimizzare le operazioni e garantire lo sviluppo della tua impresa.",
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
