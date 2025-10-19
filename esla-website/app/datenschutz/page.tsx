import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">DATENSCHUTZERKLÄRUNG</h1>
          </div>

          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
            <div className="gap-y-6 text-white/80">
              <p>
                Der Schutz Ihrer persönlichen Daten ist uns wichtig. Wir verarbeiten personenbezogene Daten nur, soweit dies zur
                Bereitstellung einer funktionsfähigen Website sowie unserer Inhalte und Leistungen erforderlich ist.
              </p>

              <h2 className="text-2xl font-black text-white mt-8 mb-3">Verantwortlicher</h2>
              <p>
                Team Elitesoccer, Sportplatz RUAG, Luzern, Schweiz – info@teamelitesoccer.ch
              </p>

              <h2 className="text-2xl font-black text-white mt-8 mb-3">Erhobene Daten</h2>
              <ul className="list-disc pl-6">
                <li>Server-Logfiles (IP-Adresse, Datum/Uhrzeit, aufgerufene Seiten)</li>
                <li>Kontaktangaben bei Kontaktaufnahme (Name, E-Mail-Adresse, Inhalt)</li>
              </ul>

              <h2 className="text-2xl font-black text-white mt-8 mb-3">Zwecke der Verarbeitung</h2>
              <ul className="list-disc pl-6">
                <li>Betrieb, Sicherheit und Optimierung der Website</li>
                <li>Bearbeitung von Anfragen</li>
              </ul>

              <h2 className="text-2xl font-black text-white mt-8 mb-3">Speicherdauer</h2>
              <p>
                Personenbezogene Daten werden gelöscht, sobald der Zweck der Speicherung entfällt und keine gesetzlichen
                Aufbewahrungspflichten entgegenstehen.
              </p>

              <h2 className="text-2xl font-black text-white mt-8 mb-3">Rechte der betroffenen Personen</h2>
              <ul className="list-disc pl-6">
                <li>Auskunft, Berichtigung, Löschung, Einschränkung</li>
                <li>Widerspruch gegen die Verarbeitung</li>
                <li>Datenübertragbarkeit</li>
              </ul>

              <h2 className="text-2xl font-black text-white mt-8 mb-3">Kontakt</h2>
              <p>
                Für Datenschutzanliegen kontaktieren Sie uns unter info@teamelitesoccer.ch.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}









