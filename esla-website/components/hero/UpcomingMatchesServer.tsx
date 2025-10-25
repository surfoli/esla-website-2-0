import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import Countdown from '@/components/matches/Countdown';
import JoinButton from '@/components/matches/JoinButton';
import { getAllMatches } from '@/lib/kv';
import Image from 'next/image';
import matchesLocal from '@/data/matches.json';
import NowBadge from '@/components/ui/NowBadge';
import AutoShrinkText from '@/components/ui/AutoShrinkText';
import LiveMini from '@/components/matches/LiveMini';

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

function getSeasonPhase(d: Date): { title: string; subtitle?: string } {
  const m = d.getMonth() + 1; // 1-12
  if (m >= 3 && m <= 6) return { title: 'Frühjahrsrunde', subtitle: 'Pflichtspiele und Meisterschaft' };
  if (m === 7) return { title: 'Sommerpause', subtitle: 'Ferien und Erholung – neue Termine im August' };
  if (m >= 8 && m <= 11) return { title: 'Herbstrunde', subtitle: 'Pflichtspiele und Turniere' };
  return { title: 'Winterpause', subtitle: 'Hallentraining oder Pause' };
}

export default async function UpcomingMatchesServer() {
  let all = await getAllMatches();
  const now = Date.now();
  if (!all || all.length === 0) {
    all = ((matchesLocal as any)?.matches || []) as any[];
  }

  const hasScore = (m: any) => typeof m?.homeScore === 'number' && typeof m?.awayScore === 'number';
  const live = (all || [])
    .filter((m: any) => !hasScore(m))
    .filter((m: any) => {
      const start = toMs(m.date, m.time);
      return now >= start && now < start + 100 * 60 * 1000;
    })
    .sort((a: any, b: any) => toMs(a.date, a.time) - toMs(b.date, b.time));

  const upcoming = (all || [])
    .filter((m: any) => toMs(m.date, m.time) > now)
    .sort((a: any, b: any) => toMs(a.date, a.time) - toMs(b.date, b.time));

  const next = live[0] || upcoming[0];

  if (!next) {
    const phase = getSeasonPhase(new Date());
    const recentEnded = (all || [])
      .filter((m: any) => !hasScore(m))
      .filter((m: any) => {
        const start = toMs(m.date, m.time);
        return now >= start + 100 * 60 * 1000 && (now - start) < (100 * 60 * 1000 + 4 * 60 * 60 * 1000);
      })
      .sort((a: any, b: any) => toMs(b.date, b.time) - toMs(a.date, a.time));
    const title = recentEnded.length > 0 ? 'Match vorbei – Resultate folgen' : (phase.title || 'Bald geht’s weiter');
    const subtitle = recentEnded.length > 0 ? undefined : phase.subtitle;
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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{title}</h1>
            {subtitle ? <p className="text-white/90 mb-8">{subtitle}</p> : null}
            <a href="/spiele" className="bg-esla-secondary hover:bg-esla-dark text-white px-6 py-3 rounded-full font-semibold border border-transparent">Alle Spiele ansehen</a>
          </div>
        </Container>
      </Section>
    );
  }

  const isLive = live.length > 0 && live[0].id === next.id;

  const iso = toIsoString(next.date, next.time);
  const nextHomeLogo = null;
  const nextAwayLogo = null;
  const nextCalendar = calendarInfo(next);

  return (
    <Section noContainer className="relative min-h-screen flex flex-col items-stretch overflow-hidden pb-0 pt-20">
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
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4">{isLive ? 'JETZT LIVE' : 'Countdown zum Anpfiff'}</h1>
          </div>

          {/* Großes nächstes Spiel */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-7 md:p-10 border border-white/15 shadow-2xl shadow-black/30 mb-8 w-full">
            <div className="flex flex-col gap-6">
              <div className="w-full">
                <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center justify-items-stretch gap-3 sm:gap-4 md:gap-8 mb-4">
                  <div className="min-w-0 text-left">
                    <AutoShrinkText text={next.homeTeam} minPx={12} maxPx={46} className="block font-black text-white leading-tight whitespace-nowrap" />
                  </div>
                  <div className="justify-self-center">
                    <div className="inline-flex items-center justify-center rounded-2xl bg-white/15 border border-white/10 px-2.5 py-1.5 sm:px-3.5 sm:py-2 md:px-5 md:py-3 text-white font-black leading-none text-[clamp(12px,3.2vw,18px)] sm:text-[clamp(14px,2.6vw,20px)] md:text-[clamp(16px,1.8vw,22px)]">vs.</div>
                  </div>
                  <div className="min-w-0 text-right">
                    <AutoShrinkText text={next.awayTeam} minPx={12} maxPx={46} className="block font-black text-white leading-tight whitespace-nowrap" />
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
                    {isLive ? <LiveMini startIso={iso} /> : <Countdown iso={iso} variant="compact" />}
                  </div>
                  <div className="order-1 md:order-2 flex items-center justify-start md:justify-end gap-3 md:gap-5 w-full md:w-auto">
                    {!isLive ? <JoinButton matchId={next.id} label="Ich nehme teil" calendar={nextCalendar} /> : null}
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </Container>
    
    </Section>
  );
}
