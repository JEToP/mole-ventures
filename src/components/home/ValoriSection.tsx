// Server Component – nessun event handler, compatibile con Next.js App Router
import Image from "next/image";

// ── Dati valori ──────────────────────────────────────────────────────────────
// Inserire le icone in public/images/icons/<id>.png
const valori = [
  {
    id: "rispetto",
    name: "Rispetto",
    icon: "/images/icons/rispetto.webp",
    description:
      "Ogni azienda ha una sua storia che va capita e rispettata. Un cambiamento, una discontinuità va sempre affrontata con il rispetto del percorso fatto, delle persone che lo hanno realizzato e dei valori intrinseci dell'azienda.",
  },
  {
    id: "ascolto",
    name: "Ascolto",
    icon: "/images/icons/ascolto.webp",
    description:
      "Le persone aderiscono e attuano il cambiamento se contribuiscono alla sua definizione e impostazione. Per noi questa contribuzione è un elemento chiave del processo e quindi l'ascolto attivo è il denominatore alla base del progetto di trasformazione.",
  },
  {
    id: "cambiamento",
    name: "Cambiamento",
    icon: "/images/icons/cambiamento.webp",
    description:
      "Un sistema evolve con successo se continua a rinnovarsi e ad anticipare le nuove esigenze. L'immobilismo impedisce ad un'azienda di vedere i passi necessari ad affrontare le nuove sfide dimensionanti. Noi agiamo per rimettere in discussione abitudini e modalità operative che minano la trasformazione e quindi le opportunità di nuova crescita.",
  },
  {
    id: "coerenza",
    name: "Coerenza",
    icon: "/images/icons/coerenza.webp",
    description:
      "Dopo una fase di condivisione, l'attuazione del cambiamento passa per una importante capacità di coerenza, costanza, e rispetto di quanto definito sia a livello di direzione che di valori attuativi del piano.",
  },
  {
    id: "dinamicita",
    name: "Dinamicità",
    icon: "/images/icons/dinamicita.webp",
    description:
      "La capacità di evolvere e di evolvere velocemente seguendo il percorso tracciato è sale. Noi siamo i generatori di quegli impulsi che sono necessari a far sì che un sistema vinca la sua inerzia naturale per acquisire competitività grazie al suo dinamismo.",
  },
  {
    id: "trasparenza",
    name: "Trasparenza",
    icon: "/images/icons/trasparenza.webp",
    description:
      "La trasparenza verso tutti gli stakeholders coinvolti è fondamentale per permettere sempre la lettura dei vari segnali e costruire relazioni di fiducia con dipendenti, Clienti, partners e azionisti, che favoriscono il percorso condiviso di crescita e di successo dell'azienda.",
  },
  {
    id: "valorizzazione",
    name: "Valorizzazione",
    icon: "/images/icons/valorizzazione.webp",
    description:
      "Un sistema cresce se lo si valorizza: Nel valore delle persone, nelle relazioni con i Clienti, nel valore riconosciuto ai prodotti e servizi e nei KPI. Valorizzare in modo che questo percorso sia misurabile, riconosciuto e non autoreferenziale.",
  },
];

export default function ValoriSection() {
  return (
    <section className="bg-blue-deep py-20 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold mb-16">
          I nostri valori
        </h2>

        <div className="flex flex-col">
          {valori.map((valore, index) => (
            <div key={valore.id} className="flex items-stretch">
              {/* Colonna sinistra: icona + nome */}
              <div className="flex items-center gap-5 w-64 md:w-80 flex-shrink-0 py-6">
                <div className="w-20 h-20 flex-shrink-0">
                  {/* Quando l'immagine è assente viene ignorata da next/image senza crash */}
                  <Image
                    src={valore.icon}
                    alt={valore.name}
                    width={80}
                    height={80}
                    className="w-full h-full object-contain"
                    unoptimized
                  />
                </div>
                <span className="font-heading text-white text-xl md:text-2xl font-semibold leading-snug">
                  {valore.name}
                </span>
              </div>

              {/* Colonna centrale: timeline con punto e linea verticale */}
              <div className="flex flex-col items-center w-10 flex-shrink-0">
                <div
                  className={`w-0.5 bg-white/20 ${index === 0 ? "h-8" : "flex-1"}`}
                />
                <div className="w-3 h-3 rounded-full bg-white flex-shrink-0" />
                <div
                  className={`w-0.5 bg-white/20 ${index === valori.length - 1 ? "h-8" : "flex-1"}`}
                />
              </div>

              {/* Colonna destra: descrizione */}
              <div className="flex-1 pl-6 py-6 flex items-center">
                <p className="font-body text-white/75 text-xs md:text-sm leading-relaxed">
                  {valore.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
