import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative pt-24 pb-12 bg-velvet-black overflow-hidden border-t border-white/5">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[300px] bg-wine-red/10 blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter mb-8 leading-tight">
            Tôi tò mò, <br />
            <span className="gold-gradient italic">Bạn cũng vậy.</span>
          </h2>
          
          <button
            onClick={() => { window.location.hash = '#order'; }}
            className="group relative px-12 py-5 bg-gold text-velvet-black font-black uppercase tracking-[0.3em] text-sm hover:scale-105 transition-all duration-300 rounded-sm overflow-hidden shadow-[0_0_50px_rgba(198,167,94,0.3)] mb-12"
          >
            <span className="relative z-10 pointer-events-none">Order ngay thôi</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          </button>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center border-t border-white/10 pt-16">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <div className="w-8 h-8 border border-gold rotate-45 flex items-center justify-center">
              <span className="text-gold font-bold text-xs -rotate-45">18</span>
            </div>
            <span className="font-heading text-3xl tracking-widest gold-gradient font-bold uppercase">
              SOULDECK
            </span>
          </div>

          <div className="flex justify-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30">
            <a href="#" className="hover:text-gold transition-colors">Privacy</a>
            <a href="#" className="hover:text-gold transition-colors">Terms</a>
            <a href="#" className="hover:text-gold transition-colors">Shipping</a>
          </div>

          <p className="text-[10px] uppercase tracking-widest text-white/20 md:text-right">
            © 2026 SOULDECK. Always Play Responsibly.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
