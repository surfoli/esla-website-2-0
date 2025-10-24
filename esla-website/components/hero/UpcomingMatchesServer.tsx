import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Countdown from '@/components/matches/Countdown';
import JoinButton from '@/components/matches/JoinButton';
import { getAllMatches } from '@/lib/kv';
import Image from 'next/image';
import matchesLocal from '@/data/matches.json';
import NowBadge from '@/components/ui/NowBadge';

function toMs(date: string, time?: string) {
  const t = time && time.length >= 4 ? time : '00:00';
  return new Date(`${date}T${t}:00`).getTime();
}

function isEslaTeam(name?: string) {
  if (!name) return false;
  const n = name.replace(/\u00A0/g, ' ');
  return /(?:elitesoccer\s+)?esla\b/i.test(n);
}

function eslaLogoFor(name?: string): string | null {
  if (!name) return null;
  const n = name.replace(/\u00A0/g, ' ').toLowerCase();
  const m = n.match(/(?:elitesoccer\s+)?esla\s*(7|9|ea)\b/);
  if (!m) return null;
  const g = m[1];
  if (g === '7') return '/images/ESLA_7.jpg';
  if (g === '9') return '/images/ESLA_9.jpg';
  if (g === 'ea') return '/images/ESLA_EA.jpg';
  return null;
}

function toIsoString(date: string, time?: string) {
  const hhmm = time && time.length >= 4 ? time : '00:00';
  return `${date}T${hhmm}:00`;
}

function calendarInfo(match: any) {
  const startIso = toIsoString(match.date, match.time);
  return {
    title: `${match.homeTeam} vs. ${match.awayTeam}`,
    start: startIso,
    durationMinutes: 120,
    location: match.location || undefined,
    description: match.competition || undefined,
  };
}

export default async function UpcomingMatchesServer() {
  let matches = await getAllMatches();
  const now = Date.now();
  let upcoming = (matches || [])
    .filter((m: any) => toMs(m.date, m.time) > now)
    .sort((a: any, b: any) => toMs(a.date, a.time) - toMs(b.date, b.time));

  if (upcoming.length === 0) {
    const localAll = ((matchesLocal as any)?.matches || []) as any[];
    upcoming = localAll
      .filter((m: any) => toMs(m.date, m.time) > now)
      .sort((a: any, b: any) => toMs(a.date, a.time) - toMs(b.date, b.time));
  }

  if (upcoming.length === 0) {
    // Fallback-Hero anzeigen, damit der Bereich sichtbar bleibt
    return (
      <Section noContainer className="relative min-h-[70vh] flex items-center justify-center overflow-hidden pb-0 pt-20">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <Image
              src="/images/Fussballfeld_Headerbild.jpg"
              alt="Fussballfeld Hintergrund"
              fill
              sizes="100vw"
              className="object-cover"
              unoptimized
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <Container>
          <div className="relative z-10 max-w-4xl mx-auto text-center py-16">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Anstehende Spiele</h1>
            <p className="text-white/90 mb-8">Derzeit sind keine zukünftigen Spiele im Kalender erfasst.</p>
            <a href="/spiele" className="bg-esla-secondary hover:bg-esla-dark text-white px-6 py-3 rounded-full font-semibold border border-transparent">Alle Spiele ansehen</a>
          </div>
        </Container>
      </Section>
    );
  }

  // Nur Spiele am nächstmöglichen Termin (Datum) anzeigen
  const nearestDate = upcoming[0].date;
  const dayMatches = upcoming.filter((m: any) => m.date === nearestDate)
    .sort((a: any, b: any) => toMs(a.date, a.time) - toMs(b.date, b.time));
  const next = dayMatches[0];
  const sameDay = dayMatches.slice(1, 3);

  const iso = toIsoString(next.date, next.time);
  const nextHomeLogo = null;
  const nextAwayLogo = null;
  const nextCalendar = calendarInfo(next);

  return (
    <Section noContainer className="relative min-h-screen flex items-start justify-center overflow-hidden pb-0 pt-20">
      {/* Hintergrundbild Fussballfeld */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/images/Fussballfeld_Headerbild.jpg"
            alt="Fussballfeld Hintergrund"
            fill
            sizes="100vw"
            className="object-cover"
            unoptimized
            priority
          />
        </div>
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <Container>
        <div className="relative z-10 max-w-6xl mx-auto py-12 md:py-16 w-full">
          {/* Title */}
          <div className="text-left mb-10 md:mb-12">
            <div className="flex items-center justify-start mb-4">
              <NowBadge />
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">Das nächste Spiel</h1>
          </div>

          {/* Großes nächstes Spiel */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-7 md:p-10 border border-white/15 shadow-2xl shadow-black/30 mb-8 w-full">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-items-stretch gap-2 sm:gap-3 md:gap-10 mb-4">
                  <div className="min-w-0 text-center md:text-right">
                    <span className="block font-black text-white leading-tight whitespace-nowrap text-[clamp(12px,3.8vw,30px)] sm:text-[clamp(14px,3vw,32px)] md:text-[clamp(18px,2.4vw,34px)]">{next.homeTeam}</span>
                  </div>
                  <div>
                    <div className="inline-flex items-center justify-center rounded-2xl bg-white/15 border border-white/10 px-3 py-2 text-white/80 font-semibold uppercase tracking-wider text-xs sm:px-4 sm:py-2 sm:text-sm md:px-6 md:py-3 md:text-base">vs.</div>
                  </div>
                  <div className="min-w-0 text-center md:text-left">
                    <span className="block font-black text-white leading-tight whitespace-nowrap text-[clamp(12px,3.8vw,30px)] sm:text-[clamp(14px,3vw,32px)] md:text-[clamp(18px,2.4vw,34px)]">{next.awayTeam}</span>
                  </div>
                </div>
                <div className="text-white/90 text-left mb-2">
                  {new Date(next.date).toLocaleDateString('de-CH', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })}
                  {next.time ? ` | ${next.time}` : ''}
                  {next.location ? ` | ${next.location}` : ''}
                </div>
                {next.competition && !/zugeordnet/i.test(next.competition) && (
                  <div className="text-esla-accent text-left mb-6">
                    <span className="text-sm md:text-base font-semibold">{next.competition}</span>
                  </div>
                )}
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
                  <div className="order-2 md:order-1">
                    <Countdown iso={iso} variant="compact" />
                  </div>
                  <div className="order-1 md:order-2 flex items-center justify-start md:justify-end gap-3 md:gap-5 w-full md:w-auto">
                    <JoinButton matchId={next.id} label="Ich nehme teil" calendar={nextCalendar} />
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>

      {/* Weitere Spiele des gleichen Tages (längliche, flache Boxen, volle Breite) */}
      {sameDay.length > 0 && (
        <div className="relative z-10 w-full">
          <div className="bg-white rounded-t-3xl pt-10 pb-12 shadow-[0_-20px_60px_-20px_rgba(0,0,0,0.25)]">
            <Container>
              <div className="max-w-6xl mx-auto space-y-4">
                {sameDay.map((m) => {
                  const isoM = toIsoString(m.date, m.time);
                  const homeLogo = null;
                  const awayLogo = null;
                  const calendar = calendarInfo(m);
                  return (
                    <div key={m.id} className="bg-black/30 backdrop-blur-xl rounded-2xl px-6 py-5 border border-white/15 w-full">
                      <div className="grid gap-4">
                        {/* Meta */}
                        <div className="flex flex-col gap-y-1 text-white/70 text-sm">
                          <div>
                            {new Date(m.date).toLocaleDateString('de-CH', { weekday: 'short', day: '2-digit', month: '2-digit', year: 'numeric' })}
                            {m.time ? ` | ${m.time}` : ''}
                          </div>
                          {m.location && <div>{m.location}</div>}
                          {m.competition && !/zugeordnet/i.test(m.competition) && (
                            <div className="text-esla-accent font-semibold">{m.competition}</div>
                          )}
                        </div>

                        {/* Teams + Scores */}
                        <div className="flex flex-col gap-2">
                          {(() => {
                            const hasScore = typeof m.homeScore === 'number' && typeof m.awayScore === 'number';
                            const homeScore = hasScore ? String(m.homeScore) : '—';
                            const awayScore = hasScore ? String(m.awayScore) : '—';
                            return (
                              <>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="font-semibold text-base md:text-xl text-white leading-snug break-words">{m.homeTeam}</span>
                                  <span className="font-bold text-base md:text-xl text-white/90 min-w-[28px] text-right">{homeScore}</span>
                                </div>
                                <div className="flex items-center justify-between gap-4">
                                  <span className="font-semibold text-base md:text-xl text-white leading-snug break-words">{m.awayTeam}</span>
                                  <span className="font-bold text-base md:text-xl text-white/90 min-w-[28px] text-right">{awayScore}</span>
                                </div>
                              </>
                            );
                          })()}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-end gap-3">
                          <JoinButton matchId={m.id} label="Klick hier wenn du teilnimmst!" calendar={calendar} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Container>
          </div>
        </div>
      )}
    </Section>
  );
}
