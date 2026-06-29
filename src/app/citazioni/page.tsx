import Image from "next/image";

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
    testata: "Equita",
    titolo: "Al via il nuovo fondo «Equita Rilancio Small Cap Italia»",
    logo: { src: "/images/insight/equita 1.png", width: 347, height: 169 },
    articolo: { src: "/images/insight/art-equita.png", width: 1042, height: 218 },
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
    testata: "Yale School of Management",
    titolo: "How are Search Fund Investors Really Faring?",
    logo: { src: "/images/insight/logo-yale.png", width: 235, height: 282 },
    articolo: { src: "/images/insight/art-yale.png", width: 1051, height: 217 },
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
];

export default function InsightsPage() {
  return (
    <main className="relative w-full bg-white pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto w-full max-w-5xl px-6 md:px-10">
        {/* Elenco testata + articolo */}
        <div className="flex flex-col">
          {PRESS.map((item) => (
            <article
              key={item.testata}
              className="flex flex-col gap-2 py-3 md:flex-row md:items-center md:gap-12 md:py-10 md:[&:nth-child(even)]:flex-row-reverse"
            >
              {/* Logo testata */}
              <div className="flex h-12 w-40 shrink-0 items-center md:h-24 md:w-52 md:justify-center">
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
      </div>
    </main>
  );
}
