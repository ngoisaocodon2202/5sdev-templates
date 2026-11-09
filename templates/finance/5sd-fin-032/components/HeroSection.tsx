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
        style={{ background: '#334155' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '#0EA5E9' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-stone-900 text-amber-100 font-serif tracking-wider rounded-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-FIN-032 • CORPORATE IPO ADVISORY • EDITORIAL</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-[1.1]">
            Apex: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #334155, #0EA5E9)',
              }}
            >
              Corporate IPO Advisory
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-stone-600 leading-relaxed">
            Giao diện website Corporate IPO Advisory thuộc lĩnh vực Tài chính & Ngân hàng số (Finance & Fintech), thiết kế theo phong cách Editorial kết hợp cấu trúc editorial-magazine. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold bg-stone-900 text-amber-50 hover:bg-stone-800 transition rounded-sm"
              style={{ background: 'linear-gradient(135deg, #334155, #0EA5E9)' }}
            >
              <span>Mở Tài khoản Định danh</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-stone-900 border border-stone-300 hover:border-stone-900 transition rounded-sm"
            >
              <Play className="h-4 w-4" />
              <span>Tính Lợi nhuận Đầu tư</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Tổng Giá trị Giao dịch","value":"$4.8B+"},{"label":"Bảo mật Đa tầng","value":"PCI-DSS"},{"label":"Xử lý Chuyển tiền","value":"0.2 Giây"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-white border border-stone-200/90 shadow-sm rounded-sm">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#334155' }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium text-stone-600 mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
