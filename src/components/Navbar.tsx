import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { trackOrderClick } from '../utils/analytics';

const Navbar = ({ isOrderPage }: { isOrderPage?: boolean }) => {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    if (isOrderPage) {
      setActiveSection('');
      return;
    }

    const sections = ['about', 'gameplay', 'cards', 'faq'];
    
    const observerOptions = {
      root: null,
      rootMargin: '-35% 0px -55% 0px', // Adjusted trigger point to highlight sections accurately
      threshold: 0,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    // Use a small timeout to ensure elements are rendered in the DOM before we observe them
    const timeoutId = setTimeout(() => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      observer.disconnect();
    };
  }, [isOrderPage]);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center bg-velvet-black/40 backdrop-blur-md border-b border-white/5"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-gold rotate-45 flex items-center justify-center">
          <span className="text-gold font-bold text-lg md:text-xl -rotate-45">18</span>
        </div>
        <span className="font-heading text-3xl md:text-4xl tracking-widest gold-gradient font-bold uppercase">
          SOULDECK
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium">
        <a 
          href="#about" 
          className={`transition-all duration-300 ${
            activeSection === 'about' 
              ? 'text-gold font-bold scale-105' 
              : 'text-white/60 hover:text-gold'
          }`}
        >
          Tổng quan
        </a>
        <a 
          href="#gameplay" 
          className={`transition-all duration-300 ${
            activeSection === 'gameplay' 
              ? 'text-gold font-bold scale-105' 
              : 'text-white/60 hover:text-gold'
          }`}
        >
          Cách chơi
        </a>
        <a 
          href="#cards" 
          className={`transition-all duration-300 ${
            activeSection === 'cards' 
              ? 'text-gold font-bold scale-105' 
              : 'text-white/60 hover:text-gold'
          }`}
        >
          Lá bài
        </a>
        <a 
          href="#faq" 
          className={`transition-all duration-300 ${
            activeSection === 'faq' 
              ? 'text-gold font-bold scale-105' 
              : 'text-white/60 hover:text-gold'
          }`}
        >
          FAQ
        </a>
      </div>

      <button 
        onClick={() => {
          trackOrderClick();
          window.location.hash = '#order';
        }}
        className="px-6 py-2 border border-gold/30 bg-gold/10 backdrop-blur-md text-gold text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-gold hover:text-velvet-black transition-all duration-500 rounded-full"
      >
        Pre-Order Now
      </button>
    </motion.nav>
  );
};

export default Navbar;
