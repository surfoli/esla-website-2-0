'use client';

import { useEffect, useState } from 'react';

export default function Countdown({ iso, variant = 'small' }: { iso: string; variant?: 'small' | 'large' | 'compact' }) {
  const [left, setLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

  useEffect(() => {
    const targetDate = new Date(iso);
    const target = Number.isNaN(targetDate.getTime()) ? Date.now() : targetDate.getTime();
    const tick = () => {
      const now = Date.now();
      const diff = Math.max(0, target - now);
      setLeft({
        d: Math.floor(diff / (1000 * 60 * 60 * 24)),
        h: Math.floor((diff / (1000 * 60 * 60)) % 24),
        m: Math.floor((diff / (1000 * 60)) % 60),
        s: Math.floor((diff / 1000) % 60),
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [iso]);

  const box = variant === 'large'
    ? 'min-w-[90px] md:min-w-[120px] p-4 md:p-6'
    : variant === 'compact'
      ? 'min-w-[72px] md:min-w-[90px] p-3 md:p-4'
      : 'min-w-[60px] p-3';
  const num = variant === 'large'
    ? 'text-3xl md:text-5xl'
    : variant === 'compact'
      ? 'text-2xl md:text-4xl'
      : 'text-xl';
  const label = variant === 'large'
    ? 'text-xs md:text-sm'
    : variant === 'compact'
      ? 'text-[10px] md:text-xs'
      : 'text-[10px]';

  return (
    <div className="flex gap-3 md:gap-4">
      {[['Tage', left.d], ['Std', left.h], ['Min', left.m], ['Sek', left.s]].map(([k, v]) => (
        <div key={k as string} className={`bg-white/10 backdrop-blur-xl rounded-2xl border border-white/10 text-center shadow-md shadow-black/20 ${box}`}>
          <div className={`text-esla-primary font-black mb-1 ${num}`}>{String(v as number).padStart(2, '0')}</div>
          <div className={`text-white/80 uppercase tracking-wider font-semibold ${label}`}>{k}</div>
        </div>
      ))}
    </div>
  );
}
