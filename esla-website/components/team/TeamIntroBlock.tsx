import Section from '@/components/ui/Section';
import Container from '@/components/ui/Container';

export default function TeamIntroBlock() {
  return (
    <Section className="bg-white py-8 md:py-12" noContainer>
      <Container>
        <div className="w-full">
          <div className="bg-esla-secondary rounded-xl p-6 md:p-8 text-white shadow-lg">
            <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h3 className="text-2xl md:text-3xl font-black mb-4">
                  UNSERE <span className="text-esla-primary">WERTE</span>
                </h3>
                <div className="space-y-3 text-white/90">
                  <p className="font-semibold">
                    <span className="text-esla-primary">●</span> Leidenschaft für den Sport
                  </p>
                  <p className="font-semibold">
                    <span className="text-esla-primary">●</span> Teamgeist und Zusammenhalt
                  </p>
                  <p className="font-semibold">
                    <span className="text-esla-primary">●</span> Fair Play und Respekt
                  </p>
                  <p className="font-semibold">
                    <span className="text-esla-primary">●</span> Ehrgeiz und Siegeswille
                  </p>
                  <p className="font-semibold">
                    <span className="text-esla-primary">●</span> Gemeinschaft und Integration
                  </p>
                </div>
                <div className="mt-6">
                  <p className="text-sm text-white/80 italic">
                    "Zusammen sind wir stärker - auf und neben dem Platz!"
                  </p>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-esla-primary rounded-lg blur-xl opacity-50"></div>
                  <img
                    src="/images/luqmon.jpg"
                    alt="Luqmon - ESLA Team"
                    className="relative rounded-lg shadow-2xl w-full max-w-xs md:max-w-md h-auto object-cover"
                    onError={(e) => {
                      // Fallback wenn Bild nicht gefunden wird
                      const target = e.target as HTMLImageElement;
                      target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300' viewBox='0 0 300 300'%3E%3Crect width='300' height='300' fill='%23e74c3c'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='white' font-family='Arial' font-size='24'%3ELuqmon%3C/text%3E%3C/svg%3E";
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
