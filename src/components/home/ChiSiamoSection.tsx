import Image from 'next/image';

export default function ChiSiamoSection() {
  return (
    <section className="bg-[radial-gradient(ellipse_80%_80%_at_70%_50%,_#1547c8_0%,_#05155E_65%)] py-0 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-stretch min-h-[500px]">
        {/* Etichetta "Chi siamo" in alto a sinistra */}
        <div className="md:hidden px-6 pt-12 pb-4">
          <h2 className="font-heading text-white text-3xl font-semibold">Chi siamo</h2>
        </div>

        {/* Colonna sinistra: etichetta + immagine Mole */}
        <div className="relative flex flex-col w-full md:w-[38%] flex-shrink-0">
          {/* Etichetta desktop */}
          <div className="hidden md:block absolute top-10 left-8 z-10">
            <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold leading-tight">
              Chi<br />siamo
            </h2>
          </div>
          {/* Immagine Mole Antonelliana */}
          <div className="relative w-full h-[450px] md:h-full min-h-[450px] overflow-hidden">
            <Image
              src="/images/mole.webp"
              alt="Mole Antonelliana - Torino"
              fill
              className="object-cover object-top scale-125 origin-top"
              unoptimized
            />
          </div>
        </div>

        {/* Colonna destra: titolo + bullet list */}
        <div className="flex-1 flex flex-col justify-center px-8 md:px-12 py-12">
          <p className="font-heading text-white text-xl md:text-2xl lg:text-3xl font-semibold leading-snug mb-10">
            Siamo una realtà focalizzata su processi di{' '}
            Entrepreneurship Through Acquisition.
          </p>

          <ul className="flex flex-col gap-6">
            <li className="flex gap-0">
              <div className="border-l-2 border-white/60 pl-4">
                <p className="font-body text-white/90 text-sm md:text-base leading-relaxed">
                  Acquisiamo PMI che necessitano di una fase di cambiamento e le guidiamo in prima persona.
                </p>
              </div>
            </li>
            <li className="flex gap-0">
              <div className="border-l-2 border-white/60 pl-4">
                <p className="font-body text-white/90 text-sm md:text-base leading-relaxed">
                  Generiamo la discontinuità necessaria per sbloccare il potenziale latente dell&apos;impresa.
                </p>
              </div>
            </li>
            <li className="flex gap-0">
              <div className="border-l-2 border-white/60 pl-4">
                <p className="font-body text-white/90 text-sm md:text-base leading-relaxed">
                  Costruiamo un ecosistema fatto di nuova imprenditorialità, management qualificato e continuità con il suo DNA storico, accompagnandola verso una nuova fase di successo.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

