import { useState } from 'react';

const projectsData = [
  {
    id: "jani-chai",
    title: "JANI CHAI",
    folder: "JANI",
    faceImage: "/images/JANI/JANI1.jpg",
    description: "Premium tea brand packaging engineering and holistic visual identity mapping.",
    galleryImages: Array.from({ length: 9 }, (_, i) => `/images/JANI/JANI${i + 1}.jpg`)
  },
  {
    id: "raku-soda",
    title: "RAKU SODA",
    folder: "RAKU",
    faceImage: "/images/RAKU/Artboard 1.png",
    description: "Vibrant, high-saturation commercial soda can design and conceptual product lineup.",
    galleryImages: Array.from({ length: 8 }, (_, i) => `/images/RAKU/Artboard ${i + 1}.png`)
  },
  {
    id: "inyange-industries",
    title: "INYANGE INDUSTRIES",
    folder: "INYANGE",
    faceImage: "/images/INYANGE/INYANGE-INDUSTRIES-VISUALArtboard-1.png",
    description: "Industrial geometric juice brick carton lines and system consistency development.",
    galleryImages: Array.from({ length: 11 }, (_, i) => `/images/INYANGE/INYANGE-INDUSTRIES-VISUALArtboard-${i + 1}.png`)
  },
  {
    id: "supreme",
    title: "SUPREME",
    folder: "SUPREME",
    faceImage: "/images/SUPREME/PRESENTATIONArtboard-1.png",
    description: "Eco-pouch structure layout and bold commercial typographic identity systems for flour products.",
    galleryImages: Array.from({ length: 4 }, (_, i) => `/images/SUPREME/PRESENTATIONArtboard-${i + 1}.png`)
  },
  {
    id: "stone",
    title: "STONE",
    folder: "STONE",
    faceImage: "/images/STONE/Artboard 1.png",
    description: "Minimalist slate-charcoal personal care tubes, wipe packets, and cosmetic presentation materials.",
    galleryImages: Array.from({ length: 6 }, (_, i) => `/images/STONE/Artboard ${i + 1}.png`)
  },
  {
    id: "uhuru-clay-house",
    title: "UHURU CLAY HOUSE",
    folder: "UHURU",
    faceImage: "/images/UHURU/Artboard 1.png",
    description: "Tactile integrated print collateral, flyer systems, and learning seminar campaign designs.",
    galleryImages: Array.from({ length: 10 }, (_, i) => `/images/UHURU/Artboard ${i + 1}.png`)
  }
];

export default function Works2() {
  const [activeGallery, setActiveGallery] = useState(null);

  return (
    <section
      id="all-works"
      className="py-24 px-6 md:px-12 bg-stone-50 text-stone-950 relative overflow-hidden transition-colors duration-300"
    >

      {/* Accent Dot */}
      <div className="absolute top-12 right-8 md:right-12 w-6 h-6 rounded-full bg-[#ff4500] shadow-[0_0_20px_rgba(255,69,0,0.25)] z-20 animate-pulse" />

      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-20 select-none">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-none text-stone-950">
            ALL WORKS<span className="text-stone-400 font-light">.</span>
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

          {projectsData.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col justify-start w-full relative"
            >

              {/* Card Image */}
              <div className="w-full aspect-square bg-stone-100 overflow-hidden relative border border-stone-200/50 rounded-sm mb-4 lg:mb-6 shadow-sm">

                <img
                  src={project.faceImage}
                  alt={`${project.title} master visual showcase frame`}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out grayscale-[20%] group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Desktop Hover Overlay */}
                <div className="hidden lg:flex absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/40 transition-colors duration-500 items-center justify-center p-6">

                  <div className="text-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500 ease-out">

                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-[#ff4500] bg-stone-950/90 px-3 py-1.5 rounded-sm block mb-4 mx-auto w-max shadow-md">
                      {project.folder} COLLECTION
                    </span>

                    <button
                      onClick={() => setActiveGallery(project)}
                      className="px-6 py-3 bg-stone-50 text-stone-950 font-black uppercase text-xs tracking-widest rounded-sm shadow-xl cursor-pointer hover:bg-[#ff4500] hover:text-white transition-colors duration-300"
                    >
                      View Project
                    </button>

                  </div>

                </div>

              </div>

              {/* Content */}
              <div className="flex flex-col flex-grow justify-between">

                <div>
                  <h3 className="text-2xl font-black tracking-tight text-stone-950 uppercase leading-none">
                    {project.title}
                  </h3>

                  <p className="mt-2 text-sm text-stone-500 font-semibold tracking-tight leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                {/* Mobile Button */}
                <button
                  onClick={() => setActiveGallery(project)}
                  className="block lg:hidden w-full py-3 bg-stone-950 text-white text-center font-black uppercase text-xs tracking-widest rounded-sm transition-colors active:bg-[#ff4500] mb-6"
                >
                  View Project Collection
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

      {/* ==========================================================================
          LIGHTBOX GALLERY
      ========================================================================== */}
      {activeGallery && (
        <div className="fixed inset-0 z-50 bg-[#121212]/98 flex flex-col justify-between p-4 md:p-10 animate-fadeIn">

          {/* Header */}
          <div className="w-full flex items-center justify-between border-b border-stone-800/80 pb-4 shrink-0">

            <div>
              <h4 className="text-xl font-black uppercase tracking-tight text-stone-100 leading-none">
                {activeGallery.title}
              </h4>

              <p className="text-xs text-stone-500 font-bold uppercase tracking-wider mt-1">
                Displaying {activeGallery.galleryImages.length} Presentation Sheets
              </p>
            </div>

            <button
              onClick={() => setActiveGallery(null)}
              className="px-4 py-2 border border-stone-700 text-stone-300 font-bold uppercase text-xs tracking-widest rounded-sm hover:bg-[#ff4500] hover:text-white hover:border-[#ff4500] transition-all cursor-pointer"
            >
              Close ✕
            </button>

          </div>

          {/* Responsive Gallery Grid */}
          <div className="flex-grow my-6 overflow-y-auto overflow-x-hidden px-1 md:px-2 max-h-[75vh]">

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">

              {activeGallery.galleryImages.map((imgSrc, index) => (
                <div
                  key={index}
                  className="group/item relative bg-stone-900/40 border border-stone-800/50 rounded-sm overflow-hidden shadow-2xl transition-all duration-500 hover:-translate-y-1 hover:border-[#ff4500]/60 hover:shadow-[0_10px_30px_rgba(255,69,0,0.12)]"
                >

                  {/* Image */}
                  <div className="relative overflow-hidden bg-black">

                    <img
                      src={imgSrc}
                      alt={`Asset presentation sheet frame index ${index + 1}`}
                      className="w-full h-auto object-cover transition-transform duration-700 ease-out group-hover/item:scale-[1.04]"
                      loading="lazy"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover/item:bg-black/10 transition-colors duration-500" />

                    {/* Hover Label */}
                    <div className="absolute bottom-3 left-3 opacity-0 translate-y-3 group-hover/item:opacity-100 group-hover/item:translate-y-0 transition-all duration-500">

                      <span className="px-3 py-1 bg-[#ff4500] text-white text-[10px] font-black uppercase tracking-[0.25em] rounded-sm shadow-lg">
                        Sheet {index + 1}
                      </span>

                    </div>

                  </div>

                  {/* Footer */}
                  <div className="px-3 py-3 flex justify-between items-center text-[9px] font-bold text-stone-500 tracking-[0.2em] uppercase">

                    <span>
                      {index + 1} / {activeGallery.galleryImages.length}
                    </span>

                    <span className="text-stone-600">
                      {activeGallery.folder}
                    </span>

                  </div>

                </div>
              ))}

            </div>

          </div>

          {/* Footer Line */}
          <div className="w-full pt-4 border-t border-stone-900 text-center shrink-0">

            <span className="text-[10px] font-black tracking-widest text-stone-600 uppercase">
              ARJO STUDIOS SYSTEM CONSISTENCY MATRIX — ALL RIGHTS RESERVED
            </span>

          </div>

        </div>
      )}

    </section>
  );
}