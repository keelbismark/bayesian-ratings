import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

interface WaitingFrameProps {
  durationInFrames?: number; // default 5 seconds (150 frames at 30 fps)
  title?: string;
}

export const WaitingFrame: React.FC<WaitingFrameProps> = ({
  durationInFrames = 150,
}) => {
  const frame = useCurrentFrame();

  if (frame >= durationInFrames) {
    return null;
  }

  // Smooth fade-in and fade-out of the waiting frame
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Gentle pulsing glow
  const pulse = interpolate(
    Math.sin((frame * Math.PI * 2) / 30),
    [-1, 1],
    [0.75, 1.1]
  );

  // Progress of the 5-second checkpoint (0 to 1)
  const progress = interpolate(frame, [0, durationInFrames], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        opacity,
      }}
    >
      {/* Outer pulsing checkpoint boundary */}
      <div
        style={{
          position: 'absolute',
          inset: 32,
          borderRadius: 28,
          border: `3px solid ${THEME.colors.electricBlue}`,
          boxShadow: `0 0 ${40 * pulse}px ${THEME.colors.electricBlueGlow}, inset 0 0 ${30 * pulse}px ${THEME.colors.electricBlueSubtle}`,
          transition: 'box-shadow 0.1s ease',
        }}
      />

      {/* Top indicator badge: Interactive checkpoint placeholder */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '12px 28px',
          borderRadius: 9999,
          backgroundColor: 'rgba(13, 27, 42, 0.9)',
          border: `2px solid ${THEME.colors.electricBlue}`,
          boxShadow: `0 0 24px ${THEME.colors.electricBlueGlow}`,
        }}
      >
        {/* Pulsing indicator dot */}
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            backgroundColor: THEME.colors.warmCoral,
            boxShadow: `0 0 16px ${THEME.colors.warmCoralGlow}`,
            transform: `scale(${pulse})`,
          }}
        />

        {/* 5-sec progress bar pill */}
        <div
          style={{
            width: 160,
            height: 8,
            borderRadius: 4,
            backgroundColor: 'rgba(255, 255, 255, 0.15)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${(1 - progress) * 100}%`,
              height: '100%',
              backgroundColor: THEME.colors.electricBlue,
              boxShadow: `0 0 10px ${THEME.colors.electricBlue}`,
            }}
          />
        </div>
      </div>

      {/* Corner bracket accents */}
      <div
        style={{
          position: 'absolute',
          bottom: 56,
          right: 56,
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 20px',
          borderRadius: 12,
          backgroundColor: 'rgba(13, 27, 42, 0.8)',
          border: `1.5px solid ${THEME.colors.electricBlueSubtle}`,
        }}
      >
        <div
          style={{
            width: 100,
            height: 12,
            borderRadius: 6,
            background: `linear-gradient(90deg, ${THEME.colors.electricBlue} 0%, transparent 100%)`,
            opacity: 0.7,
          }}
        />
      </div>
    </div>
  );
};
