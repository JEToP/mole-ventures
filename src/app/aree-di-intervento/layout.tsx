import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Aree di intervento',
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
