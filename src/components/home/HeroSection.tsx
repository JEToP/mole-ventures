import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-4 md:pt-[152px] md:pb-8 overflow-hidden bg-[#05155E]">
      {/* Background image. Mobile: ancorata per mostrare più cielo nella zona
          alta (dove cade "ETA"). Desktop: ancorata in alto. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover object-[78%_8%] md:object-top opacity-90"
          sizes="100vw"
        />
      </div>

      {/* Overlay come da Figma: colore #000110 al 37% */}
      <div className="absolute inset-0 bg-[#000110]/[0.37]" />

      {/* Sfumatura in alto: navy nella safe area che sfuma dolcemente (mobile) */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#01061A] from-[15%] via-[#01061A]/50 via-[50%] to-transparent md:hidden z-0" />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
            Un meccanismo{' '}<br className="md:hidden" />
            di{' '}
            <span className="text-blue-deep font-bold">ETA</span>
            <span className="block md:inline">{' '}(Entrepreneurship Through Acquisition)</span>
            {' '}come{' '}<br className="md:hidden" />
            motore di{' '}<br className="md:hidden" />
            cambiamento per{' '}<br className="md:hidden" />
            una nuova fase di{' '}<br className="md:hidden" />
            sviluppo
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
            <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
              Entriamo in prima persona nell&apos;azienda per innescare le dinamiche di cambiamento
              e di discontinuità necessarie a sbloccare il potenziale inespresso e generare le
              successive opportunità di sviluppo
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}