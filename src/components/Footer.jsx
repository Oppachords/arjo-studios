export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="bg-[#121212] text-white pt-32 pb-6 px-6 md:px-12 overflow-hidden relative">
      <div className="max-w-[1600px] mx-auto flex flex-col justify-between">
        
        {/* Main Section Grid: Big Typography & Contact Hook */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative">
          
          {/* Left Block: Massive Brutalist Brand Typo with subtle vertical stretch */}
          <div className="lg:col-span-8 flex flex-col font-black text-[12vw] sm:text-[11vw] uppercase tracking-tighter leading-[0.76] select-none text-stone-800/60 transform scale-y-115 origin-top-left">
            <span className="relative">
              ARJO
              {/* Year Stamp sitting tightly below the letter A */}
              <span className="absolute left-1 bottom-[-3.5vw] font-mono text-xs sm:text-sm font-bold tracking-normal text-stone-200 scale-y-85">
                2026
              </span>
            </span>
            {/* Exactly aligned and offset beneath the O in ARJO */}
            <span className="pl-[2.2ch] text-stone-700/50">STUDIOS</span>
          </div>
          
          {/* Right Block: Project Inquiries Callout */}
          <div className="lg:col-span-4 lg:text-right flex flex-col lg:items-end justify-start pt-6 lg:pt-[2.5vw] lg:absolute lg:right-0 lg:top-0">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-stone-100 leading-none">
              Get in touch
            </h2>
            <a 
              href="mailto:arjostudio1@gmail.com" 
              className="text-lg sm:text-xl md:text-2xl font-bold text-stone-500 hover:text-stone-300 transition-colors tracking-tight break-all mt-1"
            >
              arjostudio1@gmail.com
            </a>
          </div>
        </div>

        {/* Small Dual Intersecting Marquee Track (Tightened margins to collapse space) */}
        <div className="w-full overflow-hidden select-none border-t border-b border-stone-900/60 py-4 mt-28 mb-4 pointer-events-none relative h-16 flex flex-col justify-center gap-1">
          {/* Upper Micro Track: Left to Right */}
          <div className="w-full flex justify-center">
            <div className="animate-intersect-left text-stone-700/40 font-bold text-[12px] uppercase tracking-[0.2em] whitespace-nowrap">
              arjo studios &nbsp;•&nbsp; packaging systems &nbsp;•&nbsp; visual identity &nbsp;•&nbsp; brand layout consistency
            </div>
          </div>
          {/* Lower Micro Track: Right to Left */}
          <div className="w-full flex justify-center">
            <div className="animate-intersect-right text-stone-500/30 font-bold text-[12px] uppercase tracking-[0.2em] whitespace-nowrap">
              every detail is engineered for impact &nbsp;•&nbsp; system architecture &nbsp;•&nbsp; creative studio
            </div>
          </div>
        </div>

        {/* Minimal Legals Footer Base Line (Now flush with the marquee container) */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-stone-900 text-[10px] font-bold tracking-widest uppercase text-stone-600 gap-4">
          <p>© {currentYear} ARJO STUDIOS. All Rights Reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-stone-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-stone-400 transition-colors">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  );
}