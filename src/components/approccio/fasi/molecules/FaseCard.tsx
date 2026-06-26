import FaseNumero from "../atoms/FaseNumero";
import type { Fase } from "../fasiData";

type FaseCardProps = {
  fase: Fase;
  index: number;
  /** True quando il blocco attraversa il centro del viewport: va in primo piano "illuminato". */
  active?: boolean;
  /**
   * Disposizione interna:
   * - "side": titolo in alto, numero a sinistra e descrizione a destra (fasi 01, 04, 05).
   * - "stacked": numero in alto, titolo e descrizione centrati (fasi 02, 03).
   */
  layout?: "side" | "stacked";
  /** True quando un altro blocco è in focus: questo va sullo sfondo, opacizzato. */
  dimmed?: boolean;
  className?: string;
};

/**
 * Molecule: numero + titolo + descrizione di una singola fase.
 * In focus il blocco si "illumina" (glow morbido dietro). Cliccando, si porta al centro.
 */
export default function FaseCard({
  fase,
  index,
  active = false,
  layout = "side",
  dimmed = false,
  className = "",
}: FaseCardProps) {
  const glowMask = "radial-gradient(ellipse 75% 75% at 50% 45%, #000 40%, transparent 80%)";
  const focus = active
    ? "opacity-100 md:scale-[1.08] md:origin-top-left"
    : dimmed
      ? "opacity-35"
      : "opacity-100";

  return (
    <article
      data-index={index}
      onClick={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" })}
      className={`group relative min-w-0 max-w-full cursor-pointer p-4 transition-[transform,opacity] duration-500 ease-out md:p-5 ${focus} ${className}`}
    >
      {/* Glow di "illuminazione" quando il blocco è in focus, con bordi sfumati */}
      {active && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -inset-4 -z-10 md:-inset-6"
          style={{
            background:
              "radial-gradient(ellipse at 50% 45%, rgba(150,205,255,0.30), rgba(150,205,255,0) 70%)",
            maskImage: glowMask,
            WebkitMaskImage: glowMask,
          }}
        />
      )}

      {layout === "stacked" ? (
        <div className="flex flex-col items-start text-left">
          <FaseNumero value={fase.numero} active={active} />
          <h3 className="mt-3 break-words font-heading text-[28px] font-semibold leading-[1.05] tracking-normal text-white md:mt-4 md:text-[34px]">
            {fase.titolo}
          </h3>
          <p
            className={`mt-4 break-words font-body text-[16px] font-normal leading-[1.6] tracking-normal transition-colors duration-500 md:mt-5 md:text-[18px] ${
              active ? "text-white" : "text-white/85"
            }`}
          >
            {fase.descrizione}
          </p>
        </div>
      ) : (
        <div>
          <h3 className="break-words font-heading text-[28px] font-semibold leading-[1.05] tracking-normal text-white md:pl-[7rem] md:text-[34px]">
            {fase.titolo}
          </h3>
          <div className="mt-3 flex min-w-0 flex-col gap-3 md:mt-4 md:flex-row md:items-start md:gap-6">
            <FaseNumero value={fase.numero} active={active} className="shrink-0 md:w-[5rem]" />
            <p
              className={`min-w-0 break-words font-body text-[16px] font-normal leading-[1.6] tracking-normal transition-colors duration-500 md:text-[18px] ${
                active ? "text-white" : "text-white/85"
              }`}
            >
              {fase.descrizione}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
