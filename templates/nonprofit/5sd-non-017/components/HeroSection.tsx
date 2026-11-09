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
        style={{ background: '#047857' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#14B8A6' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl">
              <Sparkles className="h-3.5 w-3.5" />
              <span>5SD-NON-017 • TỔ CHỨC PHI LỢI NHUẬN & TỪ THIỆN</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #047857, #14B8A6)',
                }}
              >
                Open Source Public Good Foundation
              </span>{' '}
              Đẳng Cấp Cùng Orchid
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
              Giao diện website Open Source Public Good Foundation thuộc lĩnh vực Tổ chức Phi lợi nhuận & Từ thiện (Nonprofit & Charity), thiết kế theo phong cách Material-Inspired kết hợp cấu trúc bento-grid-os. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #047857, #14B8A6)' }}
              >
                <span>Chung tay Đóng góp</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition rounded-2xl"
              >
                <span>Xem Báo cáo Minh bạch</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {[{"label":"Sao kê Minh bạch Tự động","value":"100% Real-time"},{"label":"Điểm trường Đã xây dựng","value":"145 Trường"},{"label":"Trẻ em Được hỗ trợ","value":"68.000+"},{"label":"Tình nguyện viên Toàn quốc","value":"12.000+"}].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '#047857' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-slate-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 bg-white border border-slate-200/90 shadow-sm rounded-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-70 block">
                    BENTO-GRID-OS STUDIO
                  </span>
                  <h3 className="text-base font-bold">Orchid — Open Source Public Good Foundation</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '#047857' }}
                >
                  ★ 4.7
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-5sd-non-017" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#047857" />
                      <stop offset="100%" stopColor="#14B8A6" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-5sd-non-017)" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="#047857" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="#FFFFFF" stroke="#047857" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="#047857" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="#14B8A6" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-5sd-non-017)" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="#047857" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="#14B8A6" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    5SD-NON-017
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" style={{ color: '#047857' }} />
                  Bảo hành chất lượng & Hỗ trợ 24/7
                </span>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="font-bold underline"
                  style={{ color: '#047857' }}
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
