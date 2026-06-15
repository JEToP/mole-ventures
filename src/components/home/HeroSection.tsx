export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background image – inserire in public/images/hero-bg.jpg */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
      />

      {/* Overlay scuro sfumato */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />

      {/* Contenuto – pt-56 garantisce spazio sufficiente sotto la navbar assoluta */}
      <div className="relative z-10 max-w-7xl pt-56">
        <h1 className="font-heading text-white text-xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-12">
          Un meccanismo di{' '}
          <span className="text-blue-deep">ETA</span>{' '}
          (o di M&A)
          <br />
          come linfa di cambiamento per
          <br />
          una nuova fase di{' '}
          <span className="text-blue-deep">sviluppo</span>.
        </h1>

        <div className="border-l-2 border-white pl-4 max-w-7xl">
          <p className="font-body text-white/90 text-base md:text-lg leading-relaxed">
            Entriamo in prima persona nella azienda per innescare, insieme ad una nuova compagine
            societaria, le dinamiche di cambiamento e di discontinuità necessarie a sbloccare il
            potenziale inespresso e a trasformare situazioni di stallo in solide basi per le
            prossime opportunità di sviluppo.
          </p>
        </div>
      </div>
    </section>
  );
}
