import Image from "next/image";
import ScrollCue from "@/components/ScrollCue";
import { ArrowRight } from "lucide-react";

export const metadata = {
  title: 'Contatti - Mole Venture',
  description: 'Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.',
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-[#05155E] flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-[100lvh] flex flex-col max-md:justify-end md:justify-center pt-28 pb-32 md:pt-[152px] md:pb-8 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/contatti-bg.webp"
            alt="Contatti background"
            fill
            priority
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
              <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
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
          <form className="flex flex-col gap-8 w-full">
            {/* Prima riga: Nome, Azienda */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="font-body text-white font-semibold text-sm md:text-base">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Il tuo nome"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="azienda" className="font-body text-white font-semibold text-sm md:text-base">Azienda</label>
                <input
                  type="text"
                  id="azienda"
                  name="azienda"
                  placeholder="La tua azienda"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Seconda riga: Telefono, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className="font-body text-white font-semibold text-sm md:text-base">Telefono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Il tuo numero"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-body text-white font-semibold text-sm md:text-base">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="La tua email"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Terza riga: Oggetto */}
            <div className="flex flex-col gap-2">
              <label htmlFor="oggetto" className="font-body text-white font-semibold text-sm md:text-base">Oggetto</label>
              <input
                type="text"
                id="oggetto"
                name="oggetto"
                placeholder="Di cosa vorresti parlarci?"
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Quarta riga: Messaggio */}
            <div className="flex flex-col gap-2">
              <label htmlFor="messaggio" className="font-body text-white font-semibold text-sm md:text-base">Messaggio</label>
              <textarea
                id="messaggio"
                name="messaggio"
                placeholder="Raccontaci la tua realtà..."
                rows={6}
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm resize-y"
              ></textarea>
            </div>

            {/* Bottone di invio */}
            <div className="flex justify-start mt-4">
              <button
                type="submit"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-body text-base font-semibold text-blue-deep transition-colors duration-300 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep md:text-lg"
              >
                Invia messaggio
                <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
