import React, { useState } from 'react';
import { Menu, X } from '@shared/icons/template-icons';
import { HeroSection } from './components/HeroSection';
import { InteractiveWidget } from './components/InteractiveWidget';
import { ContentSections } from './components/ContentSections';

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
      data-template-id="5SD-EDU-001"
      data-preview-device={previewDevice || 'desktop'}
      style={
        {
          '--tpl-primary': '#DC2626',
          '--tpl-secondary': '#F97316',
          '--tpl-accent': '#F87171',
        } as React.CSSProperties
      }
    >
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-white/90 border-b border-slate-200/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow"
              style={{
                background: 'linear-gradient(135deg, #DC2626, #F97316)',
              }}
            >
              SY
            </span>
            <div>
              <span className="text-base font-extrabold tracking-tight block leading-none">
                Sylvan
              </span>
              <span className="text-[10px] font-mono opacity-65">
                Online Learning LMS Platform
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 text-xs font-semibold">
            <button type="button" onClick={() => scrollToId('interactive-section')} className="hover:opacity-70">
              Sản phẩm & Dịch vụ
            </button>
            <button type="button" onClick={() => scrollToId('features-section')} className="hover:opacity-70">
              Ưu điểm vượt trội
            </button>
            <button type="button" onClick={() => scrollToId('reviews-section')} className="hover:opacity-70">
              Khách hàng đánh giá
            </button>
            <button type="button" onClick={() => scrollToId('contact-section')} className="hover:opacity-70">
              Liên hệ
            </button>
          </nav>

          {/* Header CTA */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="px-4 py-2 text-xs font-bold text-white shadow-md hover:opacity-95 transition rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #DC2626, #F97316)',
              }}
            >
              Đăng ký Khóa học
            </button>
          </div>

          {/* Mobile Hamburger */}
          <button
            type="button"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
            className="md:hidden p-2 rounded-lg border border-current/15"
            aria-label="Toggle Navigation"
          >
            {mobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden border-t border-current/10 px-4 py-4 space-y-2 bg-slate-50 text-slate-900">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Sản phẩm & Dịch vụ (Online Learning LMS Platform)
            </button>
            <button
              type="button"
              onClick={() => scrollToId('features-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Giá trị cốt lõi
            </button>
            <button
              type="button"
              onClick={() => scrollToId('reviews-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Đánh giá từ khách hàng
            </button>
            <button
              type="button"
              onClick={() => scrollToId('contact-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Liên hệ tư vấn
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main id="top" className="flex-1">
        <HeroSection
          onPrimaryAction={() => scrollToId('interactive-section')}
          onSecondaryAction={() => scrollToId('contact-section')}
        />
        <InteractiveWidget />
        <ContentSections />
      </main>

      {/* Template Footer */}
      <footer className="border-t border-current/10 py-10 text-xs">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span className="font-bold">Sylvan — Online Learning LMS Platform</span> • Mã giao diện:{' '}
            <code className="font-mono font-bold">5SD-EDU-001</code>
          </div>
          <div className="text-slate-600">
            Thiết kế theo chuẩn 5S DEV.TEMPLATES (5sdev.vn) • Phong cách: Neumorphism
          </div>
        </div>
      </footer>
    </div>
  );
}
