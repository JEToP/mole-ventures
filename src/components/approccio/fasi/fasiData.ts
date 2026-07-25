// Struttura delle 5 fasi. Titolo e descrizione NON sono qui: vivono nei file di
// traduzione (messages/*.json → Method.phases.faseN), così la sezione è bilingue.
export type Fase = {
  numero: string;
  /** Chiave i18n dentro il namespace "Method.phases" */
  id: "fase1" | "fase2" | "fase3" | "fase4" | "fase5";
};

export const FASI: Fase[] = [
  { numero: "01", id: "fase1" },
  { numero: "02", id: "fase2" },
  { numero: "03", id: "fase3" },
  { numero: "04", id: "fase4" },
  { numero: "05", id: "fase5" },
];
