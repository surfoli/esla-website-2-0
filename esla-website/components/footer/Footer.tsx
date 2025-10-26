import Image from 'next/image';
import Link from 'next/link';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import Container from '@/components/ui/Container';
import CoachQuote from '@/components/about/CoachQuote';

export default function Footer() {
  const sponsors = [
    { name: 'MAGAS', logo: '/images/ESLA_Sponsor_Logo_Magas.png', url: 'https://magas.ch' },
    { name: 'Go Gemba', logo: '/images/ESLA_Sponsor_Logo_Go_Gemba.png', url: 'https://gogemba.ch' },
    { name: 'TEKO', logo: '/images/ESLA_Sponsor_Logo_TEKO_Schweizer_Fachschule.png', url: 'https://www.teko.ch/' },
    { name: 'ZK Automobile AG', logo: '/images/ESLA_Sponsor_Logo_ZK_Automobile_AG.png', url: 'https://zk-automobile-ag.ch/' },
  ];

  const partners = [
    { name: 'Superheldenwerkstatt Flavio Räber', logo: '/images/Superheldenwerkstatt_Flavio_Raeber_Logo.png', url: 'https://www.superheldenwerkstatt.ch/' },
    { name: 'D3 Webstudio Olivier Durand', logo: '/images/D3Webstudio_Olivier_Durand.png', url: 'https://d3webstudio.ch/' },
  ];

  const goenner = [
    'Eva Marti aus Winznau',
    'Familie Völlmin aus Ormalingen',
    'Edi Häusler aus Olten',
    'Nikola Ivanovic aus Küttingen',
    'Anton Balaj aus Dagmersellen',
  ];

  return (
    <footer className="bg-[#242424] text-white">
      {/* Sponsors & Gönner Section */}
      <div className="py-16 md:py-20">
        <Container>
          {/* Sponsoren */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-x-4">
                <div className="w-1 h-16 bg-white"></div>
                <h3 className="flex flex-col">
                  <span className="text-xs text-white/60 font-medium tracking-[0.2em] mb-0.5 uppercase">UNSERE</span>
                  <span className="text-2xl md:text-3xl font-black text-esla-primary">SPONSOREN</span>
                </h3>
              </div>
              <a
                href="/kontakt"
                className="hidden md:inline-flex items-center gap-x-2 bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg shadow-esla-primary/30"
              >
                Team unterstützen
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-10 items-center justify-items-center">
              {sponsors.map((sponsor) => (
                <a
                  key={sponsor.name}
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-24 bg-white rounded-xl p-4 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20 cursor-pointer"
                >
                  <Image
                    src={sponsor.logo}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <div className="flex items-center gap-x-4 mb-6">
              <div className="w-1 h-16 bg-white"></div>
              <h3 className="flex flex-col">
                <span className="text-xs text-white/60 font-medium tracking-[0.2em] mb-0.5 uppercase">UNSERE</span>
                <span className="text-2xl md:text-3xl font-black text-esla-primary">PARTNER</span>
              </h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-7 md:gap-10 items-center justify-items-center">
              {partners.map((partner) => (
                <a
                  key={partner.name}
                  href={partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full h-24 bg-white rounded-xl p-4 hover:scale-105 transition-all duration-300 shadow-xl shadow-black/20 cursor-pointer"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    className="object-contain"
                    unoptimized
                  />
                </a>
              ))}
            </div>
          </div>

          {/* Gönner */}
          <div>
            <div className="flex items-center gap-x-4 mb-6">
              <div className="w-1 h-16 bg-white"></div>
              <h3 className="flex flex-col">
                <span className="text-xs text-white/60 font-medium tracking-[0.2em] mb-0.5 uppercase">UNSERE</span>
                <span className="text-2xl md:text-3xl font-black text-esla-primary">GÖNNER</span>
              </h3>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-white/70 text-sm md:text-base">
              {goenner.map((name, index) => (
                <span key={index} className="whitespace-nowrap">
                  {name}
                </span>
              ))}
            </div>
            {/* Mobile Button */}
            <div className="text-center mt-8 md:hidden">
              <a
                href="/kontakt"
                className="inline-flex items-center gap-x-2 bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 transform hover:scale-105 shadow-lg shadow-esla-primary/30"
              >
                Team unterstützen
              </a>
            </div>
          </div>
        </Container>
      </div>

      {/* Coach Quote */}
      <CoachQuote />

      {/* Main Footer */}
      <div className="py-20 md:py-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1: About */}
            <div className="col-span-1">
              <Image
                src="/images/ESLA_Website_logo.png"
                alt="ESLA Logo"
                width={80}
                height={80}
                className="mb-6"
                unoptimized
              />
              <h3 className="text-xl font-bold text-white mb-4">TEAM ELITESOCCER</h3>
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
                  <Link href="/datenschutz#cookies" className="text-white/70 hover:text-esla-primary transition-colors text-sm">
                    Cookie-Einstellungen
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
          <div className="flex flex-col md:flex-row justify-between items-center gap-y-4 md:gap-y-0">
            <p className="text-white/50 text-sm" suppressHydrationWarning>
              © {new Date().getFullYear()} Team Elitesoccer. Alle Rechte vorbehalten.
            </p>
            <p className="text-white/50 text-sm">
              Offiziell anerkannt vom <span className="text-esla-primary">Schweizerischen Fussballverband (SFV)</span>
            </p>
          </div>
        </Container>
      </div>
    </footer>
  );
}

