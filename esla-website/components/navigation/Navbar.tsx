'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/team', label: 'Team' },
    { href: '/spiele', label: 'Spiele' },
    { href: '/ueber-uns', label: 'Über uns' },
    { href: '/trainingszeiten', label: 'Trainingszeiten' },
    { href: '/standort', label: 'Standort' },
    { href: '/sponsoren', label: 'Sponsoring' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black" suppressHydrationWarning>
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="relative flex items-center space-x-2 shrink-0 mr-6 xl:mr-12">
            <div className="relative">
              <Image
                src="/images/ESLA_Website_logo.png?v=20251013"
                alt="ESLA Logo"
                width={68}
                height={68}
                className="w-[68px] h-[68px] drop-shadow-lg"
                priority
                unoptimized
              />
            </div>
            <span className="text-white font-bold text-xl whitespace-nowrap truncate max-w-[60vw]">TEAM ELITESOCCER</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-esla-primary transition-colors duration-200 font-bold whitespace-nowrap"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social Links & CTA */}
          <div className="hidden xl:flex items-center space-x-6 ml-6">
            <a href="https://www.instagram.com/eslateamelitesoccer/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-esla-primary transition-colors">
              <Instagram size={20} />
            </a>
            <a href="https://www.tiktok.com/@esla_team_eliteso" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-esla-primary transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
            <a href="https://www.facebook.com/people/ESLA-Team-Elitesoccer/61578972936267/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-esla-primary transition-colors">
              <Facebook size={20} />
            </a>
            <a href="https://www.linkedin.com/company/elitesoccerstar/" target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-esla-primary transition-colors">
              <Linkedin size={20} />
            </a>
            <Link
              href="/kontakt"
              className="bg-esla-primary hover:bg-esla-accent text-white px-7 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg shadow-esla-primary/30"
            >
              Kontakt
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="xl:hidden text-white/90 p-2"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="xl:hidden bg-black">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors font-bold"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {/* Unterpunkte Team */}
            <div className="mt-2 border-t border-white/10 pt-2">
              <span className="px-3 py-2 text-white/60 text-xs tracking-wide uppercase">Team Unterkategorien</span>
              <div className="mt-1 space-y-1">
                <Link
                  href="/team?section=staff"
                  className="block px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Staff & Trainer
                </Link>
                <Link
                  href="/team?section=players"
                  className="block px-3 py-2 text-white/90 hover:bg-white/10 rounded-lg transition-colors font-bold"
                  onClick={() => setIsOpen(false)}
                >
                  Spieler
                </Link>
              </div>
            </div>
            <Link
              href="/kontakt"
              className="block px-3 py-3 bg-esla-primary text-white rounded-lg text-center font-semibold mt-4 shadow-md shadow-esla-primary/40"
              onClick={() => setIsOpen(false)}
            >
              Kontakt
            </Link>
            <div className="flex justify-center space-x-6 pt-4">
              <a href="https://www.instagram.com/eslateamelitesoccer/" target="_blank" rel="noopener noreferrer" className="text-white/80">
                <Instagram size={24} />
              </a>
              <a href="https://www.tiktok.com/@esla_team_eliteso" target="_blank" rel="noopener noreferrer" className="text-white/80">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://www.facebook.com/people/ESLA-Team-Elitesoccer/61578972936267/" target="_blank" rel="noopener noreferrer" className="text-white/80">
                <Facebook size={24} />
              </a>
              <a href="https://www.linkedin.com/company/elitesoccerstar/" target="_blank" rel="noopener noreferrer" className="text-white/80">
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}