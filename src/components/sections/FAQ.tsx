import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  { 
    q: "What happens if I forget to say SOUL!?", 
    a: "If you have exactly 1 card left and forget to call 'SOUL!', you must immediately draw 2 penalty cards." 
  },
  { 
    q: "How many players can play?", 
    a: "The game is designed perfectly for 2–6 players." 
  },
  { 
    q: "Who draws the Challenge card?", 
    a: "When a player empties their hand, they win the round. The player with the most cards remaining is the loser and must draw from the Challenge Deck." 
  },
  { 
    q: "What are Phase Challenges?", 
    a: "Phase Challenges are hidden abilities printed on Wild and Wild +4 cards. They activate when a round ends, allowing you to manipulate fate (like canceling a challenge or redirecting it)." 
  }
];

const FAQ = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 md:py-40 bg-velvet-black relative">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Concerns</h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-[0.2em]">Common <span className="gold-gradient italic">Inquiries</span></h3>
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
