# 5SD-BEA-023 — Monolith — Luxury Bath & Body Care

- **Mã sản phẩm**: `5SD-BEA-023`
- **Ngành nghề**: Làm đẹp & Mỹ phẩm (`beauty`)
- **Phân khúc**: Luxury Bath & Body Care
- **Phong cách thiết kế**: Soft UI (`soft-ui`)
- **Kiến trúc bố cục**: `split-showcase`
- **Đường dẫn xem trước**: `/preview/5sd-bea-023`
- **Giá đề xuất trên 5sdev.vn**: 1.490.000 VNĐ (`STANDARD`)

## Cấu trúc Thư mục Độc lập
```text
templates/beauty/5sd-bea-023/
├── page.tsx                        # Giao diện chính của template
├── components/
│   ├── HeroSection.tsx             # Hero section theo kiến trúc split-showcase
│   ├── InteractiveWidget.tsx       # Module tương tác chuyên ngành (booking)
│   └── ContentSections.tsx         # Features, Testimonials, FAQ & Contact Form
├── styles/
│   └── theme.css                   # Biến màu sắc & Design Tokens riêng
├── assets/
│   └── thumbnail.svg               # Ảnh xem trước Vector SVG không watermark
├── metadata.json                   # Metadata tích hợp hệ thống 5sdev.vn
└── README.md                       # Tài liệu hướng dẫn
```
