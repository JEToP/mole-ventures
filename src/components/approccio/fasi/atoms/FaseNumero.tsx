import type { CSSProperties } from "react";

type FaseNumeroProps = {
  value: string;
  focus?: number;
  className?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export default function FaseNumero({ value, focus = 0, className = "" }: FaseNumeroProps) {
  const focusLevel = clamp(focus, 0, 1);
  // Bianco sempre: a fuoco è pieno e leggermente più grande, fuori fuoco è più
  // spento/grigetto e un filo più piccolo.
  const opacity = 0.4 + focusLevel * 0.6;
  const scale = 1 + focusLevel * 0.14;
  const style = {
    opacity,
    transform: `scale(${scale})`,
    transformOrigin: "left center",
  } satisfies CSSProperties;

  return (
    <span
      aria-hidden="true"
      style={style}
      className={`block font-heading text-5xl font-semibold leading-none tracking-normal text-white transition-[opacity,transform] duration-700 ease-out md:text-[72px] ${className}`}
    >
      {value}
    </span>
  );
}
