import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import Image from 'next/image';
import { Clock, MapPin, Calendar } from 'lucide-react';

const trainingSessions = [
  {
    team: 'ESLA 9',
    logo: '/images/ESLA_9.jpg',
    sessions: [
      { day: 'Mittwoch', time: '18:00 - 19:30', location: 'Sportplatz RUAG, Emmen' },
      { day: 'Freitag', time: '18:00 - 19:30', location: 'Sportplatz RUAG, Emmen' },
    ],
  },
  {
    team: 'ESLA 7',
    logo: '/images/ESLA_7.jpg',
    sessions: [
      { day: 'Mittwoch', time: '18:00 - 19:30', location: 'Sportplatz RUAG, Emmen' },
      { day: 'Freitag', time: '18:00 - 19:30', location: 'Sportplatz RUAG, Emmen' },
    ],
  },
  {
    team: 'ESLA EA',
    logo: '/images/ESLA_EA.jpg',
    sessions: [
      { day: 'Mittwoch', time: '18:00 - 19:30', location: 'Sportplatz RUAG, Emmen' },
      { day: 'Freitag', time: '18:00 - 19:30', location: 'Sportplatz RUAG, Emmen' },
    ],
  },
];

export default function TrainingsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />
      
      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="text-center mb-16 bg-esla-secondary text-white p-6 md:p-10 rounded-3xl overflow-hidden">
            <h1 className="text-4xl sm:text-5xl md:text-7xl leading-tight break-words font-black text-white mb-4">
              TRAININGS{' '}<span className="text-esla-primary">ZEITEN</span>
            </h1>
            <p className="text-white/90 text-lg sm:text-xl">
              Wann und wo wir trainieren
            </p>
          </div>

          {/* Training Cards */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {trainingSessions.map((team, index) => (
              <div
                key={team.team}
                className="rounded-3xl transition-all duration-300 transform hover:scale-105 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="rounded-3xl p-8 shadow-lg bg-gradient-to-br from-esla-primary to-esla-accent text-white">
                  {/* Team Logo & Name */}
                  <div className="flex items-center gap-x-4 mb-6">
                    <Image
                      src={team.logo}
                      alt={team.team}
                      width={60}
                      height={60}
                      className="rounded-lg"
                    />
                    <h2 className="text-2xl font-black text-white">
                      {team.team}
                    </h2>
                  </div>

                  {/* Sessions */}
                  <div className="gap-y-4">
                    {team.sessions.map((session, idx) => (
                      <div
                        key={idx}
                        className="rounded-xl p-4 border border-white/10 bg-esla-secondary text-white hover:border-esla-primary/40 transition-colors shadow-sm"
                      >
                        <div className="flex items-center gap-x-2 mb-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                            <Calendar size={14} />
                          </span>
                          <span className="text-esla-primary font-bold">{session.day}</span>
                        </div>
                        <div className="flex items-center gap-x-2 mb-2">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                            <Clock size={14} />
                          </span>
                          <span className="text-white font-semibold">{session.time}</span>
                        </div>
                        <div className="flex items-center gap-x-2 text-white/80 text-sm">
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-white/10 text-white">
                            <MapPin size={12} />
                          </span>
                          <span>{session.location}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Info Box */}
          <div className="bg-gradient-to-br from-esla-primary to-esla-accent rounded-3xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-black text-white mb-4">
                  Trainingsort
                </h3>
                <p className="text-white text-lg mb-4">
                  <strong>Sportplatz RUAG</strong><br />
                  Luzern, Schweiz
                </p>
                <p className="text-white/90">
                  Alle Trainings finden auf dem modernen Sportplatz RUAG statt. 
                  Bestens ausgestattet für optimales Training!
                </p>
              </div>
              <div className="bg-esla-secondary text-white rounded-2xl p-6 border border-white/15">
                <h4 className="text-white font-bold text-xl mb-4">Wichtige Infos</h4>
                <ul className="gap-y-2 text-white/90">
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    Bitte 15 Minuten vor Trainingsbeginn da sein
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    Ausreichend Wasser mitbringen
                  </li>
                  <li className="flex items-start">
                    <span className="text-white mr-2">✓</span>
                    Absagen bitte frühzeitig mitteilen
                  </li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}

