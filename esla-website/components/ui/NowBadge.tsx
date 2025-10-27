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

  return (
    <div className={`inline-flex items-center justify-center gap-2 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full bg-white/10 border border-white/10 text-white text-xs sm:text-sm whitespace-nowrap ${className}`}>
      <span className="font-semibold" suppressHydrationWarning>
        Aktuell: {datePart}
      </span>
      <span className="font-semibold" suppressHydrationWarning>
        {timePart} Uhr
      </span>
    </div>
  );
}
