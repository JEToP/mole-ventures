"use client";

/**
 * LeFasiInterventoSection — focus "pinnato" guidato dallo scroll.
 *
 * Desktop: la sezione del pin è alta e il contenuto è pinnato (sticky). Le prime
 * 4 fasi sono visibili nella loro disposizione sparsa; scorrendo, il focus passa
 * in ordine 1→2→3→4 (attivo pieno e leggermente più grande, gli altri opachi).
 * Lo scrubbing segue la rotella 1:1 (framer-motion), morbido, niente scatti.
 * Alla fine del pin la pagina riprende a scorrere: la 5ª fase e la call to action
 * scorrono in continuità sullo stesso sfondo.
 *
 * Mobile: punti impilati uno sotto l'altro (nessun pin); il focus scorre con la
 * pagina. Reduced motion: lista statica, tutto a piena opacità.
 */

import Image from "next/image";
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

// Solo le prime 4 fasi sono pinnate; la 5ª è la continuazione dopo il pin.
const PINNED = FASI.slice(0, 4);
const PN = PINNED.length;
const SEG = 1 / PN;
const CROSSFADE = SEG * 0.34;

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

// Disposizione sparsa su desktop (lg+) per le 4 fasi pinnate. Sotto lg: impilate.
const POSITIONS = [
  "lg:absolute lg:left-[2%] lg:top-[17%] lg:w-[27%]",
  "lg:absolute lg:left-[39%] lg:top-[13%] lg:w-[23%]",
  "lg:absolute lg:left-[71%] lg:top-[21%] lg:w-[27%]",
  "lg:absolute lg:left-[3%] lg:top-[61%] lg:w-[60%]",
];

function FaseContent({
  index,
  numberClass = "",
  numberStyle,
  titleClass = "",
  descClass = "",
}: {
  index: number;
  numberClass?: string;
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
        className={`block font-heading text-5xl font-semibold leading-none tracking-normal text-white md:text-[64px] ${numberClass}`}
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
  const segStart = index * SEG;
  const segEnd = (index + 1) * SEG;

  let stops: number[];
  let values: number[];
  if (index === 0) {
    stops = [segEnd - CROSSFADE, segEnd + CROSSFADE];
    values = [1, 0];
  } else if (index === PN - 1) {
    stops = [segStart - CROSSFADE, segStart + CROSSFADE];
    values = [0, 1];
  } else {
    stops = [segStart - CROSSFADE, segStart + CROSSFADE, segEnd - CROSSFADE, segEnd + CROSSFADE];
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
      className={`relative w-full max-w-full min-w-0 ${positionClass}`}
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

function Background() {
  return (
    <>
      <div className="absolute inset-0">
        <Image
          src="/images/background_contatti.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-blue-deep/35" />
    </>
  );
}

function Header() {
  return (
    <header className="max-w-3xl min-w-0">
      <h2
        id="fasi-heading"
        className="break-words font-heading text-3xl font-semibold leading-none tracking-normal text-white md:text-[40px]"
      >
        Le 5 fasi dell&apos;intervento
      </h2>
      <p className="mt-5 max-w-full break-words font-body text-[15px] font-normal leading-[1.5] text-white/90 md:text-[16px] lg:hidden">
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
    <div className="flex justify-center">
      <Link
        href="/aree-di-intervento"
        className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-body text-base font-semibold text-blue-deep transition-colors duration-300 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep md:text-lg"
      >
        Scopri le aree di intervento
        <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
      </Link>
    </div>
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

  // ── Reduced motion: lista statica, tutto pieno ──────────────────────────────
  if (reduce) {
    return (
      <section
        aria-labelledby="fasi-heading"
        className="relative w-full overflow-hidden bg-blue-deep px-6 py-20 md:px-12 md:py-28"
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
          <div className="mt-16">
            <Cta />
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="relative w-full bg-blue-deep">
      {/* Sfondo unico e continuo dietro tutta l'esperienza (pin + continuazione):
          su desktop è pinnato (sticky) così resta fermo e non si vede nessuno
          stacco tra le sezioni. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="h-full lg:sticky lg:top-0 lg:h-screen">
          <Background />
        </div>
      </div>

      {/* Binario di scroll del PIN: fasi 1–4. Desktop alto per il pin; mobile auto */}
      <section
        ref={sectionRef}
        aria-labelledby="fasi-heading"
        className="relative w-full lg:h-[340vh]"
      >
        <div className="relative w-full overflow-hidden px-6 pt-20 pb-12 md:px-12 md:pt-24 lg:sticky lg:top-0 lg:h-screen lg:py-0">
          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col min-w-0 lg:block">
            <div className="lg:hidden">
              <Header />
            </div>
            <div className="mt-12 flex flex-col gap-12 lg:mt-0 lg:block lg:h-full">
              {PINNED.map((fase, index) => (
                <FaseFocusItem
                  key={fase.numero}
                  index={index}
                  progress={progress}
                  positionClass={POSITIONS[index]}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Continuazione: 5ª fase + CTA. Sfondo trasparente → mostra lo sfondo unico */}
      <section className="relative w-full px-6 pb-20 pt-10 md:px-12 md:pb-28 md:pt-12">
        <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
          <motion.article
            initial={{ opacity: 0.45, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl min-w-0"
          >
            <FaseContent index={4} descClass="md:text-[18px]" />
          </motion.article>

          <div className="mt-14 md:mt-20">
            <Cta />
          </div>
        </div>
      </section>
    </div>
  );
}
