import { NextResponse } from 'next/server';
import { getAllMatches, getRecentMatches, getMatchesPage, createMatch } from '@/lib/kv';
import { isAuthorized } from '@/lib/auth';
import path from 'path';
import { promises as fs } from 'fs';

export const dynamic = 'force-dynamic';

// GET all matches
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const source = url.searchParams.get('source');
    const kvOnly = source === 'kv';
    const upcomingOnly = url.searchParams.get('upcoming') === '1' || url.searchParams.get('upcoming') === 'true';
    const limitParam = url.searchParams.get('limit');
    const pageParam = url.searchParams.get('page');
    const pageSizeParam = url.searchParams.get('pageSize');

    if (upcomingOnly) {
      const lim = Math.max(1, Math.min(100, parseInt(limitParam || '10', 10) || 10));
      // Load all KV matches and filter future
      let all = await getAllMatches();
      if ((!all || all.length === 0) && !kvOnly) {
        try {
          const filePath = path.join(process.cwd(), 'data', 'matches.json');
          const file = await fs.readFile(filePath, 'utf-8');
          const json = JSON.parse(file);
          if (json && Array.isArray(json.matches)) all = json.matches;
        } catch {}
      }
      const now = Date.now();
      const toMs = (m: any) => {
        const t = m.time && m.time.length >= 4 ? m.time : '00:00';
        return new Date(`${m.date}T${t}:00`).getTime();
      };
      const filtered = (all || [])
        .filter((m: any) => toMs(m) > now)
        .sort((a: any, b: any) => toMs(a) - toMs(b))
        .slice(0, lim);
      return NextResponse.json(filtered);
    }

    if (limitParam) {
      const limit = Math.max(1, Math.min(100, parseInt(limitParam || '0', 10) || 0));
      let items = await getRecentMatches(limit);
      if ((!items || items.length === 0) && !kvOnly) {
        try {
          const filePath = path.join(process.cwd(), 'data', 'matches.json');
          const file = await fs.readFile(filePath, 'utf-8');
          const json = JSON.parse(file);
          if (json && Array.isArray(json.matches)) {
            const sorted = json.matches.slice().sort((a: any, b: any) => {
              const ta = new Date(`${a.date}T${a.time || '00:00'}:00`).getTime();
              const tb = new Date(`${b.date}T${b.time || '00:00'}:00`).getTime();
              return tb - ta;
            });
            items = sorted.slice(0, limit);
          }
        } catch {}
      }
      return NextResponse.json(items || []);
    }

    if (pageParam || pageSizeParam) {
      const page = Math.max(1, parseInt(pageParam || '1', 10) || 1);
      const pageSize = Math.max(1, Math.min(200, parseInt(pageSizeParam || '20', 10) || 20));
      let pageData = await getMatchesPage(page, pageSize);
      if ((!pageData.items || pageData.items.length === 0) && !kvOnly) {
        try {
          const filePath = path.join(process.cwd(), 'data', 'matches.json');
          const file = await fs.readFile(filePath, 'utf-8');
          const json = JSON.parse(file);
          if (json && Array.isArray(json.matches)) {
            const sorted = json.matches.slice().sort((a: any, b: any) => {
              const ta = new Date(`${a.date}T${a.time || '00:00'}:00`).getTime();
              const tb = new Date(`${b.date}T${b.time || '00:00'}:00`).getTime();
              return tb - ta;
            });
            const total = sorted.length;
            const start = (page - 1) * pageSize;
            const stop = start + pageSize;
            const items = sorted.slice(start, stop);
            pageData = {
              items,
              page,
              pageSize,
              total,
              totalPages: Math.max(1, Math.ceil(total / pageSize)),
            };
          }
        } catch {}
      }
      return NextResponse.json(pageData);
    }

    const matches = await getAllMatches();
    if (Array.isArray(matches) && matches.length > 0) {
      return NextResponse.json(matches);
    }
    if (!kvOnly) {
      try {
        const filePath = path.join(process.cwd(), 'data', 'matches.json');
        const file = await fs.readFile(filePath, 'utf-8');
        const json = JSON.parse(file);
        if (json && Array.isArray(json.matches)) {
          return NextResponse.json(json.matches);
        }
      } catch {}
    }
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json({ error: 'Failed to fetch matches' }, { status: 500 });
  }
}

// POST create new match
export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const newMatch = await createMatch(body);
    return NextResponse.json(newMatch, { status: 201 });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json({ error: 'Failed to create match' }, { status: 500 });
  }
}
