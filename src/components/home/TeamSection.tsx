"use client";

import { useState } from "react";

// ── Dati del team ──────────────────────────────────────────────────────────────
// Quando avrai le foto, inseriscile in public/images/team/<id>.jpg
const teamMembers = [
  {
    id: "matteo-gera",
    name: "Matteo Gera",
    photo: "/images/team/matteo-gera.jpg",
    description:
      "Chief Executive con esperienza consolidata nello sviluppo business e nella gestione di P&L in aziende family owned e multinazionali nei settori Transportation, Rail, Aerospace & Defense, Energy e Industrial Goods. Ha strutturato e guidato operazioni di M&A e integrazione in contesti nazionali e internazionali, fino alla quotazione all'Euronext Growth Milan.",
  },
  {
    id: "francesco-motta",
    name: "Francesco Motta",
    photo: "/images/team/francesco-motta.jpg",
    description:
      "Profilo di Francesco Motta – da completare con la biografia ufficiale.",
  },
  {
    id: "clara-segrado",
    name: "Clara Segrado",
    photo: "/images/team/clara-segrado.jpg",
    description:
      "Profilo di Clara Segrado – da completare con la biografia ufficiale.",
  },
  {
    id: "serena-bianchi",
    name: "Serena Bianchi",
    photo: "/images/team/serena-bianchi.jpg",
    description:
      "Profilo di Serena Bianchi – da completare con la biografia ufficiale.",
  },
  {
    id: "boris-nettuno",
    name: "Boris Nettuno",
    photo: "/images/team/boris-nettuno.jpg",
    description:
      "Profilo di Boris Nettuno – da completare con la biografia ufficiale.",
  },
  {
    id: "alex-schiffini",
    name: "Alex Schiffini",
    photo: "/images/team/alex-schiffini.jpg",
    description:
      "Profilo di Alex Schiffini – da completare con la biografia ufficiale.",
  },
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
  const [selectedId, setSelectedId] = useState(teamMembers[0].id);
  const selected = teamMembers.find((m) => m.id === selectedId)!;

  return (
    <section className="bg-[radial-gradient(ellipse_at_center,_#0c2a9e_0%,_#05155E_70%)] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Intestazione */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-4">
          Il nostro team
        </h2>
        <p className="font-body text-white/75 text-base md:text-lg max-w-5xl mb-16 leading-relaxed">
          Siamo professionisti che hanno deciso di condividere le loro competenze e le precedenti
          esperienze maturate in ruoli apicali e strategici in realtà di rilievo nazionali e
          internazionali così da poter sostenere ogni fase di cambiamento all&apos;interno delle
          realtà acquisite.
        </p>

        {/* Card in evidenza */}
        <div className="flex flex-col items-center mb-16 transition-all duration-500">
          <h3 className="font-heading text-white text-2xl md:text-3xl font-semibold mb-8">
            {selected.name}
          </h3>

          {/* Foto / placeholder grande */}
          <div className="w-56 h-72 md:w-64 md:h-80 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center mb-8">
            <PersonIcon className="w-28 h-28 text-white/30" />
          </div>

          <p className="font-body text-white/80 text-base text-center max-w-xl leading-relaxed transition-all duration-300">
            {selected.description}
          </p>
        </div>

        {/* Fila card piccole – cliccabili */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {teamMembers.map((member) => {
            const isActive = member.id === selectedId;
            return (
              <button
                key={member.id}
                id={`team-card-${member.id}`}
                onClick={() => setSelectedId(member.id)}
                aria-pressed={isActive}
                className={`flex flex-col items-center gap-2 focus:outline-none transition-all duration-300 ${isActive
                  ? "scale-110 opacity-100"
                  : "scale-100 opacity-55 hover:opacity-90 hover:scale-105"
                  }`}
              >
                <div
                  className={`rounded-xl border flex items-center justify-center transition-all duration-300 ${isActive
                    ? "w-28 h-36 bg-white/20 border-white/40"
                    : "w-24 h-32 bg-white/10 border-white/10"
                    }`}
                >
                  <PersonIcon
                    className={`text-white/40 transition-all duration-300 ${isActive ? "w-14 h-14" : "w-10 h-10"
                      }`}
                  />
                </div>
                <span
                  className={`font-body text-white text-center transition-all duration-300 ${isActive ? "text-sm font-semibold" : "text-xs"
                    }`}
                >
                  {member.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
