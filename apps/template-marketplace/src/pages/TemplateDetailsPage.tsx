import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Eye,
  ExternalLink,
  CheckCircle2,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Layers,
  Sparkles,
  ShieldCheck,
  Terminal,
  FolderGit2,
  Star,
  PhoneCall,
  Copy,
  Check,
} from 'lucide-react';
import { getTemplateBySlug, TEMPLATE_REGISTRY } from '../data/template-registry';
import { TemplateThumbnailArtwork } from '@shared/components/TemplateArtwork';
import { formatPriceVND, formatPriceUSD, updateDocumentMeta } from '@shared/utilities';
import { TemplateCard } from '../components/TemplateCard';

export const TemplateDetailsPage: React.FC = () => {
  const { slug = '' } = useParams<{ slug: string }>();
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquirySuccess, setInquirySuccess] = useState(false);

  const template = getTemplateBySlug(slug);

  useEffect(() => {
    if (template) {
      updateDocumentMeta(
        `${template.name} (${template.id}) — Chi tiết UI Template`,
        `${template.description} Mã sản phẩm: ${template.id}. Ngành nghề: ${template.categoryNameVi}. Phong cách: ${template.designStyleName}.`,
        `/templates/${template.slug}`
      );
    }
  }, [template]);

  const relatedTemplates = useMemo(() => {
    if (!template) return [];
    return TEMPLATE_REGISTRY.filter(
      (item) => item.category === template.category && item.id !== template.id
    ).slice(0, 4);
  }, [template]);

  if (!template) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white mb-3">Không tìm thấy Template: {slug}</h1>
        <p className="text-sm text-slate-400 mb-6">
          Vui lòng kiểm tra lại đường dẫn hoặc quay lại trang danh mục để tìm kiếm.
        </p>
        <Link
          to="/templates"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại Thư viện
        </Link>
      </div>
    );
  }

  const variantNum = parseInt(template.id.slice(-3), 10) || 1;
  const installSnippet = `# 1. Truy cập thư mục gốc của hệ thống
cd 5S-DEV-TEMPLATES

# 2. Mở source code độc lập của template ${template.id}
code ${template.sourcePath}/page.tsx

# 3. Chạy môi trường phát triển & xem trước trực tiếp
npm run dev
# Mở trình duyệt tại: http://localhost:5173${template.previewRoute}`;

  const handleCopySnippet = () => {
    navigator.clipboard?.writeText(installSnippet);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 space-y-16">
      {/* Breadcrumb & Back */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <Link to="/" className="hover:text-white">Home</Link>
          <span>/</span>
          <Link to="/templates" className="hover:text-white">Templates</Link>
          <span>/</span>
          <Link to={`/templates?category=${template.category}`} className="hover:text-cyan-400">
            {template.categoryNameVi}
          </Link>
          <span>/</span>
          <span className="font-mono text-slate-200">{template.id}</span>
        </div>

        <Link
          to="/templates"
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900 px-3.5 py-2 text-xs font-semibold text-slate-200 hover:border-indigo-500/50"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Quay lại Danh mục
        </Link>
      </div>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        {/* Left 7 Cols: Visual Preview & Technical Breakdown */}
        <div className="lg:col-span-7 space-y-8">
          <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <span className="h-3 w-3 rounded-full bg-amber-500" />
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="ml-2 font-mono text-xs text-slate-400">
                  {template.sourcePath}/page.tsx
                </span>
              </div>
              <Link
                to={template.previewRoute}
                className="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600/20 border border-indigo-500/40 px-3 py-1 text-xs font-bold text-indigo-300 hover:bg-indigo-600 hover:text-white transition"
              >
                <Eye className="h-3.5 w-3.5" />
                Mở Toàn Màn Hình
              </Link>
            </div>

            <div className="aspect-[16/10] w-full bg-slate-950 relative group">
              <TemplateThumbnailArtwork
                code={template.id}
                title={template.name}
                category={template.categoryName}
                styleId={template.designStyle}
                primaryColor={template.primaryColor}
                secondaryColor={template.secondaryColor}
                isDark={template.isDark}
                variant={variantNum}
                className="h-full w-full"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-slate-950/65 opacity-0 group-hover:opacity-100 transition duration-200">
                <Link
                  to={template.previewRoute}
                  className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3.5 text-sm font-bold text-white shadow-2xl"
                >
                  <Eye className="h-5 w-5" />
                  Khởi chạy Live Preview ({template.id})
                </Link>
              </div>
            </div>
          </div>

          {/* Sections Included */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <h2 className="font-display text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Layers className="h-5 w-5 text-indigo-400" />
              Cấu trúc Bố cục & Các Section Hoàn chỉnh
            </h2>
            <p className="text-xs text-slate-400 mb-5">
              Giao diện <strong className="text-slate-200">{template.name}</strong> được thiết kế theo kiến trúc{' '}
              <code className="text-cyan-400">{template.architecture}</code> kết hợp phong cách{' '}
              <strong className="text-slate-200">{template.designStyleName}</strong>, bao gồm đầy đủ các phân vùng nội dung thực tế:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {template.sections.map((sec, i) => (
                <div
                  key={sec}
                  className="flex items-center gap-3 rounded-xl border border-slate-800 bg-slate-950/80 p-3.5"
                >
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 font-mono text-xs font-bold text-indigo-400">
                    0{i + 1}
                  </span>
                  <span className="text-xs font-semibold text-slate-200">{sec}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Installation & Customization Guide */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display text-xl font-bold text-white flex items-center gap-2">
                <Terminal className="h-5 w-5 text-cyan-400" />
                Hướng dẫn Cài đặt & Đóng gói Source Code
              </h2>
              <button
                type="button"
                onClick={handleCopySnippet}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800 px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-slate-700"
              >
                {copiedCmd ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCmd ? 'Đã sao chép' : 'Copy lệnh'}</span>
              </button>
            </div>
            <pre className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs text-cyan-300 leading-relaxed">
              {installSnippet}
            </pre>
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] font-mono text-slate-400">
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800/80">
                📄 {template.sourcePath}/page.tsx
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800/80">
                🧩 {template.sourcePath}/components/
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800/80">
                🎨 {template.sourcePath}/styles/theme.css
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800/80">
                🖼️ {template.sourcePath}/assets/
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800/80">
                📋 {template.sourcePath}/metadata.json
              </div>
              <div className="rounded-lg bg-slate-950 p-2.5 border border-slate-800/80">
                📘 {template.sourcePath}/README.md
              </div>
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Metadata, Pricing, Features & CTA */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 shadow-xl">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="rounded-lg bg-cyan-500/15 border border-cyan-500/30 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
                {template.id}
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-1 font-mono text-xs font-bold text-emerald-400">
                <CheckCircle2 className="h-3.5 w-3.5" />
                {template.status} • v{template.version}
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-white">
              {template.name}
            </h1>
            <p className="mt-1 text-sm font-medium text-indigo-300">
              {template.nameVi} • Phân khúc: {template.subNiche}
            </p>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {template.description}
            </p>

            {/* Suggested Price Box for 5sdev.vn */}
            <div className="my-6 rounded-2xl border border-indigo-500/30 bg-indigo-950/20 p-5">
              <div className="flex items-baseline justify-between">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-indigo-300 block">
                    Giá đề xuất phân phối trên 5sdev.vn ({template.price.tier})
                  </span>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-extrabold text-white">
                      {formatPriceVND(template.price.priceVnd)}
                    </span>
                    {!template.price.isFree && (
                      <span className="text-xs text-slate-500 line-through">
                        {formatPriceVND(template.price.originalPriceVnd)}
                      </span>
                    )}
                  </div>
                </div>
                <span className="rounded-lg bg-slate-900 px-2.5 py-1 font-mono text-xs text-slate-300">
                  {formatPriceUSD(template.price.priceUsd)}
                </span>
              </div>
            </div>

            {/* Primary CTAs */}
            <div className="space-y-3">
              <Link
                to={template.previewRoute}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3.5 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-cyan-400 transition"
              >
                <Eye className="h-4 w-4" />
                Xem Trước Trực Tiếp (Live Preview)
              </Link>

              <button
                type="button"
                onClick={() => {
                  setInquirySuccess(false);
                  setInquiryOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-800/90 py-3.5 px-6 text-sm font-bold text-white hover:bg-slate-800 transition"
              >
                <PhoneCall className="h-4 w-4 text-cyan-400" />
                Liên hệ Mua hàng / Tích hợp 5sdev.vn
              </button>
            </div>

            {/* Key Specifications Table */}
            <div className="mt-6 pt-6 border-t border-slate-800 space-y-3 text-xs">
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Mã sản phẩm:</span>
                <span className="font-mono font-bold text-white">{template.id}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Ngành nghề:</span>
                <span className="font-semibold text-slate-200">{template.categoryNameVi} ({template.categoryName})</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Phong cách UI/UX:</span>
                <span className="font-semibold text-cyan-400">{template.designStyleName}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Tương thích thiết bị:</span>
                <span className="inline-flex items-center gap-1.5 font-semibold text-emerald-400">
                  <Monitor className="h-3.5 w-3.5" />
                  <Tablet className="h-3.5 w-3.5" />
                  <Smartphone className="h-3.5 w-3.5" />
                  Desktop / Tablet / Mobile
                </span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Đường dẫn Source:</span>
                <code className="text-indigo-300">{template.sourcePath}</code>
              </div>
            </div>

            {/* Features List */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
                Tính năng Tích hợp Sẵn
              </h3>
              <ul className="space-y-2">
                {template.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack Badges */}
            <div className="mt-6 pt-6 border-t border-slate-800">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-3">
                Công nghệ Sử dụng
              </h3>
              <div className="flex flex-wrap gap-2">
                {template.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-lg border border-slate-700 bg-slate-950 px-3 py-1 text-xs font-semibold text-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Templates */}
      {relatedTemplates.length > 0 && (
        <section className="pt-8 border-t border-slate-800">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-display text-2xl font-bold text-white">
              Các Template Cùng Ngành ({template.categoryNameVi})
            </h2>
            <Link
              to={`/templates?category=${template.category}`}
              className="text-xs font-bold text-indigo-400 hover:text-indigo-300"
            >
              Xem tất cả ngành này →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedTemplates.map((rel) => (
              <TemplateCard key={rel.id} template={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Purchase / Commercial Inquiry Modal */}
      {inquiryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-1">
              Đăng ký Mua / Triển khai {template.id}
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              {template.name} — Giá niêm yết: {formatPriceVND(template.price.priceVnd)}
            </p>
            {inquirySuccess ? (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5 text-center">
                <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-400 mb-2" />
                <p className="text-sm font-bold text-white">Đã gửi yêu cầu thành công!</p>
                <p className="text-xs text-slate-300 mt-1 mb-4">
                  Bộ phận kinh doanh 5sdev.vn sẽ bàn giao gói source code và hướng dẫn triển khai cho bạn.
                </p>
                <button
                  type="button"
                  onClick={() => setInquiryOpen(false)}
                  className="rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white"
                >
                  Hoàn tất
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setInquirySuccess(true);
                }}
                className="space-y-3.5"
              >
                <input
                  type="text"
                  required
                  placeholder="Họ và tên của bạn *"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white"
                />
                <input
                  type="tel"
                  required
                  placeholder="Số điện thoại / Zalo *"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white"
                />
                <input
                  type="email"
                  required
                  placeholder="Email nhận bộ cài đặt *"
                  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-xs text-white"
                />
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setInquiryOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2 text-xs text-slate-300"
                  >
                    Đóng
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-600 px-5 py-2 text-xs font-bold text-white hover:bg-indigo-500"
                  >
                    Xác nhận Đặt mua
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
