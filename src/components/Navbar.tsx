"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

export default function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/approccio', label: 'Approccio' },
    { href: '/aree-di-intervento', label: 'Aree di intervento' },
    { href: '/citazioni', label: 'Citazioni' },
  ];

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-6 md:px-12 py-8 flex justify-between items-center text-white">
      <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <Image 
          src="/images/logo.png" 
          alt="Mole Venture Logo" 
          width={400}
          height={400}
          className="h-30 w-auto object-contain mix-blend-screen"
          onError={(e) => { e.currentTarget.style.display='none'; }}
        />
        {/* Placeholder testo nascosto o rimosso. Presupponendo il file sia presente */}
      </Link>
      <nav className="hidden md:flex gap-10 font-body text-[1.25rem] font-semibold">
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
