import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { isAuthorized } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const MATCH_KEY_PREFIX = 'esla:match:';
const MATCH_INDEX_KEY = 'esla:matches:byDate';
function matchKey(id: string) { return `${MATCH_KEY_PREFIX}${id}`; }

export async function POST(request: Request) {
  try {
    if (!isAuthorized(request)) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json({ error: 'Admin password not configured' }, { status: 500 });
    }
    if (password !== adminPassword) {
      return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
    }

    const ids = (await kv.zrange(MATCH_INDEX_KEY, 0, -1)) as string[];
    let deleted = 0;
    if (ids && ids.length > 0) {
      for (const id of ids) {
        await kv.del(matchKey(id));
        deleted += 1;
      }
    }
    await kv.del(MATCH_INDEX_KEY);

    return NextResponse.json({ ok: true, deleted });
  } catch (err) {
    console.error('Purge error:', err);
    return NextResponse.json({ error: 'Failed to purge' }, { status: 500 });
  }
}
