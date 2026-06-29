import Image from "next/image";

export default function InsightsPage() {
  return (
    // Aggiunto pb-12 (mobile) e md:pb-20 (desktop) per creare lo spazio bianco sotto
    <main className="relative w-full bg-white pt-24 pb-12 md:pt-32 md:pb-20">

      {/* CONTENITORE COLLAGE */}
      <div className="relative mx-auto w-full max-w-[1000px] aspect-[1/1.55]">
        
        {/* 1. Base di sfondo principale */}
        <div className="absolute inset-x-0 top-0 w-full">
          <Image
            src="/images/insight/Group 17.png"
            alt="Articolo Fondazione Crt"
            width={1000}
            height={1100}
            className="w-full h-auto object-contain"
            priority
          />
        </div>

        {/* 2. Ritaglio in alto al centro: Fondo Equita Rilancio */}
        <div className="absolute left-[20%] top-[23.5%] w-[80%] z-10">
          <Image
            src="/images/insight/Group 16.png"
            alt="Equita Rilancio"
            width={740}
            height={180}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 3. Blocco in basso a destra: Palazzo Perrone */}
        <div className="absolute right-[1%] top-[54%] w-[54%] z-20">
          <Image
            src="/images/insight/Group 14.png"
            alt="Palazzo Perrone e manager investitori"
            width={540}
            height={320}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 4. Ritaglio in basso a sinistra: Plafond Crescita */}
        <div className="absolute left-[3%] top-[68%] w-[42%] z-20">
          <Image
            src="/images/insight/Group 13.png"
            alt="Plafond Crescita 100 Mln"
            width={420}
            height={110}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 5. Banner orizzontale: Il fondo da 1,5 miliardi */}
        <div className="absolute left-[3%] top-[74%] w-[94%] z-30">
          <Image
            src="/images/insight/Group 18.png"
            alt="Il fondo da 1.5 miliardi"
            width={940}
            height={130}
            className="w-full h-auto object-contain"
          />
        </div>

        {/* 6. GRIGLIA DEI LOGHI */}
        <div className="absolute bottom-[0.5%] inset-x-0 w-full px-[5%] md:px-8 z-40 bg-white">
          <LogosGrid />
        </div>

      </div>
    </main>
  );
}

function LogosGrid() {
  return (
    <div className="w-full">
      {/* Prima riga loghi */}
      <div className="grid grid-cols-3 items-center justify-items-center gap-[2%] md:gap-[4%] mb-3 md:mb-[6%]">
        <div className="w-[90%] max-w-[140px] md:max-w-[160px]">
          <Image
            src="/images/insight/MF_Milano_Finanza_logo.svg 1.png"
            alt="Milano Finanza"
            width={180}
            height={60}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-[85%] max-w-[130px] md:max-w-[150px]">
          <Image
            src="/images/insight/SIMEST_LOGO_2020 1.png"
            alt="Simest"
            width={160}
            height={50}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-[90%] max-w-[150px] md:max-w-[180px]">
          <Image
            src="/images/insight/La_Stampa.svg 1.png"
            alt="La Stampa"
            width={180}
            height={40}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>

      {/* Seconda riga loghi */}
      <div className="grid grid-cols-3 items-center justify-items-center gap-[2%] md:gap-[4%] pb-0 md:pb-[2%]">
        <div className="w-[95%] max-w-[170px] md:max-w-[200px]">
          <Image
            src="/images/insight/corriere_torino_cover 1.png"
            alt="Corriere Torino"
            width={200}
            height={40}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-[70%] max-w-[100px] md:max-w-[130px]">
          <Image
            src="/images/insight/equita 1.png"
            alt="Equita"
            width={130}
            height={45}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-[95%] max-w-[150px] md:max-w-[180px]">
          <Image
            src="/images/insight/Fondo-italiano-dinvestimento 1.png"
            alt="Fondo Italiano d'Investimento"
            width={180}
            height={65}
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </div>
  );
}