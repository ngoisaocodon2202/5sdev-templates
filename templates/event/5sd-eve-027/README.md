# 5SD-EVE-027 — Nova — Film Festival Screening Guide

- **Mã sản phẩm**: `5SD-EVE-027`
- **Ngành nghề**: Sự kiện & Hội nghị (`event`)
- **Phân khúc**: Film Festival Screening Guide
- **Phong cách thiết kế**: Modern Dashboard (`modern-dashboard`)
- **Kiến trúc bố cục**: `swiss-modular`
- **Đường dẫn xem trước**: `/preview/5sd-eve-027`
- **Giá đề xuất trên 5sdev.vn**: 1.490.000 VNĐ (`STANDARD`)

## Cấu trúc Thư mục Độc lập
```text
templates/event/5sd-eve-027/
├── page.tsx                        # Giao diện chính của template
├── components/
│   ├── HeroSection.tsx             # Hero section theo kiến trúc swiss-modular
│   ├── InteractiveWidget.tsx       # Module tương tác chuyên ngành (explorer)
│   └── ContentSections.tsx         # Features, Testimonials, FAQ & Contact Form
├── styles/
│   └── theme.css                   # Biến màu sắc & Design Tokens riêng
├── assets/
│   └── thumbnail.svg               # Ảnh xem trước Vector SVG không watermark
├── metadata.json                   # Metadata tích hợp hệ thống 5sdev.vn
└── README.md                       # Tài liệu hướng dẫn
```
