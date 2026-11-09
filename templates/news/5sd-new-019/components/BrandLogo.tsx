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
          background: 'linear-gradient(135deg, #DB2777, #9333EA)',
        }}
        title="Prism"
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
          <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-8 4h6v2h-6V8zm0 4h6v2h-6v-2zm-4-4h2v6H7V8zm10 8H7v-1h10v1z" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          PR
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
          background: 'linear-gradient(135deg, #DB2777, #9333EA)',
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
          <path d="M19 4H5a2 2 0 00-2 2v12a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zm-8 4h6v2h-6V8zm0 4h6v2h-6v-2zm-4-4h2v6H7V8zm10 8H7v-1h10v1z" />
        </svg>
        <span
          className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-950 text-[8px] font-black text-white shadow border border-white/20"
        >
          PR
        </span>
      </div>

      {/* Brand Typography & Sub-Niche Tag */}
      <div className="flex flex-col justify-center min-w-0">
        <span
          className={`font-display font-extrabold tracking-tight leading-none truncate ${
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-xl' : 'text-base sm:text-lg'
          } ${isLight ? 'text-white' : 'text-slate-900 dark:text-white'}`}
        >
          Prism
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="inline-block rounded px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase whitespace-nowrap"
            style={{
              backgroundColor: '#DB277722',
              color: '#DB2777',
              border: '1px solid #DB277744',
            }}
          >
            LEGAL & POLICY WATCHDOG
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
