"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import FaseCard from "../molecules/FaseCard";
import { FASI } from "../fasiData";

/**
 * Organism: la sezione "Le 5 fasi dell'intervento".
 */
export default function LeFasiInterventoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(-1);
  const [activeIndex, setActiveIndex] = useState(-1);

  useEffect(() => {
    const container = containerRef.current;
    const section = sectionRef.current;
    if (!container || !section) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-index]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const viewportCenter = vh / 2;

      let bestIndex = -1;
      let bestDist = Infinity;
      let currentDist = Infinity;

      cards.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        const idx = Number(el.dataset.index);
        if (idx === activeRef.current) currentDist = dist;
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = idx;
        }
      });

      // Soglia: si attiva solo quando il blocco è davvero al centro del viewport.
      // Isteresi: si cambia blocco solo se il candidato è SENSIBILMENTE più vicino del
      // blocco attualmente attivo — così 01 e 02 (centri vicini) non sfarfallano.
      const threshold = vh * 0.35;
      const margin = vh * 0.04;
      let next = activeRef.current;
      if (bestIndex >= 0 && bestDist <= threshold) {
        if (
          activeRef.current < 0 ||
          bestIndex === activeRef.current ||
          bestDist + margin < currentDist
        ) {
          next = bestIndex;
        }
      } else {
        next = -1;
      }
      if (next !== activeRef.current) {
        activeRef.current = next;
        setActiveIndex(next);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Scorrimento semplicemente RALLENTATO (smorzato) mentre si attraversano i blocchi
  // numerati: nessun salto automatico, tutto guidato dall'utente. Riduco il delta della
  // rotella e inseguo morbidamente la posizione target con un lerp in rAF.
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Quanto rallentare (0.45 = ~45% della velocità normale) e quanto è morbido l'inseguimento.
    const SPEED = 0.45;
    const LERP = 0.12;

    let target = window.scrollY;
    let raf = 0;
    let running = false;

    // Attivo solo quando i blocchi numerati attraversano il centro del viewport,
    // così l'intestazione (sopra) e il pulsante (sotto) restano a velocità normale.
    const engaged = () => {
      const r = container.getBoundingClientRect();
      const center = window.innerHeight / 2;
      return r.top < center && r.bottom > center;
    };

    const tick = () => {
      const current = window.scrollY;
      const diff = target - current;
      if (Math.abs(diff) < 0.5 || !engaged()) {
        running = false;
        raf = 0;
        return;
      }
      window.scrollTo(0, current + diff * LERP);
      raf = requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (!engaged()) {
        target = window.scrollY; // resta sincronizzato per quando si rientra
        return;
      }
      e.preventDefault();
      const lineHeight = e.deltaMode === 1 ? 16 : 1;
      target = Math.max(0, target + e.deltaY * lineHeight * SPEED);
      if (!running) {
        running = true;
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", onWheel);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="fasi-heading"
      className="relative overflow-hidden bg-blue-kinetic px-6 py-20 md:px-12 md:py-28"
    >
      {/* Base */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(155deg, #0a2f9e 0%, #0c40c4 50%, #082b96 100%)" }}
      />
      {/* Riquadri: un campo cromatico per sezione, sfocati quel tanto che basta per fondersi */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 scale-110 blur-[26px]"
        style={{
          background: `
            linear-gradient(0deg, rgba(46,116,236,0.42), rgba(46,116,236,0.42)) 0% 0% / 54% 46% no-repeat,
            linear-gradient(0deg, rgba(9,38,140,0.48), rgba(9,38,140,0.48)) 100% 0% / 46% 60% no-repeat,
            linear-gradient(0deg, rgba(24,84,210,0.40), rgba(24,84,210,0.40)) 0% 100% / 54% 56% no-repeat,
            linear-gradient(0deg, rgba(13,52,166,0.44), rgba(13,52,166,0.44)) 100% 100% / 46% 42% no-repeat,
            linear-gradient(0deg, rgba(6,26,96,0.55), rgba(6,26,96,0.55)) 0% 100% / 100% 22% no-repeat
          `,
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <header className="max-w-3xl">
          <h2
            id="fasi-heading"
            className="font-heading text-3xl font-semibold leading-none tracking-normal text-white md:text-[40px]"
          >
            Le 5 fasi dell&apos;intervento
          </h2>
          <p className="mt-5 font-body text-[15px] font-normal leading-[1.5] text-white/90 md:text-[16px]">
            Siamo in ascolto per identificare aziende e imprenditori che vogliono dare un nuovo
            sviluppo alla realtà esistente — e diventare, insieme a noi, autori di un cambiamento
            imprenditoriale e manageriale duraturo. Il nostro metodo segue una struttura precisa,
            divisa in 5 fasi.
          </p>
        </header>

        {/* Layout scomposto: 01 in alto a sx · 02 al centro (numero in alto) · 03 a dx più in basso ·
            04 sotto a sx · 05 a tutta larghezza. Ordine di lettura verticale 01→05. */}
        <div
          ref={containerRef}
          className="mt-14 grid grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-16"
        >
          <FaseCard index={0} fase={FASI[0]} active={activeIndex === 0} dimmed={activeIndex >= 0 && activeIndex !== 0} className="md:col-span-5 md:col-start-1 md:row-start-1" />
          <FaseCard index={1} fase={FASI[1]} active={activeIndex === 1} dimmed={activeIndex >= 0 && activeIndex !== 1} layout="stacked" className="md:col-span-4 md:col-start-6 md:row-start-1 md:mt-10" />
          <FaseCard index={2} fase={FASI[2]} active={activeIndex === 2} dimmed={activeIndex >= 0 && activeIndex !== 2} layout="stacked" className="md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-1 md:mt-28" />
          <FaseCard index={3} fase={FASI[3]} active={activeIndex === 3} dimmed={activeIndex >= 0 && activeIndex !== 3} className="md:col-span-7 md:col-start-1 md:row-start-2 md:mt-4" />
          <FaseCard index={4} fase={FASI[4]} active={activeIndex === 4} dimmed={activeIndex >= 0 && activeIndex !== 4} className="md:col-span-12 md:col-start-1 md:row-start-3" />
        </div>

        <div className="mt-16 flex justify-center md:mt-24">
          <Link
            href="/aree-di-intervento"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3 font-heading text-base font-semibold text-blue-deep shadow-[2px_2px_4px_0px_rgba(234,234,234,0.25)] transition hover:bg-blue-soft hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-deep md:text-[18px]"
          >
            Scopri le aree di intervento
          </Link>
        </div>
      </div>
    </section>
  );
}
