import Image from "next/image";
import ScrollCue from "@/components/ScrollCue";
import ContactForm from "./ContactForm";

export const metadata = {
  title: 'Contatti - Mole Venture',
  description: 'Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.',
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-[#05155E] flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[100lvh] flex flex-col justify-center py-20 md:pt-[152px] md:pb-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/contatti-bg.avif"
            alt="Contatti background"
            fill
            priority
            placeholder="blur"
            blurDataURL="data:image/webp;base64,UklGRnIAAABXRUJQVlA4IGYAAADwAwCdASoUAAsAPu1iqU2ppaQiMAgBMB2JQBYdhECZhc6Wv/zUOSTgAN5lLUqWrbDIrIvkRBE3gf9x/1Cy4BIG4jh8KUuPuL3eFHBvBSe6TfIOm3curn7DrBdDa9QlgA4KSmjGAAA="
            className="object-cover max-md:object-[85%_center] md:object-center brightness-[0.90]"
            sizes="100vw"
          />
        </div>
        {/* Overlay brand: sfumatura navy profondo → blue deep per profondità e identità */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#01061A]/85 via-[#05155E]/55 to-[#05155E]/0 md:to-black/70" />

        {/* Sfumatura in alto: navy profondo nella safe area che sfuma molto dolcemente verso il basso (visibile solo su mobile) */}
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#01061A] from-[15%] via-[#01061A]/50 via-[50%] to-transparent md:hidden z-0" />

        {/* Overlay laterale */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

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
