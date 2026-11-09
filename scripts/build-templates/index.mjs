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
const sitemapPath = path.join(
  BASE_DIR,
  'apps/template-marketplace/public/sitemap.xml'
);

const registry = JSON.parse(fs.readFileSync(registryPath, 'utf8'));
const baseUrl = 'https://5sdev-templates.vercel.app';
const today = '2026-11-09';

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/templates</loc>
    <lastmod>${today}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
`;

for (const item of registry) {
  xml += `  <url>
    <loc>${baseUrl}${item.detailsRoute}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}${item.previewRoute}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\n`;
}

xml += `</urlset>\n`;
fs.writeFileSync(sitemapPath, xml, 'utf8');
console.log(`[Build Sitemap] Generated sitemap.xml with ${registry.length * 2 + 2} URLs.`);
