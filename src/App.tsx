import { useState, useEffect } from 'react';
import SmoothScroll from './components/SmoothScroll';
import GrainOverlay from './components/GrainOverlay';
import Navbar from './components/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Gameplay from './components/sections/Gameplay';
import ActionCards from './components/sections/ActionCards';
import SpecialCards from './components/sections/SpecialCards';
import HowItWorks from './components/sections/HowItWorks';
import Features from './components/sections/Features';
import FAQ from './components/sections/FAQ';
import Footer from './components/sections/Footer';
import { OrderPage } from './pages/OrderPage';

function App() {
  const [isOrderPage, setIsOrderPage] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      setIsOrderPage(window.location.hash === '#order');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Initial check

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <SmoothScroll>
      <div className="relative bg-velvet-black text-white min-h-screen">
        <GrainOverlay />
        <Navbar isOrderPage={isOrderPage} />
        
        <main>
          {isOrderPage ? (
            <OrderPage />
          ) : (
            <>
              <Hero />
              <About />
              <Gameplay />
              <ActionCards />
              <SpecialCards />
              <HowItWorks />
              <Features />
              <FAQ />
            </>
          )}
        </main>
        
        <Footer />
      </div>
    </SmoothScroll>
  );
}

export default App;
