import { NextResponse } from 'next/server';
import { getTeamById, updateTeam, deleteTeam } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const team = await getTeamById(params.id);
    if (!team) return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    return NextResponse.json(team);
  } catch (e) {
    console.error('Error fetching team:', e);
    return NextResponse.json({ error: 'Failed to fetch team' }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const body = await request.json();
    const updated = await updateTeam(params.id, body);
    if (!updated) return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    return NextResponse.json(updated);
  } catch (e) {
    console.error('Error updating team:', e);
    return NextResponse.json({ error: 'Failed to update team' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const ok = await deleteTeam(params.id);
    if (!ok) return NextResponse.json({ error: 'Team not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Error deleting team:', e);
    return NextResponse.json({ error: 'Failed to delete team' }, { status: 500 });
  }
}
