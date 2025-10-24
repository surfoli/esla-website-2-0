export default function FilterBar({ statusParam, teamParam, pageSize }: { statusParam: string; teamParam: string; pageSize: number; }) {
  return (
    <div className="mt-6 flex flex-col items-center gap-3">
      {/* Status Filter (GET Form) */}
      <form action="/spiele" method="get" className="flex flex-wrap justify-center gap-2">
        <input type="hidden" name="team" value={teamParam} />
        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="pageSize" value={String(pageSize)} />
        {[
          { label: 'Alle', v: 'all' },
          { label: 'Zukünftige', v: 'upcoming' },
          { label: 'Abgeschlossene', v: 'finished' },
        ].map(({ label, v }) => (
          <button
            key={v}
            type="submit"
            name="status"
            value={v}
            className={`px-4 py-2 rounded-full border ${statusParam === v ? 'bg-esla-primary text-white border-white/20' : 'text-white border-white/20 hover:bg-white/10'}`}
          >
            {label}
          </button>
        ))}
      </form>

      {/* Team Filter (GET Form) */}
      <form action="/spiele" method="get" className="flex flex-wrap justify-center gap-2">
        <input type="hidden" name="status" value={statusParam} />
        <input type="hidden" name="page" value="1" />
        <input type="hidden" name="pageSize" value={String(pageSize)} />
        {[
          { label: 'Alle Teams', v: 'all' },
          { label: 'ESLA 7', v: 'esla7' },
          { label: 'ESLA 9', v: 'esla9' },
          { label: 'ESLA EA', v: 'eslaea' },
        ].map(({ label, v }) => (
          <button
            key={v}
            type="submit"
            name="team"
            value={v}
            className={`px-4 py-2 rounded-full border ${teamParam === v ? 'bg-white/10 text-white border-white/20' : 'text-white border-white/20 hover:bg-white/10'}`}
          >
            {label}
          </button>
        ))}
      </form>
    </div>
  );
}
