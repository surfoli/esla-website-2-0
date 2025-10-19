import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import { MapPin, Car, Navigation } from 'lucide-react';

export default function StandortPage() {
  // Google Maps Plus Code: 38Q6+8C Emmen
  const googleMapsUrl = "https://maps.app.goo.gl/T3jheyDR8a2uM9um7";
  const directionsUrl = "https://www.google.com/maps/dir//38Q6%2B8C+Emmen";
  
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
              UNSER <span className="text-esla-primary">STANDORT</span>
            </h1>
            <p className="text-white/90 text-xl">
              Sportplatz RUAG in Luzern
            </p>
          </div>

          {/* Map Container */}
          <div className="mb-12">
            <div className="bg-white rounded-3xl overflow-hidden border border-slate-200">
              <iframe
                src="https://maps.google.com/maps?q=47.0883125,8.3110625&z=17&t=k&hl=de&output=embed"
                width="100%"
                height="500"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            
            {/* Adresse & Info */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <div className="flex items-center gap-x-3 mb-6">
                <MapPin size={32} className="text-esla-primary" />
                <h2 className="text-3xl font-black text-esla-secondary">ADRESSE</h2>
              </div>
              
              <div className="gap-y-4 mb-6">
                <div>
                  <p className="text-esla-secondary font-bold text-xl mb-1">Sportplatz RUAG</p>
                  <p className="text-esla-secondary/70">Emmen LU</p>
                  <p className="text-esla-secondary/70">Luzern, Schweiz</p>
                </div>
              </div>

              <div className="flex flex-col gap-y-4">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-x-2 bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-semibold transition-all duration-200 transform hover:scale-105"
                >
                  <MapPin size={20} />
                  <span>In Google Maps öffnen</span>
                </a>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-x-2 bg-white text-esla-secondary hover:bg-slate-50 px-6 py-3 rounded-full font-semibold transition-all duration-200 border border-slate-300"
                >
                  <Navigation size={20} />
                  <span>Route planen</span>
                </a>
              </div>
            </div>

            {/* Anfahrt */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h2 className="text-3xl font-black text-esla-secondary mb-6">ANFAHRT</h2>
              
              <div className="flex items-start gap-x-4">
                <div className="bg-esla-primary/20 p-3 rounded-xl flex-shrink-0">
                  <Car size={40} className="text-esla-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-esla-secondary font-black text-2xl md:text-3xl mb-3">Mit dem Auto</h3>
                  <p className="text-esla-secondary/80 text-lg md:text-xl leading-relaxed">
                    Parkplätze direkt beim Sportplatz verfügbar.<br />
                    Von Luzern Zentrum ca. 10 Minuten.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* Facilities Info */}
          <div className="mt-8 bg-gradient-to-br from-esla-primary to-esla-accent rounded-3xl p-8 md:p-12">
            <h3 className="text-3xl font-black text-white mb-6 text-center">
              ANLAGE & AUSSTATTUNG
            </h3>
            <div className="grid md:grid-cols-3 gap-6 text-white">
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-5 rounded-full">
                    <Image
                      src="/images/fussbalfeld_icon.png"
                      alt="Sportplatz"
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
                <h4 className="font-bold mb-2">Moderner Sportplatz</h4>
                <p className="text-white/90 text-sm">Perfekt gepflegter Rasen</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-5 rounded-full">
                    <Image
                      src="/images/spinnden_and_duschen_icon.png"
                      alt="Umkleidekabinen"
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
                <h4 className="font-bold mb-2">Umkleidekabinen</h4>
                <p className="text-white/90 text-sm">Mit Duschen & Spinden</p>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-5 rounded-full">
                    <Image
                      src="/images/floodlight-icon-black.png"
                      alt="Flutlicht"
                      width={56}
                      height={56}
                    />
                  </div>
                </div>
                <h4 className="font-bold mb-2">Flutlicht</h4>
                <p className="text-white/90 text-sm">Training auch abends möglich</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

