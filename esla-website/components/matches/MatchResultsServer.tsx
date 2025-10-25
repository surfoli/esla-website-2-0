import Image from 'next/image';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import matchesLocal from '@/data/matches.json';
import { getRecentMatches } from '@/lib/kv';
import AutoShrinkText from '@/components/ui/AutoShrinkText';

function isEslaTeam(name?: string) {
  if (!name) return false;
  const n = name.replace(/\u00A0/g, ' ');
  return /(?:elitesoccer\s+)?esla\b/i.test(n);
}

function splitCompetition(text?: string) {
  if (!text) return [] as string[];
  return text
    .split(/\s*-\s*/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export default async function MatchResultsServer() {
  let matches = await getRecentMatches(12);
  if (!Array.isArray(matches) || matches.length === 0) {
    matches = (matchesLocal as any)?.matches ?? [];
  }

  return (
    <Section className="bg-esla-secondary">
      <Container>
        <div className="max-w-[1100px] mx-auto">
          {/* Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              LETZTE <span className="text-esla-primary">ERGEBNISSE</span>
            </h2>
            <p className="text-white/75 text-lg">
              Verfolge alle Spiele und Resultate unserer Teams
            </p>
          </div>

          {/* Matches Grid */}
          <div className="grid gap-4">
            {matches.map((match, index) => {
              return (
                <div
                  key={match.id}
                  className="bg-esla-secondary rounded-2xl px-5 py-4 md:px-6 md:py-5 border border-white/10 hover:border-esla-primary transition-all duration-300 hover:transform hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="max-w-[1024px] mx-auto">
                    <div className="flex flex-col gap-3 sm:gap-2">
                      {/* Row: teams + score (top) */}
                      <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-4 md:gap-8">
                        <div className="min-w-0 text-left">
                          <AutoShrinkText text={match.homeTeam} minPx={12} maxPx={36} className="block font-black text-white leading-tight whitespace-nowrap" />
                        </div>
                        <div className="justify-self-center">
                          <div className="bg-esla-dark/50 rounded-xl px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3 text-center">
                            <div className="font-black text-white leading-none text-[clamp(12px,3.2vw,18px)] sm:text-[clamp(14px,2.6vw,20px)] md:text-[clamp(16px,1.8vw,22px)]">
                              {typeof match.homeScore === 'number' && typeof match.awayScore === 'number' ? (
                                <>
                                  <span className="text-white">{match.homeScore}</span>
                                  <span className="text-white/50 mx-2">:</span>
                                  <span className="text-white">{match.awayScore}</span>
                                </>
                              ) : (
                                <span className="text-white">vs.</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 text-right">
                          <AutoShrinkText text={match.awayTeam} minPx={12} maxPx={36} className="block font-black text-white leading-tight whitespace-nowrap" />
                        </div>
                      </div>

                      {/* Meta + status (below) */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-3 text-[11px] sm:text-xs text-white/70">
                          <span className="font-medium text-white/80">
                            {new Date(match.date).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                            {match.time ? ` · ${match.time}` : ''}
                          </span>
                          {match.location && <span>{match.location}</span>}
                          {(() => {
                            if (!match.competition || /zugeordnet/i.test(match.competition)) return null;
                            const parts = splitCompetition(match.competition);
                            if (!parts.length) return null;
                            return (
                              <span className="text-esla-accent font-semibold flex flex-wrap gap-x-2 gap-y-1">
                                {parts.map((part, idx) => (
                                  <span key={idx} className="whitespace-nowrap">
                                    {part}
                                  </span>
                                ))}
                              </span>
                            );
                          })()}
                        </div>
                        <div className="flex items-center gap-2">
                          {(() => {
                            const hs = typeof match.homeScore === 'number' ? match.homeScore : null;
                            const as = typeof match.awayScore === 'number' ? match.awayScore : null;
                            const finished = match.status === 'finished' || (hs !== null && as !== null);
                            if (!finished) {
                              return <span className="text-xs sm:text-sm font-bold text-white/80">ANSTEHEND</span>;
                            }
                            if (hs === null || as === null) {
                              return <span className="text-xs sm:text-sm font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">RESULTATE FOLGEN</span>;
                            }
                            if (hs === as) {
                              return <span className="text-xs sm:text-sm font-bold bg-yellow-500 text-black px-3 py-1 rounded-full">UNENTSCHIEDEN</span>;
                            }
                            const eslaHome = isEslaTeam(match.homeTeam);
                            const eslaAway = isEslaTeam(match.awayTeam);
                            const eslaWon = (eslaHome && (hs as number) > (as as number)) || (eslaAway && (as as number) > (hs as number));
                            return eslaWon
                              ? <span className="text-xs sm:text-sm font-bold bg-green-600 text-white px-3 py-1 rounded-full">GEWONNEN</span>
                              : <span className="text-xs sm:text-sm font-bold bg-red-600 text-white px-3 py-1 rounded-full">VERLOREN</span>;
                          })()}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16 md:mt-20">
            <a
              href="/spiele"
              className="inline-block bg-esla-secondary hover:bg-esla-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-black/30 border border-transparent"
            >
              Alle Spiele ansehen
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
