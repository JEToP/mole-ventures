import LeFasiInterventoSection from "./fasi/organisms/LeFasiInterventoSection";
import Image from 'next/image';
import ContattiSection from "@/components/home/ContattiSection";
import ScrollCue from "@/components/ScrollCue";

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
  return (
    <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden bg-blue-deep">
      {/* Background image: adesso occupa tutto lo schermo ed è gestita come la Home */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero-metodo.webp"
          alt="Metodo background"
          fill
          priority
          className="object-cover object-center opacity-90"
          sizes="100vw"
        />
      </div>

      {/* Overlay come da Figma: colore #000110 al 37% (stesso di Aree) */}
      <div className="absolute inset-0 bg-[#000110]/[0.37]" />

      {/* Sfumatura in alto: navy nella safe area che sfuma dolcemente (mobile) */}
      <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#01061A] from-[15%] via-[#01061A]/50 via-[50%] to-transparent md:hidden z-0" />

      {/* Contenuto: stessa impostazione della hero "Aree di intervento" */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
            Il nostro metodo
          </h1>

          <div className="border-l-2 border-white/60 pl-4 max-w-xl">
            <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
              Ogni azienda per continuare a evolvere deve impostare il proprio percorso di crescita, di
              evoluzione e di rafforzamento rimettendo in discussione il proprio status quo. Noi
              lavoriamo sul rinnovare l&apos;ecosistema esterno ed interno all&apos;azienda, nuovi soci,
              nuove risorse e idee per rendere possibili scenari che non riuscivano a materializzarsi.
            </p>
          </div>
        </div>
      </div>

      <ScrollCue />
    </section>
  );
}