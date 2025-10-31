import type { Match } from '@/types';
import { computedStatus, isEslaTeamName, calendarInfo, displayTeamName, matchesTeamName, timeUntilMatch, isHomeLocation } from '@/lib/match';
import LiveMini from '@/components/matches/LiveMini';
import JoinButton from '@/components/matches/JoinButton';
import MatchTeamNames from '@/components/matches/MatchTeamNames';

export default function MatchCard({ match, fullWidth = false }: { match: Match; fullWidth?: boolean }) {
  const status = computedStatus(match);
  const cal = calendarInfo(match);
  const homeAwayLabel = (() => {
    if (match.location) {
      return isHomeLocation(match.location) ? 'Heimspiel' : 'Auswärtsspiel';
    }
    const eslaHome = isEslaTeamName(match.homeTeam);
    const eslaAway = isEslaTeamName(match.awayTeam);
    if (eslaHome && !eslaAway) return 'Heimspiel';
    if (eslaAway && !eslaHome) return 'Auswärtsspiel';
    return undefined;
  })();

  return (
    <div className="bg-black backdrop-blur-md rounded-2xl p-4 md:p-6 border border-white/10 transition-all duration-300">
      <div className={`${fullWidth ? 'w-full' : 'max-w-[1024px] mx-auto'}`}>
        <div className="grid gap-4 md:gap-5">
          {/* Teams row (top) */}
          {(() => {
            const home = displayTeamName(match.homeTeam);
            const away = displayTeamName(match.awayTeam);
            const lengthWithoutSpaces = (s: string) => s.replace(/\u00A0/g, ' ').replace(/\s+/g, '').length;
            const hasLongName = lengthWithoutSpaces(home) >= 20 || lengthWithoutSpaces(away) >= 20;
            const hasScore = typeof match.homeScore === 'number' && typeof match.awayScore === 'number';

            const scoreBox = (
              <div className="bg-white/10 border border-white/20 rounded-2xl px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 text-center shadow-md">
                <div className="font-black text-white leading-none text-[clamp(20px,4.2vw,36px)] sm:text-[clamp(24px,3.6vw,40px)] md:text-[clamp(28px,3vw,44px)]">
                  {hasScore ? (
                    <>
                      <span className="text-white">{match.homeScore}</span>
                      <span className="text-white/50 mx-2">:</span>
                      <span className="text-white">{match.awayScore}</span>
                    </>
                  ) : (
                    <span className="text-white">VS.</span>
                  )}
                </div>
              </div>
            );

            if (hasLongName) {
              return (
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="text-left">
                      <span className="block font-black text-white leading-tight whitespace-normal text-[clamp(22px,4.5vw,40px)] md:text-[clamp(28px,3vw,44px)]">
                        {home}
                      </span>
                    </div>
                    <div className="text-left">
                      <span className="block font-black text-white leading-tight whitespace-normal text-[clamp(22px,4.5vw,40px)] md:text-[clamp(28px,3vw,44px)]">
                        {away}
                      </span>
                    </div>
                  </div>
                  <div className="self-start md:self-center">
                    {scoreBox}
                  </div>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-4 md:gap-8">
                <MatchTeamNames
                  homeTeam={home}
                  awayTeam={away}
                  minPx={14}
                  maxPx={60}
                />
                <div className="justify-self-center col-start-2">
                  {scoreBox}
                </div>
              </div>
            );
          })()}

          {/* Meta */}
          {/* Status + Join */}
          <div className="flex flex-wrap items-start justify-between gap-2 md:gap-3">
            <div className="flex flex-col gap-y-1 text-white/70 text-sm">
              <div>
                {new Date(`${match.date}T${match.time || '00:00'}:00`).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
                {match.time ? ` | ${match.time}` : ''}
              </div>
              {homeAwayLabel === 'Auswärtsspiel' && match.location && (
                <div className="flex items-center gap-2 text-white/60">
                  <span>{match.location}</span>
                  <span className="bg-white/10 border border-white/15 text-white/85 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide">
                    {homeAwayLabel}
                  </span>
                </div>
              )}
              {(!match.location || homeAwayLabel === 'Heimspiel') && homeAwayLabel && (
                <span className="self-start bg-white/10 border border-white/15 text-white/85 px-3 py-1 rounded-full text-xs sm:text-sm font-semibold uppercase tracking-wide">
                  {homeAwayLabel}
                </span>
              )}
              {match.competition && !/zugeordnet/i.test(match.competition) && (
                <div className="text-esla-accent font-semibold">{match.competition}</div>
              )}
            </div>
            <div className="flex items-center gap-3">
              {(() => {
                if (status === 'upcoming') {
                  const eta = timeUntilMatch(match);
                  const formattedEta = eta ? eta.charAt(0).toUpperCase() + eta.slice(1) : 'Bald';
                  return (
                    <span className="text-xs sm:text-sm font-semibold text-white/80 bg-white/10 border border-white/15 px-3 py-1 rounded-full">
                      {formattedEta}
                    </span>
                  );
                }
                if (status === 'live') return <LiveMini startIso={cal.start} />;
                const hasScore = typeof match.homeScore === 'number' && typeof match.awayScore === 'number';
                if (!hasScore) {
                  const involvesEslaEa = matchesTeamName(match.homeTeam, 'eslaea') || matchesTeamName(match.awayTeam, 'eslaea');
                  return involvesEslaEa ? null : (
                    <span className="text-xs sm:text-sm font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">RESULTATE FOLGEN</span>
                  );
                }
                const eslaHome = isEslaTeamName(match.homeTeam);
                const eslaAway = isEslaTeamName(match.awayTeam);
                if (eslaHome || eslaAway) {
                  const hs = match.homeScore as number; const as = match.awayScore as number;
                  if (hs === as) return <span className="text-xs sm:text-sm font-bold bg-yellow-500 text-black px-3 py-1 rounded-full">UNENTSCHIEDEN</span>;
                  const eslaWon = (eslaHome && hs > as) || (eslaAway && as > hs);
                  return eslaWon
                    ? <span className="text-xs sm:text-sm font-bold bg-green-600 text-white px-3 py-1 rounded-full">GEWONNEN</span>
                    : <span className="text-xs sm:text-sm font-bold bg-red-600 text-white px-3 py-1 rounded-full">VERLOREN</span>;
                }
                return <span className="text-lg font-bold text-white/80">BEENDET</span>;
              })()}
              {status === 'upcoming' ? (
                <JoinButton matchId={match.id} label="Klick hier wenn du teilnimmst!" calendar={cal} />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
