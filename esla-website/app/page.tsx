import Navbar from '@/components/navigation/Navbar';
import UpcomingMatchesServer from '@/components/hero/UpcomingMatchesServer';
import MatchResultsServer from '@/components/matches/MatchResultsServer';
import GermanyCupBanner from '@/components/banner/GermanyCupBanner';
import Footer from '@/components/footer/Footer';
import StatsOverviewServer from '@/components/hero/StatsOverviewServer';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <UpcomingMatchesServer />
      <MatchResultsServer />
      <StatsOverviewServer compact />
      <GermanyCupBanner />
      <Footer />
    </main>
  );
}