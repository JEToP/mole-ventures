"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// ── Dati valori ──────────────────────────────────────────────────────────────
const valori = [
  {
    id: "rispetto",
    name: "Rispetto",
    icon: "/images/icons/rispetto.webp",
    description:
      "Ogni azienda ha una sua storia che va capita e rispettata. Un cambiamento, una discontinuità va sempre affrontata con il rispetto del percorso fatto, delle persone che lo hanno realizzato e dei valori intrinseci dell'azienda.",
  },
  {
    id: "ascolto",
    name: "Ascolto",
    icon: "/images/icons/ascolto.webp",
    description:
      "Le persone aderiscono e attuano il cambiamento se contribuiscono alla sua definizione e impostazione. Per noi questa contribuzione è un elemento chiave del processo e quindi l'ascolto attivo è il denominatore alla base del progetto di trasformazione.",
  },
  {
    id: "cambiamento",
    name: "Cambiamento",
    icon: "/images/icons/cambiamento.webp",
    description:
      "Un sistema evolve con successo se continua a rinnovarsi e ad anticipare le nuove esigenze. L'immobilismo impedisce ad un'azienda di vedere i passi necessari ad affrontare le nuove sfide dimensionanti. Noi agiamo per rimettere in discussione abitudini e modalità operative che minano la trasformazione e quindi le opportunità di nuova crescita.",
  },
  {
    id: "coerenza",
    name: "Coerenza",
    icon: "/images/icons/coerenza.webp",
    description:
      "Dopo una fase di condivisione, l'attuazione del cambiamento passa per una importante capacità di coerenza, costanza, e rispetto di quanto definito sia a livello di direzione che di valori attuativi del piano.",
  },
  {
    id: "dinamicita",
    name: "Dinamicità",
    icon: "/images/icons/dinamicita.webp",
    description:
      "La capacità di evolvere e di evolvere velocemente seguendo il percorso tracciato è sale. Noi siamo i generatori di quegli impulsi che sono necessari a far sì che un sistema vinca la sua inerzia naturale per acquisire competitività grazie al suo dinamismo.",
  },
  {
    id: "trasparenza",
    name: "Trasparenza",
    icon: "/images/icons/trasparenza.webp",
    description:
      "La trasparenza verso tutti gli stakeholders coinvolti è fondamentale per permettere sempre la lettura dei vari segnali e costruire relazioni di fiducia con dipendenti, Clienti, partners e azionisti, che favoriscono il percorso condiviso di crescita e di successo dell'azienda.",
  },
  {
    id: "valorizzazione",
    name: "Valorizzazione",
    icon: "/images/icons/valorizzazione.webp",
    description:
      "Un sistema cresce se lo si valorizza: Nel valore delle persone, nelle relazioni con i Clienti, nel valore riconosciuto ai prodotti e servizi e nei KPI. Valorizzare in modo che questo percorso sia misurabile, riconosciuto e non autoreferenziale.",
  },
];

export default function ValoriSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [fillHeight, setFillHeight] = useState(0);
  const [active, setActive] = useState<boolean[]>(() => valori.map(() => false));

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setActive(valori.map(() => true));
      setFillHeight(99999);
      return;
    }

    // 1. Observer nativo per tracciare la visibilità degli elementi (Bulletproof su iOS)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = rowRefs.current.indexOf(entry.target as HTMLDivElement);
          if (index !== -1) {
            setActive((prev) => {
              const next = [...prev];
              // Si attiva quando l'elemento entra nella viewport e rimane attivo finché non scorre molto in alto
              next[index] = entry.isIntersecting;
              return next;
            });
          }
        });
      },
      {
        root: null,
        // Innesca quando l'elemento è circa al 15% dal basso dello schermo. 
        // 2000px in alto assicura che non sparisca quando scorriamo molto giù.
        rootMargin: "2000px 0px -15% 0px", 
        threshold: 0
      }
    );

    rowRefs.current.forEach((row) => {
      if (row) observer.observe(row);
    });

    // 2. Fallback / Linea centrale animata (legata allo scroll)
    let raf = 0;
    const updateScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        
        const isMobile = window.innerWidth < 768;
        const trigger = window.innerHeight * (isMobile ? 0.85 : 0.65);
        
        const fill = Math.max(0, Math.min(rect.height, trigger - rect.top));
        setFillHeight(fill);
      });
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-[#030d3d]">
      {/* Mesh Gradient Animato - Palette Corporate */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Elementi più grandi e copertura maggiore per evitare vuoti */}
        <div className="absolute -top-[10%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-kinetic opacity-60 blur-[120px] md:blur-[160px] animate-float" />
        <div className="absolute top-[20%] -right-[10%] w-[60%] h-[60%] rounded-full bg-blue-soft opacity-30 blur-[120px] md:blur-[160px] animate-float-reverse" />
        <div className="absolute -bottom-[10%] left-[0%] w-[70%] h-[70%] rounded-full bg-[#2E73C4] opacity-40 blur-[120px] md:blur-[160px] animate-float-slow" />
        <div className="absolute bottom-[0%] right-[10%] w-[60%] h-[60%] rounded-full bg-blue-deep opacity-80 blur-[120px] md:blur-[160px] animate-float" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Intestazione – stile coerente con le altre sezioni */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-4">
          I nostri valori
        </h2>
        <span className="block h-1 w-12 bg-blue-soft rounded-full mb-16" />

        {/* Timeline */}
        <div ref={trackRef} className="relative">
          {/* Binario di sfondo */}
          <div className="absolute top-0 bottom-0 left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-white/15" />
          {/* Linea che si disegna allo scroll */}
          <div
            className="absolute top-0 left-6 md:left-1/2 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-soft to-blue-kinetic"
            style={{ height: `${fillHeight}px` }}
          />

          {valori.map((valore, index) => {
            const isActive = active[index];
            const isLeft = index % 2 === 0; // pari a sinistra, dispari a destra (desktop)
            return (
              <div
                key={valore.id}
                ref={(el) => { rowRefs.current[index] = el; }}
                className="relative py-8 md:py-10 md:grid md:grid-cols-2 md:gap-x-16"
              >
                {/* Nodo (pallino) sul percorso */}
                <span
                  className={`absolute left-6 md:left-1/2 top-12 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-10 h-4 w-4 rounded-full border-2 transition-all duration-500 ${
                    isActive
                      ? "bg-blue-soft border-blue-soft scale-110 shadow-[0_0_16px_rgba(76,172,248,0.7)]"
                      : "bg-blue-deep border-white/30 scale-100"
                  }`}
                />

                {/* Contenuto del valore */}
                <div
                  className={`relative pl-14 md:pl-0 flex flex-col gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                    ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}
                    ${isLeft
                      ? "md:col-start-1 md:pr-16 md:items-end md:text-right"
                      : "md:col-start-2 md:pl-16 md:items-start md:text-left"}
                  `}
                >
                  {/* Icona in background (Watermark) */}
                  <div className={`absolute top-1/2 -translate-y-1/2 pointer-events-none z-0 transition-opacity duration-700 ${
                    isActive ? "opacity-10" : "opacity-0"
                  } ${
                    isLeft ? "right-10 md:right-8" : "left-14 md:left-8"
                  }`}>
                    <Image
                      src={valore.icon}
                      alt=""
                      width={240}
                      height={240}
                      className="w-32 h-32 md:w-48 md:h-48 object-contain"
                      unoptimized
                    />
                  </div>

                  {/* Nome */}
                  <div className={`relative z-10 flex items-center gap-4 ${isLeft ? "md:flex-row-reverse" : "md:flex-row"}`}>
                    <h3 className="font-heading text-white text-2xl md:text-3xl font-semibold leading-tight">
                      {valore.name}
                    </h3>
                  </div>

                  {/* Descrizione */}
                  <p className="relative z-10 font-body font-light text-white/75 text-base md:text-lg leading-relaxed max-w-md">
                    {valore.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}