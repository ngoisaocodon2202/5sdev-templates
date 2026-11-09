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
        style={{ background: '#2563EB' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#7C3AED' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-500/15 text-cyan-300 border border-indigo-500/30 font-mono rounded-2xl">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-BEA-033 • CUSTOM FOUNDATION MIXING LAB • BOLD TYPOGRAPHY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-extrabold tracking-tight leading-[1.1]">
            Monolith: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #2563EB, #7C3AED)',
              }}
            >
              Custom Foundation Mixing Lab
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed">
            Giao diện website Custom Foundation Mixing Lab thuộc lĩnh vực Làm đẹp & Mỹ phẩm (Beauty & Cosmetics), thiết kế theo phong cách Bold Typography kết hợp cấu trúc immersive-cinematic. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white shadow-lg hover:opacity-95 transition rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
            >
              <span>Đặt lịch Chuyên gia</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-slate-900 text-slate-100 border border-slate-700 hover:border-slate-500 transition rounded-2xl"
            >
              <Play className="h-4 w-4" />
              <span>Xem liệu trình</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Bác sĩ & Chuyên gia","value":"30+"},{"label":"Công nghệ Chuẩn FDA","value":"100%"},{"label":"Khách hàng Thân thiết","value":"45.000+"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-[#101726]/90 border border-slate-800/90 backdrop-blur-xl shadow-xl rounded-2xl">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#2563EB' }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium text-slate-400 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
