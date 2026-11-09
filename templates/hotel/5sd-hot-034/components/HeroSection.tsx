import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Star, ShieldCheck, Play } from '@shared/icons/template-icons';

export interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const HERO_METRICS = [{"label":"Hạng Sao Quốc tế","value":"5 Sao ★"},{"label":"Điểm Đánh giá Booking","value":"9.6 / 10"},{"label":"Bãi biển & Hồ bơi Vô cực","value":"Riêng biệt"},{"label":"Quản gia Butler","value":"24/7"}];
const AVATARS = ["https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80","https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80","https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80"];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-current/10">
      {/* Ambient Artistic Glow */}
      <div
        className="pointer-events-none absolute -top-32 right-10 h-80 w-80 rounded-full blur-[120px] opacity-20"
        style={{ background: '#EA580C' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[120px] opacity-15"
        style={{ background: '#F59E0B' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left 6 Cols: Balanced Headline, Highlights, CTAs & Social Proof */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-lime-300 text-black border-2 border-black font-mono font-bold rounded-xl">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">5SD-HOT-034 • KHÁCH SẠN & LƯU TRÚ</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-black tracking-tight leading-[1.2] tracking-tight">
              Giải Pháp{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #EA580C, #F59E0B)',
                }}
              >
                Cave & Cliffside Suite Hotel
              </span>{' '}
              Chuyên Nghiệp Cùng Veritas
            </h1>

            <p className="text-sm sm:text-base text-zinc-700 leading-relaxed">
              Giải pháp giao diện website Cave & Cliffside Suite Hotel chuyên nghiệp thuộc lĩnh vực Khách sạn & Lưu trú, thiết kế theo phong cách Brutalism. Tích hợp đầy đủ hình ảnh demo thực tế, danh mục sản phẩm/dịch vụ, hồ sơ dự án, bảng giá và công cụ tương tác trực tuyến trên mọi thiết bị.
            </p>

            {/* Key Highlights List */}
            <div className="space-y-2.5 pt-1">
              {["Thiết kế Brutalism tối ưu trải nghiệm ngành Khách sạn & Lưu trú","Đầy đủ hình ảnh Demo thực tế sắc nét cho từng dịch vụ và dự án","Công cụ tương tác chuyên ngành (BOOKING) tính phí trực tiếp"].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: '#EA580C' }}
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons (Never Wrap Awkwardly) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition rounded-xl whitespace-nowrap"
                style={{ background: '#000000' }}
              >
                <span>Kiểm tra Phòng trống</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-amber-100 transition rounded-xl whitespace-nowrap"
              >
                <Play className="h-4 w-4 shrink-0" />
                <span>Khám phá Tiện ích</span>
              </button>
            </div>

            {/* Customer Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-current/10">
              <div className="flex -space-x-2.5">
                {AVATARS.map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt="Khách hàng"
                    loading="lazy"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <span>★★★★★</span>
                  <span>5/5.0</span>
                </div>
                <p className="text-zinc-700">
                  Được tin chọn bởi hơn <strong>1.200+ khách hàng & đối tác</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: High-Res Demo Photography Showcase + Secondary Photo Strip */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative overflow-hidden p-3 sm:p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=900&q=80"
                  alt="Veritas — Cave & Cliffside Suite Hotel"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Veritas Flagship • 5SD-HOT-034</span>
                </div>

                {/* Bottom Overlay Info inside Hero Photo */}
                <div className="absolute inset-x-3.5 bottom-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-950/85 p-3.5 text-white backdrop-blur-md border border-white/15">
                  <div>
                    <div className="text-xs font-bold">Cave & Cliffside Suite Hotel — Tiêu Chuẩn Quốc Tế</div>
                    <div className="text-[11px] text-slate-300">
                      Cam kết chất lượng • Bảo hành chính hãng • Hỗ trợ 24/7
                    </div>
                  </div>
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '#EA580C' }}
                  >
                    ★ 5 Đánh giá
                  </span>
                </div>
              </div>

              {/* 2 Secondary Demo Thumbnails */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=900&q=80"
                    alt="Demo 1"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Không gian & Thực tế</div>
                    <div className="text-[11px] text-zinc-700 truncate">Chuẩn mực Brutalism</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=900&q=80"
                    alt="Demo 2"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Quy trình Chuyên sâu</div>
                    <div className="text-[11px] text-zinc-700 truncate">Bàn giao đúng cam kết</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column KPI Metrics Strip (Spacious, Zero Cramped Wrapping) */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {HERO_METRICS.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                  CHỈ SỐ 0{i + 1}
                </span>
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: '#EA580C' }} />
              </div>
              <div
                className="text-2xl sm:text-3xl font-extrabold whitespace-nowrap"
                style={{ color: '#EA580C' }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-zinc-700 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
