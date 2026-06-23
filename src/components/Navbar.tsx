"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/approccio', label: 'Metodo e strategia' },
    { href: '/aree-di-intervento', label: 'Aree di intervento' },
    { href: '/citazioni', label: 'Insight' },
    { href: '/contatti', label: 'Contatti' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[60] px-6 md:px-12 py-5 flex justify-between items-center text-white transition-all duration-300 ${
          scrolled || isMobileMenuOpen ? 'bg-[#05155E]/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
        }`}
      >
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity" onClick={() => setIsMobileMenuOpen(false)}>
          <Image 
            src="/images/logo.png" 
            alt="Mole Venture Logo" 
            width={400}
            height={400}
            className="h-20 w-auto object-contain mix-blend-screen"
            onError={(e) => { e.currentTarget.style.display='none'; }}
          />
        </Link>

        {/* Hamburger / X Icon per Mobile */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Menu Desktop */}
        <nav className="hidden md:flex gap-8 font-body text-base font-semibold">
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
      </header>

      {/* Sfondo scuro semitrasparente (chiude il menu se cliccato) */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[50] transition-opacity duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Pannello laterale (Right Drawer) Menu Mobile */}
      <div 
        className={`fixed top-0 right-0 h-full w-64 bg-[#05155E] z-[55] shadow-2xl transform transition-transform duration-300 ease-in-out md:hidden flex flex-col pt-32 px-8 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col gap-6 font-body text-xl font-semibold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`transition-colors border-b border-white/10 pb-3 ${isActive ? 'text-blue-soft' : 'text-white hover:text-blue-soft'}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </>
  );
}
