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
        style={{ background: '#1D4ED8' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#06B6D4' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-SPA-032 • CRYOTHERAPY & RED LIGHT LOUNGE • SCANDINAVIAN</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            Aurelia: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #1D4ED8, #06B6D4)',
              }}
            >
              Cryotherapy & Red Light Lounge
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Giao diện website Cryotherapy & Red Light Lounge thuộc lĩnh vực Spa & Trị liệu Tự nhiên (Spa & Wellness), thiết kế theo phong cách Scandinavian kết hợp cấu trúc immersive-cinematic. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)' }}
            >
              <span>Đặt lịch Thư giãn</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition rounded-2xl"
            >
              <Play className="h-4 w-4" />
              <span>Menu Trị liệu</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Thảo dược Hữu cơ Tự nhiên","value":"100%"},{"label":"Chuyên viên Trị liệu","value":"8+ Năm KN"},{"label":"Không gian Tĩnh lặng","value":"Zen Chuẩn"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200/90 shadow-sm rounded-2xl">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#1D4ED8' }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium text-slate-600 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
