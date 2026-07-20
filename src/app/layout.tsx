import type { Metadata, Viewport } from "next";
import { Syne, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import Navbar from '@/components/Navbar';
import { ORGANIZATION_JSON_LD, WEBSITE_JSON_LD } from "@/lib/seo";

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
  metadataBase: new URL("https://moleventure.com"),
  title: {
    template: "Mole Venture - %s",
    default: "Mole Venture - Home",
  },
  description: "Un meccanismo di ETA come linfa di cambiamento per una nuova fase di sviluppo.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    siteName: "Mole Venture",
    locale: "it_IT",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Mole Venture",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/images/favicon.svg", type: "image/svg+xml" },
      { url: "/images/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/images/apple-touch-icon.png",
  },
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
        {/* Dati strutturati JSON-LD (schema.org): invisibili, aiutano Google a
            riconoscere Mole Venture come entità/brand. */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION_JSON_LD) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_JSON_LD) }}
        />
        <Navbar />
        <main className="flex-1 w-full flex flex-col">{children}</main>
        <Footer />
        <CookieBanner />
      </body>
    </html>
  );
}
