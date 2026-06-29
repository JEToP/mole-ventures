'use client';
import { useState, useEffect } from 'react';
import CookieConsent, { getCookieConsentValue } from 'react-cookie-consent';
import Script from 'next/script';

export default function CookieBanner() {
  const [hasConsent, setHasConsent] = useState(false);
  const gaId = process.env.NEXT_PUBLIC_GA_ID || 'G-INSERISCI_IL_TUO_ID';

  useEffect(() => {
    // Controlla se l'utente aveva già accettato in precedenza
    if (getCookieConsentValue() === "true") {
      setHasConsent(true);
    }
  }, []);

  return (
    <>
      <CookieConsent
        location="bottom"
        buttonText="Accetta tutti"
        declineButtonText="Rifiuta"
        enableDeclineButton
        onAccept={() => setHasConsent(true)}
        onDecline={() => setHasConsent(false)}
        disableStyles={true}
        containerClasses="fixed bottom-0 left-0 w-full z-[100] bg-[#01061A] border-t border-white/10 px-6 py-5 md:py-6 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8 shadow-[0_-12px_40px_rgba(0,0,0,0.4)]"
        contentClasses="font-body font-light text-white/85 text-[15px] md:text-base leading-relaxed text-center md:text-left flex-1"
        buttonWrapperClasses="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto justify-center md:justify-end shrink-0"
        buttonClasses="w-full sm:w-auto rounded-full bg-white px-7 py-2.5 font-body text-[15px] font-semibold text-[#05155E] transition-all duration-300 hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        declineButtonClasses="w-full sm:w-auto rounded-full border border-white/25 bg-transparent px-7 py-2.5 font-body text-[15px] font-medium text-white transition-all duration-300 hover:border-white/60 hover:bg-white/5 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        Utilizziamo i cookie per analizzare il traffico e migliorare l'esperienza di navigazione sul nostro sito.
      </CookieConsent>

      {/* GA viene iniettato SOLO se hasConsent è true */}
      {hasConsent && gaId !== 'G-INSERISCI_IL_TUO_ID' && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
    </>
  );
}