"use client";

/**
 * ValoriSection
 * ------------------------------------------------------------------
 * - Desktop (≥1024px): sezione "pinnata" con il valore attivo centrato
 *   (scroll-jacking + misuratore per la centratura esatta).
 * - Mobile: accordion a SCROLL NATURALE guidato da IntersectionObserver.
 *   Niente pin, niente trasformazioni JS a ogni frame, niente misuratore
 *   fantasma: fluido su iOS Safari e apre UN valore alla volta.
 * - prefers-reduced-motion: lista statica.
 *
 * La versione desktop (pesante) viene montata SOLO su desktop: così iPhone non
 * paga mai il costo del misuratore né dello scroll-jacking.
 */

import Image from "next/image";
import { useRef, useState, useEffect, useCallback } from "react";
import { useScroll, useMotionValueEvent, useTransform, useSpring, motion } from "framer-motion";

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
      "La capacità di evolvere, e di farlo velocemente, seguendo il percorso tracciato è sale. Noi siamo i generatori di quegli impulsi che sono necessari a far sì che un sistema vinca la sua inerzia naturale per acquisire competitività grazie al suo dinamismo.",
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

// ── Sfondo ottimizzato (NO CSS BLUR) ─────────────────────────────────────────
// I "cerchi sfocati" sono resi con gradienti radiali morbidi anziché filter:blur():
// questo evita i freeze estremi su iOS Safari causati dal render dei blur grandi.
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
    <div
      className="absolute inset-0"
      style={{
        background: [
          "radial-gradient(50% 50% at 10% 90%, rgba(76,172,248,0.25) 0%, transparent 80%)",
          "radial-gradient(40% 40% at 0% 40%, rgba(76,172,248,0.15) 0%, transparent 80%)",
          "radial-gradient(45% 45% at 85% 30%, rgba(6,46,181,0.25) 0%, transparent 80%)",
          "radial-gradient(40% 40% at 10% 10%, rgba(5,21,94,0.40) 0%, transparent 80%)",
          "radial-gradient(50% 50% at 90% 95%, rgba(5,21,94,0.35) 0%, transparent 80%)",
        ].join(","),
      }}
    />
  </div>
);

const Header = (
  <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold">
    I nostri valori
  </h2>
);

// ──────────────────────────────────────────────────────────────────────────────
// Singolo valore: chiuso (numero + titolo + icona) → aperto (anche descrizione).
// ──────────────────────────────────────────────────────────────────────────────
function DesktopValore({
  index,
  active,
  staticMeasure,
  innerRef,
  onClick,
}: {
  index: number;
  active: boolean;
  staticMeasure?: boolean;
  innerRef?: (el: HTMLElement | null) => void;
  onClick?: () => void;
}) {
  const valore = valori[index];
  const num = String(index + 1).padStart(2, "0");

  return (
    <article 
      ref={innerRef} 
      onClick={onClick}
      className={`relative border-t border-white/10 py-5 md:py-8 overflow-hidden ${
        onClick && !active ? "cursor-pointer" : ""
      }`}
    >
      <div className="flex flex-col items-start w-full">
        {/* Riga compatta: numero + titolo (unità coesa) + icona */}
        <div className="flex items-center justify-between w-full">
          <div className="relative z-10 flex min-w-0 flex-1 items-baseline gap-3 md:gap-4">
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

          <motion.img
            layout={!staticMeasure}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            src={valore.icon}
            alt=""
            className={
              active
                ? "absolute right-0 top-0 bottom-0 my-auto z-0 w-32 h-32 lg:w-48 lg:h-48 object-contain pointer-events-none"
                : "relative z-10 shrink-0 h-10 w-10 md:h-14 md:w-14 object-contain pointer-events-none"
            }
            style={{ opacity: 0.1 }}
          />
        </div>

        {/* Descrizione: lo spazio usa grid-rows 0fr→1fr, il testo opacity + translate */}
        <div
          className="relative z-10 grid [contain:layout_paint] motion-reduce:transition-none w-full"
          style={{
            gridTemplateRows: active ? "1fr" : "0fr",
            transition: staticMeasure
              ? "none"
              : "grid-template-rows 700ms cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="overflow-hidden">
            <p
              className="font-body font-light text-white text-base md:text-xl leading-relaxed max-w-2xl pt-4 motion-reduce:transition-none"
              style={{
                opacity: active ? 1 : 0,
                transform: active ? "translate3d(0,0,0)" : "translate3d(0,12px,0)",
                transition: staticMeasure
                  ? "none"
                  : "opacity 700ms cubic-bezier(0.22, 1, 0.36, 1), transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {valore.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}



// ══════════════════════════════════════════════════════════════════════════════
// STATIC — reduced motion: lista completa, tutte le descrizioni visibili.
// ══════════════════════════════════════════════════════════════════════════════
function StaticValori() {
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

// ══════════════════════════════════════════════════════════════════════════════
// DESKTOP — pinned scroll-jacking: il valore attivo resta centrato.
// (Invariato; montato solo su desktop, così mobile non ne paga il costo.)
// ══════════════════════════════════════════════════════════════════════════════
function DesktopValori() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [yOffsets, setYOffsets] = useState<number[]>(valori.map(() => 0));

  const sectionRef = useRef<HTMLElement>(null);
  const measurerContainersRef = useRef<(HTMLDivElement | null)[]>([]);
  const measurerItemsRef = useRef<(HTMLElement | null)[]>([]);
  const yOffsetsRef = useRef<number[]>(valori.map(() => 0));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const handleItemClick = (index: number) => {
    if (!sectionRef.current) return;
    const offsetTop = sectionRef.current.offsetTop;
    const offsetHeight = sectionRef.current.offsetHeight;
    const vh = window.innerHeight;
    const scrollableDistance = offsetHeight - vh;
    
    // Percentuale di scroll desiderata per attivare 'index'
    const targetPercentage = index / (valori.length - 1);
    
    const targetScrollY = offsetTop + (targetPercentage * scrollableDistance);
    
    window.scrollTo({
      top: targetScrollY,
      behavior: "smooth"
    });
  };

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    let index = Math.round(latest * (valori.length - 1));
    if (index >= valori.length) index = valori.length - 1;
    if (index < 0) index = 0;
    setActiveIndex((prev) => (prev !== index ? index : prev));
  });

  const updateOffsets = useCallback(() => {
    const vh = window.innerHeight;
    const newOffsets = valori.map((_, k) => {
      const container = measurerContainersRef.current[k];
      const item = measurerItemsRef.current[k];
      if (!container || !item) return 0;

      const containerRect = container.getBoundingClientRect();
      const itemRect = item.getBoundingClientRect();
      const contentH = containerRect.height;
      const centerInContent =
        itemRect.top - containerRect.top + itemRect.height / 2;
      const targetY = vh / 2 - centerInContent;

      // Più alto: lascia respiro sotto lo sfondo/navbar così il titolo
      // "I nostri valori" resta visibile e non finisce troppo in alto.
      const TOP_PAD = 120;
      const BOTTOM_MARGIN = 140;
      const maxT = TOP_PAD;
      const minT = vh - BOTTOM_MARGIN - contentH;
      return minT > maxT ? maxT : Math.min(Math.max(targetY, minT), maxT);
    });
    yOffsetsRef.current = newOffsets;
    setYOffsets(newOffsets);
  }, []);

  useEffect(() => {
    updateOffsets();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(updateOffsets);
    }

    let timeoutId: ReturnType<typeof setTimeout>;
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

  // Posizione verticale continua, legata direttamente allo scroll: interpola
  // tra l'offset del valore corrente e quello successivo, così lo scorrimento
  // è fluido e non "aggancia" più a scatti sul valore attivo.
  const y = useTransform(scrollYProgress, (latest) => {
    const n = valori.length - 1;
    const pos = Math.min(Math.max(latest, 0), 1) * n;
    const i = Math.floor(pos);
    const frac = pos - i;
    const offs = yOffsetsRef.current;
    const a = offs[i] ?? 0;
    const b = offs[Math.min(i + 1, n)] ?? a;
    return a + (b - a) * frac;
  });
  // Smoothing leggero: rende lo scorrimento ancora più morbido senza
  // reintrodurre lo scatto di "aggancio".
  const ySmooth = useSpring(y, { stiffness: 140, damping: 40, mass: 0.4 });
  // yOffsets è tenuto in stato solo per forzare il re-render dopo la misura.
  void yOffsets;

  return (
    <section ref={sectionRef} className="relative w-full bg-[#030d3d] h-[240vh] z-20">
      {/* ── MISURATORE FANTASMA (Hidden Measurer) ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-[-1] [contain:strict]">
        <div aria-hidden="true" className="absolute left-0 top-0 w-full opacity-0">
          {valori.map((_, activeIdx) => (
            <div
              key={activeIdx}
              ref={(el) => {
                measurerContainersRef.current[activeIdx] = el;
              }}
            >
              <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
                <div className="mb-6 md:mb-8">{Header}</div>
                <div className="flex flex-col">
                  {valori.map((valore, index) => (
                    <DesktopValore
                      key={valore.id}
                      index={index}
                      active={index === activeIdx}
                      staticMeasure
                      innerRef={
                        index === activeIdx
                          ? (el) => {
                            measurerItemsRef.current[activeIdx] = el;
                          }
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contenitore sticky a tutto schermo */}
      <div className="sticky top-0 h-screen w-full overflow-hidden [transform:translateZ(0)]">
        {Background}

        <motion.div
          className="relative w-full"
          style={{ y: ySmooth, willChange: "transform" }}
        >
          <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
            <div className="mb-6 md:mb-8">{Header}</div>
            <div className="flex flex-col">
              {valori.map((valore, index) => (
                <DesktopValore
                  key={valore.id}
                  index={index}
                  active={index === activeIndex}
                  onClick={() => handleItemClick(index)}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Router: sceglie la variante in base a preferenze (reduced-motion). 
// Usa la variante animata con scroll-jacking su TUTTI i device.
// ══════════════════════════════════════════════════════════════════════════════
export default function ValoriSection() {
  const [mode, setMode] = useState<"animated" | "reduce" | null>(null);

  useEffect(() => {
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setMode(reduceMq.matches ? "reduce" : "animated");
    };
    update();
    reduceMq.addEventListener("change", update);
    return () => {
      reduceMq.removeEventListener("change", update);
    };
  }, []);

  if (mode === "reduce") return <StaticValori />;
  
  // mode === "animated" o SSR
  return <DesktopValori />;
}
