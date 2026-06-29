"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ScrollCue from "@/components/ScrollCue";
import ContattiSection from "@/components/home/ContattiSection";
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

      <ScrollCue />
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
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const skipClickRef = useRef(false);

  // Tutte le card hanno la STESSA altezza: quella della card con il testo più
  // lungo. Un misuratore nascosto rende tutte le aree a testo pieno e riporta
  // l'altezza massima, che applichiamo al contenitore e a ogni card. Così
  // l'altezza non cambia mai al variare della card mostrata.
  const [desktopHeight, setDesktopHeight] = useState<number>();
  const [mobileHeight, setMobileHeight] = useState<number>();

  const showSoftPrevious = () => {
    onPrevious();
  };

  const showSoftNext = () => {
    onNext();
  };

  const selectStep = (step: number) => {
    if (step === activeStep) return;
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
    <section className="relative isolate flex w-full flex-col items-center justify-center overflow-hidden bg-blue-deep py-16 max-md:min-h-[100dvh] md:py-24">
      {/* Stesso sfondo della contact band "Costruiamo insieme": continuità */}
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

      {/* Misuratori nascosti (uno per breakpoint) per l'altezza uniforme */}
      <CardHeightMeasurer desktopWheel onResize={setDesktopHeight} />
      <CardHeightMeasurer desktopWheel={false} onResize={setMobileHeight} />

      {/* Carousel desktop */}
      <div
        className="relative z-10 hidden w-full lg:block"
        style={{ ...desktopCarouselStyle, height: desktopHeight ? `${desktopHeight}px` : undefined }}
      >
        {getLoopCards(activeStep).map(({ area, step, offset }) => {
          const active = offset === 0;
          return (
            <AreaCardButton
              key={step}
              area={area}
              active={active}
              compact={!active}
              desktopWheel
              onClick={() => handleCardClick(step)}
              className="absolute left-1/2 top-1/2"
              style={{ ...getDesktopCardStyle(offset), height: desktopHeight }}
            />
          );
        })}
      </div>

      {/* Carousel mobile/tablet */}
      <div
        className="relative z-10 w-full lg:hidden"
        style={{ ...mobileCarouselStyle, height: mobileHeight ? `${mobileHeight}px` : undefined, touchAction: "pan-y" }}
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
              onClick={() => handleCardClick(step)}
              className="absolute left-1/2 top-1/2"
              style={{ ...getMobileCardStyle(offset), height: mobileHeight }}
            />
          );
        })}
      </div>

      <CarouselArrows
        onPrevious={showSoftPrevious}
        onNext={showSoftNext}
        className="relative z-20 mt-8"
      />
    </section>
  );
}

// ── Geometria del carousel ────────────────────────────────────────────────────
// Le card laterali sono rese a scala ridotta: lo spostamento orizzontale tiene
// conto della loro larghezza reale (larghezza attiva × scala) così non si
// sovrappongono mai tra di loro.
const DESKTOP_SIDE_SCALE = 0.82;
const MOBILE_SIDE_SCALE = 0.66;

const desktopCarouselStyle = {
  "--desktop-active-card-width": "clamp(380px, 46vw, 480px)",
  "--desktop-card-gap": "clamp(28px, 3vw, 56px)",
} as CSSProperties;

const mobileCarouselStyle = {
  "--mobile-card-width": "clamp(310px, 92vw, 400px)",
  "--mobile-card-gap": "clamp(16px, 4vw, 28px)",
} as CSSProperties;

// Distanza del centro della card #n dal centro della card attiva:
//   activeW/2 + n·gap + (n − 0.5)·(activeW·scala)
function wheelOffset(distance: number, widthVar: string, gapVar: string, scale: number) {
  return `calc(${widthVar} / 2 + ${distance} * ${gapVar} + ${distance - 0.5} * ${widthVar} * ${scale})`;
}

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
  const step = wheelOffset(
    distance,
    "var(--desktop-active-card-width)",
    "var(--desktop-card-gap)",
    DESKTOP_SIDE_SCALE,
  );
  const x = offset === 0 ? "-50%" : `calc(-50% ${sign} ${step})`;

  return {
    transform: `translate3d(${x}, -50%, 0) scale(${distance === 0 ? 1 : DESKTOP_SIDE_SCALE})`,
    transition: carouselCardTransition,
    zIndex: 30 - distance,
    opacity: distance > 2 ? 0 : distance > 1 ? 0.5 : 1,
    pointerEvents: distance > 2 ? "none" : "auto",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
  };
}

function getMobileCardStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  const sign = offset >= 0 ? "+" : "-";
  const step = wheelOffset(
    distance,
    "var(--mobile-card-width)",
    "var(--mobile-card-gap)",
    MOBILE_SIDE_SCALE,
  );
  const x = offset === 0 ? "-50%" : `calc(-50% ${sign} ${step})`;

  return {
    transform: `translate3d(${x}, -50%, 0) scale(${distance === 0 ? 1 : MOBILE_SIDE_SCALE})`,
    transition: carouselCardTransition,
    zIndex: 30 - distance,
    opacity: distance > 2 ? 0 : distance > 1 ? 0.4 : 1,
    pointerEvents: distance > 2 ? "none" : "auto",
    willChange: "transform, opacity",
    backfaceVisibility: "hidden",
  };
}

// ── Stili tipografici rimossi a favore delle classi Tailwind ─────────

// ── Card area ─────────────────────────────────────────────────────────────────
// Classi del "box" card, condivise tra card reale e misuratore nascosto, così
// l'altezza misurata corrisponde esattamente a quella renderizzata.
const CARD_BOX_DESKTOP = "w-[var(--desktop-active-card-width)] px-8 py-7";
const CARD_BOX_MOBILE = "w-[var(--mobile-card-width)] px-5 py-6";

function AreaCardContent({
  area,
  desktopWheel,
  clamp = false,
}: {
  area: (typeof AREAS)[number];
  desktopWheel: boolean;
  clamp?: boolean;
}) {
  const titleText = Array.isArray(area.title) ? area.title.join(" ") : area.title;
  const descriptionText = Array.isArray(area.description)
    ? area.description.join(" ")
    : area.description;

  return (
    <div className="flex h-full flex-col text-center">
      {/* Numero e Titolo centrati */}
      <div className="flex flex-col items-center justify-center">
        <span
          className="block font-heading font-semibold leading-none tracking-tight text-white/85 text-4xl md:text-5xl lg:text-6xl"
        >
          {area.number}
        </span>
        <span
          className="mt-3 block font-heading font-semibold leading-[1.1] text-white text-[22px] md:text-3xl lg:text-4xl md:mt-4"
        >
          {titleText}
        </span>
      </div>

      {/* Descrizione */}
      <div className="mt-3 flex flex-1 items-center justify-center md:mt-5">
        <span
          className={`block w-full break-words font-body font-light text-white/85 text-[15px] md:text-[17px] leading-relaxed ${clamp ? "overflow-hidden line-clamp-[7]" : ""}`}
        >
          {descriptionText}
        </span>
      </div>
    </div>
  );
}

type AreaCardButtonProps = {
  area: (typeof AREAS)[number];
  active?: boolean;
  compact?: boolean;
  desktopWheel?: boolean;
  className?: string;
  style?: CSSProperties;
  onClick: () => void;
};

function AreaCardButton({
  area,
  active = false,
  compact = false,
  desktopWheel = false,
  className = "",
  style,
  onClick,
}: AreaCardButtonProps) {
  const titleText = Array.isArray(area.title) ? area.title.join(" ") : area.title;

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      aria-pressed={active}
      aria-label={`Area ${area.number}: ${titleText}`}
      className={`${className} group min-w-0 overflow-hidden rounded-2xl border text-left [container-type:inline-size] transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep ${active
        ? "border-white/25 bg-white/[0.05]"
        : "border-white/10 bg-white/[0.02] hover:border-white/20"
        } ${desktopWheel ? CARD_BOX_DESKTOP : CARD_BOX_MOBILE}`}
    >
      <AreaCardContent area={area} desktopWheel={desktopWheel} clamp={compact} />
    </button>
  );
}

function CardHeightMeasurer({
  desktopWheel,
  onResize,
}: {
  desktopWheel: boolean;
  onResize: (height: number) => void;
}) {
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!el) return;
    const measure = () => {
      let max = 0;
      for (const child of Array.from(el.children)) {
        max = Math.max(max, (child as HTMLElement).offsetHeight);
      }
      // Aggiungiamo un piccolo buffer di sicurezza per via di arrotondamenti e line-height
      if (max) onResize(max + 16);
    };
    
    measure();
    const observer = new ResizeObserver(measure);
    
    // Osserviamo i singoli figli per intercettare i cambiamenti di altezza reali (es. caricamento font)
    for (const child of Array.from(el.children)) {
      observer.observe(child);
    }

    // Assicuriamoci di ricalcolare quando i font web sono stati caricati
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measure);
    }

    return () => observer.disconnect();
  }, [el, onResize]);

  return (
    <div
      ref={setEl}
      aria-hidden="true"
      className="pointer-events-none invisible absolute left-0 top-0 h-0 overflow-hidden"
      style={desktopWheel ? desktopCarouselStyle : mobileCarouselStyle}
    >
      {AREAS.map((area) => (
        <div
          key={area.number}
          className={`rounded-2xl border [container-type:inline-size] ${desktopWheel ? CARD_BOX_DESKTOP : CARD_BOX_MOBILE
            }`}
        >
          <AreaCardContent area={area} desktopWheel={desktopWheel} />
        </div>
      ))}
    </div>
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
    <div className={`flex items-center justify-center gap-5 ${className}`}>
      <button
        type="button"
        onClick={onPrevious}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Area precedente"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        onClick={onNext}
        className="flex h-12 w-12 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-300 hover:border-white/60 hover:bg-white/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
        aria-label="Area successiva"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>
    </div>
  );
}