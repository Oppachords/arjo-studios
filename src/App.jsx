import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';   {/* Curated Sample: Selected Works */}
import Works2 from './components/Works2'; {/* Interactive Grid: All Works */}
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100 selection:bg-stone-100 selection:text-black">
      <Navbar />
      
      <main>
        {/* 1. Introduction */}
        <Hero />
        
        {/* 2. Curated Teaser Grid (Selected Works) */}
        <Works />
        
        {/* 3. Studio Capabilities & Services */}
        <Services />
        
        {/* 4. Complete Deep Portfolio (All Works + Lightbox Modals) */}
        <Works2 />
      </main>

      <Footer />
    </div>
  );
}

export default App;