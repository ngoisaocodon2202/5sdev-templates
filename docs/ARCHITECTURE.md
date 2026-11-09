# 5S DEV.TEMPLATES — Kiến trúc Hệ thống (System Architecture)

## 1. Tổng quan Dự án
**5S DEV.TEMPLATES** là hệ thống kho giao diện website đa ngành nghề quy mô lớn (**1.000+ UI Templates**) được thiết kế và xây dựng cho nền tảng **5sdev.vn**. Hệ thống hoạt động 100% trên Frontend với tốc độ cao, sử dụng **React 18 + TypeScript + Vite + Tailwind CSS + Lucide Icons**, hỗ trợ dynamic code-splitting (`React.lazy` & Vite `import.meta.glob`) để tải từng template theo nhu cầu mà không làm nặng bundle chính.

---

## 2. Cấu trúc Thư mục Chuẩn

```text
5S-DEV-TEMPLATES/
├── apps/
│   └── template-marketplace/       # Ứng dụng Marketplace, Live Preview & Admin Library Manager
│       ├── src/
│       │   ├── pages/              # Home, Catalog, TemplateDetail, LivePreview, AdminLibrary
│       │   ├── components/         # Header, Footer, TemplateCard, FilterSidebar, ErrorBoundary...
│       │   ├── layouts/            # MarketplaceLayout, PreviewLayout, AdminLayout
│       │   ├── data/               # Categories, Design Styles, Registry Index & Loader
│       │   ├── hooks/              # useTemplatesFilter, usePagination, usePreviewState
│       │   ├── styles/             # Global Tailwind & Custom CSS Tokens
│       │   └── router/             # SPA Router configuration
│       └── public/                 # Sitemap, robots.txt, SVG favicons & static thumbnails
├── templates/                      # Kho 1.000+ Templates phân chia theo 30 ngành nghề
│   ├── ecommerce/                  # 5SD-ECO-001 .. 5SD-ECO-035
│   ├── restaurant/                 # 5SD-RES-001 .. 5SD-RES-035
│   ├── beauty/                     # 5SD-BEA-001 .. 5SD-BEA-035
│   ├── ... (30 ngành nghề)
│   └── landing-page/               # 5SD-LND-001 .. 5SD-LND-035
├── shared/                         # Thành phần dùng chung (không ép chung layout)
│   ├── components/                 # Interactive primitives, SVG Artwork Generator, Fallbacks
│   ├── icons/                      # Industry icon mapping
│   ├── utilities/                  # Formatters, SEO helper, URL builders
│   ├── design-tokens/              # 20 Design Styles palettes, typography scales, spacing
│   └── preview-engine/             # ErrorBoundary, Viewport Frame, Device Switcher
├── assets/                         # Tài nguyên dùng chung hợp pháp (SVG illustrations, logos, mockups)
├── scripts/                        # Công cụ tự động hóa
│   ├── generate-templates/         # Hệ thống sinh & kiểm soát chất lượng theo từng Batch (50 templates/batch)
│   ├── validate-templates/         # Kiểm tra cấu trúc file, metadata, route, responsive & broken links
│   └── build-templates/            # Đóng gói & tạo Sitemap/Catalog tự động
└── docs/                           # Tài liệu kỹ thuật & báo cáo tiến độ
```

---

## 3. Thiết kế Template Registry & Code Splitting

Để quản lý **1.000+ templates** mà không làm phình kích thước bundle ban đầu:

1. **Metadata Index (`apps/template-marketplace/src/data/template-registry.json` & `.ts`)**:
   - Chỉ chứa thông tin nhẹ phục vụ tìm kiếm, bộ lọc, phân trang và hiển thị thẻ (ID, tên, mã, ngành nghề, phong cách thiết kế, tags, giá đề xuất, mô tả ngắn, trạng thái).
2. **Dynamic Component Loader (`import.meta.glob`)**:
   - Sử dụng tính năng `import.meta.glob('../../../../templates/*/*/page.tsx')` của Vite kết hợp `React.lazy()`.
   - Khi người dùng truy cập `/preview/5sd-eco-001`, chỉ duy nhất chunk JavaScript của `5sd-eco-001` được tải về.
   - Bao bọc bởi `PreviewErrorBoundary` riêng biệt để đảm bảo nếu một template gặp sự cố runtime, toàn bộ Marketplace vẫn hoạt động bình thường.

---

## 4. Cấu trúc Độc lập của Từng Template

Mỗi template nằm tại `templates/<category>/<id-lowercase>/` và bao gồm đầy đủ:
- `page.tsx`: Giao diện hoàn chỉnh của website với state tương tác thực tế (mobile menu, tabs, modal/drawer, bộ chọn sản phẩm/dịch vụ, form validation).
- `components/`: Các thành phần giao diện chuyên biệt của template (`HeroSection.tsx`, `FeatureShowcase.tsx`, `InteractiveWidget.tsx`).
- `styles/`: Cấu hình biến CSS / theme tokens riêng (`theme.css`).
- `assets/`: Minh họa SVG/vector nghệ thuật chuyên biệt (`illustration.svg`).
- `metadata.json`: Đầy đủ thông tin mã sản phẩm, phiên bản, công nghệ, mức giá đề xuất cho 5sdev.vn, trạng thái kiểm thử.
- `README.md`: Tài liệu hướng dẫn sử dụng và tích hợp độc lập.
