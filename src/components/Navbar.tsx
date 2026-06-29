"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Previene lo scroll del body quando il menu mobile è aperto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Sfondo della navbar quando si scorre (resta sempre sticky in alto)
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/approccio', label: 'Metodo e strategia' },
    { href: '/aree-di-intervento', label: 'Aree di intervento' },
    { href: '/citazioni', label: 'Insight' },
    { href: '/contatti', label: 'Contatti' },
  ];

  // Pagine senza hero scuro a tutto schermo: la navbar ha lo sfondo navy fin
  // da subito (altrimenti, trasparente su contenuto chiaro, non si leggerebbe).
  const solidFromTop = pathname === '/citazioni';
  const showSolidBackground = isScrolled || isMobileMenuOpen || solidFromTop;

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[60] isolate pt-[env(safe-area-inset-top)] transition-colors duration-300 ${
          showSolidBackground
            ? 'bg-[#030d3d]/90 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.08)]'
            : 'bg-transparent'
        }`}
      >
        <div
          className={`w-full max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center text-white transition-all duration-300 ${
            isScrolled ? 'py-2 md:py-3' : 'py-4 md:py-6'
          }`}
        >
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Mole Venture Logo"
              width={400}
              height={400}
              priority
              className={`w-auto object-contain mix-blend-screen transition-all duration-300 ${
                isScrolled ? 'h-12 md:h-16' : 'h-16 md:h-24'
              }`}
              onError={(e) => { e.currentTarget.style.display='none'; }}
            />
          </Link>

          {/* Hamburger / X Icon per Mobile */}
          <button
            type="button"
            className="md:hidden text-white focus:outline-none relative z-[70] p-3 -mr-3 cursor-pointer touch-manipulation"
            onClick={() => setIsMobileMenuOpen((open) => !open)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg className="w-9 h-9 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Menu Desktop */}
          <nav className="hidden md:flex gap-9 font-body text-lg font-semibold">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link key={link.href} href={link.href} className="relative group py-1">
                  <span>{link.label}</span>
                  <span 
                    className={`absolute left-0 -bottom-1 h-0.5 bg-white transition-all duration-300 ease-in-out ${
                      isActive ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Sfondo scuro semitrasparente (chiude il menu se cliccato) */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[50] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Pannello laterale (Right Drawer) Menu Mobile */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-blue-deep/90 backdrop-blur-lg z-[55] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-28 px-8 ${
          isMobileMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        <nav className="flex flex-col gap-1 font-body text-lg font-light">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`relative transition-colors border-b border-white/10 py-4 ${isActive ? 'text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
                {isActive && (
                  <span className="absolute left-0 bottom-[-1px] h-0.5 w-8 bg-white" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}