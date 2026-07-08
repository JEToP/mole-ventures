import Image from 'next/image';
import ScrollCue from '@/components/ScrollCue';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden bg-[#05155E]">
      {/* Background image. Mobile: ancorata per mostrare più cielo nella zona
          alta (dove cade "ETA"). Desktop: ancorata in alto. */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/home-hero.avif"
          alt="Hero background"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRpoAAABXRUJQVlA4II4AAAAQBACdASoUAA0APu1iqU2ppaQiMAgBMB2JYwCdAYvMrRRWy7cl06RSgAD+CTO9JcDOK9MUSUERm1i5+ogcyPlpJeZqUL2x8UDewbXbqAyVkFHEpquKWRABlz147MPHlJl1PoW18IFf6/yUpwbxNpequtWAC3WCZdTIcoNe0o6HWU1vguPae0fW4eWoZAAA"
          className="object-cover object-center md:object-bottom opacity-100"
          sizes="100vw"
        />
      </div>

      {/* Overlay chiaro: schiarisce l'immagine sul bianco (tema light) */}
      <div className="absolute inset-0 bg-white/55" />

      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-blue-deep text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
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

          <div className="border-l-2 border-blue-deep/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
            <p className="font-body font-medium text-blue-deep text-base md:text-xl leading-relaxed">
              Investiamo in prima persona nell&apos;azienda per innescare le dinamiche di cambiamento
              e di discontinuità necessarie a sbloccare il potenziale inespresso e generare le
              successive opportunità di sviluppo
            </p>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}