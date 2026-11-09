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
        style={{ background: '#EA580C' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#F59E0B' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-stone-900 text-amber-100 font-serif tracking-wider rounded-sm">
              <Sparkles className="h-3.5 w-3.5" />
              <span>5SD-WED-006 • CƯỚI HỎI & SỰ KIỆN CƯỚI</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #EA580C, #F59E0B)',
                }}
              >
                Documentary Wedding Journalism
              </span>{' '}
              Đẳng Cấp Cùng Zenith
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-stone-600 leading-relaxed">
              Giao diện website Documentary Wedding Journalism thuộc lĩnh vực Cưới hỏi & Sự kiện Cưới (Wedding & Bridal), thiết kế theo phong cách Japanese Minimalism kết hợp cấu trúc flagship-conversion. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-stone-900 text-amber-50 hover:bg-stone-800 transition rounded-sm"
                style={{ background: 'linear-gradient(135deg, #EA580C, #F59E0B)' }}
              >
                <span>Đặt lịch Tư vấn Cưới</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-stone-900 border border-stone-300 hover:border-stone-900 transition rounded-sm"
              >
                <span>Xem Bộ sưu tập Cưới</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {[{"label":"Lễ cưới Đẳng cấp Đã tổ chức","value":"850+"},{"label":"Mẫu Váy cưới Couture","value":"300+"},{"label":"Địa điểm Resort & Ballroom","value":"45+"},{"label":"Mức độ Hài lòng Cặp đôi","value":"100%"}].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '#EA580C' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-stone-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 bg-white border border-stone-200/90 shadow-sm rounded-sm space-y-5">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-70 block">
                    FLAGSHIP-CONVERSION STUDIO
                  </span>
                  <h3 className="text-base font-bold">Zenith — Documentary Wedding Journalism</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '#EA580C' }}
                >
                  ★ 5
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-5sd-wed-006" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#EA580C" />
                      <stop offset="100%" stopColor="#F59E0B" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-5sd-wed-006)" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="#EA580C" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="#FFFFFF" stroke="#EA580C" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="#EA580C" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="#F59E0B" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-5sd-wed-006)" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="#EA580C" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="#F59E0B" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    5SD-WED-006
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" style={{ color: '#EA580C' }} />
                  Bảo hành chất lượng & Hỗ trợ 24/7
                </span>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="font-bold underline"
                  style={{ color: '#EA580C' }}
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
