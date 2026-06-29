import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative flex min-h-[100lvh] flex-col items-center justify-center overflow-hidden bg-[#01061A] px-6 text-center text-white">
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `
            radial-gradient(60% 50% at 50% 40%, rgba(6,46,181,0.35) 0%, transparent 70%),
            radial-gradient(40% 60% at 30% 70%, rgba(76,172,248,0.12) 0%, transparent 60%)
          `,
        }}
      />

      <div className="relative z-10 flex flex-col items-center">
        {/* Big 404 number */}
        <span
          className="font-heading text-[8rem] font-semibold leading-none tracking-tight sm:text-[12rem] md:text-[16rem]"
          style={{
            background: "linear-gradient(135deg, #4CACF8 0%, #062EB5 50%, #05155E 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          404
        </span>

        <h1 className="mt-2 font-heading text-2xl font-semibold leading-tight tracking-tight text-white sm:text-3xl md:text-4xl">
          Pagina non trovata
        </h1>

        <p className="mt-4 max-w-md font-body text-base font-light leading-relaxed text-white/70 md:text-lg">
          La pagina che stai cercando non esiste o è stata spostata.
        </p>

        <Link
          href="/"
          className="group mt-10 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-body text-base font-semibold text-blue-deep transition-colors duration-300 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#01061A] md:text-lg"
        >
          Torna alla home
          <ArrowRight
            className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1"
            strokeWidth={2}
          />
        </Link>
      </div>
    </div>
  );
}
