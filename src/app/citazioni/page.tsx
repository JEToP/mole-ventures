import Image from 'next/image';
import FadeInOnScroll from '@/components/FadeInOnScroll';

export const metadata = {
  title: 'Citazioni e Insight - Mole Venture',
  description: 'Rassegna stampa e insight su Mole Venture.',
};

export default function Citazioni() {
  return (
    <div className="flex-1 w-full flex flex-col min-h-screen bg-[#ffffff]">
      {/* Header Background per la Navbar */}
      <div className="w-full h-[120px] md:h-[160px] bg-gradient-to-r from-blue-deep via-blue-kinetic to-blue-deep shrink-0" />

      {/* Main Content - Collage di immagini */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 md:px-8 py-12 flex flex-col items-center gap-8">
        
        {/* Mobile stack cards */}
        <div className="w-full flex flex-col gap-6 md:hidden">
          <FadeInOnScroll className="w-full rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(56,189,248,0.16)] ring-1 ring-blue-soft/30 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            <Image
              src="/images/immagini_insight/senzaSuccessoreFull.webp"
              alt="Senza successore un'azienda su 3"
              width={1200}
              height={1500}
              className="w-full h-auto object-cover"
            />
          </FadeInOnScroll>
          <div className="flex justify-center">
            <div className="h-1 w-[20%] rounded-full bg-gradient-to-r from-blue-soft via-blue-kinetic to-blue-soft/70" />
          </div>
          <FadeInOnScroll className="w-[90%] self-end rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(56,189,248,0.16)] ring-1 ring-blue-soft/30 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            <Image
              src="/images/immagini_insight/ilFondoDa.webp"
              alt="Al via il nuovo fondo"
              width={800}
              height={200}
              className="w-full h-auto object-cover"
            />
          </FadeInOnScroll>
          <div className="flex justify-center">
            <div className="h-1 w-[20%] rounded-full bg-gradient-to-r from-blue-soft via-blue-kinetic to-blue-soft/70" />
          </div>
          <FadeInOnScroll className="w-full rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(56,189,248,0.16)] ring-1 ring-blue-soft/30 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            <Image
              src="/images/immagini_insight/fondoItaliano.webp"
              alt="Fondo Italiano d'Investimento"
              width={800}
              height={300}
              className="w-full h-auto object-cover"
            />
          </FadeInOnScroll>
          <div className="flex justify-center">
            <div className="h-1 w-[20%] rounded-full bg-gradient-to-r from-blue-soft via-blue-kinetic to-blue-soft/70" />
          </div>
          <FadeInOnScroll className="w-[85%] self-start rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(56,189,248,0.16)] ring-1 ring-blue-soft/30 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            <Image
              src="/images/immagini_insight/palazzoPerrone.webp"
              alt="Palazzo Perrone investe nei Search Fund"
              width={600}
              height={400}
              className="w-full h-auto object-cover"
            />
          </FadeInOnScroll>
          <div className="flex justify-center">
            <div className="h-1 w-[20%] rounded-full bg-gradient-to-r from-blue-soft via-blue-kinetic to-blue-soft/70" />
          </div>
          <FadeInOnScroll className="w-[90%] self-end rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(56,189,248,0.16)] ring-1 ring-blue-soft/30 overflow-hidden p-2 transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            <Image
              src="/images/immagini_insight/plafondCrescita.webp"
              alt="Plafond Crescita"
              width={350}
              height={200}
              className="w-full h-auto object-cover"
            />
          </FadeInOnScroll>
          <div className="flex justify-center">
            <div className="h-1 w-[20%] rounded-full bg-gradient-to-r from-blue-soft via-blue-kinetic to-blue-soft/70" />
          </div>
          <FadeInOnScroll className="w-full rounded-[2rem] bg-white shadow-[0_24px_60px_rgba(56,189,248,0.16)] ring-1 ring-blue-soft/30 overflow-hidden transition-transform duration-300 ease-out hover:scale-105 active:scale-95">
            <Image
              src="/images/immagini_insight/ilFondoDa.webp"
              alt="Il fondo da 1,5 miliardi"
              width={1200}
              height={200}
              className="w-full h-auto object-cover"
            />
          </FadeInOnScroll>
        </div>

        {/* Desktop collage */}
        <div className="hidden md:block w-full">
          <FadeInOnScroll className="relative w-full group">
            {/* Base image (Titolo e colonna sinistra) */}
            <div className="transition-transform duration-300 ease-out group-hover:scale-105">
              <Image 
                src="/images/immagini_insight/senzaSuccessoreFull.webp" 
                alt="Senza successore un'azienda su 3" 
                width={1200} height={1500} 
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>

            {/* Overlays testuali colonna destra - Responsive */}
            <div className="hidden md:flex absolute top-[28%] right-0 w-[65%] flex-col gap-6 md:gap-12">
              <div className="transition-transform duration-300 ease-out hover:scale-105 rounded-[2rem] overflow-hidden bg-[#ffffff] ring-2 ring-blue-soft/90 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
                <Image 
                  src="/images/immagini_insight/ilFondoDa.webp" 
                  alt="Al via il nuovo fondo" 
                  width={800} height={200} 
                  className="w-full h-auto rounded-[2rem] object-cover"
                />
              </div>
              <div className="transition-transform duration-300 ease-out hover:scale-105 rounded-[2rem] overflow-hidden bg-[#ffffff] ring-2 ring-blue-soft/90 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
                <Image 
                  src="/images/immagini_insight/fondoItaliano.webp" 
                  alt="Fondo Italiano d'Investimento" 
                  width={800} height={300} 
                  className="w-full h-auto rounded-[2rem] object-cover"
                />
              </div>
            </div>

            {/* Overlay Palazzo Perrone - Responsive */}
            <div className="hidden md:block absolute top-[75%] right-[2%] w-[42%] transition-transform duration-300 ease-out hover:scale-105 rounded-[2rem] overflow-hidden bg-[#ffffff] ring-2 ring-blue-soft/90 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
               <Image 
                src="/images/immagini_insight/palazzoPerrone.webp" 
                alt="Palazzo Perrone investe nei Search Fund" 
                width={600} height={400} 
                className="w-full h-auto rounded-[2rem] object-cover"
              />
            </div>

            {/* Overlay Plafond Crescita - Responsive */}
            <div className="hidden md:block absolute top-[90%] left-[2%] w-[35%] p-2 transition-transform duration-300 ease-out hover:scale-105 rounded-[2rem] overflow-hidden bg-[#ffffff] ring-2 ring-blue-soft/90 shadow-[0_0_20px_rgba(56,189,248,0.35)] hover:shadow-[0_0_40px_rgba(56,189,248,0.3)]">
               <Image 
                src="/images/immagini_insight/plafondCrescita.webp" 
                alt="Plafond Crescita" 
                width={350} height={200} 
                className="w-full h-auto object-cover"
              />
            </div>
          </FadeInOnScroll>

          {/* Banner finale largo con stile migliorato */}
          <FadeInOnScroll className="w-full mt-8 relative group">
            <div className="transition-transform duration-300 ease-out group-hover:scale-105 rounded-[2rem] overflow-hidden bg-[#ffffff] ring-1 ring-white/20 shadow-[0_30px_80px_rgba(255,255,255,0.18)]">
              <Image 
                src="/images/immagini_insight/ilFondoDa.webp" 
                alt="Il fondo da 1,5 miliardi" 
                width={1200} height={200} 
                className="w-full h-auto rounded-[2rem] object-cover"
              />
            </div>
          </FadeInOnScroll>
        </div>

        {/* Separatore elegante */}
        <div className="w-full mt-16 flex items-center gap-4">
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-kinetic to-transparent" />
          <div className="w-2 h-2 rounded-full bg-blue-soft" />
          <div className="flex-1 h-px bg-gradient-to-r from-transparent via-blue-kinetic to-transparent" />
        </div>

        {/* Loghi in fondo con stile migliorato */}
        <FadeInOnScroll className="w-full py-16 flex flex-wrap justify-center items-center gap-8 md:gap-12 lg:gap-16">
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <Image src="/images/immagini_insight/MF_Milano_Finanza_logo.svg 1.webp" alt="Milano Finanza" width={150} height={60} className="h-10 md:h-12 w-auto object-contain mix-blend-multiply filter opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <Image src="/images/immagini_insight/SIMEST_LOGO_2020 1.webp" alt="Simest" width={150} height={60} className="h-10 md:h-12 w-auto object-contain mix-blend-multiply filter opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <Image src="/images/immagini_insight/La_Stampa.svg 1.webp" alt="La Stampa" width={150} height={60} className="h-10 md:h-12 w-auto object-contain mix-blend-multiply filter opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <Image src="/images/immagini_insight/corriere_torino_cover 1.webp" alt="Corriere Torino" width={150} height={60} className="h-8 md:h-10 w-auto object-contain mix-blend-multiply filter opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <Image src="/images/immagini_insight/equita 1.webp" alt="Equita" width={150} height={60} className="h-8 md:h-10 w-auto object-contain mix-blend-multiply filter opacity-70 hover:opacity-100 transition-opacity" />
          </div>
          <div className="transform transition-all duration-300 hover:scale-110 hover:-translate-y-2">
            <Image src="/images/immagini_insight/Fondo-italiano-dinvestimento 1.webp" alt="Fondo Italiano d'Investimento" width={150} height={60} className="h-12 md:h-14 w-auto object-contain mix-blend-multiply filter opacity-70 hover:opacity-100 transition-opacity" />
          </div>
        </FadeInOnScroll>
        
      </main>
    </div>
  );
}
