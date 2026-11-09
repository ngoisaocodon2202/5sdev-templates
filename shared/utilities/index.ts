export function formatPriceVND(priceVnd: number): string {
  if (priceVnd <= 0) return 'Miễn phí (Free)';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0,
  }).format(priceVnd);
}

export function formatPriceUSD(priceUsd: number): string {
  if (priceUsd <= 0) return 'Free';
  return `$${priceUsd}`;
}

export function updateDocumentMeta(title: string, description: string, canonicalPath = '/') {
  if (typeof document === 'undefined') return;
  document.title = `${title} | 5S DEV.TEMPLATES (5sdev.vn)`;
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', description);
  }
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute('content', title);
  }
  const ogDesc = document.querySelector('meta[property="og:description"]');
  if (ogDesc) {
    ogDesc.setAttribute('content', description);
  }
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) {
    canonical.setAttribute('href', `https://5sdev-templates.vercel.app${canonicalPath}`);
  }
}
