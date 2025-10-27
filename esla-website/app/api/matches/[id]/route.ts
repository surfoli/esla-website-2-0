import { NextResponse } from 'next/server';
import { getMatchById, updateMatch, deleteMatch } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';
import type { Match } from '@/types';
import { normalizeMatchPayload } from '@/lib/match';

export const dynamic = 'force-dynamic';

// GET single match
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const match = await getMatchById(params.id);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    return NextResponse.json(match);
  } catch (error) {
    console.error('Error fetching match:', error);
    return NextResponse.json({ error: 'Failed to fetch match' }, { status: 500 });
  }
}

// PUT update match
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = (await request.json()) as Partial<Match>;
    const normalized = normalizeMatchPayload(body);
    const updated = await updateMatch(params.id, normalized);
    
    if (!updated) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    
    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating match:', error);
    return NextResponse.json({ error: 'Failed to update match' }, { status: 500 });
  }
}

// DELETE match
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const success = await deleteMatch(params.id);
    
    if (!success) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting match:', error);
    return NextResponse.json({ error: 'Failed to delete match' }, { status: 500 });
  }
}
