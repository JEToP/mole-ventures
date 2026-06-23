export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-end pb-20 px-6 md:px-12 overflow-hidden">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/hero-bg.webp')" }}
      />

      {/* Overlay scuro sfumato */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/65" />

      {/* Contenuto – pt-24 compensa la navbar fixed */}
      <div className="relative z-10 max-w-4xl">
        <h1 className="font-heading text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-10">
          Un meccanismo di{' '}
          <span className="text-blue-kinetic">ETA</span>
          {' '}(Entrepreneurship Through Acquisition) come motore di cambiamento per una nuova fase di sviluppo
        </h1>

        <div className="border-l-2 border-white pl-4 max-w-xl">
          <p className="font-body text-white/90 text-sm md:text-base leading-relaxed">
            Entriamo in prima persona nell&apos;azienda per innescare le dinamiche di cambiamento
            e di discontinuità necessarie a sbloccare il potenziale inespresso e generare le
            successive opportunità di sviluppo
          </p>
        </div>
      </div>
    </section>
  );
}
