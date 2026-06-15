export default function ContattiSection() {
  return (
    <section className="bg-[radial-gradient(ellipse_at_center,_#062EB5_0%,_#05155E_80%)] py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-6 leading-tight">
          Costruiamo insieme la prossima fase della tua impresa
        </h2>
        <p className="font-body text-white/80 text-lg mb-10">
          Ogni progetto inizia da un ascolto. Raccontaci la tua realtà.
        </p>

        {/* Contatti */}
        <div className="flex flex-col gap-4 font-body text-base md:text-lg text-white">
          {/* Email */}
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <a
              href="mailto:contact@moleventure.com"
              className="hover:text-blue-soft transition-colors duration-200"
            >
              contact@moleventure.com
            </a>
          </div>

          {/* Telefono Matteo */}
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href="tel:+393351502216"
              className="hover:text-blue-soft transition-colors duration-200"
            >
              Matteo Gera: +39 335 1502216
            </a>
          </div>

          {/* Telefono Francesco */}
          <div className="flex items-center gap-3">
            <svg
              className="w-5 h-5 flex-shrink-0 opacity-80"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <a
              href="tel:+393337898852"
              className="hover:text-blue-soft transition-colors duration-200"
            >
              Francesco Motta: +39 333 7898852
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
