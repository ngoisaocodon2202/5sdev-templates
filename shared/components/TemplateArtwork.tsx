import React, { useState } from 'react';

export interface ArtworkProps {
  code: string;
  title: string;
  category: string;
  styleId: string;
  primaryColor: string;
  secondaryColor: string;
  heroImage?: string;
  isDark?: boolean;
  variant?: number;
  className?: string;
}

const DEFAULT_CATEGORY_IMAGES: Record<string, string> = {
  ecommerce: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
  restaurant: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  beauty: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
  fashion: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
  education: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
  healthcare: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
  'real-estate': 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
  travel: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
  hotel: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
  portfolio: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
  corporate: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
  technology: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
  finance: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
  automotive: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
  construction: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80',
  furniture: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'interior-design': 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
  photography: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  wedding: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
  event: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
  fitness: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
  spa: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
  'pet-care': 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
  agriculture: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
  logistics: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
  legal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
  news: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
  blog: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
  nonprofit: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
  'landing-page': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
};

export const TemplateThumbnailArtwork: React.FC<ArtworkProps> = ({
  code,
  title,
  category,
  styleId,
  primaryColor,
  secondaryColor,
  heroImage,
  isDark = false,
  className = 'w-full h-full',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const catKey = category.toLowerCase().replace(/\s+/g, '-');
  const photoUrl =
    heroImage ||
    DEFAULT_CATEGORY_IMAGES[catKey] ||
    DEFAULT_CATEGORY_IMAGES.ecommerce;

  return (
    <div
      className={`relative overflow-hidden select-none ${
        isDark ? 'bg-slate-950 text-white' : 'bg-slate-100 text-slate-900'
      } ${className}`}
    >
      {/* Background Real Demo Photography */}
      {!imgFailed ? (
        <img
          src={photoUrl}
          alt={`${title} (${code})`}
          loading="lazy"
          onError={() => setImgFailed(true)}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <div
          className="h-full w-full"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
          }}
        />
      )}

      {/* Subtle Gradient Overlay so UI Chrome & Text Preview Pop */}
      <div
        className="absolute inset-0"
        style={{
          background: isDark
            ? 'linear-gradient(to top, rgba(2,6,23,0.92) 0%, rgba(2,6,23,0.45) 55%, rgba(2,6,23,0.25) 100%)'
            : 'linear-gradient(to top, rgba(15,23,42,0.88) 0%, rgba(15,23,42,0.35) 55%, rgba(15,23,42,0.18) 100%)',
        }}
      />

      {/* Simulated Mini Browser Top Bar */}
      <div className="absolute inset-x-3 top-2.5 flex items-center justify-between rounded-lg bg-slate-950/75 px-2.5 py-1 backdrop-blur-md border border-white/10">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-500" />
          <span className="h-2 w-2 rounded-full bg-amber-400" />
          <span className="h-2 w-2 rounded-full bg-emerald-400" />
          <span className="ml-1.5 font-mono text-[10px] text-slate-300 truncate max-w-[140px]">
            {code.toLowerCase()}.5sdev.vn
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="flex h-4 w-4 items-center justify-center rounded text-[8px] font-black text-white shrink-0"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            {title.slice(0, 2).toUpperCase()}
          </div>
          <span
            className="rounded px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-white whitespace-nowrap"
            style={{ background: primaryColor }}
          >
            {styleId}
          </span>
        </div>
      </div>

      {/* Bottom Mini Website Hero Preview Overlay */}
      <div className="absolute inset-x-3 bottom-3 rounded-xl bg-slate-950/80 p-2.5 sm:p-3 backdrop-blur-md border border-white/15">
        <div className="flex items-center justify-between gap-2.5">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-black text-xs shrink-0 shadow-md"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            {title.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-xs font-bold text-white truncate">{title}</div>
            <div className="text-[10px] text-slate-300 truncate mt-0.5">
              {code} • Giao diện chuẩn UI/UX & Responsive
            </div>
          </div>
          <span
            className="shrink-0 rounded-lg px-2.5 py-1 text-[10px] font-bold text-white whitespace-nowrap"
            style={{
              background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`,
            }}
          >
            Demo Thực Tế
          </span>
        </div>
      </div>
    </div>
  );
};
