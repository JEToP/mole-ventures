import Image from "next/image";
import FadeInOnScroll from '@/components/FadeInOnScroll';

export const metadata = {
  title: 'Contatti - Mole Venture',
  description: 'Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.',
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-[#05155E] flex flex-col w-full">
      {/* Hero Section */}
      <FadeInOnScroll className="relative w-full min-h-screen md:min-h-screen flex flex-col justify-center md:justify-end pt-28 pb-32 md:pt-24 md:pb-20 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat brightness-[0.90]"
          style={{ backgroundImage: "url('/images/contatti-bg.webp')" }}
        />
        {/* Overlay brand: sfumatura navy profondo → blue deep per profondità e identità */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#01061A]/85 via-[#05155E]/55 to-[#05155E]/95 md:to-black/70" />

        {/* Sfumatura in alto: navy profondo nella safe area che sfuma molto dolcemente verso il basso (visibile solo su mobile) */}
        <div className="absolute top-0 left-0 w-full h-[40vh] bg-gradient-to-b from-[#01061A] from-[15%] via-[#01061A]/50 via-[50%] to-transparent md:hidden z-0" />

        {/* Overlay laterale */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/25 via-transparent to-transparent" />

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-4xl">
            <h1 className="font-heading text-white/85 text-[2.4rem] sm:text-5xl md:text-5xl lg:text-6xl leading-[1.15] md:leading-[1.1] tracking-tight mb-8 md:mb-10 [text-shadow:_0_2px_16px_rgba(0,0,0,0.5)]">
              Costruiamo insieme la prossima fase{' '}
              <span className="bg-[linear-gradient(115deg,_#2E73C4_0%,_#4CACF8_35%,_#9FD2FB_50%,_#4CACF8_65%,_#2E73C4_100%)] bg-clip-text text-transparent [text-shadow:none] font-bold">della tua impresa</span>
            </h1>

            <div className="border-l-2 border-white/60 pl-4 max-w-xl max-md:animate-fade-left-delayed">
              <p className="font-body font-light text-white/75 text-[0.95rem] md:text-base leading-relaxed [text-shadow:_0_1px_8px_rgba(0,0,0,0.4)]">
                Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
              </p>
            </div>
          </div>
        </div>
      </FadeInOnScroll>

      {/* Form Section */}
      <FadeInOnScroll className="relative w-full bg-[#05155E] bg-[radial-gradient(ellipse_at_left,_rgba(59,130,246,0.22)_0%,_rgba(5,21,94,0.95)_35%,_rgba(5,21,94,1)_100%)] flex-1 px-6 md:px-16 py-20">
        <div className="max-w-7xl mx-auto w-full">
          <form className="flex flex-col gap-8">
            {/* Prima riga: Nome, Azienda, Telefono, Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <label htmlFor="nome" className="font-body text-white font-semibold text-sm md:text-base">Nome</label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  placeholder="Nome"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="azienda" className="font-body text-white font-semibold text-sm md:text-base">Azienda</label>
                <input
                  type="text"
                  id="azienda"
                  name="azienda"
                  placeholder="Azienda"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className="font-body text-white font-semibold text-sm md:text-base">Telefono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Telefono"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-body text-white font-semibold text-sm md:text-base">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft focus:bg-white/10 transition-all backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Seconda riga: Oggetto */}
            <div className="flex flex-col gap-2">
              <label htmlFor="oggetto" className="font-body text-white font-semibold text-sm md:text-base">Oggetto</label>
              <input
                type="text"
                id="oggetto"
                name="oggetto"
                placeholder="Oggetto"
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft focus:bg-white/10 transition-all backdrop-blur-sm"
              />
            </div>

            {/* Terza riga: Messaggio */}
            <div className="flex flex-col gap-2">
              <label htmlFor="messaggio" className="font-body text-white font-semibold text-sm md:text-base">Messaggio</label>
              <textarea
                id="messaggio"
                name="messaggio"
                placeholder="Messaggio"
                rows={8}
                className="w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft focus:bg-white/10 transition-all backdrop-blur-sm resize-y"
              ></textarea>
            </div>

            {/* Bottone di invio */}
            <div className="flex justify-end mt-4">
              <button
                type="submit"
                className="bg-white text-[#05155E] font-body font-semibold text-base md:text-lg px-12 py-3 rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg"
              >
                Invia messaggio
              </button>
            </div>
          </form>
        </div>
      </FadeInOnScroll>
    </div>
  );
}
