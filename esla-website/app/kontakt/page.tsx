'use client';

import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function KontaktPage() {
  

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              KONTAKTIERE <span className="text-esla-primary">UNS</span>
            </h1>
            <p className="text-white/90 text-xl">
              Wir freuen uns auf Ihre Nachricht!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Links: Direkt erreichen */}
            <div className="gap-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200">
                <h2 className="text-3xl font-black text-esla-secondary mb-6">
                  DIREKT ERREICHEN
                </h2>
                <div className="gap-y-6">
                  <a
                    href="mailto:info@teamelitesoccer.ch"
                    className="flex items-center gap-x-4 p-4 bg-white rounded-xl hover:bg-slate-50 transition-colors group border border-slate-200"
                  >
                    <div className="bg-esla-primary/20 p-3 rounded-lg group-hover:bg-esla-primary/30 transition-colors">
                      <Mail size={24} className="text-esla-primary" />
                    </div>
                    <div>
                      <div className="text-esla-secondary/70 text-sm">Email</div>
                      <div className="text-esla-secondary font-semibold">info@teamelitesoccer.ch</div>
                    </div>
                  </a>
                  <a
                    href="tel:+41786450755"
                    className="flex items-center gap-x-4 p-4 bg-white rounded-xl hover:bg-slate-50 transition-colors group border border-slate-200"
                  >
                    <div className="bg-esla-primary/20 p-3 rounded-lg group-hover:bg-esla-primary/30 transition-colors">
                      <Phone size={24} className="text-esla-primary" />
                    </div>
                    <div>
                      <div className="text-esla-secondary/70 text-sm">Telefon</div>
                      <div className="text-esla-secondary font-semibold">+41 78 645 07 55</div>
                    </div>
                  </a>
                  <a
                    href="/standort"
                    className="flex items-center gap-x-4 p-4 bg-white rounded-xl hover:bg-slate-50 transition-colors group border border-slate-200"
                  >
                    <div className="bg-esla-primary/20 p-3 rounded-lg group-hover:bg-esla-primary/30 transition-colors">
                      <MapPin size={24} className="text-esla-primary" />
                    </div>
                    <div>
                      <div className="text-esla-secondary/70 text-sm">Adresse</div>
                      <div className="text-esla-secondary font-semibold">
                        Sportplatz RUAG<br />
                        Luzern, Schweiz
                      </div>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Rechts: Social Media */}
            <div className="gap-y-8">
              <div className="bg-gradient-to-br from-esla-primary to-esla-accent rounded-3xl p-8">
                <h3 className="text-2xl font-black text-white mb-4">
                  FOLGE UNS
                </h3>
                <p className="text-white/90 mb-6">
                  Bleib auf dem Laufenden mit unseren neuesten Updates!
                </p>
                <div className="flex gap-x-4">
                  <a
                    href="https://www.instagram.com/eslateamelitesoccer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur p-4 rounded-xl transition-colors"
                  >
                    <Instagram size={32} className="text-white" />
                  </a>
                  <a
                    href="https://www.tiktok.com/@esla_team_eliteso"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur p-4 rounded-xl transition-colors"
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="text-white">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                    </svg>
                  </a>
                  <a
                    href="https://www.facebook.com/people/ESLA-Team-Elitesoccer/61578972936267/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur p-4 rounded-xl transition-colors"
                  >
                    <Facebook size={32} className="text-white" />
                  </a>
                  <a
                    href="https://www.linkedin.com/company/elitesoccerstar/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur p-4 rounded-xl transition-colors"
                  >
                    <Linkedin size={32} className="text-white" />
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
