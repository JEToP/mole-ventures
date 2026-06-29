"use client";

/**
 * ValoriSection — Accordion scroll-driven (IntersectionObserver)
 * ------------------------------------------------------------------
 * Pattern: i valori sono TUTTI sempre visibili in stato "chiuso" (compatto:
 * numero + titolo + icona su una riga). Man mano che si scrolla, il valore che
 * attraversa la banda centrale dello schermo si "apre" rivelando la descrizione,
 * mentre gli altri restano chiusi. Uno aperto alla volta.
 *
 * Performance (priorità mobile):
 *  • Niente scroll-jacking / pin: lista a flusso naturale → su mobile non c'è
 *    più lo scrubbing pesante.
 *  • Il rilevamento "valore attivo" usa IntersectionObserver con un rootMargin a
 *    BANDA centrale (non un threshold a 1px): un solo item attivo, niente trigger
 *    accidentali su mobile.
 *  • Il contenuto della descrizione anima SOLO opacity + translateY (transform):
 *    nessun left/top/width/height animato per-frame.
 *  • Lo spazio compatto→aperto usa grid-template-rows 0fr→1fr: transizione
 *    discreta una-tantum all'apertura, non legata al frame di scroll.
 *  • will-change: transform applicato SOLO all'item attivo e rimosso a chiusura.
 *
 * Accessibilità: con prefers-reduced-motion la sezione collassa in una lista
 * statica con tutte le descrizioni già visibili (nessuna animazione).
 */

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Dati valori (invariati) ───────────────────────────────────────────────────
const valori = [
  {
    id: "rispetto",
    name: "Rispetto",
    icon: "/images/icons/rispetto.svg",
    description:
      "Ogni azienda ha una sua storia che va capita e rispettata. Un cambiamento, una discontinuità va sempre affrontata con il rispetto del percorso fatto, delle persone che lo hanno realizzato e dei valori intrinseci dell'azienda.",
  },
  {
    id: "ascolto",
    name: "Ascolto",
    icon: "/images/icons/ascolto.svg",
    description:
      "Le persone aderiscono e attuano il cambiamento se contribuiscono alla sua definizione e impostazione. Per noi questa contribuzione è un elemento chiave del processo e quindi l'ascolto attivo è il denominatore alla base del progetto di trasformazione.",
  },
  {
    id: "cambiamento",
    name: "Cambiamento",
    icon: "/images/icons/cambiamento.svg",
    description:
      "Un sistema evolve con successo se continua a rinnovarsi e ad anticipare le nuove esigenze. L'immobilismo impedisce ad un'azienda di vedere i passi necessari ad affrontare le nuove sfide dimensionanti. Noi agiamo per rimettere in discussione abitudini e modalità operative che minano la trasformazione e quindi le opportunità di nuova crescita.",
  },
  {
    id: "coerenza",
    name: "Coerenza",
    icon: "/images/icons/coerenza.svg",
    description:
      "Dopo una fase di condivisione, l'attuazione del cambiamento passa per una importante capacità di coerenza, costanza, e rispetto di quanto definito sia a livello di direzione che di valori attuativi del piano.",
  },
  {
    id: "dinamicita",
    name: "Dinamicità",
    icon: "/images/icons/dinamicita.svg",
    description:
      "La capacità di evolvere e di evolvere velocemente seguendo il percorso tracciato è sale. Noi siamo i generatori di quegli impulsi che sono necessari a far sì che un sistema vinca la sua inerzia naturale per acquisire competitività grazie al suo dinamismo.",
  },
  {
    id: "trasparenza",
    name: "Trasparenza",
    icon: "/images/icons/trasparenza.svg",
    description:
      "La trasparenza verso tutti gli stakeholders coinvolti è fondamentale per permettere sempre la lettura dei vari segnali e costruire relazioni di fiducia con dipendenti, Clienti, partners e azionisti, che favoriscono il percorso condiviso di crescita e di successo dell'azienda.",
  },
  {
    id: "valorizzazione",
    name: "Valorizzazione",
    icon: "/images/icons/valorizzazione.svg",
    description:
      "Un sistema cresce se lo si valorizza: Nel valore delle persone, nelle relazioni con i Clienti, nel valore riconosciuto ai prodotti e servizi e nei KPI. Valorizzare in modo che questo percorso sia misurabile, riconosciuto e non autoreferenziale.",
  },
];

// ── Sfondo mesh (gradienti radiali sovrapposti, non lineari) ───────────────────
// Una sola "mesh" di radial-gradient ancorati ad angoli e lati — diversi centri,
// raggi e diffusioni — più alcuni blob sfocati che fuoriescono dai bordi per
// riempire gli spazi vuoti laterali senza appiattire il centro (dove sta il testo).
// Palette (da globals.css):
//   blue-deep   #05155E → rgb(5,21,94)
//   blue-kinetic #062EB5 → rgb(6,46,181)
//   blue-soft   #4CACF8 → rgb(76,172,248)
// Il mesh combina tutti e tre, con più tocchi di blue-soft (azzurro) per
// alleggerire gli angoli e i lati. Il layer è promosso su GPU (translateZ) e
// isolato con `contain: paint`: così durante lo scroll non viene ridipinto e
// l'animazione resta fluida (i blur grandi sono costosi solo se ridipinti).
const Background = (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden [contain:paint] [transform:translateZ(0)]"
    aria-hidden="true"
  >
    {/* Base: navy profondo agli angoli (come lo sfondo ChiSiamo) */}
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 120% at 75% 25%, rgba(6,46,181,0.55) 0%, rgba(5,21,94,0.85) 45%, #030d3d 80%)",
      }}
    />
    {/* Strato mesh ad alto impatto: glow azzurro luminoso che esplode dal
        basso-sinistra, nucleo blue-kinetic al centro, bordi navy profondi */}
    <div
      className="absolute -inset-[12%]"
      style={{
        background: [
          // GLOW principale: blue-soft brillante, basso-sinistra (il "faro")
          "radial-gradient(48% 60% at 2% 92%, rgba(76,172,248,0.75) 0%, rgba(76,172,248,0.30) 32%, transparent 60%)",
          // alone azzurro che risale lungo il lato sinistro
          "radial-gradient(38% 50% at 6% 52%, rgba(76,172,248,0.40) 0%, transparent 58%)",
          // nucleo blue-kinetic, centro-destra, dà profondità luminosa
          "radial-gradient(55% 55% at 70% 42%, rgba(6,46,181,0.60) 0%, transparent 62%)",
          // tocco azzurro in alto a destra
          "radial-gradient(40% 44% at 104% 12%, rgba(76,172,248,0.32) 0%, transparent 60%)",
          // angoli profondi blue-deep: alto-sinistra e basso-destra
          "radial-gradient(45% 45% at -6% 4%, rgba(5,21,94,0.80) 0%, transparent 55%)",
          "radial-gradient(55% 55% at 102% 100%, rgba(5,21,94,0.80) 0%, transparent 58%)",
        ].join(","),
      }}
    />
    {/* Blob sfocati: rinforzano il glow azzurro e gli angoli scuri */}
    <div className="absolute -bottom-[22%] -left-[16%] w-[60%] h-[70%] rounded-full bg-blue-soft opacity-45 blur-[120px] md:blur-[150px]" />
    <div className="absolute top-[30%] -left-[14%] w-[42%] h-[48%] rounded-full bg-blue-soft opacity-30 blur-[110px] md:blur-[150px]" />
    <div className="absolute top-[18%] right-[8%] w-[50%] h-[55%] rounded-full bg-blue-kinetic opacity-40 blur-[120px] md:blur-[160px]" />
    <div className="absolute -top-[14%] -left-[10%] w-[45%] h-[50%] rounded-full bg-blue-deep opacity-60 blur-[120px] md:blur-[160px]" />
    <div className="absolute -bottom-[14%] -right-[12%] w-[52%] h-[58%] rounded-full bg-blue-deep opacity-55 blur-[130px] md:blur-[170px]" />
  </div>
);

// ── Header condiviso (barra azzurra rimossa) ───────────────────────────────────
const Header = (
  <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold">
    I nostri valori
  </h2>
);

// ──────────────────────────────────────────────────────────────────────────────
// Singolo valore: chiuso (numero + titolo + icona) → aperto (anche descrizione).
// ──────────────────────────────────────────────────────────────────────────────
function Valore({
  index,
  active,
  registerRef,
}: {
  index: number;
  active: boolean;
  registerRef: (el: HTMLElement | null, i: number) => void;
}) {
  const valore = valori[index];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article
      ref={(el) => registerRef(el, index)}
      data-index={index}
      className="border-t border-white/10 py-7 md:py-9"
    >
      {/* Riga compatta: numero + titolo (unità coesa) + icona */}
      <div className="flex items-center gap-4 md:gap-6">
        {/* Numero + titolo: stesso font, bianco; numero piccolo e più leggero */}
        <div className="flex min-w-0 flex-1 items-baseline gap-3 md:gap-4">
          <span
            aria-hidden="true"
            className={`font-heading text-2xl md:text-4xl font-light tabular-nums text-white transition-opacity duration-500 ${
              active ? "opacity-90" : "opacity-40"
            }`}
          >
            {num}
          </span>
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-white">
            {valore.name}
          </h3>
        </div>

        {/* Icona: line-art bianca, leggero highlight quando attivo */}
        <div
          aria-hidden="true"
          className={`shrink-0 transition-opacity duration-500 will-change-[opacity] [filter:drop-shadow(0_0_18px_rgba(127,176,224,0.45))] ${
            active ? "opacity-80" : "opacity-30"
          }`}
        >
          <Image
            src={valore.icon}
            alt=""
            width={96}
            height={96}
            className="h-12 w-12 md:h-16 md:w-16 object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Descrizione: lo spazio usa grid-rows 0fr→1fr (no reflow per-frame);
          il contenuto interno anima in opacity + translateY (transform/GPU). */}
      <div
        className="grid [contain:layout_paint] motion-reduce:transition-none"
        style={{
          gridTemplateRows: active ? "1fr" : "0fr",
          // Stessa curva di easing per spazio e contenuto → si muovono in sync,
          // niente "scatto" tra reveal dello spazio e comparsa del testo.
          transition: "grid-template-rows 480ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="overflow-hidden">
          <p
            className="font-body font-light text-white/85 text-base md:text-xl leading-relaxed max-w-2xl pt-4 motion-reduce:transition-none"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transition:
                "opacity 480ms cubic-bezier(0.22, 1, 0.36, 1), transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",
              willChange: active ? "transform, opacity" : "auto",
            }}
          >
            {valore.description}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function ValoriSection() {
  // index del valore attualmente "aperto" (-1 = nessuno → all'arrivo tutti chiusi).
  const [activeIndex, setActiveIndex] = useState(-1);
  const [reduce, setReduce] = useState(false);
  const itemsRef = useRef<(HTMLElement | null)[]>([]);

  const registerRef = (el: HTMLElement | null, i: number) => {
    itemsRef.current[i] = el;
  };

  useEffect(() => {
    // prefers-reduced-motion → lista statica con tutto già aperto.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
      return;
    }

    // Banda centrale dello schermo: l'item che la attraversa diventa attivo.
    // rootMargin a banda (≈ 40% in alto / 45% in basso) evita trigger a 1px e
    // mantiene un solo valore aperto alla volta, anche su viewport ~390px.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            if (!Number.isNaN(i)) setActiveIndex(i);
          }
        }
      },
      { rootMargin: "-40% 0px -45% 0px", threshold: 0 }
    );

    const els = itemsRef.current.filter(Boolean) as HTMLElement[];
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // ── Fallback statico: reduced motion → lista, tutte le descrizioni visibili ──
  if (reduce) {
    return (
      <section className="relative w-full overflow-hidden bg-[#030d3d] py-20 md:py-24">
        {Background}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12">{Header}</div>
          <div className="flex flex-col">
            {valori.map((valore, i) => (
              <div key={valore.id} className="border-t border-white/10 py-7">
                <div className="flex items-center gap-4">
                  <span className="font-heading text-2xl md:text-4xl font-light tabular-nums text-white/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight text-white">
                    {valore.name}
                  </h3>
                </div>
                <p className="font-body font-light text-white/85 text-base md:text-lg leading-relaxed max-w-2xl pt-4">
                  {valore.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Versione animata: lista a flusso naturale, apertura scroll-driven ────────
  return (
    <section className="relative w-full overflow-hidden bg-[#030d3d] py-20 md:py-28">
      {Background}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="mb-12 md:mb-16">{Header}</div>
        <div className="flex flex-col">
          {valori.map((valore, index) => (
            <Valore
              key={valore.id}
              index={index}
              active={index === activeIndex}
              registerRef={registerRef}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
