import React, { useState } from 'react';
import { Menu, X, PhoneCall, Mail, MapPin, ShieldCheck, Globe } from '@shared/icons/template-icons';
import { HeroSection } from './components/HeroSection';
import { InteractiveWidget } from './components/InteractiveWidget';
import { ContentSections } from './components/ContentSections';
import { BrandLogo } from './components/BrandLogo';

export interface TemplatePageProps {
  previewDevice?: 'desktop' | 'tablet' | 'mobile';
}

export default function TemplatePage({ previewDevice }: TemplatePageProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const scrollToId = (id: string) => {
    setMobileNavOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-slate-50 text-slate-900"
      data-template-id="5SD-NON-003"
      data-preview-device={previewDevice || 'desktop'}
      style={
        {
          '--tpl-primary': '#0284C7',
          '--tpl-secondary': '#10B981',
          '--tpl-accent': '#38BDF8',
        } as React.CSSProperties
      }
    >
      {/* Top Utility Bar (Desktop) */}
      <div className="hidden md:block border-b border-current/10 py-2 text-xs">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 font-medium">
              <PhoneCall className="h-3.5 w-3.5" style={{ color: '#0284C7' }} />
              Hotline: <strong>1900 6868</strong>
            </span>
            <span className="inline-flex items-center gap-1.5 opacity-80">
              <Mail className="h-3.5 w-3.5" />
              contact@aether.vn
            </span>
            <span className="inline-flex items-center gap-1.5 opacity-80">
              <MapPin className="h-3.5 w-3.5" />
              TP. Hồ Chí Minh & Hà Nội
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 font-semibold">
              <ShieldCheck className="h-3.5 w-3.5" style={{ color: '#0284C7' }} />
              Chứng nhận Chất lượng Quốc tế
            </span>
            <span className="font-mono text-[11px] opacity-70">5SD-NON-003</span>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/95 border-b border-slate-200/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Identity with Dedicated Logo */}
          <a href="#top" className="flex items-center shrink-0">
            <BrandLogo variant="full" size="md" />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold">
            <button type="button" onClick={() => scrollToId('about-section')} className="hover:opacity-70 whitespace-nowrap">
              Giới thiệu
            </button>
            <button type="button" onClick={() => scrollToId('interactive-section')} className="hover:opacity-70 whitespace-nowrap">
              Dịch vụ & Sản phẩm
            </button>
            <button type="button" onClick={() => scrollToId('projects-section')} className="hover:opacity-70 whitespace-nowrap">
              Dự án thực tế
            </button>
            <button type="button" onClick={() => scrollToId('pricing-section')} className="hover:opacity-70 whitespace-nowrap">
              Bảng giá
            </button>
            <button type="button" onClick={() => scrollToId('reviews-section')} className="hover:opacity-70 whitespace-nowrap">
              Đánh giá
            </button>
            <button type="button" onClick={() => scrollToId('contact-section')} className="hover:opacity-70 whitespace-nowrap">
              Liên hệ
            </button>
          </nav>

          {/* Header Action Button */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="px-4 py-2.5 text-xs font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl whitespace-nowrap"
              style={{ background: 'linear-gradient(135deg, #0284C7, #10B981)' }}
            >
              Chung tay Đóng góp
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="lg:hidden p-2.5 rounded-xl border border-current/15 shrink-0"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="lg:hidden border-t border-current/10 px-4 py-4 space-y-2.5 bg-slate-50 text-slate-900 shadow-xl">
            <button
              type="button"
              onClick={() => scrollToId('about-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Giới thiệu Aether
            </button>
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Sản phẩm & Dịch vụ (Children Heart Surgery Fund)
            </button>
            <button
              type="button"
              onClick={() => scrollToId('projects-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Hình ảnh & Dự án thực tế
            </button>
            <button
              type="button"
              onClick={() => scrollToId('pricing-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Bảng giá niêm yết
            </button>
            <button
              type="button"
              onClick={() => scrollToId('reviews-section')}
              className="block w-full text-left py-2 text-sm font-semibold border-b border-current/5"
            >
              Đánh giá từ khách hàng
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact-section')}
              className="block w-full text-left py-2 text-sm font-semibold"
            >
              Liên hệ tư vấn
            </button>
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="w-full py-3 text-center text-xs font-bold text-white rounded-xl mt-2"
              style={{ background: 'linear-gradient(135deg, #0284C7, #10B981)' }}
            >
              Chung tay Đóng góp Ngay
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1">
        <HeroSection
          onPrimaryAction={() => scrollToId('interactive-section')}
          onSecondaryAction={() => scrollToId('projects-section')}
        />
        <InteractiveWidget />
        <ContentSections />
      </main>

      {/* Multi-Column Enterprise Footer */}
      <footer className="border-t border-current/10 pt-14 pb-10 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 pb-10 border-b border-current/10">
            <div className="space-y-3">
              <BrandLogo variant="light" size="lg" />
              <p className="text-slate-600 leading-relaxed">
                Đơn vị tiên phong trong lĩnh vực Tổ chức Phi lợi nhuận & Từ thiện (Children Heart Surgery Fund), cam kết chất lượng chuẩn quốc tế và dịch vụ tận tâm 24/7.
              </p>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[11px] opacity-80">
                Dịch Vụ Trọng Điểm
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#interactive-section" className="hover:underline">Tư vấn & Triển khai Children Heart Surgery Fund</a></li>
                <li><a href="#projects-section" className="hover:underline">Hồ sơ Dự án Tiêu biểu</a></li>
                <li><a href="#pricing-section" className="hover:underline">Bảng giá Dịch vụ Trọn gói</a></li>
                <li><a href="#contact-section" className="hover:underline">Chính sách Bảo hành & Hậu mãi</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[11px] opacity-80">
                Về Aether
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#about-section" className="hover:underline">Câu chuyện Thương hiệu</a></li>
                <li><a href="#reviews-section" className="hover:underline">Khách hàng Đánh giá</a></li>
                <li><a href="#contact-section" className="hover:underline">Câu hỏi Thường gặp (FAQ)</a></li>
                <li><a href="#contact-section" className="hover:underline">Tuyển dụng & Đối tác</a></li>
              </ul>
            </div>

            <div className="space-y-2.5">
              <h4 className="font-bold uppercase tracking-wider text-[11px] opacity-80">
                Thông Tin Liên Hệ
              </h4>
              <ul className="space-y-2 text-slate-600">
                <li className="flex items-center gap-2">
                  <PhoneCall className="h-3.5 w-3.5 shrink-0" />
                  <span>Hotline: <strong>1900 6868</strong> (08:00 - 21:00)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span>contact@aether.vn</span>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="h-3.5 w-3.5 shrink-0" />
                  <span>Tòa nhà Trung tâm, Quận 1, TP. Hồ Chí Minh</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-600">
            <div>
              © 2026 <strong>Aether — Children Heart Surgery Fund</strong> • Mã giao diện: <code className="font-mono font-bold">5SD-NON-003</code>
            </div>
            <div>
              Phát triển trên nền tảng <strong>5S DEV.TEMPLATES (5sdev.vn)</strong> • Style: Scandinavian
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
