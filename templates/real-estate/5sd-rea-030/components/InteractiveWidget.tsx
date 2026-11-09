import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Star,
  ShieldCheck,
} from '@shared/icons/template-icons';
import { ScrollReveal } from '@shared/components';

const DOMAIN_ITEMS = [
  {
    "title": "Biệt Thự Đơn Lập Ven Sông Sân Vườn Riêng 450m²",
    "tag": "Sổ hồng lâu dài",
    "price": 28500000,
    "meta": "Bến du thuyền nội khu • Bàn giao hoàn thiện",
    "id": "5SD-REA-030-01",
    "image": "https://images.unsplash.com/photo-1584738766473-61c083514bf4?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "title": "Căn Hộ Sky Villa 3 Phòng Ngủ Tầm Nhìn Panorama",
    "tag": "Hỗ trợ vay 70%",
    "price": 8900000,
    "meta": "Thang máy riêng • Hệ thống SmartHome chuẩn Đức",
    "id": "5SD-REA-030-02",
    "image": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "title": "Shophouse Thương Mại Đại Lộ Trung Tâm Đắc Địa",
    "tag": "Cam kết thuê 8%/năm",
    "price": 16400000,
    "meta": "2 mặt tiền • Khu dân cư sầm uất 50.000 dân",
    "id": "5SD-REA-030-03",
    "image": "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80"
  },
  {
    "title": "Văn Phòng Hạng A Chuẩn LEED Gold Trung Tâm Quận 1",
    "tag": "Leasing",
    "price": 950000,
    "meta": "Giá thuê/m² • Hệ thống quản lý tòa nhà BMS",
    "id": "5SD-REA-030-04",
    "image": "https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1200&q=80"
  }
];

export const InteractiveWidget: React.FC = () => {
  const widgetType: string = 'calculator';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [sliderValue, setSliderValue] = useState(10);
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
    <section id="interactive-section" className="py-14 sm:py-20 border-b border-current/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-stone-900 text-amber-100 font-medium tracking-wide rounded-xl mb-2">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>SẢN PHẨM & DỊCH VỤ TRỌNG ĐIỂM • 5SD-REA-030</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold tracking-tight">
              Khám Phá Các Gói Waterfront Shophouse Boulevard Nổi Bật
            </h2>
            <p className="mt-2 text-sm text-stone-600">
              Mỗi gói giải pháp đều đi kèm hình ảnh thực tế, thông số minh bạch và công cụ tính toán chi phí trực tiếp.
            </p>
          </div>

          {widgetType === 'configurator' && (
            <div className="inline-flex items-center gap-2 p-1.5 bg-white border border-stone-200/90 shadow-sm rounded-xl self-start">
              <button
                type="button"
                onClick={() => setBillingAnnual(false)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  !billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }`}
              >
                Theo Tháng
              </button>
              <button
                type="button"
                onClick={() => setBillingAnnual(true)}
                className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap ${
                  billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }`}
              >
                Theo Năm (Tiết kiệm 20%)
              </button>
            </div>
          )}
        </div>

        {/* 1. Spacious 2-Column Showcase Cards with Real Demo Images & 2-Side Scroll In */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DOMAIN_ITEMS.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <ScrollReveal
                key={item.id}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={idx * 100}
                className="flex"
              >
                <div
                  onClick={() => {
                    setSelectedIndex(idx);
                    setActionConfirmed(false);
                  }}
                  className={`w-full group cursor-pointer overflow-hidden transition-all duration-300 ${
                    isSelected ? 'ring-2 ring-offset-2' : 'hover:-translate-y-0.5'
                  } bg-white border border-stone-200/90 shadow-sm rounded-xl flex flex-col`}
                  style={{
                    borderColor: isSelected ? '#1D4ED8' : undefined,
                  }}
                >
                  {/* Card Demo Image */}
                  <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
                    <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                      <span
                        className="px-3 py-1 text-xs font-bold rounded-lg text-white shadow whitespace-nowrap"
                        style={{ background: idx % 2 === 0 ? '#1D4ED8' : '#06B6D4' }}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <div className="absolute right-3.5 top-3.5 rounded-lg bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] font-bold text-white backdrop-blur-md">
                      {item.id}
                    </div>
                    <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                      <span className="text-xs font-semibold bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm whitespace-nowrap">
                        ★ 4.9 Đánh giá thực tế
                      </span>
                      <span className="text-base sm:text-lg lg:text-xl font-extrabold bg-slate-950/85 px-3 py-1 rounded-lg whitespace-nowrap">
                        {formatVnd(item.price)}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div>
                      <h3 className="text-base sm:text-lg font-bold leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-xs sm:text-sm text-stone-600 leading-relaxed">
                        {item.meta}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-current/10">
                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold truncate">
                        <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#1D4ED8' }} />
                        <span className="truncate">Có sẵn • Hỗ trợ tư vấn</span>
                      </span>
                      <button
                        type="button"
                        className="px-4 py-2 text-xs font-bold rounded-xl text-white whitespace-nowrap transition shrink-0"
                        style={{
                          background: isSelected ? '#1D4ED8' : '#334155',
                        }}
                      >
                        {isSelected ? 'Đang chọn ✓' : 'Chọn gói này'}
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* 2. Interactive Online Calculator / Booking / Order Studio */}
        <div className="p-6 sm:p-8 bg-white border border-stone-200/90 shadow-sm rounded-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-75">
                <ShieldCheck className="h-4 w-4" style={{ color: '#1D4ED8' }} />
                <span>CÔNG CỤ TÍNH PHÍ & ĐẶT LỊCH TRỰC TUYẾN</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Đang cấu hình: {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                {activeItem.meta} — Tùy chỉnh các thông số bên dưới để nhận báo giá chính xác ngay lập tức.
              </p>

              {widgetType === 'commerce' && (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <span className="text-sm font-semibold">Số lượng đặt mua:</span>
                  <div className="inline-flex items-center gap-4 border border-current/20 rounded-xl px-4 py-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:opacity-70"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-base font-bold w-8 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:opacity-70"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {widgetType === 'booking' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold mb-1.5">Ngày hẹn:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1.5">Khung giờ:</label>
                    <div className="grid grid-cols-3 gap-1.5">
                      {[
                        { value: '09:00', label: '09:00 Sáng' },
                        { value: '14:00', label: '14:00 Chiều' },
                        { value: '19:00', label: '19:00 Tối' },
                      ].map((slot) => (
                        <button
                          key={slot.value}
                          type="button"
                          onClick={() => setBookingTime(slot.value)}
                          className={`rounded-xl py-2 px-1 text-center font-bold text-[11px] transition-all whitespace-nowrap ${
                            bookingTime === slot.value
                              ? 'shadow-md ring-2 ring-indigo-500/50'
                              : 'border border-current/15 opacity-70 hover:opacity-100'
                          }`}
                          style={bookingTime === slot.value ? { backgroundColor: '#1D4ED8', color: '#ffffff' } : {}}
                        >
                          {slot.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1.5">Số lượng khách / suất:</label>
                    <div className="flex items-center justify-between border border-current/20 rounded-xl px-3.5 py-2">
                      <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-mono text-sm font-bold">{guestCount}</span>
                      <button type="button" onClick={() => setGuestCount(guestCount + 1)}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {widgetType === 'calculator' && (
                <div className="space-y-2 pt-2 text-xs sm:text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>Quy mô / Diện tích / Thời hạn dự kiến:</span>
                    <span className="font-mono font-bold" style={{ color: '#1D4ED8' }}>
                      {sliderValue * 10} đơn vị tiêu chuẩn
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
                </div>
              )}
            </div>

            {/* Right 5 Cols: Total Summary & Instant Action */}
            <div className="lg:col-span-5 rounded-2xl border border-current/15 p-5 sm:p-6 space-y-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-current/10 pb-4">
                <span className="text-xs sm:text-sm text-stone-600">Tổng chi phí dự kiến:</span>
                <span
                  className="text-xl sm:text-2xl lg:text-3xl font-extrabold whitespace-nowrap"
                  style={{ color: '#1D4ED8' }}
                >
                  {formatVnd(estimatedTotal)}
                </span>
              </div>

              {actionConfirmed ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Đã ghi nhận yêu cầu đặt dịch vụ!</span>
                  </div>
                  <p className="text-stone-600">
                    Mã phiếu: <strong>{activeItem.id}</strong> • Tổng cộng:{' '}
                    <strong>{formatVnd(estimatedTotal)}</strong>
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActionConfirmed(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold bg-stone-900 text-amber-50 hover:bg-stone-800 transition shadow-md rounded-xl whitespace-nowrap"
                  style={{ background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)' }}
                >
                  <span>Xác Nhận Đăng ký Tham quan Dự án</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
