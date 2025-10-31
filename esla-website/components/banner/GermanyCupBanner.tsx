export default function GermanyCupBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-yellow-400 via-yellow-500 to-black">
      {/* Gradient Overlay for smooth transition */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-600/20 to-black/40" />
      
      {/* Content */}
      <div className="relative z-10 px-6 py-8 md:px-12 md:py-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Left side - Title */}
            <div className="flex items-center gap-x-4">
              <div className="bg-black/20 p-4 rounded-full backdrop-blur-sm">
                <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
                  <span className="text-black font-black text-xl">🏆</span>
                </div>
              </div>
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-black mb-2">
                  Germany <span className="text-yellow-300">Cup</span>
                </h2>
                <p className="text-black/80 font-semibold text-lg">
                  ESLA Elite Soccer Academy
                </p>
              </div>
            </div>
            
            {/* Right side - Achievement */}
            <div className="text-center md:text-right">
              <div className="bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-yellow-400/30">
                <p className="text-yellow-300 font-bold text-xl mb-1">
                  Turnier-Teilnahme 2025
                </p>
                <p className="text-black/90 font-semibold">
                  Internationale Wettbewerbe
                </p>
              </div>
            </div>
          </div>
          
          {/* Bottom tagline */}
          <div className="mt-6 text-center">
            <p className="text-black/70 font-medium text-sm">
              Wir kämpfen um den Sieg • Wir spielen mit Herz • Wir sind ESLA
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/40 rounded-full blur-3xl" />
    </div>
  );
}
