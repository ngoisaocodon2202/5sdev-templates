import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Star, ShieldCheck, Play } from '@shared/icons/template-icons';
import { AnimatedCounter, ScrollReveal } from '@shared/components';

export interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const HERO_METRICS = [{"label":"Điểm đến Toàn cầu","value":"120+"},{"label":"Tỷ lệ Visa Thành công","value":"99.2%"},{"label":"Khách hàng Mỗi năm","value":"60.000+"},{"label":"Bảo hiểm Du lịch","value":"2.5 Tỷ VNĐ"}];
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
        style={{ background: '#0D9488' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[120px] opacity-15"
        style={{ background: '#2563EB' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left 6 Cols: Balanced Headline, Highlights, CTAs & Social Proof */}
          <ScrollReveal direction="left" className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">5SD-TRA-008 • DU LỊCH & LỮ HÀNH</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-bold tracking-tight leading-[1.2] tracking-tight">
              Giải Pháp{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #0D9488, #2563EB)',
                }}
              >
                European Heritage Rail Tours
              </span>{' '}
              Chuyên Nghiệp Cùng Elysian
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Giải pháp giao diện website European Heritage Rail Tours chuyên nghiệp thuộc lĩnh vực Du lịch & Lữ hành, thiết kế theo phong cách Soft UI. Tích hợp đầy đủ hình ảnh demo thực tế, danh mục sản phẩm/dịch vụ, hồ sơ dự án, bảng giá và công cụ tương tác trực tuyến trên mọi thiết bị.
            </p>

            {/* Key Highlights List */}
            <div className="space-y-2.5 pt-1">
              {["Thiết kế Soft UI tối ưu trải nghiệm ngành Du lịch & Lữ hành","Đầy đủ hình ảnh Demo thực tế sắc nét cho từng dịch vụ và dự án","Công cụ tương tác chuyên ngành (BOOKING) tính phí trực tiếp"].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: '#0D9488' }}
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons (Never Wrap Awkwardly) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl whitespace-nowrap shadow-lg"
                style={{ background: 'linear-gradient(135deg, #0D9488, #2563EB)' }}
              >
                <span>Đặt Tour Trọn gói</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition rounded-2xl whitespace-nowrap"
              >
                <Play className="h-4 w-4 shrink-0" />
                <span>Lịch trình Chi tiết</span>
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
                <p className="text-slate-600">
                  Được tin chọn bởi hơn <strong>1.200+ khách hàng & đối tác</strong>
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Right 6 Cols: High-Res Demo Photography Showcase + Secondary Photo Strip */}
          <ScrollReveal direction="right" className="lg:col-span-6 space-y-4">
            <div className="relative overflow-hidden p-3 sm:p-4 bg-white border border-slate-200/90 shadow-sm rounded-2xl shadow-xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1200&q=80"
                  alt="Elysian — European Heritage Rail Tours"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-lg bg-slate-950/85 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>© Bản quyền 5S DEV (5sdev.vn) • 5SD-TRA-008</span>
                </div>

                {/* Bottom Overlay Info inside Hero Photo */}
                <div className="absolute inset-x-3.5 bottom-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-950/85 p-3.5 text-white backdrop-blur-md border border-white/15">
                  <div>
                    <div className="text-xs font-bold">European Heritage Rail Tours — Tiêu Chuẩn Quốc Tế</div>
                    <div className="text-[11px] text-slate-300">
                      Cam kết chất lượng • Bảo hành chính hãng • Hỗ trợ 24/7
                    </div>
                  </div>
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '#0D9488' }}
                  >
                    ★ 5 Đánh giá
                  </span>
                </div>
              </div>

              {/* 2 Secondary Demo Thumbnails */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80"
                    alt="Demo 1"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Không gian & Thực tế</div>
                    <div className="text-[11px] text-slate-600 truncate">Chuẩn mực Soft UI</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=1200&q=80"
                    alt="Demo 2"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Quy trình Chuyên sâu</div>
                    <div className="text-[11px] text-slate-600 truncate">Bàn giao đúng cam kết</div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Full-Width 4-Column KPI Metrics Strip (Animated Counters + Scroll Reveal) */}
        <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 sm:gap-6">
          {HERO_METRICS.map((stat, i) => (
            <ScrollReveal
              key={i}
              direction={i % 2 === 0 ? 'left' : 'right'}
              delay={i * 80}
              className="p-5 sm:p-6 bg-white border border-slate-200/90 shadow-sm rounded-2xl flex flex-col justify-between shadow-lg"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                  CHỈ SỐ 0{i + 1}
                </span>
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: '#0D9488' }} />
              </div>
              <div
                className="text-xl sm:text-2xl lg:text-3xl font-extrabold whitespace-nowrap"
                style={{ color: '#0D9488' }}
              >
                <AnimatedCounter value={stat.value} />
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                {stat.label}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
