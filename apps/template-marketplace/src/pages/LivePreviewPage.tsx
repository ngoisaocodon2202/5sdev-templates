import React, { Suspense, useState, useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  RefreshCw,
  ExternalLink,
  Info,
  AlertTriangle,
} from 'lucide-react';
import { getTemplateBySlug, getLazyTemplateComponent } from '../data/template-registry';
import { PreviewErrorBoundary } from '@shared/preview-engine/PreviewErrorBoundary';
import { formatPriceVND, updateDocumentMeta } from '@shared/utilities';

type ViewportDevice = 'desktop' | 'tablet' | 'mobile';

export const LivePreviewPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();
  const isChromeless = searchParams.get('chromeless') === '1';

  const [device, setDevice] = useState<ViewportDevice>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const template = getTemplateBySlug(slug);

  useEffect(() => {
    if (template) {
      updateDocumentMeta(
        `Live Preview: ${template.name} (${template.id})`,
        `Xem trước trực tiếp giao diện ${template.name} (${template.id}) trên Desktop, Tablet và Mobile. ${template.description}`,
        `/preview/${template.slug}`
      );
    }
  }, [template]);

  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 p-6 text-slate-100">
        <div className="max-w-md w-full rounded-2xl border border-slate-800 bg-slate-900 p-8 text-center">
          <AlertTriangle className="mx-auto h-12 w-12 text-amber-400 mb-4" />
          <h1 className="text-xl font-bold text-white mb-2">Không tìm thấy Template: {slug}</h1>
          <p className="text-sm text-slate-400 mb-6">
            Mã giao diện bạn yêu cầu không tồn tại trong hệ thống 5S DEV.TEMPLATES.
          </p>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Quay lại Thư viện
          </Link>
        </div>
      </div>
    );
  }

  const LazyTemplateComponent = getLazyTemplateComponent(template);

  // When loaded with ?chromeless=1 (either in a new tab or inside the Tablet/Mobile simulator iframe),
  // render the pure standalone template so CSS @media queries match the exact viewport width!
  if (isChromeless) {
    return (
      <PreviewErrorBoundary
        templateId={template.id}
        templateName={template.name}
        onReset={() => setRefreshKey((k) => k + 1)}
      >
        {LazyTemplateComponent ? (
          <Suspense
            fallback={
              <div className="min-h-screen w-full flex flex-col items-center justify-center bg-slate-950 text-slate-200 p-8">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-3" />
                <div className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                  ĐANG TẢI GIAO DIỆN • {template.id}
                </div>
              </div>
            }
          >
            <LazyTemplateComponent key={refreshKey} previewDevice="desktop" />
          </Suspense>
        ) : null}
      </PreviewErrorBoundary>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-900">
      {/* Top Interactive Preview Control Bar (Clean White Theme) */}
      {!isFullscreen && (
        <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 px-3 py-2.5 sm:px-5 backdrop-blur-xl shadow-sm">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-2 sm:gap-4">
            {/* Left: Back to Marketplace + Template Info */}
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <Link
                to="/templates"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition shrink-0 whitespace-nowrap shadow-sm"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Thư viện</span>
              </Link>

              <span className="rounded-lg bg-indigo-50 border border-indigo-200 px-2.5 py-1 font-mono text-xs font-bold text-indigo-700 shrink-0 whitespace-nowrap">
                {template.id}
              </span>

              <div className="hidden lg:block min-w-0">
                <h1 className="text-xs font-bold text-slate-900 truncate max-w-[260px] xl:max-w-[360px]">
                  {template.name}
                </h1>
                <p className="text-[11px] text-slate-500 truncate">
                  {template.categoryNameVi} • Phong cách: {template.designStyleName}
                </p>
              </div>
            </div>

            {/* Center: Responsive Device Switcher (Desktop / Tablet / Mobile) */}
            <div className="hidden md:flex items-center gap-1 rounded-xl border border-slate-200 bg-slate-50 p-1 shrink-0 shadow-sm">
              <button
                type="button"
                onClick={() => setDevice('desktop')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                  device === 'desktop'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Monitor className="h-3.5 w-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice('tablet')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                  device === 'tablet'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Tablet className="h-3.5 w-3.5" />
                <span>Tablet (768px)</span>
              </button>
              <button
                type="button"
                onClick={() => setDevice('mobile')}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition whitespace-nowrap ${
                  device === 'mobile'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Smartphone className="h-3.5 w-3.5" />
                <span>Mobile (390px)</span>
              </button>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setRefreshKey((k) => k + 1)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900 whitespace-nowrap shadow-sm"
                title="Làm mới giao diện"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Làm mới</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(true)}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900 whitespace-nowrap shadow-sm"
                title="Xem toàn màn hình"
              >
                <Maximize2 className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Toàn màn hình</span>
              </button>

              <a
                href={`/preview/${template.slug}?chromeless=1`}
                target="_blank"
                rel="noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300 hover:text-slate-900 whitespace-nowrap shadow-sm"
                title="Mở trong tab mới"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                <span className="hidden xl:inline">Tab mới</span>
              </a>

              <Link
                to={template.detailsRoute}
                className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-3 py-1.5 text-xs font-bold text-white hover:from-indigo-700 hover:to-cyan-700 whitespace-nowrap shadow-sm"
              >
                <Info className="h-3.5 w-3.5" />
                <span>Chi tiết</span>
                <span className="hidden sm:inline">({formatPriceVND(template.price.priceVnd)})</span>
              </Link>
            </div>
          </div>
        </header>
      )}

      {/* Floating Exit Fullscreen Pill */}
      {isFullscreen && (
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 rounded-full border border-slate-700 bg-slate-950/90 px-4 py-2 text-xs font-bold text-white shadow-2xl backdrop-blur-md">
          <span className="font-mono text-cyan-400">{template.id}</span>
          <button
            type="button"
            onClick={() => setIsFullscreen(false)}
            className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500 whitespace-nowrap"
          >
            <Minimize2 className="h-3 w-3" />
            Hiện thanh công cụ
          </button>
        </div>
      )}

      {/* Viewport Simulator Area */}
      {device === 'desktop' ? (
        <div key={`${template.slug}-${refreshKey}`} className="flex-1 w-full bg-white text-slate-900">
          <PreviewErrorBoundary
            templateId={template.id}
            templateName={template.name}
            onReset={() => setRefreshKey((k) => k + 1)}
          >
            {LazyTemplateComponent ? (
              <Suspense
                fallback={
                  <div className="min-h-[80vh] w-full flex flex-col items-center justify-center bg-slate-950 text-slate-200 p-8">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-4" />
                    <div className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                      LOADING LIVE TEMPLATE • {template.id}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{template.name}</p>
                  </div>
                }
              >
                <LazyTemplateComponent previewDevice="desktop" />
              </Suspense>
            ) : null}
          </PreviewErrorBoundary>
        </div>
      ) : (
        /* Tablet (768px) & Mobile (390px) True Iframe Viewport Simulator so CSS @media queries trigger genuinely */
        <div className="flex-1 flex flex-col items-center justify-start bg-slate-900/95 py-6 px-4 overflow-x-auto">
          <div className="mb-3 flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span>
              KHUNG NHÌN THIẾT BỊ THỰC TẾ:{' '}
              <strong className="text-cyan-400">
                {device === 'mobile' ? 'iPhone / Mobile (390 × 820 px)' : 'iPad / Tablet (768 × 920 px)'}
              </strong>
            </span>
          </div>

          <div
            className={`relative bg-slate-950 shadow-2xl transition-all duration-300 overflow-hidden ${
              device === 'mobile'
                ? 'w-[390px] h-[820px] rounded-[42px] border-[12px] border-slate-800'
                : 'w-[768px] h-[920px] rounded-[28px] border-[10px] border-slate-800'
            }`}
          >
            <iframe
              key={`${template.slug}-${device}-${refreshKey}`}
              src={`/preview/${template.slug}?chromeless=1&r=${refreshKey}`}
              title={`${template.name} (${device} preview)`}
              className="w-full h-full border-0 bg-white"
            />
          </div>
        </div>
      )}
    </div>
  );
};
