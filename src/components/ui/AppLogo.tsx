'use client';

import React, { memo } from 'react';

interface AppLogoProps {
  size?: number;
  className?: string;
  onClick?: () => void;
  showTagline?: boolean;
  showName?: boolean;
  compact?: boolean;
}

const AppLogo = memo(function AppLogo({
  size = 36,
  className = '',
  onClick,
  showTagline = false,
  showName = true,
  compact = false,
}: AppLogoProps) {
  const iconSize = size;

  return (
    <div
      className={`flex items-center gap-2.5 ${onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Logo Image */}
      <div className="flex-shrink-0 relative" style={{ width: iconSize, height: iconSize }}>
        <img
          src="/assets/images/ChatGPT_Image_Mar_16__2026__04_53_43_PM-1773660498579.png"
          alt="AureMind logo"
          style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
        />
      </div>

      {/* Brand text */}
      {showName && (
        <div className="flex flex-col leading-none">
          <span
            className="font-nunito font-extrabold tracking-tight"
            style={{
              fontSize: compact ? '1rem' : '1.2rem',
              background: 'linear-gradient(135deg, #6b21a8 0%, #7c3aed 50%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              lineHeight: 1.1,
            }}
          >
            AureMind
          </span>
          {showTagline && (
            <span
              className="font-dm font-medium tracking-widest uppercase"
              style={{
                fontSize: '0.45rem',
                color: '#7c3aed',
                opacity: 0.7,
                letterSpacing: '0.12em',
                marginTop: '2px',
              }}
            >
              Elevate Your Mind · Embrace Your Calm
            </span>
          )}
        </div>
      )}
    </div>
  );
});

export default AppLogo;
