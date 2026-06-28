import Link from "next/link";
import LeFasiInterventoSection from "./fasi/organisms/LeFasiInterventoSection";
import Image from 'next/image';
import ContattiSection from "@/components/home/ContattiSection";

export default function IlNostroMetodoSection() {
  return (
    <div className="overflow-x-hidden bg-blue-deep text-white">
      <MetodoHero />
      <LeFasiInterventoSection />
      {/* Utilizza direttamente il blocco della home importato */}
      <ContattiSection /> 
    </div>
  );
}

function MetodoHero() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center pt-24 pb-4 md:pt-[152px] md:pb-8 overflow-hidden bg-blue-deep">
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

      {/* Sfumature e Overlay ereditati dallo stile della pagina */}
      <div className="absolute inset-0 bg-[#000110]/[0.37]" />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-deep/10 via-blue-deep/30 to-blue-deep/90" />

      {/* Contenuto: perfettamente allineato e speculare alla Home */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
        <div className="max-w-4xl">
          <h1 className="font-heading text-white text-[2.5rem] sm:text-5xl md:text-5xl lg:text-[4.5rem] font-semibold leading-[1.15] md:leading-none tracking-normal mb-8 md:mb-10">
            Il nostro metodo
          </h1>

          <div className="border-l-2 border-white/80 pl-4 max-w-xl md:max-w-4xl">
            <p className="font-body text-sm font-semibold leading-tight md:leading-relaxed tracking-normal text-white md:text-[20px]">
              Ogni azienda per continuare a evolvere deve impostare il proprio percorso di crescita, di
              evoluzione e di rafforzamento rimettendo in discussione il proprio status quo. Noi
              lavoriamo sul rinnovare l&apos;ecosistema esterno ed interno all&apos;azienda, nuovi soci,
              nuove risorse e idee per rendere possibili scenari che non riuscivano a materializzarsi.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}