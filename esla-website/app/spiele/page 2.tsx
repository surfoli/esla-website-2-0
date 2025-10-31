import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import MatchResults from '@/components/matches/MatchResults';

export default function SpielePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <Navbar />

      <div className="pt-32 pb-20">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16 bg-esla-secondary text-white p-10 rounded-3xl">
            <h1 className="text-5xl md:text-7xl font-black text-white">
              ALLE <span className="text-esla-primary">SPIELE</span>
            </h1>
          </div>

          {/* All Matches */}
          <MatchResults />
        </div>
      </div>

      <Footer />
    </main>
  );
}
