import React, { useState } from 'react';

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
      className={`relative flex items-center justify-center shrink-0 overflow-hidden bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-400 text-white font-extrabold shadow-lg shadow-indigo-500/30 border border-white/20 ${markSizes[size]}`}
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
    return <div className={`inline-flex items-center ${className}`}>{OfficialMark}</div>;
  }

  return (
    <div className={`inline-flex items-center gap-2.5 sm:gap-3 select-none ${heights[size]} ${className}`}>
      {OfficialMark}

      {/* Official 5sdev.vn Brand & Copyright Identity */}
      <div className="flex flex-col justify-center min-w-0">
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-display font-extrabold tracking-tight whitespace-nowrap ${
              size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            } text-current`}
          >
            5S DEV
          </span>
          <span className="rounded-md bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 px-1.5 py-0.5 font-mono text-[10px] font-bold text-white shadow-sm whitespace-nowrap">
            5sdev.vn
          </span>
        </div>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="inline-block rounded px-1.5 py-0.2 text-[9px] font-bold tracking-wider uppercase whitespace-nowrap bg-indigo-500/15 text-indigo-500 border border-indigo-500/30">
            © Bản quyền 5sdev.vn • 5SD-HOT-007
          </span>
        </div>
      </div>
    </div>
  );
};

export default BrandLogo;
