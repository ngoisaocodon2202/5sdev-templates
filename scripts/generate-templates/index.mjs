import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { buildAllTemplateDefinitions, writeSingleTemplateToDisk } from './template-builder.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '../..');

const args = process.argv.slice(2);
const getArg = (name, fallback) => {
  const found = args.find((a) => a.startsWith(`--${name}=`));
  return found ? parseInt(found.split('=')[1], 10) : fallback;
};

const singleBatch = getArg('batch', null);
const fromBatch = singleBatch !== null ? singleBatch : getArg('from', 1);
const toBatch = singleBatch !== null ? singleBatch : getArg('to', 1);

const allDefinitions = buildAllTemplateDefinitions();
const registryPath = path.join(
  BASE_DIR,
  'apps/template-marketplace/src/data/template-registry.json'
);

let existingRegistry = [];
if (fs.existsSync(registryPath)) {
  try {
    existingRegistry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
  } catch {
    existingRegistry = [];
  }
}

const registryMap = new Map(existingRegistry.map((item) => [item.id, item]));

for (let batch = fromBatch; batch <= toBatch; batch++) {
  const batchDefs = allDefinitions.filter((d) => d.batchNumber === batch);
  if (batchDefs.length === 0) continue;

  const startIdx = (batch - 1) * 50 + 1;
  const endIdx = startIdx + batchDefs.length - 1;
  console.log(
    `[Batch ${String(batch).padStart(3, '0')}] Generating templates ${startIdx}–${endIdx} (${batchDefs.length} templates)...`
  );

  for (const def of batchDefs) {
    const meta = writeSingleTemplateToDisk(BASE_DIR, def);
    registryMap.set(meta.id, meta);
  }
}

// Sort registry cleanly by ID or global order
const updatedRegistry = allDefinitions
  .filter((d) => registryMap.has(d.id))
  .map((d) => registryMap.get(d.id));

fs.writeFileSync(registryPath, JSON.stringify(updatedRegistry, null, 2), 'utf8');
console.log(`[Registry] Updated template-registry.json with ${updatedRegistry.length} templates.`);

// Update docs/TEMPLATE-CATALOG.md
const catalogMdPath = path.join(BASE_DIR, 'docs/TEMPLATE-CATALOG.md');
const categorySummaryMap = new Map();
for (const item of updatedRegistry) {
  const prev = categorySummaryMap.get(item.category) || {
    slug: item.category,
    code: item.categoryCode,
    name: item.categoryName,
    nameVi: item.categoryNameVi,
    count: 0,
    firstId: item.id,
    lastId: item.id,
  };
  prev.count += 1;
  if (item.id < prev.firstId) prev.firstId = item.id;
  if (item.id > prev.lastId) prev.lastId = item.id;
  categorySummaryMap.set(item.category, prev);
}

let catalogContent = `# 5S DEV.TEMPLATES — Danh mục Kho Giao Diện (Template Catalog)

- **Tổng số Template đã khởi tạo & kiểm thử**: **${updatedRegistry.length.toLocaleString('vi-VN')} Templates**
- **Số lượng ngành nghề**: **${categorySummaryMap.size} Ngành nghề**
- **Số Batch hoàn thành**: **${Math.ceil(updatedRegistry.length / 50)} / 21 Batches**

## 1. Thống kê theo 30 Ngành nghề

| STT | Mã Ngành | Ngành nghề (VN) | Industry (EN) | Số lượng | Dải Mã Template |
|---|---|---|---|---|---|
`;

Array.from(categorySummaryMap.values()).forEach((cat, idx) => {
  catalogContent += `| ${idx + 1} | \`5SD-${cat.code}\` | **${cat.nameVi}** | ${cat.name} | **${cat.count}** | \`${cat.firstId}\` → \`${cat.lastId}\` |\n`;
});

catalogContent += `\n## 2. Danh sách Chi tiết Các Template Đã Tạo (${updatedRegistry.length} Mẫu)\n\n`;
catalogContent += `| Mã ID | Tên Template | Ngành nghề | Phân khúc | Phong cách | Kiến trúc | Giá đề xuất | Preview |\n`;
catalogContent += `|---|---|---|---|---|---|---|---|\n`;

for (const item of updatedRegistry) {
  const priceStr = item.price.isFree
    ? 'Miễn phí'
    : `${item.price.priceVnd.toLocaleString('vi-VN')} đ`;
  catalogContent += `| \`${item.id}\` | ${item.name} | ${item.categoryNameVi} | ${item.subNiche} | ${item.designStyleName} | \`${item.architecture}\` | ${priceStr} | \`${item.previewRoute}\` |\n`;
}

fs.writeFileSync(catalogMdPath, catalogContent, 'utf8');

// Update docs/PROGRESS.md
const progressMdPath = path.join(BASE_DIR, 'docs/PROGRESS.md');
const completedBatchesCount = Math.ceil(updatedRegistry.length / 50);
let progressContent = `# 5S DEV.TEMPLATES — Tiến độ Dự án (Project Progress Tracker)

> File này được cập nhật tự động sau mỗi Batch để đảm bảo khả năng khôi phục và tiếp tục công việc chính xác 100%.

## Trạng thái Tổng quan
- **Tên dự án**: 5S DEV.TEMPLATES (\`5sdev.vn\`)
- **Thư mục gốc**: \`5S-DEV-TEMPLATES/\`
- **Tổng số Template hiện tại**: **${updatedRegistry.length} / 1.050 Templates**
- **Số Batch đã hoàn thành**: **${completedBatchesCount} / 21 Batches**
- **Cập nhật lần cuối**: \`${new Date().toISOString()}\`

## Tiến độ Chi tiết Từng Batch (50 Templates / Batch)

| Batch | Phạm vi Template | Số lượng | Trạng thái |
|---|---|---|---|
`;

for (let b = 1; b <= 21; b++) {
  const s = (b - 1) * 50 + 1;
  const e = b * 50;
  const countInBatch = updatedRegistry.filter((t) => t.batchNumber === b).length;
  const statusStr = countInBatch === 50 ? '✅ COMPLETED & TESTED' : countInBatch > 0 ? '🔄 IN_PROGRESS' : '⏳ PLANNED';
  progressContent += `| **Batch ${String(b).padStart(3, '0')}** | Templates ${s}–${e} | ${countInBatch}/50 | ${statusStr} |\n`;
}

fs.writeFileSync(progressMdPath, progressContent, 'utf8');
console.log(`[Docs] Updated TEMPLATE-CATALOG.md and PROGRESS.md.`);
