import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/SOUL-DECK/61590583856369/',
      icon: MessageCircle,
      tone: 'hover:bg-[#1877f2]',
    },
    { name: 'TikTok', href: '#', icon: Music2, tone: 'hover:bg-[#00f2ea] hover:text-velvet-black' },
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
      <button type="button" onClick={() => setIsOpen(true)} className={className}>
        {children}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto bg-velvet-black/80 px-3 py-3 backdrop-blur-sm sm:items-center sm:px-4 sm:py-6"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Đặt trước sản phẩm"
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative my-auto grid max-h-[calc(100dvh-1.5rem)] w-full max-w-[min(92rem,calc(100vw-1.5rem))] grid-cols-1 gap-4 overflow-y-auto rounded-lg border border-gold/30 bg-[#111016]/95 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.55),0_0_40px_rgba(198,167,94,0.18)] sm:max-h-[calc(100dvh-3rem)] sm:max-w-3xl sm:gap-5 sm:p-5 md:grid-cols-[minmax(220px,0.95fr)_minmax(280px,1.05fr)] md:p-6 lg:max-w-4xl"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label="Đóng hộp thoại"
                onClick={() => setIsOpen(false)}
                className="absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:border-gold/40 hover:text-gold"
              >
                <X size={18} />
              </button>

              <div className="rounded-md border border-white/10 bg-white/[0.03] p-3 sm:p-4">
                <div className="flex aspect-[16/10] max-h-[32dvh] min-h-44 items-center justify-center rounded-sm border border-dashed border-gold/45 bg-[linear-gradient(135deg,rgba(198,167,94,0.08),rgba(75,15,26,0.18))] md:aspect-[4/5] md:max-h-none">
                  <div className="w-3/4 max-w-56 space-y-3 sm:space-y-4">
                    <div className="mx-auto h-8 w-2/3 rounded-sm border border-gold/40 sm:h-10" />
                    <div className="h-20 rounded-sm border border-white/20 bg-white/[0.04] sm:h-28 md:h-32" />
                    <div className="space-y-2">
                      <div className="h-2 w-full rounded-full bg-white/20" />
                      <div className="h-2 w-4/5 rounded-full bg-white/15" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-white/45 sm:tracking-[0.28em]">
                  Product packaging wireframe
                </p>
              </div>

              <div className="flex min-w-0 flex-col justify-center pr-0 md:pr-4">
                <p className="text-[11px] font-bold uppercase tracking-[0.26em] gold-gradient italic sm:text-xs sm:tracking-[0.34em]">
                  Preorder limit
                </p>
                <h3 className="mt-2 text-2xl font-black uppercase leading-tight text-white sm:mt-3 sm:text-3xl">
                  Order sớm
                </h3>

                <div className="mt-4 rounded-md border border-white/10 bg-black/25 p-3 sm:mt-5 sm:p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-white/45 sm:text-sm sm:tracking-[0.22em]">
                    Giá gốc
                  </p>
                  <p className="mt-1 text-xl font-semibold text-white/40 line-through">120.000 VND</p>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] gold-gradient italic sm:mt-4 sm:text-sm sm:tracking-[0.22em]">
                    Giá pre-order limit
                  </p>
                  <p className="mt-1 text-3xl font-black text-white sm:text-4xl">80.000 VND</p>
                </div>

                <div className="mt-3 grid grid-cols-4 gap-1.5 sm:gap-2">
                  {countdownItems.map((item) => (
                    <div
                      key={item.label}
                      className="min-w-0 rounded-md border border-gold/25 bg-gold/10 px-1.5 py-2 text-center sm:px-2 sm:py-3"
                    >
                      <span className="block text-base font-black text-gold sm:text-xl">{item.value}</span>
                      <span className="mt-1 block truncate text-[9px] font-bold uppercase tracking-wide text-white/50 sm:text-[10px] sm:tracking-widest">
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 grid grid-cols-3 gap-1.5 sm:mt-6 sm:gap-2">
                  {platforms.map(({ name, href, icon: Icon, tone }) => (
                    <a
                      key={name}
                      href={href}
                      className={`group flex min-h-16 min-w-0 flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-1.5 text-center text-[9px] font-bold uppercase tracking-wide text-white/75 transition-colors hover:border-transparent hover:text-white sm:min-h-20 sm:gap-2 sm:px-2 sm:text-[10px] sm:tracking-widest ${tone}`}
                    >
                      <Icon className="h-5 w-5 shrink-0 sm:h-[22px] sm:w-[22px]" strokeWidth={1.8} />
                      <span className="max-w-full truncate">{name}</span>
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
