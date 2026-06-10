import { motion } from 'framer-motion';

const features = [
  { title: 'Học trong 3 phút', desc: 'Luật nền quen như UNO — ai cũng vào được ngay, kể cả người lần đầu chơi board game.' },
  { title: 'Mỗi ván là 1 clip TikTok tiềm năng', desc: '"Khi thằng thắng bị chuyển phạt ngược" — game tạo khoảnh khắc thật, không cần dàn dựng.' },
  { title: 'Thuần Việt, chất Gen Z', desc: '"Ối dồi ôi", "Em đen lắm", "Vua là tôi không phải bạn" — ngôn ngữ trong bộ bài là của tụi mình, không phải bản dịch cứng từ game nước ngoài.' },
  { title: 'Chiến thuật thật sự, không phải may rủi', desc: 'Giữ lá Wild để lật kèo cuối vòng, hay đánh sớm để thắng nhanh? Quyết định đó là của bạn — và cả bàn sẽ nhớ mãi.' },
];

const Features = () => {
  return (
    <section className="py-24 md:py-40 bg-zinc-950/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Tại sao lại chọn SOULDECK?</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-tight">Idea chưa từng có <span className="gold-gradient italic">Ở thị trường card games.</span></h3>
          </div>
          
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="p-8 bg-white/5 border border-white/10 backdrop-blur-md hover:border-gold/30 hover:bg-white/[0.07] transition-all duration-500 rounded-px"
              >
                <h4 className="text-gold font-black uppercase tracking-widest text-sm mb-4">★ {feature.title}</h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
