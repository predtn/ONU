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
import { trackPageView, trackInteraction } from './utils/analytics';

function App() {
  const [isOrderPage, setIsOrderPage] = useState(false);

  useEffect(() => {
    // Track page view on initial load
    trackPageView();

    // Listen to screen clicks for interaction tracking (only buttons, links, inputs, and elements with role="button")
    let lastTrackTime = 0;
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      // Check target tagName directly first in case it is immediately unmounted/detached from DOM on click
      const tagName = target.tagName.toLowerCase();
      const isDirectInteractive = ['button', 'a', 'input', 'select', 'textarea'].includes(tagName) || 
                                  target.getAttribute('role') === 'button';

      // Fallback to checking parent elements if it's still attached to DOM (e.g., clicking inside a button)
      const isInteractive = isDirectInteractive || target.closest('button, a, input, select, textarea, [role="button"]');

      if (isInteractive) {
        const now = Date.now();
        if (now - lastTrackTime > 2000) {
          trackInteraction();
          lastTrackTime = now;
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);
    return () => {
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

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
