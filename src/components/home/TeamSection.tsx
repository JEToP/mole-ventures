"use client";

import Image from "next/image";
import { useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Per aggiungere un nuovo membro del team, aggiungi un oggetto a questo array.
// La sezione si aggiorna automaticamente.
// Le foto vanno inserite in public/images/team/<id>.jpg
// ──────────────────────────────────────────────────────────────────────────────
const teamMembers = [
  {
    id: "matteo-gera",
    name: "Matteo Gera",
    role: "Co-Founder",
    photo: "/images/team/matteo-gera.jpg",
    description:
      "Chief Executive con importanti e consolidate esperienze di sviluppo business e di gestione di P&L completi in aziende family owned business e multinazionali operanti nei settori Transportation, Rail, Aerospace & Defense, Energy e Industrial Goods sia in contesti nazionali che internazionali. Strutturato e diretto molteplici operazioni di M&A e integrazione. Finalizzata con successo una quotazione all’Euronext Growth Milan partecipando a tutti gli step del processo.",
  },
  {
    id: "francesco-motta",
    name: "Francesco Motta",
    role: "Co-Founder",
    photo: "/images/team/francesco-motta.jpg",
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
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background_team.webp')" }}
      />

      {/* Overlay brand: navy carico in alto (copre il nero piatto), si schiarisce
          al centro, torna scuro in basso. Stesso linguaggio di hero e "Chi siamo". */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#05155E]/95 via-[#05155E]/45 to-black/85" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Intestazione */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-4 [text-shadow:_0_2px_16px_rgba(0,0,0,0.5)]">
          Il nostro team
        </h2>
        <span className="block h-1 w-12 bg-blue-soft rounded-full mb-6" />
        <p className="font-body font-light text-white/80 text-base md:text-lg max-w-3xl mb-12 md:mb-16 leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
          Siamo professionisti che hanno deciso di condividere le loro competenze e le precedenti
          esperienze maturate in ruoli apicali e strategici in realtà di rilievo nazionali e
          internazionali così da poter sostenere ogni fase di cambiamento all&apos;interno delle
          realtà acquisite.
        </p>

        {/* ── Accordion orizzontale (desktop) / stack aperto (mobile) ──────────── */}
        <div className="flex flex-col md:flex-row gap-4 md:h-[520px]">
          {teamMembers.map((member) => {
            const isActive = member.id === activeId;
            return (
              <div
                key={member.id}
                onMouseLeave={() => setActiveId((curr) => (curr === member.id ? null : curr))}
                aria-expanded={isActive}
                className={`group relative overflow-hidden rounded-2xl border text-left transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
                  ${isActive ? "border-blue-soft/60" : "border-white/15 hover:border-white/30"}
                  md:h-full
                  ${activeId === null ? "md:flex-1" : isActive ? "md:flex-[3.2]" : "md:flex-[1]"}
                `}
              >
                {/* Foto di sfondo del pannello */}
                <div className="absolute inset-0">
                  <Image
                    src={member.photo}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover transition-all duration-700 ${isActive || activeId === null ? "scale-100" : "scale-105 md:grayscale md:opacity-70"}`}
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  {/* fondo di fallback se la foto manca */}
                  <div className="absolute inset-0 -z-10 flex items-center justify-center bg-white/5">
                    <PersonIcon className="w-20 h-20 text-white/25" />
                  </div>
                </div>

                {/* Gradiente di leggibilità sul pannello.
                    Mobile: navy quasi pieno (foto poco visibile, testo ben leggibile). */}
                <div className="absolute inset-0 bg-[#05155E]/85 md:hidden" />
                {/* Desktop: gradiente dal basso, foto più presente in alto. */}
                <div className="absolute inset-0 hidden md:block bg-gradient-to-t from-[#05155E] via-[#05155E]/55 to-transparent" />

                {/* Contenuto del pannello */}
                <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
                  {/* Toggle +/− ancorato in alto a destra: posizione fissa,
                      così "+" e "−" restano sempre nello stesso identico punto. */}
                  <button
                    type="button"
                    onMouseEnter={() => setActiveId(member.id)}
                    onFocus={() => setActiveId(member.id)}
                    onClick={() => setActiveId(isActive ? null : member.id)}
                    aria-expanded={isActive}
                    aria-label={isActive ? `Chiudi il profilo di ${member.name}` : `Apri il profilo di ${member.name}`}
                    className="hidden md:flex absolute top-6 right-6 md:top-7 md:right-7 z-20 shrink-0 h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white text-xl leading-none cursor-pointer transition-all duration-300 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft"
                  >
                    {isActive ? "−" : "+"}
                  </button>

                  {/* Riga nome. Su desktop, quando il pannello è chiuso,
                      il nome ruota in verticale per occupare poco spazio. */}
                  <div className="flex items-end">
                    <div className={`transition-all duration-700 ${!isActive && activeId !== null ? "md:[writing-mode:vertical-rl] md:rotate-180 md:mb-1" : ""}`}>
                      <p className="font-body font-light text-blue-soft text-base md:text-lg leading-relaxed mb-1">
                        {member.role}
                      </p>
                      <h3 className="font-heading text-white text-xl md:text-2xl font-semibold leading-tight">
                        {member.name}
                      </h3>
                    </div>
                  </div>

                  {/* Bio: visibile sempre su mobile, solo se attivo su desktop */}
                  <p
                    className={`font-body font-light text-white/85 text-base md:text-lg leading-relaxed mt-4 max-w-md transition-all duration-700
                      md:overflow-hidden
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