import HeroSection from "@/components/home/HeroSection";
import ValoriSection from "@/components/home/ValoriSection";
import ChiSiamoSection from "@/components/home/ChiSiamoSection";
import TeamSection from "@/components/home/TeamSection";
import ContattiSection from "@/components/home/ContattiSection";
import { getImageProps } from "next/image";

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
  preloadImage("/images/hero/intervento-hero.avif");
  preloadImage("/images/hero/metodo-hero.avif");
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
