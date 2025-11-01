import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import CoachQuote from '@/components/about/CoachQuote';
import { getBrandsData } from '@/lib/brands';

export default async function Footer() {
  const { sponsors, partners, goenner } = await getBrandsData();

  return (
    <footer className="bg-black text-white">
      <div className="py-16 md:py-20">
        <Container>
          <div className="flex flex-col gap-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div className="flex items-center gap-4">
                <span className="hidden sm:inline-block h-12 w-[3px] rounded-full bg-esla-primary" />
                <div>
                  <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                    Unsere
                  </span>
                  <span className="block text-3xl md:text-4xl font-black tracking-tight text-esla-primary">
                    SPONSOREN
                  </span>
                </div>
              </div>
              <Link
                href="/sponsoren-angebote"
                className="inline-flex items-center justify-center rounded-full bg-esla-primary px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-white shadow-[0_12px_35px_-20px_rgba(226,24,115,0.9)] transition-transform duration-200 hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-esla-primary/40"
              >
                Team unterstützen
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block w-full h-24 sm:h-28 rounded-2xl bg-white px-6 py-4 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-1"
                  aria-label={sponsor.name}
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                    quality={95}
                    priority
                    {...((sponsor.logo.startsWith('http') || sponsor.name === 'MAGAS') && { unoptimized: true })}
                  />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-12">
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <span className="hidden sm:inline-block h-12 w-[3px] rounded-full bg-esla-primary" />
                  <div>
                    <span className="block text-xs font-semibold uppercase tracking-[0.35em] text-white/60">
                      Unsere
                    </span>
                    <span className="block text-2xl font-bold tracking-[0.2em] text-esla-primary">
                      PARTNER
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-items-center">
                  {partners.map((partner) => (
                    <a
                      key={partner.name}
                      href={partner.url || '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative block w-full h-24 sm:h-28 rounded-2xl bg-white px-6 py-4 shadow-[0_30px_60px_-35px_rgba(0,0,0,0.6)] transition-transform duration-200 hover:-translate-y-1"
                      aria-label={partner.name}
                    >
                      <Image
                        src={partner.logo}
                        alt={partner.name}
                        fill
                        className="object-contain"
                        quality={95}
                        priority
                        {...(partner.logo.startsWith('http') && { unoptimized: true })}
                      />
                    </a>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap justify-center gap-x-10 gap-y-3 text-sm text-white/70 text-center">
                  {goenner.map((name) => (
                    <span key={name}>{name}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <CoachQuote />

      {/* Main Footer */}
      <div className="py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1: About */}
            <div className="col-span-1">
              <Link
                href="/"
                className="inline-block group"
                aria-label="Zur Startseite"
              >
                <Image
                  src="/images/esla-website-logo.png"
                  alt="ESLA Logo"
                  width={80}
                  height={80}
                  className="mb-6 transition-transform duration-200 group-hover:scale-105"
                  unoptimized
                />
                <h3 className="text-xl font-bold text-white mb-4 transition-colors duration-200 group-hover:text-esla-primary">
                  TEAM ELITESOCCER
                </h3>
              </Link>
              <p className="text-white/70 text-sm mb-7 leading-relaxed">
                Elite Soccer Luqmon Adekunle - Wir entwickeln Champions, auf und neben dem Platz.
              </p>
              <div className="flex gap-x-5">
                <a
                  href="https://www.instagram.com/eslateamelitesoccer/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-esla-primary transition-colors"
                >
                  <Instagram size={24} />
                </a>
                <a
                  href="https://www.tiktok.com/@esla_team_eliteso"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-esla-primary transition-colors"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/people/ESLA-Team-Elitesoccer/61578972936267/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-esla-primary transition-colors"
                >
                  <Facebook size={24} />
                </a>
                <a
                  href="https://www.linkedin.com/company/elitesoccerstar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-esla-primary transition-colors"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-7 tracking-wide uppercase text-xs text-white/60">Quick Links</h4>
              <ul className="space-y-3">
                <li><Link href="/" className="text-white/70 hover:text-esla-primary transition-colors text-sm">Home</Link></li>
                <li><Link href="/team" className="text-white/70 hover:text-esla-primary transition-colors text-sm">Team</Link></li>
                <li><Link href="/ueber-uns" className="text-white/70 hover:text-esla-primary transition-colors text-sm">Über uns</Link></li>
                <li><Link href="/trainingszeiten" className="text-white/70 hover:text-esla-primary transition-colors text-sm">Trainingszeiten</Link></li>
                <li><Link href="/standort" className="text-white/70 hover:text-esla-primary transition-colors text-sm">Standort</Link></li>
                <li><Link href="/sponsoren" className="text-white/70 hover:text-esla-primary transition-colors text-sm">Sponsoren</Link></li>
              </ul>
            </div>

            {/* Column 3: Support */}
            <div>
              <h4 className="text-white font-bold mb-7 tracking-wide uppercase text-xs text-white/60">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/datenschutz" className="text-white/70 hover:text-esla-primary transition-colors text-sm">
                    Datenschutzerklärung
                  </Link>
                </li>
                <li>
                  <Link href="/impressum" className="text-white/70 hover:text-esla-primary transition-colors text-sm">
                    Impressum
                  </Link>
                </li>
                <li>
                  <Link href="/kontakt" className="text-white/70 hover:text-esla-primary transition-colors text-sm">
                    Kontakt
                  </Link>
                </li>
                <li>
                  <Link href="/sponsoren-angebote" className="text-white/70 hover:text-esla-primary transition-colors text-sm">
                    Sponsor werden
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h4 className="text-white font-bold mb-7 tracking-wide uppercase text-xs text-white/60">Kontakt</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-x-3 text-white/70 text-sm">
                  <Mail size={18} className="mt-1 flex-shrink-0" />
                  <a href="mailto:info@teamelitesoccer.ch" className="hover:text-esla-primary transition-colors">
                    info@teamelitesoccer.ch
                  </a>
                </li>
                <li className="flex items-start gap-x-3 text-white/70 text-sm">
                  <Phone size={18} className="mt-1 flex-shrink-0" />
                  <a href="tel:+41786450755" className="hover:text-esla-primary transition-colors">
                    +41 78 645 07 55
                  </a>
                </li>
                <li className="flex items-start gap-x-3 text-white/70 text-sm">
                  <MapPin size={18} className="mt-1 flex-shrink-0" />
                  <span>
                    Sportplatz RUAG<br />
                    Luzern, Schweiz
                  </span>
                </li>
              </ul>
            </div>
          </div>

          
        </Container>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 py-7">
        <Container>
          <div className="flex flex-col items-center md:flex-row md:justify-between md:items-center gap-y-1 md:gap-y-0">
            <p className="text-white/50 text-sm text-center md:text-left" suppressHydrationWarning>
              © {new Date().getFullYear()} Team Elitesoccer. Alle Rechte vorbehalten.
            </p>
            <p className="text-white/50 text-sm text-center md:text-right">
              Offiziell anerkannt vom <span className="text-esla-primary">Schweizerischen Fussballverband (SFV)</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

