import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

interface WaitingFrameProps {
  durationInFrames?: number; // default 5 seconds (150 frames at 30 fps)
  title?: string;
}

export const WaitingFrame: React.FC<WaitingFrameProps> = ({
  durationInFrames = 150,
  title = 'ИНТЕРАКТИВНАЯ ПАУЗА ДЛЯ РАЗМЫШЛЕНИЯ',
}) => {
  const frame = useCurrentFrame();

  if (frame >= durationInFrames) {
    return null;
  }

  // Smooth fade-in and fade-out
  const opacity = interpolate(
    frame,
    [0, 15, durationInFrames - 15, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Remaining progress (1 to 0)
  const remaining = interpolate(frame, [0, durationInFrames], [1, 0], {
    extrapolateRight: 'clamp',
  });

  const secondsLeft = Math.max(1, Math.ceil(((durationInFrames - frame) / 30)));

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
      {/* Precision hairline frame around canvas */}
      <div
        style={{
          position: 'absolute',
          inset: 36,
          borderRadius: 20,
          border: '1px solid rgba(56, 189, 248, 0.3)',
          boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.4)',
        }}
      />

      {/* Top Editorial Status Pill */}
      <div
        style={{
          position: 'absolute',
          top: 56,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 18,
          padding: '10px 24px',
          borderRadius: 9999,
          backgroundColor: '#0F1626',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Pulsing subtle dot */}
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            backgroundColor: THEME.colors.amber,
          }}
        />

        <span
          style={{
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 2,
            color: THEME.colors.textPrimary,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </span>

        {/* Seconds countdown badge */}
        <span
          style={{
            fontSize: 13,
            fontWeight: 700,
            color: THEME.colors.cobalt,
            fontFamily: 'JetBrains Mono, monospace',
            padding: '2px 8px',
            borderRadius: 6,
            backgroundColor: 'rgba(56, 189, 248, 0.12)',
            border: '1px solid rgba(56, 189, 248, 0.25)',
          }}
        >
          0{secondsLeft}s
        </span>

        {/* Progress line */}
        <div
          style={{
            width: 100,
            height: 4,
            borderRadius: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: `${remaining * 100}%`,
              height: '100%',
              backgroundColor: THEME.colors.cobalt,
            }}
          />
        </div>
      </div>
    </div>
  );
};
