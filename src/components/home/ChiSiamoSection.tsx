"use client";

import { useEffect, useRef, useState } from 'react';

export default function ChiSiamoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    // Su mobile (o con reduced-motion) la Mole è subito visibile, senza animazione.
    const desktop = window.matchMedia('(min-width: 768px)').matches;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setIsDesktop(desktop);

    if (!desktop || reduceMotion) {
      setRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.6 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#05155E] overflow-hidden min-h-[560px] md:min-h-[600px]"
    >
      {/* Sfondo mobile (verticale) */}
      <div
        className="absolute inset-0 bg-cover bg-center md:hidden"
        style={{ backgroundImage: "url('/images/background_chisiamo_mobile.webp')" }}
        aria-hidden="true"
      />
      {/* Sfondo desktop (panoramico) */}
      <div
        className="absolute inset-0 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url('/images/background_chisiamo.webp')" }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto flex flex-col md:flex-row md:items-stretch">

        {/* Mole (contorni del logo Mole Venture) - elemento decorativo, disegno a linee */}
        <svg
          viewBox="0 0 54 91"
          role="img"
          aria-label="Contorno stilizzato della Mole Antonelliana, logo Mole Venture"
          className="pointer-events-none select-none text-white absolute z-0 -right-16 -bottom-8 h-[70%] opacity-[0.18] md:right-auto md:left-[10%] md:bottom-[-3rem] md:top-auto md:translate-y-0 md:h-[92%] md:opacity-[0.7]"
          style={{
            clipPath: isDesktop && !revealed ? 'inset(100% 0 0 0)' : 'inset(0 0 0% 0)',
            transition: isDesktop ? 'clip-path 6200ms cubic-bezier(0.16, 1, 0.3, 1) 500ms' : 'none',
          }}
        >
          <g fill="none" stroke="currentColor" strokeWidth="0.6" strokeLinejoin="round" strokeLinecap="round">
            <path d="M51.0654 82.5023C50.7074 82.7673 50.3493 83.0347 49.9936 83.2997C50.0145 85.2275 50.0354 87.1554 50.0564 89.0833C43.8555 87.7957 35.2768 86.5062 26.3789 86.4546C16.8928 86.4006 9.55203 87.7394 3.07449 89.0833C3.09542 87.1554 3.11634 85.2275 3.13727 83.2997C2.77921 83.0347 2.42116 82.7673 2.06543 82.5023C3.04427 82.1341 4.02543 81.7659 5.00427 81.3953V76.6367C4.61831 76.4256 4.23003 76.2145 3.84408 76.0034C4.58344 75.6141 5.3228 75.2271 6.06216 74.8378C5.61342 70.8555 5.71573 67.8417 5.92033 66.6972C6.17608 65.2595 6.65271 63.5498 6.65271 63.5498C6.65736 63.5357 6.66201 63.5217 6.66434 63.5052C9.745 52.8059 17.6106 46.3047 21.1376 43.7295V42.3059L20.0891 40.554H21.5027V34.4656C21.8956 34.02 22.3025 33.511 22.7047 32.9388C23.2046 32.2234 23.6045 31.541 23.9184 30.9218L23.8277 27.1341L23.4394 26.7682V25.9732L24.3973 25.7902C24.4601 24.9131 24.5229 24.0383 24.5833 23.1611C24.9158 18.963 25.246 14.7673 25.5785 10.5692L26.4294 0.083252L27.3036 10.541L28.215 23.2385C28.2708 24.0782 28.329 24.9201 28.3848 25.7598L29.4775 26.0295V26.7354L28.9614 27.1693V30.9382C29.2264 31.5034 29.5822 32.1531 30.0634 32.8379C30.4982 33.4571 30.9469 33.9777 31.3585 34.4093L31.3422 40.5282H32.8814L31.7026 42.3294V43.6662C35.0599 46.0843 42.6256 52.2337 45.8457 62.4991C46.4479 64.4223 46.792 66.3243 46.792 66.3243C47.4082 69.8001 47.2966 72.7692 47.0687 74.8378C47.8081 75.2271 48.5474 75.6141 49.2868 76.0034C48.9008 76.2145 48.5125 76.4256 48.1266 76.6367V81.3953C49.1054 81.7635 50.0866 82.1317 51.0654 82.5023Z" />
            <path d="M50.0856 88.1513L50.0946 89.0833L46.8135 88.4173C46.346 85.4946 45.3932 84.4668 44.5841 84.0787C44.1616 83.8751 43.3189 83.487 41.721 83.7793C39.4737 84.1889 38.6871 83.832 38.4242 83.3649C37.959 82.5384 38.8826 80.8878 38.2309 80.3415C38.0916 80.2242 37.9657 80.2313 37.6331 79.975C37.3095 79.7235 37.0151 79.4959 37.0129 79.194C37.0129 78.8515 37.3814 78.5855 37.5365 78.4753C37.95 78.1783 38.3208 78.1974 38.3298 78.0609C38.3365 77.9483 38.0893 77.8621 37.8781 77.7566C37.4196 77.5243 36.6398 76.9397 36.6196 76.36C36.5994 75.7132 37.5342 75.3083 37.341 74.6591C37.3365 74.6471 37.3342 74.6399 37.3297 74.6279C37.1432 74.0841 36.6533 73.9404 35.7499 73.4014C35.179 73.0612 35.0936 72.951 35.0712 72.8168C35.024 72.5365 35.2757 72.2946 35.5454 71.9831C35.9566 71.5112 36.242 70.9315 36.6241 70.4332C37.0376 69.8965 37.5927 68.967 38.1612 67.2517V63.6008C38.2781 62.6785 38.7748 59.6264 41.2311 57.5158C42.1008 56.7684 42.984 56.3396 43.6852 56.0833C44.6942 58.0165 45.8786 60.7643 46.6269 64.2308C47.5394 68.4592 47.4472 72.0909 47.2023 74.5345C47.9169 74.9322 48.6316 75.3275 49.3462 75.7251L48.2248 76.372V81.2327L51.0654 82.3635L50.0294 83.178C50.0474 84.8358 50.0676 86.4936 50.0856 88.1513Z" />
            <path d="M3.04527 88.155L3.03628 89.0833C4.07904 88.8709 5.11955 88.6609 6.16232 88.4485C6.71291 85.4898 7.71972 84.4757 8.54674 84.0986C8.98946 83.8982 9.81873 83.5117 11.4098 83.8004C13.6572 84.2084 14.4437 83.8529 14.7067 83.3876C15.1719 82.5644 14.2482 80.9203 14.8999 80.3763C15.0393 80.2594 15.1651 80.2666 15.4977 80.0112C15.8214 79.7607 16.1158 79.534 16.118 79.2334C16.118 78.8921 15.7494 78.6273 15.5944 78.5175C15.1809 78.2216 14.8101 78.2407 14.8011 78.1047C14.7943 77.9926 15.0415 77.9067 15.2528 77.8017C15.7112 77.5702 16.4911 76.988 16.5113 76.4106C16.5315 75.7663 15.5966 75.3631 15.7899 74.7164C15.7944 74.7045 15.7966 74.6974 15.8011 74.6854C15.9877 74.1438 16.4776 74.0006 17.381 73.4637C17.9518 73.1249 18.0372 73.0151 18.0597 72.8815C18.1069 72.6023 17.8552 72.3613 17.5855 72.0511C17.1742 71.5811 16.8888 71.0036 16.5068 70.5073C16.0933 69.9728 15.5382 69.047 14.9696 67.3386V63.7021C14.8438 62.762 14.3291 59.7793 11.8998 57.6414C10.9604 56.8158 10.003 56.3505 9.26813 56.0833C8.23885 57.911 6.94664 60.6885 6.19827 64.2963C5.29934 68.6366 5.5825 72.3088 5.92859 74.5947C5.21394 74.9908 4.49929 75.3846 3.78464 75.7806L4.90606 76.4249V81.2663L2.06543 82.3926L3.10145 83.2039C3.08347 84.855 3.06325 86.5039 3.04527 88.155Z" />
          </g>
        </svg>

        {/* ===== Colonna sinistra: solo etichetta "Chi siamo" ===== */}
        <div className="relative z-10 w-full md:w-[40%] flex-shrink-0 px-6 md:px-10 pt-16 md:pt-16">
          <h2 className="font-heading text-white text-3xl md:text-4xl font-semibold leading-[1.05]">
            Chi<br className="hidden md:block" /> siamo
          </h2>
        </div>

        {/* ===== Colonna destra: titolo + punti ===== */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 pt-8 pb-20 md:py-20">
          <p className="font-heading text-white text-2xl md:text-3xl lg:text-4xl font-semibold leading-[1.15] tracking-tight mb-10 md:mb-12 max-w-2xl">
            Siamo una realtà focalizzata su processi di{' '}
            <span className="text-white">Entrepreneurship Through Acquisition</span>.
          </p>

          <ul className="flex flex-col gap-7 md:gap-8 max-w-2xl">
            <li className="border-l-2 border-white/70 pl-5">
              <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
                Acquisiamo PMI che necessitano di una fase di cambiamento e le guidiamo in prima persona.
              </p>
            </li>
            <li className="border-l-2 border-white/70 pl-5">
              <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
                Generiamo la discontinuità necessaria per sbloccare il potenziale latente dell&apos;impresa.
              </p>
            </li>
            <li className="border-l-2 border-white/70 pl-5">
              <p className="font-body font-light text-white text-base md:text-lg leading-relaxed">
                Costruiamo un ecosistema fatto di nuova imprenditorialità, management qualificato e
                continuità con il suo DNA storico, accompagnandola verso una nuova fase di successo.
              </p>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}