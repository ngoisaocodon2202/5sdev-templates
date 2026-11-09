import React from 'react';
import { ArrowRight, Sparkles, ShieldCheck } from '@shared/icons/template-icons';

export interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <section className="relative overflow-hidden py-14 sm:py-20 lg:py-24 border-b border-current/10">
      <div
        className="pointer-events-none absolute -top-32 right-10 h-80 w-80 rounded-full blur-[110px] opacity-25"
        style={{ background: '#7C3AED' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#EC4899' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-500/15 text-cyan-300 border border-indigo-500/30 font-mono rounded-2xl">
              <Sparkles className="h-3.5 w-3.5" />
              <span>5SD-INT-008 • THIẾT KẾ NỘI THẤT & KIẾN TRÚC</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                }}
              >
                3D Architectural Visualization CGI
              </span>{' '}
              Đẳng Cấp Cùng Atelier
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
              Giao diện website 3D Architectural Visualization CGI thuộc lĩnh vực Thiết kế Nội thất & Kiến trúc (Interior & Architecture), thiết kế theo phong cách Modern Dashboard kết hợp cấu trúc flagship-conversion. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
              >
                <span>Nhận Tư vấn Không gian</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-slate-900 text-slate-100 border border-slate-700 hover:border-slate-500 transition rounded-2xl"
              >
                <span>Xem Dự án Thực tế</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {[{"label":"Dự án Biệt thự & Penthouse","value":"380+"},{"label":"Độ Chuẩn xác Bản vẽ 3D","value":"99%"},{"label":"Nhà máy Sản xuất Nội thất","value":"3.500 m²"},{"label":"Bảo hành Thi công","value":"5 Năm"}].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '#7C3AED' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 bg-[#101726]/90 border border-slate-800/90 backdrop-blur-xl shadow-xl rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-70 block">
                    FLAGSHIP-CONVERSION STUDIO
                  </span>
                  <h3 className="text-base font-bold">Atelier — 3D Architectural Visualization CGI</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '#7C3AED' }}
                >
                  ★ 5
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-5sd-int-008" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-5sd-int-008)" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="#7C3AED" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="#0F172A" stroke="#7C3AED" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="#7C3AED" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="#EC4899" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-5sd-int-008)" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="#7C3AED" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="#EC4899" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    5SD-INT-008
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" style={{ color: '#7C3AED' }} />
                  Bảo hành chất lượng & Hỗ trợ 24/7
                </span>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="font-bold underline"
                  style={{ color: '#7C3AED' }}
                >
                  Khám phá ngay →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
