import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">IMPRESSUM</h1>
            <p className="text-white/90 text-xl">Team Elitesoccer (ESLA)</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h2 className="text-2xl font-black text-esla-secondary mb-6">Verantwortlich für den Inhalt</h2>
              <div className="gap-y-4 text-esla-secondary/90">
                <p className="mb-2 text-esla-secondary font-semibold">Team Elitesoccer</p>
                <p className="flex items-start gap-x-3"><MapPin size={18} className="mt-1 text-esla-primary" /> <span>Sportplatz RUAG<br />Luzern, Schweiz</span></p>
                <p className="flex items-center gap-x-3 mt-2"><Mail size={18} className="text-esla-primary" /> <a href="mailto:info@teamelitesoccer.ch" className="hover:text-esla-primary">info@teamelitesoccer.ch</a></p>
                <p className="flex items-center gap-x-3 mt-1"><Phone size={18} className="text-esla-primary" /> <a href="tel:+41786450755" className="hover:text-esla-primary">+41 78 645 07 55</a></p>
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h2 className="text-2xl font-black text-esla-secondary mb-6">Haftungsausschluss</h2>
              <p className="text-esla-secondary/80">
                Alle Inhalte wurden mit grösster Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität
                der Inhalte können wir jedoch keine Gewähr übernehmen. Haftungsansprüche werden ausgeschlossen.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h2 className="text-2xl font-black text-esla-secondary mb-6">Urheberrechte</h2>
              <p className="text-esla-secondary/80">
                Die Inhalte und Werke auf dieser Website unterliegen dem Urheberrecht. Jede Verwertung ausserhalb der
                Grenzen des Urheberrechts bedarf der schriftlichen Zustimmung der Rechteinhaber.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200">
              <h2 className="text-2xl font-black text-esla-secondary mb-6 flex items-center gap-x-2"><Shield size={20} className="text-esla-primary" /> Datenschutz</h2>
              <p className="text-esla-secondary/80">
                Hinweise zum Schutz Ihrer Daten finden Sie in unserer Datenschutzerklärung.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}









