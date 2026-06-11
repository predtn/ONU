import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import { Flame, Shield, Wand2, Zap } from 'lucide-react';

const cardTypes = [
  { 
    name: 'Red', 
    subtitle: 'Passion', 
    color: 'bg-[#4B0F1A]', 
    gradient: 'from-[#8B1A2E]', 
    accent: '#FF4D4D',
    icon: Flame,
    shadow: 'shadow-red-900/40'
  },
  { 
    name: 'Blue', 
    subtitle: 'Trust', 
    color: 'bg-[#1A2E4B]', 
    gradient: 'from-[#2A4B7A]', 
    accent: '#4D94FF',
    icon: Shield,
    shadow: 'shadow-blue-900/40'
  },
  { 
    name: 'Green', 
    subtitle: 'Fantasy', 
    color: 'bg-[#1A4B2E]', 
    gradient: 'from-[#2A7A4B]', 
    accent: '#4DFF94',
    icon: Wand2,
    shadow: 'shadow-green-900/40'
  },
  { 
    name: 'Yellow', 
    subtitle: 'Chaos', 
    color: 'bg-[#4B4A0F]', 
    gradient: 'from-[#8B881A]', 
    accent: '#FFEA4D',
    icon: Zap,
    shadow: 'shadow-yellow-900/40'
  },
];

const Gameplay = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Motion values for rotation
  const rotation = useMotionValue(0);
  const smoothRotation = useSpring(rotation, {
    stiffness: 150,
    damping: 30,
    mass: 1
  });

  const cardCount = cardTypes.length;
  const angleStep = 360 / cardCount;

  // Handle Drag
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
    <section id="gameplay" className="py-24 md:py-40 bg-velvet-black/90 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 text-center mb-16 relative z-10">
        <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Lối chơi quen thuộc</h2>
        <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-widest text-glow">Nhưng <span className="italic">lại có cảm giác rất mới lạ</span></h3>
        <p className="text-white/60 max-w-2xl mx-auto text-lg text-balance">
          Nếu đã chơi qua UNO, chắc chắn bạn sẽ thấy ngay sự quen thuộc. Nhưng đừng để vẻ ngoài đánh lừa bạn — mỗi lá bài đều có thể là một con dao hai lưỡi, và những thử thách sau mỗi vòng đấu sẽ khiến mọi quyết định trở nên căng thẳng hơn bao giờ hết.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[550px] w-full flex items-center justify-center perspective-[1200px] select-none"
      >
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
          {cardTypes.map((card, idx) => (
            <Card 
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
        <span className="text-gold/40 text-[10px] uppercase tracking-[0.4em] font-bold animate-pulse pointer-events-none select-none">Drag to Explore</span>
      </div>

      <div className="container mx-auto px-6 md:px-12 mt-20 text-center relative z-10">
        <div className="inline-grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
          <div className="p-6 bg-white/5 border border-white/10 group hover:border-gold/30 transition-colors">
            <h5 className="text-gold font-bold mb-2 uppercase text-xs tracking-widest">68 Cards</h5>
            <p className="text-white/40 text-sm">4 Màu (Đỏ, Xanh, Xanh lá, Vàng). Số từ 0-9 & Thẻ Hành động.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 group hover:border-gold/30 transition-colors">
            <h5 className="text-gold font-bold mb-2 uppercase text-xs tracking-widest">Match & Play</h5>
            <p className="text-white/40 text-sm">Giống như UNO cổ điển. Ghép màu, số hoặc hành động để loại bỏ bài trong tay.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 group hover:border-gold/30 transition-colors">
            <h5 className="text-gold font-bold mb-2 uppercase text-xs tracking-widest">The Risk Is Real</h5>
            <p className="text-white/40 text-sm">Người chơi có nhiều bài còn lại nhất - là người thua cuộc sẽ rút từ Bộ bài Thử thách.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ card, index, smoothRotation, angleStep }: any) => {
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
      className={`absolute w-64 md:w-80 aspect-[4/6] ${card.color} border border-white/10 p-6 flex flex-col justify-between overflow-hidden shadow-2xl preserve-3d pointer-events-none select-none ${card.shadow}`}
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
      {/* Background Dotted Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.15]" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, ${card.accent} 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Gloss shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 transition-opacity duration-500" />
      
      {/* Dynamic Energy Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: Math.random() * 4 + 2,
              height: Math.random() * 4 + 2,
              backgroundColor: card.accent,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
              filter: 'blur(2px)',
            }}
            animate={{
              y: [0, -40, 0],
              opacity: [0.2, 0.5, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="flex justify-between items-start relative z-10">
        <span className="text-4xl font-heading font-black tracking-tighter text-white/90 drop-shadow-lg">9</span>
        <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <CardIcon size={20} color={card.accent} strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-center relative z-10">
        <div className="mb-4 inline-block p-4 rounded-full bg-white/5 backdrop-blur-md border border-white/10 shadow-inner">
          <CardIcon size={48} color={card.accent} strokeWidth={1.5} className="drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]" />
        </div>
        <h4 className="text-white text-3xl font-black uppercase tracking-[0.2em] mb-1">{card.name}</h4>
        <p className="text-gold/60 text-xs uppercase tracking-[0.4em] font-bold">{card.subtitle}</p>
      </div>

      <div className="flex justify-between items-end rotate-180 relative z-10">
        <span className="text-4xl font-heading font-black tracking-tighter text-white/90 drop-shadow-lg">9</span>
        <div className="w-10 h-10 border border-white/20 rounded-xl flex items-center justify-center bg-white/5 backdrop-blur-sm">
          <CardIcon size={20} color={card.accent} strokeWidth={2.5} />
        </div>
      </div>

      {/* Inner frame with glow (Thick border like About section) */}
      <div 
        className="absolute inset-0 border-[12px] border-white/5 pointer-events-none" 
        style={{ 
          borderColor: `${card.accent}20` 
        }} 
      />
      <div 
        className="absolute inset-0 border border-white/10 pointer-events-none" 
      />
    </motion.div>
  );
};

export default Gameplay;
