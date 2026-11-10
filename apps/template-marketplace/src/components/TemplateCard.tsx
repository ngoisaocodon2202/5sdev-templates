import React from 'react';
import { Link } from 'react-router-dom';
import { Eye, ArrowUpRight, Star, Sparkles } from 'lucide-react';
import { TemplateRegistryItem } from '../data/types';
import { TemplateThumbnailArtwork } from '@shared/components/TemplateArtwork';
import { formatPriceVND } from '@shared/utilities';

interface TemplateCardProps {
  template: TemplateRegistryItem;
}

export const TemplateCard: React.FC<TemplateCardProps> = ({ template }) => {
  const variantNum = parseInt(template.id.slice(-3), 10) || 1;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-800/90 bg-slate-900/80 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/60 hover:shadow-2xl hover:shadow-indigo-950/50">
      {/* Thumbnail Viewport with Real Demo Photo & Hover Actions */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950 border-b border-slate-800/80">
        <TemplateThumbnailArtwork
          code={template.id}
          title={template.name}
          category={template.category}
          styleId={template.designStyle}
          primaryColor={template.primaryColor}
          secondaryColor={template.secondaryColor}
          heroImage={template.heroImage}
          isDark={template.isDark}
          variant={variantNum}
          className="h-full w-full transition-transform duration-500 group-hover:scale-105"
        />

        {/* Top Badges */}
        <div className="absolute left-3 top-11 flex items-center gap-1.5">
          {template.isFeatured && (
            <span className="inline-flex items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold uppercase text-slate-950 shadow whitespace-nowrap">
              <Sparkles className="h-3 w-3" /> Nổi bật
            </span>
          )}
        </div>

        {/* Price Pill */}
        <div className="absolute right-3 top-11">
          <span
            className={`rounded-lg px-2.5 py-1 text-xs font-bold shadow whitespace-nowrap ${
              template.price.isFree
                ? 'bg-emerald-500 text-slate-950'
                : 'bg-slate-950/90 border border-indigo-500/40 text-indigo-300 backdrop-blur-md'
            }`}
          >
            {template.price.isFree ? 'Miễn phí' : formatPriceVND(template.price.priceVnd)}
          </span>
        </div>

        {/* Hover Quick-Action Overlay */}
        <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/75 opacity-0 backdrop-blur-[2px] transition-opacity duration-200 group-hover:opacity-100 p-4">
          <Link
            to={template.previewRoute}
            className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition whitespace-nowrap"
          >
            <Eye className="h-4 w-4" />
            Xem Demo Trực Tiếp
          </Link>
          <Link
            to={template.detailsRoute}
            className="inline-flex items-center gap-1.5 rounded-xl border border-slate-600 bg-slate-900/90 px-4 py-2.5 text-xs font-semibold text-slate-100 hover:bg-slate-800 transition whitespace-nowrap"
          >
            Chi tiết
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          {/* Category & Design Style */}
          <div className="mb-2 flex items-center justify-between gap-2 text-xs">
            <Link
              to={`/templates?category=${template.category}`}
              className="font-semibold text-indigo-400 hover:text-indigo-300 truncate"
            >
              {template.categoryNameVi} • {template.subNiche}
            </Link>
            <span className="shrink-0 rounded-md bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-300 whitespace-nowrap">
              {template.designStyleName}
            </span>
          </div>

          {/* Template Brand & Name (Official 5sdev.vn Copyright Logo) */}
          <Link to={template.detailsRoute} className="flex items-center gap-2.5 group-hover:text-indigo-300 transition">
            <div
              className="relative flex h-7 w-7 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white font-black text-[10px] shrink-0 shadow-sm border border-white/20"
              title="Bản quyền thuộc 5S DEV (5sdev.vn)"
            >
              <img
                src="/images/logo.png"
                alt="5sdev.vn"
                className="h-full w-full object-contain p-0.5 bg-white/95 rounded-[inherit]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <h3 className="font-display text-base sm:text-lg font-bold text-white truncate">
              {template.name}
            </h3>
          </Link>
          <p className="mt-1.5 text-xs text-slate-400 line-clamp-2 leading-relaxed">
            {template.description}
          </p>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-800/80 space-y-3">
          {/* Tags & Rating */}
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 overflow-hidden">
              <span className="rounded bg-slate-800/90 px-2 py-0.5 font-mono text-[10px] font-semibold text-cyan-400 whitespace-nowrap">
                {template.id}
              </span>
              {template.tags.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="rounded bg-slate-800/70 px-2 py-0.5 text-[10px] text-slate-400 whitespace-nowrap truncate"
                >
                  #{tag}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-amber-400 shrink-0 whitespace-nowrap">
              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
              <span>{template.rating.toFixed(1)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-2.5">
            <Link
              to={template.previewRoute}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600/20 border border-indigo-500/35 px-3 py-2.5 text-xs font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white transition whitespace-nowrap"
            >
              <Eye className="h-3.5 w-3.5 shrink-0" />
              <span>Live Preview</span>
            </Link>
            <Link
              to={template.detailsRoute}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-slate-800 bg-slate-800/70 px-3 py-2.5 text-xs font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition whitespace-nowrap"
            >
              <span>Xem Chi Tiết</span>
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};
