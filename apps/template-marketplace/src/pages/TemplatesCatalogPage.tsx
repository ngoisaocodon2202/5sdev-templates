import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Search,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Layers,
  Sparkles,
} from 'lucide-react';
import { CATEGORIES, DESIGN_STYLES } from '@shared/design-tokens';
import { updateDocumentMeta } from '@shared/utilities';
import { TEMPLATE_REGISTRY } from '../data/template-registry';
import { useTemplatesFilter, PriceFilterType, SortOptionType } from '../hooks/useTemplatesFilter';
import { TemplateCard } from '../components/TemplateCard';
import { CustomDropdown, DropdownOption } from '../components/CustomDropdown';

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

  const categoryOptions: DropdownOption[] = [
    { value: 'all', label: 'Tất cả ngành nghề', badge: '1.050' },
    ...CATEGORIES.map((cat) => ({
      value: cat.slug,
      label: cat.nameVi,
      subLabel: cat.name,
      badge: `${cat.targetCount}`,
    })),
  ];

  const styleOptions: DropdownOption[] = [
    { value: 'all', label: 'Tất cả phong cách', badge: '20' },
    ...DESIGN_STYLES.map((st) => ({
      value: st.id,
      label: st.name,
      subLabel: st.nameVi,
    })),
  ];

  const priceOptions: DropdownOption[] = [
    { value: 'all', label: 'Tất cả mức giá' },
    { value: 'free', label: 'Miễn phí (Free)', badge: 'Free' },
    { value: 'paid', label: 'Trả phí (Commercial)' },
    { value: 'STANDARD', label: 'Gói Standard' },
    { value: 'PREMIUM', label: 'Gói Premium' },
    { value: 'ENTERPRISE', label: 'Gói Enterprise' },
  ];

  const techOptions: DropdownOption[] = [
    { value: 'all', label: 'Tất cả công nghệ' },
    { value: 'React', label: 'React 18' },
    { value: 'TypeScript', label: 'TypeScript' },
    { value: 'Tailwind', label: 'Tailwind CSS' },
    { value: 'Vite', label: 'Vite' },
    { value: 'Lucide', label: 'Lucide Icons' },
  ];

  const sortOptions: DropdownOption[] = [
    { value: 'featured', label: 'Nổi bật nhất (Featured)' },
    { value: 'popular', label: 'Phổ biến nhất (Popular)' },
    { value: 'newest', label: 'Mới phát hành (Newest)' },
    { value: 'code-asc', label: 'Mã Template (A → Z)' },
    { value: 'price-asc', label: 'Giá: Thấp đến Cao' },
    { value: 'price-desc', label: 'Giá: Cao đến Thấp' },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page Header & Filter Engine Box (Clean White Theme) */}
      <div className="relative z-30 mb-8 rounded-3xl border border-slate-200/90 bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 mb-2">
              <Sparkles className="h-4 w-4" />
              TEMPLATE EXPLORER & FILTER ENGINE
            </div>
            <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Kho Giao Diện 5S DEV.TEMPLATES
            </h1>
            <p className="mt-1.5 text-sm text-slate-600">
              Hiển thị <strong>{totalItems.toLocaleString('vi-VN')}</strong> trên tổng số{' '}
              <strong>{TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}</strong> templates chuẩn React + TypeScript + Tailwind CSS.
            </p>
          </div>

          {/* Search Input & Reset Button */}
          <div className="flex items-center gap-2.5 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm tên, mã (VD: 5SD-ECO-001), tag..."
                className="w-full h-11 rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-4 text-xs text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition shadow-sm"
              />
            </div>
            <button
              type="button"
              onClick={() => {
                resetFilters();
                setSearchParams({});
              }}
              title="Đặt lại toàn bộ bộ lọc"
              className="h-11 px-3.5 inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-rose-600 hover:border-rose-300 hover:bg-rose-50 transition text-xs font-bold whitespace-nowrap shadow-sm shrink-0"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Đặt lại</span>
            </button>
          </div>
        </div>

        {/* 5 Perfectly Symmetrical, Equal-Height Combobox Columns */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5 pt-6 border-t border-slate-100">
          {/* Col 1: Category Filter */}
          <CustomDropdown
            label="Ngành nghề (30 ngành)"
            value={category}
            options={categoryOptions}
            onChange={handleCategoryChange}
            searchable
          />

          {/* Col 2: Design Style Filter */}
          <CustomDropdown
            label="Phong cách (20 styles)"
            value={designStyle}
            options={styleOptions}
            onChange={handleStyleChange}
            searchable
          />

          {/* Col 3: Price Tier Filter */}
          <CustomDropdown
            label="Phân khúc giá"
            value={priceFilter}
            options={priceOptions}
            onChange={(val) => setPriceFilter(val as PriceFilterType)}
          />

          {/* Col 4: Tech Stack Filter */}
          <CustomDropdown
            label="Công nghệ"
            value={techFilter}
            options={techOptions}
            onChange={setTechFilter}
          />

          {/* Col 5: Sort By */}
          <CustomDropdown
            label="Sắp xếp theo"
            value={sortBy}
            options={sortOptions}
            onChange={(val) => setSortBy(val as SortOptionType)}
          />
        </div>
      </div>

      {/* Category Horizontal Quick-Switch Pills */}
      <div className="mb-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <button
          type="button"
          onClick={() => handleCategoryChange('all')}
          className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-bold transition shadow-sm ${
            category === 'all'
              ? 'bg-indigo-600 text-white shadow-indigo-600/25'
              : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300'
          }`}
        >
          Tất cả ({TEMPLATE_REGISTRY.length})
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.slug}
            type="button"
            onClick={() => handleCategoryChange(cat.slug)}
            className={`shrink-0 rounded-xl px-3.5 py-2 text-xs font-semibold transition shadow-sm ${
              category === cat.slug
                ? 'bg-indigo-600 text-white shadow-indigo-600/25 font-bold'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:text-slate-900'
            }`}
          >
            {cat.nameVi}
          </button>
        ))}
      </div>

      {/* Results Grid */}
      {paginatedTemplates.length === 0 ? (
        <div className="rounded-3xl border border-slate-200 bg-white p-16 text-center shadow-sm">
          <Layers className="mx-auto h-12 w-12 text-slate-400 mb-4" />
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Không tìm thấy template phù hợp với bộ lọc hiện tại
          </h3>
          <p className="text-sm text-slate-600 mb-6">
            Hãy thử từ khóa khác hoặc đặt lại bộ lọc để khám phá toàn bộ kho 1.050+ giao diện.
          </p>
          <button
            type="button"
            onClick={() => {
              resetFilters();
              setSearchParams({});
            }}
            className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-indigo-700 shadow-md transition"
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
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
              <div className="text-xs text-slate-600">
                Trang <strong className="text-slate-900">{page}</strong> /{' '}
                <strong className="text-slate-900">{totalPages}</strong> (Tổng cộng{' '}
                <strong className="text-indigo-600">{totalItems.toLocaleString('vi-VN')}</strong> templates)
              </div>

              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage(Math.max(1, page - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 hover:border-indigo-400 transition"
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
                      className={`h-9 min-w-[36px] rounded-xl px-2.5 text-xs font-bold transition shadow-sm ${
                        page === pageNum
                          ? 'bg-indigo-600 text-white shadow-indigo-600/30'
                          : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-slate-900'
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
                  className="inline-flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 hover:bg-slate-50 hover:border-indigo-400 transition"
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
