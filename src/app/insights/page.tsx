import Image from "next/image";
import { OG_IMAGE } from "@/lib/seo";

export const metadata = {
  title: { absolute: "Insights sul nostro metodo | Mole Venture" },
  description:
    "Scopri una selezione di articoli, studi e insights sul Entrepreneurship Through Acquisition",
  alternates: {
    canonical: "/insights",
  },
  openGraph: {
    title: "Insights sul nostro metodo | Mole Venture",
    description:
      "Scopri una selezione di articoli, studi e insights sul Entrepreneurship Through Acquisition",
    url: "/insights",
    siteName: "Mole Venture",
    locale: "it_IT",
    type: "website",
    images: [OG_IMAGE],
  },
};

// Rassegna stampa: ogni voce è la testata che ha pubblicato + il ritaglio
// dell'articolo corrispondente, nell'ordine del design Figma (alto → basso).
type PressItem = {
  testata: string;
  titolo: string;
  logo: { src: string; width: number; height: number };
  articolo: { src: string; width: number; height: number };
};

const PRESS: PressItem[] = [
  {
    testata: "Corriere Torino",
    titolo: "Senza successore un'azienda su 3: Fondazione Crt lancia il «searcher»",
    logo: { src: "/images/insight/corriere_torino_cover 1.png", width: 495, height: 124 },
    articolo: { src: "/images/insight/art-corriere.png", width: 1015, height: 253 },
  },
  {
    testata: "Yale School of Management",
    titolo: "How are Search Fund Investors Really Faring?",
    logo: { src: "/images/insight/logo-yale.png", width: 235, height: 282 },
    articolo: { src: "/images/insight/corpo2.png", width: 1051, height: 217 },
  },
  {
    testata: "Fondo Italiano d'Investimento",
    titolo: "Fondo Italiano d'Investimento: il primo closing di FITEC II supera i 137 milioni di euro",
    logo: { src: "/images/insight/Fondo-italiano-dinvestimento 1.png", width: 335, height: 153 },
    articolo: { src: "/images/insight/art-fondoitaliano.png", width: 1062, height: 319 },
  },
  {
    testata: "La Stampa",
    titolo:
      "Palazzo Perrone investe nei Search Fund — Imprese senza eredi: Fondazione Crt lancia i manager-investitori",
    logo: { src: "/images/insight/La_Stampa.svg 1.png", width: 449, height: 55 },
    articolo: { src: "/images/insight/art-lastampa.png", width: 738, height: 375 },
  },
  {
    testata: "Il Sole 24 Ore",
    titolo: "Search Fund, la nuova via all'imprenditorialità",
    logo: { src: "/images/insight/logo-ilsole.png", width: 427, height: 103 },
    articolo: { src: "/images/insight/art-ilsole.png", width: 885, height: 202 },
  },
  {
    testata: "Simest",
    titolo: "Plafond Crescita da 100 milioni dedicato alle PMI e alle imprese a media capitalizzazione",
    logo: { src: "/images/insight/SIMEST_LOGO_2020 1.png", width: 269, height: 120 },
    articolo: { src: "/images/insight/art-simest.png", width: 1024, height: 198 },
  },
  {
    testata: "Milano Finanza",
    titolo:
      "Il fondo da 1,5 miliardi che può rivoluzionare le pmi italiane quotate: cinque gestori a confronto",
    logo: { src: "/images/insight/MF_Milano_Finanza_logo.svg 1.png", width: 292, height: 95 },
    articolo: { src: "/images/insight/art-milanofinanza.png", width: 1375, height: 174 },
  },
  {
    testata: "Stanford Graduate School of Business",
    titolo:
      "Search Fund Study",
    logo: { src: "/images/insight/stanfordLogo.png", width: 292, height: 95 },
    articolo: { src: "/images/insight/stanfordCorpo.png", width: 1375, height: 174 },
  },
];

export default function InsightsPage() {
  return (
    <main className="relative w-full bg-white pt-28 pb-16 md:pt-44 md:pb-24">
      {/* H1 SEO (nascosto visivamente, presente nel DOM per i motori di ricerca) */}
      <h1 className="sr-only">Insights sul nostro metodo</h1>
      <div className="mx-auto w-full max-w-7xl px-6 md:px-12">
        {/* MOBILE LAYOUT: Elenco testata + articolo */}
        <div className="flex flex-col gap-4 md:hidden">
          {PRESS.map((item) => (
            <article
              key={item.testata}
              className="flex flex-col gap-4 py-6 border-b border-gray-100 last:border-0"
            >
              {/* Logo testata */}
              <div className="flex h-12 w-40 shrink-0 items-center">
                <Image
                  src={item.logo.src}
                  alt={item.testata}
                  width={item.logo.width}
                  height={item.logo.height}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              </div>

              {/* Ritaglio dell'articolo */}
              <div className="min-w-0 flex-1">
                <Image
                  src={item.articolo.src}
                  alt={`${item.testata}: ${item.titolo}`}
                  width={item.articolo.width}
                  height={item.articolo.height}
                  className="h-auto w-full rounded-lg object-contain ring-1 ring-gray-200"
                  sizes="(max-width: 768px) 90vw, 640px"
                />
              </div>
            </article>
          ))}
        </div>

        {/* DESKTOP LAYOUT: Custom Collage come da immagine */}
        <div className="hidden md:flex flex-col gap-16 w-full">
          {/* Row 1: Corriere */}
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="w-[70%]">
              <Image src={PRESS[0].articolo.src} width={PRESS[0].articolo.width} height={PRESS[0].articolo.height} alt={PRESS[0].testata} className="w-full h-auto object-contain" />
            </div>
            <div className="w-[25%]">
              <Image src={PRESS[0].logo.src} width={PRESS[0].logo.width} height={PRESS[0].logo.height} alt={`${PRESS[0].testata} logo`} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Row 2: Yale */}
          <div className="flex flex-row items-center justify-start gap-8">
            <div className="w-[12%]">
              <Image src={PRESS[1].logo.src} width={PRESS[1].logo.width} height={PRESS[1].logo.height} alt={PRESS[1].testata} className="w-full h-auto object-contain" />
            </div>
            <div className="w-[85%]">
              <Image src={PRESS[1].articolo.src} width={PRESS[1].articolo.width} height={PRESS[1].articolo.height} alt={`${PRESS[1].testata} article`} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Row 3: Fondo Italiano */}
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="w-[65%]">
              <Image src={PRESS[2].articolo.src} width={PRESS[2].articolo.width} height={PRESS[2].articolo.height} alt={PRESS[2].testata} className="w-full h-auto object-contain" />
            </div>
            <div className="w-[30%]">
              <Image src={PRESS[2].logo.src} width={PRESS[2].logo.width} height={PRESS[2].logo.height} alt={`${PRESS[2].testata} logo`} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Row 4: La Stampa */}
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="w-[40%]">
              <Image src={PRESS[3].logo.src} width={PRESS[3].logo.width} height={PRESS[3].logo.height} alt={PRESS[3].testata} className="w-full h-auto object-contain" />
            </div>
            <div className="w-[55%]">
              <Image src={PRESS[3].articolo.src} width={PRESS[3].articolo.width} height={PRESS[3].articolo.height} alt={`${PRESS[3].testata} article`} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Row 5: Il Sole */}
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="w-[65%]">
              <Image src={PRESS[4].articolo.src} width={PRESS[4].articolo.width} height={PRESS[4].articolo.height} alt={PRESS[4].testata} className="w-full h-auto object-contain" />
            </div>
            <div className="w-[25%]">
              <Image src={PRESS[4].logo.src} width={PRESS[4].logo.width} height={PRESS[4].logo.height} alt={`${PRESS[4].testata} logo`} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* Row 6: Simest */}
          <div className="flex flex-row items-center justify-between gap-6">
            <div className="w-[25%]">
              <Image src={PRESS[5].logo.src} width={PRESS[5].logo.width} height={PRESS[5].logo.height} alt={PRESS[5].testata} className="w-full h-auto object-contain" />
            </div>
            <div className="w-[70%]">
              <Image src={PRESS[5].articolo.src} width={PRESS[5].articolo.width} height={PRESS[5].articolo.height} alt={`${PRESS[5].testata} article`} className="w-full h-auto object-contain" />
            </div>
          </div>

          {/* MF & Stanford Group */}
          <div className="flex flex-col w-full">
            {/* Row 7: Milano Finanza Article */}
            <div className="w-full relative z-20">
              <Image src={PRESS[6].articolo.src} width={PRESS[6].articolo.width} height={PRESS[6].articolo.height} alt={`${PRESS[6].testata} article`} className="w-full h-auto object-contain" />
            </div>

            {/* Row 8: Milano Finanza Logo & Stanford Logo */}
            <div className="relative z-10 flex flex-row items-start justify-between gap-6 pt-2">
              <div className="w-[40%]">
                <Image src={PRESS[6].logo.src} width={PRESS[6].logo.width} height={PRESS[6].logo.height} alt={PRESS[6].testata} className="w-[60%] h-auto object-contain" />
              </div>
              <div className="w-[40%] flex justify-end mt-16">
                <Image src={PRESS[7].logo.src} width={PRESS[7].logo.width} height={PRESS[7].logo.height} alt={PRESS[7].testata} className="w-[85%] h-auto object-contain translate-y-12" />
              </div>
            </div>

            {/* Row 9: Stanford Article */}
            <div className="w-full relative z-0 mt-[-1rem]">
              <Image src={PRESS[7].articolo.src} width={PRESS[7].articolo.width} height={PRESS[7].articolo.height} alt={`${PRESS[7].testata} article`} className="w-full h-auto object-contain" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
