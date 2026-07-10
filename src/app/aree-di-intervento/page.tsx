"use client";

import Image from "next/image";
import ScrollCue from "@/components/ScrollCue";
import dynamic from "next/dynamic";

const ContattiSection = dynamic(() => import("@/components/home/ContattiSection"));
import type { TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Dati aree di intervento.
// ──────────────────────────────────────────────────────────────────────────────
const AREAS = [
  {
    number: "01",
    title: ["Intervento", "Strategico"],
    description:
      "Costruiamo insieme da un lato il piano di sviluppo strategico e il suo deployment operativo per concentrarci su un'esecuzione rapida ed efficace del processo di trasformazione e dall'altro una visione chiara su dove portare l'azienda e sulle azioni necessarie per arrivarci.",
  },
  {
    number: "02",
    title: "Organizzazione",
    description:
      "Dopo aver analizzato la struttura organizzativa, la facciamo evolvere per rispondere al meglio ai bisogni del processo di trasformazione. Lavoriamo sulla retention delle persone chiave, sullo sviluppo dei talenti interni e sull'inserimento delle competenze necessarie, sui processi di delega e di responsabilizzazione. Un'azienda cresce e si sviluppa se crescono e si sviluppano le persone che la abitano.",
  },
  {
    number: "03",
    title: ["Operations e", "Finance"],
    description:
      "Ottimizziamo i processi operativi, dalla supply chain alla delivery. Definiamo le dashboard finanziarie, i KPI di redditività e gli eventuali miglioramenti, la mappa dei rischi con i piani di mitigazione. L'efficienza operativa e la continua attenzione all'incremento dei margini come motore della sostenibilità della crescita.",
  },
  {
    number: "04",
    title: ["Innovazione e", "digitalizzazione"],
    description:
      "La revisione dei processi e delle attività aziendali alla luce degli ultimi sviluppi legati all'AI, alle automazioni e alla digitalizzazione come fattori chiave dell'incremento di redditività. Valorizziamo dati, brevetti e know-how aziendale, rafforziamo la R&D interna per rendere l'azienda competitiva nel medio-lungo periodo e per non disperdere la trasmissione del know-how.",
  },
  {
    number: "05",
    title: ["Sales e Sviluppo", "Business"],
    description:
      "Lavoriamo per estendere e diversificare la catena del valore, il pricing e la gestione della marginalità. Costruiamo strategie di cross-selling e upselling legate ai punti di forza esistenti, sviluppiamo piani di marketing e di alleanze commerciali per estendere e incrementare l'offerta e il portafoglio clienti. Strutturiamo le azioni necessarie e la loro implementazione per favorire l'ingresso in nuovi mercati o geografie.",
  },
  {
    number: "06",
    title: "Next steps",
    description:
      "Definiamo la traiettoria successiva: operazioni M&A aggregative, espansione su nuovi mercati, ampliamento del portafoglio prodotti, fabbisogno di investimento e di competenze e ci attiviamo in prima persona per il deployment delle azioni necessarie.",
  },
];

export default function AreeDiIntervento() {
  return (
    <div className="overflow-x-hidden bg-[#030d3d] text-white">
      <HeroAree />
      <AreeSelector />
      <ContattiSection />
    </div>
  );
}


// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroAree() {
  return (
    <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden bg-blue-deep">
      {/* Background image */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <Image
          src="/images/hero/aree-intervento/aree-intervento-bg-def-mobile.webp"
          alt="Background aree di intervento"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACwAQCdASoGAAoABUB8JYwCdADzY3wAAM4TgGXpufyb1H1RCJ+gA4zPaySUAAAA"
          className="object-cover object-center md:hidden"
          sizes="100vw"
        />
        {/* Desktop image */}
        <Image
          src="/images/hero/aree-intervento/aree-intervento-bg-def-desktop.webp"
          alt="Background aree di intervento"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAADwAQCdASoKAAYABUB8JZQCdAD1eLgQPVAA/uXWIlAGnjwKprcM4gMFDsWZUAAA"
          className="object-cover object-center hidden md:block"
          sizes="100vw"
        />
      </div>

      {/* Velo bluastro leggerissimo: solo per rendere leggibile il testo bianco */}
      <div className="absolute inset-0 bg-blue-deep/20" />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
            Le aree di intervento
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
            <p className="font-body font-light text-white text-base md:text-xl leading-relaxed">
              Lavoriamo all&apos;interno del sistema azienda con azioni quotidiane su tutte le
              principali aree e funzioni aziendali per innestare le dinamiche necessarie
              all&apos;esecuzione del piano di sviluppo condiviso.
            </p>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}

// ── SELECTOR (track a scorrimento, no loop) ────────────────────────────────────
// Desktop: 3 card visibili della stessa dimensione + la successiva che si
// intravede sfocata a destra. Tablet: 2. Mobile: 1. Nessun loop: all'inizio non
// c'è nulla a sinistra, all'ultima card non c'è nulla a destra.
function AreeSelector() {
  const [activeStep, setActiveStep] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const measurerRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // viewportWidth = larghezza piena (per centrare e far sbordare le laterali).
  const [viewportWidth, setViewportWidth] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [cardHeight, setCardHeight] = useState<number>();

  useEffect(() => {
    const vp = viewportRef.current;
    if (!vp) return;
    const compute = () => {
      setViewportWidth(vp.clientWidth);
      setVisibleCount(
        window.matchMedia("(min-width: 1024px)").matches
          ? 3
          : window.matchMedia("(min-width: 768px)").matches
            ? 2
            : 1,
      );
    };
    compute();
    const ro = new ResizeObserver(compute);
    ro.observe(vp);
    window.addEventListener("resize", compute);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", compute);
    };
  }, []);

  const gap = visibleCount === 1 ? 16 : visibleCount === 2 ? 24 : 28;

  // Larghezza card:
  // - mobile (1): 1 card centrata, con un margine ai lati (peek) che fa capire
  //   che si può scorrere.
  // - desktop/tablet (2-3): le card riempiono la colonna centrale (max-w-7xl),
  //   e le laterali sbordano nei margini esterni.
  const cardWidth = (() => {
    if (viewportWidth <= 0) return 0;
    if (visibleCount === 1) {
      return Math.max(220, viewportWidth - 2 * 40);
    }
    const columnPad = 48; // px-12 su desktop
    const columnWidth = Math.min(viewportWidth, 1280) - 2 * columnPad;
    return Math.max(220, (columnWidth - (visibleCount - 1) * gap) / visibleCount);
  })();

  const maxStep = Math.max(0, AREAS.length - visibleCount);

  // Se cambia il breakpoint, riporta lo step attivo entro i limiti.
  useEffect(() => {
    setActiveStep((s) => Math.min(s, maxStep));
  }, [maxStep]);

  // Altezza uniforme: misura la card più alta alla larghezza corrente.
  useEffect(() => {
    const el = measurerRef.current;
    if (!el || !cardWidth) return;
    const measure = () => {
      let max = 0;
      for (const child of Array.from(el.children)) {
        max = Math.max(max, (child as HTMLElement).offsetHeight);
      }
      if (max) setCardHeight(max);
    };
    measure();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }
  }, [cardWidth, visibleCount]);

  // Track centrato: la finestra di card attive è sempre al centro del viewport,
  // così le card laterali (prev/next) si intravedono simmetriche ai due lati.
  const windowCenter =
    activeStep * (cardWidth + gap) +
    cardWidth / 2 +
    ((visibleCount - 1) * (cardWidth + gap)) / 2;
  const translate = viewportWidth / 2 - windowCenter;

  const canPrev = activeStep > 0;
  const canNext = activeStep < maxStep;

  const showPrevious = () => setActiveStep((s) => Math.max(0, s - 1));
  const showNext = () => setActiveStep((s) => Math.min(maxStep, s + 1));

  // Click su una card laterale (fuori dalla finestra attiva): la porta in vista.
  const bringIntoView = (i: number) =>
    setActiveStep((s) => {
      let t = s;
      if (i < s) t = i;
      else if (i >= s + visibleCount) t = i - visibleCount + 1;
      return Math.min(maxStep, Math.max(0, t));
    });

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const start = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!start || !touch) return;
    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    if (Math.abs(deltaX) < 46 || Math.abs(deltaX) < Math.abs(deltaY) * 1.25) return;
    if (deltaX > 0) showPrevious();
    else showNext();
  };

  const cardPadding = visibleCount === 1 ? "px-5 py-6" : "px-7 py-7";

  return (
    <section className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-blue-deep py-12 md:py-24">
      {/* Sfondo card */}
      <div className="absolute inset-0">
        <Image
          src="/images/background_chisiamo_mobile.webp"
          alt=""
          fill
          className="object-cover object-center md:hidden"
          sizes="100vw"
          aria-hidden="true"
        />
        <Image
          src="/images/cards-bg.webp"
          alt=""
          fill
          className="object-cover object-center hidden md:block"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      {/* Viewport a piena larghezza: le card attive coprono la colonna centrale,
          le laterali sbordano ai lati senza tagli netti. */}
      <div
        ref={viewportRef}
        className="relative z-10 w-full overflow-hidden"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
      >
        <div
          className="flex"
          style={{
            gap: `${gap}px`,
            transform: `translate3d(${translate}px, 0, 0)`,
            transition: "transform 640ms cubic-bezier(0.22, 1, 0.36, 1)",
            willChange: "transform",
          }}
        >
          {AREAS.map((area, i) => {
            const inView = i >= activeStep && i < activeStep + visibleCount;
            return (
              <button
                type="button"
                key={area.number}
                onClick={() => !inView && bringIntoView(i)}
                tabIndex={inView ? -1 : 0}
                style={{
                  flex: `0 0 ${cardWidth}px`,
                  height: cardHeight,
                  opacity: inView ? 1 : 0.4,
                  transform: inView ? "scale(1)" : "scale(0.9)",
                  transformOrigin: "center",
                  transition:
                    "opacity 500ms ease, transform 640ms cubic-bezier(0.22, 1, 0.36, 1)",
                }}
                className={`min-w-0 overflow-hidden rounded-2xl border text-left ${
                  inView
                    ? "border-white/15 bg-white/[0.05] cursor-default"
                    : "border-white/10 bg-white/[0.03] cursor-pointer"
                } [container-type:inline-size] ${cardPadding}`}
              >
                <AreaCardContent area={area} />
              </button>
            );
          })}
        </div>
      </div>

      <CarouselArrows
        onPrevious={showPrevious}
        onNext={showNext}
        canPrevious={canPrev}
        canNext={canNext}
        className="relative z-20 mt-10"
      />

      {/* Misuratore nascosto per l'altezza uniforme */}
      <div
        ref={measurerRef}
        aria-hidden="true"
        className="pointer-events-none invisible absolute left-0 top-0 h-0 overflow-hidden"
      >
        {AREAS.map((area) => (
          <div
            key={area.number}
            style={{ width: cardWidth ? `${cardWidth}px` : undefined }}
            className={`rounded-2xl border [container-type:inline-size] ${cardPadding}`}
          >
            <AreaCardContent area={area} />
          </div>
        ))}
      </div>
    </section>
  );
}

// ── Card area ─────────────────────────────────────────────────────────────────
function AreaCardContent({ area }: { area: (typeof AREAS)[number] }) {
  const titleText = Array.isArray(area.title) ? area.title.join(" ") : area.title;
  const descriptionText = Array.isArray(area.description)
    ? area.description.join(" ")
    : area.description;

  return (
    <div className="flex h-full flex-col text-left">
      <div className="flex flex-col items-start justify-center">
        <span className="block font-heading font-semibold leading-none tracking-tight text-white/85 text-4xl lg:text-5xl">
          {area.number}
        </span>
        <span className="mt-3 block font-heading font-semibold leading-[1.1] text-white text-2xl lg:text-[1.75rem] md:mt-4">
          {titleText}
        </span>
      </div>

      <div className="mt-3 flex flex-1 items-start justify-start md:mt-5">
        <span className="block w-full break-words text-start font-body font-light text-white text-[15px] lg:text-base leading-relaxed">
          {descriptionText}
        </span>
      </div>
    </div>
  );
}

// ── Frecce ────────────────────────────────────────────────────────────────────
type CarouselArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
  canPrevious: boolean;
  canNext: boolean;
  className?: string;
};

function CarouselArrows({
  onPrevious,
  onNext,
  canPrevious,
  canNext,
  className = "",
}: CarouselArrowsProps) {
  const base =
    "flex h-12 w-12 items-center justify-center rounded-full border text-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50";
  const enabled = "border-white/25 hover:border-white/60 hover:bg-white/5";
  const disabled = "border-white/10 opacity-30 cursor-not-allowed";

  return (
    <div className={`flex items-center justify-center gap-5 ${className}`}>
      <button
        type="button"
        onClick={onPrevious}
        disabled={!canPrevious}
        className={`${base} ${canPrevious ? enabled : disabled}`}
        aria-label="Area precedente"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={!canNext}
        className={`${base} ${canNext ? enabled : disabled}`}
        aria-label="Area successiva"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}
