# 5S DEV.TEMPLATES — Hướng dẫn Triển khai GitHub & Vercel (Deployment Guide)

## 1. Chuẩn bị GitHub Repository (`5sdev-templates`)

Toàn bộ mã nguồn dự án nằm độc lập tại thư mục `5S-DEV-TEMPLATES/`, có sẵn cấu hình `.gitignore` chuẩn (loại trừ `node_modules/`, `dist/`, `.env*`, credentials) và GitHub Actions CI workflow (`.github/workflows/ci.yml`).

### Các bước kết nối và đẩy code lên GitHub:
```bash
cd 5S-DEV-TEMPLATES

# 1. Kiểm tra trạng thái Git
git status

# 2. Kết nối tới GitHub Repository chính thức (thay <YOUR_ORG_OR_USER> bằng tài khoản GitHub đã xác thực)
git remote add origin https://github.com/<YOUR_ORG_OR_USER>/5sdev-templates.git

# 3. Đổi nhánh mặc định thành main và đẩy code
git branch -M main
git push -u origin main
```

---

## 2. Triển khai Production trên Vercel (`5sdev-templates.vercel.app`)

Hệ thống đã được cấu hình sẵn file `vercel.json` tại thư mục gốc `5S-DEV-TEMPLATES/vercel.json`:
- **Framework Preset**: `Vite`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Routing Rewrites**: Mọi đường dẫn (`/templates`, `/templates/:slug`, `/preview/:slug`, `/admin/library`) đều được rewrite về `/index.html` để đảm bảo không có lỗi 404 khi tải lại trang trực tiếp.
- **Cache-Control Headers**: Tối ưu hóa bộ nhớ đệm `immutable` (1 năm) cho các chunk JavaScript/CSS trong `/assets/*`.

### Lưu ý về Điều khoản Thương mại (Commercial Usage):
- Nếu triển khai bản demo nội bộ hoặc tài khoản cá nhân thử nghiệm, bạn có thể sử dụng Vercel Hobby.
- Khi sử dụng chính thức để phân phối thương mại và bán sản phẩm trên **5sdev.vn**, vui lòng sử dụng gói **Vercel Pro** (hoặc hạ tầng VPS/Cloudflare Pages thương mại của 5sdev.vn) để tuân thủ đầy đủ điều khoản thương mại của nhà cung cấp hosting.
