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
        style={{ background: '#059669' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#0EA5E9' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-red-600 text-white font-mono uppercase tracking-widest rounded-none">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-EVE-010 • TEDX & THOUGHT LEADERSHIP FORUM • SWISS DESIGN</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-sans uppercase tracking-tighter font-black leading-[1.1]">
            Stratos: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #059669, #0EA5E9)',
              }}
            >
              TEDx & Thought Leadership Forum
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-600 leading-relaxed">
            Giao diện website TEDx & Thought Leadership Forum thuộc lĩnh vực Sự kiện & Hội nghị (Events & Conferences), thiết kế theo phong cách Swiss Design kết hợp cấu trúc immersive-cinematic. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-black text-white uppercase tracking-wider font-bold hover:bg-red-600 transition rounded-none"
              style={{ background: '#000000' }}
            >
              <span>Đặt vé Tham dự</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-black border border-black uppercase tracking-wider font-bold hover:bg-zinc-100 transition rounded-none"
            >
              <Play className="h-4 w-4" />
              <span>Lịch trình & Diễn giả</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Khách tham dự Sự kiện","value":"50.000+"},{"label":"Diễn giả & Nghệ sĩ Quốc tế","value":"180+"},{"label":"Check-in QR Tốc độ cao","value":"1.5 Giây"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-zinc-50 border border-black rounded-none">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#059669' }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium text-zinc-600 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
