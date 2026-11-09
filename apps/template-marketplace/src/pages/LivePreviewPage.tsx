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
  Sparkles,
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
  const [isFullscreen, setIsFullscreen] = useState(isChromeless);
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

  const viewportWidthClass =
    device === 'mobile'
      ? 'w-[375px] max-w-full my-6 rounded-[32px] border-[8px] border-slate-800 shadow-2xl overflow-hidden'
      : device === 'tablet'
      ? 'w-[768px] max-w-full my-6 rounded-[24px] border-[6px] border-slate-800 shadow-2xl overflow-hidden'
      : 'w-full';

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      {/* Top Interactive Preview Control Bar */}
      {!isFullscreen && (
        <header className="sticky top-0 z-50 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 bg-slate-950/95 px-4 py-2.5 backdrop-blur-xl">
          {/* Left: Back to Marketplace + Template Info */}
          <div className="flex items-center gap-3">
            <Link
              to="/templates"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:border-indigo-500/50 hover:text-white transition"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Marketplace</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="rounded-lg bg-cyan-500/10 border border-cyan-500/30 px-2 py-0.5 font-mono text-xs font-bold text-cyan-400">
                {template.id}
              </span>
              <div className="hidden md:block">
                <h1 className="text-xs font-bold text-white line-clamp-1 max-w-xs">
                  {template.name}
                </h1>
                <p className="text-[10px] text-slate-400">
                  {template.categoryNameVi} • Style: {template.designStyleName}
                </p>
              </div>
            </div>
          </div>

          {/* Center: Responsive Device Switcher */}
          <div className="flex items-center gap-1 rounded-xl border border-slate-800 bg-slate-900 p-1">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                device === 'desktop'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Desktop Preview (100%)"
            >
              <Monitor className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('tablet')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                device === 'tablet'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Tablet Preview (768px)"
            >
              <Tablet className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                device === 'mobile'
                  ? 'bg-indigo-600 text-white shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Mobile Preview (375px)"
            >
              <Smartphone className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>

          {/* Right: Refresh, Fullscreen, Open in New Tab, Details */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setRefreshKey((k) => k + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white"
              title="Làm mới giao diện (Refresh Preview)"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Refresh</span>
            </button>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white"
              title="Toàn màn hình (Fullscreen Preview)"
            >
              <Maximize2 className="h-3.5 w-3.5" />
              <span className="hidden lg:inline">Fullscreen</span>
            </button>

            <a
              href={`/preview/${template.slug}?chromeless=1`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:border-slate-700 hover:text-white"
              title="Mở trong tab mới"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              <span className="hidden xl:inline">Tab mới</span>
            </a>

            <Link
              to={template.detailsRoute}
              className="inline-flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-3.5 py-1.5 text-xs font-bold text-white hover:from-indigo-500 hover:to-cyan-400"
            >
              <Info className="h-3.5 w-3.5" />
              <span>Chi tiết ({formatPriceVND(template.price.priceVnd)})</span>
            </Link>
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
            className="inline-flex items-center gap-1 rounded-full bg-indigo-600 px-3 py-1 text-white hover:bg-indigo-500"
          >
            <Minimize2 className="h-3 w-3" />
            Hiện thanh công cụ
          </button>
        </div>
      )}

      {/* Live Viewport Container */}
      <div
        className={`flex-1 flex justify-center ${
          device !== 'desktop' ? 'bg-slate-900/90 px-4 overflow-x-auto' : ''
        }`}
      >
        <div
          key={`${template.slug}-${refreshKey}`}
          className={`${viewportWidthClass} bg-white text-slate-900 transition-all duration-300`}
        >
          <PreviewErrorBoundary
            templateId={template.id}
            templateName={template.name}
            onReset={() => setRefreshKey((k) => k + 1)}
          >
            {LazyTemplateComponent ? (
              <Suspense
                fallback={
                  <div className="min-h-[75vh] w-full flex flex-col items-center justify-center bg-slate-950 text-slate-200 p-8">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent mb-4" />
                    <div className="font-mono text-xs uppercase tracking-wider text-cyan-400">
                      LOADING LIVE TEMPLATE CHUNK • {template.id}
                    </div>
                    <p className="mt-1 text-sm font-semibold text-white">{template.name}</p>
                  </div>
                }
              >
                <LazyTemplateComponent previewDevice={device} />
              </Suspense>
            ) : (
              <div className="min-h-[70vh] flex items-center justify-center bg-slate-950 p-8 text-center text-white">
                <div className="max-w-md">
                  <AlertTriangle className="mx-auto h-10 w-10 text-amber-400 mb-3" />
                  <h2 className="text-lg font-bold mb-2">Module chưa sẵn sàng ({template.id})</h2>
                  <p className="text-xs text-slate-400">
                    Đường dẫn nguồn: <code>{template.sourcePath}/page.tsx</code>
                  </p>
                </div>
              </div>
            )}
          </PreviewErrorBoundary>
        </div>
      </div>
    </div>
  );
};
