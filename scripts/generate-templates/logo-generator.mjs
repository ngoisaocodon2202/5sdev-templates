// High-Fidelity Vector Brand Logo Generator for 5S DEV.TEMPLATES
// Generates distinct SVG assets and React BrandLogo components for each of the 1,050 templates.

export const INDUSTRY_EMBLEM_PATHS = {
  ecommerce: 'M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4H6z M3 6h18 M16 10a4 4 0 01-8 0',
  restaurant: 'M18 8h1a4 4 0 010 8h-1M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3',
  beauty: 'M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.41 0-8-3.59-8-8 2.5 0 5-2 6-5 1 3 3.5 5 6 5 1 0 2-.2 2.9-.6-.5 4.8-4.5 8.6-6.9 8.6z',
  fashion: 'M12 2a4 4 0 00-4 4c0 1.5.8 2.8 2 3.5V11L2 19h20l-8-8v-1.5c1.2-.7 2-2 2-3.5a4 4 0 00-4-4z',
  education: 'M12 3L1 9l11 6 9-4.91V17h2V9L12 3z M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z',
  healthcare: 'M19 14h-4v4a1 1 0 01-2 0v-4H9a1 1 0 010-2h4V8a1 1 0 012 0v4h4a1 1 0 010 2z M12 2a10 10 0 100 20 10 10 0 000-20z',
  'real-estate': 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z M9 22V12h6v10',
  travel: 'M12 2a10 10 0 100 20 10 10 0 000-20zm3.5 6.5l-2 5-5 2 2-5 5-2z',
  hotel: 'M3 21h18M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16M9 9h2M13 9h2M9 13h2M13 13h2M9 17h2M13 17h2',
  portfolio: 'M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5',
  corporate: 'M20 7h-4V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2zM10 5h4v2h-4V5z',
  technology: 'M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 5h10a2 2 0 012 2v10a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2zm2 4h6v6H9V9z',
  finance: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  automotive: 'M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.5 16c-.83 0-1.5-.67-1.5-1.5S5.67 13 6.5 13s1.5.67 1.5 1.5S7.33 16 6.5 16zm11 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zM5 11l1.5-4.5h11L19 11H5z',
  construction: 'M2 22h20M4 22V7l5-4v19M9 11h4M9 15h4M9 19h4M19 22V11l-6-4',
  furniture: 'M4 18v3M20 18v3M2 13a2 2 0 012-2h16a2 2 0 012 2v5H2v-5zM6 11V6a2 2 0 012-2h8a2 2 0 012 2v5',
  'interior-design': 'M3 3h18v18H3V3zm2 2v14h14V5H5zm2 2h4v4H7V7zm6 0h4v4h-4V7zm0 6h4v4h-4v-4zm-6 0h4v4H7v-4z',
  photography: 'M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2zM12 17a4 4 0 100-8 4 4 0 000 8z',
  wedding: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  event: 'M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm0 16H5V10h14v10zM12 11l1.5 3 3.5.5-2.5 2.5.5 3.5-3-1.5-3 1.5.5-3.5L7 14.5l3.5-.5z',
  fitness: 'M6 5v14M18 5v14M2 9v6M22 9v6M6 12h12',
  spa: 'M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L12 22l7.03-4.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 14c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z',
  'pet-care': 'M12 14c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3zm-5.5-3c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm11 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm-8-4c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5zm5 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z',
  agriculture: 'M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L18 8.5 12 12 6 8.5 12 4.8zm-1 8.7V19l-5-3.1v-5.4l5 3zm2 0l5-3v5.4l-5 3.1v-5.5z',
  logistics: 'M1 3h15v13H1zM16 8h4l3 3v5h-7V8zM5.5 18a2.5 2.5 0 100-5 2.5 2.5 0 000 5zm13 0a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  legal: 'M12 3v18M5 6h14M3 13l4-7 4 7H3zm10 0l4-7 4 7h-8zM8 21h8',
  news: 'M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-8 4h6v2h-6V8zm0 4h6v2h-6v-2zm-4-4h2v6H7V8zm10 8H7v-1h10v1z',
  blog: 'M18.37 2.63c-.4-.4-1.05-.4-1.45 0L15 4.55l3.45 3.45 1.92-1.92a1.03 1.03 0 000-1.45l-2-2zM3 16.5V21h4.5l10.9-10.9-4.5-4.5L3 16.5z',
  nonprofit: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z',
  'landing-page': 'M12 2.5a.5.5 0 01.5.5v2.2a6.5 6.5 0 014.3 4.3H19a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2.2a6.5 6.5 0 01-4.3 4.3V19a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2.2a6.5 6.5 0 01-4.3-4.3H5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5h2.2a6.5 6.5 0 014.3-4.3V3a.5.5 0 01.5-.5h2zM12 8a4 4 0 100 8 4 4 0 000-8z',
};

// Generates the standalone SVG file content
export function generateBrandLogoSvg(def) {
  const iconPath = INDUSTRY_EMBLEM_PATHS[def.category] || INDUSTRY_EMBLEM_PATHS.ecommerce;
  const initials = (def.brandName || def.name).slice(0, 2).toUpperCase();
  const subNicheClean = (def.subNiche || def.categoryName).toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 64" fill="none">
  <defs>
    <linearGradient id="logoGrad-${def.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${def.primaryColor}" />
      <stop offset="100%" stop-color="${def.secondaryColor}" />
    </linearGradient>
    <linearGradient id="textGrad-${def.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#e2e8f0" />
    </linearGradient>
    <filter id="glow-${def.slug}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="${def.primaryColor}" flood-opacity="0.35" />
    </filter>
  </defs>

  <!-- Emblem Mark Badge -->
  <g filter="url(#glow-${def.slug})">
    <rect x="4" y="8" width="48" height="48" rx="14" fill="url(#logoGrad-${def.slug})" />
    <rect x="5.5" y="9.5" width="45" height="45" rx="12.5" stroke="#ffffff" stroke-opacity="0.25" stroke-width="1.5" />
    <!-- Embedded Industry Symbol -->
    <g transform="translate(16, 14) scale(1.0)" stroke="#ffffff" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" fill="none">
      <path d="${iconPath}" />
    </g>
    <!-- Monogram Initial Pill -->
    <circle cx="44" cy="48" r="9" fill="#0f172a" stroke="${def.secondaryColor}" stroke-width="1.5" />
    <text x="44" y="51.5" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="8.5" fill="#ffffff" letter-spacing="0.02em">
      ${initials}
    </text>
  </g>

  <!-- Brand Typography -->
  <g transform="translate(64, 0)">
    <text x="0" y="32" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="800" font-size="20" fill="url(#textGrad-${def.slug})" letter-spacing="0.03em">
      ${def.brandName}
    </text>
    
    <!-- Sub-niche category pill -->
    <rect x="0" y="40" width="180" height="15" rx="4" fill="${def.primaryColor}22" stroke="${def.primaryColor}55" stroke-width="0.8" />
    <text x="6" y="51" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="8" fill="${def.primaryColor}" letter-spacing="0.08em">
      ${subNicheClean.length > 28 ? subNicheClean.slice(0, 26) + '...' : subNicheClean}
    </text>
  </g>
</svg>
`;
}

// Generates the React BrandLogo.tsx component code
export function generateBrandLogoComponent(def) {
  const iconPath = INDUSTRY_EMBLEM_PATHS[def.category] || INDUSTRY_EMBLEM_PATHS.ecommerce;
  const initials = (def.brandName || def.name).slice(0, 2).toUpperCase();
  const subNicheClean = (def.subNiche || def.categoryName).toUpperCase();

  return `import React from 'react';

export interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'mark' | 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  size = 'md',
}) => {
  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  const markSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-14 h-14 rounded-2xl',
  };

  const isLight = variant === 'light';

  if (variant === 'mark') {
    return (
      <div
        className={\`relative flex items-center justify-center shrink-0 shadow-lg \${markSizes[size]} \${className}\`}
        style={{
          background: 'linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})',
        }}
        title="${def.brandName}"
      >
        <svg
          viewBox="0 0 24 24"
          className="w-1/2 h-1/2 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="${iconPath}" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          ${initials}
        </span>
      </div>
    );
  }

  return (
    <div className={\`inline-flex items-center gap-3 select-none \${heights[size]} \${className}\`}>
      {/* Distinct Emblem Mark */}
      <div
        className={\`relative flex items-center justify-center shrink-0 shadow-lg \${markSizes[size]}\`}
        style={{
          background: 'linear-gradient(135deg, ${def.primaryColor}, ${def.secondaryColor})',
        }}
      >
        <svg
          viewBox="0 0 24 24"
          className="w-1/2 h-1/2 text-white"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="${iconPath}" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          ${initials}
        </span>
      </div>

      {/* Brand Typography & Sub-Niche Tag */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={\`font-display font-extrabold tracking-tight leading-none truncate \${
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base sm:text-lg'
          } \${isLight ? 'text-white' : 'text-slate-900 dark:text-white'}\`}
        >
          ${def.brandName}
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="inline-block rounded px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase whitespace-nowrap"
            style={{
              backgroundColor: '${def.primaryColor}22',
              color: '${def.primaryColor}',
              border: '1px solid ${def.primaryColor}44',
            }}
          >
            ${subNicheClean.length > 25 ? subNicheClean.slice(0, 23) + '...' : subNicheClean}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
`;
}

