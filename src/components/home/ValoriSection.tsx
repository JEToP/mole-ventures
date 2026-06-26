"use client";

/**
 * ValoriSection — Full-screen sticky storytelling
 * ------------------------------------------------------------------
 * Pattern: la sezione viene "pinnata" (sticky) e i valori si succedono
 * come tappe a tutto schermo mentre si scrolla. Ogni valore ottiene il
 * suo momento, con un watermark icon in parallax e un ingresso sfalsato.
 *
 * Perché questo pattern e non l'horizontal scroll:
 * - I valori sono un "sistema" di principi vissuti come tappe di un
 *   percorso di trasformazione → lo storytelling verticale lo rende.
 * - Lo scroll resta verticale (atteso, ottimo su mobile e iOS Safari),
 *   niente scroll orizzontale forzato da degradare.
 *
 * Libreria: Framer Motion. Vive nativamente in React/Next; useScroll/
 * useTransform coprono lo scrubbing senza un motore imperativo esterno.
 *   npm i framer-motion
 *
 * Accessibilità: con prefers-reduced-motion la sezione collassa in una
 * lista verticale statica e leggibile (nessun pin, nessun movimento).
 */

import { useRef } from "react";
import {
  motion,
  useScroll,
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

// ──────────────────────────────────────────────────────────────────────────────
// Singola "tappa" a tutto schermo. Riceve il progresso globale [0..1] e
// calcola la propria finestra di visibilità: opacità, scala, slittamento,
// più il watermark in parallax.
// ──────────────────────────────────────────────────────────────────────────────
function Valore({
  valore,
  index,
  progress,
}: {
  valore: (typeof valori)[number];
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const mid = (start + end) / 2;

  // Opacità: entra, resta piena, esce.
  const opacity = useTransform(
    progress,
    [start, start + 0.04, end - 0.04, end],
    [0, 1, 1, 0]
  );
  // Profondità: leggero slittamento e scala su ingresso/uscita.
  const y = useTransform(progress, [start, mid, end], [60, 0, -60]);
  const scale = useTransform(progress, [start, mid, end], [0.94, 1, 0.98]);
  // Watermark in parallax: si muove più lentamente del contenuto e scala.
  const wmY = useTransform(progress, [start, end], [120, -120]);
  const wmScale = useTransform(progress, [start, mid, end], [0.85, 1, 1.1]);

  return (
    <motion.div
      style={{ opacity, willChange: "opacity" }}
      className="absolute inset-0 flex items-center justify-center px-6 md:px-12"
    >
      <motion.div
        style={{ y, scale, willChange: "transform" }}
        className="relative w-full max-w-4xl"
      >
        {/* Watermark icon in parallax: l'SVG fa da maschera, dietro un
            gradiente brand animato che scorre ("shimmer"). */}
        <motion.div
          aria-hidden="true"
          style={{
            y: wmY,
            scale: wmScale,
            willChange: "transform",
            WebkitMaskImage: `url(${valore.icon})`,
            maskImage: `url(${valore.icon})`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskPosition: "center",
            maskPosition: "center",
          }}
          className="pointer-events-none absolute -top-8 -right-2 md:-top-16 md:right-0 z-0 w-40 h-40 md:w-72 md:h-72 opacity-40 bg-[linear-gradient(145deg,_#FFFFFF_0%,_#CFE6FB_30%,_#7FB0E0_55%,_#3E6699_80%,_#A8C8E8_100%)] bg-[length:300%_300%] animate-[valori-shimmer_8s_ease-in-out_infinite] [filter:drop-shadow(0_1px_0_rgba(255,255,255,0.4))_drop-shadow(0_-1px_1px_rgba(0,0,0,0.5))]"
        />

        {/* keyframes per lo scorrimento del gradiente sull'icona */}
        <style>{`
          @keyframes valori-shimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
          }
        `}</style>

        {/* Contenuto */}
        <div className="relative z-10">
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

// Pallino dell'indicatore: si illumina quando la sua tappa è attiva.
function ProgressDot({
  index,
  progress,
}: {
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  // Punti di input strettamente crescenti e clampati in [0, 1].
  const a = Math.max(0, start - 0.0001);
  const b = start;
  const c = Math.max(b + 0.0001, end - 0.0001);
  const d = Math.min(1, c + 0.0001);
  const opacity = useTransform(progress, [a, b, c, d], [0.3, 1, 1, 0.3]);
  const scale = useTransform(progress, [a, b, c, d], [1, 1.4, 1.4, 1]);
  return (
    <motion.span
      style={{ opacity, scale }}
      className="h-1.5 w-1.5 rounded-full bg-blue-soft"
    />
  );
}

export default function ValoriSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const barWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

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
            {valori.map((valore) => (
              <div key={valore.id} className="flex flex-col gap-4">
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

  // ── Versione animata: sezione alta N×100vh, contenuto pinnato ───────────────
  return (
    <section
      ref={sectionRef}
      className="relative w-full bg-[#030d3d]"
      style={{ height: `${N * 100}vh` }}
    >
      {/* Schermata pinnata */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {Background}

        {/* Intestazione fissa in alto */}
        <div className="absolute top-0 left-0 right-0 z-20 max-w-7xl mx-auto px-6 md:px-12 pt-16 md:pt-20">
          {Header}
        </div>

        {/* Tappe sovrapposte, ciascuna controlla la propria visibilità */}
        <div className="relative h-full w-full">
          {valori.map((valore, index) => (
            <Valore
              key={valore.id}
              valore={valore}
              index={index}
              progress={scrollYProgress}
            />
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
                <ProgressDot key={v.id} index={i} progress={scrollYProgress} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}