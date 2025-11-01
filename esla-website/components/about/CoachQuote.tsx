import Image from 'next/image';
import Link from 'next/link';
import Container from '@/components/ui/Container';

export default function CoachQuote() {
  return (
    <section className="bg-gradient-to-l from-esla-primary to-black py-20 md:py-24">
      <Container>
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-12">
          <Link
            href="/team/luqmon"
            aria-label="Zur Biografie von Luqmon Adekunle"
            className="relative w-52 h-52 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white/40 shadow-2xl flex-shrink-0 transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80"
          >
            <Image
              src="/images/esla-profilbild-staff-cheftrainer-luqmon-adekunle.jpg"
              alt="Luqmon Adekunle"
              fill
              className="object-cover"
            />
          </Link>
          <div className="text-white flex-1">
            <p className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mb-6">
              &quot;Gemeinsam entwickeln wir Champions, auf und neben dem Platz.&quot;
            </p>
            <p className="text-white/90 text-lg md:text-xl lg:text-2xl mb-6 leading-relaxed">
              &quot;Wir arbeiten hart, professionell und mit einem klaren Ziel: Spieler zu entwickeln, die nicht nur technisch stark sind, sondern auch charakterlich.&quot;
            </p>
            <p className="text-white/70 text-base md:text-lg italic">
              Luqmon, Cheftrainer, ESLA
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
