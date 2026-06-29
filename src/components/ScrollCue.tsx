import { ChevronDown } from "lucide-react";

// Indicatore di scroll: freccetta animata in basso al centro dell'hero che
// invita a scendere per scoprire il resto della pagina.
export default function ScrollCue({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute bottom-10 left-1/2 z-10 -translate-x-1/2 animate-bounce text-white/70 ${className}`}
    >
      <ChevronDown className="h-7 w-7" strokeWidth={1.75} />
    </div>
  );
}
