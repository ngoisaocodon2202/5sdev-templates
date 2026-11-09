import fs from 'fs';
import path from 'path';
import {
  INDUSTRY_BLUEPRINTS,
  PALETTES,
  STYLE_LIST,
  ARCHITECTURES,
  BRAND_PREFIXES,
} from './catalog-data.mjs';

export function buildAllTemplateDefinitions() {
  const definitions = [];
  let globalIndex = 1;

  // We interleave across the 30 categories so that Batch 1 (1-50) covers all 30 categories immediately!
  for (let variantIdx = 0; variantIdx < 35; variantIdx++) {
    for (let catIdx = 0; catIdx < INDUSTRY_BLUEPRINTS.length; catIdx++) {
      const industry = INDUSTRY_BLUEPRINTS[catIdx];
      const numStr = String(variantIdx + 1).padStart(3, '0');
      const id = `5SD-${industry.code}-${numStr}`;
      const slug = id.toLowerCase();
      const subNiche = industry.subNiches[variantIdx % industry.subNiches.length];
      const brandPrefix = BRAND_PREFIXES[(variantIdx * 7 + catIdx * 3) % BRAND_PREFIXES.length];
      const styleObj = STYLE_LIST[(variantIdx * 3 + catIdx) % STYLE_LIST.length];
      const palette = PALETTES[(variantIdx * 5 + catIdx * 2) % PALETTES.length];
      const architecture = ARCHITECTURES[(variantIdx + catIdx) % ARCHITECTURES.length];
      const batchNumber = Math.ceil(globalIndex / 50);

      const isFree = (variantIdx + catIdx) % 7 === 0;
      const tierOptions = ['STANDARD', 'PREMIUM', 'ENTERPRISE'];
      const tier = isFree ? 'FREE' : tierOptions[(variantIdx + catIdx) % tierOptions.length];
      const priceMap = {
        FREE: { vnd: 0, orig: 990000, usd: 0 },
        STANDARD: { vnd: 1490000, orig: 2200000, usd: 59 },
        PREMIUM: { vnd: 2890000, orig: 4200000, usd: 119 },
        ENTERPRISE: { vnd: 4990000, orig: 7500000, usd: 199 },
      };
      const priceInfo = priceMap[tier];

      const name = `${brandPrefix} — ${subNiche}`;
      const nameVi = `${brandPrefix} • Giao diện ${industry.nameVi} (${subNiche})`;
      const description = `Giao diện website ${subNiche} thuộc lĩnh vực ${industry.nameVi} (${industry.name}), thiết kế theo phong cách ${styleObj.name} kết hợp cấu trúc ${architecture}. Tích hợp sẵn công cụ tương tác chuyên ngành, chuẩn SEO và tương thích hoàn hảo trên Desktop, Tablet, Mobile.`;

      const item = {
        globalIndex,
        id,
        slug,
        name,
        nameVi,
        brandName: brandPrefix,
        category: industry.slug,
        categoryCode: industry.code,
        categoryName: industry.name,
        categoryNameVi: industry.nameVi,
        subNiche,
        designStyle: styleObj.id,
        designStyleName: styleObj.name,
        architecture,
        widgetType: industry.widgetType,
        actionLabel: industry.actionLabel,
        secondaryAction: industry.secondaryAction,
        description,
        thumbnail: `/templates/${industry.slug}/${slug}/assets/thumbnail.svg`,
        previewRoute: `/preview/${slug}`,
        detailsRoute: `/templates/${slug}`,
        sourcePath: `templates/${industry.slug}/${slug}`,
        techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Vite', 'Lucide Icons'],
        tags: [
          industry.slug,
          subNiche.toLowerCase().split(' ')[0],
          styleObj.id,
          architecture,
          tier.toLowerCase(),
        ],
        features: [
          `Thiết kế độc bản phong cách ${styleObj.name} (${architecture})`,
          `Module tương tác chuyên ngành ${industry.nameVi} hoạt động thực tế`,
          'Header thông minh kèm Mobile Drawer Navigation mượt mà',
          'Tối ưu tốc độ tải với Code-Splitting & Vector SVG sắc nét',
          'Chuẩn cấu trúc Semantic HTML5, Meta SEO & Responsive 3 thiết bị',
        ],
        sections: [
          `Header & Navigation (${styleObj.name})`,
          `Hero Showcase (${architecture})`,
          `KPI Telemetry & Industry Trust Strip`,
          `Interactive ${industry.name} Module (${industry.widgetType.toUpperCase()})`,
          `Curated ${subNiche} Highlights & Workflow`,
          `Verified Client Reviews & FAQ Accordion`,
          `Conversion CTA, Lead Form & Multi-Column Footer`,
        ],
        version: '1.0.0',
        status: 'TESTED',
        price: {
          tier,
          isFree,
          priceVnd: priceInfo.vnd,
          originalPriceVnd: priceInfo.orig,
          priceUsd: priceInfo.usd,
          currency: 'VND',
        },
        primaryColor: palette.primary,
        secondaryColor: palette.secondary,
        accentColor: palette.accent,
        isDark: styleObj.isDark,
        isFeatured: variantIdx === 0 || (variantIdx === 1 && catIdx < 10),
        isTrending: variantIdx === 2 || (variantIdx === 3 && catIdx < 15),
        isNewRelease: batchNumber >= 19 || variantIdx === 4,
        rating: Number((4.7 + ((variantIdx + catIdx) % 4) * 0.1).toFixed(1)),
        downloadsCount: 180 + ((variantIdx * 37 + catIdx * 53) % 1400),
        batchNumber,
        updatedAt: '2026-11-09',
        metrics: industry.metrics,
        domainItems: industry.items.map((it, idx) => ({
          ...it,
          id: `${id}-ITEM-${idx + 1}`,
          title: `${it.title} (${brandPrefix})`,
        })),
      };

      definitions.push(item);
      globalIndex++;
    }
  }

  return definitions;
}

function getStyleThemeClasses(def) {
  const { designStyle, isDark } = def;
  if (designStyle === 'brutalism') {
    return {
      pageBg: 'bg-amber-50 text-zinc-950',
      surface: 'bg-white border-2 border-black shadow-[4px_4px_0px_0px_#000]',
      headerBg: 'bg-amber-100/95 border-b-2 border-black',
      muted: 'text-zinc-700',
      badge: 'bg-lime-300 text-black border-2 border-black font-mono font-bold',
      btnPrimary: 'bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition',
      btnSecondary: 'bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-amber-100 transition',
      radius: 'rounded-lg',
      headingFont: 'font-display font-black tracking-tight',
    };
  }
  if (designStyle === 'swiss-design') {
    return {
      pageBg: 'bg-white text-black',
      surface: 'bg-zinc-50 border border-black',
      headerBg: 'bg-white/95 border-b border-black',
      muted: 'text-zinc-600',
      badge: 'bg-red-600 text-white font-mono uppercase tracking-widest',
      btnPrimary: 'bg-black text-white uppercase tracking-wider font-bold hover:bg-red-600 transition',
      btnSecondary: 'bg-white text-black border border-black uppercase tracking-wider font-bold hover:bg-zinc-100 transition',
      radius: 'rounded-none',
      headingFont: 'font-sans uppercase tracking-tighter font-black',
    };
  }
  if (designStyle === 'luxury' || designStyle === 'editorial' || designStyle === 'japanese-minimalism') {
    return {
      pageBg: 'bg-[#FAF7F2] text-stone-900',
      surface: 'bg-white border border-stone-200/90 shadow-sm',
      headerBg: 'bg-[#FAF7F2]/90 border-b border-stone-200 backdrop-blur-md',
      muted: 'text-stone-600',
      badge: 'bg-stone-900 text-amber-100 font-serif tracking-wider',
      btnPrimary: 'bg-stone-900 text-amber-50 hover:bg-stone-800 transition',
      btnSecondary: 'bg-white text-stone-900 border border-stone-300 hover:border-stone-900 transition',
      radius: 'rounded-sm',
      headingFont: 'font-serif font-bold tracking-tight',
    };
  }
  if (isDark) {
    return {
      pageBg: 'bg-[#080C16] text-slate-100',
      surface: 'bg-[#101726]/90 border border-slate-800/90 backdrop-blur-xl shadow-xl',
      headerBg: 'bg-[#080C16]/85 border-b border-slate-800/80 backdrop-blur-xl',
      muted: 'text-slate-400',
      badge: 'bg-indigo-500/15 text-cyan-300 border border-indigo-500/30 font-mono',
      btnPrimary: 'text-white shadow-lg hover:opacity-95 transition',
      btnSecondary: 'bg-slate-900 text-slate-100 border border-slate-700 hover:border-slate-500 transition',
      radius: 'rounded-2xl',
      headingFont: 'font-display font-extrabold tracking-tight',
    };
  }
  return {
    pageBg: 'bg-slate-50 text-slate-900',
    surface: 'bg-white border border-slate-200/90 shadow-sm',
    headerBg: 'bg-white/90 border-b border-slate-200/80 backdrop-blur-md',
    muted: 'text-slate-600',
    badge: 'bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold',
    btnPrimary: 'text-white shadow-md hover:opacity-95 transition',
    btnSecondary: 'bg-white text-slate-800 border border-slate-300 hover:bg-slate-100 transition',
    radius: 'rounded-2xl',
    headingFont: 'font-display font-bold tracking-tight',
  };
}

function generateThumbnailSvg(def) {
  const bg = def.isDark ? '#0B0F19' : '#F8FAFC';
  const card = def.isDark ? '#161F33' : '#FFFFFF';
  const text = def.isDark ? '#F8FAFC' : '#0F172A';
  const muted = def.isDark ? '#94A3B8' : '#64748B';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400" fill="none">
  <defs>
    <linearGradient id="g-${def.slug}" x1="0" y1="0" x2="640" y2="400" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="${def.primaryColor}" />
      <stop offset="100%" stop-color="${def.secondaryColor}" />
    </linearGradient>
  </defs>
  <rect width="640" height="400" fill="${bg}" />
  <circle cx="520" cy="90" r="140" fill="${def.primaryColor}" fill-opacity="0.15" />
  <rect x="28" y="24" width="584" height="352" rx="16" fill="${card}" stroke="${def.primaryColor}" stroke-opacity="0.35" stroke-width="2" />
  <rect x="52" y="52" width="120" height="24" rx="6" fill="url(#g-${def.slug})" />
  <text x="112" y="68" fill="#FFFFFF" font-family="Inter, sans-serif" font-size="11" font-weight="700" text-anchor="middle">${def.id}</text>
  <text x="52" y="128" fill="${text}" font-family="Inter, sans-serif" font-size="24" font-weight="800">${def.name.replace(/&/g, '&amp;')}</text>
  <text x="52" y="158" fill="${muted}" font-family="Inter, sans-serif" font-size="14">${def.categoryNameVi} • ${def.designStyleName} (${def.architecture})</text>
  <rect x="52" y="188" width="160" height="42" rx="10" fill="url(#g-${def.slug})" />
  <text x="132" y="214" fill="#FFFFFF" font-family="Inter, sans-serif" font-size="13" font-weight="700" text-anchor="middle">${def.actionLabel}</text>
  <rect x="52" y="256" width="168" height="92" rx="12" fill="${bg}" />
  <rect x="236" y="256" width="168" height="92" rx="12" fill="${bg}" />
  <rect x="420" y="256" width="168" height="92" rx="12" fill="${bg}" />
</svg>
`;
}

function generateHeroComponentCode(def, theme) {
  const isCentered =
    def.architecture === 'editorial-magazine' || def.architecture === 'immersive-cinematic';
  const btnBg =
    def.designStyle === 'brutalism' || def.designStyle === 'swiss-design'
      ? '#000000'
      : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`;

  if (isCentered) {
    return `import React from 'react';
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
        style={{ background: '${def.primaryColor}' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '${def.secondaryColor}' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-4xl text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs ${theme.badge} ${theme.radius}">
            <Sparkles className="h-3.5 w-3.5" />
            <span>${def.id} • ${def.subNiche.toUpperCase()} • ${def.designStyleName.toUpperCase()}</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl ${theme.headingFont} leading-[1.1]">
            ${def.brandName}: Định Chuẩn Mới Trong Lĩnh Vực{' '}
            <span
              className="bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})',
              }}
            >
              ${def.subNiche}
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-base sm:text-lg ${theme.muted} leading-relaxed">
            ${def.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <button
              type="button"
              onClick={onPrimaryAction}
              className="inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold ${theme.btnPrimary} ${theme.radius}"
              style={{ background: '${btnBg}' }}
            >
              <span>${def.actionLabel}</span>
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={onSecondaryAction}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold ${theme.btnSecondary} ${theme.radius}"
            >
              <Play className="h-4 w-4" />
              <span>${def.secondaryAction}</span>
            </button>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            {${JSON.stringify(def.metrics.slice(0, 3))}.map((m, idx) => (
              <div key={idx} className="p-5 ${theme.surface} ${theme.radius}">
                <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '${def.primaryColor}' }}>
                  {m.value}
                </div>
                <div className="text-xs font-medium ${theme.muted} mt-1">{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
`;
  }

  return `import React from 'react';
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
        style={{ background: '${def.primaryColor}' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[110px] opacity-20"
        style={{ background: '${def.secondaryColor}' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs ${theme.badge} ${theme.radius}">
              <Sparkles className="h-3.5 w-3.5" />
              <span>${def.id} • ${def.categoryNameVi.toUpperCase()}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl ${theme.headingFont} leading-[1.1]">
              Trải Nghiệm{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})',
                }}
              >
                ${def.subNiche}
              </span>{' '}
              Đẳng Cấp Cùng ${def.brandName}
            </h1>

            <p className="max-w-2xl text-base sm:text-lg ${theme.muted} leading-relaxed">
              ${def.description}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold ${theme.btnPrimary} ${theme.radius}"
                style={{ background: '${btnBg}' }}
              >
                <span>${def.actionLabel}</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold ${theme.btnSecondary} ${theme.radius}"
              >
                <span>${def.secondaryAction}</span>
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-current/10">
              {${JSON.stringify(def.metrics)}.map((stat, i) => (
                <div key={i}>
                  <div className="text-xl sm:text-2xl font-extrabold" style={{ color: '${def.primaryColor}' }}>
                    {stat.value}
                  </div>
                  <div className="text-xs ${theme.muted} mt-0.5">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="p-5 sm:p-6 ${theme.surface} ${theme.radius} space-y-5">
              <div className="flex items-center justify-between border-b border-current/10 pb-3">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider opacity-70 block">
                    ${def.architecture.toUpperCase()} STUDIO
                  </span>
                  <h3 className="text-base font-bold">${def.name}</h3>
                </div>
                <span
                  className="px-2.5 py-1 text-xs font-bold text-white rounded-md"
                  style={{ background: '${def.primaryColor}' }}
                >
                  ★ ${def.rating}
                </span>
              </div>

              <div className="overflow-hidden rounded-xl border border-current/10">
                <svg viewBox="0 0 480 280" className="w-full h-auto" fill="none">
                  <defs>
                    <linearGradient id="heroGrad-${def.slug}" x1="0" y1="0" x2="480" y2="280" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="${def.primaryColor}" />
                      <stop offset="100%" stopColor="${def.secondaryColor}" />
                    </linearGradient>
                  </defs>
                  <rect width="480" height="280" fill="url(#heroGrad-${def.slug})" fillOpacity="0.14" />
                  <circle cx="380" cy="80" r="90" fill="${def.primaryColor}" fillOpacity="0.22" />
                  <rect x="28" y="28" width="424" height="224" rx="14" fill="${def.isDark ? '#0F172A' : '#FFFFFF'}" stroke="${def.primaryColor}" strokeOpacity="0.35" strokeWidth="1.5" />
                  <rect x="52" y="52" width="160" height="18" rx="5" fill="${def.primaryColor}" />
                  <rect x="52" y="80" width="240" height="10" rx="4" fill="${def.secondaryColor}" fillOpacity="0.5" />
                  <rect x="52" y="110" width="180" height="114" rx="10" fill="url(#heroGrad-${def.slug})" fillOpacity="0.85" />
                  <rect x="248" y="110" width="180" height="52" rx="8" fill="${def.primaryColor}" fillOpacity="0.15" />
                  <rect x="248" y="172" width="180" height="52" rx="8" fill="${def.secondaryColor}" fillOpacity="0.15" />
                  <text x="142" y="172" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="800" textAnchor="middle">
                    ${def.id}
                  </text>
                </svg>
              </div>

              <div className="flex items-center justify-between text-xs pt-1">
                <span className="inline-flex items-center gap-1.5 font-semibold">
                  <ShieldCheck className="h-4 w-4" style={{ color: '${def.primaryColor}' }} />
                  Bảo hành chất lượng & Hỗ trợ 24/7
                </span>
                <button
                  type="button"
                  onClick={onPrimaryAction}
                  className="font-bold underline"
                  style={{ color: '${def.primaryColor}' }}
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
`;
}

function generateInteractiveWidgetCode(def, theme) {
  return `import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
} from '@shared/icons/template-icons';

const DOMAIN_ITEMS = ${JSON.stringify(def.domainItems, null, 2)};

export const InteractiveWidget: React.FC = () => {
  const widgetType: string = '${def.widgetType}';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('19:00');
  const [sliderValue, setSliderValue] = useState(12);
  const [billingAnnual, setBillingAnnual] = useState(true);
  const [actionConfirmed, setActionConfirmed] = useState(false);

  const activeItem = DOMAIN_ITEMS[selectedIndex] || DOMAIN_ITEMS[0];

  const formatVnd = (amount: number) => {
    if (amount <= 0) return 'Miễn phí';
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  const estimatedTotal =
    widgetType === 'commerce'
      ? activeItem.price * quantity
      : widgetType === 'booking'
      ? activeItem.price * guestCount
      : widgetType === 'calculator'
      ? Math.round((activeItem.price * sliderValue) / 10)
      : billingAnnual
      ? Math.round(activeItem.price * 0.8)
      : activeItem.price;

  return (
    <section id="interactive-section" className="py-16 sm:py-20 border-b border-current/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs ${theme.badge} ${theme.radius} mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              TRẢI NGHIỆM TƯƠNG TÁC THỰC TẾ • ${def.categoryName.toUpperCase()}
            </span>
            <h2 className="text-2xl sm:text-4xl ${theme.headingFont}">
              Danh Mục & Công Cụ Tương Tác ${def.subNiche}
            </h2>
            <p className="mt-1.5 text-sm ${theme.muted}">
              Lựa chọn gói sản phẩm/dịch vụ bên dưới để tính toán chi phí và trải nghiệm quy trình đặt hàng trực tiếp.
            </p>
          </div>

          {widgetType === 'configurator' && (
            <div className="inline-flex items-center gap-2 p-1.5 ${theme.surface} ${theme.radius}">
              <button
                type="button"
                onClick={() => setBillingAnnual(false)}
                className={\`px-3.5 py-1.5 text-xs font-bold rounded-lg transition \${
                  !billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }\`}
              >
                Theo Tháng
              </button>
              <button
                type="button"
                onClick={() => setBillingAnnual(true)}
                className={\`px-3.5 py-1.5 text-xs font-bold rounded-lg transition \${
                  billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }\`}
              >
                Theo Năm (-20%)
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DOMAIN_ITEMS.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSelectedIndex(idx);
                    setActionConfirmed(false);
                  }}
                  className={\`cursor-pointer p-5 transition-all \${
                    isSelected ? 'ring-2 ring-offset-2' : 'opacity-90 hover:opacity-100'
                  } ${theme.surface} ${theme.radius}\`}
                  style={{
                    borderColor: isSelected ? '${def.primaryColor}' : undefined,
                  }}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className="px-2.5 py-0.5 text-[11px] font-bold rounded-md text-white"
                      style={{ background: idx % 2 === 0 ? '${def.primaryColor}' : '${def.secondaryColor}' }}
                    >
                      {item.tag}
                    </span>
                    <span className="font-mono text-xs opacity-60">{item.id}</span>
                  </div>
                  <h3 className="text-base font-bold mb-1.5">{item.title}</h3>
                  <p className="text-xs ${theme.muted} mb-4">{item.meta}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-current/10">
                    <span className="text-lg font-extrabold" style={{ color: '${def.primaryColor}' }}>
                      {formatVnd(item.price)}
                    </span>
                    <span className="text-xs font-semibold underline">
                      {isSelected ? 'Đang chọn ✓' : 'Chọn mục này'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lg:col-span-5">
            <div className="p-6 sm:p-7 ${theme.surface} ${theme.radius} space-y-5">
              <div className="border-b border-current/10 pb-4">
                <span className="text-xs font-mono uppercase opacity-70">
                  BẢNG ĐIỀU KHIỂN TRỰC TUYẾN • ${def.id}
                </span>
                <h3 className="text-xl font-bold mt-1">{activeItem.title}</h3>
                <p className="text-xs ${theme.muted} mt-1">{activeItem.meta}</p>
              </div>

              {widgetType === 'commerce' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold">Số lượng đặt mua:</span>
                    <div className="inline-flex items-center gap-3 border border-current/20 rounded-xl px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-1 hover:opacity-70"
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono text-sm font-bold w-6 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-1 hover:opacity-70"
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {widgetType === 'booking' && (
                <div className="space-y-3.5 text-xs">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-semibold mb-1">Ngày đặt lịch:</label>
                      <input
                        type="date"
                        value={bookingDate}
                        onChange={(e) => setBookingDate(e.target.value)}
                        className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Khung giờ:</label>
                      <select
                        value={bookingTime}
                        onChange={(e) => setBookingTime(e.target.value)}
                        className="w-full rounded-lg border border-current/20 bg-transparent px-3 py-2"
                      >
                        <option value="09:00" className="text-black">09:00 Sáng</option>
                        <option value="14:00" className="text-black">14:00 Chiều</option>
                        <option value="19:00" className="text-black">19:00 Tối</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-1">
                    <span className="font-semibold">Số lượng khách / suất:</span>
                    <div className="inline-flex items-center gap-3 border border-current/20 rounded-xl px-3 py-1">
                      <button
                        type="button"
                        onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
                      >
                        <Minus className="h-3.5 w-3.5" />
                      </button>
                      <span className="font-mono font-bold">{guestCount}</span>
                      <button
                        type="button"
                        onClick={() => setGuestCount(guestCount + 1)}
                      >
                        <Plus className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {widgetType === 'calculator' && (
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span>Quy mô / Thời hạn tùy chỉnh:</span>
                    <span className="font-mono font-bold" style={{ color: '${def.primaryColor}' }}>
                      {sliderValue} đơn vị
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    value={sliderValue}
                    onChange={(e) => setSliderValue(Number(e.target.value))}
                    className="w-full accent-indigo-600 cursor-pointer"
                  />
                  <p className="text-[11px] ${theme.muted}">
                    Kéo thanh trượt để ước tính ngân sách theo quy mô thực tế của bạn.
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-current/15 p-4 flex items-center justify-between">
                <div>
                  <span className="text-xs ${theme.muted} block">Tổng chi phí tạm tính:</span>
                  <span className="text-2xl font-extrabold" style={{ color: '${def.primaryColor}' }}>
                    {formatVnd(estimatedTotal)}
                  </span>
                </div>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-emerald-500/15 text-emerald-500 font-bold">
                  Sẵn sàng
                </span>
              </div>

              {actionConfirmed ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Đã xác nhận yêu cầu thành công!</span>
                  </div>
                  <p className="${theme.muted}">
                    Mã tham chiếu: <strong>{activeItem.id}</strong> • Tổng: <strong>{formatVnd(estimatedTotal)}</strong>.
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActionConfirmed(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold ${theme.btnPrimary} ${theme.radius}"
                  style={{
                    background: '${def.designStyle === 'brutalism' || def.designStyle === 'swiss-design' ? '#000000' : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`}',
                  }}
                >
                  <span>${def.actionLabel} Ngay</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
`;
}

function generateContentSectionsCode(def, theme) {
  return `import React, { useState } from 'react';
import {
  CheckCircle2,
  Star,
  ChevronDown,
  Send,
} from '@shared/icons/template-icons';

export const ContentSections: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const faqs = [
    {
      q: 'Làm thế nào để triển khai hoặc tùy biến dịch vụ tại ${def.brandName}?',
      a: 'Đội ngũ chuyên gia của ${def.brandName} hỗ trợ tư vấn 1-1, khảo sát nhu cầu thực tế và bàn giao lộ trình triển khai hoàn chỉnh trong vòng 24 giờ làm việc.',
    },
    {
      q: 'Chính sách bảo hành và cam kết chất lượng trong lĩnh vực ${def.categoryNameVi} như thế nào?',
      a: 'Toàn bộ sản phẩm và dịch vụ đều tuân thủ tiêu chuẩn chất lượng quốc tế, đi kèm hợp đồng minh bạch và hỗ trợ kỹ thuật/chăm sóc khách hàng 24/7.',
    },
    {
      q: 'Tôi có thể thanh toán linh hoạt hoặc đặt lịch hẹn trực tuyến không?',
      a: 'Có. Hệ thống tích hợp sẵn công cụ đặt lịch, dự toán chi phí và hỗ trợ đa phương thức thanh toán an toàn.',
    },
  ];

  const testimonials = [
    {
      name: 'Nguyễn Minh Quân',
      role: 'Giám đốc Điều hành',
      quote: 'Trải nghiệm dịch vụ tại ${def.brandName} thực sự vượt mong đợi. Quy trình chuyên nghiệp, thiết kế tinh tế và hiệu quả rõ rệt ngay từ tuần đầu tiên.',
    },
    {
      name: 'Trần Thanh Hà',
      role: 'Khách hàng Thân thiết',
      quote: 'Sự tận tâm và chuẩn mực trong từng chi tiết giúp ${def.brandName} trở thành đối tác tin cậy hàng đầu của chúng tôi trong suốt 3 năm qua.',
    },
    {
      name: 'Lê Hoàng Nam',
      role: 'Chuyên gia Tư vấn',
      quote: 'Tiêu chuẩn chất lượng cao, minh bạch về chi phí và đội ngũ hỗ trợ phản hồi cực kỳ nhanh chóng.',
    },
  ];

  return (
    <>
      {/* 1. Core Value Propositions & Workflow */}
      <section id="features-section" className="py-16 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono uppercase tracking-wider opacity-70">
              GIÁ TRỊ CỐT LÕI • ${def.id}
            </span>
            <h2 className="mt-1 text-2xl sm:text-4xl ${theme.headingFont}">
              Vì Sao Khách Hàng Tin Chọn ${def.brandName}?
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {${JSON.stringify(def.features.slice(0, 3))}.map((feat, idx) => (
              <div key={idx} className="p-6 ${theme.surface} ${theme.radius} space-y-3">
                <div
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl text-white font-bold"
                  style={{ background: idx % 2 === 0 ? '${def.primaryColor}' : '${def.secondaryColor}' }}
                >
                  0{idx + 1}
                </div>
                <h3 className="text-lg font-bold">{feat}</h3>
                <p className="text-xs ${theme.muted} leading-relaxed">
                  Được tối ưu hóa chuyên biệt cho phân khúc ${def.subNiche}, đảm bảo hiệu suất vận hành vượt trội và trải nghiệm người dùng mượt mà.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Customer Testimonials */}
      <section id="reviews-section" className="py-16 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                ĐÁNH GIÁ XÁC THỰC
              </span>
              <h2 className="mt-1 text-2xl sm:text-4xl ${theme.headingFont}">
                Khách Hàng Nói Gì Về ${def.brandName}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>${def.rating} / 5.0 (Từ 500+ đánh giá xác thực)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 ${theme.surface} ${theme.radius} flex flex-col justify-between space-y-4">
                <p className="text-sm leading-relaxed italic">"{t.quote}"</p>
                <div className="flex items-center justify-between pt-3 border-t border-current/10 text-xs">
                  <div>
                    <div className="font-bold">{t.name}</div>
                    <div className="${theme.muted}">{t.role}</div>
                  </div>
                  <span className="font-mono text-amber-500">★★★★★</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Interactive FAQ & Lead Capture Section */}
      <section id="contact-section" className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* FAQ Column */}
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                CÂU HỎI THƯỜNG GẶP
              </span>
              <h2 className="text-2xl sm:text-3xl ${theme.headingFont} mb-4">
                Giải Đáp Nhanh Thông Tin
              </h2>
              <div className="space-y-3">
                {faqs.map((f, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="${theme.surface} ${theme.radius} overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between p-4 text-left text-sm font-bold"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={\`h-4 w-4 shrink-0 transition-transform \${
                            isOpen ? 'rotate-180' : ''
                          }\`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs ${theme.muted} leading-relaxed border-t border-current/10 pt-3">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Lead Form Column */}
            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 ${theme.surface} ${theme.radius}">
                <h3 className="text-xl font-bold mb-1">
                  Liên Hệ Tư Vấn Cùng ${def.brandName}
                </h3>
                <p className="text-xs ${theme.muted} mb-6">
                  Để lại thông tin để nhận báo giá chi tiết và ưu đãi dành riêng cho khách hàng trực tuyến.
                </p>

                {leadSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                    <h4 className="text-base font-bold">Đã gửi thông tin thành công!</h4>
                    <p className="text-xs ${theme.muted}">
                      Chuyên viên tư vấn của ${def.brandName} sẽ liên hệ với bạn trong ít phút.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLeadSubmitted(true);
                    }}
                    className="space-y-4 text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1">Số điện thoại *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0901 234 567"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1">Nhu cầu tư vấn chi tiết</label>
                      <textarea
                        rows={3}
                        placeholder="Nhập nội dung cần hỗ trợ..."
                        className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold ${theme.btnPrimary} ${theme.radius}"
                      style={{
                        background: '${def.designStyle === 'brutalism' || def.designStyle === 'swiss-design' ? '#000000' : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`}',
                      }}
                    >
                      <Send className="h-4 w-4" />
                      <span>Gửi Yêu Cầu Tư Vấn</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
`;
}

function generatePageTsxCode(def, theme) {
  return `import React, { useState } from 'react';
import { Menu, X } from '@shared/icons/template-icons';
import { HeroSection } from './components/HeroSection';
import { InteractiveWidget } from './components/InteractiveWidget';
import { ContentSections } from './components/ContentSections';

export interface TemplatePageProps {
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

export default function TemplatePage({ previewDevice }: TemplatePageProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollToId = (id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col ${theme.pageBg}"
      data-template-id="${def.id}"
      data-preview-device={previewDevice || 'desktop'}
      style={
        {
          '--tpl-primary': '${def.primaryColor}',
          '--tpl-secondary': '${def.secondaryColor}',
          '--tpl-accent': '${def.accentColor}',
        } as React.CSSProperties
      }
    >
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 w-full ${theme.headerBg}">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow"
              style={{
                background: 'linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})',
              }}
            >
              ${def.brandName.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <span className="text-base font-extrabold tracking-tight block leading-none">
                ${def.brandName}
              </span>
              <span className="text-[10px] font-mono opacity-65">
                ${def.subNiche}
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <button type="button" onClick={() => scrollToId('interactive-section')} className="hover:opacity-70">
              Sản phẩm & Dịch vụ
            </button>
            <button type="button" onClick={() => scrollToId('features-section')} className="hover:opacity-70">
              Ưu điểm vượt trội
            </button>
            <button type="button" onClick={() => scrollToId('reviews-section')} className="hover:opacity-70">
              Khách hàng đánh giá
            </button>
            <button type="button" onClick={() => scrollToId('contact-section')} className="hover:opacity-70">
              Liên hệ
            </button>
          </nav>

          {/* Header CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="px-4 py-2 text-xs font-bold ${theme.btnPrimary} ${theme.radius}"
              style={{
                background: '${def.designStyle === 'brutalism' || def.designStyle === 'swiss-design' ? '#000000' : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`}',
              }}
            >
              ${def.actionLabel}
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg border border-current/15"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-current/10 px-4 py-4 space-y-2 ${theme.pageBg}">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Sản phẩm & Dịch vụ (${def.subNiche})
            </button>
            <button
              type="button"
              onClick={() => scrollToId('features-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Giá trị cốt lõi
            </button>
            <button
              type="button"
              onClick={() => scrollToId('reviews-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Đánh giá từ khách hàng
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Liên hệ tư vấn
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1">
        <HeroSection
          onPrimaryAction={() => scrollToId('interactive-section')}
          onSecondaryAction={() => scrollToId('contact-section')}
        />
        <InteractiveWidget />
        <ContentSections />
      </main>

      {/* Template Footer */}
      <footer className="border-t border-current/10 py-10 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold">${def.name}</span> • Mã giao diện:{' '}
            <code className="font-mono font-bold">${def.id}</code>
          </div>
          <div className="${theme.muted}">
            Thiết kế theo chuẩn 5S DEV.TEMPLATES (5sdev.vn) • Phong cách: ${def.designStyleName}
          </div>
        </div>
      </footer>
    </div>
  );
}
`;
}

function generateThemeCss(def) {
  return `/* ${def.id} — ${def.name} Custom Design Tokens */
[data-template-id="${def.id}"] {
  --tpl-primary: ${def.primaryColor};
  --tpl-secondary: ${def.secondaryColor};
  --tpl-accent: ${def.accentColor};
}
`;
}

function generateReadmeMd(def) {
  return `# ${def.id} — ${def.name}

- **Mã sản phẩm**: \`${def.id}\`
- **Ngành nghề**: ${def.categoryNameVi} (\`${def.category}\`)
- **Phân khúc**: ${def.subNiche}
- **Phong cách thiết kế**: ${def.designStyleName} (\`${def.designStyle}\`)
- **Kiến trúc bố cục**: \`${def.architecture}\`
- **Đường dẫn xem trước**: \`${def.previewRoute}\`
- **Giá đề xuất trên 5sdev.vn**: ${def.price.priceVnd.toLocaleString('vi-VN')} VNĐ (\`${def.price.tier}\`)

## Cấu trúc Thư mục Độc lập
\`\`\`text
${def.sourcePath}/
├── page.tsx                        # Giao diện chính của template
├── components/
│   ├── HeroSection.tsx             # Hero section theo kiến trúc ${def.architecture}
│   ├── InteractiveWidget.tsx       # Module tương tác chuyên ngành (${def.widgetType})
│   └── ContentSections.tsx         # Features, Testimonials, FAQ & Contact Form
├── styles/
│   └── theme.css                   # Biến màu sắc & Design Tokens riêng
├── assets/
│   └── thumbnail.svg               # Ảnh xem trước Vector SVG không watermark
├── metadata.json                   # Metadata tích hợp hệ thống 5sdev.vn
└── README.md                       # Tài liệu hướng dẫn
\`\`\`
`;
}

export function writeSingleTemplateToDisk(baseDir, def) {
  const tplDir = path.join(baseDir, 'templates', def.category, def.slug);
  const compDir = path.join(tplDir, 'components');
  const styleDir = path.join(tplDir, 'styles');
  const assetDir = path.join(tplDir, 'assets');

  fs.mkdirSync(compDir, { recursive: true });
  fs.mkdirSync(styleDir, { recursive: true });
  fs.mkdirSync(assetDir, { recursive: true });

  const theme = getStyleThemeClasses(def);

  fs.writeFileSync(path.join(compDir, 'HeroSection.tsx'), generateHeroComponentCode(def, theme), 'utf8');
  fs.writeFileSync(path.join(compDir, 'InteractiveWidget.tsx'), generateInteractiveWidgetCode(def, theme), 'utf8');
  fs.writeFileSync(path.join(compDir, 'ContentSections.tsx'), generateContentSectionsCode(def, theme), 'utf8');
  fs.writeFileSync(path.join(tplDir, 'page.tsx'), generatePageTsxCode(def, theme), 'utf8');
  fs.writeFileSync(path.join(styleDir, 'theme.css'), generateThemeCss(def), 'utf8');
  fs.writeFileSync(path.join(assetDir, 'thumbnail.svg'), generateThumbnailSvg(def), 'utf8');

  const { globalIndex, domainItems, metrics, ...cleanMeta } = def;
  fs.writeFileSync(path.join(tplDir, 'metadata.json'), JSON.stringify(cleanMeta, null, 2), 'utf8');
  fs.writeFileSync(path.join(tplDir, 'README.md'), generateReadmeMd(def), 'utf8');

  return cleanMeta;
}
