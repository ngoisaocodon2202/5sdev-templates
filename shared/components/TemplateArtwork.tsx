import React from 'react';

export interface ArtworkProps {
  code: string;
  title: string;
  category: string;
  styleId: string;
  primaryColor: string;
  secondaryColor: string;
  isDark?: boolean;
  variant?: number;
  className?: string;
}

export const TemplateThumbnailArtwork: React.FC<ArtworkProps> = ({
  code,
  title,
  category,
  styleId,
  primaryColor,
  secondaryColor,
  isDark = false,
  variant = 1,
  className = 'w-full h-full',
}) => {
  const bg = isDark ? '#0B0F19' : '#F8FAFC';
  const surface = isDark ? '#151C2C' : '#FFFFFF';
  const border = isDark ? '#26324D' : '#E2E8F0';
  const textMain = isDark ? '#F8FAFC' : '#0F172A';
  const textMuted = isDark ? '#94A3B8' : '#64748B';
  const layoutMode = variant % 4;
  const gradId = `grad-${code.replace(/[^a-zA-Z0-9]/g, '')}`;

  return (
    <svg
      viewBox="0 0 640 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`${title} (${code}) UI Preview`}
    >
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="640" y2="400" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={primaryColor} />
          <stop offset="100%" stopColor={secondaryColor} />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="640" height="400" fill={bg} />
      <circle cx="540" cy="80" r="140" fill={primaryColor} fillOpacity={isDark ? '0.16' : '0.09'} />
      <circle cx="90" cy="340" r="150" fill={secondaryColor} fillOpacity={isDark ? '0.14' : '0.08'} />

      {/* Browser Window Frame */}
      <rect
        x="24"
        y="20"
        width="592"
        height="360"
        rx={styleId === 'brutalism' || styleId === 'swiss-design' ? '4' : '16'}
        fill={surface}
        stroke={styleId === 'brutalism' ? '#000000' : border}
        strokeWidth={styleId === 'brutalism' ? '3' : '1.5'}
      />

      {/* Top Browser / Nav Bar */}
      <rect
        x="25"
        y="21"
        width="590"
        height="36"
        rx={styleId === 'brutalism' || styleId === 'swiss-design' ? '2' : '14'}
        fill={isDark ? '#0F172A' : '#F1F5F9'}
      />
      <circle cx="46" cy="39" r="5" fill="#EF4444" />
      <circle cx="62" cy="39" r="5" fill="#F59E0B" />
      <circle cx="78" cy="39" r="5" fill="#10B981" />
      <rect x="104" y="31" width="180" height="16" rx="8" fill={surface} />
      <text x="116" y="42" fill={textMuted} fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="600">
        {code.toLowerCase()}.5sdev.vn
      </text>
      <rect x="520" y="30" width="76" height="18" rx="9" fill={`url(#${gradId})`} />
      <text x="558" y="42" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="8.5" fontWeight="700" textAnchor="middle">
        {styleId.toUpperCase().slice(0, 10)}
      </text>

      {/* Inner Website Header */}
      <rect x="48" y="72" width="76" height="14" rx="4" fill={primaryColor} />
      <rect x="240" y="75" width="38" height="8" rx="4" fill={textMuted} fillOpacity="0.35" />
      <rect x="290" y="75" width="38" height="8" rx="4" fill={textMuted} fillOpacity="0.35" />
      <rect x="340" y="75" width="38" height="8" rx="4" fill={textMuted} fillOpacity="0.35" />
      <rect x="528" y="69" width="64" height="20" rx="6" fill={primaryColor} />

      {/* Layout Architecture Variations */}
      {layoutMode === 0 && (
        <g>
          {/* Asymmetric Split Hero */}
          <rect x="48" y="106" width="290" height="142" rx="12" fill={primaryColor} fillOpacity="0.08" />
          <rect x="66" y="124" width="90" height="14" rx="7" fill={primaryColor} fillOpacity="0.2" />
          <text x="66" y="162" fill={textMain} fontFamily="Inter, sans-serif" fontSize="17" fontWeight="800">
            {title.slice(0, 26)}
          </text>
          <rect x="66" y="176" width="210" height="8" rx="4" fill={textMuted} fillOpacity="0.45" />
          <rect x="66" y="190" width="170" height="8" rx="4" fill={textMuted} fillOpacity="0.3" />
          <rect x="66" y="212" width="92" height="24" rx="6" fill={`url(#${gradId})`} />
          <rect x="166" y="212" width="76" height="24" rx="6" fill={surface} stroke={border} />

          {/* Right Hero Showcase */}
          <rect x="354" y="106" width="238" height="142" rx="12" fill={`url(#${gradId})`} fillOpacity="0.88" />
          <circle cx="473" cy="166" r="36" fill="#FFFFFF" fillOpacity="0.2" />
          <rect x="382" y="214" width="182" height="18" rx="6" fill="#FFFFFF" fillOpacity="0.25" />

          {/* Bottom 3-Column Feature Cards */}
          <rect x="48" y="264" width="172" height="96" rx="10" fill={bg} stroke={border} />
          <rect x="64" y="280" width="28" height="28" rx="8" fill={primaryColor} fillOpacity="0.2" />
          <rect x="64" y="318" width="110" height="10" rx="4" fill={textMain} fillOpacity="0.75" />
          <rect x="64" y="334" width="136" height="7" rx="3.5" fill={textMuted} fillOpacity="0.4" />

          <rect x="236" y="264" width="172" height="96" rx="10" fill={bg} stroke={border} />
          <rect x="252" y="280" width="28" height="28" rx="8" fill={secondaryColor} fillOpacity="0.2" />
          <rect x="252" y="318" width="110" height="10" rx="4" fill={textMain} fillOpacity="0.75" />
          <rect x="252" y="334" width="136" height="7" rx="3.5" fill={textMuted} fillOpacity="0.4" />

          <rect x="424" y="264" width="168" height="96" rx="10" fill={bg} stroke={border} />
          <rect x="440" y="280" width="28" height="28" rx="8" fill={primaryColor} fillOpacity="0.2" />
          <rect x="440" y="318" width="110" height="10" rx="4" fill={textMain} fillOpacity="0.75" />
          <rect x="440" y="334" width="128" height="7" rx="3.5" fill={textMuted} fillOpacity="0.4" />
        </g>
      )}

      {layoutMode === 1 && (
        <g>
          {/* Centered Editorial / Immersive Hero */}
          <rect x="48" y="104" width="544" height="130" rx="14" fill={`url(#${gradId})`} fillOpacity="0.14" stroke={primaryColor} strokeOpacity="0.3" />
          <rect x="250" y="118" width="140" height="16" rx="8" fill={primaryColor} fillOpacity="0.25" />
          <text x="320" y="158" fill={textMain} fontFamily="Inter, sans-serif" fontSize="19" fontWeight="800" textAnchor="middle">
            {title.slice(0, 30)}
          </text>
          <rect x="190" y="172" width="260" height="8" rx="4" fill={textMuted} fillOpacity="0.45" />
          <rect x="242" y="194" width="156" height="26" rx="8" fill={`url(#${gradId})`} />

          {/* Bento Showcase Grid */}
          <rect x="48" y="248" width="264" height="112" rx="12" fill={bg} stroke={border} />
          <rect x="66" y="266" width="84" height="76" rx="8" fill={`url(#${gradId})`} fillOpacity="0.75" />
          <rect x="164" y="272" width="120" height="12" rx="4" fill={textMain} fillOpacity="0.8" />
          <rect x="164" y="292" width="100" height="8" rx="4" fill={textMuted} fillOpacity="0.45" />
          <rect x="164" y="316" width="76" height="22" rx="6" fill={primaryColor} fillOpacity="0.2" />

          <rect x="328" y="248" width="264" height="112" rx="12" fill={bg} stroke={border} />
          <rect x="346" y="266" width="84" height="76" rx="8" fill={secondaryColor} fillOpacity="0.75" />
          <rect x="444" y="272" width="120" height="12" rx="4" fill={textMain} fillOpacity="0.8" />
          <rect x="444" y="292" width="100" height="8" rx="4" fill={textMuted} fillOpacity="0.45" />
          <rect x="444" y="316" width="76" height="22" rx="6" fill={secondaryColor} fillOpacity="0.2" />
        </g>
      )}

      {layoutMode === 2 && (
        <g>
          {/* Bento OS / Dashboard Architecture */}
          <rect x="48" y="104" width="164" height="254" rx="12" fill={bg} stroke={border} />
          <rect x="64" y="122" width="110" height="12" rx="4" fill={primaryColor} />
          <rect x="64" y="150" width="132" height="28" rx="6" fill={primaryColor} fillOpacity="0.15" />
          <rect x="64" y="186" width="132" height="24" rx="6" fill={surface} />
          <rect x="64" y="218" width="132" height="24" rx="6" fill={surface} />
          <rect x="64" y="296" width="132" height="46" rx="8" fill={`url(#${gradId})`} fillOpacity="0.85" />

          <rect x="226" y="104" width="366" height="118" rx="12" fill={`url(#${gradId})`} fillOpacity="0.9" />
          <text x="248" y="144" fill="#FFFFFF" fontFamily="Inter, sans-serif" fontSize="17" fontWeight="800">
            {title.slice(0, 28)}
          </text>
          <rect x="248" y="158" width="220" height="8" rx="4" fill="#FFFFFF" fillOpacity="0.65" />
          <rect x="248" y="182" width="104" height="24" rx="6" fill="#FFFFFF" />

          <rect x="226" y="236" width="176" height="122" rx="12" fill={bg} stroke={border} />
          <rect x="244" y="256" width="60" height="10" rx="4" fill={textMuted} fillOpacity="0.5" />
          <rect x="244" y="276" width="100" height="20" rx="4" fill={textMain} fillOpacity="0.85" />
          <path d="M244 334 L276 314 L308 324 L344 296 L380 304" stroke={primaryColor} strokeWidth="3" strokeLinecap="round" />

          <rect x="416" y="236" width="176" height="122" rx="12" fill={bg} stroke={border} />
          <rect x="434" y="256" width="60" height="10" rx="4" fill={textMuted} fillOpacity="0.5" />
          <rect x="434" y="276" width="100" height="20" rx="4" fill={textMain} fillOpacity="0.85" />
          <rect x="434" y="314" width="140" height="12" rx="6" fill={secondaryColor} fillOpacity="0.3" />
          <rect x="434" y="314" width="98" height="12" rx="6" fill={secondaryColor} />
        </g>
      )}

      {layoutMode === 3 && (
        <g>
          {/* Swiss Grid / Flagship Showcase */}
          <rect x="48" y="104" width="544" height="88" rx="8" fill={bg} stroke={border} />
          <text x="68" y="142" fill={textMain} fontFamily="Inter, sans-serif" fontSize="18" fontWeight="800">
            {title.slice(0, 32)}
          </text>
          <rect x="68" y="156" width="240" height="8" rx="4" fill={textMuted} fillOpacity="0.5" />
          <rect x="464" y="128" width="108" height="36" rx="8" fill={`url(#${gradId})`} />

          {/* 4 Product / Service Columns */}
          {[0, 1, 2, 3].map((idx) => {
            const x = 48 + idx * 139;
            return (
              <g key={idx}>
                <rect x={x} y="206" width="127" height="152" rx="10" fill={bg} stroke={border} />
                <rect
                  x={x + 10}
                  y="216"
                  width="107"
                  height="72"
                  rx="6"
                  fill={idx % 2 === 0 ? primaryColor : secondaryColor}
                  fillOpacity="0.22"
                />
                <circle
                  cx={x + 63}
                  cy="252"
                  r="18"
                  fill={idx % 2 === 0 ? primaryColor : secondaryColor}
                  fillOpacity="0.55"
                />
                <rect x={x + 10} y="300" width="84" height="9" rx="4" fill={textMain} fillOpacity="0.8" />
                <rect x={x + 10} y="316" width="56" height="7" rx="3.5" fill={textMuted} fillOpacity="0.5" />
                <rect x={x + 10} y="332" width="107" height="16" rx="4" fill={primaryColor} fillOpacity="0.18" />
              </g>
            );
          })}
        </g>
      )}

      {/* Bottom Watermark-Free Authentic Badge */}
      <rect x="44" y="346" width="118" height="22" rx="6" fill="#0F172A" fillOpacity="0.85" />
      <text x="103" y="360" fill="#38BDF8" fontFamily="JetBrains Mono, monospace" fontSize="9.5" fontWeight="700" textAnchor="middle">
        {code} • {category.toUpperCase().slice(0, 7)}
      </text>
    </svg>
  );
};
