import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// ──────────────────────────────────────────────────────────────────────────────
// Footer del sito. Componente separato: va inserito nel layout globale
// (app/layout.tsx) così appare in fondo a tutte le pagine.
//
// I valori segnati con TODO sono PLACEHOLDER: sostituire con i dati reali
// di Mole Venture (email, sede, P.IVA, ragione sociale).
// ──────────────────────────────────────────────────────────────────────────────

const navLinks = [
  { href: "/", labelKey: "home" },
  { href: "/metodo-e-strategia", labelKey: "method" },
  { href: "/aree-di-intervento", labelKey: "areas" },
  { href: "/insights", labelKey: "insights" },
  { href: "/contatti", labelKey: "contact" },
] as const;

export default function Footer() {
  const t = useTranslations("Footer");
  const tNav = useTranslations("Nav");
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-[#030d3d] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-10 md:py-12">
        {/* Riga principale: brand + colonne */}
        <div className="flex flex-row items-center md:items-start justify-between gap-6 md:gap-8">
          {/* Colonna brand */}
          <div className="max-w-xs">
            <Image
              src="/images/logo.svg"
              alt="Mole Venture"
              width={180}
              height={180}
              priority
              className="h-12 md:h-20 w-auto object-contain"
              unoptimized
            />
          </div>

          {/* Colonna navigazione – nascosta su mobile */}
          <div className="hidden md:block">
            <h3 className="font-heading text-white text-sm md:text-base font-semibold uppercase tracking-[0.15em] mb-5">
              {t("navigate")}
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body font-light text-white/70 text-sm md:text-base hover:text-blue-soft transition-colors duration-200"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Colonna contatti (solo email + sede) */}
          <div className="flex flex-col items-end md:items-start">
            <h3 className="hidden md:block font-heading text-white text-sm md:text-base font-semibold uppercase tracking-[0.15em] mb-5">
              {t("contacts")}
            </h3>
            <ul className="flex flex-col gap-1 md:gap-3 font-body font-light text-white/70 text-sm md:text-base text-right md:text-left">
              <li>
                {/* TODO: sostituire con l'email reale */}
                <a
                  href="mailto:info@moleventure.com"
                  className="hover:text-blue-soft transition-colors duration-200"
                >
                  info@moleventure.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Riga inferiore: copyright + credito JEToP */}
        <div className="mt-10 md:mt-12 pt-6 md:pt-8 border-t border-white/10 flex flex-row items-center justify-between gap-4">
          <p className="font-body font-light text-white/45 text-xs md:text-sm leading-relaxed">
            {/* TODO: sostituire con la ragione sociale e la P.IVA reali */}
            © {year} Mole Venture. P.IVA 13453620018.<br />
            {t("rights")}
          </p>
          <p className="font-body font-light text-white/45 text-xs md:text-sm">
            {t("poweredBy")}{" "}
            <a
              href="https://jetop.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-blue-soft transition-colors duration-200 font-normal"
            >
              JEToP
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}