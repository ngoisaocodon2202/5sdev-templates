import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
} from '@shared/icons/template-icons';

const DOMAIN_ITEMS = [
  {
    "title": "Sofa Góc Da Bò Ý Thật Nguyên Tấm Chế Tác Thủ Công (Aethel)",
    "tag": "Best Seller",
    "price": 34500000,
    "meta": "Khung gỗ sồi Nga • Đệm lông vũ êm ái • Bảo hành 10 năm",
    "id": "5SD-FUR-012-ITEM-1"
  },
  {
    "title": "Bộ Bàn Ăn Gỗ Óc Chó Bắc Mỹ 8 Ghế Bọc Da Microfiber (Aethel)",
    "tag": "Luxury Dining",
    "price": 26800000,
    "meta": "Tẩm sấy chống cong vênh • Sơn dầu lau tự nhiên an toàn",
    "id": "5SD-FUR-012-ITEM-2"
  },
  {
    "title": "Ghế Công Thái Học Flagship Lưới Đàn Hồi Đa Điểm (Aethel)",
    "tag": "Ergonomic Pro",
    "price": 7900000,
    "meta": "Hỗ trợ cột sống thắt lưng 4D • Tựa đầu chỉnh đa hướng",
    "id": "5SD-FUR-012-ITEM-3"
  },
  {
    "title": "Đèn Chùm Pha Lê & Đồng Nguyên Chất Thiết Kế Đương Đại (Aethel)",
    "tag": "Art Lighting",
    "price": 12400000,
    "meta": "Ánh sáng CRI > 95 tôn vinh không gian • Điều chỉnh độ sáng",
    "id": "5SD-FUR-012-ITEM-4"
  }
];

export const InteractiveWidget: React.FC = () => {
  const widgetType: string = 'commerce';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('19:00');
  const [sliderValue, setSliderValue] = useState(12);
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [actionConfirmed, setActionConfirmed] = useState(false);

  const activeItem = DOMAIN_ITEMS[selectedIndex] || DOMAIN_ITEMS[0];

  const formatVnd = (amount: number) => {
    if (amount <= 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const estimatedTotal =
    widgetType === 'commerce'
      ? activeItem.price * quantity
      : widgetType === 'booking'
      ? activeItem.price * guestCount
      : widgetType === 'calculator'
      ? Math.round((activeItem.price * sliderValue) / 10)
      : billingAnnual
      ? Math.round(activeItem.price * 0.8)
      : activeItem.price;

  return (
    <section id="interactive-section" className="py-16 sm:py-20 border-b border-current/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              TRẢI NGHIỆM TƯƠNG TÁC THỰC TẾ • FURNITURE & HOME DECOR
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold tracking-tight">
              Danh Mục & Công Cụ Tương Tác Mid-Century Modern Collectibles
            </h2>
            <p className="mt-1.5 text-sm text-slate-600">
              Lựa chọn gói sản phẩm/dịch vụ bên dưới để tính toán chi phí và trải nghiệm quy trình đặt hàng trực tiếp.
            </p>
          </div>

          {widgetType === 'configurator' && (
            <div className="inline-flex items-center gap-2 p-1.5 bg-white border border-slate-200/90 shadow-sm rounded-2xl">
              <button
                type="button"
                onClick={() => setBillingAnnual(false)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                  !billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }`}
              >
                Theo Tháng
              </button>
              <button
                type="button"
                onClick={() => setBillingAnnual(true)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition ${
                  billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }`}
              >
                Theo Năm (-20%)
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOMAIN_ITEMS.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setActionConfirmed(false);
                  }}
                  className={`cursor-pointer p-5 transition-all ${
                    isSelected ? 'ring-2 ring-offset-2' : 'opacity-90 hover:opacity-100'
                  } bg-white border border-slate-200/90 shadow-sm rounded-2xl`}
                  style={{
                    borderColor: isSelected ? '#B45309' : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 text-[11px] font-bold rounded-md text-white"
                      style={{ background: idx % 2 === 0 ? '#B45309' : '#D97706' }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs opacity-60">{item.id}</span>
                  </div>
                  <h3 className="text-base font-bold mb-1.5">{item.title}</h3>
                  <p className="text-xs text-slate-600 mb-4">{item.meta}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-current/10">
                    <span className="text-lg font-extrabold" style={{ color: '#B45309' }}>
                      {formatVnd(item.price)}
                    </span>
                    <span className="text-xs font-semibold underline">
                      {isSelected ? 'Đang chọn ✓' : 'Chọn mục này'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 bg-white border border-slate-200/90 shadow-sm rounded-2xl space-y-5">
              <div className="border-b border-current/10 pb-4">
                <span className="text-xs font-mono uppercase opacity-70">
                  BẢNG ĐIỀU KHIỂN TRỰC TUYẾN • 5SD-FUR-012
                </span>
                <h3 className="text-xl font-bold mt-1">{activeItem.title}</h3>
                <p className="text-xs text-slate-600 mt-1">{activeItem.meta}</p>
              </div>

              {widgetType === 'commerce' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Số lượng đặt mua:</span>
                    <div className="inline-flex items-center gap-3 border border-current/20 rounded-xl px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 hover:opacity-70"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-sm font-bold w-6 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 hover:opacity-70"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {widgetType === 'booking' && (
                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Ngày đặt lịch:</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Khung giờ:</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2"
                      >
                        <option value="09:00" className="text-black">09:00 Sáng</option>
                        <option value="14:00" className="text-black">14:00 Chiều</option>
                        <option value="19:00" className="text-black">19:00 Tối</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold">Số lượng khách / suất:</span>
                    <div className="inline-flex items-center gap-3 border border-current/20 rounded-xl px-3 py-1">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono font-bold">{guestCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(guestCount + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {widgetType === 'calculator' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>Quy mô / Thời hạn tùy chỉnh:</span>
                    <span className="font-mono font-bold" style={{ color: '#B45309' }}>
                      {sliderValue} đơn vị
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <p className="text-[11px] text-slate-600">
                    Kéo thanh trượt để ước tính ngân sách theo quy mô thực tế của bạn.
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-current/15 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-600 block">Tổng chi phí tạm tính:</span>
                  <span className="text-2xl font-extrabold" style={{ color: '#B45309' }}>
                    {formatVnd(estimatedTotal)}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  Sẵn sàng
                </span>
              </div>

              {actionConfirmed ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Đã xác nhận yêu cầu thành công!</span>
                  </div>
                  <p className="text-slate-600">
                    Mã tham chiếu: <strong>{activeItem.id}</strong> • Tổng: <strong>{formatVnd(estimatedTotal)}</strong>.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActionConfirmed(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl"
                  style={{
                    background: 'linear-gradient(135deg, #B45309, #D97706)',
                  }}
                >
                  <span>Đặt mua Nội thất Ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
