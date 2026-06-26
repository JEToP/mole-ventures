import Image from "next/image";
import Link from "next/link";

// ──────────────────────────────────────────────────────────────────────────────
// Footer del sito. Componente separato: va inserito nel layout globale
// (app/layout.tsx) così appare in fondo a tutte le pagine.
//
// I valori segnati con TODO sono PLACEHOLDER: sostituire con i dati reali
// di Mole Venture (email, P.IVA, ragione sociale, eventuali social).
// ──────────────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/approccio", label: "Metodo e strategia" },
  { href: "/aree-di-intervento", label: "Aree di intervento" },
  { href: "/citazioni", label: "Insight" },
  { href: "/contatti", label: "Contatti" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030d3d] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        {/* Riga principale: brand + colonne */}
        <div className="flex flex-col md:flex-row md:justify-between gap-12 md:gap-8">
          {/* Colonna brand */}
          <div className="max-w-xs">
            <Image
              src="/images/logo.png"
              alt="Mole Venture"
              width={180}
              height={180}
              className="h-20 w-auto object-contain mix-blend-screen mb-5"
              unoptimized
            />
            <p className="font-body font-light text-white/60 text-sm leading-relaxed">
              Entriamo in prima persona nell&apos;azienda per innescare le dinamiche di cambiamento
              e generare nuove opportunità di sviluppo.
            </p>
          </div>

          {/* Colonna navigazione */}
          <div>
            <h3 className="font-heading text-white text-sm font-semibold uppercase tracking-[0.15em] mb-5">
              Naviga
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body font-light text-white/70 text-sm hover:text-blue-soft transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna contatti */}
          <div>
            <h3 className="font-heading text-white text-sm font-semibold uppercase tracking-[0.15em] mb-5">
              Contatti
            </h3>
            <ul className="flex flex-col gap-3 font-body font-light text-white/70 text-sm">
              <li>
                {/* TODO: sostituire con l'email reale */}
                <a
                  href="mailto:info@moleventure.com"
                  className="hover:text-blue-soft transition-colors duration-200"
                >
                  info@moleventure.com
                </a>
              </li>
              <li>
                {/* TODO: sostituire con il telefono reale (o rimuovere) */}
                <a
                  href="tel:+390000000000"
                  className="hover:text-blue-soft transition-colors duration-200"
                >
                  +39 000 000 0000
                </a>
              </li>
              <li className="text-white/50">
                {/* TODO: sostituire con la sede reale */}
                Torino, Italia
              </li>
            </ul>

            {/* Social – TODO: inserire i link reali o rimuovere */}
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-white/60 hover:text-blue-soft transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Riga inferiore: copyright + credito JEToP */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <p className="font-body font-light text-white/45 text-xs">
            {/* TODO: sostituire con la ragione sociale e la P.IVA reali */}
            © {year} Mole Venture. P.IVA 00000000000. Tutti i diritti riservati.
          </p>
          <p className="font-body font-light text-white/45 text-xs">
            Sito sviluppato da{" "}
            <a
              href="https://jetop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-soft transition-colors duration-200 font-normal"
            >
              JEToP
            </a>
            {" "}— All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}