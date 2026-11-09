import React, { useState } from 'react';
import {
  CheckCircle2,
  Star,
  ChevronDown,
  Send,
  ShieldCheck,
  Award,
  Sparkles,
  ArrowRight,
} from '@shared/icons/template-icons';
import { AnimatedCounter, ScrollReveal } from '@shared/components';

const GALLERY_PROJECTS = [
  {
    title: 'Dự Án Tiêu Điểm #01 — Nordic Flagship',
    category: 'Tiêu biểu',
    scale: 'Quy mô Chuẩn Quốc Tế • Hoàn thành 2026',
    image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=80',
  },
  {
    title: 'Giải Pháp Chuyên Sâu #02 — Luxury Nail & Art Studio',
    category: 'Mới hoàn thành',
    scale: 'Tối ưu 40% Hiệu suất • Đạt chuẩn ISO',
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Không Gian & Trải Nghiệm #03 — Làm đẹp & Mỹ phẩm',
    category: 'Tiêu biểu',
    scale: 'Khách hàng Doanh nghiệp VIP • 5 Sao',
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Tổ Hợp Hiện Đại #04 — Modern Corporate Edition',
    category: 'Mới hoàn thành',
    scale: 'Vật liệu & Công nghệ Thế hệ mới',
    image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Hạng Mục Cao Cấp #05 — Nordic Signature',
    category: 'Tiêu biểu',
    scale: 'Bảo hành dài hạn • Bàn giao vượt tiến độ',
    image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80',
  },
  {
    title: 'Bộ Sưu Tập Thực Tế #06 — Chuẩn Mực Mới',
    category: 'Mới hoàn thành',
    scale: 'Được bình chọn xuất sắc nhất năm',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=900&q=80',
  },
];

const PRICING_TIERS = [
  {
    name: 'Gói Tiêu Chuẩn (Standard)',
    desc: 'Phù hợp cho nhu cầu khởi đầu nhanh chóng với ngân sách tối ưu.',
    price: '4.990.000 ₫',
    popular: false,
    perks: [
      'Tư vấn & Khảo sát nhu cầu ban đầu miễn phí',
      'Triển khai đầy đủ các hạng mục cốt lõi',
      'Bảo hành tiêu chuẩn 12 tháng chính hãng',
      'Hỗ trợ kỹ thuật trong giờ hành chính',
    ],
  },
  {
    name: 'Gói Chuyên Nghiệp (Pro)',
    desc: 'Giải pháp toàn diện được 80% khách hàng doanh nghiệp & cá nhân lựa chọn.',
    price: '9.980.000 ₫',
    popular: true,
    perks: [
      'Toàn bộ quyền lợi Gói Tiêu Chuẩn nâng cao',
      'Chuyên gia trưởng trực tiếp phụ trách hồ sơ',
      'Vật liệu & Công nghệ phân khúc cao cấp',
      'Bảo hành mở rộng 36 tháng & Hỗ trợ 24/7',
    ],
  },
  {
    name: 'Gói Thượng Đỉnh (Enterprise VIP)',
    desc: 'Thiết kế độc bản theo yêu cầu riêng biệt với cam kết SLA cao nhất.',
    price: '19.960.000 ₫',
    popular: false,
    perks: [
      'Thiết kế & Triển khai May đo Độc bản 100%',
      'Đội ngũ Chuyên gia Đặc nhiệm phục vụ riêng',
      'Ưu tiên tiến độ khẩn cấp & Bảo mật NDA',
      'Bảo hành trọn đời & Bảo trì định kỳ miễn phí',
    ],
  },
];

const TESTIMONIALS = [
  {
    name: 'Nguyễn Minh Quân',
    role: 'Tổng Giám Đốc — Tập đoàn Đầu tư Á Châu',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
    quote: 'Trải nghiệm hợp tác cùng Nordic thực sự vượt mong đợi. Hình ảnh thực tế sắc nét, quy trình làm việc rõ ràng và bàn giao đúng từng cam kết trong hợp đồng.',
  },
  {
    name: 'Trần Thanh Hà',
    role: 'Giám Đốc Vận Hành — Emerald Group',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=240&q=80',
    quote: 'Đội ngũ chuyên gia của Nordic tư vấn rất tận tâm. Chất lượng hoàn thiện trong lĩnh vực Làm đẹp & Mỹ phẩm đạt chuẩn quốc tế khiến chúng tôi hoàn toàn yên tâm.',
  },
  {
    name: 'Lê Hoàng Nam',
    role: 'Kiến Trúc Sư & Nhà Sáng Lập',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=240&q=80',
    quote: 'Chi phí minh bạch, tiến độ chuẩn xác và dịch vụ hậu mãi chu đáo. Chắc chắn chúng tôi sẽ tiếp tục đồng hành cùng Nordic trong các dự án lớn sắp tới.',
  },
];

export const ContentSections: React.FC = () => {
  const [projectFilter, setProjectFilter] = useState<'ALL' | 'Tiêu biểu' | 'Mới hoàn thành'>('ALL');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [leadSubmitted, setLeadSubmitted] = useState(false);

  const visibleProjects =
    projectFilter === 'ALL'
      ? GALLERY_PROJECTS
      : GALLERY_PROJECTS.filter((p) => p.category === projectFilter);

  const faqs = [
    {
      q: 'Quy trình triển khai dịch vụ tại Nordic diễn ra như thế nào?',
      a: 'Quy trình chuẩn hóa gồm 4 bước: (1) Tiếp nhận thông tin & Khảo sát thực tế, (2) Lên phương án demo & Báo giá chi tiết, (3) Ký hợp đồng & Triển khai chuẩn chất lượng, (4) Nghiệm thu bàn giao & Bảo hành định kỳ.',
    },
    {
      q: 'Chi phí báo giá trên website đã bao gồm trọn gói chưa?',
      a: 'Mức giá hiển thị trên bảng tính tương tác và bảng giá là mức giá minh bạch. Chúng tôi cam kết không phát sinh chi phí ẩn ngoài hợp đồng.',
    },
    {
      q: 'Chính sách bảo hành và hỗ trợ sau bàn giao tại Nordic ra sao?',
      a: 'Tất cả khách hàng đều nhận được chứng nhận bảo hành điện tử chính hãng cùng đội ngũ kỹ thuật trực hỗ trợ 24/7 trên toàn quốc.',
    },
  ];

  return (
    <>
      {/* 1. About Us & Multi-Photo Collage Section */}
      <section id="about-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 6 Cols: 2-Photo Collage with Animated Stats */}
            <ScrollReveal direction="left" className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img
                  src="https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=900&q=80"
                  alt="Về chúng tôi 1"
                  loading="lazy"
                  className="h-56 sm:h-72 w-full rounded-2xl object-cover shadow-lg"
                />
                <div
                  className="rounded-2xl p-5 text-white shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                >
                  <div className="text-2xl sm:text-3xl font-extrabold">
                    <AnimatedCounter value="15+ Năm" />
                  </div>
                  <div className="text-xs opacity-90 mt-1">
                    Kinh nghiệm thực chiến dẫn đầu lĩnh vực Làm đẹp & Mỹ phẩm
                  </div>
                </div>
              </div>
              <div className="space-y-4 pt-6">
                <div className="p-5 bg-white border border-slate-200/90 shadow-sm rounded-2xl shadow-lg">
                  <div className="text-2xl sm:text-3xl font-extrabold" style={{ color: '#2563EB' }}>
                    <AnimatedCounter value="99.4%" />
                  </div>
                  <div className="text-xs text-slate-600 mt-1">
                    Khách hàng hài lòng & Giới thiệu đối tác mới
                  </div>
                </div>
                <img
                  src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=900&q=80"
                  alt="Về chúng tôi 2"
                  loading="lazy"
                  className="h-56 sm:h-72 w-full rounded-2xl object-cover shadow-lg"
                />
              </div>
            </ScrollReveal>

            {/* Right 6 Cols: Story & Core Competencies */}
            <ScrollReveal direction="right" className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 font-semibold rounded-2xl">
                <Award className="h-3.5 w-3.5 shrink-0" />
                <span>HỒ SƠ NĂNG LỰC • NORDIC</span>
              </span>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight leading-tight">
                Vì Sao Hàng Nghìn Khách Hàng Tin Tưởng Nordic?
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Với định hướng lấy chất lượng và sự minh bạch làm trọng tâm, Nordic không ngừng đầu tư vào công nghệ, con người và quy trình chuẩn quốc tế nhằm mang lại giá trị bền vững nhất cho khách hàng trong mảng Luxury Nail & Art Studio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {["Thiết kế Modern Corporate tối ưu trải nghiệm ngành Làm đẹp & Mỹ phẩm","Đầy đủ hình ảnh Demo thực tế sắc nét cho từng dịch vụ và dự án","Công cụ tương tác chuyên ngành (BOOKING) tính phí trực tiếp","Bố cục chống tràn chữ, tương thích hoàn hảo Desktop, Tablet & Mobile"].map((feat, idx) => (
                  <div key={idx} className="p-4 bg-white border border-slate-200/90 shadow-sm rounded-2xl space-y-1.5">
                    <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
                      <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color: '#2563EB' }} />
                      <span>Tiêu chuẩn 0{idx + 1}</span>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{feat}</p>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Featured Projects / Lookbook / Case Study Gallery (6 Visual Photo Cards) */}
      <section id="projects-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                THƯ VIỆN HÌNH ẢNH & DỰ ÁN THỰC TẾ
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">
                Hình Ảnh Thực Tế & Dự Án Tiêu Biểu
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {(['ALL', 'Tiêu biểu', 'Mới hoàn thành'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setProjectFilter(tab)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition whitespace-nowrap ${
                    projectFilter === tab
                      ? 'text-white shadow'
                      : 'bg-white border border-slate-200/90 shadow-sm opacity-75 hover:opacity-100'
                  }`}
                  style={{
                    background: projectFilter === tab ? '#2563EB' : undefined,
                  }}
                >
                  {tab === 'ALL' ? 'Tất cả (6)' : tab}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((proj, idx) => (
              <ScrollReveal
                key={idx}
                direction={idx % 2 === 0 ? 'left' : 'right'}
                delay={(idx % 3) * 100}
                className="flex"
              >
                <div
                  className="w-full group overflow-hidden bg-white border border-slate-200/90 shadow-sm rounded-2xl flex flex-col shadow-lg"
                >
                  <div className="relative h-56 w-full overflow-hidden bg-slate-900">
                    <img
                      src={proj.image}
                      alt={proj.title}
                      loading="lazy"
                      className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span
                      className="absolute left-3.5 top-3.5 rounded-lg px-2.5 py-1 text-[11px] font-bold text-white whitespace-nowrap"
                      style={{ background: '#2563EB' }}
                    >
                      {proj.category}
                    </span>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="text-base font-bold leading-snug">{proj.title}</h3>
                      <p className="text-xs text-slate-600 mt-1">{proj.scale}</p>
                    </div>
                    <a
                      href="#contact-section"
                      className="inline-flex items-center gap-1.5 text-xs font-bold whitespace-nowrap"
                      style={{ color: '#2563EB' }}
                    >
                      <span>Xem chi tiết hồ sơ</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Transparent 3-Tier Pricing Table */}
      <section id="pricing-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-mono uppercase tracking-wider opacity-70">
              BẢNG GIÁ NIÊM YẾT MINH BẠCH
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">
              Lựa Chọn Gói Giải Pháp Phù Hợp
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Cam kết không phát sinh chi phí ẩn, hợp đồng pháp lý rõ ràng và bảo hành chính hãng.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {PRICING_TIERS.map((tier, idx) => (
              <ScrollReveal
                key={idx}
                direction="up"
                delay={idx * 120}
                className="flex"
              >
                <div
                  className={`w-full relative p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm rounded-2xl flex flex-col justify-between shadow-lg ${
                    tier.popular ? 'ring-2' : ''
                  }`}
                  style={{
                    borderColor: tier.popular ? '#2563EB' : undefined,
                  }}
                >
                  <div>
                    {tier.popular && (
                      <span
                        className="inline-block rounded-full px-3 py-1 text-[11px] font-bold text-white mb-4 whitespace-nowrap shadow"
                        style={{ background: '#2563EB' }}
                      >
                        ★ ĐƯỢC LỰA CHỌN NHIỀU NHẤT
                      </span>
                    )}
                    <h3 className="text-lg sm:text-xl font-bold">{tier.name}</h3>
                    <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">{tier.desc}</p>
                    <div
                      className="my-5 text-2xl sm:text-3xl font-extrabold whitespace-nowrap"
                      style={{ color: '#2563EB' }}
                    >
                      {tier.price}
                    </div>
                    <ul className="space-y-2.5 text-xs sm:text-sm border-t border-current/10 pt-5">
                      {tier.perks.map((perk, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2.5">
                          <CheckCircle2
                            className="h-4 w-4 shrink-0 mt-0.5"
                            style={{ color: '#2563EB' }}
                          />
                          <span>{perk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="#contact-section"
                    className="mt-8 w-full inline-flex items-center justify-center gap-2 py-3 px-5 text-xs sm:text-sm font-bold rounded-xl text-white transition whitespace-nowrap shadow"
                    style={{
                      background: tier.popular ? 'linear-gradient(135deg, #2563EB, #7C3AED)' : '#334155',
                    }}
                  >
                    <span>Đăng Ký Tư Vấn Gói Này</span>
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Customer Testimonials with Real Portrait Avatars */}
      <section id="reviews-section" className="py-14 sm:py-20 border-b border-current/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                ĐÁNH GIÁ TỪ KHÁCH HÀNG THỰC TẾ
              </span>
              <h2 className="mt-1 text-2xl sm:text-3xl lg:text-4xl font-display font-bold tracking-tight">
                Khách Hàng Nói Gì Về Nordic
              </h2>
            </div>
            <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm whitespace-nowrap">
              <Star className="h-4 w-4 fill-amber-400" />
              <span>5 / 5.0 (1.200+ Đánh giá xác thực)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal
                key={i}
                direction={i % 2 === 0 ? 'left' : 'right'}
                delay={i * 100}
                className="flex"
              >
                <div
                  className="w-full p-6 bg-white border border-slate-200/90 shadow-sm rounded-2xl flex flex-col justify-between space-y-5 shadow-lg"
                >
                  <div className="space-y-3">
                    <div className="text-amber-500 text-xs font-bold tracking-widest">★★★★★</div>
                    <p className="text-xs sm:text-sm leading-relaxed italic">"{t.quote}"</p>
                  </div>
                  <div className="flex items-center gap-3 pt-4 border-t border-current/10">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      loading="lazy"
                      className="h-11 w-11 rounded-full object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <div className="text-xs sm:text-sm font-bold truncate">{t.name}</div>
                      <div className="text-[11px] text-slate-600 truncate">{t.role}</div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Interactive FAQ & Consultation Request Form */}
      <section id="contact-section" className="py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
            <ScrollReveal direction="left" className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider opacity-70">
                CÂU HỎI THƯỜNG GẶP (FAQ)
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold tracking-tight">
                Giải Đáp Thắc Mắc Nhanh Chóng
              </h2>
              <div className="space-y-3 pt-2">
                {faqs.map((f, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div key={idx} className="bg-white border border-slate-200/90 shadow-sm rounded-2xl overflow-hidden shadow">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full flex items-center justify-between gap-4 p-4 sm:p-5 text-left text-xs sm:text-sm font-bold"
                      >
                        <span>{f.q}</span>
                        <ChevronDown
                          className={`h-4 w-4 shrink-0 transition-transform ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <div className="px-4 sm:px-5 pb-4 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-current/10 pt-3">
                          {f.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right" className="lg:col-span-6">
              <div className="p-6 sm:p-8 bg-white border border-slate-200/90 shadow-sm rounded-2xl shadow-xl">
                <h3 className="text-xl sm:text-2xl font-bold mb-1">
                  Đăng Ký Nhận Tư Vấn & Báo Giá
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Chuyên viên của Nordic sẽ liên hệ lại trong vòng 15 phút làm việc.
                </p>

                {leadSubmitted ? (
                  <div className="rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-6 text-center space-y-2">
                    <CheckCircle2 className="mx-auto h-10 w-10 text-emerald-500" />
                    <h4 className="text-base font-bold">Đã gửi yêu cầu tư vấn thành công!</h4>
                    <p className="text-xs text-slate-600">
                      Cảm ơn bạn đã tin chọn Nordic. Chúng tôi sẽ liên hệ ngay.
                    </p>
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setLeadSubmitted(true);
                    }}
                    className="space-y-4 text-xs sm:text-sm"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold mb-1.5">Họ và tên *</label>
                        <input
                          type="text"
                          required
                          placeholder="Nguyễn Văn A"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold mb-1.5">Số điện thoại / Zalo *</label>
                        <input
                          type="tel"
                          required
                          placeholder="0901 234 567"
                          className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5">Email nhận hồ sơ & báo giá</label>
                      <input
                        type="email"
                        placeholder="khachhang@company.vn"
                        className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-1.5">Nội dung cần tư vấn</label>
                      <textarea
                        rows={3}
                        placeholder="Nhập yêu cầu cụ thể hoặc quy mô dự án của bạn..."
                        className="w-full rounded-xl border border-current/20 bg-transparent px-3.5 py-2.5 focus:outline-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl whitespace-nowrap"
                      style={{ background: 'linear-gradient(135deg, #2563EB, #7C3AED)' }}
                    >
                      <Send className="h-4 w-4 shrink-0" />
                      <span>Gửi Yêu Cầu Ngay</span>
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  );
};
