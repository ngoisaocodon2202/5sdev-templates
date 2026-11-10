// Official 5S DEV (5sdev.vn) Copyright Brand Logo Generator for 5S DEV.TEMPLATES
// Stamps the official 5sdev.vn homepage logo and copyright identity across all 1,050 templates.

export function generateBrandLogoSvg(def) {
  const subNicheClean = (def.subNiche || def.categoryName).toUpperCase();

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 64" fill="none">
  <defs>
    <linearGradient id="5sGrad-${def.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#6366f1" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#22d3ee" />
    </linearGradient>
    <linearGradient id="pillGrad-${def.slug}" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#06b6d4" />
    </linearGradient>
    <filter id="glow-${def.slug}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#6366f1" flood-opacity="0.4" />
    </filter>
  </defs>

  <!-- Official 5S DEV Homepage Emblem Mark -->
  <g filter="url(#glow-${def.slug})">
    <rect x="4" y="8" width="48" height="48" rx="14" fill="url(#5sGrad-${def.slug})" />
    <rect x="5.5" y="9.5" width="45" height="45" rx="12.5" stroke="#ffffff" stroke-opacity="0.3" stroke-width="1.5" />
    <text x="28" y="39" text-anchor="middle" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="21" fill="#ffffff" letter-spacing="-0.03em">
      5S
    </text>
    <!-- Star Accent -->
    <circle cx="44" cy="16" r="4" fill="#fbbf24" />
  </g>

  <!-- Official 5S DEV .TEMPLATES • 5sdev.vn Copyright Lockup -->
  <g transform="translate(64, 0)">
    <text x="0" y="30" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="900" font-size="19" fill="#0f172a" letter-spacing="-0.02em">
      5S DEV
    </text>
    <rect x="74" y="15" width="68" height="19" rx="5" fill="url(#pillGrad-${def.slug})" />
    <text x="108" y="28" text-anchor="middle" font-family="'JetBrains Mono', monospace" font-weight="800" font-size="10" fill="#ffffff">
      5sdev.vn
    </text>

    <!-- Copyright & Template Code Tag -->
    <rect x="0" y="38" width="230" height="17" rx="4" fill="#2563eb18" stroke="#2563eb44" stroke-width="0.8" />
    <text x="7" y="49.5" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-weight="700" font-size="8.5" fill="#2563eb" letter-spacing="0.04em">
      © BẢN QUYỀN 5SDEV.VN • ${def.id} (${subNicheClean.length > 14 ? subNicheClean.slice(0, 12) + '..' : subNicheClean})
    </text>
  </g>
</svg>
`;
}

export function generateBrandLogoComponent(def) {
  return `import React, { useState } from 'react';

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
  const [imgError, setImgError] = useState(false);

  const heights = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
  };

  const markSizes = {
    sm: 'w-8 h-8 rounded-lg',
    md: 'w-10 h-10 rounded-xl',
    lg: 'w-12 h-12 rounded-2xl',
  };

  const OfficialMark = (
    <div
      className={\`relative flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white font-extrabold shadow-lg shadow-indigo-500/30 border border-white/20 \${markSizes[size]}\`}
      title="Bản quyền thuộc 5S DEV (5sdev.vn)"
    >
      {!imgError ? (
        <img
          src="/images/logo.png"
          alt="5S DEV - 5sdev.vn"
          onError={() => setImgError(true)}
          className="h-full w-full object-contain p-0.5 bg-white/95 rounded-[inherit]"
        />
      ) : (
        <span className={size === 'sm' ? 'text-xs font-black' : 'text-base font-black tracking-tighter'}>
          5S
        </span>
      )}
    </div>
  );

  if (variant === 'mark') {
    return <div className={\`inline-flex items-center \${className}\`}>{OfficialMark}</div>;
  }

  return (
    <div className={\`inline-flex items-center gap-2.5 sm:gap-3 select-none \${heights[size]} \${className}\`}>
      {OfficialMark}

      {/* Official 5sdev.vn Brand & Copyright Identity */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={\`font-display font-extrabold tracking-tight whitespace-nowrap \${
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            } text-current\`}
          >
            5S DEV
          </span>
          <span className="rounded-md bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm whitespace-nowrap">
            5sdev.vn
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="inline-block rounded px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase whitespace-nowrap bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
            © Bản quyền 5sdev.vn • ${def.id}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
`;
}
