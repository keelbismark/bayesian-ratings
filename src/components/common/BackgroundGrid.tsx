import React from 'react';
import { THEME } from '../../theme';

interface BackgroundGridProps {
  intensity?: number;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({ intensity = 1 }) => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bg,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {/* Precision architectural dot matrix (Stripe / Bloomberg style) */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.5 * intensity,
        }}
      >
        <defs>
          <pattern
            id="clean-dot-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="32" cy="32" r="1.0" fill={THEME.colors.gridDot} />
          </pattern>

          {/* Precision hairline grid every 240px */}
          <pattern
            id="precision-grid"
            width="240"
            height="240"
            patternUnits="userSpaceOnUse"
          >
            <rect width="240" height="240" fill="url(#clean-dot-grid)" />
            <path
              d="M 240 0 L 0 0 0 240"
              fill="none"
              stroke="rgba(255, 255, 255, 0.02)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#precision-grid)" />
      </svg>
    </div>
  );
};
