"use client";

import Image from "next/image";

// ──────────────────────────────────────────────────────────────────────────────
// Per aggiungere un membro del team, aggiungi un oggetto a questo array.
// Le foto vanno in public/images/team/<id>.<ext>
// Foto a bassa risoluzione → mostrate come ritratto contenuto, non stirate.
// ──────────────────────────────────────────────────────────────────────────────
const teamMembers = [
  {
    id: "matteo-gera",
    name: "Matteo Gera",
    photo: "/images/team/matteo-gera.jpg",
    description:
      "Chief Executive con importanti e consolidate esperienze di sviluppo business e di gestione di P&L completi in aziende family owned business e multinazionali operanti nei settori Transportation, Rail, Aerospace & Defense, Energy e Industrial Goods sia in contesti nazionali che internazionali. Strutturato e diretto molteplici operazioni di M&A e integrazione. Finalizzata con successo una quotazione all’Euronext Growth Milan partecipando a tutti gli step del processo.",
  },
  {
    id: "francesco-motta",
    name: "Francesco Motta",
    photo: "/images/team/francesco-motta.png",
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
  return (
    <section className="relative w-full overflow-hidden bg-[#05155E]">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/background_team.webp')" }}
      />
      {/* Gradiente VERTICALE: blu acceso e luminoso in ALTO (dove era nero),
          che si dirada verso il basso lasciando EMERGERE la foto dei grattacieli. */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1a47b0] via-[#0a2a8a]/70 via-30% to-transparent to-70%" />
      {/* Bagliore luminoso in alto a destra (la zona che era più nera) */}
      <div aria-hidden="true" className="pointer-events-none absolute -top-[15%] right-0 w-[45rem] h-[30rem] rounded-full bg-blue-soft/25 blur-[150px]" />
      {/* Leggerissimo velo navy solo dietro al testo in alto a sinistra, per leggibilità */}
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-br from-[#05155E]/45 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Intestazione – stile coerente con "Chi siamo" */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-6">
          Il nostro team
        </h2>
        <p className="font-body font-light text-white text-base md:text-lg max-w-3xl mb-12 md:mb-16 leading-relaxed">
          Siamo professionisti che hanno deciso di condividere le loro competenze e le precedenti
          esperienze maturate in ruoli apicali e strategici in realtà di rilievo nazionali e
          internazionali così da poter sostenere ogni fase di cambiamento all&apos;interno delle
          realtà acquisite.
        </p>

        {/* Card compatte affiancate (altezza adattata al contenuto) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {teamMembers.map((member) => (
            <article
              key={member.id}
              className="flex flex-col sm:flex-row gap-5 sm:gap-6 rounded-2xl border border-white/15 bg-white/[0.07] backdrop-blur-md p-6 md:p-7"
            >
              {/* Ritratto contenuto */}
              <div className="relative h-32 w-32 sm:h-36 sm:w-36 flex-shrink-0 overflow-hidden rounded-xl border border-white/20 bg-white/10 shadow-lg">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  sizes="144px"
                  className="object-cover object-center"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="absolute inset-0 -z-10 flex items-center justify-center">
                  <PersonIcon className="w-12 h-12 text-white/30" />
                </div>
              </div>

              {/* Nome + bio */}
              <div className="min-w-0 flex-1">
                <h3 className="font-heading text-white text-xl md:text-2xl font-semibold leading-tight mb-3">
                  {member.name}
                </h3>
                <p className="font-body font-light text-white/90 text-sm md:text-base leading-relaxed">
                  {member.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}