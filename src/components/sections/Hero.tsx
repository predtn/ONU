import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import FloatingCards from '../3D/FloatingCards';

const DEADLINE = new Date('2026-06-20T23:59:59+07:00').getTime();

const Hero = () => {
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });

  useEffect(() => {
    const update = () => {
      const dist = Math.max(DEADLINE - Date.now(), 0);
      setTimeLeft({
        days: String(Math.floor(dist / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((dist / 3600000) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((dist / 60000) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((dist / 1000) % 60)).padStart(2, '0'),
      });
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, []);

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
          className="text-lg md:text-2xl text-white/60 mb-8 max-w-2xl mx-auto font-light tracking-wide"
        >
          Cùng chơi, cùng vui, cùng khóc, cùng cười
          <span className="block mt-2 font-bold text-gold/80 italic">Những thử thách tấu hài khó đỡ gắn kết tình anh em thương mến thương thân</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          {/* Countdown Timer */}
          <div className="flex flex-col items-center mb-3 px-8 py-4 rounded-lg border border-gold/20 bg-[#111016]/95 backdrop-blur-md min-w-[320px]">
            <p className="text-[11px] md:text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-3 flex items-center gap-2 justify-center">
              <Clock className="h-4 w-4 text-gold/75 shrink-0 animate-pulse" strokeWidth={2.5} />
              Pre-order ưu đãi kết thúc sau
            </p>
            <div className="flex gap-4 justify-center items-center">
              {[
                { value: timeLeft.days, label: 'ngày' },
                { value: timeLeft.hours, label: 'giờ' },
                { value: timeLeft.minutes, label: 'phút' },
                { value: timeLeft.seconds, label: 'giây' },
              ].map((item, index) => (
                <div key={item.label} className="flex items-center">
                  <div className="text-center min-w-[48px]">
                    <span className="block text-2xl md:text-4xl font-black text-gold tabular-nums leading-none mb-1.5">{item.value}</span>
                    <span className="block text-[9px] md:text-[10px] font-bold uppercase tracking-wider text-white/45 leading-none">{item.label}</span>
                  </div>
                  {index < 3 && (
                    <span className="text-gold/40 font-black text-lg md:text-2xl ml-4 leading-none self-start mt-1">:</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => { window.location.hash = '#order'; }}
            className="group relative px-10 py-4 bg-gold text-velvet-black font-bold tracking-widest text-sm hover:scale-105 transition-all duration-300 rounded-sm overflow-hidden shadow-[0_0_30px_rgba(198,167,94,0.3)]"
          >
            <span className="relative z-10 pointer-events-none">Pre-order chỉ với 150.000 vnđ</span>
            <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 pointer-events-none" />
          </button>
          
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
