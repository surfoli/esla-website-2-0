import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { randomUUID } from 'crypto';

export const dynamic = 'force-dynamic';

const COOKIE_NAME = 'esla_uid';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 5; // 5 years

function membersKey(matchId: string) {
  return `esla:rsvp:members:${matchId}`;
}

function rateLimitKey(uid: string) {
  return `esla:rl:rsvp:${uid}`;
}

async function ensureUserId() {
  const store = await cookies();
  let uid = store.get(COOKIE_NAME)?.value;
  let created = false;
  if (!uid) {
    uid = randomUUID();
    created = true;
  }
  return { uid, created };
}

async function checkRateLimit(uid: string) {
  try {
    const key = rateLimitKey(uid);
    const count = await kv.incr(key);
    if (count === 1) {
      await kv.expire(key, 60); // 60s window
    }
    return count <= 20; // allow up to 20 actions per minute
  } catch {
    return true; // fail-open: don't block if KV not available
  }
}

export async function GET(
  _request: Request,
  context: any
) {
  try {
    const params = await context.params;
    const { uid, created } = await ensureUserId();
    const key = membersKey(params.id);
    const [joinedRaw, countRaw] = await Promise.all([
      kv.sismember(key, uid),
      kv.scard(key),
    ]);
    const joined = Number(joinedRaw) === 1;
    const count = typeof countRaw === 'number' ? countRaw : parseInt(String(countRaw || 0), 10) || 0;
    const res = NextResponse.json({ count, joined });
    if (created) {
      res.cookies.set({
        name: COOKIE_NAME,
        value: uid,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: COOKIE_MAX_AGE,
      });
    }
    return res;
  } catch (error) {
    console.error('RSVP GET error:', error);
    return NextResponse.json({ count: 0, joined: false }, { status: 200 });
  }
}

export async function POST(
  request: Request,
  context: any
) {
  try {
    const params = await context.params;
    const { uid, created } = await ensureUserId();
    const allowed = await checkRateLimit(uid);
    if (!allowed) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    let action: 'join' | 'leave' | undefined;
    try {
      const body = await request.json();
      action = body?.action === 'leave' ? 'leave' : 'join';
    } catch {
      action = 'join';
    }

    const key = membersKey(params.id);
    const isMemberRaw = await kv.sismember(key, uid);
    const isMember = Number(isMemberRaw) === 1;

    if (action === 'join' && !isMember) {
      await kv.sadd(key, uid);
    } else if (action === 'leave' && isMember) {
      await kv.srem(key, uid);
    }

    const [joinedRaw, countRaw] = await Promise.all([
      kv.sismember(key, uid),
      kv.scard(key),
    ]);
    const joined = Number(joinedRaw) === 1;
    const count = typeof countRaw === 'number' ? countRaw : parseInt(String(countRaw || 0), 10) || 0;

    const res = NextResponse.json({ count, joined });
    if (created) {
      res.cookies.set({
        name: COOKIE_NAME,
        value: uid,
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        maxAge: COOKIE_MAX_AGE,
      });
    }
    return res;
  } catch (error) {
    console.error('RSVP POST error:', error);
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}
