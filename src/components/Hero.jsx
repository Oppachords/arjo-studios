export default function Hero() {
  return (
    <section id="about" className="relative min-h-screen flex items-center pt-32 pb-20 px-6 bg-stone-50 text-stone-900 transition-colors duration-300 overflow-hidden">
      
      {/* Editorial Watermark Background Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 overflow-hidden">
        <img 
          src="/images/STONE/Artboard 6.png" 
          alt="Arjo Studios conceptual design sheet overlay"
          className="w-full h-full object-cover opacity-30 mix-blend-multiply filter contrast-105"
        />
        {/* Subtle radial gradient overlay to gently wash out the edges and protect legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-stone-50/50 via-transparent to-stone-50/30" />
      </div>

      {/* Upscaled and brightened neon orange accent dot */}
      <div className="absolute top-32 right-8 md:right-16 w-6 h-6 rounded-full bg-[#ff4500] shadow-[0_0_20px_rgba(255,69,0,0.2)] opacity-95 animate-pulse z-10" />

      {/* Structural layout matching the editorial grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 w-full relative z-10">
        
        {/* Left Side: Core Manifesto Statement */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-stone-950 max-w-3xl">
            Arjo Studios builds brands that take up space.
          </h1>
          <p className="mt-4 text-xl sm:text-2xl font-bold tracking-tight text-stone-950 max-w-xl">
            visually, physically, and commercially.
          </p>
        </div>

        {/* Right Side: Engineering & Navigation Callout */}
        <div className="lg:col-span-4 flex flex-col justify-end lg:pb-4 border-t lg:border-t-0 lg:border-l border-stone-200 pt-8 lg:pt-0 lg:pl-8">
          <p className="text-base md:text-lg text-stone-800 leading-relaxed font-semibold tracking-tight">
            Every detail is engineered for impact, from shelf presence to system consistency, so your product doesn't just sit there.
          </p>
          <div className="mt-8 flex">
            <a href="#works" className="group flex items-center gap-2 text-xs font-black uppercase tracking-widest text-stone-950 hover:opacity-60 transition-opacity">
              explore our portfolio
              <span className="transform group-hover:translate-x-1 transition-transform font-normal">→</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}