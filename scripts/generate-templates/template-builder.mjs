import fs from 'fs';
import path from 'path';
import {
  INDUSTRY_BLUEPRINTS,
  PALETTES,
  STYLE_LIST,
  ARCHITECTURES,
  BRAND_PREFIXES,
} from './catalog-data.mjs';
import { INDUSTRY_PHOTOS, AVATAR_PHOTOS } from './industry-media.mjs';

export function buildAllTemplateDefinitions() {
  const definitions = [];
  let globalIndex = 1;

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

      const photosPool = INDUSTRY_PHOTOS[industry.slug] || INDUSTRY_PHOTOS.ecommerce;
      // Rotate photos per variant so each template in a category has a distinct hero & gallery ordering
      const rotatedPhotos = photosPool.map(
        (_, i) => photosPool[(i + variantIdx) % photosPool.length]
      );

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
      const description = `Giải pháp giao diện website ${subNiche} chuyên nghiệp thuộc lĩnh vực ${industry.nameVi}, thiết kế theo phong cách ${styleObj.name}. Tích hợp đầy đủ hình ảnh demo thực tế, danh mục sản phẩm/dịch vụ, hồ sơ dự án, bảng giá và công cụ tương tác trực tuyến trên mọi thiết bị.`;

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
        heroImage: rotatedPhotos[0],
        galleryImages: rotatedPhotos,
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
          `Thiết kế ${styleObj.name} tối ưu trải nghiệm ngành ${industry.nameVi}`,
          'Đầy đủ hình ảnh Demo thực tế sắc nét cho từng dịch vụ và dự án',
          `Công cụ tương tác chuyên ngành (${industry.widgetType.toUpperCase()}) tính phí trực tiếp`,
          'Bố cục chống tràn chữ, tương thích hoàn hảo Desktop, Tablet & Mobile',
          'Tích hợp Bảng giá 3 gói, Hồ sơ năng lực, Đánh giá khách hàng & FAQ',
        ],
        sections: [
          'Top Utility Bar & Sticky Responsive Header',
          `Hero Showcase & 4-Column KPI Metrics (${architecture})`,
          `Featured ${subNiche} Offerings with Demo Photography`,
          'Interactive Online Calculator / Booking / Order Studio',
          'About Story, Visual Collage & Quality Benchmarks',
          'Filterable 6-Item Project / Lookbook Gallery',
          '3-Tier Transparent Pricing & Service Packages',
          'Verified Customer Testimonials with Avatars & FAQ',
          'Lead Capture Form & 4-Column Enterprise Footer',
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
        rating: Number((4.8 + ((variantIdx + catIdx) % 3) * 0.1).toFixed(1)),
        downloadsCount: 240 + ((variantIdx * 37 + catIdx * 53) % 1400),
        batchNumber,
        updatedAt: '2026-11-09',
        metrics: industry.metrics,
        domainItems: industry.items.map((it, idx) => ({
          ...it,
          id: `${id}-0${idx + 1}`,
          title: it.title,
          image: rotatedPhotos[(idx + 1) % rotatedPhotos.length],
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
      subtleBg: 'bg-amber-100/60',
      headerBg: 'bg-amber-50/95 border-b-2 border-black backdrop-blur-md',
      muted: 'text-zinc-700',
      badge: 'bg-lime-300 text-black border-2 border-black font-mono font-bold',
      btnPrimary: 'bg-black text-white border-2 border-black shadow-[3px_3px_0px_0px_#4F46E5] hover:translate-y-0.5 transition',
      btnSecondary: 'bg-white text-black border-2 border-black shadow-[3px_3px_0px_0px_#000] hover:bg-amber-100 transition',
      radius: 'rounded-xl',
      headingFont: 'font-display font-black tracking-tight',
    };
  }
  if (designStyle === 'swiss-design') {
    return {
      pageBg: 'bg-white text-zinc-950',
      surface: 'bg-zinc-50 border border-zinc-900',
      subtleBg: 'bg-zinc-100',
      headerBg: 'bg-white/95 border-b border-zinc-900 backdrop-blur-md',
      muted: 'text-zinc-600',
      badge: 'bg-red-600 text-white font-mono uppercase tracking-wider',
      btnPrimary: 'bg-zinc-950 text-white font-bold hover:bg-red-600 transition',
      btnSecondary: 'bg-white text-zinc-950 border border-zinc-900 font-bold hover:bg-zinc-100 transition',
      radius: 'rounded-lg',
      headingFont: 'font-display tracking-tight font-extrabold',
    };
  }
  if (designStyle === 'luxury' || designStyle === 'editorial' || designStyle === 'japanese-minimalism') {
    return {
      pageBg: 'bg-[#FAF7F2] text-stone-900',
      surface: 'bg-white border border-stone-200/90 shadow-sm',
      subtleBg: 'bg-stone-100/80',
      headerBg: 'bg-[#FAF7F2]/95 border-b border-stone-200 backdrop-blur-md',
      muted: 'text-stone-600',
      badge: 'bg-stone-900 text-amber-100 font-medium tracking-wide',
      btnPrimary: 'bg-stone-900 text-amber-50 hover:bg-stone-800 transition shadow-md',
      btnSecondary: 'bg-white text-stone-900 border border-stone-300 hover:border-stone-900 transition',
      radius: 'rounded-xl',
      headingFont: 'font-serif font-bold tracking-tight',
    };
  }
  if (isDark) {
    return {
      pageBg: 'bg-[#080C16] text-slate-100',
      surface: 'bg-[#101726] border border-slate-800/90 shadow-xl',
      subtleBg: 'bg-[#0D1322]',
      headerBg: 'bg-[#080C16]/90 border-b border-slate-800/80 backdrop-blur-xl',
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
    subtleBg: 'bg-slate-100/80',
    headerBg: 'bg-white/95 border-b border-slate-200/80 backdrop-blur-md',
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
  <text x="52" y="128" fill="${text}" font-family="Inter, sans-serif" font-size="22" font-weight="800">${def.name.replace(/&/g, '&amp;')}</text>
  <text x="52" y="158" fill="${muted}" font-family="Inter, sans-serif" font-size="14">${def.categoryNameVi} • ${def.designStyleName}</text>
  <rect x="52" y="188" width="160" height="42" rx="10" fill="url(#g-${def.slug})" />
  <text x="132" y="214" fill="#FFFFFF" font-family="Inter, sans-serif" font-size="13" font-weight="700" text-anchor="middle">${def.actionLabel}</text>
  <rect x="52" y="256" width="168" height="92" rx="12" fill="${bg}" />
  <rect x="236" y="256" width="168" height="92" rx="12" fill="${bg}" />
  <rect x="420" y="256" width="168" height="92" rx="12" fill="${bg}" />
</svg>
`;
}

function generateHeroComponentCode(def, theme) {
  const btnBg =
    def.designStyle === 'brutalism' || def.designStyle === 'swiss-design'
      ? '#000000'
      : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`;

  return `import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2, Star, ShieldCheck, Play } from '@shared/icons/template-icons';

export interface HeroSectionProps {
  onPrimaryAction: () => void;
  onSecondaryAction: () => void;
}

const HERO_METRICS = ${JSON.stringify(def.metrics)};
const AVATARS = ${JSON.stringify(AVATAR_PHOTOS.slice(0, 3))};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onPrimaryAction,
  onSecondaryAction,
}) => {
  return (
    <section className="relative overflow-hidden py-10 sm:py-16 lg:py-20 border-b border-current/10">
      {/* Ambient Artistic Glow */}
      <div
        className="pointer-events-none absolute -top-32 right-10 h-80 w-80 rounded-full blur-[120px] opacity-20"
        style={{ background: '${def.primaryColor}' }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-10 h-72 w-72 rounded-full blur-[120px] opacity-15"
        style={{ background: '${def.secondaryColor}' }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        {/* Main 2-Column Hero Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
          {/* Left 6 Cols: Balanced Headline, Highlights, CTAs & Social Proof */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 text-xs ${theme.badge} ${theme.radius}">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span className="whitespace-nowrap">${def.id} • ${def.categoryNameVi.toUpperCase()}</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] ${theme.headingFont} leading-[1.2] tracking-tight">
              Giải Pháp{' '}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})',
                }}
              >
                ${def.subNiche}
              </span>{' '}
              Chuyên Nghiệp Cùng ${def.brandName}
            </h1>

            <p className="text-sm sm:text-base ${theme.muted} leading-relaxed">
              ${def.description}
            </p>

            {/* Key Highlights List */}
            <div className="space-y-2.5 pt-1">
              {${JSON.stringify(def.features.slice(0, 3))}.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm font-medium">
                  <CheckCircle2
                    className="h-4 w-4 shrink-0 mt-0.5"
                    style={{ color: '${def.primaryColor}' }}
                  />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons (Never Wrap Awkwardly) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                type="button"
                onClick={onPrimaryAction}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-bold ${theme.btnPrimary} ${theme.radius} whitespace-nowrap"
                style={{ background: '${btnBg}' }}
              >
                <span>${def.actionLabel}</span>
                <ArrowRight className="h-4 w-4 shrink-0" />
              </button>
              <button
                type="button"
                onClick={onSecondaryAction}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold ${theme.btnSecondary} ${theme.radius} whitespace-nowrap"
              >
                <Play className="h-4 w-4 shrink-0" />
                <span>${def.secondaryAction}</span>
              </button>
            </div>

            {/* Customer Social Proof Bar */}
            <div className="flex flex-wrap items-center gap-4 pt-3 border-t border-current/10">
              <div className="flex -space-x-2.5">
                {AVATARS.map((av, i) => (
                  <img
                    key={i}
                    src={av}
                    alt="Khách hàng"
                    loading="lazy"
                    className="h-9 w-9 rounded-full border-2 border-white object-cover"
                  />
                ))}
              </div>
              <div className="text-xs">
                <div className="flex items-center gap-1 font-bold text-amber-500">
                  <span>★★★★★</span>
                  <span>${def.rating}/5.0</span>
                </div>
                <p className="${theme.muted}">
                  Được tin chọn bởi hơn <strong>1.200+ khách hàng & đối tác</strong>
                </p>
              </div>
            </div>
          </div>

          {/* Right 6 Cols: High-Res Demo Photography Showcase + Secondary Photo Strip */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative overflow-hidden p-3 sm:p-4 ${theme.surface} ${theme.radius}">
              <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-slate-900">
                <img
                  src="${def.heroImage}"
                  alt="${def.name}"
                  className="h-full w-full object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />

                {/* Top Floating Badge */}
                <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-lg bg-slate-950/80 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/15">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>${def.brandName} Flagship • ${def.id}</span>
                </div>

                {/* Bottom Overlay Info inside Hero Photo */}
                <div className="absolute inset-x-3.5 bottom-3.5 flex flex-wrap items-center justify-between gap-2 rounded-xl bg-slate-950/85 p-3.5 text-white backdrop-blur-md border border-white/15">
                  <div>
                    <div className="text-xs font-bold">${def.subNiche} — Tiêu Chuẩn Quốc Tế</div>
                    <div className="text-[11px] text-slate-300">
                      Cam kết chất lượng • Bảo hành chính hãng • Hỗ trợ 24/7
                    </div>
                  </div>
                  <span
                    className="rounded-lg px-3 py-1 text-xs font-bold text-white whitespace-nowrap"
                    style={{ background: '${def.primaryColor}' }}
                  >
                    ★ ${def.rating} Đánh giá
                  </span>
                </div>
              </div>

              {/* 2 Secondary Demo Thumbnails */}
              <div className="mt-3 grid grid-cols-2 gap-3">
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="${def.galleryImages[1]}"
                    alt="Demo 1"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Không gian & Thực tế</div>
                    <div className="text-[11px] ${theme.muted} truncate">Chuẩn mực ${def.designStyleName}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-current/10 p-2.5">
                  <img
                    src="${def.galleryImages[2]}"
                    alt="Demo 2"
                    loading="lazy"
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold truncate">Quy trình Chuyên sâu</div>
                    <div className="text-[11px] ${theme.muted} truncate">Bàn giao đúng cam kết</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column KPI Metrics Strip (Spacious, Zero Cramped Wrapping) */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 sm:gap-6">
          {HERO_METRICS.map((stat, i) => (
            <div
              key={i}
              className="p-5 sm:p-6 ${theme.surface} ${theme.radius} flex flex-col justify-between"
            >
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-mono uppercase tracking-wider opacity-60">
                  CHỈ SỐ 0{i + 1}
                </span>
                <ShieldCheck className="h-4 w-4 shrink-0" style={{ color: '${def.primaryColor}' }} />
              </div>
              <div
                className="text-2xl sm:text-3xl font-extrabold whitespace-nowrap"
                style={{ color: '${def.primaryColor}' }}
              >
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-semibold ${theme.muted} mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
`;
}

function generateInteractiveWidgetCode(def, theme) {
  const btnBg =
    def.designStyle === 'brutalism' || def.designStyle === 'swiss-design'
      ? '#000000'
      : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`;

  return `import React, { useState } from 'react';
import {
  CheckCircle2,
  Plus,
  Minus,
  Sparkles,
  ArrowRight,
  Star,
  ShieldCheck,
} from '@shared/icons/template-icons';

const DOMAIN_ITEMS = ${JSON.stringify(def.domainItems, null, 2)};

export const InteractiveWidget: React.FC = () => {
  const widgetType: string = '${def.widgetType}';
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [guestCount, setGuestCount] = useState(2);
  const [bookingDate, setBookingDate] = useState('2026-11-15');
  const [bookingTime, setBookingTime] = useState('09:00');
  const [sliderValue, setSliderValue] = useState(10);
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
    <section id="interactive-section" className="py-14 sm:py-20 border-b border-current/10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs ${theme.badge} ${theme.radius} mb-2">
              <Sparkles className="h-3.5 w-3.5 shrink-0" />
              <span>SẢN PHẨM & DỊCH VỤ TRỌNG ĐIỂM • ${def.id}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl ${theme.headingFont}">
              Khám Phá Các Gói ${def.subNiche} Nổi Bật
            </h2>
            <p className="mt-2 text-sm ${theme.muted}">
              Mỗi gói giải pháp đều đi kèm hình ảnh thực tế, thông số minh bạch và công cụ tính toán chi phí trực tiếp.
            </p>
          </div>

          {widgetType === 'configurator' && (
            <div className="inline-flex items-center gap-2 p-1.5 ${theme.surface} ${theme.radius} self-start">
              <button
                type="button"
                onClick={() => setBillingAnnual(false)}
                className={\`px-3.5 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap \${
                  !billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }\`}
              >
                Theo Tháng
              </button>
              <button
                type="button"
                onClick={() => setBillingAnnual(true)}
                className={\`px-3.5 py-1.5 text-xs font-bold rounded-lg transition whitespace-nowrap \${
                  billingAnnual ? 'bg-indigo-600 text-white' : 'opacity-70'
                }\`}
              >
                Theo Năm (Tiết kiệm 20%)
              </button>
            </div>
          )}
        </div>

        {/* 1. Spacious 2-Column Showcase Cards with Real Demo Images */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {DOMAIN_ITEMS.map((item, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedIndex(idx);
                  setActionConfirmed(false);
                }}
                className={\`group cursor-pointer overflow-hidden transition-all duration-300 \${
                  isSelected ? 'ring-2 ring-offset-2' : 'hover:-translate-y-0.5'
                } ${theme.surface} ${theme.radius} flex flex-col\`}
                style={{
                  borderColor: isSelected ? '${def.primaryColor}' : undefined,
                }}
              >
                {/* Card Demo Image */}
                <div className="relative h-52 sm:h-60 w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/20" />
                  <div className="absolute left-3.5 top-3.5 flex items-center gap-2">
                    <span
                      className="px-3 py-1 text-xs font-bold rounded-lg text-white shadow whitespace-nowrap"
                      style={{ background: idx % 2 === 0 ? '${def.primaryColor}' : '${def.secondaryColor}' }}
                    >
                      {item.tag}
                    </span>
                  </div>
                  <div className="absolute right-3.5 top-3.5 rounded-lg bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] font-bold text-white backdrop-blur-md">
                    {item.id}
                  </div>
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold bg-black/50 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      ★ 4.9 Đánh giá thực tế
                    </span>
                    <span className="text-lg sm:text-xl font-extrabold bg-slate-950/85 px-3 py-1 rounded-lg whitespace-nowrap">
                      {formatVnd(item.price)}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold leading-snug">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm ${theme.muted} leading-relaxed">
                      {item.meta}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-3 pt-3 border-t border-current/10">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '${def.primaryColor}' }} />
                      <span>Có sẵn • Hỗ trợ tư vấn ngay</span>
                    </span>
                    <button
                      type="button"
                      className="px-4 py-2 text-xs font-bold rounded-xl text-white whitespace-nowrap transition"
                      style={{
                        background: isSelected ? '${def.primaryColor}' : '#334155',
                      }}
                    >
                      {isSelected ? 'Đang chọn ✓' : 'Chọn gói này'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. Interactive Online Calculator / Booking / Order Studio */}
        <div className="p-6 sm:p-8 ${theme.surface} ${theme.radius}">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider opacity-75">
                <ShieldCheck className="h-4 w-4" style={{ color: '${def.primaryColor}' }} />
                <span>CÔNG CỤ TÍNH PHÍ & ĐẶT LỊCH TRỰC TUYẾN</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold">
                Đang cấu hình: {activeItem.title}
              </h3>
              <p className="text-xs sm:text-sm ${theme.muted}">
                {activeItem.meta} — Tùy chỉnh các thông số bên dưới để nhận báo giá chính xác ngay lập tức.
              </p>

              {widgetType === 'commerce' && (
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <span className="text-sm font-semibold">Số lượng đặt mua:</span>
                  <div className="inline-flex items-center gap-4 border border-current/20 rounded-xl px-4 py-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-1 hover:opacity-70"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="font-mono text-base font-bold w-8 text-center">{quantity}</span>
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-1 hover:opacity-70"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {widgetType === 'booking' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs">
                  <div>
                    <label className="block font-semibold mb-1.5">Ngày hẹn:</label>
                    <input
                      type="date"
                      value={bookingDate}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1.5">Khung giờ:</label>
                    <select
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5"
                    >
                      <option value="09:00" className="text-black">09:00 Sáng</option>
                      <option value="14:00" className="text-black">14:00 Chiều</option>
                      <option value="19:00" className="text-black">19:00 Tối</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold mb-1.5">Số lượng khách / suất:</label>
                    <div className="flex items-center justify-between border border-current/20 rounded-xl px-3.5 py-2">
                      <button type="button" onClick={() => setGuestCount(Math.max(1, guestCount - 1))}>
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="font-mono text-sm font-bold">{guestCount}</span>
                      <button type="button" onClick={() => setGuestCount(guestCount + 1)}>
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {widgetType === 'calculator' && (
                <div className="space-y-2 pt-2 text-xs sm:text-sm">
                  <div className="flex justify-between font-semibold">
                    <span>Quy mô / Diện tích / Thời hạn dự kiến:</span>
                    <span className="font-mono font-bold" style={{ color: '${def.primaryColor}' }}>
                      {sliderValue * 10} đơn vị tiêu chuẩn
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
                </div>
              )}
            </div>

            {/* Right 5 Cols: Total Summary & Instant Action */}
            <div className="lg:col-span-5 rounded-2xl border border-current/15 p-5 sm:p-6 space-y-4">
              <div className="flex items-baseline justify-between gap-2 border-b border-current/10 pb-4">
                <span className="text-xs sm:text-sm ${theme.muted}">Tổng chi phí dự kiến:</span>
                <span
                  className="text-2xl sm:text-3xl font-extrabold whitespace-nowrap"
                  style={{ color: '${def.primaryColor}' }}
                >
                  {formatVnd(estimatedTotal)}
                </span>
              </div>

              {actionConfirmed ? (
                <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-4 text-xs space-y-1">
                  <div className="flex items-center gap-2 font-bold text-emerald-500">
                    <CheckCircle2 className="h-4 w-4 shrink-0" />
                    <span>Đã ghi nhận yêu cầu đặt dịch vụ!</span>
                  </div>
                  <p className="${theme.muted}">
                    Mã phiếu: <strong>{activeItem.id}</strong> • Tổng cộng:{' '}
                    <strong>{formatVnd(estimatedTotal)}</strong>
                  </p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setActionConfirmed(true)}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold ${theme.btnPrimary} ${theme.radius} whitespace-nowrap"
                  style={{ background: '${btnBg}' }}
                >
                  <span>Xác Nhận ${def.actionLabel}</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
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
  const btnBg =
    def.designStyle === 'brutalism' || def.designStyle === 'swiss-design'
      ? '#000000'
      : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`;

  const basePrice = def.price.priceVnd > 0 ? def.price.priceVnd : 1490000;

  return `import React, { useState } from 'react';
import {
  CheckCircle2,
  Star,
  ChevronDown,
  Send,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
} from '@shared/icons/template-icons';

const GALLERY_PROJECTS = [
  {
    title: 'Dự Án Tiêu Điểm #01 — ${def.brandName} Flagship',
    category: 'Tiêu biểu',
    scale: 'Quy mô Chuẩn Quốc Tế • Hoàn thành 2026',
    image: '${def.galleryImages[0]}',
  },
  {
    title: 'Giải Pháp Chuyên Sâu #02 — ${def.subNiche}',
    category: 'Mới hoàn thành',
    scale: 'Tối ưu 40% Hiệu suất • Đạt chuẩn ISO',
    image: '${def.galleryImages[1]}',
  },
  {
    title: 'Không Gian & Trải Nghiệm #03 — ${def.categoryNameVi}',
    category: 'Tiêu biểu',
    scale: 'Khách hàng Doanh nghiệp VIP • 5 Sao',
    image: '${def.galleryImages[2]}',
  },
  {
    title: 'Tổ Hợp Hiện Đại #04 — ${def.designStyleName} Edition',
    category: 'Mới hoàn thành',
    scale: 'Vật liệu & Công nghệ Thế hệ mới',
    image: '${def.galleryImages[3]}',
  },
  {
    title: 'Hạng Mục Cao Cấp #05 — ${def.brandName} Signature',
    category: 'Tiêu biểu',
    scale: 'Bảo hành dài hạn • Bàn giao vượt tiến độ',
    image: '${def.galleryImages[4]}',
  },
  {
    title: 'Bộ Sưu Tập Thực Tế #06 — Chuẩn Mực Mới',
    category: 'Mới hoàn thành',
    scale: 'Được bình chọn xuất sắc nhất năm',
    image: '${def.galleryImages[5]}',
  },
];

const PRICING_TIERS = [
  {
    name: 'Gói Tiêu Chuẩn (Standard)',
    desc: 'Phù hợp cho nhu cầu khởi đầu nhanh chóng với ngân sách tối ưu.',
    price: '${new Intl.NumberFormat('vi-VN').format(basePrice)} ₫',
    popular: false,
    perks: [
      'Tư vấn & Khảo sát nhu cầu ban đầu miễn phí',
      'Triển khai đầy đủ các hạng mục cốt lõi',
      'Bảo hành tiêu chuẩn 12 tháng chính hãng',
      'Hỗ trợ kỹ thuật trong giờ hành chính',
    ],
  },
  {
    name: 'Gói Chuyên Nghiệp (Pro)',
    desc: 'Giải pháp toàn diện được 80% khách hàng doanh nghiệp & cá nhân lựa chọn.',
    price: '${new Intl.NumberFormat('vi-VN').format(basePrice * 2)} ₫',
    popular: true,
    perks: [
      'Toàn bộ quyền lợi Gói Tiêu Chuẩn nâng cao',
      'Chuyên gia trưởng trực tiếp phụ trách hồ sơ',
      'Vật liệu & Công nghệ phân khúc cao cấp',
      'Bảo hành mở rộng 36 tháng & Hỗ trợ 24/7',
    ],
  },
  {
    name: 'Gói Thượng Đỉnh (Enterprise VIP)',
    desc: 'Thiết kế độc bản theo yêu cầu riêng biệt với cam kết SLA cao nhất.',
    price: '${new Intl.NumberFormat('vi-VN').format(basePrice * 4)} ₫',
    popular: false,
    perks: [
      'Thiết kế & Triển khai May đo Độc bản 100%',
      'Đội ngũ Chuyên gia Đặc nhiệm phục vụ riêng',
      'Ưu tiên tiến độ khẩn cấp & Bảo mật NDA',
      'Bảo hành trọn đời & Bảo trì định kỳ miễn phí',
    ],
  },
];

const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Quân',
    role: 'Tổng Giám Đốc — Tập đoàn Đầu tư Á Châu',
    avatar: '${AVATAR_PHOTOS[0]}',
    quote: 'Trải nghiệm hợp tác cùng ${def.brandName} thực sự vượt mong đợi. Hình ảnh thực tế sắc nét, quy trình làm việc rõ ràng và bàn giao đúng từng cam kết trong hợp đồng.',
  },
  {
    name: 'Trần Thanh Hà',
    role: 'Giám Đốc Vận Hành — Emerald Group',
    avatar: '${AVATAR_PHOTOS[1]}',
    quote: 'Đội ngũ chuyên gia của ${def.brandName} tư vấn rất tận tâm. Chất lượng hoàn thiện trong lĩnh vực ${def.categoryNameVi} đạt chuẩn quốc tế khiến chúng tôi hoàn toàn yên tâm.',
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Kiến Trúc Sư & Nhà Sáng Lập',
    avatar: '${AVATAR_PHOTOS[2]}',
    quote: 'Chi phí minh bạch, tiến độ chuẩn xác và dịch vụ hậu mãi chu đáo. Chắc chắn chúng tôi sẽ tiếp tục đồng hành cùng ${def.brandName} trong các dự án lớn sắp tới.',
  },
];

export const ContentSections: React.FC = () => {
  const [projectFilter, setProjectFilter] = useState<'ALL' | 'Tiêu biểu' | 'Mới hoàn thành'>('ALL');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const visibleProjects =
    projectFilter === 'ALL'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === projectFilter);

  const faqs = [
    {
      q: 'Quy trình triển khai dịch vụ tại ${def.brandName} diễn ra như thế nào?',
      a: 'Quy trình chuẩn hóa gồm 4 bước: (1) Tiếp nhận thông tin & Khảo sát thực tế, (2) Lên phương án demo & Báo giá chi tiết, (3) Ký hợp đồng & Triển khai chuẩn chất lượng, (4) Nghiệm thu bàn giao & Bảo hành định kỳ.',
    },
    {
      q: 'Chi phí báo giá trên website đã bao gồm trọn gói chưa?',
      a: 'Mức giá hiển thị trên bảng tính tương tác và bảng giá là mức giá minh bạch. Chúng tôi cam kết không phát sinh chi phí ẩn ngoài hợp đồng.',
    },
    {
      q: 'Chính sách bảo hành và hỗ trợ sau bàn giao tại ${def.brandName} ra sao?',
      a: 'Tất cả khách hàng đều nhận được chứng nhận bảo hành điện tử chính hãng cùng đội ngũ kỹ thuật trực hỗ trợ 24/7 trên toàn quốc.',
    },
  ];

  return (
    <>
      {/* 1. About Us & Multi-Photo Collage Section */}
      <section id="about-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 6 Cols: 2-Photo Collage */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="${def.galleryImages[3]}"
                  alt="Về chúng tôi 1"
                  loading="lazy"
                  className="h-56 sm:h-72 w-full rounded-2xl object-cover shadow-lg"
                />
                <div
                  className="rounded-2xl p-5 text-white shadow-lg"
                  style={{ background: '${btnBg}' }}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold">15+ Năm</div>
                  <div className="text-xs opacity-90 mt-1">
                    Kinh nghiệm thực chiến dẫn đầu lĩnh vực ${def.categoryNameVi}
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="p-5 ${theme.surface} ${theme.radius}">
                  <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '${def.primaryColor}' }}>
                    99.4%
                  </div>
                  <div className="text-xs ${theme.muted} mt-1">
                    Khách hàng hài lòng & Giới thiệu đối tác mới
                  </div>
                </div>
                <img
                  src="${def.galleryImages[4]}"
                  alt="Về chúng tôi 2"
                  loading="lazy"
                  className="h-56 sm:h-72 w-full rounded-2xl object-cover shadow-lg"
                />
              </div>
            </div>

            {/* Right 6 Cols: Story & Core Competencies */}
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs ${theme.badge} ${theme.radius}">
                <Award className="h-3.5 w-3.5 shrink-0" />
                <span>HỒ SƠ NĂNG LỰC • ${def.brandName.toUpperCase()}</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl ${theme.headingFont} leading-tight">
                Vì Sao Hàng Nghìn Khách Hàng Tin Tưởng ${def.brandName}?
              </h2>

              <p className="text-sm sm:text-base ${theme.muted} leading-relaxed">
                Với định hướng lấy chất lượng và sự minh bạch làm trọng tâm, ${def.brandName} không ngừng đầu tư vào công nghệ, con người và quy trình chuẩn quốc tế nhằm mang lại giá trị bền vững nhất cho khách hàng trong mảng ${def.subNiche}.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {${JSON.stringify(def.features.slice(0, 4))}.map((feat, idx) => (
                  <div key={idx} className="p-4 ${theme.surface} ${theme.radius} space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '${def.primaryColor}' }} />
                      <span>Tiêu chuẩn 0{idx + 1}</span>
                    </div>
                    <p className="text-xs ${theme.muted} leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Projects / Lookbook / Case Study Gallery (6 Visual Photo Cards) */}
      <section id="projects-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                THƯ VIỆN HÌNH ẢNH & DỰ ÁN THỰC TẾ
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl ${theme.headingFont}">
                Hình Ảnh Thực Tế & Dự Án Tiêu Biểu
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['ALL', 'Tiêu biểu', 'Mới hoàn thành'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setProjectFilter(tab)}
                  className={\`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap \${
                    projectFilter === tab
                      ? 'text-white shadow'
                      : '${theme.surface} opacity-75 hover:opacity-100'
                  }\`}
                  style={{
                    background: projectFilter === tab ? '${def.primaryColor}' : undefined,
                  }}
                >
                  {tab === 'ALL' ? 'Tất cả (6)' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((proj, idx) => (
              <div
                key={idx}
                className="group overflow-hidden ${theme.surface} ${theme.radius} flex flex-col"
              >
                <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <span
                    className="absolute left-3.5 top-3.5 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white"
                    style={{ background: '${def.primaryColor}' }}
                  >
                    {proj.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="text-base font-bold leading-snug">{proj.title}</h3>
                    <p className="text-xs ${theme.muted} mt-1">{proj.scale}</p>
                  </div>
                  <a
                    href="#contact-section"
                    className="inline-flex items-center gap-1.5 text-xs font-bold"
                    style={{ color: '${def.primaryColor}' }}
                  >
                    <span>Xem chi tiết hồ sơ</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Transparent 3-Tier Pricing Table */}
      <section id="pricing-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider opacity-70">
              BẢNG GIÁ NIÊM YẾT MINH BẠCH
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl ${theme.headingFont}">
              Lựa Chọn Gói Giải Pháp Phù Hợp
            </h2>
            <p className="mt-2 text-xs sm:text-sm ${theme.muted}">
              Cam kết không phát sinh chi phí ẩn, hợp đồng pháp lý rõ ràng và bảo hành chính hãng.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier, idx) => (
              <div
                key={idx}
                className={\`relative p-6 sm:p-8 ${theme.surface} ${theme.radius} flex flex-col justify-between \${
                  tier.popular ? 'ring-2' : ''
                }\`}
                style={{
                  borderColor: tier.popular ? '${def.primaryColor}' : undefined,
                }}
              >
                <div>
                  {tier.popular && (
                    <span
                      className="inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white mb-4"
                      style={{ background: '${def.primaryColor}' }}
                    >
                      ★ ĐƯỢC LỰA CHỌN NHIỀU NHẤT
                    </span>
                  )}
                  <h3 className="text-lg sm:text-xl font-bold">{tier.name}</h3>
                  <p className="mt-1.5 text-xs ${theme.muted} leading-relaxed">{tier.desc}</p>
                  <div
                    className="my-5 text-2xl sm:text-3xl font-extrabold whitespace-nowrap"
                    style={{ color: '${def.primaryColor}' }}
                  >
                    {tier.price}
                  </div>
                  <ul className="space-y-2.5 text-xs sm:text-sm border-t border-current/10 pt-5">
                    {tier.perks.map((perk, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <CheckCircle2
                          className="h-4 w-4 shrink-0 mt-0.5"
                          style={{ color: '${def.primaryColor}' }}
                        />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <a
                  href="#contact-section"
                  className="mt-8 w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-bold rounded-xl text-white transition whitespace-nowrap"
                  style={{
                    background: tier.popular ? '${btnBg}' : '#334155',
                  }}
                >
                  <span>Đăng Ký Tư Vấn Gói Này</span>
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials with Real Portrait Avatars */}
      <section id="reviews-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                ĐÁNH GIÁ TỪ KHÁCH HÀNG THỰC TẾ
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl ${theme.headingFont}">
                Khách Hàng Nói Gì Về ${def.brandName}
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm whitespace-nowrap">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>${def.rating} / 5.0 (1.200+ Đánh giá xác thực)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-6 ${theme.surface} ${theme.radius} flex flex-col justify-between space-y-5"
              >
                <div className="space-y-3">
                  <div className="text-amber-500 text-xs font-bold tracking-widest">★★★★★</div>
                  <p className="text-xs sm:text-sm leading-relaxed italic">"{t.quote}"</p>
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-current/10">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    loading="lazy"
                    className="h-11 w-11 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs sm:text-sm font-bold truncate">{t.name}</div>
                    <div className="text-[11px] ${theme.muted} truncate">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive FAQ & Consultation Request Form */}
      <section id="contact-section" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                CÂU HỎI THƯỜNG GẶP (FAQ)
              </span>
              <h2 className="text-2xl sm:text-3xl ${theme.headingFont}">
                Giải Đáp Thắc Mắc Nhanh Chóng
              </h2>
              <div className="space-y-3 pt-2">
                {faqs.map((f, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="${theme.surface} ${theme.radius} overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left text-xs sm:text-sm font-bold"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={\`h-4 w-4 shrink-0 transition-transform \${
                            isOpen ? 'rotate-180' : ''
                          }\`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm ${theme.muted} leading-relaxed border-t border-current/10 pt-3">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="p-6 sm:p-8 ${theme.surface} ${theme.radius}">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  Đăng Ký Nhận Tư Vấn & Báo Giá
                </h3>
                <p className="text-xs sm:text-sm ${theme.muted} mb-6">
                  Chuyên viên của ${def.brandName} sẽ liên hệ lại trong vòng 15 phút làm việc.
                </p>

                {leadSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                    <h4 className="text-base font-bold">Đã gửi yêu cầu tư vấn thành công!</h4>
                    <p className="text-xs ${theme.muted}">
                      Cảm ơn bạn đã tin chọn ${def.brandName}. Chúng tôi sẽ liên hệ ngay.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLeadSubmitted(true);
                    }}
                    className="space-y-4 text-xs sm:text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1.5">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1.5">Số điện thoại / Zalo *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0901 234 567"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5">Email nhận hồ sơ & báo giá</label>
                      <input
                        type="email"
                        placeholder="khachhang@company.vn"
                        className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5">Nội dung cần tư vấn</label>
                      <textarea
                        rows={3}
                        placeholder="Nhập yêu cầu cụ thể hoặc quy mô dự án của bạn..."
                        className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold ${theme.btnPrimary} ${theme.radius} whitespace-nowrap"
                      style={{ background: '${btnBg}' }}
                    >
                      <Send className="h-4 w-4 shrink-0" />
                      <span>Gửi Yêu Cầu Ngay</span>
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
  const btnBg =
    def.designStyle === 'brutalism' || def.designStyle === 'swiss-design'
      ? '#000000'
      : `linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})`;

  return `import React, { useState } from 'react';
import { Menu, X, PhoneCall, Mail, MapPin, ShieldCheck, Globe } from '@shared/icons/template-icons';
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
      {/* Top Utility Bar (Desktop) */}
      <div className="hidden md:block border-b border-current/10 py-2 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <PhoneCall className="h-3.5 w-3.5" style={{ color: '${def.primaryColor}' }} />
              Hotline: <strong>1900 6868</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 opacity-80">
              <Mail className="h-3.5 w-3.5" />
              contact@${def.brandName.toLowerCase()}.vn
            </span>
            <span className="inline-flex items-center gap-1.5 opacity-80">
              <MapPin className="h-3.5 w-3.5" />
              TP. Hồ Chí Minh & Hà Nội
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: '${def.primaryColor}' }} />
              Chứng nhận Chất lượng Quốc tế
            </span>
            <span className="font-mono text-[11px] opacity-70">${def.id}</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header className="sticky top-0 z-30 w-full ${theme.headerBg}">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <a href="#top" className="flex items-center gap-3 shrink-0">
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow-md shrink-0"
              style={{ background: '${btnBg}' }}
            >
              ${def.brandName.slice(0, 2).toUpperCase()}
            </span>
            <div>
              <span className="text-base sm:text-lg font-extrabold tracking-tight block leading-none">
                ${def.brandName}
              </span>
              <span className="text-[11px] opacity-70 block mt-0.5">
                ${def.subNiche}
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            <button type="button" onClick={() => scrollToId('about-section')} className="hover:opacity-70 whitespace-nowrap">
              Giới thiệu
            </button>
            <button type="button" onClick={() => scrollToId('interactive-section')} className="hover:opacity-70 whitespace-nowrap">
              Dịch vụ & Sản phẩm
            </button>
            <button type="button" onClick={() => scrollToId('projects-section')} className="hover:opacity-70 whitespace-nowrap">
              Dự án thực tế
            </button>
            <button type="button" onClick={() => scrollToId('pricing-section')} className="hover:opacity-70 whitespace-nowrap">
              Bảng giá
            </button>
            <button type="button" onClick={() => scrollToId('reviews-section')} className="hover:opacity-70 whitespace-nowrap">
              Đánh giá
            </button>
            <button type="button" onClick={() => scrollToId('contact-section')} className="hover:opacity-70 whitespace-nowrap">
              Liên hệ
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="px-4 py-2.5 text-xs font-bold ${theme.btnPrimary} ${theme.radius} whitespace-nowrap"
              style={{ background: '${btnBg}' }}
            >
              ${def.actionLabel}
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-current/15 shrink-0"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-current/10 px-4 py-4 space-y-2.5 ${theme.pageBg} shadow-xl">
            <button
              type="button"
              onClick={() => scrollToId('about-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Giới thiệu ${def.brandName}
            </button>
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Sản phẩm & Dịch vụ (${def.subNiche})
            </button>
            <button
              type="button"
              onClick={() => scrollToId('projects-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Hình ảnh & Dự án thực tế
            </button>
            <button
              type="button"
              onClick={() => scrollToId('pricing-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Bảng giá niêm yết
            </button>
            <button
              type="button"
              onClick={() => scrollToId('reviews-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Đánh giá từ khách hàng
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact-section')}
              className="block w-full text-left py-2 text-sm font-semibold"
            >
              Liên hệ tư vấn
            </button>
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="w-full py-3 text-center text-xs font-bold text-white rounded-xl mt-2"
              style={{ background: '${btnBg}' }}
            >
              ${def.actionLabel} Ngay
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1">
        <HeroSection
          onPrimaryAction={() => scrollToId('interactive-section')}
          onSecondaryAction={() => scrollToId('projects-section')}
        />
        <InteractiveWidget />
        <ContentSections />
      </main>

      {/* Multi-Column Enterprise Footer */}
      <footer className="border-t border-current/10 pt-14 pb-10 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-current/10">
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-extrabold text-xs"
                  style={{ background: '${btnBg}' }}
                >
                  ${def.brandName.slice(0, 2).toUpperCase()}
                </span>
                <span className="text-base font-extrabold">${def.brandName}</span>
              </div>
              <p className="${theme.muted} leading-relaxed">
                Đơn vị tiên phong trong lĩnh vực ${def.categoryNameVi} (${def.subNiche}), cam kết chất lượng chuẩn quốc tế và dịch vụ tận tâm 24/7.
              </p>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[11px] opacity-80">
                Dịch Vụ Trọng Điểm
              </h4>
              <ul className="space-y-2 ${theme.muted}">
                <li><a href="#interactive-section" className="hover:underline">Tư vấn & Triển khai ${def.subNiche}</a></li>
                <li><a href="#projects-section" className="hover:underline">Hồ sơ Dự án Tiêu biểu</a></li>
                <li><a href="#pricing-section" className="hover:underline">Bảng giá Dịch vụ Trọn gói</a></li>
                <li><a href="#contact-section" className="hover:underline">Chính sách Bảo hành & Hậu mãi</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[11px] opacity-80">
                Về ${def.brandName}
              </h4>
              <ul className="space-y-2 ${theme.muted}">
                <li><a href="#about-section" className="hover:underline">Câu chuyện Thương hiệu</a></li>
                <li><a href="#reviews-section" className="hover:underline">Khách hàng Đánh giá</a></li>
                <li><a href="#contact-section" className="hover:underline">Câu hỏi Thường gặp (FAQ)</a></li>
                <li><a href="#contact-section" className="hover:underline">Tuyển dụng & Đối tác</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[11px] opacity-80">
                Thông Tin Liên Hệ
              </h4>
              <ul className="space-y-2 ${theme.muted}">
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" />
                  <span>Hotline: <strong>1900 6868</strong> (08:00 - 21:00)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span>contact@${def.brandName.toLowerCase()}.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>Tòa nhà Trung tâm, Quận 1, TP. Hồ Chí Minh</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 ${theme.muted}">
            <div>
              © 2026 <strong>${def.name}</strong> • Mã giao diện: <code className="font-mono font-bold">${def.id}</code>
            </div>
            <div>
              Phát triển trên nền tảng <strong>5S DEV.TEMPLATES (5sdev.vn)</strong> • Style: ${def.designStyleName}
            </div>
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
