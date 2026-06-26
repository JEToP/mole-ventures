import type { CSSProperties } from "react";
import FaseNumero from "../atoms/FaseNumero";
import type { Fase } from "../fasiData";

type FaseCardProps = {
  fase: Fase;
  index: number;
  focus?: number;
  spotlightActive?: boolean;
  layout?: "side" | "stacked";
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function FaseCard({
  fase,
  index,
  focus = 0,
  spotlightActive = false,
  layout = "side",
  className = "",
}: FaseCardProps) {
  const focusLevel = clamp(focus, 0, 1);
  const opacity = spotlightActive ? 0.66 + focusLevel * 0.34 : 1;
  const lift = focusLevel * -6;
  const scale = 1 + focusLevel * 0.025;
  const textAlpha = 0.84 + focusLevel * 0.16;
  const glowMask = "radial-gradient(ellipse 75% 75% at 50% 45%, #000 40%, transparent 80%)";
  const cardStyle = {
    opacity,
    transform: `translate3d(0, ${lift}px, 0) scale(${scale})`,
    transformOrigin: "center top",
  } satisfies CSSProperties;
  const descriptionStyle = { color: `rgba(255,255,255,${textAlpha})` } satisfies CSSProperties;

  return (
    <article
      data-index={index}
      onClick={(e) => e.currentTarget.scrollIntoView({ behavior: "smooth", block: "center" })}
      style={cardStyle}
      className={`group relative min-w-0 max-w-full cursor-pointer p-4 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform md:p-5 ${className}`}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -inset-4 -z-10 transition-opacity duration-700 ease-out md:-inset-6"
        style={{
          opacity: focusLevel * 0.9,
          background:
            "radial-gradient(ellipse at 50% 45%, rgba(150,205,255,0.30), rgba(150,205,255,0) 70%)",
          maskImage: glowMask,
          WebkitMaskImage: glowMask,
        }}
      />

      {layout === "stacked" ? (
        <div className="flex flex-col items-start text-left">
          <FaseNumero value={fase.numero} focus={focusLevel} />
          <h3 className="mt-3 break-words font-heading text-[28px] font-semibold leading-[1.05] tracking-normal text-white md:mt-4 md:text-[34px]">
            {fase.titolo}
          </h3>
          <p
            style={descriptionStyle}
            className="mt-4 break-words font-body text-[16px] font-normal leading-[1.6] tracking-normal transition-colors duration-700 md:mt-5 md:text-[18px]"
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
            <FaseNumero value={fase.numero} focus={focusLevel} className="shrink-0 md:w-[5rem]" />
            <p
              style={descriptionStyle}
              className="min-w-0 break-words font-body text-[16px] font-normal leading-[1.6] tracking-normal transition-colors duration-700 md:text-[18px]"
            >
              {fase.descrizione}
            </p>
          </div>
        </div>
      )}
    </article>
  );
}
