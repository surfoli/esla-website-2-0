'use client';

import { useEffect, useMemo, useState } from 'react';

export default function LiveMini({
  startIso,
  totalMinutes = 100,
  blocks = 4,
  blockMinutes = 20,
  breakMinutes = 5,
}: {
  startIso: string;
  totalMinutes?: number;
  blocks?: number;
  blockMinutes?: number;
  breakMinutes?: number;
}) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const start = useMemo(() => new Date(startIso).getTime(), [startIso]);
  const elapsedMin = Math.max(0, Math.min(totalMinutes, Math.floor((now - start) / 60000)));
  const cycle = blockMinutes + breakMinutes; // 25

  const segments = new Array(blocks).fill(0).map((_, i) => {
    const blockStart = i * cycle; // 0,25,50,75
    const inBlock = elapsedMin - blockStart;
    const p = (inBlock - 0) / blockMinutes; // progress within the play block only
    return Math.max(0, Math.min(1, p));
  });

  return (
    <div className="flex items-center gap-2">
      <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-bold text-red-500">
        <span className="inline-block w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        LIVE
      </span>
      <div className="flex items-center gap-1">
        {segments.map((p, idx) => (
          <div key={idx} className="relative w-8 h-1.5 bg-white/20 rounded">
            <div className="absolute left-0 top-0 h-full bg-esla-primary rounded" style={{ width: `${Math.round(p * 100)}%` }} />
          </div>
        ))}
      </div>
      <span className="text-[10px] sm:text-xs text-white/80 tabular-nums">{elapsedMin}’/ {totalMinutes}</span>
    </div>
  );
}
