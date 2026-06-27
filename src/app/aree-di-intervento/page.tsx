"use client";

import Image from "next/image";
import Link from "next/link";
import type { CSSProperties, TouchEvent } from "react";
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
  const [activeStep, setActiveStep] = useState(0);

  const showPrevious = () => setActiveStep((current) => current - 1);
  const showNext = () => setActiveStep((current) => current + 1);

  return (
    <div className="overflow-x-hidden bg-[#030d3d] text-white">
      <HeroAree />
      <AreeSelector
        activeStep={activeStep}
        onSelectStep={setActiveStep}
        onPrevious={showPrevious}
        onNext={showNext}
      />
      <AreeContactBand />
    </div>
  );
}

// ── HERO ──────────────────────────────────────────────────────────────────────
function HeroAree() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-4 md:pt-[152px] md:pb-8 overflow-hidden bg-[#05155E]">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/background_areeintervento.webp"
          alt="Background aree di intervento"
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
      </div>

      {/* Overlay come da Figma: colore #000110 al 37% */}
      <div className="absolute inset-0 bg-[#000110]/[0.37]" />

      {/* Sfumatura in alto: navy nella safe area che sfuma dolcemente (mobile) */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#01061A] from-[15%] via-[#01061A]/50 via-[50%] to-transparent md:hidden z-0" />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
            Le aree di intervento
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
            <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
              Lavoriamo all&apos;interno del sistema azienda con azioni quotidiane su tutte le
              principali aree e funzioni aziendali per innestare le dinamiche necessarie
              all&apos;esecuzione del piano di sviluppo condiviso.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── SELECTOR (carousel) ───────────────────────────────────────────────────────
type SelectorProps = {
  activeStep: number;
  onSelectStep: (step: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

function AreeSelector({ activeStep, onSelectStep, onPrevious, onNext }: SelectorProps) {
  const [contentSoftened, setContentSoftened] = useState(false);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const skipClickRef = useRef(false);
  const contentTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (contentTimerRef.current !== null) {
        window.clearTimeout(contentTimerRef.current);
      }
    };
  }, []);

  const softenCardContent = () => {
    if (contentTimerRef.current !== null) {
      window.clearTimeout(contentTimerRef.current);
    }
    setContentSoftened(true);
    contentTimerRef.current = window.setTimeout(() => {
      setContentSoftened(false);
      contentTimerRef.current = null;
    }, 620);
  };

  const showSoftPrevious = () => {
    softenCardContent();
    onPrevious();
  };

  const showSoftNext = () => {
    softenCardContent();
    onNext();
  };

  const selectStep = (step: number) => {
    if (step === activeStep) return;
    softenCardContent();
    onSelectStep(step);
  };

  const handleCardClick = (step: number) => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }
    selectStep(step);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
    skipClickRef.current = false;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    const touchStart = touchStartRef.current;
    const touch = event.changedTouches[0];
    touchStartRef.current = null;
    if (!touchStart || !touch) return;

    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const horizontalSwipe =
      Math.abs(deltaX) > 46 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;
    if (!horizontalSwipe) return;

    event.preventDefault();
    skipClickRef.current = true;

    if (deltaX > 0) {
      showSoftPrevious();
    } else {
      showSoftNext();
    }

    window.setTimeout(() => {
      skipClickRef.current = false;
    }, 350);
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#05155E] py-16 md:py-20 lg:py-24">
      {/* Onde di luce espansive e morbide (effetto glow simile alla contact band) */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-[100px] -left-[150px] w-[1000px] h-[300px] rotate-[12deg] rounded-[100%] bg-gradient-to-r from-blue-soft/90 from-30% to-blue-kinetic/80 blur-[140px]" />
      <div aria-hidden="true" className="pointer-events-none absolute -bottom-[100px] -right-[150px] w-[1200px] h-[300px] rotate-[8deg] rounded-[100%] bg-gradient-to-l from-blue-soft/90 from-30% to-blue-kinetic/80 blur-[140px]" />

      {/* Carousel desktop */}
      <div className="relative z-10 hidden h-[720px] w-full lg:block" style={desktopCarouselStyle}>
        {getLoopCards(activeStep).map(({ area, step, offset }) => {
          const active = offset === 0;
          return (
            <AreaCardButton
              key={step}
              area={area}
              active={active}
              compact={!active}
              desktopWheel
              contentSoftened={contentSoftened}
              onClick={() => handleCardClick(step)}
              className="absolute left-1/2 top-[46%]"
              style={getDesktopCardStyle(offset)}
            />
          );
        })}

        <CarouselArrows
          onPrevious={showSoftPrevious}
          onNext={showSoftNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        />
      </div>

      {/* Carousel mobile/tablet */}
      <div
        className="relative z-10 h-[680px] w-full lg:hidden"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
      >
        {getLoopCards(activeStep).map(({ area, step, offset }) => {
          const active = offset === 0;
          return (
            <AreaCardButton
              key={step}
              area={area}
              active={active}
              compact={!active}
              contentSoftened={contentSoftened}
              onClick={() => handleCardClick(step)}
              className="absolute left-1/2 top-[43%]"
              style={getMobileCardStyle(offset)}
            />
          );
        })}

        <CarouselArrows
          onPrevious={showSoftPrevious}
          onNext={showSoftNext}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        />
      </div>
    </section>
  );
}

// ── Geometria del carousel ────────────────────────────────────────────────────
const desktopCarouselStyle = {
  "--desktop-active-card-width": "clamp(300px, 40vw, 340px)",
  "--desktop-small-card-width": "clamp(196px, 28vw, 238px)",
  "--desktop-card-gap":
    "clamp(80px, calc((100vw - var(--desktop-active-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width)) / 6), 170px)",
} as CSSProperties;

const carouselCardTransition =
  "transform 760ms cubic-bezier(0.22, 1, 0.36, 1), opacity 620ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 760ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease";

// Finestra di card centrata sullo step attivo. Chiave = step assoluto, così
// le card che escono/entrano ai bordi si smontano/montano invece di
// "teletrasportarsi" da un lato all'altro (causa del bug in transizione).
function getLoopCards(activeStep: number) {
  return [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
    const step = activeStep + offset;
    const index = getAreaIndex(step);
    return { area: AREAS[index], step, offset };
  });
}

function getAreaIndex(step: number) {
  return ((step % AREAS.length) + AREAS.length) % AREAS.length;
}

function getDesktopCardStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  const sign = offset >= 0 ? "+" : "-";
  const desktopSteps: Record<number, string> = {
    1: "calc((var(--desktop-active-card-width) / 2) + var(--desktop-card-gap) + (var(--desktop-small-card-width) / 2))",
    2: "calc((var(--desktop-active-card-width) / 2) + var(--desktop-card-gap) + var(--desktop-small-card-width) + var(--desktop-card-gap) + (var(--desktop-small-card-width) / 2))",
    3: "60vw",
  };
  const x =
    offset === 0
      ? "-50%"
      : `calc(-50% ${sign} ${desktopSteps[distance] ?? desktopSteps[3]})`;

  return {
    transform: `translate3d(${x}, -50%, 0) scale(${distance === 0 ? 1 : 0.82})`,
    transition: carouselCardTransition,
    zIndex: 30 - distance,
    opacity: distance > 2 ? 0 : distance > 1 ? 0.74 : 1,
    pointerEvents: distance > 2 ? "none" : "auto",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
  };
}

function getMobileCardStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  const sign = offset >= 0 ? "+" : "-";
  const mobileSteps: Record<number, string> = {
    1: "clamp(220px, 64vw, 264px)",
    2: "clamp(404px, 112vw, 460px)",
    3: "clamp(560px, 150vw, 640px)",
  };
  const x =
    offset === 0
      ? "-50%"
      : `calc(-50% ${sign} ${mobileSteps[distance] ?? mobileSteps[3]})`;

  return {
    transform: `translate3d(${x}, -50%, 0) scale(${distance === 0 ? 1 : 0.62})`,
    transition: carouselCardTransition,
    zIndex: 30 - distance,
    opacity: distance > 2 ? 0 : distance > 1 ? 0.55 : 1,
    pointerEvents: distance > 2 ? "none" : "auto",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
  };
}

// ── Stili tipografici delle card (dimensioni fluide) ──────────────────────────
type CardTextStyles = {
  title?: CSSProperties;
  description?: CSSProperties;
};

function getDesktopCardTextStyles(): CardTextStyles {
  return {
    title: { fontSize: "max(32px, calc((100cqw - 4rem) / 5.5))" },
    description: {
      fontSize: "max(14px, calc((100cqw - 4rem) / 10.5))",
      lineHeight: "1.5",
      letterSpacing: "0.005em",
    },
  };
}

function getMobileCardTextStyles(): CardTextStyles {
  return {
    title: { fontSize: "clamp(26px, calc((100cqw - 4rem) / 4.5), 40px)" },
    description: {
      fontSize: "clamp(13px, calc((100cqw - 4rem) / 10), 24px)",
      lineHeight: "1.5",
      letterSpacing: "0.02em",
    },
  };
}

function getCardTextStyles(desktopWheel: boolean): CardTextStyles {
  return desktopWheel ? getDesktopCardTextStyles() : getMobileCardTextStyles();
}

// ── Card area ─────────────────────────────────────────────────────────────────
type AreaCardButtonProps = {
  area: (typeof AREAS)[number];
  active?: boolean;
  compact?: boolean;
  contentSoftened?: boolean;
  desktopWheel?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick: () => void;
};

function AreaCardButton({
  area,
  active = false,
  compact = false,
  contentSoftened = false,
  desktopWheel = false,
  className = "",
  style,
  onClick,
}: AreaCardButtonProps) {
  const singleWordTitle = typeof area.title === "string" && !area.title.includes(" ");
  const numberSize = desktopWheel ? "text-[76px]" : "text-[80px]";
  const cardTextStyles = getCardTextStyles(desktopWheel);
  const descriptionSize = compact ? "line-clamp-[8]" : "";
  const descriptionText = Array.isArray(area.description)
    ? area.description.join(" ")
    : area.description;

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      aria-pressed={active}
      aria-label={`Area ${area.number}: ${Array.isArray(area.title) ? area.title.join(" ") : area.title}`}
      className={`${className} group min-w-0 overflow-hidden rounded-2xl border text-center backdrop-blur-md [container-type:inline-size] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05155E] ${active
        ? "border-white/40 bg-[#05155E]/60 shadow-[0_0_40px_rgba(255,255,255,0.2),0_24px_60px_rgba(255,255,255,0.1),inset_0_1px_24px_rgba(255,255,255,0.15)]"
        : "border-white/10 bg-[#05155E]/30 shadow-[0_14px_36px_rgba(255,255,255,0.07)] hover:border-white/30"
        } ${desktopWheel
          ? "h-[clamp(480px,48vw,560px)] w-[var(--desktop-active-card-width)] px-8 py-9"
          : "h-[clamp(490px,42vw,560px)] w-[clamp(280px,26vw,340px)] px-8 py-9"
        }`}
    >
      <div
        className={`flex h-full flex-col items-center transition-[opacity,filter] duration-200 ease-out ${contentSoftened ? "opacity-60 blur-[0.25px]" : "opacity-100 blur-0"
          }`}
      >
        {/* Numero – bianco, centrato */}
        <span
          className={`block font-heading font-semibold leading-none tracking-tight text-white ${numberSize}`}
        >
          {area.number}
        </span>

        {/* Titolo – bianco, centrato */}
        <span
          style={cardTextStyles.title}
          className={`mt-4 block font-heading font-semibold leading-[1.05] text-white ${singleWordTitle ? "whitespace-nowrap" : "text-balance"
            }`}
        >
          {Array.isArray(area.title)
            ? area.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
            : area.title}
        </span>

        {/* Descrizione – allineata a sinistra */}
        <span
          style={cardTextStyles.description}
          className={`mt-4 block w-full text-left overflow-hidden break-words font-body font-light text-white ${descriptionSize}`}
        >
          {descriptionText}
        </span>
      </div>
    </button>
  );
}

// ── Frecce ────────────────────────────────────────────────────────────────────
type CarouselArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
};

function CarouselArrows({ onPrevious, onNext, className = "" }: CarouselArrowsProps) {
  return (
    <div className={`flex items-center justify-center gap-12 ${className}`}>
      <button
        type="button"
        onClick={onPrevious}
        className="flex items-center justify-center text-white transition hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        aria-label="Area precedente"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="flex items-center justify-center text-white transition hover:text-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50 rounded"
        aria-label="Area successiva"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

// ── Contact band finale ───────────────────────────────────────────────────────
function AreeContactBand() {
  return (
    <section className="relative w-full overflow-hidden bg-[#05155E]">
      {/* Background image (ha già il suo gradiente, nessun overlay) */}
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

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Riga superiore: testo a sinistra */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-[1.1]">
              Costruiamo insieme la prossima fase<br />della tua impresa
            </h2>
            <p className="font-body font-light text-white text-base md:text-lg leading-relaxed max-w-xl">
              Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
            </p>
          </div>
        </div>

        {/* Bottone */}
        <div className="flex justify-center md:justify-start">
          <Link
            href="/contatti"
            className="group inline-flex items-center gap-3 bg-white text-[#05155E] font-body font-semibold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(76,172,248,0.35)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft focus-visible:ring-offset-2 focus-visible:ring-offset-[#05155E]"
          >
            Contattaci
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}