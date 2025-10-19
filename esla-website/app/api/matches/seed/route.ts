import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import path from 'path';
import { promises as fs } from 'fs';
import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MATCH_KEY_PREFIX = 'esla:match:';
const MATCH_INDEX_KEY = 'esla:matches:byDate';
function matchKey(id: string) { return `${MATCH_KEY_PREFIX}${id}`; }
function toUnixScore(date: string, time?: string): number {
  try {
    const t = (time && time.length >= 4) ? time : '00:00';
    return Math.floor(new Date(`${date}T${t}:00`).getTime() / 1000);
  } catch {
    return 0;
  }
}

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const filePath = path.join(process.cwd(), 'data', 'matches.json');
    const file = await fs.readFile(filePath, 'utf-8');
    const json = JSON.parse(file);

    if (!json || !Array.isArray(json.matches)) {
      return NextResponse.json({ error: 'Invalid matches.json format' }, { status: 400 });
    }
    // reset index
    await kv.del(MATCH_INDEX_KEY);
    let count = 0;
    for (const m of json.matches) {
      const id = m.id || `${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
      const rec = { ...m, id };
      await kv.set(matchKey(id), rec);
      await kv.zadd(MATCH_INDEX_KEY, { score: toUnixScore(rec.date, rec.time), member: id });
      count += 1;
    }

    const total = await kv.zcard(MATCH_INDEX_KEY);
    return NextResponse.json({ ok: true, count, total });
  } catch (err) {
    console.error('Seed error:', err);
    return NextResponse.json({ error: 'Failed to seed' }, { status: 500 });
  }
}
