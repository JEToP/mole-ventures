import Image from "next/image";
import ScrollCue from "@/components/ScrollCue";
import ContactForm from "./ContactForm";

export const metadata = {
  title: {
    absolute: "Contatti | Passaggio Generazionale e Vendita PMI | Mole Venture",
  },
  description:
    "Contatta il team di Mole Venture per discutere del passaggio generazionale o della vendita della tua impresa.",
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-[#05155E] flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Mobile image */}
          <Image
            src="/images/hero/contatti/contatti-bg-def-mobile.webp"
            alt="Contatti background"
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjwAAABXRUJQVlA4IDAAAADwAQCdASoGAAoABUB8JYwCdAEUngS/uAAA/U6A2TXSt7rmHh759NwfeA89FWmuYAA="
            className="object-cover object-center md:hidden"
            sizes="100vw"
          />
          {/* Desktop image */}
          <Image
            src="/images/hero/contatti/contatti-bg-def-desktop.webp"
            alt="Contatti background"
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRjgAAABXRUJQVlA4ICwAAADwAQCdASoKAAYABUB8JYgCdAEQDDOIxgAA/ieu8MbtE0Drx/o94hzanB+sAA=="
            className="object-cover object-center hidden md:block"
            sizes="100vw"
          />
        </div>

        {/* Velo bluastro leggerissimo: solo per rendere leggibile il testo bianco */}
        <div className="absolute inset-0 bg-blue-deep/20" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <h1 className="font-heading text-white text-[2rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10">
              Costruiamo insieme la prossima fase{' '}
              <span className="font-bold">della tua impresa</span>
            </h1>

            <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
              <p className="font-body font-light text-white text-base md:text-xl leading-relaxed">
                Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
              </p>
            </div>
          </div>
        </div>

        <ScrollCue />
      </section>

      {/* Form Section */}
      <section className="relative w-full bg-[#05155E] flex-1">
        {/* Background image, stessa della sezione in home */}
        <div className="absolute inset-0">
          <Image
            src="/images/background_contatti.webp"
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
            aria-hidden="true"
          />
        </div>
        {/* Overlay brand, stesso della sezione in home */}
        <div className="absolute inset-0 bg-[#05155E]/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#05155E]/80 to-transparent" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-12 py-20 md:py-24">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
