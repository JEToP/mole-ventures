"use client";

import Image from "next/image";
import { useState } from "react";

// ──────────────────────────────────────────────────────────────────────────────
// Per aggiungere un nuovo membro del team, aggiungi semplicemente un oggetto
// a questo array. La sezione si aggiorna automaticamente.
// Le foto vanno inserite in public/images/team/<id>.jpg
// ──────────────────────────────────────────────────────────────────────────────
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
  const [selectedId, setSelectedId] = useState(teamMembers[0].id);
  const selected = teamMembers.find((m) => m.id === selectedId)!;

  return (
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/team.webp')" }}
      />
      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20">
        {/* Intestazione */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-4">
          Il nostro team
        </h2>
        <p className="font-body text-white/80 text-sm md:text-base max-w-3xl mb-16 leading-relaxed">
          Siamo professionisti che hanno deciso di condividere le loro competenze e le precedenti
          esperienze maturate in ruoli apicali e strategici in realtà di rilievo nazionali e
          internazionali così da poter sostenere ogni fase di cambiamento all&apos;interno delle
          realtà acquisite.
        </p>

        {/* Card in evidenza: foto grande + nome e bio a fianco */}
        <div className="flex flex-col md:flex-row items-start gap-10 mb-16 min-h-[260px] transition-all duration-300">
          {/* Foto grande */}
          <div className="w-52 h-64 md:w-56 md:h-72 flex-shrink-0 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-xl overflow-hidden">
            <Image
              key={selected.id}
              src={selected.photo}
              alt={selected.name}
              width={224}
              height={288}
              className="w-full h-full object-cover"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            {/* Fallback placeholder visibile se l'immagine non c'è */}
            <PersonIcon className="w-24 h-24 text-white/30 absolute" />
          </div>

          {/* Nome + descrizione */}
          <div className="flex flex-col justify-center">
            <h3 className="font-heading text-white text-2xl md:text-3xl font-semibold mb-4">
              {selected.name}
            </h3>
            <p className="font-body text-white/80 text-sm md:text-base leading-relaxed max-w-md">
              {selected.description}
            </p>
          </div>
        </div>

        {/* Fila card piccole – hover per selezionare */}
        <div className="flex flex-wrap gap-6 md:gap-8">
          {teamMembers.map((member) => {
            const isActive = member.id === selectedId;
            return (
              <button
                key={member.id}
                id={`team-card-${member.id}`}
                onMouseEnter={() => setSelectedId(member.id)}
                onClick={() => setSelectedId(member.id)}
                aria-pressed={isActive}
                className={`flex flex-col items-center gap-2 focus:outline-none transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-105"
                    : "opacity-55 hover:opacity-85 hover:scale-105"
                }`}
              >
                <div
                  className={`rounded-xl border flex items-center justify-center overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "w-28 h-36 bg-white/20 border-white/50"
                      : "w-24 h-32 bg-white/10 border-white/15"
                  }`}
                >
                  <div className="relative w-full h-full flex items-center justify-center">
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <PersonIcon className="w-10 h-10 text-white/40" />
                  </div>
                </div>
                <span
                  className={`font-body text-white text-center transition-all duration-300 ${
                    isActive ? "text-sm font-semibold" : "text-xs"
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

