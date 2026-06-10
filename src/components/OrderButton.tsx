import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Music2, ShoppingBag, X } from 'lucide-react';

interface OrderButtonProps {
  children: React.ReactNode;
  className?: string;
}

export const OrderButton = ({ children, className = '' }: OrderButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  const deadline = useMemo(() => new Date('2026-06-15T23:59:59+07:00').getTime(), []);

  useEffect(() => {
    const updateCountdown = () => {
      const distance = Math.max(deadline - Date.now(), 0);
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1000);

    return () => window.clearInterval(timer);
  }, [deadline]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const platforms = [
    { name: 'Facebook', href: '#', icon: MessageCircle, tone: 'hover:bg-[#1877f2]' },
    { name: 'TikTok', href: '#', icon: Music2, tone: 'hover:bg-[#00f2ea]' },
    { name: 'Shopee', href: '#', icon: ShoppingBag, tone: 'hover:bg-[#ee4d2d]' },
  ];

  const countdownItems = [
    { value: timeLeft.days, label: 'Ngày' },
    { value: timeLeft.hours, label: 'Giờ' },
    { value: timeLeft.minutes, label: 'Phút' },
    { value: timeLeft.seconds, label: 'Giây' },
  ];

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={className}
      >
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-velvet-black/80 px-4 py-8 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Dat truoc san pham"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid w-full max-w-3xl gap-6 overflow-hidden rounded-lg border border-gold/30 bg-[#111016]/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(198,167,94,0.18)] sm:grid-cols-[0.95fr_1.05fr] sm:p-6"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Dong hop thoai"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <X size={18} />
              </button>

              <div className="rounded-md border border-white/10 bg-white/[0.03] p-4">
                <div className="flex aspect-[4/5] items-center justify-center rounded-sm border border-dashed border-gold/45 bg-[linear-gradient(135deg,rgba(198,167,94,0.08),rgba(75,15,26,0.18))]">
                  <div className="w-3/4 space-y-4">
                    <div className="mx-auto h-10 w-2/3 rounded-sm border border-gold/40" />
                    <div className="h-32 rounded-sm border border-white/20 bg-white/[0.04]" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-white/20" />
                      <div className="h-2 w-4/5 rounded-full bg-white/15" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">
                  Product packaging wireframe
                </p>
              </div>

              <div className="flex flex-col justify-center pr-0 sm:pr-4">
                <p className="text-xs font-bold uppercase tracking-[0.34em] gold-gradient italic">Preorder limit</p>
                <h3 className="mt-3 text-2xl font-black uppercase leading-tight text-white sm:text-3xl">
                  Đặt hàng sớm
                </h3>

                <div className="mt-5 rounded-md border border-white/10 bg-black/25 p-4">
                  <p className="text-sm uppercase tracking-[0.22em] text-white/45">Giá gốc</p>
                  <p className="mt-1 text-xl font-semibold text-white/40 line-through">120.000 VND</p>
                  <p className="mt-4 text-sm uppercase tracking-[0.22em] gold-gradient italic">Giá pre-order limit</p>
                  <p className="mt-1 text-4xl font-black text-white">80.000 VND</p>
                </div>

                <div className="mt-3">
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {countdownItems.map((item) => (
                      <div key={item.label} className="rounded-md border border-gold/25 bg-gold/10 px-2 py-3 text-center">
                        <span className="block text-lg font-black text-gold sm:text-xl">{item.value}</span>
                        <span className="mt-1 block text-[10px] font-bold uppercase tracking-widest text-white/50">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {platforms.map(({ name, href, icon: Icon, tone }) => (
                    <a
                      key={name}
                      href={href}
                      className={`group flex min-h-20 flex-col items-center justify-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-2 text-center text-[10px] font-bold uppercase tracking-widest text-white/75 transition-colors hover:border-transparent hover:text-white ${tone}`}
                    >
                      <Icon size={22} strokeWidth={1.8} />
                      <span>{name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
