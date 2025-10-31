'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';

interface Match {
  id: string;
  date: string;
  time?: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  location?: string;
  competition?: string;
  status: 'upcoming' | 'finished' | 'live';
  matchNumber?: string;
}

type MatchPayload = Omit<Match, 'id'>;

interface TeamRecord {
  id: string;
  name: string;
}

function isMatchRecord(value: unknown): value is Match {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Match>;
  return (
    typeof candidate.id === 'string' &&
    typeof candidate.date === 'string' &&
    typeof candidate.homeTeam === 'string' &&
    typeof candidate.awayTeam === 'string' &&
    ['upcoming', 'finished', 'live'].includes(String(candidate.status))
  );
}

export default function MatchesAdmin() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Match>>({ status: 'upcoming' });
  const [bulkText, setBulkText] = useState('');
  const [purging, setPurging] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [statusType, setStatusType] = useState<'success' | 'error' | null>(null);
  const teamCounts = useMemo(() => {
    const counts: Record<string, number> = { 'ESLA 7': 0, 'ESLA 9': 0, 'ESLA EA': 0 };
    const norm = (s?: string) => {
      const base = (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
      let t = base.replace(/^(?:team\s*)?elitesoccer\s*/i, '');
      if (/esla/i.test(t) || /elitesoccer/i.test(base)) t = t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
      const l = t.toLowerCase();
      if (/\besla\s*7\b|\besla7\b/.test(l)) return 'ESLA 7';
      if (/\besla\s*9\b|\besla9\b/.test(l)) return 'ESLA 9';
      if (/\besla\s*e\s*a\b|\beslaea\b/.test(l)) return 'ESLA EA';
      return null;
    };
    for (const m of matches) {
      const seen = new Set<string>();
      const a = norm(m.homeTeam); if (a && !seen.has(a)) { counts[a] += 1; seen.add(a); }
      const b = norm(m.awayTeam); if (b && !seen.has(b)) { counts[b] += 1; seen.add(b); }
    }
    return counts;
  }, [matches]);

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        const data: unknown = await res.json();
        if (Array.isArray(data)) {
          const mapped = data.filter((t): t is TeamRecord => {
            if (!t || typeof t !== 'object') return false;
            const candidate = t as Partial<TeamRecord>;
            return typeof candidate.id === 'string' && typeof candidate.name === 'string';
          });
          // Teams loaded but not used in current UI
        }
      } catch (fetchTeamsError: unknown) {
        console.error('Failed to load teams', fetchTeamsError);
      }
    };

    loadTeams();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  // -------- Bulk Import --------
  const parseLine = (line: string, yearOverride?: number): MatchPayload | null => {
    // normalize spaces
    const raw = line.trim().replace(/\s+/g, ' ');
    if (!raw) return null;

    // split by '|'
    const parts = raw.split('|').map((p) => p.trim()).filter(Boolean);

    // helpers
    const timeRe = /^\d{1,2}:\d{2}$/;
    const scoreRe = /^(\d{1,2})\s*[:x]\s*(\d{1,2})$/i;
    const vsRe = /(.*?)(?:\s+vs\.?\s+|\s+-\s+)(.*)/i;

    let dateStr = '';
    let timeStr: string | undefined;
    let teamsStr = '';
    let scoreStr: string | undefined;

    if (parts.length >= 3) {
      // Case A: date | teams | score
      // Case B: date | time | teams
      dateStr = parts[0];
      if (timeRe.test(parts[1])) {
        timeStr = parts[1];
        teamsStr = parts[2];
        scoreStr = parts[3];
      } else {
        teamsStr = parts[1];
        scoreStr = parts[2];
      }
    } else if (parts.length === 2) {
      dateStr = parts[0];
      teamsStr = parts[1];
    } else {
      // fallback: try to match "dd.mm TeamA vs TeamB 2:1"
      const m = raw.match(/^(\d{1,2})[.\/-](\d{1,2})(?:[.\/-](\d{2,4}))?\s+(.*)$/);
      if (m) {
        dateStr = `${m[1]}.${m[2]}`;
        teamsStr = m[4];
      } else {
        return null;
      }
    }

    const normalizeTeam = (s: string) => {
      const base = (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
      let t = base.replace(/^(?:team\s*)?elitesoccer\s*/i, '');
      if (/esla/i.test(t) || /elitesoccer/i.test(base)) {
        t = t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
      }
      const l = t.toLowerCase();
      if (/\besla\s*7\b|\besla7\b/.test(l)) return 'ESLA 7';
      if (/\besla\s*9\b|\besla9\b/.test(l)) return 'ESLA 9';
      if (/\besla\s*e\s*a\b|\beslaea\b/.test(l)) return 'ESLA EA';
      if (/elitesoccer/i.test(base)) return t || base;
      return base;
    };

    const vs = teamsStr.match(vsRe);
    if (!vs) return null;
    const homeTeam = normalizeTeam(vs[1].trim());
    const awayTeam = normalizeTeam(vs[2].trim());

    // parse score
    let homeScore: number | null = null;
    let awayScore: number | null = null;
    if (scoreStr) {
      const s = scoreStr.match(scoreRe);
      if (s) {
        homeScore = Number(s[1]);
        awayScore = Number(s[2]);
      }
    }

    // dd.mm -> yyyy-mm-dd
    const dm = dateStr.match(/^(\d{1,2})[.\/-](\d{1,2})(?:[.\/-](\d{2,4}))?$/);
    if (!dm) return null;
    const dd = String(dm[1]).padStart(2, '0');
    const mm = String(dm[2]).padStart(2, '0');
    const yyyy = dm[3];
    let year = yearOverride ?? new Date().getFullYear();
    if (yyyy) {
      year = yyyy.length === 2 ? 2000 + parseInt(yyyy, 10) : parseInt(yyyy, 10);
    }
    const iso = `${year}-${mm}-${dd}`;

    const status: Match['status'] = typeof homeScore === 'number' && typeof awayScore === 'number' ? 'finished' : 'upcoming';
    const match: MatchPayload = {
      date: iso,
      time: timeStr,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      competition: '',
      status,
    };
    return match;
  };

  // Block-Import: erkennt Datumzeilen (tt.mm[.jjjj]) und Spieleblöcke à 7 Zeilen
  // 1) HH:MM
  // 2) Heimteam
  // 3) -
  // 4) Auswärtsteam
  // 5) Wettbewerb (z. B. Meisterschaft ... Gruppe 4)
  // 6) Spielnummer 123456
  // 7) Ort/Platz
  const parseBlocks = (text: string, defaultYear: number) => {
    const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    const res: MatchPayload[] = [];
    const timeRe = /^\d{1,2}:\d{2}$/;
    const dateRe = /^(?:(?:Mo|Di|Mi|Do|Fr|Sa|So|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\s+)?(\d{1,2})[.\/-](\d{1,2})(?:[.\/-](\d{2,4}))?$/;
    const dashRe = /^[-–—]+$/;
    const competitionRe = /(Meisterschaft|Cup|Freundschaftsspiel|Testspiel|Turnier|Zwischenrunde|Liga|Gruppe|Runde|Pokal|Saison|Qualifikation|Stärkeklasse)/i;
    const compAnyRe = competitionRe;
    const matchNumberRe = /^Spielnummer\s*(.+)$/i;
    const dateTimeLineRe = /^(?:(?:Mo|Di|Mi|Do|Fr|Sa|So|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\s+)?\d{1,2}[.\/\-]\d{1,2}(?:[.\/\-]\d{2,4})?\s*\d{1,2}:\d{2}$/;
    const scoreSingleRe = /^(\d{1,2})\s*[:x]\s*(\d{1,2})$/;
    const placeholderRe = /^(?:\*|f|forfait)$/i;
    const combinedTeamsRe = /^(.+?)\s+(?:-|–|—|:|x|vs\.?|v\.?|VS|Vs)\s+(.+)$/i;
    let currentDateISO: string | undefined = undefined;
    let currentCompetition: string | undefined = undefined;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Wettbewerb-Header erkennen und merken (z. B. "Meisterschaft ...", "... Cup ...")
      if (competitionRe.test(line) && !timeRe.test(line) && !dateRe.test(line) && !dateTimeLineRe.test(line)) {
        currentCompetition = line;
        continue;
      }

      // Datum + Zeit auf einer Zeile unterstützen (z. B. "Sa 23.08.202510:00" oder "Sa 23.08.2025 10:00")
      let inlineTime: string | undefined;
      const tInline = line.match(/(\d{1,2}:\d{2})$/);
      if (tInline) {
        inlineTime = tInline[1];
        line = line.replace(/(\d{1,2}:\d{2})$/, '').trim();
      }

      // Datumzeile aktualisiert currentDateISO
      const dm = line.match(dateRe);
      if (dm) {
        const dd = String(parseInt(dm[1], 10)).padStart(2, '0');
        const mm = String(parseInt(dm[2], 10)).padStart(2, '0');
        const yyyy = dm[3];
        let y = defaultYear;
        if (yyyy) y = yyyy.length === 2 ? 2000 + parseInt(yyyy, 10) : parseInt(yyyy, 10);
        currentDateISO = `${y}-${mm}-${dd}`;
        // Wenn Zeit inline vorhanden, direkt mit Block fortfahren
        if (inlineTime) {
          line = inlineTime;
        } else {
          // Kein Zeitwert auf der Datumzeile: versuche Block ohne Zeit
          const line1 = lines[i + 1] || '';
          const dash = lines[i + 2] || '';
          const line3 = lines[i + 3] || '';
          let homeRaw = '';
          let awayRaw = '';
          let kStart = i + 4;
          const mCombined = line1.match(combinedTeamsRe);
          if (mCombined) {
            homeRaw = mCombined[1];
            awayRaw = mCombined[2];
            kStart = i + 2; // teams consumed on line i+1
          } else if (dashRe.test(dash) && line1 && line3) {
            homeRaw = line1;
            awayRaw = line3;
            kStart = i + 4;
          }
          if (homeRaw && awayRaw) {
            const normalizeTeamImport = (s: string) => {
              const base = (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
              let t = base.replace(/^(?:team\s*)?elitesoccer\s*/i, '');
              if (/esla/i.test(t) || /elitesoccer/i.test(base)) {
                t = t.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
              }
              const l = t.toLowerCase();
              if (/\besla\s*7\b|\besla7\b/.test(l)) return 'ESLA 7';
              if (/\besla\s*9\b|\besla9\b/.test(l)) return 'ESLA 9';
              if (/\besla\s*e\s*a\b|\beslaea\b/.test(l)) return 'ESLA EA';
              if (/elitesoccer/i.test(base)) return t || base;
              return base;
            };

            const home = normalizeTeamImport(homeRaw);
            const away = normalizeTeamImport(awayRaw);

            let k = kStart;
            let homeScore: number | null = null;
            let awayScore: number | null = null;
            let matchNumber: string | undefined;

            const s1 = lines[k] || '';
            if (s1 && scoreSingleRe.test(s1)) {
              const m1 = s1.match(scoreSingleRe)!;
              homeScore = Number(m1[1]);
              awayScore = Number(m1[2]);
              k += 1;
            } else if (s1 && /^\*\s*[:x]\s*\*$/.test(s1)) {
              // Platzhalter-Score auf einer Zeile: "* : *" → keine Scores, nur konsumieren
              k += 1;
            } else {
              const a = lines[k] || '';
              const b = lines[k + 1] || '';
              const c = lines[k + 2] || '';
              if (/^\d{1,2}$/.test(a) && /^[:x-]$/.test(b.trim()) && /^\d{1,2}$/.test(c)) {
                homeScore = Number(a);
                awayScore = Number(c);
                k += 3;
              } else if (/^\*+$/.test(a.trim()) && /^[:x-]$/.test(b.trim()) && /^\*+$/.test(c.trim())) {
                // Platzhalter-Score über drei Zeilen: "*" ":" "*"
                k += 3;
              }
            }

            // Forfait-Zeilen optional konsumieren
            while (k < lines.length) {
              const look = (lines[k] || '').trim();
              if (placeholderRe.test(look)) { k += 1; continue; }
              break;
            }

            // Wettbewerb übernehmen, wenn vorhanden (oder Header)
            let competition = '';
            while (k < lines.length) {
              const look = (lines[k] || '').trim();
              if (!look) { k += 1; continue; }
              const matchMatchNumber = look.match(matchNumberRe);
              if (matchMatchNumber) { matchNumber = matchMatchNumber[1].trim(); k += 1; continue; }
              if (competitionRe.test(look) && !timeRe.test(look) && !dateRe.test(look) && !dateTimeLineRe.test(look)) {
                competition = look;
                k += 1;
                continue;
              }
              if (dashRe.test(look)) { k += 1; continue; }
              break;
            }
            if (!competition && currentCompetition) competition = currentCompetition;

            // "Spielnummer …" und Trennstriche überspringen
            while (k < lines.length) {
              const look = (lines[k] || '').trim();
              if (!look) { k += 1; continue; }
              const matchMatchNumber = look.match(matchNumberRe);
              if (matchMatchNumber) { matchNumber = matchMatchNumber[1].trim(); k += 1; continue; }
              if (dashRe.test(look)) { k += 1; continue; }
              break;
            }

            // Ort/Platz nur übernehmen, wenn keine neue Struktur/Platzhalter beginnt
            let loc = '';
            const next = lines[k] || '';
            if (next && !compAnyRe.test(next) && !dateRe.test(next) && !timeRe.test(next) && !dateTimeLineRe.test(next) && !placeholderRe.test((next || '').trim())) {
              loc = next;
              k += 1;
            }

            const dateISO = currentDateISO || undefined;
            if (dateISO) {
              const status: Match['status'] = typeof homeScore === 'number' && typeof awayScore === 'number' ? 'finished' : 'upcoming';
              const entry: MatchPayload = {
                date: dateISO,
                time: undefined,
                homeTeam: home,
                awayTeam: away,
                competition: competition || undefined,
                location: loc || undefined,
                homeScore,
                awayScore,
                status,
                matchNumber: matchNumber?.split(/\s*\/\s*/)[0] || undefined,
              };
              res.push(entry);
              i = k - 1;
              continue;
            } else {
              continue;
            }
          } else {
            // kein Spielblock, nächste Zeile
            continue;
          }
        }
      }

      // Spiel-Block
      if (!timeRe.test(line)) continue;
      const t = line;
      const homeRaw = lines[i + 1] || '';
      const dash = lines[i + 2] || '';
      const awayRaw = lines[i + 3] || '';
      if (!dashRe.test(dash) || !homeRaw || !awayRaw) continue;

      const normalizeTeamImport = (s: string) => {
        const base = (s || '').replace(/\u00a0/g, ' ').replace(/\s+/g, ' ').trim();
        let tName = base.replace(/^(?:team\s*)?elitesoccer\s*/i, '');
        if (/esla/i.test(tName) || /elitesoccer/i.test(base)) {
          tName = tName.replace(/\s*\(.*?\)\s*/g, ' ').replace(/\s+/g, ' ').trim();
        }
        const l = tName.toLowerCase();
        if (/\besla\s*7\b|\besla7\b/.test(l)) return 'ESLA 7';
        if (/\besla\s*9\b|\besla9\b/.test(l)) return 'ESLA 9';
        if (/\besla\s*e\s*a\b|\beslaea\b/.test(l)) return 'ESLA EA';
        if (/elitesoccer/i.test(base)) return tName || base;
        return base;
      };

      const home = normalizeTeamImport(homeRaw);
      const away = normalizeTeamImport(awayRaw);

      let k = i + 4;
      let homeScore: number | null = null;
      let awayScore: number | null = null;
      let matchNumber: string | undefined;

      // Ergebnis auf einer Zeile
      const s1 = lines[k] || '';
      if (s1 && scoreSingleRe.test(s1)) {
        const m1 = s1.match(scoreSingleRe)!;
        homeScore = Number(m1[1]);
        awayScore = Number(m1[2]);
        k += 1;
      } else {
        // Ergebnis über drei Zeilen: Ziffer | ':' | Ziffer
        const a = lines[k] || '';
        const b = lines[k + 1] || '';
        const c = lines[k + 2] || '';
        if (/^\d{1,2}$/.test(a) && /^[:x-]$/.test(b.trim()) && /^\d{1,2}$/.test(c)) {
          homeScore = Number(a);
          awayScore = Number(c);
          k += 3;
        }
      }

      // Wettbewerb übernehmen, wenn vorhanden (mit heuristischer Erkennung)
      let competition = '';
      while (k < lines.length) {
        const look = (lines[k] || '').trim();
        if (!look) { k += 1; continue; }
        const matchMatchNumber = look.match(matchNumberRe);
        if (matchMatchNumber) { matchNumber = matchMatchNumber[1].trim(); k += 1; continue; }
        if (competitionRe.test(look) && !timeRe.test(look) && !dateRe.test(look) && !dateTimeLineRe.test(look)) {
          competition = look;
          k += 1;
          continue;
        }
        if (dashRe.test(look)) { k += 1; continue; }
        break;
      }
      if (!competition && currentCompetition) {
        competition = currentCompetition;
      }

      // Ort/Platz nur übernehmen, wenn es keine neue Datum-/Zeit-/Header-Zeile ist
      let loc = '';
      const next = lines[k] || '';
      if (next && !compAnyRe.test(next) && !dateRe.test(next) && !timeRe.test(next) && !dateTimeLineRe.test(next) && !placeholderRe.test((next || '').trim())) {
        loc = next;
        k += 1; // Ortszeile konsumieren
      }

      // Datum bestimmen: currentDateISO muss gesetzt sein, sonst überspringen
      const dateISO = currentDateISO || undefined;
      if (!dateISO) { i += 1; continue; }

      const status: Match['status'] = typeof homeScore === 'number' && typeof awayScore === 'number' ? 'finished' : 'upcoming';
      const entry: MatchPayload = {
        date: dateISO,
        time: t,
        homeTeam: home,
        awayTeam: away,
        competition: competition || undefined,
        location: loc || undefined,
        homeScore,
        awayScore,
        status,
        matchNumber: matchNumber?.split(/\s*\/\s*/)[0] || undefined,
      };
      res.push(entry);
      i = k - 1; // an das Ende des Blocks springen (for-Schleife erhöht i anschließend)
    }
    return res;
  };

  const importBulk = async () => {
    const lines = bulkText.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    // defaultYear aus Text extrahieren (erste Datumzeile mit Jahr), sonst aktuelles Jahr
    const mYear = bulkText.match(/\b\d{1,2}[.\/-]\d{1,2}[.\/-](\d{2,4})\b/);
    const defaultYear = mYear ? (mYear[1].length === 2 ? 2000 + parseInt(mYear[1], 10) : parseInt(mYear[1], 10)) : new Date().getFullYear();
    // Zuerst Block-Parser (unterstützt Datumzeilen)
    let parsed: MatchPayload[] = parseBlocks(bulkText, defaultYear);
    // Fallback: Einzeilen-Parser (nutzt defaultYear)
    if (parsed.length === 0) {
      const fallbackMatches = lines.map((l) => parseLine(l, defaultYear)).filter((item): item is MatchPayload => item !== null);
      parsed = fallbackMatches;
    }
    try {
      const res = await fetch('/api/matches/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matches: parsed, text: bulkText }),
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = `Fehler: ${json?.error || 'Unbekannter Fehler beim Import'}`;
        setStatusMsg(msg);
        setStatusType('error');
        return;
      }
      const added = Number(json?.added || 0);
      const updated = Number(json?.updated || 0);
      const skipped = Number(json?.skipped || 0);
      const total = Number(json?.total || 0);
      const msg = `Import erfolgreich: ${added} neue Spiele, ${updated} aktualisiert, ${skipped} bereits vorhanden, Gesamtbestand ${total}`;
      setStatusMsg(msg);
      setStatusType('success');
      setBulkText('');
      setShowAddForm(false);
      await fetchMatches();
    } catch (error) {
      const msg = `Fehler: Import fehlgeschlagen`;
      setStatusMsg(msg);
      setStatusType('error');
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/matches?source=kv');
      const json: unknown = await res.json();
      if (Array.isArray(json)) {
        const parsed = json.filter((item): item is Match => isMatchRecord(item));
        setMatches(parsed);
      } else {
        setMatches([]);
      }
    } catch (fetchMatchesError: unknown) {
      console.error('Fetch matches failed', fetchMatchesError);
      setMatches([]);
    } finally {
      setLoading(false);
    }
  };

  const seedKV = async () => {
    try {
      const res = await fetch('/api/matches/seed', {
        method: 'POST',
      });
      const json = await res.json();
      if (!res.ok) {
        const msg = `Fehler: ${json?.error || 'Unbekannter Fehler beim Datei-Import'}`;
        setStatusMsg(msg);
        setStatusType('error');
        return;
      }
      const msg = `Import aus Datei abgeschlossen: ${json.count} Spiele übernommen`;
      setStatusMsg(msg);
      setStatusType('success');
      await fetchMatches();
    } catch (seedKvError: unknown) {
      console.error('Seed KV request failed', seedKvError);
      setStatusMsg('Fehler: Datei-Import fehlgeschlagen');
      setStatusType('error');
    }
  };

  const purgeAll = async () => {
    const pwd = prompt('Admin-Passwort eingeben, um ALLE Spiele zu löschen:');
    if (!pwd) return;
    setPurging(true);
    try {
      const res = await fetch('/api/matches/purge', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password: pwd }) });
      const json = await res.json();
      if (!res.ok) {
        const msg = `Fehler: ${json?.error || 'Unbekannter Fehler beim Löschen'}`;
        setStatusMsg(msg);
        setStatusType('error');
      } else {
        const msg = `Alle Spiele gelöscht: ${json.deleted}`;
        setStatusMsg(msg);
        setStatusType('success');
        await fetchMatches();
      }
    } catch (purgeError: unknown) {
      console.error('Purge request failed', purgeError);
      setStatusMsg('Fehler: Löschen fehlgeschlagen');
      setStatusType('error');
    } finally {
      setPurging(false);
    }
  };

  const handleCreate = async () => {
    try {
      const res = await fetch('/api/matches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        alert('Speichern fehlgeschlagen');
        return;
      }
      setShowAddForm(false);
      setFormData({ status: 'upcoming' });
      await fetchMatches();
    } catch (createMatchError: unknown) {
      console.error('Failed to create match', createMatchError);
    }
  };

  const startEdit = (match: Match) => {
    setEditingId(match.id);
    setFormData(match);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ status: 'upcoming' });
  };

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`/api/matches/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        alert('Aktualisierung fehlgeschlagen');
        return;
      }
      setEditingId(null);
      setFormData({ status: 'upcoming' });
      await fetchMatches();
    } catch (updateMatchError: unknown) {
      console.error('Failed to update match', updateMatchError);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Spiel löschen?')) return;
    try {
      const res = await fetch(`/api/matches/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Löschen fehlgeschlagen');
        return;
      }
      await fetchMatches();
    } catch (deleteMatchError: unknown) {
      console.error('Failed to delete match', deleteMatchError);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-esla-dark flex items-center justify-center text-white">Laden...</div>;
  }

  return (
  <>
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-4xl font-black text-white">SPIELE VERWALTUNG</h1>
      <div className="flex items-center gap-3">
        <button onClick={() => setShowAddForm(true)} className="bg-esla-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
          <Plus size={20} />
          Neues Spiel
        </button>
        <button onClick={purgeAll} disabled={purging} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-60">
          <Trash2 size={18} />
          Alle Spiele löschen
        </button>
        <button onClick={logout} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full font-semibold">Logout</button>
      </div>
    </div>

    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6 text-white/90">
      {statusMsg && (
        <div className={`${statusType === 'error' ? 'bg-red-500/20 border-red-500/40' : 'bg-green-600/20 border-green-600/40'} border rounded-xl p-4`}>
          <p className={`text-xs uppercase tracking-wide ${statusType === 'error' ? 'text-red-200/80' : 'text-green-200/80'}`}>Rückmeldung</p>
          <p className={`mt-2 text-sm ${statusType === 'error' ? 'text-red-100' : 'text-green-100'}`}>{statusMsg}</p>
        </div>
      )}
      <div className="bg-white/10 border border-white/20 rounded-xl p-4">
        <p className="text-xs uppercase tracking-wide text-white/60">Spiele je Team</p>
        <p className="mt-2 text-white font-bold">Gesamt: {matches.length}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white font-bold">ESLA 7: {teamCounts['ESLA 7'] || 0}</span>
          <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white font-bold">ESLA 9: {teamCounts['ESLA 9'] || 0}</span>
          <span className="px-2 py-1 rounded-full bg-white/10 border border-white/20 text-sm text-white font-bold">ESLA EA: {teamCounts['ESLA EA'] || 0}</span>
        </div>
      </div>
    </div>

    {/* Spiele Import */}
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white border border-white/20 mb-6">
      <h2 className="text-2xl font-bold mb-4">Spiele Import</h2>
      <textarea className="w-full min-h-[200px] bg-white/10 border border-white/30 rounded-lg px-4 py-3 mb-3" placeholder="" value={bulkText} onChange={(e)=>setBulkText(e.target.value)} />
      <div className="flex gap-3">
        <button onClick={importBulk} className="bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-lg font-semibold">Import starten</button>
      </div>
    </div>

    {/* removed duplicate plain message below; consolidated into status card */}

    {showAddForm && (
      <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white border border-white/20 mb-6">
        <h2 className="text-2xl font-bold mb-4">Neues Spiel</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Datum" type="date" value={formData.date || ''} onChange={(e)=>setFormData({ ...formData, date: e.target.value })} />
          <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Zeit" type="time" value={formData.time || ''} onChange={(e)=>setFormData({ ...formData, time: e.target.value })} />
          <input list="teams-list" className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Heim-Team" value={formData.homeTeam || ''} onChange={(e)=>setFormData({ ...formData, homeTeam: e.target.value })} />
          <input list="teams-list" className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Auswärts-Team" value={formData.awayTeam || ''} onChange={(e)=>setFormData({ ...formData, awayTeam: e.target.value })} />
          <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Ort" value={formData.location || ''} onChange={(e)=>setFormData({ ...formData, location: e.target.value })} />
          <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Wettbewerb" value={formData.competition || ''} onChange={(e)=>setFormData({ ...formData, competition: e.target.value })} />
          <select className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.status || 'upcoming'} onChange={(e)=>setFormData({ ...formData, status: e.target.value as 'upcoming'|'finished' })}>
            <option value="upcoming">Anstehend</option>
            <option value="finished">Abgeschlossen</option>
          </select>
        </div>
        <datalist id="teams-list">
          <option value="ESLA 7" />
          <option value="ESLA 9" />
          <option value="ESLA EA" />
        </datalist>
        <div className="flex gap-3 mt-4">
          <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><Save size={18}/>Speichern</button>
          <button onClick={()=>{setShowAddForm(false); setFormData({ status: 'upcoming' });}} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><X size={18}/>Abbrechen</button>
        </div>
      </div>
    )}

    <div className="space-y-4">
      {matches.map((match) => (
        <div key={match.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white border border-white/20">
          {editingId === match.id ? (
            <div>
              <h3 className="text-xl font-bold mb-4">Spiel bearbeiten</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" type="date" value={formData.date || ''} onChange={(e)=>setFormData({ ...formData, date: e.target.value })} />
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" type="time" value={formData.time || ''} onChange={(e)=>setFormData({ ...formData, time: e.target.value })} />
                <input list="teams-list" className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.homeTeam || ''} onChange={(e)=>setFormData({ ...formData, homeTeam: e.target.value })} />
                <input list="teams-list" className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.awayTeam || ''} onChange={(e)=>setFormData({ ...formData, awayTeam: e.target.value })} />
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.location || ''} onChange={(e)=>setFormData({ ...formData, location: e.target.value })} />
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.competition || ''} onChange={(e)=>setFormData({ ...formData, competition: e.target.value })} />
                <div className="grid grid-cols-2 gap-3">
                  <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" type="number" placeholder="Heim-Tore" value={formData.homeScore ?? ''} onChange={(e)=>setFormData({ ...formData, homeScore: e.target.value === '' ? null : Number(e.target.value) })} />
                  <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" type="number" placeholder="Auswärts-Tore" value={formData.awayScore ?? ''} onChange={(e)=>setFormData({ ...formData, awayScore: e.target.value === '' ? null : Number(e.target.value) })} />
                </div>
                <select className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.status || 'upcoming'} onChange={(e)=>setFormData({ ...formData, status: e.target.value as 'upcoming'|'finished' })}>
                  <option value="upcoming">Anstehend</option>
                  <option value="finished">Abgeschlossen</option>
                </select>
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={()=>handleUpdate(match.id)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><Save size={18}/>Speichern</button>
                <button onClick={cancelEdit} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><X size={18}/>Abbrechen</button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{match.homeTeam} vs {match.awayTeam}</h3>
                <p className="text-white/60 text-sm lowercase">{[match.date, match.time, match.location].filter(Boolean).join(' | ')}</p>
                {typeof match.homeScore === 'number' && typeof match.awayScore === 'number' ? (
                  <p className="text-white/60 text-sm lowercase">resultat: {match.homeScore}:{match.awayScore}</p>
                ) : null}
                <p className="text-esla-primary font-semibold">{match.competition}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>startEdit(match)} className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg transition"><Edit size={18} /></button>
                <button onClick={() => handleDelete(match.id)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg transition"><Trash2 size={18} /></button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </>
  );
}
