"use client";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Match } from "@/types";

type Props = {
  initial?: Partial<Match> & { id?: string };
};

export default function MatchForm({ initial }: Props) {
  const router = useRouter();
  const [date, setDate] = useState(initial?.date || "");
  const [time, setTime] = useState(initial?.time || "");
  const [homeTeam, setHomeTeam] = useState(initial?.homeTeam || "");
  const [awayTeam, setAwayTeam] = useState(initial?.awayTeam || "");
  const [homeScore, setHomeScore] = useState<string>(
    typeof initial?.homeScore === "number" ? String(initial?.homeScore) : ""
  );
  const [awayScore, setAwayScore] = useState<string>(
    typeof initial?.awayScore === "number" ? String(initial?.awayScore) : ""
  );
  const [location, setLocation] = useState(initial?.location || "");
  const [competition, setCompetition] = useState(initial?.competition || "");
  const [status, setStatus] = useState<Match["status"]>(
    (initial?.status as any) || "upcoming"
  );
  const [matchNumber, setMatchNumber] = useState(initial?.matchNumber || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [teams, setTeams] = useState<{ id: string; name: string }[]>([]);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        const res = await fetch("/api/teams", { cache: "no-store" });
        const data = await res.json();
        if (Array.isArray(data)) setTeams(data.map((t: any) => ({ id: t.id, name: t.name })));
      } catch {}
    };
    loadTeams();
  }, []);

  const teamNames = useMemo(() => teams.map((t) => t.name), [teams]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const body: any = {
        date,
        time: time || undefined,
        homeTeam,
        awayTeam,
        homeScore: homeScore === "" ? undefined : Number(homeScore),
        awayScore: awayScore === "" ? undefined : Number(awayScore),
        location: location || undefined,
        competition: competition || undefined,
        status,
        matchNumber: matchNumber || undefined,
      };
      let res: Response;
      if (initial?.id) {
        res = await fetch(`/api/matches/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/matches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Speichern fehlgeschlagen");
        return;
      }
      router.push("/admin/matches");
      router.refresh();
    } catch (e) {
      setError("Speichern fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  const onDelete = async () => {
    if (!initial?.id) return;
    if (!confirm("Wirklich löschen?")) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/matches/${initial.id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json();
        setError(j?.error || "Löschen fehlgeschlagen");
        return;
      }
      router.push("/admin/matches");
      router.refresh();
    } catch {
      setError("Löschen fehlgeschlagen");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Datum</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" required />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Zeit</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Heimteam</label>
          <input list="teams" value={homeTeam} onChange={(e) => setHomeTeam(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" required />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Auswärtsteam</label>
          <input list="teams" value={awayTeam} onChange={(e) => setAwayTeam(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" required />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Heim Tore</label>
          <input type="number" value={homeScore} onChange={(e) => setHomeScore(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Auswärts Tore</label>
          <input type="number" value={awayScore} onChange={(e) => setAwayScore(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-white/80 text-sm font-semibold mb-2">Wettbewerb</label>
          <input value={competition} onChange={(e) => setCompetition(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" />
        </div>
        <div className="md:col-span-2">
          <label className="block text-white/80 text-sm font-semibold mb-2">Ort</label>
          <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Spielnummer</label>
          <input value={matchNumber} onChange={(e) => setMatchNumber(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Status</label>
          <select value={status} onChange={(e) => setStatus(e.target.value as Match["status"])} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white">
            <option value="upcoming">Anstehend</option>
            <option value="live">Live</option>
            <option value="finished">Abgeschlossen</option>
          </select>
        </div>
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-bold disabled:opacity-60">Speichern</button>
        {initial?.id && (
          <button type="button" onClick={onDelete} disabled={saving} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold disabled:opacity-60">Löschen</button>
        )}
      </div>
      <datalist id="teams">
        {teamNames.map((n) => (
          <option key={n} value={n} />
        ))}
      </datalist>
    </form>
  );
}
