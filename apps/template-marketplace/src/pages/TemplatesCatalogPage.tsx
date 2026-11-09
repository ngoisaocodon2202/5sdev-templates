import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  Filter,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
  SlidersHorizontal,
} from 'lucide-react';
import { CATEGORIES, DESIGN_STYLES } from '@shared/design-tokens';
import { updateDocumentMeta } from '@shared/utilities';
import { TEMPLATE_REGISTRY } from '../data/template-registry';
import { useTemplatesFilter, PriceFilterType, SortOptionType } from '../hooks/useTemplatesFilter';
import { TemplateCard } from '../components/TemplateCard';

export const TemplatesCatalogPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const {
    searchQuery,
    setSearchQuery,
    category,
    setCategory,
    designStyle,
    setDesignStyle,
    priceFilter,
    setPriceFilter,
    techFilter,
    setTechFilter,
    sortBy,
    setSortBy,
    page,
    setPage,
    paginatedTemplates,
    totalItems,
    totalPages,
    resetFilters,
  } = useTemplatesFilter(TEMPLATE_REGISTRY, searchParams.get('category') || 'all', 24);

  // Sync URL query params on mount / URL change
  useEffect(() => {
    const qParam = searchParams.get('q');
    const catParam = searchParams.get('category');
    const styleParam = searchParams.get('style');
    const sortParam = searchParams.get('sort') as SortOptionType | null;

    if (qParam !== null) setSearchQuery(qParam);
    if (catParam !== null) setCategory(catParam);
    if (styleParam !== null) setDesignStyle(styleParam);
    if (sortParam !== null) setSortBy(sortParam);
  }, [searchParams]);

  useEffect(() => {
    updateDocumentMeta(
      `Thư viện ${TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+ Website UI Templates — Bộ lọc & Tìm kiếm`,
      'Tìm kiếm và lọc hơn 1.000+ Website UI Templates theo 30 ngành nghề, 20 phong cách thiết kế, mức giá và công nghệ.',
      '/templates'
    );
  }, []);

  const handleCategoryChange = (newCat: string) => {
    setCategory(newCat);
    const next = new URLSearchParams(searchParams);
    if (newCat === 'all') next.delete('category');
    else next.set('category', newCat);
    setSearchParams(next);
  };

  const handleStyleChange = (newStyle: string) => {
    setDesignStyle(newStyle);
    const next = new URLSearchParams(searchParams);
    if (newStyle === 'all') next.delete('style');
    else next.set('style', newStyle);
    setSearchParams(next);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-8 rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-900 via-slate-900 to-indigo-950/40 p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="h-4 w-4" />
              TEMPLATE EXPLORER & FILTER ENGINE
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-white">
              Kho Giao Diện 5S DEV.TEMPLATES
            </h1>
            <p className="mt-1.5 text-sm text-slate-400">
              Hiển thị <strong>{totalItems.toLocaleString('vi-VN')}</strong> trên tổng số{' '}
              <strong>{TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}</strong> templates chuẩn React + TypeScript + Tailwind CSS.
            </p>
          </div>

          {/* Search Input */}
          <div className="w-full lg:w-96">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, mã (VD: 5SD-ECO-001), tag..."
                className="w-full rounded-xl border border-slate-700 bg-slate-950 pl-11 pr-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Multi-Facet Filter Bar */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 pt-6 border-t border-slate-800/80">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Ngành nghề (30 Ngành)
            </label>
            <select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">Tất cả 30 ngành nghề ({TEMPLATE_REGISTRY.length})</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.slug} value={cat.slug}>
                  {cat.nameVi} ({cat.name})
                </option>
              ))}
            </select>
          </div>

          {/* Design Style Filter */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Phong cách thiết kế (20 Styles)
            </label>
            <select
              value={designStyle}
              onChange={(e) => handleStyleChange(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">Tất cả 20 phong cách</option>
              {DESIGN_STYLES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.name} — {st.nameVi}
                </option>
              ))}
            </select>
          </div>

          {/* Price Tier Filter */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Phân khúc Giá / Bản quyền
            </label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value as PriceFilterType)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">Tất cả mức giá</option>
              <option value="free">Miễn phí (Free Community)</option>
              <option value="paid">Trả phí (Commercial)</option>
              <option value="STANDARD">Gói Standard</option>
              <option value="PREMIUM">Gói Premium</option>
              <option value="ENTERPRISE">Gói Enterprise</option>
            </select>
          </div>

          {/* Tech Stack Filter */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Công nghệ sử dụng
            </label>
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
            >
              <option value="all">Tất cả công nghệ</option>
              <option value="React">React 18</option>
              <option value="TypeScript">TypeScript</option>
              <option value="Tailwind">Tailwind CSS</option>
              <option value="Vite">Vite</option>
              <option value="Lucide">Lucide Icons</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-slate-400 mb-1">
              Sắp xếp theo
            </label>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOptionType)}
                className="flex-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2.5 text-xs font-medium text-white focus:border-indigo-500 focus:outline-none"
              >
                <option value="featured">Nổi bật nhất (Featured)</option>
                <option value="popular">Phổ biến nhất (Popular)</option>
                <option value="newest">Mới phát hành (Newest)</option>
                <option value="code-asc">Mã Template (A → Z)</option>
                <option value="price-asc">Giá: Thấp đến Cao</option>
                <option value="price-desc">Giá: Cao đến Thấp</option>
              </select>
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setSearchParams({});
                }}
                title="Đặt lại bộ lọc"
                className="inline-flex items-center justify-center rounded-xl border border-slate-700 bg-slate-900 px-3 text-slate-300 hover:bg-slate-800 hover:text-white"
              >
                <RotateCcw className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Category Horizontal Quick-Switch Pills */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition ${
            category === 'all'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
              : 'border border-slate-800 bg-slate-900 text-slate-300 hover:text-white'
          }`}
        >
          Tất cả ({TEMPLATE_REGISTRY.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => handleCategoryChange(cat.slug)}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition ${
              category === cat.slug
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'border border-slate-800 bg-slate-900/70 text-slate-300 hover:border-slate-700 hover:text-white'
            }`}
          >
            {cat.nameVi}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {paginatedTemplates.length === 0 ? (
        <div className="rounded-3xl border border-slate-800 bg-slate-900/40 p-16 text-center">
          <Layers className="mx-auto h-12 w-12 text-slate-500 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">
            Không tìm thấy template phù hợp với bộ lọc hiện tại
          </h3>
          <p className="text-sm text-slate-400 mb-6">
            Hãy thử từ khóa khác hoặc đặt lại bộ lọc để khám phá toàn bộ kho 1.050+ giao diện.
          </p>
          <button
            type="button"
            onClick={() => {
              resetFilters();
              setSearchParams({});
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-500"
          >
            <RotateCcw className="h-4 w-4" />
            Xóa bộ lọc
          </button>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedTemplates.map((template) => (
              <TemplateCard key={template.id} template={template} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-800 bg-slate-900/60 px-6 py-4">
              <div className="text-xs text-slate-400">
                Trang <strong className="text-white">{page}</strong> /{' '}
                <strong className="text-white">{totalPages}</strong> (Tổng cộng{' '}
                <strong className="text-cyan-400">{totalItems.toLocaleString('vi-VN')}</strong> templates)
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage(Math.max(1, page - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 disabled:opacity-40 hover:border-indigo-500"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Trước
                </button>

                {Array.from({ length: Math.min(7, totalPages) }, (_, idx) => {
                  let pageNum = idx + 1;
                  if (totalPages > 7 && page > 4) {
                    pageNum = Math.min(totalPages - 6 + idx, page - 3 + idx);
                  }
                  return (
                    <button
                      key={pageNum}
                      type="button"
                      onClick={() => {
                        setPage(pageNum);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className={`h-9 min-w-[36px] rounded-xl px-2.5 text-xs font-bold transition ${
                        page === pageNum
                          ? 'bg-indigo-600 text-white'
                          : 'border border-slate-800 bg-slate-950 text-slate-400 hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  type="button"
                  disabled={page >= totalPages}
                  onClick={() => {
                    setPage(Math.min(totalPages, page + 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-xs font-semibold text-slate-200 disabled:opacity-40 hover:border-indigo-500"
                >
                  Tiếp
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
