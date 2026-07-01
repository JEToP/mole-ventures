import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Navbar from '@/components/Navbar';

const Footer = dynamic(() => import('@/components/Footer'));
const CookieBanner = dynamic(() => import('@/components/CookieBanner'));

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
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
      <body className="min-h-full flex flex-col font-body font-light tracking-tight leading-snug text-[1.25rem] bg-[#01061A] text-white">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
