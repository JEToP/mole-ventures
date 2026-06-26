import Image from 'next/image';
import Link from 'next/link';

export default function ContattiSection() {
  return (
    <section className="bg-[radial-gradient(ellipse_at_center,_#1a4fd6_0%,_#05155E_70%)] py-20 px-6 md:px-16 relative">
      <div className="max-w-7xl mx-auto">
        {/* Riga superiore: testo a sinistra, logo a destra */}
        <div className="flex flex-col md:flex-row items-start justify-between mb-10 md:mb-12 gap-8 md:gap-0">
          <div className="flex-1">
            <h2 className="font-heading text-white text-3xl md:text-4xl lg:text-5xl font-semibold mb-4 md:mb-5 leading-tight max-w-xl">
              Costruiamo insieme la prossima fase della tua impresa
            </h2>
            <p className="font-body text-white/85 text-sm md:text-base">
              Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
            </p>
          </div>

          {/* Logo in alto a destra, abbassato */}
          <div className="hidden md:block flex-shrink-0 self-end ml-10">
            <Image
              src="/images/logo.png"
              alt="Mole Venture"
              width={160}
              height={160}
              className="h-24 md:h-28 w-auto object-contain mix-blend-screen opacity-90"
              unoptimized
            />
          </div>
        </div>

        {/* Bottone centrato su tutta la larghezza */}
        <div className="flex justify-center">
          <Link
            href="/contatti"
            className="inline-block bg-white text-[#05155E] font-body font-semibold text-base md:text-lg px-24 py-5 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
          >
            Contattaci
          </Link>
        </div>
      </div>
    </section>
  );
}



