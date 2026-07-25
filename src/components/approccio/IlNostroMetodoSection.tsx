import Image from 'next/image';
import { useTranslations } from 'next-intl';
import ScrollCue from "@/components/ScrollCue";
import dynamic from "next/dynamic";

const LeFasiInterventoSection = dynamic(() => import("./fasi/organisms/LeFasiInterventoSection"));
const ContattiSection = dynamic(() => import("@/components/home/ContattiSection"));

export default function IlNostroMetodoSection() {
  return (
    <div className="overflow-x-clip bg-blue-deep text-white">
      <MetodoHero />
      <LeFasiInterventoSection />
      {/* Utilizza direttamente il blocco della home importato */}
      <ContattiSection />
    </div>
  );
}

function MetodoHero() {
  const t = useTranslations('Method.hero');
  return (
    <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden bg-blue-deep">
      {/* Background image: adesso occupa tutto lo schermo ed è gestita come la Home */}
      <div className="absolute inset-0">
        {/* Mobile image */}
        <Image
          src="/images/hero/metodo/metodo-bg-def-mobile.webp"
          alt="Metodo background"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAACwAQCdASoGAAoABUB8JQAAU20vKpgAANuBNofgItEjt8dgsNEMoZtLUisl2g8AAAA="
          className="object-cover object-[25%_center] md:hidden"
          sizes="100vw"
        />
        {/* Desktop image */}
        <Image
          src="/images/hero/metodo/metodo-bg-def-desktop.webp"
          alt="Metodo background"
          fill
          priority
          placeholder="blur"
          blurDataURL="data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAABwAQCdASoKAAYABUB8JZwAAiPP4ADgGB6ihhpBJlq3m+bwcazCjm2KKl10x+AcAAA="
          className="object-cover object-center hidden md:block"
          sizes="100vw"
        />
      </div>



      {/* Contenuto: stessa impostazione della hero "Aree di intervento" */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
            {t('title')}
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl">
            <p className="font-body font-light text-white text-base md:text-xl leading-relaxed">
              {t('paragraph')}
            </p>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}