import { NextResponse } from 'next/server';
import { getAllTeams, createTeam } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const teams = await getAllTeams();
    return NextResponse.json(teams);
  } catch (e) {
    console.error('Error fetching teams:', e);
    return NextResponse.json({ error: 'Failed to fetch teams' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const team = await createTeam(body);
    return NextResponse.json(team, { status: 201 });
  } catch (e) {
    console.error('Error creating team:', e);
    return NextResponse.json({ error: 'Failed to create team' }, { status: 500 });
  }
}
