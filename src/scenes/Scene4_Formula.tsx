import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { BellCurve } from '../components/common/BellCurve';

export const Scene4_Formula: React.FC = () => {
  const frame = useCurrentFrame();

  // Sequential term reveals
  const term1 = interpolate(frame, [20, 60], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const term2 = interpolate(frame, [70, 110], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const term3 = interpolate(frame, [120, 160], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const synthesisEntrance = interpolate(frame, [200, 260], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bg,
        overflow: 'hidden',
      }}
    >
      <BackgroundGrid intensity={1} />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 100px',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: 50 }}>
          <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted, letterSpacing: 2 }}>
            SECTION 04 // MATHEMATICAL BLUEPRINT
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
            Формула байесовского взвешивания
          </div>
        </div>

        {/* ELEGANT MATHEMATICAL EQUATION CARD: POSTERIOR ∝ LIKELIHOOD × PRIOR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            padding: '36px 64px',
            borderRadius: 20,
            backgroundColor: 'rgba(21, 29, 46, 0.85)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.5)',
            marginBottom: 50,
          }}
        >
          {/* TERM 1: POSTERIOR */}
          <div
            style={{
              opacity: term1,
              transform: `scale(${0.95 + term1 * 0.05})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt, marginBottom: 8 }}>
              НОВЫЙ РЕЙТИНГ
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: THEME.colors.cobalt,
                fontFamily: 'JetBrains Mono, monospace',
                padding: '12px 24px',
                borderRadius: 10,
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              P(θ | D)
            </div>
          </div>

          <div style={{ fontSize: 38, color: THEME.colors.textMuted, fontWeight: 300, margin: '0 8px' }}>
            ∝
          </div>

          {/* TERM 2: LIKELIHOOD */}
          <div
            style={{
              opacity: term2,
              transform: `scale(${0.95 + term2 * 0.05})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, marginBottom: 8 }}>
              СВЕЖИЕ ГОЛОСА
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: THEME.colors.amber,
                fontFamily: 'JetBrains Mono, monospace',
                padding: '12px 24px',
                borderRadius: 10,
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.3)',
              }}
            >
              P(D | θ)
            </div>
          </div>

          <div style={{ fontSize: 32, color: THEME.colors.textMuted, fontWeight: 300, margin: '0 8px' }}>
            ×
          </div>

          {/* TERM 3: PRIOR */}
          <div
            style={{
              opacity: term3,
              transform: `scale(${0.95 + term3 * 0.05})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textSecondary, marginBottom: 8 }}>
              ИСТОРИЧЕСКИЙ ОПЫТ
            </div>
            <div
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                fontFamily: 'JetBrains Mono, monospace',
                padding: '12px 24px',
                borderRadius: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
              }}
            >
              P(θ)
            </div>
          </div>
        </div>

        {/* BOTTOM SYNTHESIS: COMBINED GAUSSIAN UPDATE */}
        <div
          style={{
            opacity: synthesisEntrance,
            transform: `translateY(${(1 - synthesisEntrance) * 20}px)`,
            width: '100%',
            maxWidth: 1600,
            borderRadius: 18,
            backgroundColor: 'rgba(21, 29, 46, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '28px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ maxWidth: 500 }}>
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textPrimary }}>
              Суть формулы простыми словами:
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 8, lineHeight: 1.6 }}>
              Чем больше поступает новых проверенных голосов, тем сильнее формула смещает оценку в сторону реальных наблюдений. При малом числе голосов — удерживает стабильный априорный ориентир.
            </div>
          </div>

          <BellCurve
            width={750}
            height={220}
            mean={0.56}
            stdDev={0.11}
            color={THEME.colors.cobalt}
            priorOutline={{ mean: 0.48, stdDev: 0.22 }}
            showConfidenceInterval
            label="Пунктир = Априор | Синий = Обновленный апостериор"
          />
        </div>
      </div>
    </div>
  );
};
