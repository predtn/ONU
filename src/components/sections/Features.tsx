import { motion } from 'framer-motion';

const features = [
  { title: 'Học trong 3 phút', desc: 'Luật nền siêu dễ nuốt tựa như UNO. Giải thích nhoáng cái là cả hội quẩy được ngay, không cần cào phím đọc luật cả tiếng.' },
  { title: 'Kho content triệu view', desc: 'Những pha "bẻ lái cực gắt" khi khứa về nhất lại bị đè ra phạt ngược. Toàn khoảnh khắc cười vỡ bụng, tha hồ lên xu hướng.' },
  { title: 'Thuần Việt, chuẩn Gen Z', desc: 'Sở hữu loạt phát ngôn chất chơi như "Ối dồi ôi", "Nhân phẩm kém", "Thắng làm vua". Ngôn từ cực kỳ gần gũi chứ không dịch máy sượng trân.' },
  { title: 'Đấu trí đỉnh cao', desc: 'Giấu lá bài cứu cánh để lật kèo phút 90 hay bung lụa sớm để kiếm cúp? Vui lòng suy nghĩ kỹ vì mọi người sẽ ghim bạn suốt cả buổi.' },
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
