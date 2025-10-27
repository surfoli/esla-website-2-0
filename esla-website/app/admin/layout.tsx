export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-black">
      <div className="pt-28 pb-16 px-4">
        <div className="max-w-[1200px] xl:max-w-[1320px] mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
}
