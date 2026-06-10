import { motion } from 'framer-motion';
import FloatingCards from '../3D/FloatingCards';
import { OrderButton } from '../OrderButton';

const Hero = () => {
  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-velvet-black">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full wine-gradient opacity-40 z-0" />
      
      {/* 3D Scene */}
      <FloatingCards />

      {/* Hero Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl">
        <motion.div
          initial={{ filter: "blur(20px)", opacity: 0, y: 30 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="mb-6"
        >
          <h1 className="text-5xl md:text-8xl font-black text-white leading-tight uppercase tracking-tighter">
            Reveal the <span className="gold-gradient italic">Card</span> Feel the <span className="gold-gradient italic">Spark</span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
          className="text-lg md:text-2xl text-white/60 mb-10 max-w-2xl mx-auto font-light tracking-wide"
        >
          Ván bài mà cả phòng không ai chịu thua
          <span className="block mt-2 font-bold text-gold/80 italic">Thua là chưa kết thúc — Thua là khởi đầu của các thử thách mới</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <OrderButton className="group relative px-10 py-4 bg-gold text-velvet-black font-bold tracking-widest text-sm hover:scale-105 transition-all duration-300 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(198,167,94,0.3)]">
            <span className="relative z-10 pointer-events-none">Pre-order chỉ với 120.000 vnđ</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          </OrderButton>
          
          <span className="text-[10px] md:text-xs text-white/30 uppercase tracking-[0.3em] font-semibold mt-2">
            Nội dung thử thách 18+ • 2-6 người chơi
          </span>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-12 flex flex-col items-center gap-4">
        <div className="w-[1px] h-20 bg-gradient-to-b from-gold/50 to-transparent" />
        <span className="text-[10px] text-gold/50 uppercase tracking-[0.4em] rotate-90 origin-left mt-8">Scroll</span>
      </div>
    </section>
  );
};

export default Hero;
