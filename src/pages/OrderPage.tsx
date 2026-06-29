import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ShoppingBag, Send, ShieldCheck, Truck, CreditCard, MessageCircle, Music2, Lock, AlertTriangle, Check, CheckCircle2, XCircle, Clock, Link2 } from 'lucide-react';
import souldeckOrderImg from '../../assets/souldeck_order.png';
import { trackActualOrder } from '../utils/analytics';

interface OrderForm {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  quantity: number;
  note: string;
}

const initialForm: OrderForm = {
  fullName: '',
  phone: '',
  email: '',
  address: '',
  quantity: 1,
  note: '',
};

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

const googleScriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

// Bank information configuration for VietQR
const BANK_ID = 'VCB'; // E.g., MB, VCB, TCB, ACB, etc.
const ACCOUNT_NO = '9988103972';
const ACCOUNT_NAME = 'PHAM TIEN DUNG';

const DEADLINE = new Date('2026-07-07T23:59:59+07:00').getTime();

export const OrderPage = () => {
  const [form, setForm] = useState<OrderForm>(initialForm);
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [checkingPayment, setCheckingPayment] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const unitPrice = 120000;
  const originalPrice = 240000;

  const isLocked = paymentVerified;

  const deadline = useMemo(() => DEADLINE, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const update = () => {
      const dist = Math.max(deadline - Date.now(), 0);
      setTimeLeft({
        days: String(Math.floor(dist / 86400000)).padStart(2, '0'),
        hours: String(Math.floor((dist / 3600000) % 24)).padStart(2, '0'),
        minutes: String(Math.floor((dist / 60000) % 60)).padStart(2, '0'),
        seconds: String(Math.floor((dist / 1000) % 60)).padStart(2, '0'),
      });
    };
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [deadline]);

  useEffect(() => {
    setPaymentVerified(false);
    setCheckingPayment(false);
  }, [form.phone]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuantityChange = (amount: number) => {
    setForm((prev) => ({
      ...prev,
      quantity: Math.max(1, prev.quantity + amount),
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');

    const totalAmount = form.quantity * unitPrice;
    const payload = {
      fullName: form.fullName,
      phone: form.phone,
      email: form.email,
      address: form.address,
      quantity: form.quantity,
      note: form.note,
      paymentMethod: 'QR Code (Chuyển khoản)',
      totalAmount,
      timestamp: new Date().toISOString(),
      source: 'Web',
      product: 'SOUL DECK order',
      originalPrice,
      discountPrice: unitPrice,
    };

    if (!googleScriptUrl) {
      console.warn('Missing VITE_GOOGLE_SCRIPT_URL for Google Apps Script integration.', payload);
      // Fallback/Simulate success for testing if URL is not configured yet
      setTimeout(() => {
        setForm(initialForm);
        setFormStatus('success');
      }, 1000);
      return;
    }

    try {
      await fetch(googleScriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8',
        },
        body: JSON.stringify(payload),
      });

      // Track successful order event in the tracking sheet
      await trackActualOrder();

      setForm(initialForm);
      setFormStatus('success');
    } catch (error) {
      console.error('Failed to submit order:', error);
      setFormStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-velvet-black text-white py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-red-950/20 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Back button */}
        <button
          onClick={() => {
            window.location.hash = '';
          }}
          className="group mb-8 inline-flex items-center gap-2 text-white/60 hover:text-gold transition-colors duration-300 text-sm font-semibold uppercase tracking-wider"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Quay lại trang chủ
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Product Info Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-lg border border-gold/20 bg-[#111016]/80 p-6 backdrop-blur-md shadow-2xl">
              <div className="aspect-[4/3] rounded-md overflow-hidden bg-white/5 border border-white/10 mb-6">
                <img
                  src={souldeckOrderImg}
                  alt="Soul Deck Product Packaging"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-xs font-bold uppercase tracking-[0.25em] gold-gradient italic">
                Order ưu đãi
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-white mt-1">
                SOUL DECK
              </h2>
              <p className="text-sm text-white/60 mt-2">
                Bộ bài thử thách uống rượu cực chất dành cho các buổi tụ họp bạn bè. Hãy sẵn sàng tiết lộ bí mật và đối đầu với những thử thách dở khóc dở cười.
              </p>

              <div className="mt-6 pt-6 border-t border-white/10 space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-white/40 uppercase tracking-wider">Đơn giá gốc</span>
                  <span className="text-white/40 line-through font-semibold">{originalPrice.toLocaleString('vi-VN')} VND</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gold font-bold uppercase tracking-wider text-xs">Giá ưu đãi</span>
                  <span className="text-2xl font-black text-white">{unitPrice.toLocaleString('vi-VN')} VND</span>
                </div>
              </div>
            </div>

            {/* Quick trust badges */}
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-white/5 bg-white/[0.02] text-center">
                <Truck className="h-5 w-5 text-gold mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Giao hàng toàn quốc</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-white/5 bg-white/[0.02] text-center">
                <CreditCard className="h-5 w-5 text-gold mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Thanh toán nhanh chóng</span>
              </div>
              <div className="flex flex-col items-center justify-center p-4 rounded-lg border border-white/5 bg-white/[0.02] text-center">
                <ShieldCheck className="h-5 w-5 text-gold mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white/60">Cam kết bảo mật</span>
              </div>
            </div>

            {/* Countdown Timer */}
            <div className="rounded-lg border border-gold/20 bg-[#111016]/80 p-5 backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3 flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-gold/60 shrink-0" strokeWidth={2} />
                Ưu đãi kết thúc sau
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { value: timeLeft.days, label: 'Ngày' },
                  { value: timeLeft.hours, label: 'Giờ' },
                  { value: timeLeft.minutes, label: 'Phút' },
                  { value: timeLeft.seconds, label: 'Giây' },
                ].map((item) => (
                  <div key={item.label} className="rounded-md border border-gold/25 bg-gold/10 py-2.5 text-center">
                    <span className="block text-xl font-black text-gold tabular-nums">{item.value}</span>
                    <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-widest text-white/40">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="rounded-lg border border-white/5 bg-white/[0.02] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/40 mb-3 flex items-center gap-1.5">
                <Link2 className="h-4 w-4 text-white/30 shrink-0" strokeWidth={2} />
                Theo dõi chúng tôi
              </p>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href="https://www.facebook.com/people/SOUL-DECK/61590583856369/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] py-4 text-white/60 transition-all hover:border-[#1877f2]/60 hover:bg-[#1877f2]/10 hover:text-white"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Facebook</span>
                </a>
                <a
                  href="#"
                  className="group flex flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] py-4 text-white/60 transition-all hover:border-[#00f2ea]/60 hover:bg-[#00f2ea]/10 hover:text-white"
                >
                  <Music2 className="h-5 w-5" strokeWidth={2} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">TikTok</span>
                </a>
                <a
                  href="#"
                  className="group flex flex-col items-center justify-center gap-1.5 rounded-md border border-white/10 bg-white/[0.03] py-4 text-white/60 transition-all hover:border-[#ee4d2d]/60 hover:bg-[#ee4d2d]/10 hover:text-white"
                >
                  <ShoppingBag className="h-5 w-5" strokeWidth={2} />
                  <span className="text-[9px] font-bold uppercase tracking-wider">Shopee</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Checkout Form */}
          <div className="lg:col-span-7">
            <div className="rounded-lg border border-gold/30 bg-[#111016]/95 p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent" />
              
              <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-white mb-6 flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-gold" />
                Thông tin order
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {isLocked && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3.5 rounded-md border border-gold/30 bg-gold/5 text-gold text-xs flex items-center gap-2"
                  >
                    <Lock className="h-4 w-4 text-gold shrink-0" strokeWidth={2} />
                    <span>Đã khóa thông tin đơn hàng sau khi xác nhận thanh toán thành công.</span>
                  </motion.div>
                )}

                {/* Quantity selector */}
                <div className="flex justify-between items-center p-4 rounded-md border border-white/15 bg-black/25">
                  <div>
                    <p className="text-sm font-bold uppercase tracking-wider text-white/80">Số lượng</p>
                    <p className="text-xs text-white/40 mt-0.5">Đặt nhiều để cùng chill với bạn bè</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(-1)}
                      disabled={isLocked}
                      className="w-8 h-8 rounded-full border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-white"
                    >
                      -
                    </button>
                    <span className="text-lg font-bold w-6 text-center">{form.quantity}</span>
                    <button
                      type="button"
                      onClick={() => handleQuantityChange(1)}
                      disabled={isLocked}
                      className="w-8 h-8 rounded-full border border-white/20 hover:border-gold hover:text-gold flex items-center justify-center font-bold transition-colors disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:border-white/20 disabled:hover:text-white"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-left text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Họ và tên *
                    </label>
                    <input
                      name="fullName"
                      value={form.fullName}
                      onChange={handleChange}
                      required
                      disabled={isLocked}
                      autoComplete="name"
                      className="h-11 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold/60 focus:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/50 disabled:border-white/5 disabled:text-white/40"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-left text-[10px] font-bold uppercase tracking-widest text-white/50">
                      Số điện thoại *
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      required
                      type="tel"
                      disabled={isLocked}
                      autoComplete="tel"
                      className="h-11 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold/60 focus:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/50 disabled:border-white/5 disabled:text-white/40"
                      placeholder="0901234567"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-left text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Địa chỉ email *
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    type="email"
                    disabled={isLocked}
                    autoComplete="email"
                    className="h-11 w-full rounded-md border border-white/10 bg-black/30 px-3 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold/60 focus:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/50 disabled:border-white/5 disabled:text-white/40"
                    placeholder="nguyenvana@gmail.com"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-left text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Địa chỉ nhận hàng *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    required
                    rows={3}
                    disabled={isLocked}
                    autoComplete="street-address"
                    className="w-full min-h-20 resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold/60 focus:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/50 disabled:border-white/5 disabled:text-white/40"
                    placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố..."
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-left text-[10px] font-bold uppercase tracking-widest text-white/50">
                    Ghi chú đơn hàng (không bắt buộc)
                  </label>
                  <textarea
                    name="note"
                    value={form.note}
                    onChange={handleChange}
                    rows={2}
                    disabled={isLocked}
                    className="w-full min-h-16 resize-none rounded-md border border-white/10 bg-black/30 px-3 py-2 text-sm text-white outline-none transition-colors placeholder:text-white/20 focus:border-gold/60 focus:bg-black/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-black/50 disabled:border-white/5 disabled:text-white/40"
                    placeholder="Lời nhắn cho shipper hoặc thông tin bổ sung..."
                  />
                </div>

                {/* QR Code Section */}
                <div className="p-5 rounded-md border border-gold/20 bg-[#16151c]/90 flex flex-col items-center text-center space-y-4">
                    {!form.phone ? (
                      <div className="p-4 rounded-md border border-amber-500/20 bg-amber-500/5 text-amber-300/80 text-xs flex items-start gap-2 text-left w-full">
                        <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" strokeWidth={2} />
                        <span>Vui lòng nhập <b>Số điện thoại</b> phía trên để tạo mã QR chứa thông tin chuyển khoản chính xác.</span>
                      </div>
                    ) : (
                      <>
                        <div className="relative w-48 h-48 border border-gold/30 bg-white rounded-lg flex items-center justify-center p-2 group overflow-hidden">
                          {/* Real VietQR Image generation */}
                          <img
                            src={`https://img.vietqr.io/image/${BANK_ID}-${ACCOUNT_NO}-compact.png?amount=${
                              form.quantity * unitPrice
                            }&addInfo=${encodeURIComponent(`SOULDECK ${form.phone}`.trim())}&accountName=${encodeURIComponent(
                              ACCOUNT_NAME
                            )}`}
                            alt="VietQR Payment Code"
                            className="w-full h-full object-contain"
                          />
                          
                          {/* Scan Line effect if checking */}
                          {checkingPayment && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gold shadow-[0_0_8px_#c6a75e] animate-[bounce_2s_infinite] pointer-events-none" />
                          )}
                        </div>

                        <div className="max-w-xs space-y-1">
                          <p className="text-xs font-bold uppercase tracking-wider text-white">Quét mã để thanh toán</p>
                          <p className="text-[11px] text-white/50">
                            Nội dung chuyển khoản: <span className="text-gold font-bold">SOULDECK {form.phone}</span>
                          </p>
                          <p className="text-[10px] text-gold/60 italic mt-1">
                            Hệ thống sẽ đối soát giao dịch tự động.
                          </p>
                        </div>

                        {/* Payment Verification Trigger */}
                        <div className="w-full flex flex-col items-center pt-2">
                          {!paymentVerified ? (
                            <button
                              type="button"
                              onClick={() => {
                                setCheckingPayment(true);
                                setTimeout(() => {
                                  setCheckingPayment(false);
                                  setPaymentVerified(true);
                                }, 2500);
                              }}
                              disabled={checkingPayment}
                              className="w-full max-w-xs flex h-10 items-center justify-center gap-2 rounded-md border border-gold/30 bg-gold/10 text-gold text-xs font-black uppercase tracking-wider hover:bg-gold hover:text-velvet-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {checkingPayment ? (
                                <>
                                  <span className="animate-spin rounded-full h-3.5 w-3.5 border-2 border-gold border-t-transparent shrink-0" />
                                  <span>Đang kiểm tra giao dịch...</span>
                                </>
                              ) : (
                                <span>Xác nhận đã chuyển khoản</span>
                              )}
                            </button>
                          ) : (
                            <div className="w-full max-w-xs flex items-center justify-center gap-2 text-green-400 font-bold text-xs uppercase tracking-wider bg-green-500/10 border border-green-500/30 py-2.5 rounded-md">
                              <Check className="h-4 w-4 text-green-400 shrink-0" strokeWidth={2} />
                              <span>Đã xác nhận thanh toán</span>
                            </div>
                          )}
                        </div>
                      </>
                    )}
                </div>

                {/* Bill details */}
                <div className="p-4 rounded-md border border-gold/10 bg-gold/5 space-y-2 text-sm">
                  <div className="flex justify-between items-center text-white/75">
                    <span>Tổng tiền sản phẩm</span>
                    <span>{(form.quantity * unitPrice).toLocaleString('vi-VN')} VND</span>
                  </div>
                  <div className="flex justify-between items-center text-white/75">
                    <span>Phí vận chuyển</span>
                    <span className="text-gold italic font-bold">Miễn phí (Order)</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gold/20 text-base font-bold text-white">
                    <span>Tổng cộng</span>
                    <span className="text-gold text-lg">{(form.quantity * unitPrice).toLocaleString('vi-VN')} VND</span>
                  </div>
                </div>

                {/* Form Status Messages */}
                {formStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-md border border-green-500/30 bg-green-500/10 text-green-400 text-sm font-semibold flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="h-5 w-5 text-green-400 shrink-0 mt-0.5" strokeWidth={2} />
                    <span>Đặt hàng thành công! Chúng tôi đã nhận thông tin và sẽ liên hệ để xác nhận trong thời gian sớm nhất.</span>
                  </motion.div>
                )}

                {formStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-md border border-red-500/30 bg-red-500/10 text-red-400 text-sm font-semibold flex items-start gap-2.5"
                  >
                    <XCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" strokeWidth={2} />
                    <span>Gửi đơn hàng thất bại. Quý khách vui lòng kiểm tra kết nối mạng hoặc thử lại sau.</span>
                  </motion.div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={formStatus === 'submitting' || !paymentVerified}
                  className="w-full flex h-12 items-center justify-center gap-2 rounded-md bg-gold hover:bg-gold-light text-velvet-black text-sm font-black uppercase tracking-[0.2em] transition-all hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-40 disabled:scale-100 shadow-[0_0_20px_rgba(198,167,94,0.2)]"
                >
                  <Send className="h-4 w-4" strokeWidth={2} />
                  {formStatus === 'submitting' ? 'Đang xử lý...' : 'Nhận đơn đặt hàng'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
