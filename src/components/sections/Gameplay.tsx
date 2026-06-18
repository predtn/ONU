import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import imgRed from '../../../assets/9_red.png';
import imgBlue from '../../../assets/9_blue.png';
import imgBrown from '../../../assets/9_brown.png';
import imgYellow from '../../../assets/9_yellow.png';

const cardTypes = [
  { 
    name: 'Red', 
    subtitle: 'Passion', 
    color: 'bg-[#4B0F1A]', 
    gradient: 'from-[#8B1A2E]', 
    accent: '#FF4D4D',
    shadow: 'shadow-red-900/40',
    image: imgRed
  },
  { 
    name: 'Blue', 
    subtitle: 'Trust', 
    color: 'bg-[#1A2E4B]', 
    gradient: 'from-[#2A4B7A]', 
    accent: '#4D94FF',
    shadow: 'shadow-blue-900/40',
    image: imgBlue
  },
  { 
    name: 'Brown', 
    subtitle: 'Mystic', 
    color: 'bg-[#3E2723]', 
    gradient: 'from-[#5D4037]', 
    accent: '#8D6E63',
    shadow: 'shadow-amber-900/40',
    image: imgBrown
  },
  { 
    name: 'Yellow', 
    subtitle: 'Chaos', 
    color: 'bg-[#4B4A0F]', 
    gradient: 'from-[#8B881A]', 
    accent: '#FFEA4D',
    shadow: 'shadow-yellow-900/40',
    image: imgYellow
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
          Luật chơi gốc siêu dễ nắm bắt nếu bạn đã từng chơi qua UNO quốc dân. Cơ mà đừng để vẻ "thân thiện" đó đánh lừa, vì mỗi nước đi đều có thể tự hủy, và chuỗi thử thách cuối trận sẽ mang lại những tràng cười rớt hàm và giúp cả hội xích lại gần nhau hơn.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[550px] w-full flex items-center justify-center perspective-[1200px] select-none"
      >
        {/* Central Ambient Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />

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
            <h5 className="text-gold font-bold mb-2 uppercase text-xs tracking-widest">Sắc màu rực rỡ</h5>
            <p className="text-white/40 text-sm">4 tông màu cơ bản cực bắt mắt. Đầy đủ số từ 0-9 cùng dàn thẻ Action phá game cực đỉnh.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 group hover:border-gold/30 transition-colors">
            <h5 className="text-gold font-bold mb-2 uppercase text-xs tracking-widest">Đánh hay đẩy phạt</h5>
            <p className="text-white/40 text-sm">Xếp chồng trùng màu, trùng số hoặc ném thẻ chức năng để tẩu tán đống bài trên tay nhanh nhất có thể.</p>
          </div>
          <div className="p-6 bg-white/5 border border-white/10 group hover:border-gold/30 transition-colors">
            <h5 className="text-gold font-bold mb-2 uppercase text-xs tracking-widest">Nhân phẩm quyết định</h5>
            <p className="text-white/40 text-sm">Khứa nào ôm nhiều bài nhất khi có người về đích sẽ được đặc cách rút thẻ phạt thử thách.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

const Card = ({ card, index, smoothRotation, angleStep }: any) => {
  const radius = 420;
  
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
    <>
      {/* Background Aura Glow (3D tracked under the card) */}
      <motion.div
        className="absolute w-72 md:w-80 h-24 md:h-32 rounded-full filter blur-[50px] pointer-events-none select-none mix-blend-screen"
        style={{
          x,
          y: useTransform(z, [-radius, radius], [180, 230]),
          z,
          scale: useTransform(z, [-radius, radius], [0.8, 1.2]),
          opacity: useTransform(z, [-radius, radius], [0.15, 0.55]),
          zIndex: useTransform(zIndex, (v) => v - 1),
          background: `radial-gradient(ellipse at center, ${card.accent} 0%, transparent 70%)`,
        }}
      />

      <motion.div
        className={`absolute w-60 md:w-72 aspect-[1/1.6] overflow-hidden rounded-2xl shadow-2xl preserve-3d pointer-events-none select-none ${card.shadow}`}
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
      {/* Real Card Asset */}
      <img 
        src={card.image} 
        alt={`${card.name} Card`}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none sharp-img"
      />

      {/* Inner Shadow / Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/25 z-[5]" />

      {/* Background Dotted Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.12] z-10" 
        style={{ 
          backgroundImage: `radial-gradient(circle at 2px 2px, ${card.accent} 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Gloss shine */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 transition-opacity duration-500 z-20" />
      
      {/* Dynamic Energy Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-15">
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

      {/* Inner frame with glow (Thick border like About section) */}
      <div 
        className="absolute inset-0 border-[10px] border-white/5 pointer-events-none z-30 rounded-2xl" 
        style={{ 
          borderColor: `${card.accent}15` 
        }} 
      />
      <div 
        className="absolute inset-0 border border-white/10 pointer-events-none z-30 rounded-2xl" 
      />
    </motion.div>
    </>
  );
};

export default Gameplay;
