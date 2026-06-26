import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-4 md:pt-[152px] md:pb-8 overflow-hidden">
      {/* Background image – brightness leggermente ridotta per più contrasto */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center brightness-[0.90]"
          sizes="100vw"
        />
      </div>

      {/* Overlay brand: sfumatura navy profondo → blue deep per profondità e identità */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#01061A]/85 via-[#05155E]/55 to-[#05155E]/0 md:to-black/70" />

      {/* Sfumatura in alto: navy profondo nella safe area che sfuma molto dolcemente verso il basso (visibile solo su mobile) */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#01061A] from-[15%] via-[#01061A]/50 via-[50%] to-transparent md:hidden z-0" />

      {/* Overlay laterale: tocco leggero a sinistra, la foto è già scura lì */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white/85 text-[2.4rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10 [text-shadow:_0_2px_16px_rgba(0,0,0,0.5)]">
            Un meccanismo{' '}<br className="md:hidden" />
            di{' '}
            <span className="bg-[linear-gradient(115deg,_#2E73C4_0%,_#4CACF8_35%,_#9FD2FB_50%,_#4CACF8_65%,_#2E73C4_100%)] bg-clip-text text-transparent [text-shadow:none] font-bold">ETA</span>
            <span className="hidden md:inline">{' '}(Entrepreneurship Through Acquisition)</span>
            {' '}come{' '}<br className="md:hidden" />
            motore di{' '}<br className="md:hidden" />
            cambiamento per{' '}<br className="md:hidden" />
            una nuova fase di{' '}<br className="md:hidden" />
            sviluppo
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
            <p className="font-body font-light text-white/80 text-base md:text-lg leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
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