import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';
import { getAllMatches } from '@/lib/kv';
import matchesLocal from '@/data/matches.json';
import type { Match } from '@/types';
import { computedStatus, toMs, hasScore } from '@/lib/match';

function formatDate(date: string, time?: string) {
  const d = new Date(`${date}T${(time && time.length >= 4 ? time : '00:00')}:00`);
  const dd = d.toLocaleDateString('de-CH', { day: '2-digit', month: '2-digit', year: 'numeric' });
  return time && time.length >= 4 ? `${dd} ${time}` : dd;
}

export default async function ResultsTickerBanner() {
  let all = await getAllMatches();
  if (!all || all.length === 0) {
    all = ((matchesLocal as any)?.matches || []) as Match[];
  }

  const results = (all || [])
    .filter((m) => hasScore(m))
    .sort((a, b) => toMs(b) - toMs(a))
    .slice(0, 3);

  const upcoming = (all || [])
    .filter((m) => computedStatus(m) === 'upcoming')
    .sort((a, b) => toMs(a) - toMs(b))
    .slice(0, 3);

  if (results.length === 0 && upcoming.length === 0) return null;

  const items: { key: string; label: string; text: string }[] = [];

  for (const m of results) {
    const hs = (m as any).homeScore as number;
    const as = (m as any).awayScore as number;
    items.push({
      key: `r-${m.id}`,
      label: 'Resultat',
      text: `${m.homeTeam} ${hs}:${as} ${m.awayTeam} — ${formatDate(m.date, m.time)}`,
    });
  }

  for (const m of upcoming) {
    items.push({
      key: `u-${m.id}`,
      label: 'Anstehend',
      text: `${m.homeTeam} vs. ${m.awayTeam} — ${formatDate(m.date, m.time)}`,
    });
  }

  const row = (
    <div className="inline-flex items-center gap-6 md:gap-10 min-w-max pr-6">
      {items.map((it, idx) => (
        <div key={it.key} className="flex items-center gap-3 text-white/90">
          <span className="text-xs font-bold uppercase tracking-wide px-2 py-1 rounded-full bg-white/10 text-white">{it.label}</span>
          <span className="text-sm md:text-base font-semibold whitespace-nowrap">{it.text}</span>
          {idx < items.length - 1 ? <span className="opacity-50 mx-2">•</span> : null}
        </div>
      ))}
    </div>
  );

  return (
    <Section noContainer className="bg-esla-secondary py-0 md:py-0 border-y border-white/10">
      <div className="relative">
        <Container>
          <div className="relative overflow-hidden py-3 md:py-4">
            <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-esla-secondary to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-esla-secondary to-transparent" />
            <div className="esla-ticker">
              <div className="esla-ticker__content">
                {row}
                {row}
              </div>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
