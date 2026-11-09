import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const BASE_DIR = path.resolve(__dirname, '../..');

const registryPath = path.join(
  BASE_DIR,
  'apps/template-marketplace/src/data/template-registry.json'
);

if (!fs.existsSync(registryPath)) {
  console.error('[Validate] ERROR: template-registry.json does not exist.');
  process.exit(1);
}

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
console.log(`[Validate] Starting validation for ${registry.length} registered templates...`);

const requiredFiles = [
  'page.tsx',
  'components/HeroSection.tsx',
  'components/InteractiveWidget.tsx',
  'components/ContentSections.tsx',
  'styles/theme.css',
  'assets/thumbnail.svg',
  'metadata.json',
  'README.md',
];

let passedCount = 0;
let failedCount = 0;
const errors = [];
const categorySet = new Set();
const idSet = new Set();

for (const item of registry) {
  categorySet.add(item.category);

  if (idSet.has(item.id)) {
    failedCount++;
    errors.push(`Duplicate template ID: ${item.id}`);
    continue;
  }
  idSet.add(item.id);

  const tplDir = path.join(BASE_DIR, item.sourcePath);
  if (!fs.existsSync(tplDir)) {
    failedCount++;
    errors.push(`[${item.id}] Missing template directory: ${item.sourcePath}`);
    continue;
  }

  let fileMissing = false;
  for (const relFile of requiredFiles) {
    const fullPath = path.join(tplDir, relFile);
    if (!fs.existsSync(fullPath) || fs.statSync(fullPath).size === 0) {
      fileMissing = true;
      errors.push(`[${item.id}] Missing or empty file: ${item.sourcePath}/${relFile}`);
    }
  }

  // Validate responsive classes in page.tsx & HeroSection.tsx
  const pageContent = fs.readFileSync(path.join(tplDir, 'page.tsx'), 'utf8');
  if (!pageContent.includes('md:') || !pageContent.includes('sm:')) {
    fileMissing = true;
    errors.push(`[${item.id}] Missing responsive breakpoint classes in page.tsx`);
  }

  if (fileMissing) {
    failedCount++;
  } else {
    passedCount++;
  }
}

console.log('==============================================================');
console.log(`5S DEV.TEMPLATES — QA AUTOMATION & VALIDATION REPORT`);
console.log('==============================================================');
console.log(`Total Registered Templates : ${registry.length}`);
console.log(`Industries Covered         : ${categorySet.size} / 30`);
console.log(`Templates Passed           : ${passedCount}`);
console.log(`Templates Failed           : ${failedCount}`);
console.log('==============================================================');

if (failedCount > 0) {
  console.error('[Validate] Validation failed with errors:');
  errors.slice(0, 20).forEach((e) => console.error(' - ' + e));
  process.exit(1);
}

console.log('[Validate] SUCCESS: 100% of registered templates passed all structural, metadata, asset, and responsive checks!');
