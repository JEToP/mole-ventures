"use client";

/**
 * ValoriSection — Sticky storytelling (scrubbing classico, niente snap)
 * ------------------------------------------------------------------
 * Pattern: la sezione è "pinnata" (sticky) e i valori si succedono come
 * slide a tutto schermo mentre si scrolla. Lo scrubbing segue la rotella
 * 1:1 (nessuno snap, nessun aggancio automatico): si scorre liberamente e i
 * valori entrano/escono piano piano. Dietro a ogni valore un watermark icon
 * in parallax su orbita più ampia (sale e cresce mentre scrolli).
 *
 * Dettagli:
 *  1. Niente blu vuoto: il PRIMO valore è pieno e centrato già a progress 0;
 *     l'ULTIMO resta pieno fino in fondo, poi si esce verso la sezione dopo.
 *  2. Niente sovrapposizione: ogni valore ha un plateau in cui è l'unico
 *     pienamente visibile; i due valori in transizione sono separati in
 *     verticale (uno esce in alto, l'altro entra dal basso). Le animazioni
 *     sono JS-driven (MotionValue tracciato a mano, non ScrollTimeline nativa)
 *     così l'opacità si azzera fuori finestra e non resta nulla "appiccicato".
 *  3. Pallini cliccabili: portano dolcemente al valore (smooth scroll nativo).
 *
 * Libreria: Framer Motion (già nel progetto). useScroll/useTransform per lo
 * scrubbing dichiarativo.
 *
 * Accessibilità: con prefers-reduced-motion la sezione collassa in una lista
 * verticale statica (nessun pin, nessun movimento).
 */

import Image from "next/image";
import { useCallback, useEffect, useRef } from "react";
import {
  motion,
  useScroll,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

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

const N = valori.length;

// ── Geometria scroll/slide ────────────────────────────────────────────────────
// Ogni valore occupa STEP_VH di scroll (meno di 100vh ⇒ avanzamento rapido).
// La sezione è alta N*STEP_VH; pinnata, scorre per (N*STEP_VH − 100)vh.
const STEP_VH = 66;
const SEG = 1 / N; // ampiezza (in progress 0..1) del segmento di ogni valore
const CROSSFADE = 0.046; // mezza ampiezza della transizione ai confini di segmento
//   ↑ più ampia ⇒ il cambio valore si distende su più scroll = più graduale
const Y_TRAVEL = 64; // px di scivolata in ingresso/uscita (separazione verticale)

// Centro del segmento del valore `i`, in progress [0..1]: è anche il punto di
// aggancio (snap). Sempre in (0,1), quindi nessun offset fuori range.
const center = (i: number) => (i + 0.5) * SEG;

// framer-motion accelera lo scrubbing via ScrollTimeline nativa (Element.animate),
// che vuole offset di keyframe in [0,1] e strettamente crescenti: `sanitize`
// clampa e forza l'incremento minimo (evita il TypeError dell'animate nativo).
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

// ──────────────────────────────────────────────────────────────────────────────
// Singola "slide". Plateau centrale (visibile da sola) + transizioni ai bordi.
// ──────────────────────────────────────────────────────────────────────────────
function Valore({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const valore = valori[index];
  const segStart = index * SEG;
  const segEnd = (index + 1) * SEG;
  const isFirst = index === 0;
  const isLast = index === N - 1;

  // ── Opacità: plateau pieno, dissolvenza breve ai confini ───────────────────
  // Primo: pieno da progress 0 (nessun fade-in). Ultimo: pieno fino a 1.
  let opStops: number[];
  let opValues: number[];
  if (isFirst) {
    opStops = [segEnd - CROSSFADE, segEnd + CROSSFADE];
    opValues = [1, 0];
  } else if (isLast) {
    opStops = [segStart - CROSSFADE, segStart + CROSSFADE];
    opValues = [0, 1];
  } else {
    opStops = [
      segStart - CROSSFADE,
      segStart + CROSSFADE,
      segEnd - CROSSFADE,
      segEnd + CROSSFADE,
    ];
    opValues = [0, 1, 1, 0];
  }
  const opacity = useTransform(progress, sanitize(opStops), opValues);

  // ── Testo: fermo (y=0) nel plateau, entra dal basso / esce in alto ─────────
  let slideStops: number[];
  let yValues: number[];
  let scaleValues: number[];
  if (isFirst) {
    slideStops = [segEnd - CROSSFADE, segEnd];
    yValues = [0, -Y_TRAVEL];
    scaleValues = [1, 0.96];
  } else if (isLast) {
    slideStops = [segStart, segStart + CROSSFADE];
    yValues = [Y_TRAVEL, 0];
    scaleValues = [0.94, 1];
  } else {
    slideStops = [segStart, segStart + CROSSFADE, segEnd - CROSSFADE, segEnd];
    yValues = [Y_TRAVEL, 0, 0, -Y_TRAVEL];
    scaleValues = [0.94, 1, 1, 0.96];
  }
  const slideRange = sanitize(slideStops);
  const y = useTransform(progress, slideRange, yValues);
  const scale = useTransform(progress, slideRange, scaleValues);

  // ── Watermark: parallax CONTINUO su tutto il segmento (raggio più ampio del
  // testo). Mentre scrolli sale e cresce: l'icona "da sotto" è più grande e
  // si muove su un'orbita diversa dal contenuto.
  const wmRange = sanitize([segStart, center(index), segEnd]);
  const wmY = useTransform(progress, wmRange, [130, 0, -130]);
  // Scala simmetrica e SENZA crescere oltre il normale (niente "rimbalzo"):
  // al centro resta alla dimensione a riposo (1.0), ai due estremi solo un po'
  // più piccola in entrata dal basso e in uscita verso l'alto.
  const wmScale = useTransform(progress, wmRange, [0.92, 1.0, 0.92]);

  return (
    <motion.div
      style={{ opacity, willChange: "opacity" }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
    >
      <motion.div
        style={{ y, scale, willChange: "transform" }}
        className="relative w-full max-w-4xl [transform-style:preserve-3d]"
      >
        {/* Watermark icon in parallax: line-art SVG (tratto bianco) reso
            direttamente — visibile e affidabile. Niente CSS-mask: con SVG a
            solo tratto la maschera rendeva linee sottilissime, di fatto
            invisibili. Qui glow brand + opacità leggibile. */}
        <motion.div
          aria-hidden="true"
          style={{ y: wmY, scale: wmScale, willChange: "transform" }}
          className="pointer-events-none absolute -top-10 -right-4 md:-top-24 md:-right-8 z-0 opacity-[0.22] [filter:drop-shadow(0_0_22px_rgba(127,176,224,0.55))]"
        >
          <Image
            src={valore.icon}
            alt=""
            width={420}
            height={420}
            className="w-52 h-52 md:w-[26rem] md:h-[26rem] object-contain"
            unoptimized
          />
        </motion.div>

        {/* Contenuto */}
        <div className="relative z-10">
          {/* Eyebrow: numero progressivo del valore */}
          <span className="block font-body text-sm md:text-base font-light tracking-[0.25em] text-blue-soft/70 mb-4">
            {String(index + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
          </span>

          {/* Titolo con gradiente brand */}
          <h3 className="font-heading text-4xl md:text-6xl font-semibold leading-[1.05] mb-5 w-fit bg-gradient-to-br from-white via-blue-soft to-blue-kinetic bg-clip-text text-transparent">
            {valore.name}
          </h3>

          {/* Descrizione */}
          <p className="font-body font-light text-white/80 text-lg md:text-xl leading-relaxed max-w-2xl">
            {valore.description}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

// Pallino dell'indicatore: si illumina e si ingrandisce quando la sua slide è
// al centro del proprio segmento.
function ProgressDot({
  index,
  progress,
  onSelect,
}: {
  index: number;
  progress: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const c = center(index);
  const range = sanitize([c - SEG / 2, c, c + SEG / 2]);
  const opacity = useTransform(progress, range, [0.3, 1, 0.3]);
  const scale = useTransform(progress, range, [1, 1.5, 1]);
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-label={`Vai al valore ${index + 1}: ${valori[index].name}`}
      // padding negativo: area cliccabile generosa senza alterare il layout
      className="grid place-items-center p-2 -m-2 cursor-pointer"
    >
      <motion.span
        style={{ opacity, scale, willChange: "transform, opacity" }}
        className="block h-1.5 w-1.5 rounded-full bg-blue-soft transition-colors hover:bg-white"
      />
    </button>
  );
}

export default function ValoriSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Progresso JS-driven: tracciamo scrollYProgress a mano in un MotionValue
  // normale (NON la molla). Due motivi:
  //  • Niente ScrollTimeline nativa (WAAPI): collegando le useTransform a un
  //    valore "manuale" framer resta sul percorso JS, che azzera l'opacità
  //    fuori finestra → un solo valore alla volta (niente "Rispetto" residuo).
  //  • Niente overshoot: segue lo scroll 1:1, senza il rimbalzo della molla
  //    (saliva e tornava giù). La morbidezza la dà l'ease dell'aggancio sotto.
  const progress = useMotionValue(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => progress.set(v));
  useEffect(() => {
    progress.set(scrollYProgress.get()); // sincronizza al primo render
  }, [progress, scrollYProgress]);

  const barWidth = useTransform(progress, [0, 1], ["0%", "100%"]);

  // ── Niente snap né aggancio: lo scrubbing segue la rotella 1:1 (scorrimento
  // classico). L'unico scroll programmato è il click esplicito su un pallino,
  // che porta dolcemente al valore corrispondente con lo smooth scroll nativo.
  const scrollToValue = useCallback((i: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const range = el.offsetHeight - window.innerHeight;
    if (range <= 0) return;
    const targetP = (i + 0.5) / N;
    window.scrollTo({
      top: Math.round(el.offsetTop + targetP * range),
      behavior: "smooth",
    });
  }, []);

  // ── Sfondo (condiviso) ──────────────────────────────────────────────────────
  const Background = (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-kinetic opacity-50 blur-[120px] md:blur-[160px]" />
      <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-soft opacity-25 blur-[120px] md:blur-[160px]" />
      <div className="absolute -bottom-[10%] left-0 w-[70%] h-[70%] rounded-full bg-[#2E73C4] opacity-30 blur-[120px] md:blur-[160px]" />
    </div>
  );

  // ── Header (condiviso) ──────────────────────────────────────────────────────
  const Header = (
    <>
      <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-4">
        I nostri valori
      </h2>
      <span className="block h-1 w-12 bg-blue-soft rounded-full" />
    </>
  );

  // ── Fallback statico: reduced motion → lista verticale, niente pin ──────────
  if (reduce) {
    return (
      <section className="relative w-full overflow-hidden bg-[#030d3d] py-20 md:py-24 px-6 md:px-12">
        {Background}
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="mb-16">{Header}</div>
          <div className="flex flex-col gap-16">
            {valori.map((valore, i) => (
              <div key={valore.id} className="flex flex-col gap-4">
                <span className="font-body text-sm font-light tracking-[0.25em] text-blue-soft/70">
                  {String(i + 1).padStart(2, "0")} / {String(N).padStart(2, "0")}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl font-semibold leading-tight w-fit bg-gradient-to-br from-white via-blue-soft to-blue-kinetic bg-clip-text text-transparent">
                  {valore.name}
                </h3>
                <p className="font-body font-light text-white/80 text-lg leading-relaxed max-w-2xl">
                  {valore.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ── Versione animata: sezione alta N×STEP_VH, contenuto pinnato ─────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030d3d]"
      style={{ height: `${N * STEP_VH}vh` }}
    >
      {/* Schermata pinnata */}
      <div className="sticky top-0 h-screen w-full overflow-hidden [perspective:1200px]">
        {Background}

        {/* Intestazione fissa in alto */}
        <div className="absolute top-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
          {Header}
        </div>

        {/* Slide sovrapposte, ciascuna controlla la propria visibilità */}
        <div className="relative h-full w-full">
          {valori.map((valore, index) => (
            <Valore key={valore.id} index={index} progress={progress} />
          ))}
        </div>

        {/* Indicatore di progresso in basso */}
        <div className="absolute bottom-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pb-10 md:pb-12">
          <div className="flex items-center gap-4">
            <div className="relative h-0.5 flex-1 bg-white/15 rounded-full overflow-hidden">
              <motion.div
                style={{ width: barWidth }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-soft to-blue-kinetic rounded-full"
              />
            </div>
            <div className="hidden md:flex items-center gap-2">
              {valori.map((v, i) => (
                <ProgressDot
                  key={v.id}
                  index={i}
                  progress={progress}
                  onSelect={scrollToValue}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
