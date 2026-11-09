# 5S DEV.TEMPLATES — Hệ thống Thiết kế (Design System)

## 1. 20 Phong cách Thiết kế Chủ đạo (Design Archetypes)

Mỗi template trong kho **1.000+ UI Templates** được thiết kế dựa trên sự kết hợp độc bản giữa **Ngành nghề (30 Categories)**, **Phân khúc chuyên sâu (Sub-niche)**, **Cấu trúc Bố cục (Layout Architecture)** và **20 Phong cách Thiết kế (Design Styles)**:

| STT | Mã Style | Tên Phong cách | Đặc trưng Thị giác & Bố cục |
|---|---|---|---|
| 1 | `minimalist` | **Minimalist** | Nhiều khoảng trắng, lưới thoáng, chữ mảnh tinh tế, đường viền 1px nhẹ. |
| 2 | `luxury` | **Luxury** | Tông vàng champagne / đen / kem, serif quý phái, bố cục đối xứng sang trọng. |
| 3 | `modern-corporate` | **Modern Corporate** | Xanh navy / slate chuyên nghiệp, số liệu KPI rõ ràng, cấu trúc chuẩn doanh nghiệp. |
| 4 | `glassmorphism` | **Glassmorphism** | Hiệu ứng kính mờ `backdrop-blur`, viền bán trong suốt, nền chuyển sắc đa tầng. |
| 5 | `neumorphism` | **Neumorphism** | Đổ bóng kép mềm mại nổi khối tinh tế, nút bấm xúc giác (tactile UI). |
| 6 | `editorial` | **Editorial** | Bố cục tạp chí nghệ thuật, chữ tiêu đề cỡ lớn bất đối xứng, đường kẻ chia cột. |
| 7 | `swiss-design` | **Swiss Design** | Lưới mô-đun ketat, đường kẻ phân ô rõ rệt, typography grotesque mạnh mẽ, màu tương phản. |
| 8 | `brutalism` | **Neo-Brutalism** | Viền đen dày `2px-4px`, bóng cứng (`shadow-[4px_4px_0px_#000]`), màu sắc táo bạo. |
| 9 | `soft-ui` | **Soft UI** | Bo góc lớn (`rounded-3xl`), màu pastel dịu mắt, chuyển động mượt mà thân thiện. |
| 10 | `3d-interactive` | **3D Interactive** | Thẻ nghiêng đa chiều, lớp chiều sâu nổi bật, hiệu ứng ánh sáng tương tác. |
| 11 | `futuristic` | **Futuristic** | Giao diện sci-fi công nghệ cao, lưới cyber, điểm nhấn neon cyan/violet, HUD badges. |
| 12 | `organic` | **Organic** | Tông màu đất, xanh lá tự nhiên, bo góc bất đối xứng mềm mại, cảm hứng thiên nhiên. |
| 13 | `premium-ecommerce` | **Premium E-commerce** | Tập trung chuyển đổi mua hàng, bộ lọc nhanh, thẻ sản phẩm đa góc nhìn, giỏ hàng tương tác. |
| 14 | `japanese-minimalism` | **Japanese Minimalism** | Triết lý Zen (Ma), bố cục dọc-ngang tĩnh lặng, sắc giấy Washi, đỏ son điểm xuyết. |
| 15 | `scandinavian` | **Scandinavian** | Sáng sủa, ấm áp kiểu Bắc Âu, tông gỗ sồi nhạt và xám sương mù, thực dụng cao. |
| 16 | `dark-luxury` | **Dark Luxury** | Nền obsidian sâu thẳm, ánh kim đồng/vàng hồng, độ tương phản điện ảnh. |
| 17 | `material-inspired` | **Material-Inspired** | Độ cao lớp (elevation), thẻ phân lớp rõ ràng, chip bộ lọc và action bar trực quan. |
| 18 | `modern-dashboard` | **Modern Dashboard** | Bố cục bento-grid thông minh, biểu đồ trực quan, bảng dữ liệu và thanh công cụ nhanh. |
| 19 | `bold-typography` | **Bold Typography** | Chữ khổng lồ làm tâm điểm thị giác, marquee chuyển động, tương phản mạnh. |
| 20 | `creative-agency` | **Creative Agency** | Phá cách, portfolio tương tác, hiệu ứng hover mở rộng, bố cục showcase sáng tạo. |

---

## 2. Nguyên tắc Chất lượng Hình ảnh & Biểu tượng
- **Không phụ thuộc ảnh ngoài thiếu ổn định**: Toàn bộ hình ảnh minh họa sản phẩm, kiến trúc, món ăn, biểu đồ và thiết bị đều được xây dựng bằng hệ thống **High-Craft SVG Scene Illustrations & Curated Local Visuals** chất lượng cao, đảm bảo tải tức thì (0ms network latency), không bao giờ lỗi ảnh (0 broken images) và không có watermark.
- **Biểu tượng chuẩn mực**: 100% sử dụng **Lucide Icons** và vector SVG sắc nét, tuyệt đối không dùng emoji thay thế icon giao diện.
- **Responsive toàn diện**: Tương thích mượt mà trên Desktop (`1440px+`), Tablet (`768px`) và Mobile (`375px`), kèm menu di động hoạt động thực tế.
