import Navbar from '@/components/navigation/Navbar';
import UpcomingMatchesServer from '@/components/hero/UpcomingMatchesServer';
import MatchesPreviewServer from '@/components/spiele/MatchesPreviewServer';
import ResultsTickerBanner from '@/components/banner/ResultsTickerBanner';
import GermanyCupBox from '@/components/sections/GermanyCupBox';
import SocialMediaSection from '@/components/social/SocialMediaSection';
import Footer from '@/components/footer/Footer';
import EslaStorySection from '@/components/sections/EslaStorySection';

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <UpcomingMatchesServer />
      <ResultsTickerBanner />
      <MatchesPreviewServer />
      <EslaStorySection />
      <GermanyCupBox />
      <SocialMediaSection />
      
      <Footer />
    </main>
  );
}