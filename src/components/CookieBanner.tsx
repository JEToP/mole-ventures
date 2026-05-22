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
        style={{ background: "#2B373B" }}
        buttonStyle={{ background: "#4ade80", color: "#000", fontSize: "14px", borderRadius: "6px" }}
        declineButtonStyle={{ fontSize: "14px", borderRadius: "6px" }}
      >
        Utilizziamo i cookie per analizzare il traffico e migliorare l'esperienza sul sito.
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