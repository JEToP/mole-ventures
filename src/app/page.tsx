import HeroSection from "@/components/home/HeroSection";
import ValoriSection from "@/components/home/ValoriSection";
import dynamic from "next/dynamic";
import { getImageProps } from "next/image";

const ChiSiamoSection = dynamic(() => import("@/components/home/ChiSiamoSection"));
const TeamSection = dynamic(() => import("@/components/home/TeamSection"));
const ContattiSection = dynamic(() => import("@/components/home/ContattiSection"));

import ReactDOM from "react-dom";

function preloadImage(src: string) {
  const { props } = getImageProps({ src, alt: "", width: 1920, height: 1080 });
  ReactDOM.preload(props.src, {
    as: "image",
    imageSrcSet: props.srcSet,
    imageSizes: props.sizes,
  });
}

export default function Home() {
  // Precaricamento delle immagini hero ottimizzate
  preloadImage("/images/background_areeintervento.avif");
  preloadImage("/images/hero-metodo.avif");
  preloadImage("/images/background_contatti.webp");
  preloadImage("/images/background_contatti_mobile.webp");

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
