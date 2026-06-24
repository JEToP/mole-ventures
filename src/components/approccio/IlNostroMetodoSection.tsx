import Link from "next/link";
import LeFasiInterventoSection from "./fasi/organisms/LeFasiInterventoSection";

export default function IlNostroMetodoSection() {
  return (
    <div className="bg-blue-deep text-white">
      <MetodoHero />
      <LeFasiInterventoSection />
      <MetodoFooterBand />
    </div>
  );
}

function MetodoHero() {
  return (
    <section className="relative aspect-[1440/609] w-full overflow-hidden px-6 pb-12 pt-40 md:px-12">
      <div
        className="absolute inset-0 bg-cover bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-metodo.webp')",
          backgroundPosition: "center 70%",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-blue-deep/10 via-blue-deep/30 to-blue-deep/90" />
      <div className="absolute inset-0 bg-black/25" />

      <h1 className="absolute left-6 top-[48%] z-10 w-[calc(100%-3rem)] font-heading text-4xl font-semibold leading-none tracking-normal text-white md:left-10 md:top-[295px] md:h-[72px] md:w-[1247px] md:text-[72px]">
        Il nostro metodo
      </h1>

      <div className="absolute left-6 top-[70%] z-10 border-l-2 border-white/80 pl-4 md:left-10 md:top-[449px]">
        <p className="w-[calc(100vw-4rem)] font-body text-sm font-semibold leading-none tracking-normal text-white md:h-[60px] md:w-[1182px] md:text-[20px]">
          Ogni azienda per continuare a evolvere deve impostare il proprio percorso di crescita, di
          evoluzione e di rafforzamento rimettendo in discussione il proprio status quo. Noi
          lavoriamo sul rinnovare l&apos;ecosistema esterno ed interno all&apos;azienda, nuovi soci,
          nuove risorse e idee per rendere possibili scenari che non riuscivano a materializzarsi.
        </p>
      </div>
    </section>
  );
}

function MetodoFooterBand() {
  return (
    <section className="bg-gradient-to-b from-blue-kinetic to-blue-deep px-6 py-16 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center text-center">
        <h2 className="font-heading text-2xl font-semibold md:text-3xl">
          La fase successiva
        </h2>
        <p className="mt-5 max-w-4xl font-body text-sm leading-relaxed text-white/75 md:text-base">
          Il percorso crea le condizioni per un nuovo punto di svolta: apertura a nuove
          opportunita, rafforzamento della struttura e maggiore consapevolezza del potenziale
          generato.
        </p>
        <Link
          href="/aree-di-intervento"
          className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-8 py-3 font-body text-base font-semibold text-blue-deep transition hover:bg-blue-soft hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-deep"
        >
          Scopri le aree di intervento
        </Link>
      </div>
    </section>
  );
}
