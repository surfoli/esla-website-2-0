'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Calendar, MapPin, Trophy, ChevronRight } from 'lucide-react';
import { Match } from '@/types';
import { displayTeamName } from '@/lib/match';
import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import matchesFallback from '@/data/matches-fallback';

// Live-Daten via API
// Siehe: /app/api/matches
// Fällt bei Fehler still auf leere Liste zurück
// (Startseite bleibt dadurch stabil)
 
export default function MatchResults() {
  const localMatches: Match[] = matchesFallback.matches ?? [];
  const [matches, setMatches] = useState<Match[]>(localMatches);
  const [loading, setLoading] = useState(localMatches.length === 0);
  const [teamRecords, setTeamRecords] = useState<{ id: string; name: string; logoUrl?: string }[]>([]);

  useEffect(() => {
    // Update from API asynchronously
    const load = async () => {
      try {
        const res = await fetch('/api/matches', { cache: 'no-store' });
        const data: unknown = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setMatches(data as Match[]);
        }
      } catch (e) {
        console.error('Failed to load matches', e);
      } finally {
        setLoading(false);
      }
    };
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch('/api/teams', { cache: 'no-store' });
        const data: unknown = await res.json();
        if (Array.isArray(data)) {
          setTeamRecords(
            data
              .filter((item): item is { id: string; name: string; logoUrl?: string } =>
                typeof (item as { id?: unknown }).id === 'string' && typeof (item as { name?: unknown }).name === 'string',
              ),
          );
        }
      } catch (e) {
        console.error('Failed to load teams', e);
      }
    };
    loadTeams();
  }, []);

  const logoByTeam = useMemo(() => {
    const map: Record<string, string> = {};
    for (const t of teamRecords) {
      if (t.logoUrl) map[t.name.toLowerCase()] = t.logoUrl;
    }
    return map;
  }, [teamRecords]);
  const [selectedTeam, setSelectedTeam] = useState<string>('all');
  
  const eslaTeams = ['ESLA EA', 'ESLA 7', 'ESLA 9'];
  const teamOptions = ['all', ...eslaTeams];
  
  const filteredMatches = selectedTeam === 'all'
    ? matches
    : matches.filter((m) => m.homeTeam === selectedTeam || m.awayTeam === selectedTeam);

  const getResultColor = (match: Match) => {
    if (match.status !== 'finished') return 'text-gray-500';
    if (match.homeScore! > match.awayScore!) return 'text-green-500';
    if (match.homeScore! < match.awayScore!) return 'text-red-500';
    return 'text-yellow-500';
  };

  const getResultText = (match: Match) => {
    if (match.status !== 'finished') return 'Anstehend';
    if (match.homeScore! > match.awayScore!) return 'SIEG 🎉';
    if (match.homeScore! < match.awayScore!) return 'NIEDERLAGE';
    return 'UNENTSCHIEDEN';
  };

  if (loading) {
    return (
      <Section>
        <Container>
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">LETZTE <span className="text-esla-primary">ERGEBNISSE</span></h2>
            <p className="text-white/70 text-lg">Verfolge alle Spiele und Resultate unserer Teams</p>
          </div>
          <div className="grid gap-8">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-32 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 animate-pulse" />
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
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

          {/* Team Filter */}
          <div className="flex flex-wrap justify-center gap-5 mb-16">
            {teamOptions.map((team) => (
              <button
                key={team}
                onClick={() => setSelectedTeam(team)}
                className={`px-8 py-4 rounded-full font-semibold transition-all duration-200 ${
                  selectedTeam === team
                    ? 'bg-esla-primary text-white shadow-lg shadow-esla-primary/40 scale-105'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 border border-white/10'
                }`}
              >
                {team === 'all' ? 'Alle Teams' : team}
              </button>
            ))}
          </div>

          {/* Matches Grid */}
          <div className="grid gap-8">
            {filteredMatches.map((match, index) => (
              <div
                key={match.id}
                className="bg-white/5 backdrop-blur-md rounded-2xl p-8 md:p-10 border border-white/10 hover:border-esla-primary transition-all duration-300 hover:transform hover:scale-[1.02] animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="max-w-[900px] mx-auto">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
                    {/* Left: Date & Location */}
                    <div className="flex flex-col gap-y-3 min-w-[200px]">
                      <div className="flex items-center gap-x-3 text-white/70">
                        <Calendar size={16} />
                        <span className="text-sm">
                          {new Date(match.date).toLocaleDateString('de-CH', {
                            day: '2-digit',
                            month: '2-digit',
                            year: 'numeric',
                          })} | {match.time}
                        </span>
                      </div>
                      <div className="flex items-center gap-x-3 text-white/70">
                        <MapPin size={16} />
                        <span className="text-sm">{match.location}</span>
                      </div>
                      <div className="flex items-center gap-x-3 text-esla-accent">
                        <Trophy size={16} />
                        <span className="text-sm font-semibold">{match.competition}</span>
                      </div>
                    </div>
                    {/* Center: Score */}
                    <div className="flex-1 flex items-center justify-center">
                      <div className="flex items-center gap-x-8 md:gap-x-10">
                        {/* Home Team */}
                        <div className="flex items-center gap-x-4">
                          {(logoByTeam[match.homeTeam.toLowerCase()] || match.teamLogo) && (
                            <Image
                              src={(logoByTeam[match.homeTeam.toLowerCase()] || match.teamLogo) as string}
                              alt={match.homeTeam}
                              width={50}
                              height={50}
                              className="rounded-lg"
                            />
                          )}
                          <span className="text-white font-bold text-xl">{displayTeamName(match.homeTeam)}</span>
                        </div>
                        {/* Score */}
                        <div className="bg-esla-dark/50 rounded-xl px-8 py-4 min-w-[140px] text-center">
                          <div className="text-3xl font-black text-white">
                            {typeof match.homeScore === 'number' && typeof match.awayScore === 'number' ? (
                              <>
                                <span className={match.homeScore > match.awayScore ? 'text-esla-primary' : ''}>
                                  {match.homeScore}
                                </span>
                                <span className="text-white/50 mx-2">:</span>
                                <span className={match.awayScore > match.homeScore ? 'text-esla-primary' : ''}>
                                  {match.awayScore}
                                </span>
                              </>
                            ) : (
                              <span className="text-white/50">vs</span>
                            )}
                          </div>
                        </div>
                        {/* Away Team */}
                        <div className="flex items-center gap-x-3">
                          <span className="text-white font-bold text-xl">{displayTeamName(match.awayTeam)}</span>
                          {logoByTeam[match.awayTeam.toLowerCase()] && (
                            <Image
                              src={logoByTeam[match.awayTeam.toLowerCase()]}
                              alt={match.awayTeam}
                              width={44}
                              height={44}
                              className="rounded-lg"
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Right: Result */}
                    <div className="flex flex-col items-end gap-y-3 min-w-[150px]">
                      <span className={`text-lg font-bold ${getResultColor(match)}`}>
                        {getResultText(match)}
                      </span>
                      <button className="text-white/70 hover:text-esla-primary transition-colors flex items-center gap-x-2 text-sm px-4 py-2 hover:bg-white/5 rounded-lg">
                        <span>Details</span>
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-16 md:mt-20">
            <a
              href="/spiele"
              className="inline-block bg-esla-primary hover:bg-esla-accent text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg shadow-esla-primary/50"
            >
              Alle Spiele ansehen
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}

