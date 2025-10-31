import Navbar from '@/components/navigation/Navbar';
import Footer from '@/components/footer/Footer';
import LuqmonBio from '@/components/team/LuqmonBio';

export default function LuqmonPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <LuqmonBio />
      
      <Footer />
    </main>
  );
}
