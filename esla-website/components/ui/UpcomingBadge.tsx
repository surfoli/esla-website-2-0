'use client';

export default function UpcomingBadge(
  { date, time, className = '' }: { date: string; time?: string; className?: string }
) {
  const label = (() => {
    const now = new Date();
    const t = time && time.length >= 4 ? time : '00:00';
    const target = new Date(`${date}T${t}:00`);
    const diffMs = target.getTime() - now.getTime();
    const dayMs = 24 * 60 * 60 * 1000;
    if (diffMs <= 0) return 'Heute';
    if (diffMs < dayMs) return 'Heute';
    const days = Math.ceil(diffMs / dayMs);
    return days === 1 ? 'In 1 Tag' : `In ${days} Tagen`;
  })();

  return (
    <span className={`inline-flex items-center text-xs sm:text-sm font-bold uppercase tracking-wide px-2 py-0.5 rounded-full bg-white/10 text-white ${className}`}>
      {label}
    </span>
  );
}


