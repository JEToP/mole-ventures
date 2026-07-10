import Image from 'next/image';
import ScrollCue from '@/components/ScrollCue';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden bg-[#05155E]">
      {/* Background image. Mobile: ancorata per mostrare più cielo nella zona
          alta (dove cade "ETA"). Desktop: ancorata in alto. */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <Image
          src="/images/hero/home/home-bg-def-mobile.webp"
          alt="Hero background"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRl4AAABXRUJQVlA4WAoAAAAQAAAABQAACQAAQUxQSAoAAAABB1D9iAhERP8DVlA4IC4AAADwAQCdASoGAAoABUB8JYwCdADcrrRYoAAAzinSxB0cLHq2o0VvTWi28716AAAA"
          className="object-cover object-center opacity-100 md:hidden"
          sizes="100vw"
        />
        {/* Desktop image */}
        <Image
          src="/images/hero/home/home-bg-def-desktop.webp"
          alt="Hero background"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRmQAAABXRUJQVlA4WAoAAAAQAAAACQAABQAAQUxQSAoAAAABB1D9iAhERP8DVlA4IDQAAADwAQCdASoKAAYABUB8JQBOgCPWGADwMEAA/s4C0kTTGKo1zZccQUpifeJrfkq4nmkFA/gA"
          className="object-cover object-bottom opacity-100 hidden md:block"
          sizes="100vw"
        />
      </div>



      {/* Contenuto */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
            Un meccanismo{' '}<br className="md:hidden" />
            di <span className="text-white font-bold">ETA</span>{' '}<br className="md:hidden" />
            (Entrepreneurship Through{' '}<br className="md:hidden" />
            Acquisition){' '}<br className="md:hidden" />
            come motore di{' '}<br className="md:hidden" />
            cambiamento per una{' '}<br className="md:hidden" />
            nuova fase di sviluppo
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
            <p className="font-body font-light text-white text-base md:text-xl leading-relaxed">
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