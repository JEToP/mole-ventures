import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ContattiSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#05155E]">
      {/* Sfondo mobile (verticale) */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url('/images/background_contatti_mobile.webp')" }}
        aria-hidden="true"
      />
      {/* Sfondo desktop (panoramico) */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/images/background_contatti.webp')" }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Riga superiore: testo a sinistra */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-4xl">
            <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 leading-tight">
              Costruiamo insieme la prossima<br /> fase della tua impresa
            </h2>
            <p className="font-body font-light text-white text-base md:text-lg leading-relaxed max-w-xl">
              Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
            </p>
          </div>
        </div>

        {/* Bottone */}
        <div className="flex justify-start">
          <Link
            href="/contatti"
            className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-body text-base font-semibold text-blue-deep transition-colors duration-300 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep md:text-lg"
          >
            Contattaci
            <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
          </Link>
        </div>
      </div>
    </section>
  );
}