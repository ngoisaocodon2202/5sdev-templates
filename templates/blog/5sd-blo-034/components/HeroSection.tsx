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
        style={{ background: '#334155' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#0EA5E9' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-red-600 text-white font-mono uppercase tracking-widest rounded-none">
              <Sparkles className="h-3.5 w-3.5" />
              <span>5SD-BLO-034 • BLOG & XUẤT BẢN NỘI DUNG</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-sans uppercase tracking-tighter font-black leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #334155, #0EA5E9)',
                }}
              >
                Newsletter Paid Community Hub
              </span>{' '}
              Đẳng Cấp Cùng Equinox
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-zinc-600 leading-relaxed">
              Giao diện website Newsletter Paid Community Hub thuộc lĩnh vực Blog & Xuất bản Nội dung (Blog & Personal Publishing), thiết kế theo phong cách Swiss Design kết hợp cấu trúc split-showcase. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-black text-white uppercase tracking-wider font-bold hover:bg-red-600 transition rounded-none"
                style={{ background: '#000000' }}
              >
                <span>Khám phá Bài viết</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-black border border-black uppercase tracking-wider font-bold hover:bg-zinc-100 transition rounded-none"
              >
                <span>Nhận Newsletter Tuần</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {[{"label":"Người Đăng ký Newsletter","value":"95.000+"},{"label":"Bài viết Chuyên sâu","value":"420+ Bài"},{"label":"Tỷ lệ Mở Email (Open Rate)","value":"58.4%"},{"label":"Cộng đồng Thảo luận","value":"15.000+"}].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '#334155' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 bg-zinc-50 border border-black rounded-none space-y-5">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-70 block">
                    SPLIT-SHOWCASE STUDIO
                  </span>
                  <h3 className="text-base font-bold">Equinox — Newsletter Paid Community Hub</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '#334155' }}
                >
                  ★ 4.7
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-5sd-blo-034" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#334155" />
                      <stop offset="100%" stopColor="#0EA5E9" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-5sd-blo-034)" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="#334155" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="#FFFFFF" stroke="#334155" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="#334155" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="#0EA5E9" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-5sd-blo-034)" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="#334155" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="#0EA5E9" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    5SD-BLO-034
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" style={{ color: '#334155' }} />
                  Bảo hành chất lượng & Hỗ trợ 24/7
                </span>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="font-bold underline"
                  style={{ color: '#334155' }}
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
