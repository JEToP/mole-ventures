import Image from 'next/image';
import Link from 'next/link';

export default function ContattiSection() {
  return (
    <section className="relative w-full overflow-hidden bg-[#05155E]">
      {/* Background image (ha già il suo gradiente, nessun overlay) */}
      <div className="absolute inset-0">
        <Image
          src="/images/background_contatti.webp"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          aria-hidden="true"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 py-20 md:py-24">
        {/* Riga superiore: testo a sinistra */}
        <div className="mb-12 md:mb-16">
          <div className="max-w-2xl">
            <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 [text-shadow:_0_2px_16px_rgba(0,0,0,0.5)] leading-tight">
              Costruiamo insieme la prossima fase della tua impresa
            </h2>
            <span className="block h-1 w-12 bg-blue-soft rounded-full mb-6" />
            <p className="font-body font-light text-white/80 text-base md:text-lg leading-relaxed max-w-xl [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
              Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
            </p>
          </div>
        </div>

        {/* Bottone */}
        <div className="flex justify-center md:justify-start">
          <Link
            href="/contatti"
            className="group inline-flex items-center gap-3 bg-white text-[#05155E] font-body font-semibold text-base md:text-lg px-10 md:px-14 py-4 md:py-5 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(0,0,0,0.25)] hover:shadow-[0_8px_24px_rgba(76,172,248,0.35)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-soft focus-visible:ring-offset-2 focus-visible:ring-offset-[#05155E]"
          >
            Contattaci
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}