'use client';

import { useEffect, useState } from 'react';

export default function NowBadge({ className = '' }: { className?: string }) {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const datePart = new Intl.DateTimeFormat('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(now);
  const timePart = new Intl.DateTimeFormat('de-CH', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);
  const text = `Aktuell: ${datePart} · ${timePart} Uhr`;

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-sm ${className}`}>
      <span className="font-semibold" suppressHydrationWarning>{text}</span>
    </div>
  );
}
