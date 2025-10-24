import type { Match } from '@/types';
import { computedStatus, isEslaTeamName, calendarInfo } from '@/lib/match';
import JoinButton from '@/components/matches/JoinButton';

export default function MatchCard({ match }: { match: Match }) {
  const status = computedStatus(match);
  const cal = calendarInfo(match);

  return (
    <div className="bg-esla-secondary backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/10 transition-all duration-300">
      <div className="max-w-[1024px] mx-auto">
        <div className="grid gap-5">
          {/* Meta */}
          <div className="flex flex-col gap-y-1 text-white/70 text-sm">
            <div>
              {new Date(`${match.date}T${match.time || '00:00'}:00`).toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' })}
              {match.time ? ` | ${match.time}` : ''}
            </div>
            {match.location && <div>{match.location}</div>}
            {match.competition && !/zugeordnet/i.test(match.competition) && (
              <div className="text-esla-accent font-semibold">{match.competition}</div>
            )}
          </div>

          {/* Teams + Score centered */}
          <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-4 sm:gap-6">
            {/* Home */}
            <div className="min-w-0 md:justify-self-end">
              <div className="flex items-start sm:items-center gap-x-3 justify-end">
                <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug break-words text-right text-white">{match.homeTeam}</span>
              </div>
            </div>
            {/* Score */}
            <div className="justify-self-center">
              <div className="bg-esla-dark/50 rounded-xl px-4 py-2 sm:px-5 sm:py-3 min-w-[88px] sm:min-w-[104px] text-center">
                <div className="text-xl sm:text-2xl md:text-3xl font-black text-white">
                  {typeof match.homeScore === 'number' && typeof match.awayScore === 'number' ? (
                    <>
                      <span className="text-white">{match.homeScore}</span>
                      <span className="text-white/50 mx-2">:</span>
                      <span className="text-white">{match.awayScore}</span>
                    </>
                  ) : (
                    <span className="text-white text-lg sm:text-xl">vs.</span>
                  )}
                </div>
              </div>
            </div>
            {/* Away */}
            <div className="min-w-0">
              <div className="flex items-start sm:items-center gap-x-3">
                <span className="font-semibold text-base sm:text-lg md:text-xl leading-snug break-words text-white">{match.awayTeam}</span>
              </div>
            </div>
          </div>

          {/* Status + Join */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-3 mt-1">
            {(() => {
              if (status === 'upcoming') return <span className="text-lg font-bold text-white/80">ANSTEHEND</span>;
              const hasScore = typeof match.homeScore === 'number' && typeof match.awayScore === 'number';
              if (!hasScore) return <span className="text-xs sm:text-sm font-semibold text-white/80 bg-white/10 px-3 py-1 rounded-full">RESULTATE FOLGEN</span>;
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
              return <span className="text-lg font-bold text-white/80">ABGESCHLOSSEN</span>;
            })()}
            {status === 'upcoming' ? (
              <JoinButton matchId={match.id} label="Klick hier wenn du teilnimmst!" calendar={cal} />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
