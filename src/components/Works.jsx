import { useState } from 'react';

const featuredProjects = [
  {
    id: "jani-chai",
    title: "Jani Chai",
    category: "Visual Identity / Packaging Design",
    tag: "tea brand",
    imagePath: "/images/JANI/JANI1.jpg",
    galleryImages: Array.from({ length: 9 }, (_, i) => `/images/JANI/JANI${i + 1}.jpg`)
  },
  {
    id: "raku-soda",
    title: "RAKU Soda",
    category: "Visual Identity / Packaging Design",
    tag: "Soda Cans",
    imagePath: "/images/RAKU/Artboard 1.png",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/RAKU/Artboard ${i + 1}.png`)
  },
  {
    id: "stone-wipes",
    title: "STONE WIPES",
    category: "Product Line Identity",
    tag: "Hand Lotion & Men's Wipes",
    imagePath: "/images/STONE/Artboard 1.png",
    galleryImages: Array.from({ length: 6 }, (_, i) => `/images/STONE/Artboard ${i + 1}.png`)
  }
];

export default function Works() {
  const [activeGallery, setActiveGallery] = useState(null);

  return (
    <section id="selected-works" className="py-24 px-6 md:px-12 bg-stone-50 text-stone-950 relative overflow-hidden transition-colors duration-300 border-b border-stone-200/60">
      
      {/* High-saturation neon orange accent dot in top right corner */}
      <div className="absolute top-12 right-8 md:right-12 w-6 h-6 rounded-full bg-[#ff4500] shadow-[0_0_20px_rgba(255,69,0,0.25)] z-20 animate-pulse" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-black tracking-[0.3em] text-stone-400 uppercase block mb-2">Portfolio Focus</span>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight text-stone-950">
              Selected <br />Works<span className="text-stone-300 font-light">.</span>
            </h2>
          </div>
          <span className="text-xs font-bold uppercase tracking-widest text-stone-400 border-b border-stone-200 pb-2">
            Showcasing Studio System Consistency
          </span>
        </div>

        {/* 3-Column Image Layout Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group relative flex flex-col justify-between p-6 bg-white border border-stone-200/80 rounded-sm overflow-hidden shadow-sm transition-all duration-500 hover:border-stone-400 hover:shadow-md"
            >
              {/* Card Meta Top Row */}
              <div className="flex justify-between items-start z-10 mb-6">
                <div>
                  <p className="text-[10px] font-black tracking-widest text-stone-400 uppercase">{project.category}</p>
                  <h3 className="text-xl font-black tracking-tight text-stone-950 uppercase mt-1">{project.title}</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 border border-stone-200 text-stone-500 font-bold uppercase tracking-wider bg-stone-50 rounded-sm">
                  {project.tag}
                </span>
              </div>

              {/* Central Image Container Wrapper with Hover Zoom */}
              <div className="my-2 w-full aspect-square bg-stone-50 overflow-hidden relative border border-stone-100 rounded-sm">
                <img 
                  src={project.imagePath} 
                  alt={`${project.title} curated presentation display frame`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Action Base Trigger Button - Connects directly to Modal State */}
              <button 
                onClick={() => setActiveGallery(project)}
                className="w-full mt-6 pt-4 border-t border-stone-100 flex items-center justify-between z-10 cursor-pointer text-left focus:outline-none group/btn"
              >
                <span className="text-xs font-black uppercase tracking-wider text-stone-500 group-hover:text-stone-950 transition-colors">
                  View Specifications
                </span>
                <span className="transform translate-x-[-6px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all text-[#ff4500] font-bold">
                  →
                </span>
              </button>
            </div>
          ))}
        </div>

      </div>

      {/* ==========================================================================
         Shared Lightbox Gallery Modal Window System
         ========================================================================== */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 bg-[#121212]/95 backdrop-blur-md flex flex-col justify-between p-6 md:p-12 animate-fadeIn">
          
          {/* Lightbox Top Header Actions bar */}
          <div className="w-full flex items-center justify-between border-b border-stone-800 pb-6">
            <div>
              <h4 className="text-xl font-black uppercase tracking-tight text-stone-100 leading-none">
                {activeGallery.title} — SPECIFICATIONS
              </h4>
              <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mt-1">
                Displaying {activeGallery.galleryImages.length} system sheets
              </p>
            </div>
            
            <button 
              onClick={() => setActiveGallery(null)}
              className="px-4 py-2 border border-stone-700 text-stone-300 font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-stone-100 hover:text-black hover:border-white transition-all cursor-pointer"
            >
              Close Window ✕
            </button>
          </div>

          {/* Scrollable Visual Asset Strip Grid */}
          <div className="flex-grow my-8 overflow-y-auto pr-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start max-h-[70vh]">
            {activeGallery.galleryImages.map((imgSrc, index) => (
              <div 
                key={index} 
                className="w-full aspect-auto bg-neutral-900 border border-stone-800/60 rounded-sm overflow-hidden shadow-lg"
              >
                <img 
                  src={imgSrc} 
                  alt={`Asset layout array unit index ${index + 1}`}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            ))}
          </div>

          {/* Modal Base Line Context */}
          <div className="w-full pt-4 border-t border-stone-800 text-center">
            <span className="text-[10px] font-black tracking-widest text-stone-600 uppercase">
              ARJO STUDIOS ARCHITECTURE PLATFORM — ALL RIGHTS RESERVED
            </span>
          </div>

        </div>
      )}
    </section>
  );
}