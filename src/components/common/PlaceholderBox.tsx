import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

interface PlaceholderBoxProps {
  width: number | string;
  height: number | string;
  variant?: 'card' | 'outline' | 'dashed' | 'pill' | 'number';
  accent?: 'blue' | 'coral' | 'neutral';
  pulse?: boolean;
  glow?: boolean;
  cornerMarks?: boolean;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export const PlaceholderBox: React.FC<PlaceholderBoxProps> = ({
  width,
  height,
  variant = 'card',
  accent = 'blue',
  pulse = false,
  glow = false,
  cornerMarks = false,
  children,
  style = {},
}) => {
  const frame = useCurrentFrame();

  const accentColor =
    accent === 'coral'
      ? THEME.colors.warmCoral
      : accent === 'neutral'
      ? 'rgba(255, 255, 255, 0.4)'
      : THEME.colors.electricBlue;

  const accentGlow =
    accent === 'coral'
      ? THEME.colors.warmCoralGlow
      : THEME.colors.electricBlueGlow;

  const pulseOpacity = pulse
    ? interpolate(Math.sin(frame * 0.1), [-1, 1], [0.65, 1])
    : 1;

  const pulseScale = pulse
    ? interpolate(Math.sin(frame * 0.1), [-1, 1], [0.99, 1.01])
    : 1;

  const getBorder = () => {
    if (variant === 'dashed') return `3px dashed ${accentColor}`;
    if (variant === 'outline') return `3px solid ${accentColor}`;
    return `2px solid ${accentColor}55`;
  };

  const getBackground = () => {
    if (variant === 'outline' || variant === 'dashed') return 'transparent';
    if (variant === 'number') return 'rgba(19, 34, 56, 0.85)';
    return 'rgba(19, 34, 56, 0.7)';
  };

  const borderRadius = variant === 'pill' ? 9999 : 16;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius,
        border: getBorder(),
        backgroundColor: getBackground(),
        backdropFilter: 'blur(12px)',
        boxShadow: glow
          ? `0 0 35px ${accentGlow}, inset 0 0 20px ${accentGlow}`
          : '0 12px 32px rgba(0, 0, 0, 0.35)',
        opacity: pulseOpacity,
        transform: `scale(${pulseScale})`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Corner Registration Marks (Technical Aesthetic) */}
      {cornerMarks && (
        <>
          <div
            style={{
              position: 'absolute',
              top: 6,
              left: 6,
              width: 12,
              height: 12,
              borderTop: `2px solid ${accentColor}`,
              borderLeft: `2px solid ${accentColor}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              top: 6,
              right: 6,
              width: 12,
              height: 12,
              borderTop: `2px solid ${accentColor}`,
              borderRight: `2px solid ${accentColor}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 6,
              left: 6,
              width: 12,
              height: 12,
              borderBottom: `2px solid ${accentColor}`,
              borderLeft: `2px solid ${accentColor}`,
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: 6,
              right: 6,
              width: 12,
              height: 12,
              borderBottom: `2px solid ${accentColor}`,
              borderRight: `2px solid ${accentColor}`,
            }}
          />
        </>
      )}

      {/* Internal placeholder line / wireframe bar if no children */}
      {!children && (
        <div
          style={{
            width: '60%',
            height: '18%',
            minHeight: 8,
            maxHeight: 18,
            borderRadius: 6,
            background: `linear-gradient(90deg, ${accentColor}22 0%, ${accentColor}55 50%, ${accentColor}22 100%)`,
          }}
        />
      )}

      {children}
    </div>
  );
};
