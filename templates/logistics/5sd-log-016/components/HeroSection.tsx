import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Star, ShieldCheck, Play } from '@shared/icons/template-icons';

export interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const HERO_METRICS = [{"label":"Tuyến Vận tải Quốc tế","value":"160+ Cảng"},{"label":"Tỷ lệ Giao hàng Đúng hẹn","value":"99.3%"},{"label":"Hệ thống Kho Ngoại quan","value":"250.000 m²"},{"label":"Theo dõi GPS Thời gian thực","value":"24/7"}];
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
        style={{ background: '#059669' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[120px] opacity-15"
        style={{ background: '#0EA5E9' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left 6 Cols: Balanced Headline, Highlights, CTAs & Social Proof */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-500/15 text-cyan-300 border border-indigo-500/30 font-mono rounded-2xl">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">5SD-LOG-016 • VẬN TẢI & CHUỖI CUNG ỨNG</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-display font-extrabold tracking-tight leading-[1.2] tracking-tight">
              Giải Pháp{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #059669, #0EA5E9)',
                }}
              >
                Rail Freight Eurasia Corridor
              </span>{' '}
              Chuyên Nghiệp Cùng Lumiere
            </h1>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Giải pháp giao diện website Rail Freight Eurasia Corridor chuyên nghiệp thuộc lĩnh vực Vận tải & Chuỗi cung ứng, thiết kế theo phong cách 3D Interactive. Tích hợp đầy đủ hình ảnh demo thực tế, danh mục sản phẩm/dịch vụ, hồ sơ dự án, bảng giá và công cụ tương tác trực tuyến trên mọi thiết bị.
            </p>

            {/* Key Highlights List */}
            <div className="space-y-2.5 pt-1">
              {["Thiết kế 3D Interactive tối ưu trải nghiệm ngành Vận tải & Chuỗi cung ứng","Đầy đủ hình ảnh Demo thực tế sắc nét cho từng dịch vụ và dự án","Công cụ tương tác chuyên ngành (CALCULATOR) tính phí trực tiếp"].map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: '#059669' }}
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
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition rounded-2xl whitespace-nowrap"
                style={{ background: 'linear-gradient(135deg, #059669, #0EA5E9)' }}
              >
                <span>Tra cứu Vận đơn & Cước phí</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold bg-slate-900 text-slate-100 border border-slate-700 hover:border-slate-500 transition rounded-2xl whitespace-nowrap"
              >
                <Play className="h-4 w-4 shrink-0" />
                <span>Mạng lưới Kho vận</span>
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
                  <span>4.8/5.0</span>
                </div>
                <p className="text-slate-400">
                  Được tin chọn bởi hơn <strong>1.200+ khách hàng & đối tác</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: High-Res Demo Photography Showcase + Secondary Photo Strip */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative overflow-hidden p-3 sm:p-4 bg-[#101726] border border-slate-800/90 shadow-xl rounded-2xl">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src="https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=900&q=80"
                  alt="Lumiere — Rail Freight Eurasia Corridor"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Lumiere Flagship • 5SD-LOG-016</span>
                </div>

                {/* Bottom Overlay Info inside Hero Photo */}
                <div className="absolute inset-x-3.5 bottom-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-950/85 p-3.5 text-white backdrop-blur-md border border-white/15">
                  <div>
                    <div className="text-xs font-bold">Rail Freight Eurasia Corridor — Tiêu Chuẩn Quốc Tế</div>
                    <div className="text-[11px] text-slate-300">
                      Cam kết chất lượng • Bảo hành chính hãng • Hỗ trợ 24/7
                    </div>
                  </div>
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '#059669' }}
                  >
                    ★ 4.8 Đánh giá
                  </span>
                </div>
              </div>

              {/* 2 Secondary Demo Thumbnails */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80"
                    alt="Demo 1"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Không gian & Thực tế</div>
                    <div className="text-[11px] text-slate-400 truncate">Chuẩn mực 3D Interactive</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80"
                    alt="Demo 2"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Quy trình Chuyên sâu</div>
                    <div className="text-[11px] text-slate-400 truncate">Bàn giao đúng cam kết</div>
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
              className="p-5 sm:p-6 bg-[#101726] border border-slate-800/90 shadow-xl rounded-2xl flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                  CHỈ SỐ 0{i + 1}
                </span>
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: '#059669' }} />
              </div>
              <div
                className="text-2xl sm:text-3xl font-extrabold whitespace-nowrap"
                style={{ color: '#059669' }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold text-slate-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
