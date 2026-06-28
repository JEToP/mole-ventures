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
  const opacity = 0.62 + clamp(focus, 0, 1) * 0.38;
  const style = { opacity } satisfies CSSProperties;

  return (
    <span
      aria-hidden="true"
      style={style}
      className={`block font-heading text-5xl font-semibold leading-none tracking-normal text-white transition-opacity duration-700 ease-out md:text-[72px] ${className}`}
    >
      {value}
    </span>
  );
}
