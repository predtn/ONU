import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { 
    q: "Mấy người chơi được?", 
    a: "2–6 người. Vui nhất từ 4 người trở lên, lý tưởng là 5–6." 
  },
  { 
    q: "Bộ gồm những gì?", 
    a: "68 lá Gameplay Deck + [X] lá Challenge Deck, đựng trong hộp cứng. Kích thước vừa túi xách, tiện mang theo." 
  },
  { 
    q: "Pre-order có rủi ro không?", 
    a: "Hoàn tiền 100% nếu không giao đúng cam kết. Thanh toán qua Shopee/MoMo/bank — có bảo vệ người mua." 
  },
  { 
    q: "Giao khi nào?", 
    a: "Dự kiến giữa tháng 6/2026. Tiến độ cập nhật liên tục qua fanpage và TikTok." 
  }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-40 bg-velvet-black relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Concerns?</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em]">Trước khi <span className="gold-gradient italic">Đặt hàng</span></h3>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="border-b border-white/10">
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full py-6 flex justify-between items-center text-left group"
              >
                <span className={`text-lg md:text-xl font-bold uppercase tracking-widest transition-colors duration-300 ${openIdx === idx ? 'text-gold' : 'text-white/80 group-hover:text-white'}`}>
                  {faq.q}
                </span>
                <ChevronDown className={`w-6 h-6 text-gold/50 transition-transform duration-500 ${openIdx === idx ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.04, 0.62, 0.23, 0.98] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-white/50 leading-relaxed text-sm md:text-base">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
