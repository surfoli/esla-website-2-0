import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { Dumbbell, Star, Sprout, Heart, Users, Sparkles } from 'lucide-react';

const sponsors = [
  { name: 'MAGAS', logo: '/images/ESLA_Sponsor_Logo_Magas.png' },
  { name: 'Go Gemba', logo: '/images/ESLA_Sponsor_Logo_Go_Gemba.png' },
  { name: 'TEKO Schweizer Fachschule', logo: '/images/ESLA_Sponsor_Logo_TEKO_Schweizer_Fachschule.png' },
  { name: 'ZK Automobile AG', logo: '/images/ESLA_Sponsor_Logo_ZK_Automobile_AG.png' },
];

const goenner = [
  'Eva Marti, Winznau',
  'Familie Völlmin, Ormalingen',
  'Edi Häusler, Olten',
  'Nikola Ivanovic, Küttingen',
  'Anton Balaj, Dagmersellen',
];

export default function SponsorenPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-black text-esla-secondary mb-6">
              Herzlichen Dank an unsere <span className="text-esla-primary">Sponsoren und Gönner</span>
            </h1>
            <p className="text-esla-secondary/80 text-xl max-w-4xl mx-auto leading-relaxed">
              Ohne Ihre grosszügige Unterstützung wäre der Start von Team Elitesoccer (ESLA) nicht möglich gewesen.
              Dank Ihnen können wir unseren Traum verwirklichen – ein professionelles Fussballteam aufzubauen, 
              das Leidenschaft, Teamgeist und Entwicklung verbindet.
            </p>
          </div>

          {/* Was Ihre Partnerschaft ermöglicht */}
          <div className="rounded-3xl p-10 md:p-12 shadow-lg mb-16 bg-esla-secondary text-white">
            <h2 className="text-3xl font-black text-white mb-8 text-center">
              Ihre Partnerschaft ermöglicht uns:
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6">
                <Dumbbell className="mx-auto mb-4 text-esla-primary" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Trainingsplätze & Ausrüstung</h3>
                <p className="text-white/80">Finanzierung professioneller Trainingsbedingungen</p>
              </div>
              <div className="text-center p-6">
                <Star className="mx-auto mb-4 text-esla-primary" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Individuelle Förderung</h3>
                <p className="text-white/80">Junge Talente gezielt entwickeln</p>
              </div>
              <div className="text-center p-6">
                <Sprout className="mx-auto mb-4 text-esla-primary" size={40} />
                <h3 className="text-xl font-bold text-white mb-2">Nachhaltige Entwicklung</h3>
                <p className="text-white/80">Den Fussballnachwuchs langfristig aufbauen</p>
              </div>
            </div>
          </div>

          {/* Danke Box */}
          <div className="bg-gradient-to-br from-esla-primary to-esla-accent rounded-3xl p-10 md:p-12 text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-6">
              Wir freuen uns darauf, gemeinsam mit Ihnen zu wachsen und bald erste sportliche Erfolge zu feiern – 
              diese gehören auch Ihnen!
            </h2>
            <div className="text-white/90 text-lg mb-6">
              <p className="mb-2">Mit sportlichen Grüssen</p>
              <p className="font-bold text-xl">Der Vorstand</p>
              <p className="text-2xl font-black mt-2">Team Elitesoccer | ESLA</p>
            </div>
          </div>

          {/* Sponsoren 2025/26 */}
          <div className="mb-16">
            <h2 className="text-4xl font-black text-esla-secondary text-center mb-12">
              <Heart className="inline-block mr-2 text-esla-primary w-7 h-7 align-[-3px]" /> SPONSOREN <span className="text-esla-primary">2025/26</span>
            </h2>
            {/* CTA Links unter der Überschrift */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <Link
                href="/sponsoren-angebote"
                className="bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 shadow-lg shadow-esla-primary/40"
              >
                Sponsoring-Pakete ansehen
              </Link>
              <Link
                href="/kontakt"
                className="bg-white text-esla-secondary hover:bg-slate-50 px-6 py-3 rounded-full font-semibold transition-all duration-200 border border-slate-300"
              >
                Kontakt
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {sponsors.map((sponsor) => (
                <div
                  key={sponsor.name}
                  className="bg-white rounded-2xl p-6 flex items-center justify-center hover:scale-105 transition-transform duration-300 shadow-xl"
                >
                  <div className="relative w-full h-24 md:h-28 lg:h-32">
                    <Image
                      src={sponsor.logo}
                      alt={sponsor.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Gönner */}
          <div className="bg-esla-secondary text-white rounded-3xl p-12 border border-white/10 mb-16">
            <h2 className="text-3xl font-black text-white text-center mb-8">
              <Users className="inline-block mr-2 text-esla-primary w-7 h-7 align-[-3px]" /> GÖNNER
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-center">
              {goenner.map((name) => (
                <div
                  key={name}
                  className="bg-white/10 rounded-xl p-4 border border-white/20 text-white font-semibold"
                >
                  {name}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-esla-secondary to-esla-dark rounded-3xl p-12 text-center">
            <h2 className="text-4xl font-black text-white mb-6">
              <Sparkles className="inline-block mr-2 text-esla-primary w-8 h-8 align-[-2px]" /> Werden auch Sie Teil unseres Erfolgs
            </h2>
            <p className="text-white/90 text-lg max-w-3xl mx-auto mb-8 leading-relaxed">
              Unterstützen Sie unser junges, ambitioniertes Team und helfen Sie mit, den Schweizer Fussballnachwuchs zu fördern.
              Wir bieten verschiedene Partnerschaftsmodelle – von regionalen Sponsoren bis zu Hauptpartnern mit exklusiver Präsenz auf Trikots und Onlinekanälen.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sponsoren-angebote"
                className="bg-esla-primary hover:bg-esla-accent text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-esla-primary/50"
              >
                Sponsoring-Pakete ansehen
              </Link>
              <Link
                href="/kontakt"
                className="bg-white/10 hover:bg-white/20 backdrop-blur text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 border-2 border-white/30"
              >
                Jetzt Kontakt aufnehmen
              </Link>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

