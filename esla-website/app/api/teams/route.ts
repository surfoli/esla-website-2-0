import { NextResponse } from 'next/server';
import { getAllTeams, createTeam } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';

interface TeamPayload {
  name: string;
  short?: string;
  logoUrl?: string;
  primaryColor?: string;
}

function sanitizeTeamPayload(value: unknown): TeamPayload | null {
  if (!value || typeof value !== 'object') return null;
  const candidate = value as Partial<TeamPayload>;
  if (typeof candidate.name !== 'string' || candidate.name.trim().length === 0) return null;
  const payload: TeamPayload = {
    name: candidate.name.trim(),
  };
  if (typeof candidate.short === 'string' && candidate.short.trim().length > 0) payload.short = candidate.short.trim();
  if (typeof candidate.logoUrl === 'string' && candidate.logoUrl.trim().length > 0) payload.logoUrl = candidate.logoUrl.trim();
  if (typeof candidate.primaryColor === 'string' && candidate.primaryColor.trim().length > 0) payload.primaryColor = candidate.primaryColor.trim();
  return payload;
}

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const teams = await getAllTeams();
    return NextResponse.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const rawBody = await request.json();
    const payload = sanitizeTeamPayload(rawBody);
    if (!payload) {
      return NextResponse.json({ error: 'Invalid team payload' }, { status: 400 });
    }

    const team = await createTeam(payload);
    return NextResponse.json(team, { status: 201 });
  } catch (error) {
    console.error('Error creating team:', error);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
