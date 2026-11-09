# 5S DEV.TEMPLATES — Hệ thống Thư viện 1.000+ Website UI Templates Đa Ngành Nghề

[![Build Status](https://img.shields.io/badge/Build-Passing-10B981?style=flat-square)](#)
[![Templates](https://img.shields.io/badge/Templates-1%2C050%2B-6366F1?style=flat-square)](#)
[![Industries](https://img.shields.io/badge/Industries-30-06B6D4?style=flat-square)](#)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2018%20%7C%20TypeScript%20%7C%20Vite%20%7C%20Tailwind-8B5CF6?style=flat-square)](#)

**5S DEV.TEMPLATES** là hệ thống tạo, quản lý và xem trước trực tiếp (**Live Preview Engine**) kho **1.050+ Website UI Templates** đa ngành nghề chuyên nghiệp, được xây dựng để phân phối trên nền tảng **5sdev.vn**.

---

## 1. Điểm Nổi Bật Cốt Lõi

- **1.050+ Giao diện Thực tế**: Phân bổ đều vào **30 ngành nghề** (35 templates/ngành), mỗi template có thư mục độc lập (`templates/<category>/<id>/`) gồm `page.tsx`, `components/`, `styles/`, `assets/`, `metadata.json` và `README.md`.
- **20 Phong cách Thiết kế (Design Archetypes)**: Minimalist, Luxury, Modern Corporate, Glassmorphism, Neumorphism, Editorial, Swiss Design, Brutalism, Soft UI, 3D Interactive, Futuristic, Organic, Premium E-commerce, Japanese Minimalism, Scandinavian, Dark Luxury, Material-Inspired, Modern Dashboard, Bold Typography, Creative Agency.
- **Live Preview Engine (`/preview/:slug`)**:
  - Chuyển đổi tức thì giữa **Desktop (`100%`)**, **Tablet (`768px`)**, **Mobile (`375px`)** và **Fullscreen**.
  - Tải theo nhu cầu bằng `React.lazy()` & Vite dynamic code-splitting (`import.meta.glob`).
  - Bảo vệ bởi `PreviewErrorBoundary` cô lập lỗi từng template.
- **Bộ lọc & Tìm kiếm Đa chiều (`/templates`)**: Tìm theo tên, mã (`5SD-ECO-001`), ngành nghề, phong cách thiết kế, công nghệ, miễn phí / trả phí kèm phân trang mượt mà.
- **Admin Library Manager (`/admin/library`)**: Quản lý tổng quan toàn bộ 1.050+ templates, kiểm tra trạng thái module build trực tiếp và tra cứu metadata JSON.

---

## 2. Cấu Trúc Thư Mục

```text
5S-DEV-TEMPLATES/
├── apps/
│   └── template-marketplace/       # Ứng dụng Marketplace, Live Preview & Admin
│       ├── src/
│       │   ├── pages/              # HomePage, TemplatesCatalogPage, TemplateDetailsPage, LivePreviewPage, AdminLibraryPage
│       │   ├── components/         # MarketplaceHeader, MarketplaceFooter, TemplateCard
│       │   ├── layouts/            # MarketplaceLayout
│       │   ├── data/               # Template Registry & Lazy Component Loader
│       │   ├── hooks/              # useTemplatesFilter
│       │   ├── styles/             # Global Tailwind CSS
│       │   └── router/             # React Router v6 configuration
│       └── public/                 # Sitemap, robots.txt, SVG assets
├── templates/                      # Kho 1.050+ UI Templates chia theo 30 ngành nghề
├── shared/                         # Design tokens, Icons, Artwork engine & Error Boundary
├── assets/                         # Logos, Mockups & Illustrations
├── scripts/                        # Công cụ sinh Batch, Kiểm thử QA & Build Sitemap
├── docs/                           # Tài liệu Kiến trúc, Design System, Catalog, Tiến độ & Báo cáo
├── package.json
├── vite.config.ts
├── vercel.json
└── README.md
```

---

## 3. Hướng Dẫn Khởi Chạy Nhanh

```bash
# 1. Di chuyển vào thư mục gốc dự án
cd 5S-DEV-TEMPLATES

# 2. Cài đặt dependencies
npm install

# 3. Chạy môi trường phát triển (Development Server)
npm run dev

# 4. Kiểm tra chất lượng toàn bộ 1.050+ Templates
npm run validate

# 5. Build bản Production
npm run build
```

