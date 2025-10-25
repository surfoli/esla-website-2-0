'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Database, Save, X } from 'lucide-react';

interface Match {
  id: string;
  date: string;
  time: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number | null;
  awayScore: number | null;
  location: string;
  competition: string;
  status: 'upcoming' | 'finished';
}

export default function MatchesAdmin() {
  const router = useRouter();
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);
  const [seedInfo, setSeedInfo] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Match>>({ status: 'upcoming' });
  const [bulkText, setBulkText] = useState('');
  const [bulkInfo, setBulkInfo] = useState<string | null>(null);
  const [teamRecords, setTeamRecords] = useState<{ id: string; name: string }[]>([]);
  const [purging, setPurging] = useState(false);
  const [purgeInfo, setPurgeInfo] = useState<string | null>(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch('/api/teams');
        const data = await res.json();
        if (Array.isArray(data)) setTeamRecords(data.map((t: any) => ({ id: t.id, name: t.name })));
      } catch (e) {
        console.error('Failed to load teams', e);
      }
    };

    loadTeams();
  }, []);

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  // -------- Bulk Import --------
  const parseLine = (line: string, yearOverride?: number) => {
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

    // parse teams
    const vs = teamsStr.match(vsRe);
    if (!vs) return null;
    const homeTeam = vs[1].trim();
    const awayTeam = vs[2].trim();

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
    let yyyy = dm[3];
    let year = yearOverride ?? new Date().getFullYear();
    if (yyyy) {
      year = yyyy.length === 2 ? 2000 + parseInt(yyyy, 10) : parseInt(yyyy, 10);
    }
    const iso = `${year}-${mm}-${dd}`;

    return {
      date: iso,
      time: timeStr,
      homeTeam,
      awayTeam,
      homeScore,
      awayScore,
      competition: '',
      status: typeof homeScore === 'number' && typeof awayScore === 'number' ? 'finished' : 'upcoming',
    };
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
    const res: any[] = [];
    const timeRe = /^\d{1,2}:\d{2}$/;
    const dateRe = /^(?:(?:Mo|Di|Mi|Do|Fr|Sa|So|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\s+)?(\d{1,2})[.\/-](\d{1,2})(?:[.\/-](\d{2,4}))?$/;
    const dashRe = /^[-–—]+$/;
    const compLeadRe = /^(Meisterschaft|Cup|Freundschaftsspiel|Testspiel|Turnier)/i;
    const compAnyRe = /(Meisterschaft|Cup|Freundschaftsspiel|Testspiel|Turnier)/i;
    const dateTimeLineRe = /^(?:(?:Mo|Di|Mi|Do|Fr|Sa|So|Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag)\s+)?\d{1,2}[.\/-]\d{1,2}(?:[.\/-]\d{2,4})?\s*\d{1,2}:\d{2}$/;
    const scoreSingleRe = /^(\d{1,2})\s*[:x]\s*(\d{1,2})$/;
    let currentDateISO: string | undefined = undefined;
    let currentCompetition: string | undefined = undefined;

    for (let i = 0; i < lines.length; i++) {
      let line = lines[i];

      // Wettbewerb-Header erkennen und merken (z. B. "Meisterschaft ...", "... Cup ...")
      if (compAnyRe.test(line) && !timeRe.test(line) && !dateRe.test(line) && !dateTimeLineRe.test(line)) {
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
        let yyyy = dm[3];
        let y = defaultYear;
        if (yyyy) y = yyyy.length === 2 ? 2000 + parseInt(yyyy, 10) : parseInt(yyyy, 10);
        currentDateISO = `${y}-${mm}-${dd}`;
        // Wenn Zeit inline vorhanden, direkt mit Block fortfahren, sonst nächste Zeile
        if (!inlineTime) {
          continue;
        } else {
          line = inlineTime;
        }
      }

      // Spiel-Block
      if (!timeRe.test(line)) continue;
      const t = line;
      const home = lines[i + 1] || '';
      const dash = lines[i + 2] || '';
      const away = lines[i + 3] || '';
      if (!dashRe.test(dash) || !home || !away) continue;

      let k = i + 4;
      let homeScore: number | null = null;
      let awayScore: number | null = null;

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

      const comp = lines[k] || '';
      const sn = lines[k + 1] || '';
      const locCandidate = lines[k + 2] || '';

      // Wettbewerb übernehmen, wenn vorhanden (mit heuristischer Erkennung)
      let competition = comp ? comp : '';
      if (comp && compLeadRe.test(comp)) {
        competition = comp;
        k += 1; // Wettbewerbzeile konsumieren
      } else if (currentCompetition) {
        competition = currentCompetition;
      }

      // Spielnummer extrahieren
      const m = sn.match(/Spielnummer\s*(\d+)/i);
      const matchNumber = m ? m[1] : undefined;
      if (m) {
        k += 1; // Spielnummerzeile konsumieren
      }

      // Ort/Platz nur übernehmen, wenn es keine neue Datum-/Zeit-/Header-Zeile ist
      let loc = '';
      const next = lines[k] || '';
      if (next && !compAnyRe.test(next) && !dateRe.test(next) && !timeRe.test(next) && !dateTimeLineRe.test(next)) {
        loc = next;
        k += 1; // Ortszeile konsumieren
      }

      // Datum bestimmen: currentDateISO muss gesetzt sein, sonst überspringen
      const dateISO = currentDateISO || undefined;
      if (!dateISO) { i += 6; continue; }

      res.push({
        date: dateISO,
        time: t,
        homeTeam: home,
        awayTeam: away,
        competition: competition || '',
        location: loc,
        homeScore,
        awayScore,
        status: typeof homeScore === 'number' && typeof awayScore === 'number' ? 'finished' : 'upcoming',
      });
      i = k + 1; // an das Ende des Blocks springen
    }
    return res;
  };

  const importBulk = async () => {
    setBulkInfo(null);
    const lines = bulkText.split(/\n+/).map((l) => l.trim()).filter(Boolean);
    // defaultYear aus Text extrahieren (erste Datumzeile mit Jahr), sonst aktuelles Jahr
    const mYear = bulkText.match(/\b\d{1,2}[.\/-]\d{1,2}[.\/-](\d{2,4})\b/);
    const defaultYear = mYear ? (mYear[1].length === 2 ? 2000 + parseInt(mYear[1], 10) : parseInt(mYear[1], 10)) : new Date().getFullYear();
    // Zuerst Block-Parser (unterstützt Datumzeilen)
    let parsed: any[] = parseBlocks(bulkText, defaultYear);
    // Fallback: Einzeilen-Parser (nutzt defaultYear)
    if (parsed.length === 0) parsed = lines.map((l)=>parseLine(l, defaultYear)).filter((x): x is any => !!x);
    if (parsed.length === 0) {
      setBulkInfo('Keine gültigen Zeilen gefunden.');
      return;
    }
    try {
      const res = await fetch('/api/matches/bulk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ matches: parsed }),
      });
      const json = await res.json();
      if (!res.ok) {
        setBulkInfo(`Fehler: ${json?.error || 'Unbekannt'}`);
        return;
      }
      setBulkInfo(`Import ok: ${json.added} Spiele, total ${json.total}`);
      setBulkText('');
      await fetchMatches();
    } catch (e) {
      setBulkInfo('Fehler beim Import.');
    }
  };

  const fetchMatches = async () => {
    try {
      const res = await fetch('/api/matches?source=kv');
      const data = await res.json();
      setMatches(data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const seedKV = async () => {
    try {
      setSeeding(true);
      setSeedInfo(null);
      const res = await fetch('/api/matches/seed', {
        method: 'POST',
      });
      const json = await res.json();
      if (!res.ok) {
        setSeedInfo(`Fehler: ${json?.error || 'Unbekannt'}`);
        return;
      }
      setSeedInfo(`KV gefüllt: ${json.count} Spiele`);
      await fetchMatches();
    } catch (e) {
      setSeedInfo('Fehler beim Seeden.');
    } finally {
      setSeeding(false);
    }
  };

  const purgeAll = async () => {
    const pwd = prompt('Admin-Passwort eingeben, um ALLE Spiele zu löschen:');
    if (!pwd) return;
    setPurging(true);
    setPurgeInfo(null);
    try {
      const res = await fetch('/api/matches/purge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: pwd }),
      });
      const json = await res.json();
      if (!res.ok) {
        alert(json?.error || 'Löschen fehlgeschlagen');
        return;
      }
      setPurgeInfo(`Alle Matches gelöscht: ${json.deleted}`);
      await fetchMatches();
    } catch (e) {
      alert('Fehler beim Löschen');
    } finally {
      setPurging(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Spiel löschen?')) return;
    await fetch(`/api/matches/${id}`, { method: 'DELETE' });
    fetchMatches();
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
    } catch (e) {
      console.error(e);
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
    } catch (e) {
      console.error(e);
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
        <button
          onClick={seedKV}
          disabled={seeding}
          className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 backdrop-blur disabled:opacity-60"
        >
          <Database size={18} />
          {seeding ? 'Seeden…' : 'KV füllen'}
        </button>
        <button onClick={() => setShowAddForm(true)} className="bg-esla-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
          <Plus size={20} />
          Neues Spiel
        </button>
        <button onClick={purgeAll} disabled={purging} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 disabled:opacity-60">
          <Trash2 size={18} />
          Alle löschen
        </button>
        <button onClick={logout} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full font-semibold">Logout</button>
      </div>
    </div>

    {/* Bulk Import */}
    <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white border border-white/20 mb-6">
      <h2 className="text-2xl font-bold mb-4">Bulk Import</h2>
      <p className="text-white/70 mb-3 text-sm">Einzeiliges Format oder Blöcke. Datumzeilen im Text (tt.mm[.jjjj]) werden erkannt und für die folgenden Spiele verwendet.</p>
      <textarea className="w-full min-h-[200px] bg-white/10 border border-white/30 rounded-lg px-4 py-3 mb-3" placeholder="Zeilen hier einfügen... (Block: Datumzeile, Zeit, Heim, -, Auswärts, Wettbewerb, Spielnummer, Ort)" value={bulkText} onChange={(e)=>setBulkText(e.target.value)} />
      <div className="flex gap-3">
        <button onClick={importBulk} className="bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-lg font-semibold">Import starten</button>
        {bulkInfo && <div className="text-white/90 self-center">{bulkInfo}</div>}
      </div>
    </div>

    {(seedInfo || purgeInfo) && (
      <div className="mb-6 text-white/90">{seedInfo || purgeInfo}</div>
    )}

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
          {teamRecords.map((t) => (
            <option key={t.id} value={t.name} />
          ))}
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
                <p className="text-white/70">{match.date} | {match.time} | {match.location}</p>
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
