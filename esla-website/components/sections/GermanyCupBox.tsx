import Image from 'next/image';
import Container from '@/components/ui/Container';

export default function GermanyCupBox() {
  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="w-full">
          <div className="bg-black border border-black rounded-2xl p-8 text-white transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]">
            {/* Header */}
            <div className="text-center mb-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-white/70 mb-5">
                ESLA nimmt teil am
              </p>
              <div className="mx-auto mb-6 flex h-48 w-48 sm:h-56 sm:w-56 items-center justify-center rounded-full bg-white shadow-xl ring-2 ring-inset ring-[#e2c218]/50 border border-[#e2c218]/20 transition-transform duration-300 hover:scale-105">
                <a href="/germany-cup" className="block">
                  <Image
                    src="/images/germany-cup-logo.avif"
                    alt="Germany Cup Logo"
                    width={288}
                    height={288}
                    className="h-40 w-40 sm:h-48 sm:w-48 object-contain"
                    priority
                  />
                </a>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                GERMANY <span className="text-[#e2c218]">CUP</span> 2026
              </h2>
              <p className="text-white/95 text-lg leading-relaxed max-w-2xl mx-auto font-bold">
                Das internationale Jugendfussballturnier findet deutschlandweit statt. 
                Seid dabei, wenn ESLA 2026 in München gegen Mannschaften aus ganz Europa antritt!
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="font-bold text-white text-3xl mb-1">3000+</p>
                  <p className="text-white/80 text-lg font-bold">Mannschaften</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="font-bold text-white text-3xl mb-1">21+</p>
                  <p className="text-white/80 text-lg font-bold">Nationen</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-white/10 rounded-xl p-5">
                  <p className="font-bold text-white text-3xl mb-1">3 Tage</p>
                  <p className="text-white/80 text-lg font-bold">Fussball-Festival</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <a 
                href="/germany-cup"
                className="inline-flex items-center gap-2 text-[#e2c218] font-bold text-lg hover:gap-3 transition-all group"
              >
                <span>Alle Details zum Germany Cup</span>
                <svg 
                  className="w-5 h-5 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
