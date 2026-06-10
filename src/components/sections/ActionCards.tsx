import { motion } from 'framer-motion';

const levels = [
  {
    title: 'Level 1 – Nhẹ nhàng thôi',
    description: 'Nhẹ nhàng tình cảm, thở phào nhẹ nhõm khi rút phải thử thách này. Một chút cười đùa, một chút xấu hổ, nhưng không quá căng thẳng.',
    glow: 'shadow-[0_0_30px_rgba(168,85,247,0.3)]',
    border: 'border-purple-500/30',
    dot: 'bg-purple-500',
    intensity: 'Low Risk',
  },
  {
    title: 'Level 2 – Làm tý căng thẳng',
    description: 'Bắt đầu có tý căng thẳng rồi đấy. Những thử thách này sẽ khiến bạn phải suy nghĩ kỹ hơn, và có thể khiến bạn hơi đỏ mặt nếu chơi cùng bạn bè.',
    glow: 'shadow-[0_0_40px_rgba(239,68,68,0.3)]',
    border: 'border-red-500/30',
    dot: 'bg-red-500',
    intensity: 'Medium Risk',
  },
  {
    title: 'Level 3 – Ối dồi ôi',
    description: 'Như tiêu đề đã nói, đây là cấp độ 18+. Những thử thách này sẽ khiến bạn phải đối mặt với những tình huống cực kỳ căng thẳng, có thể khiến bạn đỏ mặt, cười không ngớt, hoặc thậm chí là... cụ đi.',
    glow: 'shadow-[0_0_50px_rgba(127,29,29,0.5)]',
    border: 'border-wine-red/50',
    dot: 'bg-wine-red animate-pulse',
    intensity: 'High Risk',
  }
];

const ActionCards = () => {
  return (
    <section id="cards" className="py-24 md:py-40 bg-velvet-black relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-wine-red/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Thử thách</h2>
            <h3 className="text-4xl md:text-6xl font-black uppercase leading-tight">Mức <br /><span className="gold-gradient italic">Thử thách.</span></h3>
          </div>
          <p className="text-white/40 text-sm md:text-base max-w-sm mb-4">
            Người thua sẽ bốc bài - mức độ level nhận được tùy vào nhân phẩm của người bốc.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {levels.map((level, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              viewport={{ once: true }}
              className={`relative p-8 md:p-10 bg-white/5 border ${level.border} ${level.glow} flex flex-col items-start backdrop-blur-sm group`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className={`w-2 h-2 rounded-full ${level.dot}`} />
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40">{level.intensity}</span>
              </div>

              <h4 className="text-2xl md:text-3xl font-black text-white uppercase mb-4 tracking-wider group-hover:text-gold transition-colors duration-500">
                {level.title}
              </h4>
              
              <p className="text-white/60 leading-relaxed mb-10 text-sm md:text-base">
                {level.description}
              </p>

              <div className="mt-auto w-full pt-8 border-t border-white/10 flex justify-between items-center">
                <span className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Tỉ lệ bốc được là ngẫu nhiên</span>
                <button className="text-gold text-[10px] uppercase tracking-[0.2em] font-black hover:tracking-[0.3em] transition-all duration-300">Khám phá ngay →</button>
              </div>

              {/* Decorative card peak */}
              <div className="absolute -top-4 -right-4 w-24 h-32 bg-velvet-black border border-white/5 rotate-12 z-[-1] opacity-50 transition-transform group-hover:rotate-6 duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ActionCards;
