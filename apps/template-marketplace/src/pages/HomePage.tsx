import React, { useMemo, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  Palette,
  Award,
  CheckCircle2,
  Eye,
  Flame,
  Clock,
  Crown,
  Monitor,
  Tablet,
  Smartphone,
  Star,
  Zap,
  ShieldCheck,
  Code2,
} from 'lucide-react';
import { CATEGORIES, DESIGN_STYLES } from '@shared/design-tokens';
import { updateDocumentMeta } from '@shared/utilities';
import { TEMPLATE_REGISTRY } from '../data/template-registry';
import { TemplateCard } from '../components/TemplateCard';
import { TemplateThumbnailArtwork } from '@shared/components/TemplateArtwork';
import { INDUSTRY_PHOTOS } from '../../../../scripts/generate-templates/industry-media.mjs';

// Realistic 3D Visual Emblems, Subtitle Tags & Demo Photography for all 30 Industries
const INDUSTRY_REALISTIC_MEDIA: Record<
  string,
  { emoji: string; subTag: string; photo: string; highlight: string }
> = {
  ecommerce: {
    emoji: '🛍️',
    subTag: 'Bán lẻ & Mua sắm',
    photo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    highlight: 'Giỏ hàng thông minh, bộ lọc thuộc tính & checkout nhanh',
  },
  restaurant: {
    emoji: '🍽️',
    subTag: 'Fine Dining & Ẩm thực',
    photo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
    highlight: 'Thực đơn trực quan, đặt bàn online & gallery không gian',
  },
  beauty: {
    emoji: '💄',
    subTag: 'Spa & Thẩm mỹ viện',
    photo: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
    highlight: 'Đặt lịch tư vấn, bảng giá liệu trình & combo chăm sóc',
  },
  fashion: {
    emoji: '👗',
    subTag: 'Thời trang & Lookbook',
    photo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=800&q=80',
    highlight: 'Bộ sưu tập xu hướng, bảng chọn size & ảnh chụp studio',
  },
  education: {
    emoji: '🎓',
    subTag: 'Khóa học & Học viện',
    photo: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    highlight: 'Lộ trình đào tạo, đăng ký học thử & hồ sơ giảng viên',
  },
  healthcare: {
    emoji: '🏥',
    subTag: 'Phòng khám & Y tế',
    photo: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=800&q=80',
    highlight: 'Hồ sơ bác sĩ, đặt lịch khám theo giờ & cẩm nang sức khỏe',
  },
  'real-estate': {
    emoji: '🏙️',
    subTag: 'Biệt thự & Bất động sản',
    photo: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    highlight: 'Mặt bằng căn hộ, tour thực tế ảo & form tư vấn VIP',
  },
  travel: {
    emoji: '✈️',
    subTag: 'Tour & Khám phá',
    photo: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80',
    highlight: 'Lịch trình trọn gói, tính giá tour theo đoàn & cẩm nang',
  },
  hotel: {
    emoji: '🏨',
    subTag: 'Resort & Khách sạn',
    photo: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    highlight: 'Check phòng theo ngày, dịch vụ đi kèm & tiện ích 5 sao',
  },
  portfolio: {
    emoji: '🎨',
    subTag: 'Creative & Agency',
    photo: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    highlight: 'Hồ sơ năng lực, case study tương tác & liên hệ báo giá',
  },
  corporate: {
    emoji: '🏢',
    subTag: 'Tập đoàn & Doanh nghiệp',
    photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    highlight: 'Giới thiệu năng lực, quan hệ cổ đông & mạng lưới chi nhánh',
  },
  technology: {
    emoji: '⚡',
    subTag: 'AI & SaaS Platform',
    photo: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
    highlight: 'Biểu đồ trực quan, bảng giá theo tier & demo tương tác',
  },
  finance: {
    emoji: '💳',
    subTag: 'Fintech & Đầu tư',
    photo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    highlight: 'Máy tính lãi suất, giải pháp tài chính & bảo mật cao',
  },
  automotive: {
    emoji: '🏎️',
    subTag: 'Showroom & Xe điện',
    photo: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    highlight: 'Bảng thông số xe, đăng ký lái thử & dự toán trả góp',
  },
  construction: {
    emoji: '🏗️',
    subTag: 'Xây dựng & Hạ tầng',
    photo: 'https://images.unsplash.com/photo-1541888946425-d09bb18086f6?auto=format&fit=crop&w=800&q=80',
    highlight: 'Hồ sơ năng lực công trình, tiến độ dự án & bảo hành',
  },
  furniture: {
    emoji: '🛋️',
    subTag: 'Nội thất & Decor',
    photo: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    highlight: 'Showroom thực tế, vật liệu cao cấp & tư vấn thiết kế',
  },
  'interior-design': {
    emoji: '📐',
    subTag: 'Kiến trúc & Nhà đẹp',
    photo: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
    highlight: 'Bản vẽ 3D phối cảnh, phong cách sống & dự toán trọn gói',
  },
  photography: {
    emoji: '📸',
    subTag: 'Studio & Nhiếp ảnh',
    photo: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    highlight: 'Gallery ảnh phân giải cao, gói chụp ảnh & profile nhiếp ảnh gia',
  },
  wedding: {
    emoji: '💍',
    subTag: 'Tiệc cưới & Sự kiện',
    photo: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=800&q=80',
    highlight: 'Thiệp cưới online, gói trang trí & lưu giữ kỷ niệm đẹp',
  },
  event: {
    emoji: '🎉',
    subTag: 'Gala & Hội thảo',
    photo: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
    highlight: 'Bán vé trực tuyến, lịch trình diễn giả & địa điểm tổ chức',
  },
  fitness: {
    emoji: '🏋️',
    subTag: 'Gym & Thể hình',
    photo: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80',
    highlight: 'Gói tập theo tháng, lịch tập huấn luyện viên & chế độ dinh dưỡng',
  },
  spa: {
    emoji: '🌿',
    subTag: 'Thư giãn & Trị liệu',
    photo: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80',
    highlight: 'Liệu trình thảo dược, massage thư giãn & đặt lịch trước',
  },
  'pet-care': {
    emoji: '🐾',
    subTag: 'Thú cưng & Bệnh viện',
    photo: 'https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=800&q=80',
    highlight: 'Spa tắm thú cưng, khách sạn pet & sản phẩm dinh dưỡng',
  },
  agriculture: {
    emoji: '🌾',
    subTag: 'Nông nghiệp & Organic',
    photo: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
    highlight: 'Nông sản sạch, chứng nhận VietGAP & phân phối sỉ lẻ',
  },
  logistics: {
    emoji: '📦',
    subTag: 'Vận chuyển & Kho bãi',
    photo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
    highlight: 'Tra cứu mã vận đơn, tính phí cước nhanh & mạng lưới xe',
  },
  legal: {
    emoji: '⚖️',
    subTag: 'Luật sư & Pháp lý',
    photo: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
    highlight: 'Tư vấn hợp đồng, tranh chấp kinh doanh & bảo mật NDA',
  },
  news: {
    emoji: '📰',
    subTag: 'Tin tức & Tạp chí',
    photo: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
    highlight: 'Bản tin nóng 24/7, chuyên mục đa tầng & phân trang mượt',
  },
  blog: {
    emoji: '✍️',
    subTag: 'Cá nhân & Xu hướng',
    photo: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=800&q=80',
    highlight: 'Bài viết chuẩn SEO, bình luận người đọc & đăng ký nhận tin',
  },
  nonprofit: {
    emoji: '🤝',
    subTag: 'Thiện nguyện & Quỹ',
    photo: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
    highlight: 'Kêu gọi quyên góp, minh bạch tài chính & dự án cộng đồng',
  },
  'landing-page': {
    emoji: '🚀',
    subTag: 'Chuyển đổi cao',
    photo: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    highlight: 'Hero cuốn hút, form thu thập lead & nút kêu gọi hành động mạnh',
  },
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [heroSearch, setHeroSearch] = useState('');
  const [activeCollection, setActiveCollection] = useState(0);
  const [heroTab, setHeroTab] = useState<'eco' | 'res' | 'tec' | 'rea'>('eco');

  useEffect(() => {
    updateDocumentMeta(
      '5S DEV.TEMPLATES — Build Faster. Design Better. (1.000+ Website UI Templates)',
      'Khám phá thư viện 1.050+ Website UI Templates đa ngành nghề chuẩn React + TypeScript + Tailwind CSS trên nền tảng 5sdev.vn.',
      '/'
    );
  }, []);

  const heroShowcaseTemplates = useMemo(() => {
    const eco = TEMPLATE_REGISTRY.find((t) => t.category === 'ecommerce') || TEMPLATE_REGISTRY[0];
    const res = TEMPLATE_REGISTRY.find((t) => t.category === 'restaurant') || TEMPLATE_REGISTRY[1];
    const tec = TEMPLATE_REGISTRY.find((t) => t.category === 'technology') || TEMPLATE_REGISTRY[2];
    const rea = TEMPLATE_REGISTRY.find((t) => t.category === 'real-estate') || TEMPLATE_REGISTRY[3];
    return { eco, res, tec, rea };
  }, []);

  const activeHeroTemplate = heroShowcaseTemplates[heroTab];

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
        title: 'Flagship E-Commerce & Retail',
        subtitle: 'Thương mại điện tử & Bán lẻ Cao cấp',
        description:
          'Tối ưu trải nghiệm giỏ hàng, bộ lọc thông minh, trang chi tiết sản phẩm tương tác và thanh toán nhanh.',
        badge: '140+ Templates',
        categories: ['ecommerce', 'fashion', 'beauty', 'furniture'],
        accent: 'from-indigo-600 to-cyan-600',
      },
      {
        id: 'ai-tech-saas',
        title: 'Next-Gen AI, SaaS & Fintech',
        subtitle: 'Hệ sinh thái AI Startup, Cloud & Tài chính số',
        description:
          'Thiết kế theo phong cách Futuristic, Glassmorphism và Dashboard trực quan với biểu đồ động.',
        badge: '140+ Templates',
        categories: ['technology', 'finance', 'corporate', 'landing-page'],
        accent: 'from-purple-600 to-pink-600',
      },
      {
        id: 'hospitality-dining',
        title: 'Hospitality & Fine Dining',
        subtitle: 'Nghỉ dưỡng 5 Sao, Ẩm thực & Spa Trị liệu',
        description:
          'Hình ảnh nghệ thuật khổ lớn, tính năng đặt phòng trực tuyến và thực đơn món ăn trực quan.',
        badge: '140+ Templates',
        categories: ['hotel', 'restaurant', 'travel', 'spa'],
        accent: 'from-amber-600 to-orange-600',
      },
      {
        id: 'real-estate-architecture',
        title: 'Luxury Villa & Architecture',
        subtitle: 'Bất động sản Triệu đô & Kiến trúc Sang trọng',
        description:
          'Mặt bằng 3D, tour tham quan thực tế ảo, lọc phân khu thông minh và form đăng ký khách VIP.',
        badge: '105+ Templates',
        categories: ['real-estate', 'interior-design', 'construction'],
        accent: 'from-emerald-600 to-teal-600',
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

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* 1. DYNAMIC HERO SECTION WITH INTERACTIVE MULTI-DEVICE SHOWCASE */}
      <section className="relative overflow-hidden border-b border-slate-200/90 bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 pt-10 pb-16 lg:pt-16 lg:pb-24">
        {/* Animated Ambient Glow Orbs */}
        <div className="pointer-events-none absolute -top-40 left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/10 blur-[130px] animate-pulse-slow" />
        <div className="pointer-events-none absolute top-28 right-1/4 h-[380px] w-[380px] rounded-full bg-cyan-400/10 blur-[130px] animate-pulse-slow" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Column: Headline + Search + Metrics */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-white px-4 py-1.5 text-xs font-semibold text-indigo-700 shadow-sm transition hover:scale-105">
                <Sparkles className="h-3.5 w-3.5 text-indigo-600 animate-spin" style={{ animationDuration: '6s' }} />
                <span>5SDEV.VN OFFICIAL UI ECOSYSTEM • {TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+ TEMPLATES</span>
              </div>

              <h1 className="font-display text-4xl font-extrabold tracking-tight text-slate-900 sm:text-6xl lg:leading-[1.08]">
                Build Faster.{' '}
                <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent">
                  Design Better.
                </span>
              </h1>

              <p className="max-w-2xl text-base sm:text-lg text-slate-600 leading-relaxed">
                Hệ thống thư viện <strong>{TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+ Website UI Templates</strong> đa ngành nghề chuyên nghiệp thuộc <strong>30 lĩnh vực</strong> và <strong>20 phong cách thiết kế</strong>. Xây dựng 100% bằng React, TypeScript, Vite & Tailwind CSS với khả năng xem trước trực tiếp (Live Preview) tức thì.
              </p>

              {/* Hero Search Form */}
              <form
                onSubmit={handleHeroSearch}
                className="flex flex-col sm:flex-row gap-3 max-w-2xl rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-200/50 backdrop-blur-xl transition focus-within:ring-2 focus-within:ring-indigo-500/20"
              >
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    value={heroSearch}
                    onChange={(e) => setHeroSearch(e.target.value)}
                    placeholder="Tìm theo tên, mã (5SD-ECO-001), ngành nghề, phong cách..."
                    className="w-full rounded-xl bg-transparent pl-12 pr-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-indigo-600/25 hover:from-indigo-700 hover:to-cyan-700 transition shrink-0"
                >
                  <span>Explore Templates</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>

              {/* Quick Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="text-slate-500 font-medium">Xu hướng tìm kiếm:</span>
                {[
                  { label: '🛍️ E-commerce', q: 'ecommerce' },
                  { label: '⚡ AI SaaS', q: 'technology' },
                  { label: '🍽️ Fine Dining', q: 'restaurant' },
                  { label: '🏙️ Luxury Villa', q: 'real-estate' },
                  { label: '💄 Beauty & Spa', q: 'beauty' },
                  { label: '✨ Glassmorphism', q: 'glassmorphism' },
                ].map((tag) => (
                  <Link
                    key={tag.label}
                    to={`/templates?q=${encodeURIComponent(tag.q)}`}
                    className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition shadow-sm hover:-translate-y-0.5"
                  >
                    {tag.label}
                  </Link>
                ))}
              </div>

              {/* Key Platform Stats with Animated Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200">
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200/80 shadow-sm">
                  <div className="font-display text-2xl font-extrabold text-slate-900">
                    {TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Production Templates</div>
                </div>
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200/80 shadow-sm">
                  <div className="font-display text-2xl font-extrabold text-indigo-600">30 Ngành</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">35 mẫu độc bản / ngành</div>
                </div>
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200/80 shadow-sm">
                  <div className="font-display text-2xl font-extrabold text-purple-600">20 Styles</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Trường phái UI/UX</div>
                </div>
                <div className="p-3 rounded-xl bg-white/60 border border-slate-200/80 shadow-sm">
                  <div className="font-display text-2xl font-extrabold text-emerald-600">100%</div>
                  <div className="text-xs text-slate-500 font-medium mt-0.5">Responsive & Lazy-load</div>
                </div>
              </div>
            </div>

            {/* Right Column: Animated Live Interactive Mockup Showcase */}
            <div className="lg:col-span-5 relative">
              {/* Floating Decorative Accent Badges */}
              <div className="hidden sm:flex absolute -top-5 -left-6 z-20 items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md animate-float">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-500 text-white shadow">
                  <Star className="h-5 w-5 fill-amber-300 text-amber-300" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Chuẩn UI/UX 5 Sao</div>
                  <div className="text-[10px] text-slate-500">Đầy đủ Demo & Motion</div>
                </div>
              </div>

              <div className="hidden sm:flex absolute -bottom-5 -right-4 z-20 items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/95 p-3 shadow-xl backdrop-blur-md animate-float-delayed">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 text-white shadow">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Bản quyền 5sdev.vn</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">100% Sẵn sàng chạy</div>
                </div>
              </div>

              {/* Main Showcase Browser Card */}
              <div className="rounded-3xl border border-slate-200/90 bg-white p-3.5 sm:p-4 shadow-2xl transition hover:shadow-indigo-500/10">
                {/* Browser Top Navigation */}
                <div className="mb-3 flex items-center justify-between px-2">
                  <div className="flex items-center gap-1.5">
                    <span className="h-3 w-3 rounded-full bg-rose-500" />
                    <span className="h-3 w-3 rounded-full bg-amber-500" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500" />
                    <span className="ml-2 font-mono text-[11px] text-slate-500 truncate max-w-[170px] sm:max-w-none">
                      https://5sdev.vn/preview/{activeHeroTemplate.slug}
                    </span>
                  </div>
                  <span className="rounded-lg bg-emerald-50 border border-emerald-200 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-700 whitespace-nowrap">
                    LIVE REACT 18
                  </span>
                </div>

                {/* Industry Switcher Mini Tabs */}
                <div className="mb-3 grid grid-cols-4 gap-1.5 rounded-xl border border-slate-200 bg-slate-50 p-1 text-[11px] font-bold">
                  {[
                    { id: 'eco', label: '🛍️ Shop', cat: 'ecommerce' },
                    { id: 'res', label: '🍽️ Dining', cat: 'restaurant' },
                    { id: 'tec', label: '⚡ AI SaaS', cat: 'technology' },
                    { id: 'rea', label: '🏙️ Villa', cat: 'real-estate' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setHeroTab(t.id as any)}
                      className={`py-1.5 rounded-lg transition whitespace-nowrap text-center ${
                        heroTab === t.id
                          ? 'bg-white text-indigo-700 shadow-sm font-extrabold'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Live Preview Artwork */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-2xl bg-slate-100 group border border-slate-200">
                  <TemplateThumbnailArtwork
                    code={activeHeroTemplate.id}
                    title={activeHeroTemplate.name}
                    category={activeHeroTemplate.category}
                    styleId={activeHeroTemplate.designStyle}
                    primaryColor={activeHeroTemplate.primaryColor}
                    secondaryColor={activeHeroTemplate.secondaryColor}
                    heroImage={activeHeroTemplate.heroImage}
                    isDark={activeHeroTemplate.isDark}
                    variant={1}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-slate-950/65 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <Link
                      to={activeHeroTemplate.previewRoute}
                      className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-600 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-2xl hover:scale-105 transition"
                    >
                      <Eye className="h-4 w-4" />
                      <span>Xem Demo Thực Tế ({activeHeroTemplate.id})</span>
                    </Link>
                  </div>
                </div>

                {/* Hero Showcase Footer Info */}
                <div className="mt-3 flex items-center justify-between gap-2 p-2">
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 truncate">
                      {activeHeroTemplate.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      {activeHeroTemplate.categoryNameVi} • Phong cách {activeHeroTemplate.designStyleName}
                    </div>
                  </div>
                  <Link
                    to={activeHeroTemplate.previewRoute}
                    className="inline-flex items-center gap-1 text-xs font-bold text-indigo-600 hover:text-indigo-800 whitespace-nowrap shrink-0"
                  >
                    <span>Mở Live Preview</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. INFINITE MOVING MARQUEE BANNER (Dynamic Live Ticker) */}
      <section className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 py-3 text-white shadow-md">
        <div className="flex w-max animate-marquee space-x-8 marquee-track font-semibold text-xs uppercase tracking-wider select-none">
          {[
            '⚡ 1.050+ Website UI Templates Độc Bản',
            '🛍️ 30 Ngành Nghề Chuyên Sâu',
            '🎨 20 Phong Cách UI/UX Chuẩn Quốc Tế',
            '📱 100% Responsive Desktop, Tablet, Mobile',
            '🚀 React 18 • TypeScript • Tailwind CSS • Vite',
            '💎 Bản Quyền Phân Phối Chính Thức 5sdev.vn',
            '⭐ 1.200+ Doanh Nghiệp & Đối Tác Tin Dùng',
            '🛡️ Mã Nguồn Tách Rời Sẵn Sàng Triển Khai',
            '⚡ 1.050+ Website UI Templates Độc Bản',
            '🛍️ 30 Ngành Nghề Chuyên Sâu',
            '🎨 20 Phong Cách UI/UX Chuẩn Quốc Tế',
            '📱 100% Responsive Desktop, Tablet, Mobile',
            '🚀 React 18 • TypeScript • Tailwind CSS • Vite',
            '💎 Bản Quyền Phân Phối Chính Thức 5sdev.vn',
            '⭐ 1.200+ Doanh Nghiệp & Đối Tác Tin Dùng',
            '🛡️ Mã Nguồn Tách Rời Sẵn Sàng Triển Khai',
          ].map((item, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <span>{item}</span>
              <span className="text-white/40">•</span>
            </div>
          ))}
        </div>
      </section>

      {/* 3. CATEGORY EXPLORER — 30 NGÀNH NGHỀ VỚI HÌNH ẢNH THỰC TẾ & ICON SINH ĐỘNG */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600 mb-2">
              <Layers className="h-4 w-4" />
              30 INDUSTRY VERTICALS & REAL DEMO PHOTOGRAPHY
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Khám Phá 30 Ngành Nghề Chuyên Biệt
            </h2>
            <p className="mt-2 text-sm text-slate-600 max-w-2xl">
              Mỗi ngành nghề bao gồm 35 website templates độc bản, tích hợp hình ảnh chụp thực tế chất lượng cao, công cụ tính phí, form đặt dịch vụ và bảng giá riêng biệt.
            </p>
          </div>
          <Link
            to="/templates"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 transition shadow-sm hover:-translate-y-0.5 self-start md:self-auto"
          >
            <span>Xem toàn bộ 1.050 Templates</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* 30 Rich Visual Industry Cards (Never Bare / Thô Sơ) */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat) => {
            const media = INDUSTRY_REALISTIC_MEDIA[cat.slug] || {
              emoji: '💼',
              subTag: cat.name,
              photo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
              highlight: cat.description,
            };

            return (
              <Link
                key={cat.slug}
                to={`/templates?category=${cat.slug}`}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200/90 bg-white transition-all duration-300 hover:-translate-y-2 hover:border-indigo-500/60 hover:shadow-2xl shadow-sm"
              >
                {/* Visual Photography Header Thumbnail */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                  <img
                    src={media.photo}
                    alt={cat.nameVi}
                    loading="lazy"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent" />

                  {/* Top Floating Glass Badge: 3D Realistic Icon + Code */}
                  <div className="absolute left-3.5 top-3.5 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-1.5 shadow-md backdrop-blur-md border border-white/60">
                    <span className="text-lg leading-none select-none">{media.emoji}</span>
                    <span className="font-mono text-xs font-extrabold text-slate-900">
                      5SD-{cat.code}
                    </span>
                  </div>

                  {/* Top Right Counter Badge */}
                  <div className="absolute right-3.5 top-3.5">
                    <span className="rounded-xl bg-slate-950/80 px-2.5 py-1 font-mono text-[11px] font-bold text-white backdrop-blur-md shadow border border-white/10">
                      35 mẫu UI
                    </span>
                  </div>

                  {/* Bottom Sub-tag inside Image */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-white">
                    <span className="text-xs font-semibold bg-black/50 px-2.5 py-1 rounded-lg backdrop-blur-sm truncate max-w-[200px]">
                      {media.subTag}
                    </span>
                    <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow">
                      <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Live Demo
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-1 flex-col justify-between p-5 sm:p-6 space-y-4">
                  <div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {cat.nameVi}
                    </h3>
                    <p className="text-xs font-semibold text-indigo-600/90 mt-0.5">
                      {cat.name} • 35 Giao diện chuẩn mực
                    </p>
                    <p className="mt-2 text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {media.highlight}
                    </p>
                  </div>

                  {/* Action Link Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs font-bold">
                    <span className="text-indigo-600 group-hover:text-indigo-800 transition-colors">
                      Khám phá toàn bộ {cat.targetCount} mẫu
                    </span>
                    <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 4. FEATURED TEMPLATES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-amber-600 mb-2">
              <Award className="h-4 w-4" />
              EDITOR'S CHOICE • FLAGSHIP DESIGNS
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Featured Templates Nổi Bật
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Những mẫu thiết kế tiêu biểu với kiến trúc bố cục độc đáo, hiệu ứng tương tác mượt mà và tỷ lệ chuyển đổi cao.
            </p>
          </div>
          <Link
            to="/templates?sort=featured"
            className="inline-flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800"
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

      {/* 5. TRENDING TEMPLATES */}
      <section id="trending" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-rose-600 mb-2">
              <Flame className="h-4 w-4" />
              MOST POPULAR ON 5SDEV.VN
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Trending Templates Đang Thịnh Hành
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Các giao diện được doanh nghiệp và lập trình viên xem trước và lựa chọn triển khai nhiều nhất tuần qua.
            </p>
          </div>
          <Link
            to="/templates?sort=popular"
            className="inline-flex items-center gap-2 text-sm font-bold text-rose-600 hover:text-rose-700"
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

      {/* 6. PREMIUM COLLECTIONS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-purple-600 mb-2">
              <Crown className="h-4 w-4" />
              CURATED ENTERPRISE BUNDLES
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              Premium Collections Theo Hệ Sinh Thái
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Tuyển tập các bộ giao diện chuyên sâu giúp agency và doanh nghiệp triển khai nhanh hệ thống đa thương hiệu trên 5sdev.vn.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
            {premiumCollections.map((col, idx) => (
              <div
                key={col.id}
                onClick={() => setActiveCollection(idx)}
                className={`cursor-pointer rounded-2xl border p-6 transition-all shadow-sm ${
                  activeCollection === idx
                    ? 'border-indigo-500 bg-indigo-50/40 shadow-md ring-2 ring-indigo-500/20'
                    : 'border-slate-200 bg-slate-50/60 hover:bg-white hover:border-slate-300'
                }`}
              >
                <span
                  className={`inline-block rounded-lg bg-gradient-to-r ${col.accent} px-3 py-1 text-xs font-bold text-white mb-4 shadow`}
                >
                  {col.badge}
                </span>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-1">{col.title}</h3>
                <p className="text-xs font-semibold text-indigo-600 mb-3">{col.subtitle}</p>
                <p className="text-xs text-slate-600 leading-relaxed mb-5">{col.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {col.categories.map((catSlug) => (
                    <Link
                      key={catSlug}
                      to={`/templates?category=${catSlug}`}
                      className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-semibold text-slate-700 hover:border-indigo-400 hover:text-indigo-600 shadow-sm"
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

      {/* 7. NEW RELEASES */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-emerald-600 mb-2">
              <Clock className="h-4 w-4" />
              FRESH RELEASES • LATEST BATCHES
            </div>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 sm:text-4xl">
              New Releases Mới Nhất
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Các template vừa hoàn thiện kiểm thử tự động và cập nhật vào kho lưu trữ trung tâm.
            </p>
          </div>
          <Link
            to="/templates?sort=newest"
            className="inline-flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700"
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

      {/* 8. DESIGN STYLES SHOWCASE & ABOUT SECTION */}
      <section id="about" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-mt-24">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-indigo-600">
                <Palette className="h-4 w-4" />
                20 DISTINCT DESIGN ARCHETYPES
              </div>
              <h2 className="font-display text-3xl font-extrabold text-slate-900">
                Kiến trúc Frontend Hiện đại & Đa Phong Cách Thiết Kế
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
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
                  <div key={feat} className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
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
                    className="rounded-xl border border-slate-200 bg-slate-50 p-3 hover:border-indigo-400 hover:bg-white transition group shadow-sm hover:-translate-y-0.5"
                  >
                    <div className="text-xs font-bold text-slate-900 group-hover:text-indigo-600 truncate">
                      {style.name}
                    </div>
                    <div className="text-[10px] text-slate-500 truncate mt-0.5">{style.nameVi}</div>
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
