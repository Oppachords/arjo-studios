import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-stone-100/90 backdrop-blur-xl border-b border-stone-200/80">
      <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
        {/* Brand Logo stacked tightly on two lines */}
        <a href="#" className="flex flex-col font-black text-2xl tracking-tighter uppercase text-stone-900 leading-[0.75] transition-transform active:scale-95">
          <span>ARJO</span>
          <span className="text-stone-500">STUDIOS</span>
        </a>

        {/* Menu Items with heavier weight */}
        <div className="hidden md:flex items-center space-x-12 text-xs font-black tracking-[0.2em] uppercase text-stone-900">
          <a href="#all-works" className="hover:opacity-60 transition-opacity">Works</a>
          <a href="#about" className="hover:opacity-60 transition-opacity">About Us</a>
          <a href="#contact" className="px-5 py-2.5 bg-stone-950 text-stone-100 rounded-sm hover:bg-stone-800 transition-all shadow-sm font-bold">
            Contact
          </a>
        </div>

        {/* Mobile Trigger */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-stone-900 hover:opacity-60">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
          </svg>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      {isOpen && (
        <div className="md:hidden absolute top-24 left-0 w-full bg-stone-100 border-b border-stone-200 p-8 flex flex-col space-y-6 text-sm font-black tracking-widest uppercase text-stone-900 animate-fadeIn">
          <a href="#all-works" onClick={() => setIsOpen(false)} className="hover:opacity-60">Works</a>
          <a href="#about" onClick={() => setIsOpen(false)} className="hover:opacity-60">About Us</a>
          <a href="#contact" onClick={() => setIsOpen(false)} className="py-3 text-center bg-stone-950 text-stone-100 rounded-sm font-bold">Contact</a>
        </div>
      )}
    </nav>
  );
}