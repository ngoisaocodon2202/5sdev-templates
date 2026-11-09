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
          background: 'linear-gradient(135deg, #047857, #14B8A6)',
        }}
        title="Maison"
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
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L18 8.5 12 12 6 8.5 12 4.8zm-1 8.7V19l-5-3.1v-5.4l5 3zm2 0l5-3v5.4l-5 3.1v-5.5z" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          MA
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
          background: 'linear-gradient(135deg, #047857, #14B8A6)',
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
          <path d="M12 2L4 7v10l8 5 8-5V7l-8-5zm0 2.8L18 8.5 12 12 6 8.5 12 4.8zm-1 8.7V19l-5-3.1v-5.4l5 3zm2 0l5-3v5.4l-5 3.1v-5.5z" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          MA
        </span>
      </div>

      {/* Brand Typography & Sub-Niche Tag */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-display font-extrabold tracking-tight leading-none truncate ${
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base sm:text-lg'
          } ${isLight ? 'text-white' : 'text-slate-900 dark:text-white'}`}
        >
          Maison
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="inline-block rounded px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase whitespace-nowrap"
            style={{
              backgroundColor: '#04785722',
              color: '#047857',
              border: '1px solid #04785744',
            }}
          >
            COLD CHAIN POST-HARVEST...
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
