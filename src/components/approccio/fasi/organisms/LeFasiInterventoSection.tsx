"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FASI } from "../fasiData";
import FaseCard from "../molecules/FaseCard";

const emptyFocusLevels = () => FASI.map(() => 0);

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

function smoothstep(value: number) {
  return value * value * (3 - 2 * value);
}

export default function LeFasiInterventoSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef(emptyFocusLevels());
  const [focusLevels, setFocusLevels] = useState(emptyFocusLevels);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const cards = Array.from(container.querySelectorAll<HTMLElement>("[data-index]"));
    let raf = 0;

    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const viewportCenter = vh * 0.52;
      const radius = Math.max(280, vh * 0.5);
      const next = cards.map((el) => {
        const rect = el.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const dist = Math.abs(center - viewportCenter);
        return smoothstep(clamp(1 - dist / radius, 0, 1));
      });

      const changed = next.some((value, index) => Math.abs(value - focusRef.current[index]) > 0.015);
      if (changed) {
        focusRef.current = next;
        setFocusLevels(next);
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

  const spotlightActive = focusLevels.some((level) => level > 0.08);

  return (
    <section
      aria-labelledby="fasi-heading"
      className="relative w-full max-w-full overflow-hidden bg-blue-kinetic px-6 py-20 md:px-12 md:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(155deg, #0a2f9e 0%, #0c40c4 50%, #082b96 100%)" }}
      />
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

      <div className="relative z-10 mx-auto w-full max-w-7xl min-w-0">
        <header className="max-w-3xl min-w-0">
          <h2
            id="fasi-heading"
            className="break-words font-heading text-3xl font-semibold leading-none tracking-normal text-white md:text-[40px]"
          >
            Le 5 fasi dell&apos;intervento
          </h2>
          <p className="mt-5 max-w-full break-words font-body text-[15px] font-normal leading-[1.5] text-white/90 md:text-[16px]">
            Siamo in ascolto per identificare aziende e imprenditori che vogliono dare un nuovo
            sviluppo alla realt&agrave; esistente &mdash; e diventare, insieme a noi, autori di un cambiamento
            imprenditoriale e manageriale duraturo. Il nostro metodo segue una struttura precisa,
            divisa in 5 fasi.
          </p>
        </header>

        <div
          ref={containerRef}
          className="mt-14 grid w-full min-w-0 grid-cols-1 gap-10 md:mt-20 md:grid-cols-12 md:gap-x-8 md:gap-y-16"
        >
          <FaseCard
            index={0}
            fase={FASI[0]}
            focus={focusLevels[0]}
            spotlightActive={spotlightActive}
            className="md:col-span-5 md:col-start-1 md:row-start-1"
          />
          <FaseCard
            index={1}
            fase={FASI[1]}
            focus={focusLevels[1]}
            spotlightActive={spotlightActive}
            layout="stacked"
            className="md:col-span-4 md:col-start-6 md:row-start-1 md:mt-10"
          />
          <FaseCard
            index={2}
            fase={FASI[2]}
            focus={focusLevels[2]}
            spotlightActive={spotlightActive}
            layout="stacked"
            className="md:col-span-3 md:col-start-10 md:row-span-2 md:row-start-1 md:mt-28"
          />
          <FaseCard
            index={3}
            fase={FASI[3]}
            focus={focusLevels[3]}
            spotlightActive={spotlightActive}
            className="md:col-span-7 md:col-start-1 md:row-start-2 md:mt-4"
          />
          <FaseCard
            index={4}
            fase={FASI[4]}
            focus={focusLevels[4]}
            spotlightActive={spotlightActive}
            className="md:col-span-12 md:col-start-1 md:row-start-3"
          />
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
