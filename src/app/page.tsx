import HeroSection from "@/components/home/HeroSection";
import dynamic from "next/dynamic";

const ChiSiamoSection = dynamic(() => import("@/components/home/ChiSiamoSection"));
const TeamSection = dynamic(() => import("@/components/home/TeamSection"));
const ValoriSection = dynamic(() => import("@/components/home/ValoriSection"));
const ContattiSection = dynamic(() => import("@/components/home/ContattiSection"));

import ReactDOM from "react-dom";

export default function Home() {
  // Precaricamento delle immagini hero delle pagine principali per velocizzare la navigazione
  ReactDOM.preload("/images/background_areeintervento.avif", { as: "image" });
  ReactDOM.preload("/images/hero-metodo.avif", { as: "image" });
  ReactDOM.preload("/images/background_contatti.webp", { as: "image" });
  ReactDOM.preload("/images/background_contatti_mobile.webp", { as: "image" });

  return (
    <>
      <HeroSection />
      <ChiSiamoSection />
      <TeamSection />
      <ValoriSection />
      <ContattiSection />
    </>
  );
}
