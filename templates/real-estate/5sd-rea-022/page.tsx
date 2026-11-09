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
      className="min-h-screen flex flex-col bg-[#080C16] text-slate-100"
      data-template-id="5SD-REA-022"
      data-preview-device={previewDevice || 'desktop'}
      style={
        {
          '--tpl-primary': '#1D4ED8',
          '--tpl-secondary': '#06B6D4',
          '--tpl-accent': '#93C5FD',
        } as React.CSSProperties
      }
    >
      {/* Top Navigation Header */}
      <header className="sticky top-0 z-30 w-full bg-[#080C16]/85 border-b border-slate-800/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          {/* Brand Identity */}
          <a href="#top" className="flex items-center gap-2.5">
            <span
              className="flex h-9 w-9 items-center justify-center rounded-xl text-white font-extrabold text-sm shadow"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)',
              }}
            >
              AR
            </span>
            <div>
              <span className="text-base font-extrabold tracking-tight block leading-none">
                Arcadia
              </span>
              <span className="text-[10px] font-mono opacity-65">
                Hospitality Land Development
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
              className="px-4 py-2 text-xs font-bold text-white shadow-lg hover:opacity-95 transition rounded-2xl"
              style={{
                background: 'linear-gradient(135deg, #1D4ED8, #06B6D4)',
              }}
            >
              Đăng ký Tham quan Dự án
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
          <div className="md:hidden border-t border-current/10 px-4 py-4 space-y-2 bg-[#080C16] text-slate-100">
            <button
              type="button"
              onClick={() => scrollToId('interactive-section')}
              className="block w-full text-left py-2 text-xs font-semibold"
            >
              Sản phẩm & Dịch vụ (Hospitality Land Development)
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
            <span className="font-bold">Arcadia — Hospitality Land Development</span> • Mã giao diện:{' '}
            <code className="font-mono font-bold">5SD-REA-022</code>
          </div>
          <div className="text-slate-400">
            Thiết kế theo chuẩn 5S DEV.TEMPLATES (5sdev.vn) • Phong cách: 3D Interactive
          </div>
        </div>
      </footer>
    </div>
  );
}
