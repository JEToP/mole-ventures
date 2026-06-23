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
  const [activeId, setActiveId] = useState(teamMembers[0].id);

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

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

        {/* Card in evidenza: Grid Layout Sovrapposto */}
        {/* Questo trucco rende tutte le card sovrapposte in un'unica griglia: il container padre prende
            automaticamente l'altezza della card più alta (quella con più testo), eliminando i salti. */}
        <div className="grid mb-16">
          {teamMembers.map((member) => {
            const isActive = member.id === activeId;
            return (
              <div
                key={member.id}
                className={`col-start-1 row-start-1 flex flex-col md:flex-row items-start gap-10 transition-all duration-300 ease-in-out ${
                  isActive ? "opacity-100 z-10 pointer-events-auto translate-y-0" : "opacity-0 z-0 pointer-events-none translate-y-2"
                }`}
              >
                {/* Foto grande */}
                <div className="w-52 h-64 md:w-56 md:h-72 flex-shrink-0 rounded-2xl bg-white/15 border border-white/20 flex items-center justify-center shadow-xl overflow-hidden relative">
                  {/* Se l'elemento non è attivo, potremmo non voler renderizzare l'img se è pesante,
                      ma per transizioni fluide lo teniamo. Dato che usiamo un relative wrapper, l'img è coperta
                      dal fallback se fallisce. */}
                  <Image
                    src={member.photo}
                    alt={member.name}
                    width={224}
                    height={288}
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  {/* Fallback placeholder visibile se l'immagine non c'è */}
                  <PersonIcon className="w-24 h-24 text-white/30 absolute z-0" />
                </div>

                {/* Nome + descrizione */}
                <div className="flex flex-col justify-center">
                  <h3 className="font-heading text-white text-2xl md:text-3xl font-semibold mb-4">
                    {member.name}
                  </h3>
                  <p className="font-body text-white/80 text-sm md:text-base leading-relaxed max-w-md">
                    {member.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Fila card piccole – hover per selezionare */}
        <div className="flex flex-wrap gap-6 md:gap-8">
          {teamMembers.map((member) => {
            const isActive = member.id === activeId;
            return (
              <button
                key={member.id}
                id={`team-card-${member.id}`}
                onMouseEnter={() => handleSelect(member.id)}
                onClick={() => handleSelect(member.id)}
                aria-pressed={isActive}
                className={`flex flex-col items-center gap-2 focus:outline-none transition-all duration-300 ${
                  isActive
                    ? "opacity-100 scale-105"
                    : "opacity-55 hover:opacity-85 hover:scale-105"
                }`}
              >

                <div
                  className={`w-24 h-32 rounded-xl border flex items-center justify-center overflow-hidden transition-all duration-300 ${
                    isActive
                      ? "bg-white/20 border-white/50"
                      : "bg-white/10 border-white/15"
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

