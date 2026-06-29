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
import { useEffect, useRef } from "react";
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
const REVEAL = 0.8;
const BOUNDS = [HEAD_END, 0.3, 0.47, 0.635, REVEAL, 1.0];
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

// Posizioni INIZIALI (desktop): le fasi partono ~26vh più in basso del loro
// target pinnato; nei primi scroll il contenuto sale di 26vh (header fuori) e le
// fasi raggiungono la posizione finale. Scala discendente 1→2→3, 1 e 4 larghe.
const POSITIONS = [
  "absolute left-[2%] top-[34%] w-[34%]",
  "absolute left-[41%] top-[41%] w-[24%]",
  "absolute left-[71%] top-[48%] w-[27%]",
  "absolute left-[3%] top-[78%] w-[64%]",
  "absolute left-[3%] top-[104%] w-[66%]",
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
  positionClass,
}: {
  index: number;
  progress: MotionValue<number>;
  positionClass: string;
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
  const opacity = useTransform(focus, [0, 1], [0.4, 1]);
  const scale = useTransform(focus, [0, 1], [0.97, 1.05]);
  const numberOpacity = useTransform(focus, [0, 1], [0.45, 1]);
  const numberScale = useTransform(focus, [0, 1], [1, 1.14]);

  return (
    <motion.article
      style={{ opacity, scale, transformOrigin: "left center", willChange: "transform, opacity" }}
      className={`max-w-full min-w-0 ${positionClass}`}
    >
      <FaseContent
        index={index}
        numberStyle={{ opacity: numberOpacity, scale: numberScale, transformOrigin: "left center" }}
        titleClass="lg:text-[28px]"
        descClass="lg:mt-3 lg:text-[14.5px] lg:leading-[1.5]"
      />
    </motion.article>
  );
}

// Sfondo dinamico (CSS, responsive) — ricostruito campionando i colori reali del
// Figma: luce brillante in alto-centro, buio in alto-sinistra, pavimento più
// illuminato in basso-sinistra, scuro in basso-destra, con un taglio diagonale.
// Tutto in percentuali ⇒ si adatta a qualsiasi proporzione senza crop.
function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden bg-[#1c4fb8]">
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(78% 62% at 62% 2%, #4f8ce6 0%, rgba(79,140,230,0) 50%),
            radial-gradient(72% 82% at -4% -4%, #0b2c88 0%, rgba(11,44,136,0) 48%),
            radial-gradient(90% 80% at 4% 82%, #2f74d6 0%, rgba(47,116,214,0) 56%),
            radial-gradient(78% 82% at 104% 104%, #102f86 0%, rgba(16,47,134,0) 52%),
            linear-gradient(180deg, #173fa2 0%, #2157c6 46%, #1a4cb8 100%)
          `,
        }}
      />
      {/* Taglio diagonale netto-morbido (richiamo "facet") */}
      <div
        className="absolute inset-0 mix-blend-screen"
        style={{ background: "linear-gradient(116deg, transparent 50%, rgba(120,175,255,0.14) 57%, transparent 63%)" }}
      />
      {/* Secondo taglio diagonale più tenue */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(116deg, rgba(8,30,100,0.16) 0%, transparent 24%, transparent 78%, rgba(8,30,100,0.22) 100%)" }}
      />
      {/* Vignettatura morbida per contrasto */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(135% 120% at 52% 36%, transparent 56%, rgba(7,26,92,0.42) 100%)" }}
      />
    </div>
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
      <p className="mt-4 max-w-full break-words font-body text-[15px] font-normal leading-[1.5] text-white/90 md:text-[16px]">
        Siamo in ascolto per identificare aziende e imprenditori che vogliono dare un nuovo
        sviluppo alla realt&agrave; esistente &mdash; e diventare, insieme a noi, autori di un cambiamento
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => {
    progress.set(scrollYProgress.get());
  }, [progress, scrollYProgress]);

  // Il contenuto scorre verso l'alto (sfondo fermo): prima per far uscire
  // l'header (−26vh), poi resta fermo durante il focus, infine sale ancora per
  // rivelare la 5ª fase e la CTA.
  // Spostamento in px fissi (non vh): così su schermi molto grandi il layout
  // resta compatto come su uno schermo standard, invece di "spalmarsi".
  const contentY = useTransform(
    progress,
    [0, HEAD_END, REVEAL, 1],
    ["0px", "-185px", "-185px", "-540px"],
  );

  // ── Reduced motion: lista statica ───────────────────────────────────────────
  if (reduce) {
    return (
      <section
        aria-labelledby="fasi-heading"
        className="relative w-full overflow-hidden bg-blue-deep px-6 py-20 md:px-12 md:py-24"
      >
        <Background />
        <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
          <Header />
          <div className="mt-14 flex flex-col gap-14">
            {FASI.map((fase, i) => (
              <article key={fase.numero} className="min-w-0">
                <FaseContent index={i} />
              </article>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Cta />
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Mobile / tablet: impilato con focus dinamico (whileInView) */}
      <section
        aria-labelledby="fasi-heading"
        className="relative w-full overflow-hidden bg-blue-deep px-6 py-20 md:px-12 md:py-24 lg:hidden"
      >
        <Background />
        <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
          <Header />
          <div className="mt-14 flex flex-col gap-14">
            {FASI.map((fase, i) => (
              <motion.article
                key={fase.numero}
                initial={{ opacity: 0.35, y: 34 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.6 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-0"
              >
                <FaseContent index={i} />
              </motion.article>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Cta />
          </div>
        </div>
      </section>

      {/* Desktop: una sola sezione pinnata. All'inizio header + fasi insieme;
          scrollando l'header esce, poi parte il focus, infine il reveal. */}
      <section
        ref={sectionRef}
        aria-labelledby="fasi-heading"
        className="relative hidden w-full bg-blue-deep lg:block lg:h-[420vh]"
      >
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Background />
          <motion.div style={{ y: contentY }} className="absolute inset-0 z-10">
            <div className="relative mx-auto h-full w-full max-w-7xl px-12">
              {/* Header: in alto, esce scorrendo nei primi scroll */}
              <div className="absolute left-12 right-12 top-[13%]">
                <Header className="max-w-3xl" />
              </div>
              {FASI.map((fase, index) => (
                <FaseFocusItem
                  key={fase.numero}
                  index={index}
                  progress={progress}
                  positionClass={POSITIONS[index]}
                />
              ))}
              {/* CTA sotto la 5ª fase, rivelata dallo scorrimento */}
              <div className="absolute left-[3%] top-[146%]">
                <Cta />
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
