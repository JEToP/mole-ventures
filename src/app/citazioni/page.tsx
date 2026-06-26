import Image from 'next/image';
import FadeInSection from './FadeInSection';

export const metadata = {
  title: 'Citazioni e Insight - Mole Venture',
  description: 'Rassegna stampa e insight su Mole Venture.',
};

export default function Citazioni() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-screen bg-[#01061A]">
      {/* Header Background per la Navbar */}
      <div className="w-full h-[120px] md:h-[160px] bg-gradient-to-r from-blue-deep via-blue-kinetic to-blue-deep shrink-0" />

      {/* Titolo e Introduzione */}
      <FadeInSection className="w-full max-w-5xl mx-auto px-4 md:px-8 pt-16 pb-8 flex flex-col items-center gap-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white/90 text-center leading-tight font-heading">
          Citazioni e Insight
        </h1>
        <p className="text-white/70 text-base md:text-lg text-center max-w-2xl leading-relaxed">
          La rassegna stampa e gli insight che raccontano il valore di Mole Venture nel mercato italiano
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-blue-kinetic to-blue-soft mt-4 rounded-full" />
      </FadeInSection>

      {/* Main Content - Timeline lineare */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center gap-8">
        
        {/* Prima immagine grande - Eroe */}
        <FadeInSection className="w-full group">
          <div className="transition-transform duration-300 ease-out group-hover:scale-105 origin-center">
            <Image 
              src="/images/immagini_insight/image 8.webp" 
              alt="Senza successore un'azienda su 3" 
              width={1200} height={1500} 
              className="w-full h-auto rounded-xl shadow-xl"
              priority
            />
          </div>
        </FadeInSection>

        {/* Spazio bianco ampio */}
        <div className="h-12" />

        {/* Timeline verticale con articoli */}
        <div className="w-full flex flex-col gap-16">
          
          {/* Articolo 1 */}
          <FadeInSection className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 md:p-6 shadow-[0_28px_60px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              <div className="w-full md:w-1/2">
                <div className="group overflow-hidden rounded-[2rem] bg-[#ffffff] p-3 shadow-sm md:p-4">
                  <div className="transition-transform duration-300 ease-out group-hover:scale-105 origin-center">
                    <Image 
                      src="/images/immagini_insight/Screenshot 2026-06-19 alle 17.00.45 1.webp" 
                      alt="Al via il nuovo fondo" 
                      width={600} height={300} 
                      className="w-full h-auto object-cover rounded-[1.5rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-kinetic to-blue-soft rounded-full mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 font-heading">Al via il nuovo fondo</h3>
                <p className="text-white/70 text-base leading-relaxed">Un'importante notizia sulla nascita di una nuova iniziativa di investimento nel panorama italiano.</p>
              </div>
            </div>
          </FadeInSection>

          {/* Articolo 2 */}
          <FadeInSection className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 md:p-6 shadow-[0_28px_60px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-center md:items-start">
              <div className="w-full md:w-1/2">
                <div className="group overflow-hidden rounded-[2rem] bg-[#ffffff] p-3 shadow-sm md:p-4">
                  <div className="transition-transform duration-300 ease-out group-hover:scale-105 origin-center">
                    <Image 
                      src="/images/immagini_insight/Screenshot 2026-06-19 alle 16.57.51 1.webp" 
                      alt="Fondo Italiano d'Investimento" 
                      width={600} height={300} 
                      className="w-full h-auto object-cover rounded-[1.5rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-kinetic to-blue-soft rounded-full mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 font-heading">Fondo Italiano d'Investimento</h3>
                <p className="text-white/70 text-base leading-relaxed">Un riconoscimento della fiducia nelle nostre strategie di investimento e nella visione imprenditoriale di Mole Venture.</p>
              </div>
            </div>
          </FadeInSection>

          {/* Articolo 3 */}
          <FadeInSection className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 md:p-6 shadow-[0_28px_60px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
              <div className="w-full md:w-1/2">
                <div className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm md:p-4 md:max-w-[30rem] mx-auto">
                  <div className="transition-transform duration-300 ease-out group-hover:scale-105 origin-center">
                    <Image 
                      src="/images/immagini_insight/image 9.webp" 
                      alt="Palazzo Perrone investe nei Search Fund" 
                      width={600} height={400} 
                      className="w-full h-auto object-cover rounded-[1.5rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-kinetic to-blue-soft rounded-full mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 font-heading">Palazzo Perrone investe nei Search Fund</h3>
                <p className="text-white/70 text-base leading-relaxed">Una testimonianza della solidità e dell'affidabilità del nostro modello di business nel mercato degli investimenti alternativi.</p>
              </div>
            </div>
          </FadeInSection>

          {/* Articolo 4 */}
          <FadeInSection className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-5 md:p-6 shadow-[0_28px_60px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col md:flex-row-reverse gap-6 md:gap-8 items-center md:items-start">
              <div className="w-full md:w-1/2">
                <div className="group overflow-hidden rounded-[2rem] bg-white p-3 shadow-sm md:p-4 md:max-w-[30rem] mx-auto">
                  <div className="transition-transform duration-300 ease-out group-hover:scale-105 origin-center">
                    <Image 
                      src="/images/immagini_insight/image 10.webp" 
                      alt="Plafond Crescita" 
                      width={600} height={400} 
                      className="w-full h-auto object-cover rounded-[1.5rem]"
                    />
                  </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col gap-3 text-center md:text-left">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-kinetic to-blue-soft rounded-full mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 font-heading">Plafond Crescita</h3>
                <p className="text-white/70 text-base leading-relaxed">Un riconoscimento della nostra capacità di generare valore e di supportare la crescita delle aziende italiane nel medio-lungo termine.</p>
              </div>
            </div>
          </FadeInSection>

          {/* Articolo 5 - Grande finale */}
          <FadeInSection className="w-full rounded-[2rem] border border-white/10 bg-slate-950/90 p-4 md:p-6 shadow-[0_28px_60px_rgba(0,0,0,0.25)]">
            <div className="flex flex-col gap-4 group w-full">
              <div className="overflow-hidden rounded-3xl">
              <div className="transition-all duration-300 group-hover:scale-105 origin-top">
                <Image 
                  src="/images/immagini_insight/Screenshot 2026-06-19 alle 17.36.52 1.webp" 
                  alt="Il fondo da 1,5 miliardi" 
                  width={1200} height={300} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
              <div className="flex flex-col gap-3 text-center md:text-left">
                <div className="w-8 h-1 bg-gradient-to-r from-blue-kinetic to-blue-soft rounded-full mx-auto md:mx-0" />
                <h3 className="text-2xl md:text-3xl font-bold text-white/90 font-heading">Il fondo da 1,5 miliardi</h3>
                <p className="text-white/70 text-base leading-relaxed">Un nuovo orizzonte per gli investimenti in Italia con una dotazione significativa dedicata a supportare le medie imprese nella loro evoluzione strategica.</p>
              </div>
            </div>
          </FadeInSection>

        </div>

        {/* Separatore elegante */}
        <div className="w-full mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-kinetic to-transparent" />
          <div className="w-2 h-2 rounded-full bg-blue-soft" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-kinetic to-transparent" />
        </div>

        {/* Loghi in fondo con sfondi bianchi */}
        <FadeInSection className="w-full py-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-white rounded-lg p-4 md:p-6 shadow-md">
            <Image src="/images/immagini_insight/MF_Milano_Finanza_logo.svg 1.webp" alt="Milano Finanza" width={150} height={60} className="h-10 md:h-12 w-auto object-contain transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-white rounded-lg p-4 md:p-6 shadow-md">
            <Image src="/images/immagini_insight/SIMEST_LOGO_2020 1.webp" alt="Simest" width={150} height={60} className="h-10 md:h-12 w-auto object-contain transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-white rounded-lg p-4 md:p-6 shadow-md">
            <Image src="/images/immagini_insight/La_Stampa.svg 1.webp" alt="La Stampa" width={150} height={60} className="h-10 md:h-12 w-auto object-contain transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-white rounded-lg p-4 md:p-6 shadow-md">
            <Image src="/images/immagini_insight/corriere_torino_cover 1.webp" alt="Corriere Torino" width={150} height={60} className="h-8 md:h-10 w-auto object-contain transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-white rounded-lg p-4 md:p-6 shadow-md">
            <Image src="/images/immagini_insight/equita 1.webp" alt="Equita" width={150} height={60} className="h-8 md:h-10 w-auto object-contain transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2 bg-white rounded-lg p-4 md:p-6 shadow-md">
            <Image src="/images/immagini_insight/Fondo-italiano-dinvestimento 1.webp" alt="Fondo Italiano d'Investimento" width={150} height={60} className="h-12 md:h-14 w-auto object-contain transition-opacity" />
          </div>
        </FadeInSection>
        
      </main>
    </div>
  );
}
