import React from 'react';
import { ArrowRight, Sparkles, Play } from '@shared/icons/template-icons';

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
        style={{ background: '#4338CA' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#EC4899' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-lime-300 text-black border-2 border-black font-mono font-bold rounded-lg">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-FUR-005 • ERGONOMIC HOME OFFICE DESK • BRUTALISM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1]">
            Nexora: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #4338CA, #EC4899)',
              }}
            >
              Ergonomic Home Office Desk
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-700 leading-relaxed">
            Giao diện website Ergonomic Home Office Desk thuộc lĩnh vực Nội thất & Trang trí (Furniture & Home Decor), thiết kế theo phong cách Brutalism kết hợp cấu trúc editorial-magazine. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition rounded-lg"
              style={{ background: '#000000' }}
            >
              <span>Đặt mua Nội thất</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-amber-100 transition rounded-lg"
            >
              <Play className="h-4 w-4" />
              <span>Xem Showroom 360°</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Gỗ Tự nhiên Chuẩn FSC","value":"100%"},{"label":"Bảo hành Khung & Đệm","value":"10 Năm"},{"label":"Showroom Trải nghiệm","value":"5.000 m²"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#4338CA' }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium text-zinc-700 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
