import React from 'react';
import { THEME } from '../../theme';

interface PlaceholderBoxProps {
  width: number | string;
  height: number | string;
  variant?: 'card' | 'outline' | 'dashed' | 'pill' | 'number';
  accent?: 'blue' | 'coral' | 'neutral' | 'emerald';
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
  children,
  style = {},
}) => {
  const accentBorder =
    accent === 'coral'
      ? 'rgba(249, 115, 22, 0.4)'
      : accent === 'emerald'
      ? 'rgba(16, 185, 129, 0.4)'
      : accent === 'neutral'
      ? 'rgba(255, 255, 255, 0.08)'
      : 'rgba(56, 189, 248, 0.3)';

  const getBorder = () => {
    if (variant === 'dashed') return `1px dashed ${accentBorder}`;
    if (variant === 'outline') return `1px solid ${accentBorder}`;
    return `1px solid ${accentBorder}`;
  };

  const getBackground = () => {
    if (variant === 'outline' || variant === 'dashed') return 'transparent';
    if (variant === 'pill') return 'rgba(17, 24, 38, 0.85)';
    return 'rgba(21, 29, 46, 0.8)';
  };

  const borderRadius = variant === 'pill' ? 9999 : 14;

  return (
    <div
      style={{
        position: 'relative',
        width,
        height,
        borderRadius,
        border: getBorder(),
        backgroundColor: getBackground(),
        backdropFilter: 'blur(16px)',
        boxShadow: '0 8px 30px rgba(0, 0, 0, 0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        boxSizing: 'border-box',
        ...style,
      }}
    >
      {/* Internal clean technical placeholder bar if no custom content */}
      {!children && (
        <div
          style={{
            width: '65%',
            height: '14%',
            minHeight: 6,
            maxHeight: 12,
            borderRadius: 4,
            backgroundColor:
              accent === 'coral'
                ? 'rgba(249, 115, 22, 0.25)'
                : 'rgba(56, 189, 248, 0.25)',
          }}
        />
      )}

      {children}
    </div>
  );
};
