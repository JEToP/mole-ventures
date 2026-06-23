"use client";

import Image from "next/image";

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
    <section className="relative w-full overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/team.webp')" }}
      />
      {/* Overlay scuro */}
      <div className="absolute inset-0 bg-black/55" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-28">
        {/* Intestazione */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-4">
          Il nostro team
        </h2>
        <p className="font-body text-white/80 text-sm md:text-base max-w-3xl mb-20 leading-relaxed">
          Siamo professionisti che hanno deciso di condividere le loro competenze e le precedenti
          esperienze maturate in ruoli apicali e strategici in realtà di rilievo nazionali e
          internazionali così da poter sostenere ogni fase di cambiamento all&apos;interno delle
          realtà acquisite.
        </p>

        {/* Card affiancate – solo Matteo Gera e Francesco Motta */}
        <div className="flex justify-center gap-14 md:gap-24">
          {/* Card Matteo Gera */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-52 h-64 md:w-60 md:h-72 rounded-2xl bg-white/90 border border-white/30 flex items-center justify-center shadow-xl overflow-hidden">
              <Image
                src="/images/team/matteo-gera.jpg"
                alt="Matteo Gera"
                width={240}
                height={288}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="font-body text-white text-base md:text-lg font-semibold text-center">
              Matteo Gera
            </span>
          </div>

          {/* Card Francesco Motta */}
          <div className="flex flex-col items-center gap-4">
            <div className="w-52 h-64 md:w-60 md:h-72 rounded-2xl bg-white/90 border border-white/30 flex items-center justify-center shadow-xl overflow-hidden">
              <Image
                src="/images/team/francesco-motta.jpg"
                alt="Francesco Motta"
                width={240}
                height={288}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <span className="font-body text-white text-base md:text-lg font-semibold text-center">
              Francesco Motta
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

