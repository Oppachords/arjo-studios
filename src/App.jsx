import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Works from './components/Works';
import Services from './components/Services';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-stone-100 selection:bg-stone-100 selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Works />
        <Services />
      </main>
      <Footer />
    </div>
  );
}

export default App;