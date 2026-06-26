"use client";

import Image from "next/image";
import type { CSSProperties, TouchEvent } from "react";
import { useEffect, useRef, useState } from "react";

const AREAS = [
  {
    number: "01",
    title: ["Intervento", "Strategico"],
    description:
      [
        "Costruiamo insieme da un",
        "lato il piano di sviluppo",
        "strategico e il suo",
        "deployment operativo per",
        "concentrarci su",
        "un'esecuzione rapida ed",
        "efficace del processo di",
        "trasformazione e dall'altro",
        "una visione chiara su dove",
        "portare l'azienda e sulle",
        "azioni necessarie per",
        "arrivarci"
      ],
  },
  {
    number: "02",
    title: "Organizzazione",
    description:
      [
        "Dopo aver analizzato la",
        "struttura organizzativa, la",
        "facciamo evolvere per",
        "rispondere al meglio ai",
        "bisogni del processo di",
        "trasformazione. Lavoriamo",
        "sulla retention delle persone",
        "chiave, sullo sviluppo dei",
        "talenti interni e",
        "sull'inserimento delle",
        "competenze necessarie, sui",
        "processi di delega e di",
        "responsabilizzazione.",
        "Un'azienda cresce e si",
        "sviluppa se crescono e si",
        "sviluppano le persone che",
        "la abitano."
      ]
  },
  {
    number: "03",
    title: ["Operations e", "Finance"],
    description:
      "Ottimizziamo i processi operativi, dalla supply chain alla delivery. Definiamo le dashboard finanziarie, kpi di redditività e gli eventuali miglioramenti,  la mappa dei rischi con i piani di mitigazione. L'efficienza operativa e la continua attenzione all'incremento dei margini come motore della sostenibilità della crescita.",
  },
  {
    number: "04",
    title: ["Innovazione e", "digitalizzazione"],
    description:
      "La revisione dei processi e della attività aziendali alla luce degli ultimi sviluppi legati all'AI, alle automazioni e alla digitalizzazione come fattori chiave dell'incremento di redditività. Valorizziamo dati, brevetti e know-how aziendale, rafforziamo la R&D interna per rendere l\'azienda competitiva nel medio lungo periodo e per non disperdere la trasmissione del know-how.",
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

  const showPrevious = () => {
    setActiveStep((current) => current - 1);
  };

  const showNext = () => {
    setActiveStep((current) => current + 1);
  };

  return (
    <div className="overflow-x-hidden bg-blue-deep text-white">
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

function HeroAree() {
  return (
    <section className="relative min-h-[620px] w-screen max-w-full overflow-hidden px-6 pb-12 pt-36 md:min-h-[690px] md:px-12">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-aree_di_intervento.png')" }}
      />
      <div className="absolute inset-0 bg-blue-deep/35" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-blue-deep/10 to-blue-deep/50" />

      <h1 className="absolute left-6 right-6 top-[45%] z-10 max-w-[11ch] break-words font-heading text-[clamp(2.35rem,10vw,5.1rem)] font-semibold leading-none tracking-normal text-white md:left-12 md:right-12 md:top-[46%] md:max-w-none">
        Le aree di intervento
      </h1>

      <div className="absolute bottom-12 left-6 z-10 w-[calc(100vw_-_3rem)] border-l-2 border-white/85 pl-4 md:left-12 md:right-12 md:bottom-16 md:w-auto">
        <p className="max-w-[33ch] font-body text-sm font-semibold leading-tight text-white md:max-w-[1180px] md:text-[20px]">
          Lavoriamo all&apos;interno del sistema azienda con azioni quotidiane su tutte le
          principali aree e funzioni aziendali per innestare le dinamiche necessarie
          all&apos;esecuzione del piano di sviluppo condiviso.
        </p>
      </div>
    </section>
  );
}

type SelectorProps = {
  activeStep: number;
  onSelectStep: (step: number) => void;
  onPrevious: () => void;
  onNext: () => void;
};

function AreeSelector({ activeStep, onSelectStep, onPrevious, onNext }: SelectorProps) {
  const activeIndex = getAreaIndex(activeStep);
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

  const handleMobileSelect = (index: number) => {
    if (skipClickRef.current) {
      skipClickRef.current = false;
      return;
    }

    selectStep(getNearestStepForIndex(index, activeStep));
  };

  return (
    <section className="relative isolate w-screen max-w-full overflow-hidden bg-blue-deep py-12 md:py-16 lg:py-0">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(76,172,248,0.72) 0%, rgba(6,46,181,0.75) 28%, rgba(5,21,94,0.96) 68%, #05155e 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-80"
        style={{
          background:
            "linear-gradient(165deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 44px), linear-gradient(0deg, rgba(0,0,0,0.18), rgba(0,0,0,0))",
        }}
      />

      <div className="relative z-10 hidden h-[540px] w-full lg:block" style={desktopCarouselStyle}>
        {getDesktopLoopCards(activeStep).map(({ area, step, offset }) => {
          const active = offset === 0;

          return (
            <AreaCardButton
              key={step}
              area={area}
              active={active}
              compact={!active}
              desktopWheel
              contentSoftened={contentSoftened}
              onClick={() => selectStep(step)}
              className="absolute left-1/2 top-[46%] transition-all duration-500 ease-out"
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

      <div
        className="relative z-10 h-[500px] w-full lg:hidden"
        style={{ touchAction: "pan-y" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={() => {
          touchStartRef.current = null;
        }}
      >
        {AREAS.map((area, index) => {
          const offset = getCarouselOffset(index, activeIndex);
          const active = offset === 0;

          return (
            <AreaCardButton
              key={area.number}
              area={area}
              active={active}
              compact={!active}
              contentSoftened={contentSoftened}
              onClick={() => handleMobileSelect(index)}
              className="absolute left-1/2 top-[43%] transition-all duration-500 ease-out"
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

const desktopCarouselStyle = {
  "--desktop-active-card-width": "clamp(280px, 17.75vw, 340px)",
  "--desktop-small-card-width": "clamp(170px, 12.25vw, 235px)",
  "--desktop-card-gap":
    "clamp(28px, calc((100vw - var(--desktop-active-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width) - var(--desktop-small-card-width)) / 6), 72px)",
} as CSSProperties;

const carouselCardTransition =
  "transform 760ms cubic-bezier(0.22, 1, 0.36, 1), opacity 620ms cubic-bezier(0.22, 1, 0.36, 1), width 760ms cubic-bezier(0.22, 1, 0.36, 1), height 760ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 760ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease";

function getDesktopLoopCards(activeStep: number) {
  return [-3, -2, -1, 0, 1, 2, 3].map((offset) => {
    const step = activeStep + offset;
    const index = getAreaIndex(step);

    return { area: AREAS[index], step, offset };
  });
}

function getAreaIndex(step: number) {
  return ((step % AREAS.length) + AREAS.length) % AREAS.length;
}

function getNearestStepForIndex(index: number, activeStep: number) {
  const activeIndex = getAreaIndex(activeStep);
  const offset = getCarouselOffset(index, activeIndex);

  return activeStep + offset;
}

function getCarouselOffset(index: number, activeIndex: number) {
  let offset = index - activeIndex;
  const maxRight = Math.floor((AREAS.length - 1) / 2);
  const maxLeft = Math.ceil((AREAS.length - 1) / 2);

  if (offset > maxRight) offset -= AREAS.length;
  if (offset < -maxLeft) offset += AREAS.length;

  return offset;
}

function getDesktopCardStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  const sign = offset >= 0 ? "+" : "-";
  const desktopSteps: Record<number, string> = {
    1: "calc((var(--desktop-active-card-width) / 2) + var(--desktop-card-gap) + (var(--desktop-small-card-width) / 2))",
    2: "calc((var(--desktop-active-card-width) / 2) + var(--desktop-card-gap) + var(--desktop-small-card-width) + var(--desktop-card-gap) + (var(--desktop-small-card-width) / 2))",
    3: "50vw",
  };
  const x =
    offset === 0
      ? "-50%"
      : `calc(-50% ${sign} ${desktopSteps[distance] ?? desktopSteps[3]})`;

  return {
    transform: `translate3d(${x}, -50%, 0) scale(${distance === 0 ? 1 : 0.94})`,
    transition: carouselCardTransition,
    zIndex: 30 - distance,
    opacity: distance > 2 ? 0.18 : distance > 1 ? 0.74 : 1,
    pointerEvents: distance > 2 ? "none" : "auto",
    willChange: "transform, opacity, width, height",
    backfaceVisibility: "hidden",
  };
}

function getMobileCardStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset);
  const sign = offset >= 0 ? "+" : "-";
  const mobileSteps: Record<number, string> = {
    1: "clamp(188px, 56vw, 230px)",
    2: "clamp(338px, 94vw, 390px)",
    3: "clamp(486px, 132vw, 560px)",
  };
  const x =
    offset === 0
      ? "-50%"
      : `calc(-50% ${sign} ${mobileSteps[distance] ?? mobileSteps[3]})`;

  return {
    transform: `translate3d(${x}, -50%, 0) scale(${distance === 0 ? 1 : 0.86})`,
    transition: carouselCardTransition,
    zIndex: 30 - distance,
    opacity: distance > 2 ? 0.42 : distance > 1 ? 0.62 : 1,
    willChange: "transform, opacity, width, height",
    backfaceVisibility: "hidden",
  };
}

type AreaCardButtonProps = {
  area: (typeof AREAS)[number];
  active?: boolean;
  compact?: boolean;
  contentSoftened?: boolean;
  desktopWheel?: boolean;
  fluid?: boolean;
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
  fluid = false,
  className = "",
  style,
  onClick,
}: AreaCardButtonProps) {
  const singleWordTitle = !area.title.includes(" ");
  const numberSize = active
    ? desktopWheel
      ? "text-[52px]"
      : "text-[56px]"
    : compact
      ? desktopWheel
        ? "text-[31px]"
        : "text-[34px]"
      : "text-[44px]";
  const titleSize = active
    ? desktopWheel
      ? "text-[30px]"
      : "text-[clamp(23px,6.2vw,27px)]"
    : compact
      ? desktopWheel
        ? "text-[22px]"
        : "text-[17px]"
      : "text-[22px]";
  const descriptionSize = fluid
    ? "max-w-[31ch] text-[14px] leading-[110%]"
    : active
      ? desktopWheel
        ? "text-[16px] leading-[110%]"       //desktop highlited
        : "text-[20px] leading-[110%]"       //mobile highlited
      : compact
        ? desktopWheel
          ? "line-clamp-[6] text-[14px] leading-none"  //desktop background
          : "line-clamp-[8] text-[14.875px] leading-none"  //mobile background
        : "text-[14px] leading-[110%]";

  return (
    <button
      type="button"
      onClick={onClick}
      style={style}
      className={`${className} group min-w-0 overflow-hidden rounded-[8px] border border-white/30 bg-white/[0.08] text-left shadow-[0_18px_42px_rgba(0,0,0,0.28),inset_0_1px_18px_rgba(255,255,255,0.08)] backdrop-blur-md transition hover:border-white/60 focus:outline-none focus:ring-2 focus:ring-white/80 ${fluid
        ? "min-h-[330px] w-full max-w-[342px] px-7 py-8 sm:max-w-[420px]"
        : desktopWheel
          ? active
            ? "h-[clamp(385px,31vw,430px)] w-[var(--desktop-active-card-width)] px-8 py-9"
            : "h-[clamp(265px,21vw,315px)] w-[var(--desktop-small-card-width)] px-5 py-5"
          : active
            ? "h-[clamp(390px,32vw,430px)] w-[clamp(280px,23vw,340px)] px-8 py-9"
            : compact
              ? "h-[clamp(260px,21vw,310px)] w-[clamp(178px,14vw,220px)] px-4 py-5"
              : "px-7 py-8"
        }`}
      aria-pressed={active}
    >
      <div
        className={`transition-[opacity,filter] duration-200 ease-out ${contentSoftened ? "opacity-60 blur-[0.25px]" : "opacity-100 blur-0"
          }`}
      >
        <span
          className={`block text-center font-heading font-semibold leading-none tracking-normal text-white ${numberSize}`}
        >
          {area.number}
        </span>
        <span
          className={`mt-2 block text-center font-heading font-semibold leading-[0.95] text-white ${singleWordTitle ? "whitespace-nowrap" : "text-balance"
            } ${titleSize}`}
        >
          {Array.isArray(area.title)
            ? area.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
            : area.title}
        </span>
        <span
          className={`mt-4 block break-words font-body font-normal text-white/90 ${descriptionSize}`}
        >
          {Array.isArray(area.description)
            ? area.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))
            : area.description}
        </span>
      </div>
    </button>
  );
}

type CarouselArrowsProps = {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
};

function CarouselArrows({ onPrevious, onNext, className = "" }: CarouselArrowsProps) {
  return (
    <div className={`flex items-center justify-center gap-9 ${className}`}>
      <button
        type="button"
        onClick={onPrevious}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[34px] leading-none text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80"
        aria-label="Area precedente"
      >
        &larr;
      </button>
      <button
        type="button"
        onClick={onNext}
        className="flex h-10 w-10 items-center justify-center rounded-full text-[34px] leading-none text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/80"
        aria-label="Area successiva"
      >
        &rarr;
      </button>
    </div>
  );
}

function AreeContactBand() {
  return (
    <section className="relative w-screen max-w-full overflow-hidden bg-blue-deep px-6 py-12 md:px-12 md:py-14">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(76,172,248,0.56) 0%, rgba(6,46,181,0.86) 28%, rgba(5,21,94,1) 78%)",
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0 max-w-4xl">
          <h2 className="max-w-[calc(100vw_-_3rem)] break-words font-heading text-[30px] font-semibold leading-[0.95] tracking-normal text-white md:max-w-3xl md:text-[40px] lg:text-[42px]">
            Costruiamo insieme la prossima fase della tua impresa
          </h2>
          <p className="mt-5 max-w-[32ch] font-body text-base font-semibold text-white md:max-w-none md:text-[20px]">
            Ogni progetto inizia da un ascolto. Raccontaci la tua realta.
          </p>
          <a
            href="mailto:contact@moleventure.com"
            className="mt-10 inline-flex min-h-11 w-full max-w-[270px] items-center justify-center rounded-full bg-white px-8 py-2 font-heading text-[22px] font-semibold leading-none text-blue-deep shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition hover:bg-blue-soft hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-deep sm:ml-[36%]"
          >
            Contattaci
          </a>
        </div>

        <Image
          src="/images/logo.png"
          alt="Mole Venture"
          width={400}
          height={400}
          className="hidden h-[132px] w-auto object-contain mix-blend-screen md:block"
        />
      </div>
    </section>
  );
}
