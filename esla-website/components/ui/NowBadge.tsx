'use client';

import { useEffect, useState } from 'react';

export default function NowBadge({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const text = new Intl.DateTimeFormat('de-CH', {
    weekday: 'short',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm ${className}`}>
      <span className="inline-block w-2 h-2 rounded-full bg-esla-primary" />
      <span className="font-semibold">{text}</span>
    </div>
  );
}
