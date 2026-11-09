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
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl">
              <Sparkles className="h-3.5 w-3.5" />
              <span>5SD-NEW-016 • BÁO CHÍ & TẠP CHÍ ĐIỆN TỬ</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #7C3AED, #EC4899)',
                }}
              >
                Travel & Gastronomy Magazine
              </span>{' '}
              Đẳng Cấp Cùng Apex
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
              Giao diện website Travel & Gastronomy Magazine thuộc lĩnh vực Báo chí & Tạp chí Điện tử (News & Digital Media), thiết kế theo phong cách Organic kết hợp cấu trúc flagship-conversion. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl"
                style={{ background: 'linear-gradient(135deg, #7C3AED, #EC4899)' }}
              >
                <span>Đọc Tin tiêu điểm</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition rounded-2xl"
              >
                <span>Đăng ký Bản tin Pro</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {[{"label":"Độc giả Truy cập/Tháng","value":"18 Triệu"},{"label":"Bài Phân tích Chuyên sâu","value":"250+/Tuần"},{"label":"Bản tin Tài chính Sáng","value":"06:30 AM"},{"label":"Độ Tin cậy Nguồn tin","value":"Verified"}].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '#7C3AED' }}>
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
                    FLAGSHIP-CONVERSION STUDIO
                  </span>
                  <h3 className="text-base font-bold">Apex — Travel & Gastronomy Magazine</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '#7C3AED' }}
                >
                  ★ 4.8
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-5sd-new-016" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#7C3AED" />
                      <stop offset="100%" stopColor="#EC4899" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-5sd-new-016)" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="#7C3AED" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="#FFFFFF" stroke="#7C3AED" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="#7C3AED" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="#EC4899" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-5sd-new-016)" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="#7C3AED" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="#EC4899" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    5SD-NEW-016
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
