import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Shield, Shuffle, Split, Zap, Star } from 'lucide-react';

const specialCards = [
  { 
    name: 'Give Me a Chance', 
    effect: 'Cancel Challenge, Draw New', 
    color: 'bg-[#1A2E4B]', 
    accent: '#4D94FF',
    icon: Shuffle,
    shadow: 'shadow-blue-900/40'
  },
  { 
    name: 'Oh Come On!', 
    effect: 'Cancel Challenge, Pay Price', 
    color: 'bg-[#4B2E1A]', 
    accent: '#FF944D',
    icon: Zap,
    shadow: 'shadow-orange-900/40'
  },
  { 
    name: 'Lucky Guy', 
    effect: 'Nullify Challenge Entirely', 
    color: 'bg-[#1A4B2E]', 
    accent: '#4DFF94',
    icon: Shield,
    shadow: 'shadow-green-900/40'
  },
  { 
    name: 'That\'s Rough, Buddy', 
    effect: 'Redirect Punishment', 
    color: 'bg-[#4B0F1A]', 
    accent: '#FF4D4D',
    icon: Split,
    shadow: 'shadow-red-900/40'
  },
  { 
    name: 'I\'m the King Now', 
    effect: 'Redirect to Round Winner', 
    color: 'bg-[#2C0E3A]', 
    accent: '#B34DFF',
    icon: Star,
    shadow: 'shadow-purple-900/40'
  },
];

const SpecialCards = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, {
    stiffness: 150,
    damping: 30,
    mass: 1
  });

  const cardCount = specialCards.length;
  const angleStep = 360 / cardCount;

  const handleDrag = (_: any, info: any) => {
    rotation.set(rotation.get() + info.delta.x * 0.5);
  };

  const handleDragEnd = (_: any, info: any) => {
    const currentRotation = rotation.get();
    const velocity = info.velocity.x;
    
    let targetRotation = Math.round(currentRotation / angleStep) * angleStep;
    
    if (Math.abs(velocity) > 500) {
      targetRotation += Math.sign(velocity) * angleStep;
    }

    animate(rotation, targetRotation, {
      type: "spring",
      stiffness: 150,
      damping: 30,
    });
  };

  return (
    <section id="special-cards" className="py-24 md:py-40 bg-velvet-black relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-royal-purple/10 to-transparent pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
        <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Nơi tụ tập của những chiến thuật não to</h2>
        <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-widest text-glow">
          Lá bài <span className="gold-gradient italic">Khác Biệt</span> Nhất
        </h3>
        <p className="text-white/40 max-w-2xl mx-auto text-sm md:text-base text-balance">
          Các lá bài Wild và Wild +4 đều có khả năng Thử thách Giai đoạn ẩn được in trên mặt bài. Khả năng này được kích hoạt khi một vòng đấu kết thúc.
          Sự khác biệt giữa chiến thắng và thất bại nằm ở chính khả năng này.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[550px] w-full flex items-center justify-center perspective-[1200px] select-none"
      >
        {/* Transparent Drag Layer on Top */}
        <motion.div
          drag="x"
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          style={{ width: '100%', height: '100%', position: 'absolute', zIndex: 2000 }}
          className="cursor-grab active:cursor-grabbing"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.1}
        />
        
        <div className="relative w-full max-w-[1200px] h-full flex items-center justify-center preserve-3d">
          {specialCards.map((card, idx) => (
            <SpecialCard 
              key={idx} 
              card={card} 
              index={idx} 
              smoothRotation={smoothRotation} 
              angleStep={angleStep}
            />
          ))}
        </div>
      </div>

      {/* Drag Hint Line */}
      <div className="container mx-auto px-6 flex flex-col items-center mt-8 space-y-4">
        <div className="w-64 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent relative">
          <motion.div 
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1 bg-gold rounded-full shadow-[0_0_10px_rgba(255,215,0,0.5)]"
            style={{ 
              x: useTransform(smoothRotation, (v: number) => {
                return ((-v % 360) / 360) * 80; 
              })
            }}
          />
        </div>
        <span className="text-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold animate-pulse pointer-events-none select-none">Swipe to Decks</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-20">
          <div className="p-1 border border-gold/20 max-w-2xl mx-auto relative z-10">
            <div className="bg-white/5 border border-gold/10 p-6 md:p-8 text-center backdrop-blur-xl group hover:border-gold/30 transition-colors">
               <span className="bg-gold text-velvet-black px-3 py-1 text-[8px] font-black uppercase tracking-widest absolute -top-3 left-1/2 -translate-x-1/2">Poker Face</span>
               <p className="text-white/60 italic text-sm md:text-base leading-relaxed">
                 "Hãy giữ những lá bài này để lật ngược tình thế sau khi thua một vòng đấu — hoặc sử dụng chúng sớm để đảm bảo chiến thắng dễ dàng. Sự lựa chọn là của bạn."
               </p>
            </div>
          </div>
      </div>
    </section>
  );
};

const SpecialCard = ({ card, index, smoothRotation, angleStep }: any) => {
  const radius = 420;
  const CardIcon = card.icon;
  
  const rotateYValue = useTransform(smoothRotation, (v: number) => {
    return (index * angleStep) + v;
  });

  const x = useTransform(rotateYValue, (angle: number) => {
    return Math.sin((angle * Math.PI) / 180) * radius;
  });

  const z = useTransform(rotateYValue, (angle: number) => {
    return Math.cos((angle * Math.PI) / 180) * radius;
  });

  const scale = useTransform(z, [-radius, radius], [0.85, 1]);
  const opacity = useTransform(z, [-radius, radius], [0.5, 1]);
  const blur = useTransform(z, [-radius, radius], [4, 0]);
  const filter = useTransform(blur, (v: number) => `blur(${v}px)`);
  const zIndex = useTransform(z, (v: number) => Math.round(v + radius));

  return (
    <motion.div
      className={`absolute w-64 md:w-80 aspect-[4/6] bg-velvet-black border-[3px] border-gold/40 p-6 flex flex-col justify-between overflow-hidden shadow-2xl preserve-3d pointer-events-none select-none ${card.shadow}`}
      style={{
        x,
        z,
        scale,
        opacity,
        filter,
        zIndex,
        rotateY: 0,
        willChange: 'transform, opacity, filter',
      }}
    >
      {/* Background Technical Pattern (Sync with Gameplay) */}
      <div 
        className="absolute inset-0 opacity-[0.2]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, #D4AF37 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Deus Ex Back Design */}
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
      
      {/* Floating Particles (Stardust) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 3 + 1,
              height: Math.random() * 3 + 1,
              backgroundColor: '#D4AF37',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.4,
              filter: 'blur(1px)',
            }}
            animate={{
              y: [0, -60, 0],
              opacity: [0.1, 0.6, 0.1],
              scale: [1, 2, 1],
            }}
            transition={{
              duration: Math.random() * 4 + 3,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-start relative z-10">
        <Star size={24} color="#D4AF37" fill="#D4AF37" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        <div className="w-10 h-10 border border-gold/40 rounded-xl flex items-center justify-center bg-gold/5 backdrop-blur-sm">
          <span className="text-gold font-black text-xl italic">V</span>
        </div>
      </div>

      <div className="text-center relative z-10 flex flex-col items-center">
        {/* Central Emblem */}
        <div className="relative mb-8">
            <div className="absolute inset-0 bg-gold/20 blur-2xl rounded-full" />
            <div className="relative w-32 h-32 border-2 border-gold/30 rounded-full flex items-center justify-center p-4">
                <div className="w-full h-full border border-gold/40 rounded-full flex items-center justify-center">
                    <CardIcon size={48} color="#D4AF37" strokeWidth={1} className="drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]" />
                </div>
            </div>
            
            {/* Spinning decorative orbit */}
            <motion.div 
                className="absolute inset-[-10px] border border-dashed border-gold/20 rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
        </div>

        <h4 className="text-gold text-2xl font-black uppercase tracking-[0.3em] mb-2">{card.name}</h4>
        <div className="h-px w-12 bg-gold/40 mb-3" />
        <p className="text-white/60 text-[10px] uppercase tracking-[0.5em] font-bold">{card.effect}</p>
      </div>

      <div className="flex justify-between items-end rotate-180 relative z-10">
        <Star size={24} color="#D4AF37" fill="#D4AF37" className="drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
        <div className="w-10 h-10 border border-gold/40 rounded-xl flex items-center justify-center bg-gold/5 backdrop-blur-sm">
          <span className="text-gold font-black text-xl italic">V</span>
        </div>
      </div>

      {/* Premium Border Inner (Thick gold border like About section) */}
      <div className="absolute inset-0 border-[12px] border-gold/15 pointer-events-none" />
      <div className="absolute inset-0 border border-gold/30 pointer-events-none" />
    </motion.div>
  );
};

export default SpecialCards;

