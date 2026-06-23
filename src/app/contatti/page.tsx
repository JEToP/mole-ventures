import Image from "next/image";

export const metadata = {
  title: 'Contatti - Mole Venture',
  description: 'Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.',
};

export default function ContattiPage() {
  return (
    <div className="min-h-screen bg-[#05155E] flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative w-full min-h-screen flex flex-col justify-center md:justify-end pb-24 md:pb-32 pt-40 px-6 md:px-16 overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/contatti-bg.webp')" }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/70" />

        <div className="relative z-10 max-w-7xl mx-auto w-full">
          <h1 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-8 max-w-4xl">
            Costruiamo insieme la prossima fase della tua impresa
          </h1>

          <div className="border-l-2 border-white pl-4 max-w-2xl">
            <p className="font-body text-white/90 text-sm md:text-base leading-relaxed font-medium">
              Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="relative w-full bg-[radial-gradient(ellipse_at_left,_#3b82f6_0%,_#05155E_50%)] flex-1 px-6 md:px-16 py-20">
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
                  className="w-full bg-[#f3f4f6] text-gray-800 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="azienda" className="font-body text-white font-semibold text-sm md:text-base">Azienda</label>
                <input
                  type="text"
                  id="azienda"
                  name="azienda"
                  placeholder="Azienda"
                  className="w-full bg-[#f3f4f6] text-gray-800 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="telefono" className="font-body text-white font-semibold text-sm md:text-base">Telefono</label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  placeholder="Telefono"
                  className="w-full bg-[#f3f4f6] text-gray-800 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-body text-white font-semibold text-sm md:text-base">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className="w-full bg-[#f3f4f6] text-gray-800 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft"
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
                className="w-full bg-[#f3f4f6] text-gray-800 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft"
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
                className="w-full bg-[#f3f4f6] text-gray-800 rounded-lg px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-blue-soft resize-y"
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
      </section>
    </div>
  );
}
