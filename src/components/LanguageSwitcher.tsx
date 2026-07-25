"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

// Switcher IT/EN: mantiene la pagina corrente cambiando lingua (usa il pathname
// interno, così l'URL viene rigenerato con il prefisso /en e lo slug tradotto
// dove previsto).
export default function LanguageSwitcher({
  className = "",
}: {
  className?: string;
}) {
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <div className={`flex items-center gap-2 font-body ${className}`}>
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="text-white/30">/</span>}
          <Link
            href={pathname}
            locale={loc}
            aria-current={loc === locale ? "true" : undefined}
            className={`transition-colors ${
              loc === locale
                ? "text-white font-semibold"
                : "text-white/55 hover:text-white"
            }`}
          >
            {loc.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
