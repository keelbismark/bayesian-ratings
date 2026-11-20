import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

interface WaitingFrameProps {
  durationInFrames?: number; // default 5 seconds (150 frames at 30 fps)
  title?: string;
  subtitle?: string;
}

export const WaitingFrame: React.FC<WaitingFrameProps> = ({
  durationInFrames = 150,
  title = 'Контрольная точка для осмысления',
  subtitle = 'Попробуйте сформулировать ответ до продолжения разбора',
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

  const secondsLeft = Math.max(1, Math.ceil((durationInFrames - frame) / 30));

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 50,
        opacity,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '50px 80px',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(8, 9, 12, 0.94)',
        backdropFilter: 'blur(16px)',
      }}
    >
      {/* Top Editorial Kicker & Countdown */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: `1px solid ${THEME.colors.border}`,
          paddingBottom: 24,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
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
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: 2,
              textTransform: 'uppercase',
              fontFamily: 'Inter, system-ui, sans-serif',
              color: THEME.colors.textSecondary,
            }}
          >
            Контрольная точка · Вопрос зрителю
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span
            style={{
              fontSize: 14,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.cobalt,
              fontWeight: 600,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            0{secondsLeft}s
          </span>
          <div
            style={{
              width: 120,
              height: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${remaining * 100}%`,
                height: '100%',
                backgroundColor: THEME.colors.cobalt,
                transition: 'width 0.05s linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* Center Question Typography */}
      <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 700,
            lineHeight: 1.25,
            color: THEME.colors.textPrimary,
            letterSpacing: -0.8,
            fontFamily: 'Inter, system-ui, sans-serif',
            marginBottom: 20,
          }}
        >
          {title}
        </h2>
        <p
          style={{
            fontSize: 18,
            color: THEME.colors.textSecondary,
            lineHeight: 1.6,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Bottom Hint */}
      <div
        style={{
          borderTop: `1px solid ${THEME.colors.border}`,
          paddingTop: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: 12,
          color: THEME.colors.textMuted,
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        <span>Автоматическое возобновление через 5 секунд</span>
        <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>ПРОДОЛЖЕНИЕ РАЗБОРА →</span>
      </div>
    </div>
  );
};
