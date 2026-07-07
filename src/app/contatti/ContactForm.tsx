"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

type Status = "idle" | "sending" | "success" | "error";

const inputClass =
  "w-full bg-white/5 text-white placeholder-white/50 border border-white/20 rounded-lg px-4 py-3 font-body font-light text-base leading-relaxed focus:outline-none focus:ring-2 focus:ring-white/50 focus:bg-white/10 transition-all backdrop-blur-sm";
const labelClass =
  "font-body font-semibold text-white text-base md:text-xl leading-relaxed";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    
    setStatus("sending");
    setErrorMsg("");

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setErrorMsg(data.error ?? "Invio non riuscito, riprova.");
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setErrorMsg("Errore di connessione, riprova.");
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8 w-full">
      {/* Prima riga: Nome, Azienda */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="nome" className={labelClass}>Nome</label>
          <input type="text" id="nome" name="nome" placeholder="Il tuo nome" required className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="azienda" className={labelClass}>Azienda</label>
          <input type="text" id="azienda" name="azienda" placeholder="La tua azienda" className={inputClass} />
        </div>
      </div>

      {/* Seconda riga: Telefono, Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="flex flex-col gap-2">
          <label htmlFor="telefono" className={labelClass}>Telefono</label>
          <input type="tel" id="telefono" name="telefono" placeholder="Il tuo numero" className={inputClass} />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClass}>Email</label>
          <input type="email" id="email" name="email" placeholder="La tua email" required className={inputClass} />
        </div>
      </div>

      {/* Terza riga: Oggetto */}
      <div className="flex flex-col gap-2">
        <label htmlFor="oggetto" className={labelClass}>Oggetto</label>
        <input type="text" id="oggetto" name="oggetto" placeholder="Di cosa vorresti parlarci?" className={inputClass} />
      </div>

      {/* Quarta riga: Messaggio */}
      <div className="flex flex-col gap-2">
        <label htmlFor="messaggio" className={labelClass}>Messaggio</label>
        <textarea
          id="messaggio"
          name="messaggio"
          placeholder="Raccontaci la tua realtà..."
          rows={6}
          required
          className={`${inputClass} resize-y`}
        ></textarea>
      </div>

      {/* Honeypot anti-spam: nascosto agli utenti, riempito dai bot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {/* Messaggi di stato */}
      {status === "success" && (
        <p className="font-body text-white text-base" role="status">
          Messaggio inviato. Ti risponderemo al più presto.
        </p>
      )}
      {status === "error" && (
        <p className="font-body text-red-200 text-base" role="alert">
          {errorMsg}
        </p>
      )}

      {/* Bottone di invio */}
      <div className="flex justify-start mt-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-body text-base font-semibold text-blue-deep transition-colors duration-300 hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-blue-deep disabled:opacity-60 disabled:cursor-not-allowed md:text-lg"
        >
          {status === "sending" ? "Invio in corso…" : "Invia messaggio"}
          <ArrowRight className="h-[18px] w-[18px] transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2} />
        </button>
      </div>
    </form>
  );
}
