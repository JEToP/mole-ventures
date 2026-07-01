"use client";

/**
 * LeFasiInterventoSection — focus "pinnato" guidato dallo scroll.
 *
 * Desktop: UNA sola sezione pinnata con UN solo sfondo continuo (il gradiente
 * del Figma). Header (titolo + sottotitolo) in alto; le fasi 1–4 nella
 * disposizione sparsa e il focus passa 1→2→3→4 mentre la 5ª si intravede in
 * basso. Superata la 4, il contenuto scorre verso l'alto (lo sfondo resta fermo)
 * rivelando la 5ª e la call to action.
 *
 * Mobile: punti impilati con focus dinamico (whileInView). Reduced motion: lista
 * statica.
 */

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useReducedMotion,
  type MotionValue,
  type MotionStyle,
} from "framer-motion";
import { FASI } from "../fasiData";

// Fasi del progress:
//  [0, HEAD_END]   → l'header (titolo+sottotitolo) esce scorrendo verso l'alto
//  [HEAD_END, REVEAL] → focus 1→2→3→4 (4 segmenti)
//  [REVEAL, 1]     → la 5ª fase + CTA si rivelano
const HEAD_END = 0.13;
const REVEAL = 0.82; // Ritardato per bilanciare il focus 4
const BOUNDS = [HEAD_END, 0.3, 0.47, 0.68, REVEAL, 1.0]; // 0.68 ritarda il focus 4 rispetto al 3
const CF = 0.05;

const clamp01 = (x: number) => Math.min(1, Math.max(0, x));
const sanitize = (stops: number[]): number[] => {
  let prev = -Infinity;
  return stops.map((s) => {
    let v = clamp01(s);
    if (v <= prev) v = Math.min(1, prev + 1e-4);
    prev = v;
    return v;
  });
};

const TETRIS_BG = [
  "linear-gradient(135deg, #0d2159 0%, #153791 100%)",
  "linear-gradient(180deg, #234f9f 0%, #1a3c7c 100%)",
  "linear-gradient(180deg, #143275 0%, #0a1b42 100%)",
  "linear-gradient(90deg, #143787 0%, #2053c4 100%)",
  "linear-gradient(180deg, #0a1b42 0%, #0d2350 100%)",
];

// Sfondo continuo che riprende i colori dei blocchi 1–3 e li fonde in una
// sfumatura unica: l'header non "galleggia" più su un navy piatto, ma nasce
// dagli stessi toni dei blocchi sottostanti e vi confluisce con dolcezza.
// La rampa in alto è lunga e delicata, così il passaggio header → blocchi
// è molto graduale.
const CONTINUOUS_BG =
  "linear-gradient(180deg, #0d2159 0%, #12307a 18%, #1a4189 36%, #1c458f 50%, #183c80 60%, #10305f 72%, #0a1c40 84%, #04102b 100%)";

// Feather su tutti i bordi: fade molto ampio così i blocchi NON leggono più
// come riquadri sospesi ma sfumano dolcemente nello sfondo continuo (e tra
// loro). Restano distinti per tono, non per bordo netto.
const FEATHER_ALL: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 5%, #000 95%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

// Feather dedicato al blocco 01: bordo superiore molto morbido così si fonde
// dolcemente con l'intestazione (passaggio graduale header → 01); lati e fondo
// netti così lo stacco col 04 sotto resta pulito, senza alone blu.
const FEATHER_01: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 22%, #000 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 22%, #000 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

// Feather dedicato al blocco 03: bordo superiore morbido (fusione con
// l'intestazione), lati e FONDO netti così si salda pulito col 05 sottostante.
const FEATHER_03: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 7%, #000 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 7%, #000 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

// Feather dedicato al blocco 02: bordo superiore NETTO (stacco marcato con
// l'intestazione, sono due colori diversi), bordo inferiore molto morbido così
// si fonde col 04 sottostante. Lati netti.
const FEATHER_02: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 1%, #000 74%, transparent 100%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 99%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 1%, #000 74%, transparent 100%)",
  WebkitMaskComposite: "source-in",
  maskComposite: "intersect",
};

// Feather dedicato al blocco 04: bordo sinistro netto, destro molto sfumato
// verso il vuoto. Il bordo SUPERIORE è netto a sinistra (stacco col 01) ma si
// scioglie solo verso l'angolo in alto a destra (fusione continua col 02),
// grazie alla maschera diagonale "to top right".
const FEATHER_04: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 68%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 1.5%, #000 100%), linear-gradient(to top right, #000 66%, transparent 96%)",
  maskImage:
    "linear-gradient(to right, transparent 0%, #000 1%, #000 68%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 1.5%, #000 100%), linear-gradient(to top right, #000 66%, transparent 96%)",
  WebkitMaskComposite: "source-in, source-in",
  maskComposite: "intersect, intersect",
};

const GRID_CLASSES = [
  "lg:col-span-4",                 // 01
  "lg:col-span-3",                 // 02
  "lg:col-span-3 lg:row-span-2",   // 03
  "lg:col-span-7",                 // 04
  "lg:col-span-10",                // 05
];

const EXTENDED_BGS = [
  "absolute inset-0 lg:left-auto lg:right-0 lg:w-[100vw]", 
  "absolute inset-0",                                      
  "absolute inset-0 lg:right-auto lg:left-0 lg:w-[100vw]", 
  "absolute inset-0 lg:left-auto lg:right-0 lg:w-[100vw]", 
  "absolute inset-0 lg:left-1/2 lg:-translate-x-1/2 lg:w-[200vw]",
];

const LIGHT_EFFECTS = [
  <>
    <div className="hidden lg:block absolute top-1/2 right-0 w-[400px] h-[500px] translate-x-1/2 -translate-y-1/2 bg-[#5592fc] rounded-full opacity-20 blur-[200px] mix-blend-screen pointer-events-none -z-10" />
    <div className="hidden lg:block absolute bottom-0 right-0 w-[600px] h-[400px] translate-x-1/2 translate-y-1/2 bg-[#5d98ff] rounded-full opacity-[0.35] blur-[250px] mix-blend-screen pointer-events-none -z-10" />
  </>,
  <>
    <div className="hidden lg:block absolute top-1/2 right-0 w-[400px] h-[400px] translate-x-1/2 -translate-y-1/2 bg-[#3f7de8] rounded-full opacity-20 blur-[80px] mix-blend-screen pointer-events-none -z-10" />
  </>,
  null,
  null,
  null,
];

// Riflessi bianchi come luce proveniente da un unico punto (come nel Figma):
// bagliori morbidi e conici SOLO negli angoli in basso + il raggio accentuato
// sulla piega tra 01 e 02. Tutto in mix-blend-screen, niente linee dritte.
const SEAM_LIGHTS = [
  // 01 → riflesso morbido nell'angolo in basso a destra
  <div className="hidden lg:block absolute bottom-0 right-0 h-[300px] w-[360px] translate-x-[45%] translate-y-[45%] rounded-full bg-white opacity-[0.09] blur-[90px] mix-blend-screen pointer-events-none z-0" />,
  // 02 → raggio di sole accentuato sulla piega tra 01 e 02 (conico, dall'alto)
  //      + riflesso morbido nell'angolo in basso a sinistra
  <>
    <div className="hidden lg:block absolute left-0 top-0 h-[540px] w-[210px] -translate-x-[44%] -translate-y-[6%] rounded-full bg-white opacity-[0.02] blur-[100px] mix-blend-screen pointer-events-none z-0" />
    <div className="hidden lg:block absolute bottom-0 left-0 h-[240px] w-[300px] -translate-x-[42%] translate-y-[45%] rounded-full bg-white opacity-[0.12] blur-[90px] mix-blend-screen pointer-events-none z-0" />
  </>,
  // 03 → riflesso morbido nell'angolo in basso a sinistra
  <div className="hidden lg:block absolute bottom-0 left-0 h-[280px] w-[340px] -translate-x-[45%] translate-y-[45%] rounded-full bg-white opacity-[0.02] blur-[90px] mix-blend-screen pointer-events-none z-0" />,
  // 04 → riflesso morbido nell'angolo in basso a destra
  <div className="hidden lg:block absolute bottom-0 right-0 h-[280px] w-[340px] translate-x-[45%] translate-y-[45%] rounded-full bg-white opacity-[0.13] blur-[90px] mix-blend-screen pointer-events-none z-0" />,
  null,
];

function FaseContent({
  index,
  numberStyle,
  titleClass = "",
  descClass = "",
}: {
  index: number;
  numberStyle?: MotionStyle;
  titleClass?: string;
  descClass?: string;
}) {
  const fase = FASI[index];
  return (
    <>
      <motion.span
        aria-hidden="true"
        style={numberStyle}
        className="block font-heading text-5xl font-semibold leading-none tracking-normal text-white md:text-[64px]"
      >
        {fase.numero}
      </motion.span>
      <h3
        className={`mt-3 break-words font-heading text-[26px] font-semibold leading-[1.1] tracking-normal text-white md:mt-4 md:text-[32px] ${titleClass}`}
      >
        {fase.titolo}
      </h3>
      <p
        className={`mt-3 break-words font-body text-[15px] font-normal leading-[1.55] tracking-normal text-white/90 md:mt-4 md:text-[17px] ${descClass}`}
      >
        {fase.descrizione}
      </p>
    </>
  );
}

function FaseFocusItem({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const segStart = BOUNDS[index];
  const segEnd = BOUNDS[index + 1];
  const isFirst = index === 0;
  const isLast = index === FASI.length - 1;

  let stops: number[];
  let values: number[];
  if (isFirst) {
    stops = [segEnd - CF, segEnd + CF];
    values = [1, 0];
  } else if (isLast) {
    stops = [segStart - CF, segStart + CF];
    values = [0, 1];
  } else {
    stops = [segStart - CF, segStart + CF, segEnd - CF, segEnd + CF];
    values = [0, 1, 1, 0];
  }
  const focus = useTransform(progress, sanitize(stops), values);
  
  // Animazioni dinamiche: il blocco ingrandisce il testo e diventa più luminoso, ma lo sfondo resta fisso.
  const opacity = useTransform(focus, [0, 1], [0.4, 1]);
  const scale = useTransform(focus, [0, 1], [0.98, 1.02]);
  
  const numberOpacity = useTransform(focus, [0, 1], [0.5, 1]);
  const numberScale = useTransform(focus, [0, 1], [1, 1.1]);

  return (
    <article
      className={`relative px-8 md:px-12 ${
        index === 0
          ? "pt-8 pb-10 lg:pt-10 lg:pb-12"        // 01: più in alto
          : index === 2
            ? "pt-28 pb-10 lg:pt-36 lg:pb-12"     // 03: più in basso nella colonna
            : index === 1
              ? "pt-16 pb-10 lg:pt-20 lg:pb-12"
              : index === 4
                ? "pt-10 pb-10 lg:pt-12 lg:pb-12"
                : "py-10 lg:py-12"
      } ${
        // Blocchi della colonna sinistra (01, 04, 05): testo allineato al bordo
        // del container (come navbar/header), niente indentazione a sinistra.
        index === 0
          ? "lg:pl-0 lg:pr-10"
          : index === 3 || index === 4
            ? "lg:pl-0 lg:pr-20"
            : "lg:px-10"
      } ${GRID_CLASSES[index]}`}
    >
      <div className="-z-20 absolute inset-0">
        <div
          className={EXTENDED_BGS[index]}
          style={{ background: TETRIS_BG[index], ...(index === 4 ? undefined : index === 3 ? FEATHER_04 : index === 2 ? FEATHER_03 : index === 1 ? FEATHER_02 : index === 0 ? FEATHER_01 : FEATHER_ALL) }}
        />
      </div>
      
      {LIGHT_EFFECTS[index]}
      {SEAM_LIGHTS[index]}

      <motion.div 
        className="relative z-10 flex flex-col h-full justify-start"
        style={{ opacity, scale, transformOrigin: "center left", willChange: "transform, opacity" }}
      >
        <FaseContent
          index={index}
          numberStyle={{ opacity: numberOpacity, scale: numberScale, transformOrigin: "left center" }}
          titleClass="text-[20px] lg:text-[24px] xl:text-[28px]"
          descClass="mt-2 lg:mt-3 text-[14px] xl:text-[14.5px] leading-snug xl:leading-[1.5]"
        />
        
        {index === 4 && (
          <div className="mt-10 lg:mt-12 flex justify-start w-full">
            <Cta />
          </div>
        )}
      </motion.div>
    </article>
  );
}


function Header({ className = "" }: { className?: string }) {
  return (
    <header className={`max-w-3xl min-w-0 ${className}`}>
      <h2
        id="fasi-heading"
        className="break-words font-heading text-3xl font-semibold leading-none tracking-normal text-white md:text-[40px]"
      >
        Le 5 fasi dell&apos;intervento
      </h2>
      <p className="mt-4 max-w-full font-body font-light text-white text-base md:text-xl leading-relaxed">
        Siamo in ascolto per identificare aziende e imprenditori che vogliono dare un nuovo
        sviluppo alla realt&agrave; esistente, e diventare, insieme a noi, autori di un cambiamento
        imprenditoriale e manageriale duraturo. Il nostro metodo segue una struttura precisa,
        divisa in 5 fasi.
      </p>
    </header>
  );
}

function Cta() {
  return (
    <Link
      href="/aree-di-intervento"
      className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-body text-base font-semibold text-blue-deep transition-colors duration-300 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep md:text-lg"
    >
      Scopri le aree di intervento
      <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
    </Link>
  );
}

export default function LeFasiInterventoSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  
  const [scrollRange, setScrollRange] = useState({ 
    start: "-32vh", 
    mid: "-75vh", 
    end: "-95vh" 
  });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => {
    progress.set(scrollYProgress.get());
  }, [progress, scrollYProgress]);

  // Calcola dinamicamente l'esatta altezza del contenuto per garantire
  // che lo scorrimento finale riveli sempre il blocco 5 e la CTA
  // indipendentemente dalla risoluzione dello schermo o dalla lunghezza del testo.
  useEffect(() => {
    const updateScroll = () => {
      if (!scrollWrapperRef.current) return;
      const height = scrollWrapperRef.current.scrollHeight;
      const vh = window.innerHeight;
      
      const startPixels = vh * 0.32;
      let endPixels = height - vh; 
      
      if (endPixels < startPixels) {
        endPixels = startPixels;
      }
      
      // Il passaggio intermedio (focus 5) avviene a metà strada verso la fine
      const midPixels = startPixels + (endPixels - startPixels) * 0.5;

      setScrollRange({
        start: `-${startPixels}px`,
        mid: `-${midPixels}px`,
        end: `-${endPixels}px`
      });
    };

    updateScroll();
    
    // Il ResizeObserver intercetta istantaneamente eventuali cambiamenti di altezza
    // causati dal caricamento ritardato dei web font o aggiustamenti del browser,
    // ricalcolando lo scroll al millimetro.
    const observer = new ResizeObserver(() => updateScroll());
    if (scrollWrapperRef.current) {
      observer.observe(scrollWrapperRef.current);
    }
    
    window.addEventListener("resize", updateScroll);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updateScroll);
    };
  }, []);

  // Il contenuto scorre verso l'alto progressivamente!
  // Per garantire che il blocco 3 non finisca sotto la navbar, il layout
  // rimane bloccato (pinned) durante il focus 1, 2 e parte del 3.
  // A 0.58 (prima che inizi il focus 4 a 0.68), la pagina inizia a scivolare 
  // verso l'alto per centrare il blocco 4 PRIMA che prenda il focus.
  const contentY = useTransform(
    progress,
    [0, BOUNDS[0], BOUNDS[1], BOUNDS[2], 0.58, BOUNDS[4], 1],
    [
      "0px",
      scrollRange.start,  // Focus 1: l'header sparisce, griglia al top
      scrollRange.start,  // Focus 2: fermo
      scrollRange.start,  // Focus 3 (0.47): fermo
      scrollRange.start,  // 0.58: Inizia a scorrere in anticipo rispetto al focus 4
      scrollRange.mid,    // Focus 5 (0.82): inquadra il blocco 5
      scrollRange.end     // Fine: rivela comodamente la CTA garantendo di raggiungere la fine
    ]
  );

  return (
    <div className="relative" id="fasi">
      {/* ── MOBILE (o Reduced motion): lista a flusso naturale (no scroll-jacking) ── */}
      <section
        aria-labelledby="fasi-heading-mobile"
        className={`relative w-full overflow-hidden pt-[12vh] ${!reduce ? "lg:hidden" : ""}`}
        style={{ background: "linear-gradient(180deg, #0b1e50 0%, #123571 100%)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0 px-0">
          <div className="px-8 md:px-12">
            <Header />
          </div>
          
          <div className="mt-14 flex flex-col gap-0 w-full relative">
            {/* Sfondo continuo dietro la colonna: i feather dei blocchi vi confluiscono */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-30"
              style={{ background: CONTINUOUS_BG }}
            />
            {FASI.map((fase, i) => (
              <article key={fase.numero} className="relative p-10 md:p-14">
                <div className="-z-20 absolute inset-0">
                  <div
                    className="absolute inset-0"
                    style={{ background: TETRIS_BG[i] }}
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0.35, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.5 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <FaseContent index={i} />
                  
                  {i === 4 && (
                    <div className="mt-10 flex justify-start w-full">
                      <Cta />
                    </div>
                  )}
                </motion.div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── DESKTOP Animated motion: Scroll-jacking section ─────────────────────────────── */}
      {!reduce && (
        <section
          aria-labelledby="fasi-heading"
          className="relative hidden w-full lg:block h-[400vh] bg-blue-deep"
          ref={sectionRef}
        >
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(30,80,180,0.1) 0%, transparent 70%)" }} />
            
            <motion.div style={{ y: contentY }} className="absolute inset-0 z-10 w-full">
              <div ref={scrollWrapperRef} className="relative mx-auto w-full max-w-7xl px-12">

                {/* Sfondo continuo full-bleed: unico gradiente dietro header + griglia */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-x-[50vw] top-0 bottom-0 -z-30"
                  style={{ background: CONTINUOUS_BG }}
                />

                <div className="pt-[12vh]">
                  <Header className="max-w-3xl" />
                </div>
                
                <div className="mt-[13vh]">
                  <div className="grid grid-cols-10 gap-0 w-full relative">
                    {FASI.map((fase, index) => (
                      <FaseFocusItem
                        key={fase.numero}
                        index={index}
                        progress={progress}
                      />
                    ))}
                  </div>
                </div>
                
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </div>
  );
}
