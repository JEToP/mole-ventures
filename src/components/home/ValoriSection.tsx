"use client";

/**
 * ValoriSection — Pinned Scroll-Jacking (Scrubbing)
 * ------------------------------------------------------------------
 * L'animazione è fissata allo scroll.
 * La sezione è ancorata (sticky) mentre l'utente scorre.
 * Il contenitore dei valori trasla dinamicamente lungo l'asse Y per 
 * mantenere il valore "attivo" (quello aperto) perfettamente 
 * al centro dello schermo.
 */

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion, MotionStyle } from "framer-motion";

// useLayoutEffect non serve più.

// ── Dati valori ─────────────────────────────────────────────────────────────
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

// ── Sfondo mesh ─────────────────────────────────────────────────────────────
const Background = (
  <div
    className="pointer-events-none absolute inset-0 overflow-hidden [contain:paint] [transform:translateZ(0)]"
    aria-hidden="true"
  >
    <div
      className="absolute inset-0"
      style={{
        background:
          "radial-gradient(120% 120% at 75% 25%, rgba(6,46,181,0.55) 0%, rgba(5,21,94,0.85) 45%, #030d3d 80%)",
      }}
    />
    <div
      className="absolute -inset-[12%]"
      style={{
        background: [
          "radial-gradient(48% 60% at 2% 92%, rgba(76,172,248,0.75) 0%, rgba(76,172,248,0.30) 32%, transparent 60%)",
          "radial-gradient(38% 50% at 6% 52%, rgba(76,172,248,0.40) 0%, transparent 58%)",
          "radial-gradient(55% 55% at 70% 42%, rgba(6,46,181,0.60) 0%, transparent 62%)",
          "radial-gradient(40% 44% at 104% 12%, rgba(76,172,248,0.32) 0%, transparent 60%)",
          "radial-gradient(45% 45% at -6% 4%, rgba(5,21,94,0.80) 0%, transparent 55%)",
          "radial-gradient(55% 55% at 102% 100%, rgba(5,21,94,0.80) 0%, transparent 58%)",
        ].join(","),
      }}
    />
    <div className="absolute -bottom-[22%] -left-[16%] w-[60%] h-[70%] rounded-full bg-blue-soft opacity-45 blur-[120px] md:blur-[150px]" />
    <div className="absolute top-[30%] -left-[14%] w-[42%] h-[48%] rounded-full bg-blue-soft opacity-30 blur-[110px] md:blur-[150px]" />
    <div className="absolute top-[18%] right-[8%] w-[50%] h-[55%] rounded-full bg-blue-kinetic opacity-40 blur-[120px] md:blur-[160px]" />
    <div className="absolute -top-[14%] -left-[10%] w-[45%] h-[50%] rounded-full bg-blue-deep opacity-60 blur-[120px] md:blur-[160px]" />
    <div className="absolute -bottom-[14%] -right-[12%] w-[52%] h-[58%] rounded-full bg-blue-deep opacity-55 blur-[130px] md:blur-[170px]" />
  </div>
);

const Header = (
  <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold">
    I nostri valori
  </h2>
);

// ──────────────────────────────────────────────────────────────────────────────
function Valore({
  index,
  active,
  staticMeasure,
  innerRef,
}: {
  index: number;
  active: boolean;
  staticMeasure?: boolean;
  innerRef?: (el: HTMLElement | null) => void;
}) {
  const valore = valori[index];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article ref={innerRef} className="border-t border-white/10 py-5 md:py-8">
      {/* Riga compatta: numero + titolo (unità coesa) + icona */}
      <div className="flex items-center gap-4 md:gap-6">
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
            className="h-10 w-10 md:h-14 md:w-14 object-contain"
            unoptimized
          />
        </div>
      </div>

      {/* Descrizione: lo spazio usa grid-rows 0fr→1fr */}
      <div
        className="grid [contain:layout_paint] motion-reduce:transition-none"
        style={{
          gridTemplateRows: active ? "1fr" : "0fr",
          transition: staticMeasure ? "none" : "grid-template-rows 480ms cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <div className="overflow-hidden">
          <p
            className="font-body font-light text-white text-base md:text-xl leading-relaxed max-w-2xl pt-4 motion-reduce:transition-none"
            style={{
              opacity: active ? 1 : 0,
              transform: active ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
              transition: staticMeasure ? "none" : "opacity 480ms cubic-bezier(0.22, 1, 0.36, 1), transform 480ms cubic-bezier(0.22, 1, 0.36, 1)",
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
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [yOffsets, setYOffsets] = useState<number[]>(valori.map(() => 0));

  const sectionRef = useRef<HTMLElement>(null);
  const measurerContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const measurerItemsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReduce(true);
    }
  }, []);

  // Il progresso 0->1 guida sia l'active index sia la traslazione Y.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (valori.length - 1));
    if (index >= valori.length) index = valori.length - 1;
    if (index < 0) index = 0;
    setActiveIndex((prev) => (prev !== index ? index : prev));
  });

  // ── Calcolo posizioni statiche ──────────────────────────────────────────────
  const updateOffsets = useCallback(() => {
    const vh = window.innerHeight;
    const newOffsets = valori.map((_, k) => {
      const container = measurerContainersRef.current[k];
      const item = measurerItemsRef.current[k];
      if (!container || !item) return 0;

      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const contentH = containerRect.height;
      const centerInContent = itemRect.top - containerRect.top + itemRect.height / 2;

      const targetY = vh / 2 - centerInContent;
      const TOP_PAD = 96;
      const BOTTOM_MARGIN = 140;
      const maxT = TOP_PAD;
      const minT = vh - BOTTOM_MARGIN - contentH;
      return minT > maxT ? maxT : Math.min(Math.max(targetY, minT), maxT);
    });
    setYOffsets(newOffsets);
  }, []);

  // Aggiorna gli offset al mount e al resize (debounce leggero).
  useEffect(() => {
    updateOffsets();
    
    // Per intercettare font loading o layout completato
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateOffsets);
    }

    let timeoutId: NodeJS.Timeout;
    let lastWidth = window.innerWidth;
    const handleResize = () => {
      if (window.innerWidth !== lastWidth) {
        lastWidth = window.innerWidth;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => updateOffsets(), 150);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", updateOffsets);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", updateOffsets);
    };
  }, [updateOffsets]);

  // Genera gli stop per useTransform: [0, 1/6, 2/6, 3/6, 4/6, 5/6, 1]
  const stops = valori.map((_, i) => i / (valori.length - 1));
  const contentY = useTransform(scrollYProgress, stops, yOffsets);

  // ── Fallback statico: reduced motion ──────────────────────────────────────────
  if (reduce) {
    return (
      <section className="relative w-full overflow-hidden bg-[#030d3d] py-20 md:py-28 z-20">
        {Background}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
          <div className="mb-12 md:mb-16">{Header}</div>
          <div className="flex flex-col">
            {valori.map((valore, i) => (
              <div key={valore.id} className="border-t border-white/10 py-7 md:py-9">
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

  // ── Versione Pinned: il valore attivo resta centrato sullo schermo ───────────
  return (
    <section ref={sectionRef} className="relative w-full bg-[#030d3d] h-[240vh] z-20">
      
      {/* ── MISURATORE FANTASMA (Hidden Measurer) ── */}
      {/* Renderizza 7 istanze nascoste, una per ogni stato "aperto", per calcolare a priori la posizione Y.
          Senza h-0 per costringere Safari iOS a calcolare correttamente il layout. */}
      <div aria-hidden="true" className="pointer-events-none absolute left-0 top-0 w-full opacity-0 z-[-1] invisible">
        {valori.map((_, activeIdx) => (
          <div key={activeIdx} ref={(el) => { measurerContainersRef.current[activeIdx] = el; }}>
            <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
              <div className="mb-6 md:mb-8">{Header}</div>
              <div className="flex flex-col">
                {valori.map((valore, index) => (
                  <Valore
                    key={valore.id}
                    index={index}
                    active={index === activeIdx}
                    staticMeasure
                    innerRef={index === activeIdx ? (el) => { measurerItemsRef.current[activeIdx] = el; } : undefined}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Contenitore sticky a tutto schermo */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {Background}

        {/* La lista trasla verticalmente guidata puramente dallo scroll */}
        <motion.div
          className="relative w-full"
          style={{ y: contentY, willChange: "transform" }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
            <div className="mb-6 md:mb-8">{Header}</div>
            <div className="flex flex-col">
              {valori.map((valore, index) => (
                <Valore
                  key={valore.id}
                  index={index}
                  active={index === activeIndex}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
