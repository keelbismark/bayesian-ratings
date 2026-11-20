import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

interface BackgroundGridProps {
  intensity?: number;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({ intensity = 1 }) => {
  const frame = useCurrentFrame();

  // Deterministic floating ambient particles
  const particles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      x: ((i * 137.5) % 100),
      y: ((i * 223.3) % 100),
      size: (i % 3) * 2 + 2,
      speed: 0.15 + (i % 5) * 0.08,
      baseOpacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  // Subtle ambient breathing light
  const ambientPulse = interpolate(
    Math.sin(frame / 60),
    [-1, 1],
    [0.85, 1.15]
  );

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
      {/* Background radial glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '25%',
          width: '50vw',
          height: '50vh',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.colors.electricBlueGlow} 0%, rgba(13, 27, 42, 0) 70%)`,
          filter: 'blur(120px)',
          opacity: 0.35 * intensity * ambientPulse,
          transform: `scale(${ambientPulse})`,
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '15%',
          right: '20%',
          width: '45vw',
          height: '45vh',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${THEME.colors.warmCoralGlow} 0%, rgba(13, 27, 42, 0) 70%)`,
          filter: 'blur(140px)',
          opacity: 0.2 * intensity,
        }}
      />

      {/* SVG Technical Grid */}
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.7 * intensity,
        }}
      >
        <defs>
          <pattern
            id="dense-grid"
            width="80"
            height="80"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 80 0 L 0 0 0 80"
              fill="none"
              stroke={THEME.colors.gridLine}
              strokeWidth="1.5"
            />
          </pattern>
          <pattern
            id="major-grid"
            width="320"
            height="320"
            patternUnits="userSpaceOnUse"
          >
            <rect width="320" height="320" fill="url(#dense-grid)" />
            <path
              d="M 320 0 L 0 0 0 320"
              fill="none"
              stroke="rgba(78, 168, 222, 0.08)"
              strokeWidth="2.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#major-grid)" />
      </svg>

      {/* Ambient floating data particles */}
      {particles.map((p) => {
        const floatY = (p.y - (frame * p.speed * 0.05)) % 100;
        const currentY = floatY < 0 ? floatY + 100 : floatY;
        const pulse = interpolate(
          Math.sin((frame * 0.05) + p.id),
          [-1, 1],
          [0.6, 1.2]
        );

        return (
          <div
            key={p.id}
            style={{
              position: 'absolute',
              left: `${p.x}%`,
              top: `${currentY}%`,
              width: p.size * 2,
              height: p.size * 2,
              borderRadius: '50%',
              backgroundColor: p.id % 2 === 0 ? THEME.colors.electricBlue : THEME.colors.warmCoral,
              opacity: p.baseOpacity * pulse * intensity,
              boxShadow: `0 0 10px ${p.id % 2 === 0 ? THEME.colors.electricBlueGlow : THEME.colors.warmCoralGlow}`,
            }}
          />
        );
      })}

      {/* Vignette Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 40%, rgba(5, 10, 18, 0.85) 100%)',
        }}
      />
    </div>
  );
};
