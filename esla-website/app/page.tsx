import Navbar from '@/components/navigation/Navbar';
import UpcomingMatchesServer from '@/components/hero/UpcomingMatchesServer';
import MatchesPreviewServer from '@/components/spiele/MatchesPreviewServer';
import GermanyCupBanner from '@/components/banner/GermanyCupBanner';
import Footer from '@/components/footer/Footer';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <UpcomingMatchesServer />
      <MatchesPreviewServer />
      <GermanyCupBanner />
      <Footer />
    </main>
  );
}