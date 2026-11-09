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
        style={{ background: '#B91C1C' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#D97706' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-lime-300 text-black border-2 border-black font-mono font-bold rounded-lg">
              <Sparkles className="h-3.5 w-3.5" />
              <span>5SD-LOG-022 • VẬN TẢI & CHUỖI CUNG ỨNG</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #B91C1C, #D97706)',
                }}
              >
                Bonded Warehouse & Free Trade Zone
              </span>{' '}
              Đẳng Cấp Cùng Celestia
            </h1>

            <p className="max-w-2xl text-base sm:text-lg text-zinc-700 leading-relaxed">
              Giao diện website Bonded Warehouse & Free Trade Zone thuộc lĩnh vực Vận tải & Chuỗi cung ứng (Logistics & Supply Chain), thiết kế theo phong cách Brutalism kết hợp cấu trúc swiss-modular. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition rounded-lg"
                style={{ background: '#000000' }}
              >
                <span>Tra cứu Vận đơn & Cước phí</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-amber-100 transition rounded-lg"
              >
                <span>Mạng lưới Kho vận</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {[{"label":"Tuyến Vận tải Quốc tế","value":"160+ Cảng"},{"label":"Tỷ lệ Giao hàng Đúng hẹn","value":"99.3%"},{"label":"Hệ thống Kho Ngoại quan","value":"250.000 m²"},{"label":"Theo dõi GPS Thời gian thực","value":"24/7"}].map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '#B91C1C' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs text-zinc-700 mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg space-y-5">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-70 block">
                    SWISS-MODULAR STUDIO
                  </span>
                  <h3 className="text-base font-bold">Celestia — Bonded Warehouse & Free Trade Zone</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '#B91C1C' }}
                >
                  ★ 4.8
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-5sd-log-022" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#B91C1C" />
                      <stop offset="100%" stopColor="#D97706" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-5sd-log-022)" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="#B91C1C" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="#FFFFFF" stroke="#B91C1C" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="#B91C1C" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="#D97706" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-5sd-log-022)" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="#B91C1C" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="#D97706" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    5SD-LOG-022
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" style={{ color: '#B91C1C' }} />
                  Bảo hành chất lượng & Hỗ trợ 24/7
                </span>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="font-bold underline"
                  style={{ color: '#B91C1C' }}
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
