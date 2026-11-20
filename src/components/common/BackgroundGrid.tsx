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
      {/* Subtle, soft ambient vignette to draw attention to center stage */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 40%, rgba(17, 24, 39, 0.4) 0%, rgba(10, 14, 23, 0.95) 100%)',
        }}
      />

      {/* High-precision architectural dot matrix (Stripe / Linear style) */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.6 * intensity,
        }}
      >
        <defs>
          <pattern
            id="clean-dot-grid"
            width="64"
            height="64"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="32" cy="32" r="1.25" fill={THEME.colors.gridDot} />
          </pattern>

          {/* Precision hairline grid every 320px */}
          <pattern
            id="precision-grid"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            <rect width="320" height="320" fill="url(#clean-dot-grid)" />
            <path
              d="M 320 0 L 0 0 0 320"
              fill="none"
              stroke="rgba(255, 255, 255, 0.025)"
              strokeWidth="1"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#precision-grid)" />
      </svg>
    </div>
  );
};
