import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, animate } from 'framer-motion';
import imgHolyMoly from '../../../assets/wildcard_holymoly.png';
import imgImKing from '../../../assets/wildcard x4_imking.png';
import imgGiveMeAChance from '../../../assets/wildcard x4_givemeachance.png';
import imgPoorYou from '../../../assets/wildcard_pooryou.png';

const specialCards = [
  { 
    name: 'Give Me a Chance', 
    accent: '#4D94FF',
    shadow: 'shadow-blue-900/40',
    image: imgGiveMeAChance
  },
  { 
    name: 'Holy Moly', 
    accent: '#FF4D4D',
    shadow: 'shadow-red-900/40',
    image: imgHolyMoly
  },
  { 
    name: "I'm the King", 
    accent: '#B34DFF',
    shadow: 'shadow-purple-900/40',
    image: imgImKing
  },
  { 
    name: 'Poor You', 
    accent: '#FFEA4D',
    shadow: 'shadow-yellow-900/40',
    image: imgPoorYou
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
          Bên dưới mỗi lá bài Wild và Wild +4 đều ẩn chứa "nội tại" cực hiểm hóc chỉ kích hoạt khi vòng đấu hạ màn. Khôn ngoan hay ăn quả đắng đều nằm ở cách bạn giữ những quân cờ tẩy này.
        </p>
      </div>

      <div 
        ref={containerRef}
        className="relative h-[550px] w-full flex items-center justify-center perspective-[1200px] select-none"
      >
        {/* Central Ambient Glow */}
        <div className="absolute w-[600px] h-[600px] rounded-full bg-gold/5 blur-[120px] pointer-events-none z-0" />

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
                 "Tích bài phòng thủ để lật kèo phút chót hay xả sớm để chạy trốn hình phạt? Chúc các khứa may mắn với sự lựa chọn của mình!"
               </p>
            </div>
          </div>
      </div>
    </section>
  );
};

const SpecialCard = ({ card, index, smoothRotation, angleStep }: any) => {
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

        {/* Inner frame with glow */}
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

export default SpecialCards;

