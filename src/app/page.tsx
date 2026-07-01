import HeroSection from "@/components/home/HeroSection";
import dynamic from "next/dynamic";

const ChiSiamoSection = dynamic(() => import("@/components/home/ChiSiamoSection"));
const TeamSection = dynamic(() => import("@/components/home/TeamSection"));
const ValoriSection = dynamic(() => import("@/components/home/ValoriSection"));
const ContattiSection = dynamic(() => import("@/components/home/ContattiSection"));

export default function Home() {
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
