import { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    absolute: "Aree di intervento per lo sviluppo d'impresa | Mole Venture",
  },
  description:
    "Scopri le aree di intervento su cui lavoriamo per attuare il piano di sviluppo della tua impresa.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
