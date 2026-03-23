import { motion } from 'framer-motion';

const features = [
  { title: 'YOUR SOUL IS MINE!', desc: 'The high-stakes penalty mechanic keeps everyone on edge.' },
  { title: 'Strategy + Chaos', desc: 'Every action card played is a calculated risk.' },
  { title: 'Dual-Function Wilds', desc: 'Phase Challenges can flip the round entirely.' },
  { title: 'Replayable Chaos', desc: 'No two nights are ever the same.' },
  { title: 'Premium Quality', desc: 'Luxurious textures and professional design.' }
];

const Features = () => {
  return (
    <section className="py-24 md:py-40 bg-zinc-950/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/3">
            <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Why Play</h2>
            <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-tight">Beyond The <span className="gold-gradient italic">Ordinary.</span></h3>
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
