"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/approccio', label: 'Metodo e strategia' },
    { href: '/aree-di-intervento', label: 'Aree di intervento' },
    { href: '/citazioni', label: 'Insight' },
    { href: '/contatti', label: 'Contatti' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-5 flex justify-between items-center text-white transition-all duration-300 ${
        scrolled ? 'bg-[#05155E]/90 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}
    >
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image 
          src="/images/logo.png" 
          alt="Mole Venture Logo" 
          width={400}
          height={400}
          className="h-20 w-auto object-contain mix-blend-screen"
          onError={(e) => { e.currentTarget.style.display='none'; }}
        />
      </Link>
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
  );
}
