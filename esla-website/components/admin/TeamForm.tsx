"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface TeamFormData {
  id?: string;
  name: string;
  short?: string;
  logoUrl?: string;
  primaryColor?: string;
}

type MutableTeamPayload = Omit<TeamFormData, "id"> & { id?: string };

function buildPayload(data: TeamFormData): MutableTeamPayload {
  return {
    name: data.name,
    short: data.short?.trim() || undefined,
    logoUrl: data.logoUrl?.trim() || undefined,
    primaryColor: data.primaryColor?.trim() || undefined,
  };
}

export default function TeamForm({ initial }: { initial?: TeamFormData }) {
  const router = useRouter();
  const [name, setName] = useState(initial?.name || "");
  const [short, setShort] = useState(initial?.short || "");
  const [logoUrl, setLogoUrl] = useState(initial?.logoUrl || "");
  const [primaryColor, setPrimaryColor] = useState(initial?.primaryColor || "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const body = buildPayload({
        name,
        short,
        logoUrl,
        primaryColor,
      });
      let res: Response;
      if (initial?.id) {
        res = await fetch(`/api/teams/${initial.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/teams", {
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
      router.push("/admin/teams");
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
      const res = await fetch(`/api/teams/${initial.id}`, { method: "DELETE" });
      if (!res.ok) {
        const j = await res.json();
        setError(j?.error || "Löschen fehlgeschlagen");
        return;
      }
      router.push("/admin/teams");
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
        <div className="md:col-span-2">
          <label className="block text-white/80 text-sm font-semibold mb-2">Teamname</label>
          <input value={name} onChange={(e)=>setName(e.target.value)} required className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" placeholder="z.B. ESLA 9" />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Kurzname</label>
          <input value={short} onChange={(e)=>setShort(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" placeholder="z.B. ESLA9" />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Logo URL</label>
          <input value={logoUrl} onChange={(e)=>setLogoUrl(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" placeholder="/images/esla-9.jpg oder https://..." />
        </div>
        <div>
          <label className="block text-white/80 text-sm font-semibold mb-2">Primärfarbe (Hex)</label>
          <input value={primaryColor} onChange={(e)=>setPrimaryColor(e.target.value)} className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white" placeholder="#e3c41d" />
        </div>
      </div>
      {error && <div className="text-red-400 text-sm">{error}</div>}
      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-esla-primary hover:bg-esla-accent text-white px-6 py-3 rounded-full font-bold disabled:opacity-60">Speichern</button>
        {initial?.id && (
          <button type="button" onClick={onDelete} disabled={saving} className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-bold disabled:opacity-60">Löschen</button>
        )}
      </div>
    </form>
  );
}
