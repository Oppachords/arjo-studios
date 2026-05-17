const structuralServices = [
  {
    num: "01",
    title: "Visual Identity", // [cite: 58]
    deliverables: ["Logo Design & Custom Lockups", "Curated Brand Color Palettes", "System Typography Specifications", "Digital & Brand Imagery Guidelines"] // [cite: 58]
  },
  {
    num: "02",
    title: "Packaging Design", // [cite: 59]
    deliverables: ["Comprehensive SKU System Layouts", "Commercial Product Label Design", "Material & Finish Engineering", "Photorealistic 3D Component Mockups"] // [cite: 60, 61]
  },
  {
    num: "03",
    title: "Brand Collateral Design", // [cite: 62]
    deliverables: ["High-Impact Marketing Posters", "Event Promotional Flyers", "Business Cards & Stationery Systems", "Editorial Corporate Brochures"] // [cite: 63, 64]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-32 px-6 bg-zinc-950 border-t border-stone-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Headline Label [cite: 25, 26] */}
        <div className="mb-20">
          <span className="text-xs font-bold tracking-[0.3em] text-stone-500 uppercase block mb-2">Our Capabilities</span>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">Our Services<span className="text-stone-700">.</span></h2>
        </div>

        {/* Capability Layout Rows */}
        <div className="space-y-0 divide-y divide-stone-900 border-t border-b border-stone-900">
          {structuralServices.map((service) => (
            <div key={service.num} className="grid grid-cols-1 lg:grid-cols-12 py-12 group hover:bg-stone-900/10 transition-colors px-4 duration-300">
              {/* Service Prefix Identifier */}
              <div className="lg:col-span-2 text-stone-600 font-mono text-sm mb-4 lg:mb-0">
                {service.num} //
              </div>
              
              {/* Service Focus Heading */}
              <div className="lg:col-span-4 text-2xl font-bold uppercase tracking-tight text-stone-100 group-hover:text-[--color-brand-gold] transition-colors">
                {service.title}
              </div>

              {/* Sub-item Content Deliverables Grid */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 lg:mt-0">
                {service.deliverables.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm text-stone-400">
                    <span className="w-1 h-1 bg-stone-700 rounded-full"></span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Branding Case Study Snippet: Uhuru Clay House Pottery Master Class [cite: 27, 28, 30] */}
        <div className="mt-24 bg-stone-900/20 border border-stone-900 p-8 md:p-12 rounded-sm flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <span className="text-[10px] font-bold tracking-widest text-emerald-600 uppercase border border-emerald-900/50 bg-emerald-950/20 px-2 py-0.5 rounded-sm">
              Featured Case Study: Uhuru Clay House [cite: 27, 28]
            </span>
            <h3 className="text-xl font-bold uppercase tracking-tight text-stone-200 mt-4">
              Integrated Campaign: Pottery Master Class [cite: 30]
            </h3>
            <p className="mt-2 text-sm text-stone-400 leading-relaxed">
              Designed to introduce participants to a relaxing and creative process, delivering complete system consistency across print flyers, brand cards, and tactile physical collateral[cite: 7, 48, 62].
            </p>
          </div>
          <div className="w-full md:w-auto shrink-0">
            <a href="#works" className="block w-full text-center px-6 py-3 border border-stone-800 text-xs font-bold uppercase tracking-widest text-stone-300 hover:border-stone-600 hover:text-stone-100 transition-colors">
              Read Case Breakdown
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}