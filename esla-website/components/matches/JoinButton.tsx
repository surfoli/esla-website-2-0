'use client';

import { useEffect, useMemo, useRef, useState } from 'react';

type CalendarInfo = {
  title: string;
  start: string; // ISO ohne Zeitzone oder mit
  end?: string;
  durationMinutes?: number;
  location?: string;
  description?: string;
};

function formatGoogleDate(iso: string) {
  const date = new Date(iso);
  const pad = (n: number) => n.toString().padStart(2, '0');
  return `${date.getFullYear()}${pad(date.getMonth() + 1)}${pad(date.getDate())}T${pad(date.getHours())}${pad(date.getMinutes())}${pad(date.getSeconds())}`;
}

function addMinutesIso(iso: string, minutes: number) {
  const date = new Date(iso);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toISOString();
}

export default function JoinButton({ matchId, label, leaveText, calendar }: { matchId: string; label?: string; leaveText?: string; calendar?: CalendarInfo }) {
  const keyJoined = `esla_has_joined_${matchId}`;
  const keyCount = `esla_participants_count_${matchId}`;
  const [hasJoined, setHasJoined] = useState(false);
  const [count, setCount] = useState(0);
  const [emoji, setEmoji] = useState<string | null>(null);
  const [statusText, setStatusText] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    try {
      const j = localStorage.getItem(keyJoined);
      const c = localStorage.getItem(keyCount);
      if (j === '1') setHasJoined(true);
      if (c) setCount(parseInt(c, 10) || 0);
    } catch {}
    const onStorage = (e: StorageEvent) => {
      if (!e.key) return;
      if (e.key === keyJoined) setHasJoined(e.newValue === '1');
      if (e.key === keyCount) setCount(parseInt(e.newValue || '0', 10) || 0);
    };
    const onCustom = (e: Event) => {
      const ce = e as CustomEvent<{ matchId: string; joined: boolean; count: number }>;
      if (ce.detail?.matchId !== matchId) return;
      setHasJoined(ce.detail.joined);
      setCount(ce.detail.count);
    };
    window.addEventListener('storage', onStorage);
    window.addEventListener('esla-join-change', onCustom as EventListener);
    return () => {
      window.removeEventListener('storage', onStorage);
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
    const { title, start, end, durationMinutes = 120, location, description } = calendar;
    const startString = formatGoogleDate(start);
    const endIso = end || addMinutesIso(start, durationMinutes);
    const endString = formatGoogleDate(endIso);
    const url = new URL('https://calendar.google.com/calendar/render');
    url.searchParams.set('action', 'TEMPLATE');
    url.searchParams.set('text', title);
    url.searchParams.set('dates', `${startString}/${endString}`);
    if (location) url.searchParams.set('location', location);
    if (description) url.searchParams.set('details', description);
    return url.toString();
  }, [calendar]);

  const onToggle = () => {
    if (!hasJoined) {
      const n = count + 1;
      setHasJoined(true);
      setCount(n);
      try {
        localStorage.setItem(keyJoined, '1');
        localStorage.setItem(keyCount, String(n));
      } catch {}
      window.dispatchEvent(new CustomEvent('esla-join-change', { detail: { matchId, joined: true, count: n } }));
      setEmoji('🥳');
      setStatusText('Danke, dass du teilnimmst!');
      confetti();
      setTimeout(() => setEmoji(null), 1200);
      setTimeout(() => setStatusText(null), 3500);
    } else {
      const n = Math.max(0, count - 1);
      setHasJoined(false);
      setCount(n);
      try {
        localStorage.setItem(keyJoined, '0');
        localStorage.setItem(keyCount, String(n));
      } catch {}
      window.dispatchEvent(new CustomEvent('esla-join-change', { detail: { matchId, joined: false, count: n } }));
      setEmoji('😢');
      setStatusText(leaveText || 'Schade, dass du nicht teilnimmst!');
      setTimeout(() => setEmoji(null), 1200);
      setTimeout(() => setStatusText(null), 3500);
    }
  };

  return (
    <div ref={containerRef} className="relative inline-flex flex-row md:flex-col items-center md:items-start gap-2">
      <button
        onClick={onToggle}
        className={`${hasJoined ? 'bg-green-700 text-white' : 'bg-green-600 hover:bg-green-700 text-white'} relative px-3 sm:px-4 md:px-6 lg:px-7 py-2 rounded-full font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap md:min-w-[230px] lg:min-w-[260px]`}
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
          className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 lg:px-7 py-2 rounded-full bg-white/15 hover:bg-white/25 text-white text-xs sm:text-sm font-semibold border border-white/20 whitespace-nowrap md:min-w-[220px] lg:min-w-[260px]"
        >
         In Googlekalender öffnen
        </a>
      )}
      {statusText && (
        <span className="basis-full text-sm text-white/80 mt-1">{statusText}</span>
      )}
    </div>
  );
}
