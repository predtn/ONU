import { motion } from 'framer-motion';
import { OrderButton } from './OrderButton';

const Navbar = () => {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-40 px-6 py-4 md:px-12 md:py-6 flex justify-between items-center"
    >
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-gold rotate-45 flex items-center justify-center">
          <span className="text-gold font-bold text-lg md:text-xl -rotate-45">18</span>
        </div>
        <span className="font-heading text-3xl md:text-4xl tracking-widest gold-gradient font-bold uppercase">
          SOULX
        </span>
      </div>

      <div className="hidden md:flex items-center gap-8 text-sm uppercase tracking-widest font-medium text-white/70">
        <a href="#about" className="hover:text-gold transition-colors duration-300">The Game</a>
        <a href="#gameplay" className="hover:text-gold transition-colors duration-300">Gameplay</a>
        <a href="#cards" className="hover:text-gold transition-colors duration-300">Cards</a>
        <a href="#faq" className="hover:text-gold transition-colors duration-300">FAQ</a>
      </div>

      <OrderButton className="px-6 py-2 border border-gold/30 bg-gold/10 backdrop-blur-md text-gold text-xs md:text-sm uppercase tracking-widest font-bold hover:bg-gold hover:text-velvet-black transition-all duration-500 rounded-full">
        Order Now
      </OrderButton>
    </motion.nav>
  );
};

export default Navbar;
