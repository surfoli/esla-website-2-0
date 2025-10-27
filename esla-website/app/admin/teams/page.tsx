'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Edit, Trash2, Save, X } from 'lucide-react';
import Image from 'next/image';
import Navbar from '@/components/navigation/Navbar';

interface Team {
  id: string;
  name: string;
  short?: string;
  logoUrl?: string;
  primaryColor?: string;
}

type TeamPayload = Omit<Team, 'id'>;
type TeamRecord = Pick<Team, 'id' | 'name'>;

function isTeamRecord(value: unknown): value is Team {
  if (!value || typeof value !== 'object') return false;
  const candidate = value as Partial<Team>;
  return typeof candidate.id === 'string' && typeof candidate.name === 'string';
}

function sanitizeTeamPayload(value: Partial<Team>): TeamPayload | null {
  if (typeof value.name !== 'string' || value.name.trim().length === 0) return null;
  const payload: TeamPayload = { name: value.name.trim() };
  if (typeof value.short === 'string' && value.short.trim().length > 0) {
    payload.short = value.short.trim();
  }
  if (typeof value.logoUrl === 'string' && value.logoUrl.trim().length > 0) {
    payload.logoUrl = value.logoUrl.trim();
  }
  if (typeof value.primaryColor === 'string' && value.primaryColor.trim().length > 0) {
    payload.primaryColor = value.primaryColor.trim();
  }
  return payload;
}

export default function TeamsAdmin() {
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [teamRecords, setTeamRecords] = useState<TeamRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Team>>({});
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    fetchTeams();
  }, []);

  const fetchTeams = async () => {
    try {
      const res = await fetch('/api/teams');
      if (!res.ok) {
        console.error('Failed to fetch teams: HTTP', res.status);
        setTeams([]);
        setTeamRecords([]);
        return;
      }
      const data: unknown = await res.json();
      if (Array.isArray(data)) {
        const valid = data.filter(isTeamRecord);
        setTeams(valid);
        setTeamRecords(valid.map(({ id, name }) => ({ id, name })));
      } else {
        setTeams([]);
        setTeamRecords([]);
      }
    } catch (error) {
      console.error('Failed to load teams', error);
      setTeams([]);
      setTeamRecords([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    try {
      const payload = sanitizeTeamPayload(formData);
      if (!payload) {
        alert('Teamname erforderlich');
        return;
      }
      const res = await fetch('/api/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return alert('Speichern fehlgeschlagen');
      setShowAddForm(false);
      setFormData({});
      setLogoFile(null);
      await fetchTeams();
    } catch (error) {
      console.error('Failed to create team', error);
    }
  };

  const startEdit = (team: Team) => {
    setEditingId(team.id);
    setFormData({ ...team });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({});
    setLogoFile(null);
    setUploadError(null);
  };

  const handleUpdate = async (id: string) => {
    try {
      const payload = sanitizeTeamPayload(formData);
      if (!payload) {
        alert('Teamname erforderlich');
        return;
      }
      const res = await fetch(`/api/teams/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) return alert('Aktualisierung fehlgeschlagen');
      setEditingId(null);
      setFormData({});
      setLogoFile(null);
      await fetchTeams();
    } catch (error) {
      console.error('Failed to update team', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Team löschen?')) return;
    try {
      const res = await fetch(`/api/teams/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        alert('Löschen fehlgeschlagen');
        return;
      }
      await fetchTeams();
    } catch (error) {
      console.error('Failed to delete team', error);
    }
  };

  const uploadLogo = async () => {
    if (!logoFile) return;
    setUploadingLogo(true);
    setUploadError(null);
    try {
      const fd = new FormData();
      fd.append('file', logoFile);
      fd.append('dir', 'team-logos');
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      const json = await res.json();
      if (!res.ok) {
        setUploadError(json?.error || 'Upload fehlgeschlagen');
        return;
      }
      setFormData({ ...formData, logoUrl: json.url });
    } catch (error) {
      setUploadError('Upload fehlgeschlagen');
    } finally {
      setUploadingLogo(false);
    }
  };

  const logout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  if (loading) {
    return <div className="min-h-screen bg-esla-dark flex items-center justify-center text-white">Laden...</div>;
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-esla-secondary to-esla-dark">
      <Navbar />
      <div className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-black text-white">TEAMS VERWALTEN</h1>
            <div className="flex items-center gap-3">
              <button onClick={() => setShowAddForm(true)} className="bg-esla-primary text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2">
                <Plus size={20} /> Neues Team
              </button>
              <button onClick={logout} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-6 py-3 rounded-full font-semibold">Logout</button>
            </div>
          </div>

          {showAddForm && (
            <div className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white border border-white/20 mb-6">
              <h2 className="text-2xl font-bold mb-4">Neues Team</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Teamname" value={formData.name || ''} onChange={(e)=>setFormData({ ...formData, name: e.target.value })} />
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Kurzname (optional)" value={formData.short || ''} onChange={(e)=>setFormData({ ...formData, short: e.target.value })} />
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 md:col-span-2" placeholder="Logo URL (https:// oder /images/...)" value={formData.logoUrl || ''} onChange={(e)=>setFormData({ ...formData, logoUrl: e.target.value })} />
                <div className="md:col-span-2 grid md:grid-cols-2 gap-3">
                  <input type="file" accept="image/*" className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" onChange={(e)=>setLogoFile(e.target.files?.[0] || null)} />
                  <button type="button" onClick={uploadLogo} disabled={!logoFile || uploadingLogo} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-60">{uploadingLogo ? 'Lade hoch…' : 'Logo hochladen'}</button>
                </div>
                {uploadError && <div className="md:col-span-2 text-red-400 text-sm">{uploadError}</div>}
                {formData.logoUrl && (
                  <div className="md:col-span-2">
                    <div className="relative h-20 w-40">
                      <Image src={formData.logoUrl} alt="Logo Vorschau" fill unoptimized className="object-contain" />
                    </div>
                  </div>
                )}
                <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" placeholder="Primärfarbe (#RRGGBB)" value={formData.primaryColor || ''} onChange={(e)=>setFormData({ ...formData, primaryColor: e.target.value })} />
              </div>
              <div className="flex gap-3 mt-4">
                <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><Save size={18}/>Speichern</button>
                <button onClick={()=>{setShowAddForm(false); setFormData({});}} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><X size={18}/>Abbrechen</button>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {teams.map((team) => (
              <div key={team.id} className="bg-white/10 backdrop-blur-xl rounded-xl p-6 text-white border border-white/20">
                {editingId === team.id ? (
                  <div>
                    <h3 className="text-xl font-bold mb-4">Team bearbeiten</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.name || ''} onChange={(e)=>setFormData({ ...formData, name: e.target.value })} />
                      <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.short || ''} onChange={(e)=>setFormData({ ...formData, short: e.target.value })} />
                      <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2 md:col-span-2" value={formData.logoUrl || ''} onChange={(e)=>setFormData({ ...formData, logoUrl: e.target.value })} />
                      <div className="md:col-span-2 grid md:grid-cols-2 gap-3">
                        <input type="file" accept="image/*" className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" onChange={(e)=>setLogoFile(e.target.files?.[0] || null)} />
                        <button type="button" onClick={uploadLogo} disabled={!logoFile || uploadingLogo} className="bg-white/10 hover:bg-white/20 border border-white/30 text-white px-4 py-2 rounded-lg font-semibold disabled:opacity-60">{uploadingLogo ? 'Lade hoch…' : 'Logo hochladen'}</button>
                      </div>
                      {uploadError && <div className="md:col-span-2 text-red-400 text-sm">{uploadError}</div>}
                      {formData.logoUrl && (
                        <div className="md:col-span-2">
                          <div className="relative h-20 w-40">
                            <Image src={formData.logoUrl} alt="Logo Vorschau" fill unoptimized className="object-contain" />
                          </div>
                        </div>
                      )}
                      <input className="bg-white/10 border border-white/30 rounded-lg px-4 py-2" value={formData.primaryColor || ''} onChange={(e)=>setFormData({ ...formData, primaryColor: e.target.value })} />
                    </div>
                    <div className="flex gap-3 mt-4">
                      <button onClick={()=>handleUpdate(team.id)} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><Save size={18}/>Speichern</button>
                      <button onClick={cancelEdit} className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg font-semibold flex items-center gap-2"><X size={18}/>Abbrechen</button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold">{team.name} {team.short ? <span className="text-white/60">({team.short})</span> : null}</h3>
                      {team.logoUrl && <p className="text-white/70 text-sm">Logo: {team.logoUrl}</p>}
                      {team.primaryColor && <p className="text-white/70 text-sm">Farbe: {team.primaryColor}</p>}
                    </div>
                    <div className="flex gap-2">
                      <button onClick={()=>startEdit(team)} className="bg-blue-500 hover:bg-blue-600 p-3 rounded-lg transition"><Edit size={18} /></button>
                      <button onClick={()=>handleDelete(team.id)} className="bg-red-500 hover:bg-red-600 p-3 rounded-lg transition"><Trash2 size={18} /></button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
