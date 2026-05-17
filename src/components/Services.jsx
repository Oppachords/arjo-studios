const serviceCatalog = [
  {
    id: "visual-identity",
    title: "Visual identity", // [cite: 13, 58]
    subText: "Logo . color palette . typography . imagery", // [cite: 58]
    imagePath: "/images/UHURU/Artboard 10.png", 
    altText: "Uhuru Clay House Pottery Master Class flyer system" // [cite: 27, 28, 30]
  },
  {
    id: "packaging-design",
    title: "Packaging design", // [cite: 13, 59]
    subText: "SKU System . Label Design . Material & Finish Selection . 3D Mockups", // [cite: 60, 61]
    imagePath: "/images/JANI/BAG 2.png",
    altText: "Jani Chai structural packaging bags with custom graphics" // [cite: 50]
  },
  {
    id: "brand-collateral",
    title: "Brand Collateral design", // [cite: 62]
    subText: "Posters . Flyers . Business Cards . Brochures . Stationery", // [cite: 63, 64]
    imagePath: "/images/INYANGE/INYANGE-INDUSTRIES-VISUALArtboard-10.png",
    altText: "Elevated Mind Spirit minimal editorial layout layout" // [cite: 51, 52, 57]
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 md:px-12 bg-stone-50 text-stone-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Massive 2-Line Stacked Header */}
        <div className="mb-16 select-none">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight leading-[0.82] text-stone-950">
            OUR <br />
            SERVICES<span className="text-stone-400 font-light">.</span>
          </h2>
        </div>

        {/* 3-Column Image-Driven Component Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 items-start">
          {serviceCatalog.map((service) => (
            <div 
              key={service.id} 
              className="group flex flex-col justify-start w-full relative"
            >
              {/* Image Aspect Shield Block with cool hover scale mask */}
              <div className="w-full aspect-square bg-stone-100 overflow-hidden relative border border-stone-200/40 rounded-sm mb-6 shadow-sm">
                <img 
                  src={service.imagePath} 
                  alt={service.altText}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle dark overlay veneer on mouse leave */}
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/5 transition-colors duration-500 pointer-events-none" />
              </div>

              {/* Service Classification Title */}
              <h3 className="text-2xl md:text-3xl font-black tracking-tight text-stone-950 leading-tight">
                {service.title}
              </h3>

              {/* Exact Lowercase Deliverables Metadata String */}
              <p className="mt-2 text-sm sm:text-base font-bold text-stone-400 tracking-tight leading-relaxed max-w-sm">
                {service.subText}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}