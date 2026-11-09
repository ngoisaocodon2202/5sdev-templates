import React from 'react';

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
        className={`relative flex items-center justify-center shrink-0 shadow-lg ${markSizes[size]} ${className}`}
        style={{
          background: 'linear-gradient(135deg, #B91C1C, #D97706)',
        }}
        title="Atelier"
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
          <path d="M12 2.5a.5.5 0 01.5.5v2.2a6.5 6.5 0 014.3 4.3H19a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2.2a6.5 6.5 0 01-4.3 4.3V19a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2.2a6.5 6.5 0 01-4.3-4.3H5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5h2.2a6.5 6.5 0 014.3-4.3V3a.5.5 0 01.5-.5h2zM12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          AT
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-3 select-none ${heights[size]} ${className}`}>
      {/* Distinct Emblem Mark */}
      <div
        className={`relative flex items-center justify-center shrink-0 shadow-lg ${markSizes[size]}`}
        style={{
          background: 'linear-gradient(135deg, #B91C1C, #D97706)',
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
          <path d="M12 2.5a.5.5 0 01.5.5v2.2a6.5 6.5 0 014.3 4.3H19a.5.5 0 01.5.5v2a.5.5 0 01-.5.5h-2.2a6.5 6.5 0 01-4.3 4.3V19a.5.5 0 01-.5.5h-2a.5.5 0 01-.5-.5v-2.2a6.5 6.5 0 01-4.3-4.3H5a.5.5 0 01-.5-.5v-2a.5.5 0 01.5-.5h2.2a6.5 6.5 0 014.3-4.3V3a.5.5 0 01.5-.5h2zM12 8a4 4 0 100 8 4 4 0 000-8z" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          AT
        </span>
      </div>

      {/* Brand Typography & Sub-Niche Tag */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-display font-extrabold tracking-tight leading-none truncate ${
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base sm:text-lg'
          } ${isLight ? 'text-white' : 'text-slate-900 dark:text-white'}`}
        >
          Atelier
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="inline-block rounded px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase whitespace-nowrap"
            style={{
              backgroundColor: '#B91C1C22',
              color: '#B91C1C',
              border: '1px solid #B91C1C44',
            }}
          >
            LOYALTY CLUB MEMBERSHIP...
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
