'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type CalendarInfo = {
  title: string;
  start: string; // ISO ohne Zeitzone oder mit
  end?: string;
  durationMinutes?: number;
  location?: string;
  description?: string;
  timeZone?: string;
};

type DateParts = {
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
  second: number;
};

const pad = (value: number) => value.toString().padStart(2, '0');

const TZ_SUFFIX_REGEX = /(?:Z|[+-]\d{2}:?\d{2})$/;

function parseNaiveParts(value: string): DateParts | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);
  if (!match) return null;
  return {
    year: Number(match[1]),
    month: Number(match[2]),
    day: Number(match[3]),
    hour: Number(match[4]),
    minute: Number(match[5]),
    second: match[6] ? Number(match[6]) : 0,
  };
}

function parseDateParts(value?: string, timeZone?: string): DateParts | null {
  if (!value) return null;
  if (!TZ_SUFFIX_REGEX.test(value)) {
    return parseNaiveParts(value);
  }
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  if (timeZone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const parts = formatter.formatToParts(date).reduce<Record<string, number>>((acc, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = Number(part.value);
      }
      return acc;
    }, {});
    return {
      year: parts.year ?? date.getUTCFullYear(),
      month: (parts.month ?? 1),
      day: parts.day ?? date.getUTCDate(),
      hour: parts.hour ?? date.getUTCHours(),
      minute: parts.minute ?? date.getUTCMinutes(),
      second: parts.second ?? date.getUTCSeconds(),
    };
  }
  return {
    year: date.getUTCFullYear(),
    month: date.getUTCMonth() + 1,
    day: date.getUTCDate(),
    hour: date.getUTCHours(),
    minute: date.getUTCMinutes(),
    second: date.getUTCSeconds(),
  };
}

function addMinutesLocal(parts: DateParts, minutes: number, timeZone?: string): DateParts {
  const base = new Date(Date.UTC(parts.year, parts.month - 1, parts.day, parts.hour, parts.minute, parts.second));
  base.setUTCMinutes(base.getUTCMinutes() + minutes);
  if (timeZone) {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const localized = formatter.formatToParts(base).reduce<Record<string, number>>((acc, part) => {
      if (part.type !== 'literal') {
        acc[part.type] = Number(part.value);
      }
      return acc;
    }, {});
    return {
      year: localized.year ?? base.getUTCFullYear(),
      month: localized.month ?? base.getUTCMonth() + 1,
      day: localized.day ?? base.getUTCDate(),
      hour: localized.hour ?? base.getUTCHours(),
      minute: localized.minute ?? base.getUTCMinutes(),
      second: localized.second ?? base.getUTCSeconds(),
    };
  }
  return {
    year: base.getUTCFullYear(),
    month: base.getUTCMonth() + 1,
    day: base.getUTCDate(),
    hour: base.getUTCHours(),
    minute: base.getUTCMinutes(),
    second: base.getUTCSeconds(),
  };
}

function formatGoogleDate(parts: DateParts) {
  return `${parts.year}${pad(parts.month)}${pad(parts.day)}T${pad(parts.hour)}${pad(parts.minute)}${pad(parts.second)}`;
}

export default function JoinButton({ matchId, label, leaveText, calendar }: { matchId: string; label?: string; leaveText?: string; calendar?: CalendarInfo }) {
  const [hasJoined, setHasJoined] = useState(false);
  const [count, setCount] = useState(0);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    let active = true;
    const fetchState = async () => {
      try {
        const res = await fetch(`/api/matches/${matchId}/rsvp`, { cache: 'no-store' });
        if (!res.ok) return;
        const data = await res.json();
        if (!active) return;
        setHasJoined(Boolean(data.joined));
        setCount(Number(data.count || 0));
      } catch {}
    };
    if (!hasFetchedRef.current) {
      void fetchState();
      hasFetchedRef.current = true;
    }
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<{ matchId: string; joined: boolean; count: number }>;
      if (ce.detail?.matchId !== matchId) return;
      setHasJoined(ce.detail.joined);
      setCount(ce.detail.count);
    };
    window.addEventListener('esla-join-change', onCustom as EventListener);
    return () => {
      active = false;
      window.removeEventListener('esla-join-change', onCustom as EventListener);
    };
  }, []);

  const confetti = () => {
    const root = containerRef.current;
    if (!root) return;
    const colors = ['#ff4757', '#ffa502', '#2ed573', '#1e90ff', '#eccc68', '#ff6b81'];
    const rect = root.getBoundingClientRect();
    const originX = rect.width - 20;
    const originY = 10;
    for (let i = 0; i < 28; i++) {
      const el = document.createElement('span');
      el.style.position = 'absolute';
      el.style.left = `${originX}px`;
      el.style.top = `${originY}px`;
      el.style.width = `${10 + Math.random() * 8}px`;
      el.style.height = `${10 + Math.random() * 8}px`;
      el.style.background = colors[i % colors.length];
      el.style.borderRadius = '2px';
      el.style.pointerEvents = 'none';
      root.appendChild(el);
      const dx = (Math.random() - 0.5) * 180;
      const dy = - (90 + Math.random() * 160);
      const rotate = (Math.random() - 0.5) * 360;
      const duration = 900 + Math.random() * 900;
      const anim = el.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${dx}px, ${dy}px) rotate(${rotate}deg)`, opacity: 0 }
      ], { duration, easing: 'cubic-bezier(.2,.8,.2,1)' });
      anim.onfinish = () => { el.remove(); };
    }
  };

  const calendarUrl = useMemo(() => {
    if (!calendar) return null;
    const { title, start, end, durationMinutes = 120, location, description, timeZone } = calendar;
    const startParts = parseDateParts(start, timeZone);
    if (!startParts) return null;
    const endParts = end ? parseDateParts(end, timeZone) : addMinutesLocal(startParts, durationMinutes, timeZone);
    if (!endParts) return null;
    const startString = formatGoogleDate(startParts);
    const endString = formatGoogleDate(endParts);
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', title);
    url.searchParams.set('dates', `${startString}/${endString}`);
    if (location) url.searchParams.set('location', location);
    if (description) url.searchParams.set('details', description);
    if (timeZone) url.searchParams.set('ctz', timeZone);
    return url.toString();
  }, [calendar]);

  const onToggle = async () => {
    if (pending) return;
    setPending(true);
    const optimisticJoined = !hasJoined;
    const optimisticCount = Math.max(0, count + (optimisticJoined ? 1 : -1));
    setHasJoined(optimisticJoined);
    setCount(optimisticCount);
    window.dispatchEvent(new CustomEvent('esla-join-change', { detail: { matchId, joined: optimisticJoined, count: optimisticCount } }));
    if (optimisticJoined) {
      setEmoji('🥳');
      confetti();
      setTimeout(() => setEmoji(null), 1200);
    } else {
      setEmoji('😢');
      setTimeout(() => setEmoji(null), 1200);
    }
    try {
      const res = await fetch(`/api/matches/${matchId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: optimisticJoined ? 'join' : 'leave' }),
      });
      if (res.ok) {
        const data = await res.json();
        setHasJoined(Boolean(data.joined));
        setCount(Number(data.count || 0));
        window.dispatchEvent(new CustomEvent('esla-join-change', { detail: { matchId, joined: Boolean(data.joined), count: Number(data.count || 0) } }));
      } else {
        // revert on error
        setHasJoined(!optimisticJoined);
        setCount(count);
      }
    } catch {
      setHasJoined(!optimisticJoined);
      setCount(count);
    } finally {
      setPending(false);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex flex-col sm:flex-row md:flex-col items-stretch sm:items-center md:items-start gap-2">
      <button
        onClick={onToggle}
        disabled={pending}
        className={`${hasJoined ? 'bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'} ${pending ? 'opacity-80 cursor-not-allowed' : ''} relative w-full sm:w-auto px-3 sm:px-4 md:px-6 lg:px-7 py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap md:min-w-[230px] lg:min-w-[260px]`}
      >
        {hasJoined ? 'Teilnahme registriert' : (label || 'Ich nehme teil')}
        {count > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] px-[6px] bg-red-600 text-white text-[11px] leading-[20px] rounded-full text-center font-bold shadow-md">
            {count}
          </span>
        )}
      </button>
      {emoji && (
        <span className="absolute -top-8 right-0 text-2xl select-none">
          {emoji}
        </span>
      )}
      {hasJoined && calendarUrl && (
        <a
          href={calendarUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full sm:w-auto items-center justify-center gap-2 px-3 sm:px-4 md:px-6 lg:px-7 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/20 whitespace-nowrap md:min-w-[220px] lg:min-w-[260px]"
        >
         In Googlekalender speichern
        </a>
      )}
    </div>
  );
}
