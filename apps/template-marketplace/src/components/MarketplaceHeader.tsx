import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Search,
  Layers,
  Menu,
  X,
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Mail,
  ExternalLink,
  CheckCircle2,
  SlidersHorizontal,
} from 'lucide-react';
import { TEMPLATE_REGISTRY } from '../data/template-registry';

export const MarketplaceHeader: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const [quickSearch, setQuickSearch] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const handleQuickSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      navigate(`/templates?q=${encodeURIComponent(quickSearch.trim())}`);
      setMobileMenuOpen(false);
    } else {
      navigate('/templates');
    }
  };

  const navItems = [
    { label: 'Trang Chủ', path: '/' },
    { label: 'Kho Giao Diện', path: '/templates' },
    { label: '30 Ngành Nghề', path: '/#categories' },
    { label: 'Xu Hướng', path: '/#trending' },
    { label: 'Về Chúng Tôi', path: '/#about' },
    { label: 'Quản Trị Thư Viện', path: '/admin/library' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white font-extrabold text-lg shadow-lg shadow-indigo-500/30 group-hover:scale-105 group-hover:shadow-indigo-500/50 transition duration-300 border border-white/20">
              <img
                src="/images/logo.png"
                alt="5S DEV - 5sdev.vn"
                className="h-full w-full object-contain p-0.5 bg-white/95 rounded-[inherit]"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base font-extrabold tracking-tight text-white whitespace-nowrap">
                  5S DEV
                </span>
                <span className="font-mono text-xs font-bold text-cyan-400 bg-cyan-500/10 border border-cyan-500/25 px-1.5 py-0.5 rounded whitespace-nowrap">
                  .TEMPLATES
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block whitespace-nowrap">
                {TEMPLATE_REGISTRY.length.toLocaleString('vi-VN')}+ UI Templates • © 5sdev.vn
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                item.path === '/'
                  ? location.pathname === '/' && !location.hash
                  : location.pathname.startsWith(item.path) && !item.path.includes('#');
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 whitespace-nowrap ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600/30 to-cyan-500/20 text-cyan-300 border border-cyan-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/80'
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Quick Search & Contact Button */}
          <div className="hidden md:flex items-center gap-3">
            <form onSubmit={handleQuickSearch} className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Tìm mã 5SD-ECO-001, ngành..."
                className="w-52 xl:w-64 rounded-xl border border-slate-800 bg-slate-900/90 pl-9 pr-3 py-2 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 transition"
              />
            </form>

            <button
              type="button"
              onClick={() => {
                setContactSubmitted(false);
                setContactModalOpen(true);
              }}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:scale-[1.02] transition shrink-0 whitespace-nowrap"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>Liên hệ 5sdev.vn</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex lg:hidden items-center justify-center rounded-xl border border-slate-800 bg-slate-900 p-2.5 text-slate-300 hover:text-white"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 px-4 py-5 space-y-4 shadow-2xl backdrop-blur-2xl animate-in slide-in-from-top-2 duration-200">
            <form onSubmit={handleQuickSearch} className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                placeholder="Tìm tên template, mã 5SD-ECO-001..."
                className="w-full rounded-xl border border-slate-800 bg-slate-900 pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-500"
              />
            </form>
            <div className="grid grid-cols-2 gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl border border-slate-800/80 bg-slate-900/60 px-3.5 py-2.5 text-xs font-bold text-slate-200 hover:border-indigo-500/40 hover:text-cyan-300 transition whitespace-nowrap truncate"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setContactSubmitted(false);
                setContactModalOpen(true);
              }}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 py-3 text-xs font-bold text-white shadow-lg whitespace-nowrap"
            >
              <PhoneCall className="h-4 w-4" />
              <span>Liên hệ Tư vấn & Bản quyền 5sdev.vn</span>
            </button>
          </div>
        )}
      </header>

      {/* Contact / Enterprise Inquiry Modal */}
      {contactModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl border border-slate-800 bg-slate-900 p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setContactModalOpen(false)}
              className="absolute right-4 top-4 rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex items-center gap-2.5 text-xs font-mono font-bold uppercase tracking-wider text-cyan-400 mb-2">
              <Sparkles className="h-4 w-4" />
              5SDEV.VN COMMERCIAL & ENTERPRISE
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Liên hệ Mua Template & Tích hợp Hệ thống
            </h3>
            <p className="text-sm text-slate-400 mb-6">
              Đội ngũ 5S DEV hỗ trợ cung cấp source code độc lập, tùy biến nhận diện thương hiệu và triển khai trọn gói cho doanh nghiệp.
            </p>

            {contactSubmitted ? (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-3" />
                <h4 className="text-lg font-bold text-white mb-1">Đã ghi nhận yêu cầu tư vấn!</h4>
                <p className="text-sm text-slate-300 mb-4">
                  Chuyên viên giải pháp của <strong>5sdev.vn</strong> sẽ liên hệ với bạn trong vòng 15 phút làm việc.
                </p>
                <button
                  type="button"
                  onClick={() => setContactModalOpen(false)}
                  className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-500"
                >
                  Đóng cửa sổ
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setContactSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Họ và tên / Doanh nghiệp *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Nguyễn Văn A — Công ty TNHH..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Số điện thoại / Zalo *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0901 234 567"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Email làm việc *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="contact@company.vn"
                      className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Mã Template hoặc gói giải pháp quan tâm
                  </label>
                  <input
                    type="text"
                    placeholder="VD: 5SD-ECO-001, Gói All-Access 1.000+ Templates..."
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3.5 py-2.5 text-sm text-white focus:border-indigo-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setContactModalOpen(false)}
                    className="rounded-xl border border-slate-700 px-4 py-2.5 text-sm font-medium text-slate-300 hover:bg-slate-800"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 px-6 py-2.5 text-sm font-bold text-white hover:from-indigo-500 hover:to-cyan-400"
                  >
                    Gửi yêu cầu ngay
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

