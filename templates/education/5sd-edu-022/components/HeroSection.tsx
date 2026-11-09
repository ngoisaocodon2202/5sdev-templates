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
        style={{ background: '#B91C1C' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#D97706' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-lime-300 text-black border-2 border-black font-mono font-bold rounded-lg">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-EDU-022 • MEDICAL & NURSING EXAM PREP • BRUTALISM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black tracking-tight leading-[1.1]">
            Zenith: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #B91C1C, #D97706)',
              }}
            >
              Medical & Nursing Exam Prep
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-zinc-700 leading-relaxed">
            Giao diện website Medical & Nursing Exam Prep thuộc lĩnh vực Giáo dục & Đào tạo (Education & E-Learning), thiết kế theo phong cách Brutalism kết hợp cấu trúc editorial-magazine. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition rounded-lg"
              style={{ background: '#000000' }}
            >
              <span>Đăng ký Khóa học</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-amber-100 transition rounded-lg"
            >
              <Play className="h-4 w-4" />
              <span>Tải Đề cương</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Học viên Tốt nghiệp","value":"85.000+"},{"label":"Tỷ lệ Có việc làm","value":"96.5%"},{"label":"Giảng viên Quốc tế","value":"240+"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000] rounded-lg">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#B91C1C' }}>
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
