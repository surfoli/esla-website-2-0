'use client';

import { useState } from 'react';
import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, Linkedin } from 'lucide-react';

export default function KontaktPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Email-Link erstellen
    const subject = encodeURIComponent(formData.subject);
    const bodyLines = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Telefon: ${formData.phone}`,
      '',
      'Nachricht:',
      formData.message,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    const mailtoLink = `mailto:info@teamelitesoccer.ch?subject=${subject}&body=${body}`;
    window.location.href = mailtoLink;
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              KONTAKT<span className="text-esla-primary">IERE UNS</span>
            </h1>
            <p className="text-white/90 text-xl">
              Wir freuen uns auf Ihre Nachricht!
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            
            {/* Kontaktformular */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h2 className="text-3xl font-black text-esla-secondary mb-6">
                NACHRICHT SENDEN
              </h2>
              
              <form onSubmit={handleSubmit} className="gap-y-4">
                <div>
                  <label className="block text-esla-secondary/80 text-sm font-semibold mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-esla-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-esla-primary"
                    placeholder="Ihr Name"
                  />
                </div>

                <div>
                  <label className="block text-esla-secondary/80 text-sm font-semibold mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-esla-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-esla-primary"
                    placeholder="ihre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-esla-secondary/80 text-sm font-semibold mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-esla-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-esla-primary"
                    placeholder="+41 XX XXX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-esla-secondary/80 text-sm font-semibold mb-2">
                    Betreff *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-esla-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-esla-primary"
                    placeholder="Worum geht es?"
                  />
                </div>

                <div>
                  <label className="block text-esla-secondary/80 text-sm font-semibold mb-2">
                    Nachricht *
                  </label>
                  <textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-esla-secondary placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-esla-primary resize-none"
                    placeholder="Ihre Nachricht..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-esla-primary hover:bg-esla-accent text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-esla-primary/50 flex items-center justify-center gap-x-2"
                >
                  <Send size={20} />
                  <span>Nachricht senden</span>
                </button>
              </form>
            </div>

            {/* Kontaktinformationen */}
            <div className="gap-y-8">
              
              {/* Direkte Kontakte */}
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

                  <div className="flex items-center gap-x-4 p-4 bg-white rounded-xl border border-slate-200">
                    <div className="bg-esla-primary/20 p-3 rounded-lg">
                      <MapPin size={24} className="text-esla-primary" />
                    </div>
                    <div>
                      <div className="text-esla-secondary/70 text-sm">Adresse</div>
                      <div className="text-esla-secondary font-semibold">
                        Sportplatz RUAG<br />
                        Luzern, Schweiz
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Media */}
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

