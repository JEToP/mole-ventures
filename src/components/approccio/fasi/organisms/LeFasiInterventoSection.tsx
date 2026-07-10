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
const REVEAL = 0.82; // inizio focus 5
// Segmenti di focus 1→4 con plateau via via più lunghi per 2, 3 e 4, così la
// fase 3 non viene "tagliata" e la 4 resta accesa mentre si continua a scorrere.
const BOUNDS = [HEAD_END, 0.28, 0.45, 0.63, REVEAL, 1.0];
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

// Piani illuminati (ispirati alla reference): solo palette deep/kinetic/soft.
// La luce entra dall'alto-centro: 01 = parete in ombra (deep→kinetic),
// 02 = fascia verticale illuminata (soft→kinetic), 03 = parete media che va in
// ombra (kinetic→deep), 04 = pavimento illuminato (kinetic→soft), 05 = pavimento
// che sfuma in ombra (kinetic→deep). Transizioni diagonali morbide + feathering.
const TETRIS_BG = [
  "linear-gradient(155deg, var(--color-blue-deep) 0%, var(--color-blue-kinetic) 100%)",
  "linear-gradient(205deg, var(--color-blue-soft) 0%, var(--color-blue-kinetic) 78%)",
  "linear-gradient(165deg, var(--color-blue-kinetic) 0%, var(--color-blue-deep) 100%)",
  "linear-gradient(28deg, var(--color-blue-kinetic) 0%, var(--color-blue-soft) 100%)",
  // 05 = prosegue la 03: parte SCURO in alto (come il fondo della 03/04 sopra)
  "linear-gradient(178deg, var(--color-blue-deep) 0%, var(--color-blue-kinetic) 100%)",
];

// Sfondo continuo che riprende i colori dei blocchi 1–3 e li fonde in una
// sfumatura unica: l'header non "galleggia" più su un navy piatto, ma nasce
// dagli stessi toni dei blocchi sottostanti e vi confluisce con dolcezza.
// La rampa in alto è lunga e delicata, così il passaggio header → blocchi
// è molto graduale.
const CONTINUOUS_BG =
  "linear-gradient(180deg, var(--color-blue-deep) 0%, var(--color-blue-kinetic) 18%, var(--color-blue-kinetic) 36%, var(--color-blue-kinetic) 50%, var(--color-blue-kinetic) 60%, var(--color-blue-kinetic) 72%, var(--color-blue-deep) 84%, var(--color-blue-deep) 100%)";

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

// Feather dedicato al blocco 05: bordo SUPERIORE molto morbido, così il 05 non
// ha più la linea netta in alto e prosegue senza stacco dal 04/03 sopra; lati e
// fondo restano netti.
const FEATHER_05: CSSProperties = {
  WebkitMaskImage:
    "linear-gradient(to bottom, transparent 0%, #000 16%, #000 100%)",
  maskImage:
    "linear-gradient(to bottom, transparent 0%, #000 16%, #000 100%)",
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
    <div className="hidden lg:block absolute top-1/2 right-0 w-[400px] h-[500px] translate-x-1/2 -translate-y-1/2 bg-blue-soft rounded-full opacity-20 blur-[200px] mix-blend-screen pointer-events-none -z-10" />
    <div className="hidden lg:block absolute bottom-0 right-0 w-[600px] h-[400px] translate-x-1/2 translate-y-1/2 bg-blue-soft rounded-full opacity-[0.35] blur-[250px] mix-blend-screen pointer-events-none -z-10" />
  </>,
  <>
    <div className="hidden lg:block absolute top-1/2 right-0 w-[400px] h-[400px] translate-x-1/2 -translate-y-1/2 bg-blue-soft rounded-full opacity-20 blur-[80px] mix-blend-screen pointer-events-none -z-10" />
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
  // 05 → riflesso morbido nell'angolo in alto a sinistra (unisce 4 e 5 a sinistra)
  <div className="hidden lg:block absolute top-0 left-0 h-[300px] w-[360px] -translate-x-[30%] -translate-y-[50%] rounded-full bg-white opacity-[0.12] blur-[100px] mix-blend-screen pointer-events-none z-0" />,
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
        className="block font-heading text-4xl md:text-5xl lg:text-6xl font-semibold leading-none tracking-tight text-white"
      >
        {fase.numero}
      </motion.span>
      <h3
        className={`mt-3 md:mt-4 break-words font-heading text-[22px] md:text-3xl lg:text-4xl font-semibold leading-[1.1] tracking-tight text-white ${titleClass}`}
      >
        {fase.titolo}
      </h3>
      <p
        className={`mt-3 md:mt-4 break-words font-body text-base md:text-xl font-light leading-relaxed text-white ${descClass}`}
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
          style={{ background: TETRIS_BG[index], ...(index === 4 ? FEATHER_05 : index === 3 ? FEATHER_04 : index === 2 ? FEATHER_03 : index === 1 ? FEATHER_02 : index === 0 ? FEATHER_01 : FEATHER_ALL) }}
        />
      </div>
      
      {/* Overlay per unire 4 e 5 nel margine sinistro con blue-soft */}
      {index === 4 && (
        <div 
          className="hidden lg:block absolute top-0 left-0 h-[600px] w-[800px] -translate-x-[60%] -translate-y-1/2 z-0"
          style={{
            background: "var(--color-blue-kinetic)",
            maskImage: "linear-gradient(to right, #000 0%, #000 50%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 45%, #000 55%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 50%, transparent 100%), linear-gradient(to bottom, transparent 0%, #000 45%, #000 55%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "source-in"
          }}
        />
      )}

      {LIGHT_EFFECTS[index]}
      {SEAM_LIGHTS[index]}

      <motion.div 
        className="relative z-10 flex flex-col h-full justify-start"
        style={{ opacity, scale, transformOrigin: "center left", willChange: "transform, opacity" }}
      >
        <FaseContent
          index={index}
          numberStyle={{ opacity: numberOpacity, scale: numberScale, transformOrigin: "left center" }}
        />

        {index === 4 && (
          <div className="mt-12 md:mt-16 mb-6 md:mb-12 flex justify-start w-full">
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
    start: "-40vh",
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
      
      const startPixels = vh * 0.40;
      let endPixels = height - vh;

      if (endPixels < startPixels) {
        endPixels = startPixels;
      }

      setScrollRange({
        start: `-${startPixels}px`,
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
  // A BOUNDS[2] (0.45) la pagina inizia a scivolare verso l'alto con 
  // velocità costante, per un'esperienza fluida e senza "scatti" o accelerazioni
  // improvvise tra le fasi 3, 4 e 5.
  const contentY = useTransform(
    progress,
    [0, BOUNDS[0], BOUNDS[1], BOUNDS[2], 1],
    [
      "0px",
      scrollRange.start,  // Focus 1: l'header sparisce, griglia al top
      scrollRange.start,  // Focus 2: fermo (pinnato)
      scrollRange.start,  // Fine focus 2 / accensione fase 3 (0.45): fermo fin qui, poi scorre
      scrollRange.end     // Fine: rivela comodamente la CTA (1.0)
    ]
  );

  return (
    <div className="relative" id="fasi">
      {/* ── MOBILE (o Reduced motion): lista a flusso naturale (no scroll-jacking) ── */}
      <section
        aria-labelledby="fasi-heading-mobile"
        className={`relative w-full overflow-hidden pt-[12vh] ${!reduce ? "lg:hidden" : ""}`}
        style={{ background: "linear-gradient(180deg, var(--color-blue-deep) 0%, var(--color-blue-kinetic) 100%)" }}
      >
        <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0 px-0">
          <div className="px-6 md:px-12">
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
              <article key={fase.numero} className="relative py-10 px-6 md:px-12 md:py-14">
                <div className="-z-20 absolute inset-0">
                  <div
                    className="absolute inset-0"
                    style={{ background: TETRIS_BG[i] }}
                  />
                </div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="relative z-10"
                >
                  <FaseContent index={i} />
                  
                  {i === 4 && (
                    <div className="mt-12 md:mt-16 mb-6 md:mb-12 flex justify-start w-full">
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
            
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 50%, rgba(6,46,181,0.1) 0%, transparent 70%)" }} />
            
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
