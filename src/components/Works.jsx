const featuredProjects = [
  {
    id: 'jani-chai',
    title: 'Jani Chai', // [cite: 23, 67]
    category: 'Visual Identity / Packaging Design', // [cite: 13]
    tag: 'tea brand', // [cite: 23]
    bgClass: 'bg-stone-900',
    imgPlaceholder: '📦 [Jani Chai Craft Cup Mockup]' // Matches Page 2 holding layout [cite: 17]
  },
  {
    id: 'raku-soda',
    title: 'RAKU Soda', // [cite: 24, 68]
    category: 'Visual Identity / Packaging Design', // [cite: 13]
    tag: 'Soda Cans', // [cite: 24]
    bgClass: 'bg-amber-500/10 border border-amber-500/20',
    imgPlaceholder: '🥤 [Raku Citrus Blast Can Sequence]' // Matches Page 2 yellow background sphere circle [cite: 22]
  },
  {
    id: 'supreme-flour',
    title: 'SUPREME FLOUR', // [cite: 69, 70]
    category: 'Packaging Design', // [cite: 59]
    tag: 'All Purpose Flour Bag', // [cite: 70]
    bgClass: 'bg-stone-950 border border-stone-900',
    imgPlaceholder: '🌾 [Supreme Red & Green Standing Eco-Pouches]' // Matches Page 4 packaging [cite: 75]
  },
  {
    id: 'stone-wipes',
    title: 'STONE WIPES', // [cite: 72, 74]
    category: 'Product Line Identity',
    tag: 'Hand Lotion & Men\'s Wipes', // [cite: 73, 74]
    bgClass: 'bg-neutral-900',
    imgPlaceholder: '⛰️ [Stone Minimalist Charcoal Tubes]' // Matches Page 4 cosmetic mockups [cite: 86]
  },
  {
    id: 'inyange-orange',
    title: 'INYANGE ORANGE', // [cite: 76]
    category: 'Packaging Design', // [cite: 59]
    tag: 'Juice Carton Line', // [cite: 78, 79]
    bgClass: 'bg-orange-500/5 border border-orange-500/10',
    imgPlaceholder: '🍊 [Inyange 1LTR Geometric Brick Carton]' // Matches Page 4 layout [cite: 77]
  }
];

export default function Works() {
  return (
    <section id="works" className="py-32 px-6 bg-zinc-950 border-t border-stone-900/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header [cite: 9, 10] */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-bold tracking-[0.3em] text-stone-500 uppercase block mb-2">Portfolio Focus</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              Selected <br />Works<span className="text-stone-700">.</span>
            </h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-700 pb-2">
            Showcasing Studio System Consistency [cite: 7]
          </span>
        </div>

        {/* Dynamic Editorial Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col justify-between p-8 min-h-[480px] bg-stone-900/30 border border-stone-900 rounded-sm overflow-hidden transition-all duration-500 hover:border-stone-700 hover:bg-stone-900/50"
            >
              {/* Card Meta Top */}
              <div className="flex justify-between items-start z-10">
                <div>
                  <p className="text-[10px] font-bold tracking-widest text-stone-500 uppercase">{project.category}</p>
                  <h3 className="text-2xl font-black tracking-tight text-stone-100 uppercase mt-1">{project.title}</h3>
                </div>
                <span className="text-[10px] px-2 py-1 border border-stone-800 text-stone-400 uppercase tracking-wider bg-zinc-950">
                  {project.tag}
                </span>
              </div>

              {/* Central Mockup Visual Container Placeholder */}
              <div className={`my-8 w-full h-56 flex items-center justify-center rounded-sm ${project.bgClass} transition-transform duration-700 group-hover:scale-102`}>
                <span className="text-sm font-medium tracking-wide text-stone-400 group-hover:text-stone-200 transition-colors">
                  {project.imgPlaceholder}
                </span>
              </div>

              {/* Action Base Trigger */}
              <div className="pt-4 border-t border-stone-900/80 flex items-center justify-between z-10">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-400 group-hover:text-stone-100 transition-colors">
                  View Specifications
                </span>
                <span className="transform translate-x-[-10px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-stone-300">
                  →
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}