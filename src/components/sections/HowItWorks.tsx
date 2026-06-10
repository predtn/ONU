import { motion } from 'framer-motion';

const steps = [
  { title: 'Chuẩn bị', desc: 'Khởi đầu mỗi người 7 lá trong tay. Mở lá trên cùng bộ bài.' },
  { title: 'Bắt đầu', desc: 'Đánh lá đầu tiên phù hợp với luật chơi UNO cổ điển.' },
  { title: 'Ú Òa!', desc: '"Ú Òa!" sợ chưa, mình còn 1 lá thôi đó - hoặc là không mình quên hô rồi rút 2 lá phạt.' },
  { title: 'Chiến thắng', desc: 'Người chơi đầu tiên đánh hết tất cả bài của mình sẽ chiến thắng vòng đấu.' },
  { title: 'Thử thách', desc: 'Người chơi có nhiều lá bài còn lại nhất sẽ rút từ Bộ bài Thử thách - Nhưng sẽ ra sao khi người thua có lá đặc biệt trong tay nhỉ?.' }
];

const HowItWorks = () => {
  return (
    <section className="py-24 md:py-40 bg-velvet-black relative">
       <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-20">
          <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Vòng chơi</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase tracking-widest text-glow">Cách <span className="gold-gradient italic">Tương tác</span> với nhau</h3>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Vertical Line for Mobile, Horizontal for Desktop */}
          <div className="absolute top-0 bottom-0 left-8 w-[1px] bg-gradient-to-b from-transparent via-gold/30 to-transparent lg:hidden" />
          <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-4 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center lg:items-center text-left lg:text-center group"
              >
                <div className="flex items-center lg:flex-col gap-6 lg:gap-8">
                  <div className="w-16 h-16 rounded-full bg-velvet-black border border-gold flex items-center justify-center relative shrink-0">
                    <div className="absolute inset-[-4px] border border-gold/10 rounded-full group-hover:scale-125 transition-transform duration-500" />
                    <span className="text-gold font-black text-xl">{idx + 1}</span>
                  </div>
                  
                  <div className="lg:mt-4">
                    <h4 className="text-white text-lg font-black uppercase tracking-widest mb-2 group-hover:text-gold transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-white/40 text-xs md:text-sm leading-relaxed max-w-[200px]">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
