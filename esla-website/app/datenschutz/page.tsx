import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';

export default function DatenschutzPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white mb-0">DATENSCHUTZERKLÄRUNG</h1>
          </div>
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">Kurz gesagt</h2>
              <p>Wir schützen Ihre Daten nach Schweizer Recht (DSG) und – falls anwendbar – nach EU‑Recht (DSGVO). Diese Seite erklärt kurz und verständlich, was wir verarbeiten und warum.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">1. Verantwortliche Stelle</h2>
              <p>
                Team Elite Soccer (ESLA)<br />
                Zielimatt 16<br />
                6362 Stansstad<br />
                Schweiz<br />
                E-Mail: <a href="mailto:info@teamelitesoccer.ch" className="underline hover:text-esla-primary">info@teamelitesoccer.ch</a>
              </p>
              <h3 className="text-xl font-bold text-esla-secondary mt-6 mb-3">1a. Datenschutzverantwortlicher</h3>
              <p>Flavio Räber – E-Mail: <a href="mailto:info@teamelitesoccer.ch" className="underline hover:text-esla-primary">info@teamelitesoccer.ch</a></p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">2. Allgemeines</h2>
              <p>Wir verarbeiten nur die Daten, die für Website‑Betrieb, Beantwortung Ihrer Anfragen und Vereinsaufgaben nötig sind.</p>
              <h2 className="text-2xl font-black text-esla-secondary mt-6 mb-4">3. Erhebung und Verarbeitung</h2>
              <ul className="list-disc pl-6">
                <li>Betrieb, Sicherheit und Optimierung der Website</li>
                <li>Beantwortung von Anfragen</li>
                <li>Organisation von Vereinsaktivitäten</li>
              </ul>
              <p className="mt-3"><span className="font-semibold">Rechtsgrundlagen:</span> berechtigtes Interesse, Vertragserfüllung (z.&nbsp;B. Mitgliedschaft) und – wo nötig – Ihre Einwilligung.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">4. Kontakt</h2>
              <p>Es gibt derzeit kein Kontaktformular. Bei E‑Mail/Telefon nutzen wir Ihre Angaben nur zur Bearbeitung der Anfrage. Keine zusätzliche Speicherung auf der Website.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">5. Hosting &amp; Infrastruktur</h2>
              <p>Die Website läuft mit Next.js bei <span className="font-semibold">Vercel</span>. Server können ausserhalb der Schweiz stehen (EU/USA). Datentransfers erfolgen nur mit geeigneten Garantien (z.&nbsp;B. Standardvertragsklauseln).</p>
              <p className="mt-3"><span className="font-semibold">Vercel KV &amp; RSVP:</span> Für anonyme Teilnahmen speichern wir eine pseudonyme Kennung. Keine Klarnamen.</p>
              <h3 className="text-xl font-bold text-esla-secondary mt-6 mb-2">Externe Links &amp; Einbindungen</h3>
              <p>Wir binden u.&nbsp;a. Google Maps ein und verlinken zu Instagram, TikTok, Facebook, LinkedIn sowie Partner‑/Sponsorenseiten. Für deren Inhalte/Datenschutz sind die jeweiligen Anbieter verantwortlich.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">5a. Automatisierte Spiel- &amp; Resultatsdaten</h2>
              <p>
                Daten zu Spielen und Resultaten werden automatisch vom{' '}
                <a
                  href="https://matchcenter.ifv.ch"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-esla-primary"
                >
                  IFV Matchcenter
                </a>{' '}
                aktualisiert. Quelle: © Innerschweizer Fussballverband (IFV). Es handelt sich um öffentlich zugängliche Informationen, die wir ausschliesslich zu
                Informationszwecken für Vereinswebsites anzeigen.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4"><span id="cookies"></span>6. Cookies &amp; Cookie‑Einstellungen</h2>
              <p className="mb-4">Sie können Cookies im Browser verwalten (zulassen, blockieren, löschen). Technisch notwendige Cookies sind für den Betrieb erforderlich; Analyse‑Cookies – falls genutzt – erst nach Einwilligung.</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-esla-secondary font-black mb-2"><span className="font-mono">esla_uid</span></div>
                  <ul className="list-disc pl-5 text-esla-secondary/80 space-y-1">
                    <li>Zweck: anonyme RSVP‑Teilnahme &amp; Rate‑Limits</li>
                    <li>Typ: HttpOnly, technisch notwendig, SameSite=lax</li>
                    <li>Dauer: bis zu 5 Jahre</li>
                  </ul>
                </div>
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                  <div className="text-esla-secondary font-black mb-2"><span className="font-mono">esla_admin</span></div>
                  <ul className="list-disc pl-5 text-esla-secondary/80 space-y-1">
                    <li>Zweck: Login für Admin‑Bereich</li>
                    <li>Typ: Sitzungscookie, technisch notwendig</li>
                    <li>Dauer: bis zum Ende der Sitzung</li>
                  </ul>
                </div>
              </div>
              <p className="mt-3">Keine Werbe‑/Marketing‑Cookies. Analyse‑Cookies nur im Rahmen von Google Analytics (falls aktiv) und – soweit nötig – erst nach Einwilligung.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">7. Server‑Logfiles</h2>
              <p>Beim Aufruf der Website fallen technische Protokolle an (durch Vercel):</p>
              <ul className="list-disc pl-6">
                <li>IP‑Adresse (wenn möglich verkürzt)</li>
                <li>Datum/Uhrzeit, Zeitzone</li>
                <li>aufgerufene Seite, Statuscode, Datenmenge</li>
                <li>Referrer (Herkunftsseite)</li>
                <li>Browser, Betriebssystem, Sprache</li>
              </ul>
              <p className="mt-2">Zweck: technische Bereitstellung, Sicherheit und Stabilität.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">7a. Aufbewahrungsfristen</h2>
              <ul className="list-disc pl-6">
                <li>Kontaktanfragen: bis zu 2 Jahre</li>
                <li>Mitgliederdaten: Dauer der Mitgliedschaft + 5 Jahre</li>
                <li>Server‑Logfiles: max. 12 Monate</li>
                <li>RSVP‑Cookie <span className="font-semibold">esla_uid</span>: bis zu 5 Jahre</li>
                <li>Admin‑Cookie <span className="font-semibold">esla_admin</span>: bis Sitzungsende</li>
                <li>Sonstige Daten: längstens 7 Jahre (falls gesetzlich nötig)</li>
              </ul>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">8. Analyse (Google Analytics 4)</h2>
              <p>Wir nutzen GA4 von Google Ireland, um die Nutzung in aggregierter Form zu messen und die Website zu verbessern. IP‑Adressen werden standardmässig gekürzt (IP‑Anonymisierung). Rechtsgrundlage: berechtigtes Interesse und – soweit nötig – Einwilligung.</p>
              <p className="mt-2">Es kann ein Datentransfer in die USA stattfinden (auf Basis von Standardvertragsklauseln). Infos: <a href="https://policies.google.com/privacy?hl=de" target="_blank" rel="noopener noreferrer" className="underline hover:text-esla-primary">Datenschutz von Google</a> • Opt‑out: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer" className="underline hover:text-esla-primary">Browser‑Add‑on</a>.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">9. Ihre Rechte</h2>
              <ul className="list-disc pl-6">
                <li>Auskunft, Berichtigung, Löschung</li>
                <li>Einschränkung der Verarbeitung</li>
                <li>Datenübertragbarkeit (sofern anwendbar)</li>
                <li>Widerspruch gegen die Verarbeitung</li>
              </ul>
              <p className="mt-2">Kontakt: <a href="mailto:info@teamelitesoccer.ch" className="underline hover:text-esla-primary">info@teamelitesoccer.ch</a>. Aufsicht: EDÖB, Feldeggweg 1, 3003 Bern – <a href="mailto:info@edoeb.admin.ch" className="underline hover:text-esla-primary">info@edoeb.admin.ch</a> – <a href="https://www.edoeb.admin.ch" target="_blank" rel="noopener noreferrer" className="underline hover:text-esla-primary">www.edoeb.admin.ch</a>.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">10. Anpassung dieser Datenschutzerklärung</h2>
              <p>Wir können diese Erklärung anpassen. Es gilt die jeweils aktuelle Version auf dieser Website.</p>
            </div>

            <div className="bg-white rounded-3xl p-8 border border-slate-200 text-esla-secondary/80">
              <h2 className="text-2xl font-black text-esla-secondary mb-4">Begriffe – einfach erklärt</h2>
              <ul className="list-disc pl-6">
                <li><span className="font-semibold">Berechtigtes Interesse:</span> Notwendig, um die Website sicher zu betreiben und unser Angebot zu verbessern.</li>
                <li><span className="font-semibold">Pseudonymisierung:</span> Eine Kennung (z.&nbsp;B. zufällige ID) statt Name/Adresse.</li>
                <li><span className="font-semibold">IP‑Anonymisierung:</span> Ihre IP wird gekürzt, damit kein genauer Personenbezug besteht.</li>
                <li><span className="font-semibold">Standardvertragsklauseln:</span> EU‑Regeln, die den sicheren Datentransfer in Länder ausserhalb der EU/CH absichern.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
