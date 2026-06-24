type FaseNumeroProps = {
  value: string;
  active?: boolean;
  className?: string;
};

/**
 * Atom: il grande numero progressivo della fase (Syne SemiBold 72px da Figma).
 * In focus diventa pienamente luminoso; altrimenti resta più tenue.
 */
export default function FaseNumero({ value, active = false, className = "" }: FaseNumeroProps) {
  return (
    <span
      aria-hidden="true"
      className={`block font-heading text-5xl font-semibold leading-none tracking-normal text-white transition-opacity duration-700 md:text-[72px] ${
        active ? "opacity-100" : "opacity-60"
      } ${className}`}
    >
      {value}
    </span>
  );
}
