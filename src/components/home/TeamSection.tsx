"use client";

import Image from "next/image";
import { useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Per aggiungere un membro del team, aggiungi un oggetto a questo array.
// Le foto vanno in public/images/team/<id>.<ext>
// ──────────────────────────────────────────────────────────────────────────────
const teamMembers = [
  {
    id: "matteo-gera",
    name: "Matteo Gera",
    photo: "/images/team/matteo-gera.jpg",
    // Zoom/posizione per uniformare l'inquadratura a quella di Francesco
    // (stesso spazio sopra la testa). Matteo è più "largo" → ingrandisco un po'.
    photoClass: "object-cover scale-[1.25] -translate-y-3",
    description:
      "Chief Executive con importanti e consolidate esperienze di sviluppo business e di gestione di P&L completi in aziende family owned business e multinazionali operanti nei settori Transportation, Rail, Aerospace & Defense, Energy e Industrial Goods sia in contesti nazionali che internazionali. Strutturato e diretto molteplici operazioni di M&A e integrazione. Finalizzata con successo una quotazione all’Euronext Growth Milan partecipando a tutti gli step del processo.",
  },
  {
    id: "francesco-motta",
    name: "Francesco Motta",
    photo: "/images/team/francesco-motta.jpg",
    photoClass: "object-cover origin-top scale-[1.18]",
    description:
      "Chief Executive con esperienze di sviluppo business e di gestione di P&L completi in multinazionali e PMI operanti nei settori Automation, Machinery, Rail, Automotive. Esperienza nel processo di M&A e di turn-around. 10 anni di permanenza a Shanghai + 2 in India per vivere il cambiamento da vicino. Business Angel dal 2020, attivo in diverse community, con investimenti in una decina di start-up multi settore.",
  },
  // ← Aggiungi qui altri membri del team
];

// ── Placeholder SVG persona ───────────────────────────────────────────────────
function PersonIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 80 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="40" cy="28" r="20" stroke="currentColor" strokeWidth="3" />
      <path
        d="M4 96C4 72 20 56 40 56C60 56 76 72 76 96"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

// ── Componente principale ─────────────────────────────────────────────────────
export default function TeamSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="relative w-full overflow-hidden bg-[#05155E]">
      {/* Background image (invariato) */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/team.avif')" }}
      />
      {/* Overlay */}
      <div aria-hidden="true" className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Intestazione */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-6">
          Il nostro team
        </h2>
        <p className="font-body font-light text-white text-base md:text-xl leading-relaxed max-w-3xl mb-12 md:mb-16">
          Siamo professionisti che hanno deciso di condividere le loro competenze e le precedenti
          esperienze maturate in ruoli apicali e strategici in realtà di rilievo nazionali e
          internazionali così da poter sostenere ogni fase di cambiamento all&apos;interno delle
          realtà acquisite.
        </p>

        {/* ── Accordion orizzontale: card "glass" con foto CONTENUTA a sinistra ─── */}
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 md:h-[440px]">
          {teamMembers.map((member) => {
            const isActive = member.id === activeId;
            const isCollapsed = activeId !== null && !isActive;
            return (
              <div
                key={member.id}
                onMouseLeave={() =>
                  setActiveId((curr) => (curr === member.id ? null : curr))
                }
                aria-expanded={isActive}
                className={`group relative flex flex-col md:flex-row overflow-hidden rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md transition-all duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] md:hover:border-white/25
                  ${activeId === null ? "md:flex-1" : isActive ? "md:flex-[3.2]" : "md:flex-[1]"}
                `}
              >
                {/* Foto CONTENUTA. Mobile: in cima, ritratto full-width.
                    Desktop: colonna a sinistra; quando la card è collassata la
                    foto si restringe per lasciar spazio alla strip glass col
                    nome ruotato. */}
                <div
                  className={`relative w-full aspect-[4/5] shrink-0 overflow-hidden transition-all duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] md:aspect-auto md:h-full ${
                    isCollapsed ? "md:w-40 lg:w-48" : "md:w-60 lg:w-72"
                  }`}
                >
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 300px"
                    className={member.photoClass}
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-white/5">
                    <PersonIcon className="w-16 h-16 text-white/25" />
                  </div>
                </div>

                {/* Colonna testo. Da collassato: centra il nome (verticale) */}
                <div className="relative min-w-0 flex-1 p-6 md:p-7 flex flex-col justify-end">
                  {/* Toggle +/− in alto a destra */}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(member.id)}
                    onFocus={() => setActiveId(member.id)}
                    onClick={() => setActiveId(isActive ? null : member.id)}
                    aria-expanded={isActive}
                    aria-label={
                      isActive
                        ? `Chiudi il profilo di ${member.name}`
                        : `Apri il profilo di ${member.name}`
                    }
                    className="hidden md:flex absolute top-6 right-6 z-20 h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white text-xl leading-none cursor-pointer transition-all duration-300 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft"
                  >
                    {isActive ? "−" : "+"}
                  </button>

                  {/* Nome: ruota di 90° in senso antiorario (fulcro prima lettera)
                      + una leggera traslazione nella STESSA transizione, così da
                      centrarlo un po' nella striscia verticale restando fluido
                      (niente scatto di layout). */}
                  <div
                    className={`inline-block w-fit origin-bottom-left transition-transform duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
                      isCollapsed ? "md:-rotate-90 md:-translate-y-4 md:translate-x-[30px]" : "md:rotate-0"
                    }`}
                  >
                    <h3 className="font-heading text-white text-xl md:text-2xl font-semibold leading-tight whitespace-nowrap">
                      {member.name}
                    </h3>
                  </div>

                  {/* Bio: sempre visibile su mobile, solo se attivo su desktop */}
                  <p
                    className={`font-body font-light text-white/85 text-base md:text-lg leading-relaxed mt-4 max-w-lg transition-all duration-[1000ms] ease-[cubic-bezier(0.65,0,0.35,1)] md:overflow-hidden
                      ${isActive ? "opacity-100 md:max-h-96" : "opacity-100 md:max-h-0 md:opacity-0"}
                    `}
                  >
                    {member.description}
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
