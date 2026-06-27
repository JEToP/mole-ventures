import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";
import CookieBanner from '@/components/CookieBanner';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mole Venture",
  description: "Un meccanismo di ETA come linfa di cambiamento per una nuova fase di sviluppo.",
};

export const viewport: Viewport = {
  themeColor: "#01061A",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="it"
      className={`${syne.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-body font-light tracking-tight leading-snug text-[1.25rem] bg-[#05155E] text-white">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
