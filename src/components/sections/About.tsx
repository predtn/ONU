import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(textRef.current.children, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1, 
        stagger: 0.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: textRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-40 bg-velvet-black relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div ref={textRef}>
          <h2 className="text-sm uppercase tracking-[0.4em] text-gold font-bold mb-6">Signature idea</h2>
          <h3 className="text-4xl md:text-6xl font-black mb-8 uppercase leading-tight">
            Căng não <br /> 
            Giữa <span className="gold-gradient italic">Rủi ro & Phần thưởng</span>
          </h3>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-8 max-w-xl">
            Một party card game kết hợp giữa cơ chế đánh bài kiểu màu-số-action và hệ thống thử thách xã hội sau mỗi vòng chơi. Người chơi không chỉ cố gắng đánh hết bài trước, mà còn phải tính toán việc giữ lại các lá đặc biệt để can thiệp vào “Phase Thử Thách” sau khi vòng đấu kết thúc.
          </p>
          
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-wine-red/20 border border-wine-red flex items-center justify-center shrink-0">
                <span className="text-gold font-heading font-bold italic">01</span>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-1">Chạy bài</h4>
                <p className="text-white/40 text-sm">Chạy bài, phá nhau, đua thắng. Giữ hay đánh lá Wild là quyết định của bạn — và nó có giá của nó.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-royal-purple/20 border border-royal-purple flex items-center justify-center shrink-0">
                <span className="text-gold font-heading font-bold italic">02</span>
              </div>
              <div>
                <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-1">Thử thách</h4>
                <p className="text-white/40 text-sm">Người thua rút thử thách. Nhưng ai còn lá đặc biệt trong tay — cuộc chơi chưa kết thúc đâu.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gold/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
          <div className="relative border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
             {/* Luxury Card Mockup Representation */}
             <div className="aspect-[4/5] bg-gradient-to-br from-wine-red via-velvet-black to-royal-purple flex items-center justify-center p-8 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]" />
                <div className="border-[12px] border-gold/20 w-full h-full flex flex-col items-center justify-center">
                  <span className="text-gold/30 text-9xl font-heading font-black italic opacity-20">V</span>
                  <div className="absolute bottom-8 text-gold uppercase tracking-[0.5em] font-bold text-xs">Premium Collection</div>
                </div>
             </div>
             {/* Staggered overlapping "cards" */}
             <div className="absolute -bottom-8 -right-8 w-2/3 aspect-[4/5] bg-gold scale-95 -rotate-6 z-[-1] opacity-50 blur-sm" />
             <div className="absolute -bottom-10 -right-10 w-2/3 aspect-[4/5] bg-royal-purple z-[-2] -rotate-12 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
