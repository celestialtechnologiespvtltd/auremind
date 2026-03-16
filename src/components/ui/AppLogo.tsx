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
  className = '',
  onClick,
}: AppLogoProps) {
  return (
    <div
      className={`flex items-center ${onClick ? 'cursor-pointer hover:opacity-85 transition-opacity' : ''} ${className}`}
      onClick={onClick}
    >
      {/* Logo Image Only */}
      <img
        src="/assets/images/ChatGPT_Image_Mar_16__2026__04_44_37_PM-1773661537529.png"
        alt="AureMind logo"
        className="h-32 sm:h-36 md:h-40 w-auto object-contain flex-shrink-0"
      />
    </div>
  );
});

export default AppLogo;
