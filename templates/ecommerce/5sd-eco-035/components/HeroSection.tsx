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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl">
            <Sparkles className="h-3.5 w-3.5" />
            <span>5SD-ECO-035 • GAMING PERIPHERALS STORE • MODERN CORPORATE</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1]">
            Vertex: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, #4338CA, #EC4899)',
              }}
            >
              Gaming Peripherals Store
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
            Giao diện website Gaming Peripherals Store thuộc lĩnh vực Thương mại điện tử (E-commerce), thiết kế theo phong cách Modern Corporate kết hợp cấu trúc immersive-cinematic. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl"
              style={{ background: 'linear-gradient(135deg, #4338CA, #EC4899)' }}
            >
              <span>Thêm vào giỏ hàng</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition rounded-2xl"
            >
              <Play className="h-4 w-4" />
              <span>Xem bộ sưu tập</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {[{"label":"Sản phẩm Chính hãng","value":"12.500+"},{"label":"Giao hàng Nội thành","value":"2 Giờ"},{"label":"Khách hàng Hài lòng","value":"99.4%"}].map((m, idx) => (
              <div key={idx} className="p-5 bg-white border border-slate-200/90 shadow-sm rounded-2xl">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#4338CA' }}>
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
