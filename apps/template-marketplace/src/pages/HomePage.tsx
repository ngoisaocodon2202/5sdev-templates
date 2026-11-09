import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  ShieldCheck,
  Zap,
  Monitor,
  Tablet,
  Smartphone,
  Code2,
  Palette,
  TrendingUp,
  Award,
  CheckCircle2,
  Eye,
  Flame,
  Clock,
  Crown,
} from 'lucide-react';
import { CATEGORIES, DESIGN_STYLES } from '@shared/design-tokens';
import { DynamicIcon } from '@shared/icons';
import { updateDocumentMeta } from '@shared/utilities';
import { TEMPLATE_REGISTRY } from '../data/template-registry';
import { TemplateCard } from '../components/TemplateCard';
import { TemplateThumbnailArtwork } from '@shared/components/TemplateArtwork';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeCollection, setActiveCollection] = useState(0);

  useEffect(() => {
    updateDocumentMeta(
      '5S DEV.TEMPLATES — Build Faster. Design Better. (1.000+ Website UI Templates)',
      'Khám phá thư viện 1.050+ Website UI Templates đa ngành nghề chuẩn React + TypeScript + Tailwind CSS trên nền tảng 5sdev.vn.',
      '/'
    );
  }, []);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of CATEGORIES) {
      counts[cat.slug] = 0;
    }
    for (const item of TEMPLATE_REGISTRY) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  const featuredTemplates = useMemo(
    () => TEMPLATE_REGISTRY.filter((t) => t.isFeatured).slice(0, 6),
    []
  );

  const trendingTemplates = useMemo(
    () =>
      [...TEMPLATE_REGISTRY]
        .filter((t) => t.isTrending)
        .sort((a, b) => b.downloadsCount - a.downloadsCount)
        .slice(0, 6),
    []
  );

  const newReleaseTemplates = useMemo(
    () =>
      [...TEMPLATE_REGISTRY]
        .filter((t) => t.isNewRelease)
        .slice(0, 6),
    []
  );

  const premiumCollections = useMemo(
    () => [
      {
        id: 'ecommerce-flagships',
        title: 'Flagship E-Commerce & Luxury Retail',
        subtitle: 'Bộ sưu tập Thương mại điện tử & Bán lẻ Cao cấp',
        description:
          'Tối ưu trải nghiệm giỏ hàng, bộ lọc thông minh, trang chi tiết sản phẩm tương tác và thanh toán nhanh cho các thương hiệu thời trang, mỹ phẩm, trang sức và công nghệ.',
        badge: '140+ Templates',
        categories: ['ecommerce', 'fashion', 'beauty', 'furniture'],
        accent: 'from-indigo-600 to-cyan-500',
      },
      {
        id: 'ai-tech-saas',
        title: 'Next-Gen AI, SaaS & Fintech Platforms',
        subtitle: 'Hệ sinh thái AI Startup, Cloud, Bảo mật & Tài chính số',
        description:
          'Thiết kế theo phong cách Futuristic, Glassmorphism và Modern Dashboard với biểu đồ trực quan, bảng giá linh hoạt và bento-grid hiện đại.',
        badge: '140+ Templates',
        categories: ['technology', 'finance', 'corporate', 'landing-page'],
        accent: 'from-purple-600 to-pink-500',
      },
      {
        id: 'hospitality-dining',
        title: 'Hospitality, Fine Dining & Wellness',
        subtitle: 'Nhà hàng, Khách sạn 5 Sao, Du lịch & Spa Trị liệu',
        description:
          'Trải nghiệm đặt bàn, đặt phòng resort, thực đơn tương tác và hành trình nghỉ dưỡng sang trọng.',
        badge: '140+ Templates',
        categories: ['restaurant', 'hotel', 'travel', 'spa'],
        accent: 'from-amber-500 to-rose-500',
      },
      {
        id: 'real-estate-architecture',
        title: 'Real Estate, Architecture & Construction',
        subtitle: 'Bất động sản, Kiến trúc Nội thất & Xây dựng Công trình',
        description:
          'Bố cục Editorial & Luxury tôn vinh không gian kiến trúc, tích hợp bộ tính lãi suất vay và danh mục dự án.',
        badge: '105+ Templates',
        categories: ['real-estate', 'interior-design', 'construction'],
        accent: 'from-emerald-600 to-teal-500',
      },
    ],
    []
  );

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/templates?q=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate('/templates');
    }
  };

  const heroMockupSamples = useMemo(() => {
    if (TEMPLATE_REGISTRY.length >= 3) {
      return [TEMPLATE_REGISTRY[0], TEMPLATE_REGISTRY[1], TEMPLATE_REGISTRY[2]];
    }
    return [];
  }, []);

  return (
    <div className="space-y-24 pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden border-b border-slate-800/80 bg-gradient-to-b from-slate-950 via-slate-900/90 to-slate-950 pt-12 pb-20 lg:pt-20 lg:pb-28">
        {/* Ambient Glows */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-96 w-96 rounded-full bg-indigo-600/20 blur-[120px]" />
        <div className="pointer-events-none absolute top-20 right-1/4 h-96 w-96 rounded-full bg-cyan-500/15 blur-[120px]" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headline + Search + Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-300">
                <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
                <span>5SDEV.VN OFFICIAL UI ECOSYSTEM • {TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+ TEMPLATES</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:leading-[1.08]">
                Build Faster.{' '}
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Design Better.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
                Hệ thống thư viện <strong>{TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+ Website UI Templates</strong> đa ngành nghề chuyên nghiệp thuộc <strong>30 lĩnh vực</strong> và <strong>20 phong cách thiết kế</strong>. Xây dựng 100% bằng React, TypeScript, Vite & Tailwind CSS với khả năng xem trước trực tiếp (Live Preview) tức thì.
              </p>

              {/* Hero Search Form */}
              <form
                onSubmit={handleHeroSearch}
                className="flex flex-col sm:flex-row gap-3 max-w-2xl rounded-2xl border border-slate-700/80 bg-slate-900/90 p-2 shadow-2xl shadow-indigo-950/50 backdrop-blur-xl"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Tìm theo tên, mã (5SD-ECO-001), ngành nghề, phong cách..."
                    className="w-full rounded-xl bg-transparent pl-12 pr-4 py-3 text-sm text-white placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:from-indigo-500 hover:to-cyan-400 transition shrink-0"
                >
                  <span>Explore Templates</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Quick Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-400 font-medium">Xu hướng tìm kiếm:</span>
                {[
                  { label: 'E-commerce', q: 'ecommerce' },
                  { label: 'AI SaaS', q: 'technology' },
                  { label: 'Fine Dining', q: 'restaurant' },
                  { label: 'Luxury Villa', q: 'real-estate' },
                  { label: 'Beauty & Spa', q: 'beauty' },
                  { label: 'Glassmorphism', q: 'glassmorphism' },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={`/templates?q=${encodeURIComponent(tag.q)}`}
                    className="rounded-lg border border-slate-800 bg-slate-900/80 px-2.5 py-1 text-slate-300 hover:border-indigo-500/40 hover:text-cyan-300 transition"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>

              {/* Key Platform Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80">
                <div>
                  <div className="font-display text-2xl font-extrabold text-white">
                    {TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+
                  </div>
                  <div className="text-xs text-slate-400">Production UI Templates</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-cyan-400">30</div>
                  <div className="text-xs text-slate-400">Ngành nghề Chuyên sâu</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-purple-400">20</div>
                  <div className="text-xs text-slate-400">Phong cách UI/UX</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-extrabold text-emerald-400">100%</div>
                  <div className="text-xs text-slate-400">Responsive & Lazy-Loaded</div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Multi-Mockup Showcase */}
            <div className="lg:col-span-5">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                <div className="rounded-2xl border border-slate-700/80 bg-slate-900/90 p-3 shadow-2xl shadow-indigo-950/60">
                  <div className="mb-3 flex items-center justify-between px-2">
                    <div className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full bg-rose-500" />
                      <span className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="h-3 w-3 rounded-full bg-emerald-500" />
                      <span className="ml-2 font-mono text-[11px] text-slate-400">
                        live-preview://5sdev.vn/interactive-engine
                      </span>
                    </div>
                    <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                      REAL DOM RENDER
                    </span>
                  </div>

                  {heroMockupSamples[0] ? (
                    <Link to={heroMockupSamples[0].previewRoute} className="block overflow-hidden rounded-xl border border-slate-800 group relative">
                      <TemplateThumbnailArtwork
                        code={heroMockupSamples[0].id}
                        title={heroMockupSamples[0].name}
                        category={heroMockupSamples[0].categoryName}
                        styleId={heroMockupSamples[0].designStyle}
                        primaryColor={heroMockupSamples[0].primaryColor}
                        secondaryColor={heroMockupSamples[0].secondaryColor}
                        isDark={heroMockupSamples[0].isDark}
                        variant={1}
                        className="w-full h-auto"
                      />
                      <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                        <span className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-bold text-white shadow-lg">
                          <Eye className="h-4 w-4" /> Mở Live Preview ({heroMockupSamples[0].id})
                        </span>
                      </div>
                    </Link>
                  ) : (
                    <img
                      src="/og-cover.svg"
                      alt="5S DEV.TEMPLATES Showcase"
                      className="w-full rounded-xl border border-slate-800"
                    />
                  )}

                  {/* Mini Floating Cards */}
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    {heroMockupSamples.slice(1, 3).map((sample, idx) => (
                      <Link
                        key={sample.id}
                        to={sample.previewRoute}
                        className="group rounded-xl border border-slate-800 bg-slate-950/90 p-2.5 hover:border-indigo-500/50 transition"
                      >
                        <div className="flex items-center justify-between text-[11px] font-mono text-cyan-400 mb-1">
                          <span>{sample.id}</span>
                          <span className="text-slate-400 group-hover:text-white">Preview →</span>
                        </div>
                        <div className="text-xs font-bold text-white truncate">{sample.name}</div>
                        <div className="text-[11px] text-slate-400 truncate">
                          {sample.categoryNameVi} • {sample.designStyleName}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY EXPLORER (30 INDUSTRIES) */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Layers className="h-4 w-4" />
              30 INDUSTRY VERTICALS
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Khám phá 30 Ngành nghề Chuyên biệt
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Mỗi ngành nghề bao gồm tối thiểu 35 mẫu giao diện được nghiên cứu sâu về hành vi người dùng, cấu trúc thông tin và tính năng đặc thù của lĩnh vực đó.
            </p>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900 px-4 py-2.5 text-xs font-bold text-slate-200 hover:border-indigo-500/50 hover:text-white transition self-start md:self-auto"
          >
            <span>Xem toàn bộ {TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')} Templates</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {CATEGORIES.map((cat) => {
            const count = categoryCounts[cat.slug] || cat.targetCount;
            return (
              <Link
                key={cat.slug}
                to={`/templates?category=${cat.slug}`}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800/90 bg-slate-900/50 p-4 hover:-translate-y-0.5 hover:border-indigo-500/50 hover:bg-slate-900 transition"
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-md transition-transform group-hover:scale-110 shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${cat.gradientFrom}, ${cat.gradientTo})`,
                    }}
                  >
                    <DynamicIcon name={cat.iconName} className="h-5 w-5" />
                  </div>
                  <span className="rounded-lg border border-slate-800 bg-slate-950 px-2.5 py-0.5 font-mono text-[11px] font-bold text-cyan-400 whitespace-nowrap shrink-0">
                    {count} mẫu
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-[10px] font-semibold text-slate-500">
                      5SD-{cat.code}
                    </span>
                  </div>
                  <h3 className="font-display text-sm font-bold text-white group-hover:text-indigo-300 transition truncate">
                    {cat.nameVi}
                  </h3>
                  <p className="text-[11px] text-slate-400 mt-0.5 truncate">{cat.name}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 3. FEATURED TEMPLATES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-400 mb-2">
              <Award className="h-4 w-4" />
              EDITOR'S CHOICE • FLAGSHIP DESIGNS
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Featured Templates Nổi Bật
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Những mẫu thiết kế tiêu biểu với kiến trúc bố cục độc đáo, hiệu ứng tương tác mượt mà và tỷ lệ chuyển đổi cao.
            </p>
          </div>
          <Link
            to="/templates?sort=featured"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300"
          >
            <span>Khám phá thêm mẫu nổi bật</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* 4. TRENDING TEMPLATES */}
      <section id="trending" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-400 mb-2">
              <Flame className="h-4 w-4" />
              MOST POPULAR ON 5SDEV.VN
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Trending Templates Đang Thịnh Hành
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Các giao diện được doanh nghiệp và lập trình viên xem trước và lựa chọn triển khai nhiều nhất tuần qua.
            </p>
          </div>
          <Link
            to="/templates?sort=popular"
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-400 hover:text-rose-300"
          >
            <span>Xem bảng xếp hạng phổ biến</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {trendingTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* 5. PREMIUM COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950/30 p-6 sm:p-10 lg:p-12">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-400 mb-2">
              <Crown className="h-4 w-4" />
              CURATED ENTERPRISE BUNDLES
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              Premium Collections Theo Hệ Sinh Thái
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Tuyển tập các bộ giao diện chuyên sâu giúp agency và doanh nghiệp triển khai nhanh hệ thống đa thương hiệu trên 5sdev.vn.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {premiumCollections.map((col, idx) => (
              <div
                key={col.id}
                onClick={() => setActiveCollection(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all ${
                  activeCollection === idx
                    ? 'border-indigo-500 bg-slate-900 shadow-xl shadow-indigo-950/40'
                    : 'border-slate-800 bg-slate-900/50 hover:border-slate-700'
                }`}
              >
                <span
                  className={`inline-block rounded-lg bg-gradient-to-r ${col.accent} px-3 py-1 text-xs font-bold text-white mb-4`}
                >
                  {col.badge}
                </span>
                <h3 className="font-display text-lg font-bold text-white mb-1">{col.title}</h3>
                <p className="text-xs font-medium text-indigo-300 mb-3">{col.subtitle}</p>
                <p className="text-xs text-slate-400 leading-relaxed mb-5">{col.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {col.categories.map((catSlug) => (
                    <Link
                      key={catSlug}
                      to={`/templates?category=${catSlug}`}
                      className="rounded-lg border border-slate-700 bg-slate-950 px-2.5 py-1 text-[11px] font-semibold text-slate-200 hover:border-indigo-400 hover:text-cyan-300"
                    >
                      #{catSlug}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. NEW RELEASES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Clock className="h-4 w-4" />
              FRESH RELEASES • LATEST BATCHES
            </div>
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl">
              New Releases Mới Nhất
            </h2>
            <p className="mt-2 text-sm text-slate-400">
              Các template vừa hoàn thiện kiểm thử tự động và cập nhật vào kho lưu trữ trung tâm.
            </p>
          </div>
          <Link
            to="/templates?sort=newest"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-400 hover:text-emerald-300"
          >
            <span>Xem toàn bộ mẫu mới</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {newReleaseTemplates.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </div>
      </section>

      {/* 7. DESIGN STYLES SHOWCASE & ABOUT SECTION */}
      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-8 sm:p-12">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">
                <Palette className="h-4 w-4" />
                20 DISTINCT DESIGN ARCHETYPES
              </div>
              <h2 className="font-display text-3xl font-extrabold text-white">
                Kiến trúc Frontend Hiện đại & Đa Phong Cách Thiết Kế
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Khác biệt hoàn toàn với các kho giao diện chỉ đổi màu hàng loạt, mỗi template trong <strong>5S DEV.TEMPLATES</strong> được định hình từ 20 trường phái thiết kế (Minimalist, Luxury, Swiss Design, Neo-Brutalism, Glassmorphism, Japanese Minimalism, Dark Luxury...) kết hợp cùng cấu trúc component độc lập.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {[
                  'React 18 + TypeScript Strict',
                  'Code-Splitting & React.lazy()',
                  'Live Preview 3 Thiết bị (D/T/M)',
                  'Isolated Error Boundary',
                  'Zero Broken Links & Watermarks',
                  'Sẵn sàng tích hợp 5sdev.vn',
                ].map((feat) => (
                  <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {DESIGN_STYLES.map((style) => (
                  <Link
                    key={style.id}
                    to={`/templates?style=${style.id}`}
                    className="rounded-xl border border-slate-800 bg-slate-950/80 p-3 hover:border-indigo-500/50 transition group"
                  >
                    <div className="text-xs font-bold text-white group-hover:text-cyan-400 truncate">
                      {style.name}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">{style.nameVi}</div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
