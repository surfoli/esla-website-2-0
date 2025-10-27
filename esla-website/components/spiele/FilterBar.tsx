 

export default function FilterBar({ statusParam, teamParam, pageSize }: { statusParam: string; teamParam: string; pageSize: number; }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      {/* Status Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: 'Alle', v: 'all' },
          { label: 'Anstehende', v: 'upcoming' },
          { label: 'Beendete', v: 'finished' },
        ].map(({ label, v }) => {
          const href = `/spiele?status=${v}&team=${teamParam}&page=1&pageSize=${pageSize}`;
          const active = statusParam === v;
          return (
            <a
              key={v}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`px-4 py-2 rounded-full border ${active ? 'bg-red-600 text-white border-transparent' : 'text-white border-white/20 hover:bg-white/10'}`}
            >
              {label}
            </a>
          );
        })}
      </div>

      {/* Team Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {[
          { label: 'Alle Teams', v: 'all' },
          { label: 'ESLA 7', v: 'esla7' },
          { label: 'ESLA 9', v: 'esla9' },
          { label: 'ESLA EA', v: 'eslaea' },
        ].map(({ label, v }) => {
          const href = `/spiele?status=${statusParam}&team=${v}&page=1&pageSize=${pageSize}`;
          const active = teamParam === v;
          return (
            <a
              key={v}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`px-4 py-2 rounded-full border ${active ? 'bg-red-600 text-white border-transparent' : 'text-white border-white/20 hover:bg-white/10'}`}
            >
              {label}
            </a>
          );
        })}
      </div>
    </div>
  );
}
