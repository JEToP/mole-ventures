import Link from 'next/link';

export default function ChiSiamoSection() {
  return (
    <section className="bg-white py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center gap-10 justify-between">
        {/* Testo */}
        <div className="flex-1">
          <h2 className="font-heading text-blue-kinetic text-3xl md:text-4xl font-semibold mb-6">
            Chi siamo
          </h2>
          <p className="font-body text-gray-800 text-base md:text-lg leading-relaxed max-w-4xl">
            Siamo una realtà focalizzata su processi di{' '}
            <span className="text-blue-kinetic">Entrepreneurship Through Acquisition.</span>
            <br />
            Acquisiamo PMI che necessitano di una fase di cambiamento e le guidiamo in prima
            persona. Generiamo la discontinuità necessaria a sbloccarne il potenziale latente e
            costruiamo l&apos;ecosistema tra nuova imprenditorialità, management qualificato e DNA
            storico dell&apos;impresa, per accompagnarla, con una timeline definita, verso la sua
            prossima fase di successo.
          </p>
        </div>

        {/* CTA */}
        <div className="flex-shrink-0">
          <Link
            href="/approccio"
            className="inline-block bg-gradient-to-r from-blue-kinetic to-blue-soft hover:brightness-110 text-white font-body font-semibold text-xl px-14 py-5 rounded-full transition-all duration-300 shadow-lg shadow-blue-kinetic/30"
          >
            Il nostro metodo
          </Link>
        </div>
      </div>
    </section>
  );
}
