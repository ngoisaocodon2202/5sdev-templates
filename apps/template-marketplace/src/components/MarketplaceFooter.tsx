import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, DESIGN_STYLES } from '@shared/design-tokens';
import { ShieldCheck, Globe, Mail, MapPin } from 'lucide-react';

export const MarketplaceFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-600">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white font-extrabold text-lg border border-slate-200 shadow-sm">
                <img
                  src="/images/logo.png"
                  alt="5S DEV - 5sdev.vn"
                  className="h-full w-full object-contain p-0.5 bg-white/95 rounded-[inherit]"
                />
              </div>
              <div>
                <span className="font-display text-lg font-extrabold text-slate-900">5S DEV</span>
                <span className="ml-1.5 font-mono text-xs font-bold text-indigo-600 bg-indigo-50 border border-indigo-200 px-1.5 py-0.5 rounded">
                  .TEMPLATES
                </span>
              </div>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              Hệ thống thư viện <strong>1.050+ Website UI Templates</strong> đa ngành nghề chất lượng cao, thiết kế và phát triển bởi đội ngũ kỹ sư <strong>5sdev.vn</strong>. Chuẩn hóa trên nền tảng React 18, TypeScript, Vite và Tailwind CSS.
            </p>
            <div className="space-y-2 pt-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-indigo-600" />
                <span>Nền tảng phân phối chính thức: <strong className="text-slate-900">https://5sdev.vn</strong></span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-cyan-600" />
                <span>support@5sdev.vn • templates@5sdev.vn</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-purple-600" />
                <span>Hồ Chí Minh & Hà Nội, Việt Nam</span>
              </div>
            </div>
          </div>

          {/* Col 2: Top Industries */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-4">
              Ngành nghề Nổi bật (30 Ngành)
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {CATEGORIES.slice(0, 14).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/templates?category=${cat.slug}`}
                    className="hover:text-indigo-600 transition block truncate text-slate-600"
                  >
                    {cat.nameVi}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Design Styles */}
          <div className="lg:col-span-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-4">
              Phong cách Thiết kế (20 Styles)
            </h3>
            <ul className="grid grid-cols-2 gap-2 text-xs">
              {DESIGN_STYLES.slice(0, 12).map((style) => (
                <li key={style.id}>
                  <Link
                    to={`/templates?style=${style.id}`}
                    className="hover:text-indigo-600 transition block truncate text-slate-600"
                  >
                    {style.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Quick Links & Architecture */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-900 mb-4">
              Hệ thống & Quản trị
            </h3>
            <ul className="space-y-2.5 text-xs">
              <li>
                <Link to="/" className="hover:text-indigo-600 text-slate-600 transition">
                  Trang chủ Marketplace
                </Link>
              </li>
              <li>
                <Link to="/templates" className="hover:text-indigo-600 text-slate-600 transition">
                  Toàn bộ 1.050+ Templates
                </Link>
              </li>
              <li>
                <Link to="/admin/library" className="hover:text-indigo-600 text-slate-600 transition">
                  Admin Library Manager
                </Link>
              </li>
              <li>
                <a href="/sitemap.xml" target="_blank" rel="noreferrer" className="hover:text-indigo-600 text-slate-600 transition">
                  Sitemap XML
                </a>
              </li>
            </ul>
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-[11px] space-y-1 shadow-sm">
              <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>100% Production Ready</span>
              </div>
              <p className="text-slate-500">
                Lazy-loaded chunks, Error Boundary riêng biệt, chuẩn SEO & Responsive 3 thiết bị.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-200 pt-8 text-xs text-slate-500">
          <p>© 2026 5S DEV (5sdev.vn). All rights reserved. Built with React 18, TypeScript, Vite & Tailwind CSS.</p>
          <div className="flex items-center gap-6">
            <Link to="/templates" className="hover:text-slate-800">Catalog</Link>
            <Link to="/admin/library" className="hover:text-slate-800">Library Status</Link>
            <span className="text-emerald-600 font-mono font-semibold">v1.0.0 • 1,050 Templates</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
