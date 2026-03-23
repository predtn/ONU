import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const OrderButton = ({ children, className = '' }: OrderButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const platforms = [
    { name: 'Shopee', href: '#' },
    { name: 'Lazada', href: '#' },
    { name: 'Facebook', href: '#' },
    { name: 'TikTok', href: '#' }
  ];

  return (
    <div className="relative inline-flex flex-col items-center">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={className}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: 'auto' }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full mt-4 flex flex-col gap-2 min-w-[160px] bg-[#111] border border-gold/30 rounded-md p-2 z-50 overflow-hidden shadow-[0_0_20px_rgba(198,167,94,0.2)] backdrop-blur-md"
          >
            {platforms.map((platform, idx) => (
              <motion.a
                key={platform.name}
                href={platform.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 + 0.1 }}
                className="w-full text-center py-3 px-4 text-white/80 hover:text-velvet-black hover:bg-gold rounded-sm transition-colors text-xs font-bold tracking-widest uppercase"
              >
                {platform.name}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
