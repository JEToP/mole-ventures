import Link from "next/link";

export default function IlNostroMetodoSection() {
  return (
    <div className="bg-blue-deep text-white">
      <MetodoHero />
      <MetodoFasi />
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

function MetodoFasi() {
  return (
    <section className="relative overflow-hidden bg-blue-kinetic pb-12 pl-6 pr-6 pt-10 md:min-h-[980px] md:pb-16 md:pl-10 md:pr-12 md:pt-10">
      {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_40%,rgba(76,172,248,0.42),transparent_34%)]" />
      <div className="absolute left-1/2 top-24 h-[34rem] w-[22rem] -translate-x-1/2 rotate-3 bg-blue-soft/20 blur-3xl" />
      <div className="absolute left-[42%] top-28 h-[26rem] w-px rotate-6 bg-white/30 shadow-[0_0_80px_34px_rgba(76,172,248,0.28)]" /> */}

      <div className="relative z-10 max-w-7xl">
        <header className="max-w-5xl">
          <h2 className="font-heading h-[36px] w-[418px] max-w-full text-[36px] font-semibold leading-none tracking-normal text-white">
            Le 5 fasi dell&apos;intervento
          </h2>
          <p className="mt-6 max-w-4xl font-body text-sm leading-relaxed text-white/80 md:text-base">
            Siamo in ascolto per identificare aziende e imprenditori che vogliono dare un nuovo
            sviluppo alla realta esistente - e diventare, insieme a noi, autori di un cambiamento
            imprenditoriale e manageriale duraturo. Per questo motivo il nostro metodo segue una
            struttura precisa, divisa in 5 fasi.
          </p>
        </header>

        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-x-16 md:gap-y-20">
          <MetodoFaseUno />
          <MetodoFaseDue />
          <MetodoFaseTre />
          <MetodoFaseQuattro />
          <MetodoFaseCinque />
        </div>
      </div>
    </section>
  );
}

function MetodoFaseUno() {
  return (
    <article className="md:col-span-2 md:max-w-[34rem]">
      <span className="block w-[76px] font-heading text-center text-5xl font-semibold leading-none tracking-normal text-white md:h-[72px] md:text-[72px]">
        01
      </span>
      <h3 className="mt-5 h-[24px] w-[329px] max-w-full font-heading text-[30px] font-semibold leading-none tracking-normal text-white">
        Ascolto e analisi
      </h3>
      <p className="mt-4 h-[77px] w-[527px] max-w-full font-body text-[16px] font-normal leading-none tracking-normal text-white">
        Eseguiamo in prima persona uno scouting accurato delle realta interessanti, confrontandoci
        con gli azionisti per capire nel dettaglio il percorso, la storia, i punti di difficolta e
        le opportunita inespresse. Capiamo come poter gettare le basi per un nuovo sviluppo e la
        tipologia di risorse necessarie alla realizzazione dello stesso.
      </p>
    </article>
  );
}

function MetodoFaseDue() {
  return (
    <article className="md:contents">
      <span className="block w-[90px] font-heading text-center text-5xl font-semibold leading-none tracking-normal text-white md:absolute md:left-[937px] md:top-[163px] md:h-[72px] md:text-[72px]">
        02
      </span>
      <h3 className="mt-5 h-[65px] w-[242px] max-w-full font-heading text-[30px] font-semibold leading-none tracking-normal text-white md:absolute md:left-[785px] md:top-[247px] md:mt-0 md:text-right">
        Acquisizione e ingresso
      </h3>
      <p className="mt-4 h-[209px] w-[228px] max-w-full font-body text-[16px] font-normal leading-none tracking-normal text-white md:absolute md:left-[799px] md:top-[334px] md:mt-0 md:text-right">
        Una volta finalizzata la ricognizione, partecipiamo alla vita dell&apos;azienda con il
        management esistente, introducendo nuovi elementi identitari nella fase di discussione.
      </p>
    </article>
  );
}

function MetodoFaseTre() {
  return (
    <article className="md:contents">
      <span className="block w-[76px] font-heading text-center text-5xl font-semibold leading-none tracking-normal text-white md:absolute md:left-[1140px] md:top-[321px] md:h-[72px] md:text-[72px]">
        03
      </span>
      <h3 className="mt-5 h-[24px] w-[329px] max-w-full font-heading text-[30px] font-semibold leading-none tracking-normal text-white md:absolute md:left-[1140px] md:top-[410px] md:mt-0">
        Piano industriale e discontinuita
      </h3>
      <p className="mt-4 h-[77px] w-[527px] max-w-full font-body text-[16px] font-normal leading-none tracking-normal text-white md:absolute md:left-[1140px] md:top-[490px] md:mt-0">
        Avviamo il deployment del piano industriale e le azioni di discontinuita identificate,
        puntando su crescita, rafforzamento organizzativo e valorizzazione delle risorse.
      </p>
    </article>
  );
}

function MetodoFaseQuattro() {
  return (
    <article className="md:contents">
      <span className="block w-[76px] font-heading text-center text-5xl font-semibold leading-none tracking-normal text-white md:absolute md:left-[744px] md:top-[576px] md:h-[72px] md:text-[72px]">
        04
      </span>
      <h3 className="mt-5 h-[24px] w-[329px] max-w-full font-heading text-[30px] font-semibold leading-none tracking-normal text-white md:absolute md:left-[66px] md:top-[546px] md:mt-0">
        Esecuzione e presidio
      </h3>
      <p className="mt-4 h-[77px] w-[527px] max-w-full font-body text-[16px] font-normal leading-none tracking-normal text-white md:absolute md:left-[66px] md:top-[591px] md:mt-0">
        Il processo di managerializzazione, trasparenza e follow-up serve a mettere in sicurezza i
        principali KPI e a tradurre il progetto condiviso in risultati misurabili.
      </p>
    </article>
  );
}

function MetodoFaseCinque() {
  return (
    <article className="md:contents">
      <span className="block w-[76px] font-heading text-center text-5xl font-semibold leading-none tracking-normal text-white md:absolute md:left-[206px] md:top-[850px] md:h-[72px] md:text-[72px]">
        05
      </span>
      <h3 className="mt-5 h-[24px] w-[329px] max-w-full font-heading text-[30px] font-semibold leading-none tracking-normal text-white md:absolute md:left-[338px] md:top-[820px] md:mt-0">
        La fase successiva
      </h3>
      <p className="mt-4 h-[77px] w-[527px] max-w-full font-body text-[16px] font-normal leading-none tracking-normal text-white md:absolute md:left-[338px] md:top-[869px] md:mt-0">
        Durante l&apos;attuazione del piano di sviluppo analizziamo le logiche che accompagnano
        l&apos;investimento, preparando l&apos;azienda a un nuovo punto di svolta piu maturo e
        consapevole.
      </p>
    </article>
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
