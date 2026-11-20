import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';

export const Scene4_Formula: React.FC = () => {
  const frame = useCurrentFrame();

  // Sequential mathematical term reveals
  const termPosterior = interpolate(frame, [15, 45], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const termLikelihood = interpolate(frame, [50, 80], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const termPrior = interpolate(frame, [85, 115], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const gaussianSolution = interpolate(frame, [150, 200], [0, 1], {
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
        width: 1920,
        height: 1080,
      }}
    >
      <BackgroundGrid intensity={1} />

      {/* UNBOXED MATHEMATICAL EDITORIAL CANVAS */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 80px 40px 80px',
          boxSizing: 'border-box',
        }}
      >
        {/* MASTHEAD HEADER */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: `1px solid ${THEME.colors.border}`,
            paddingBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: THEME.colors.cobalt,
                marginBottom: 8,
              }}
            >
              04 / ТЕОРЕМА БАЙЕСА · ТОЧНАЯ АНАЛИТИЧЕСКАЯ ФОРМА
            </div>
            <h1
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                letterSpacing: -0.8,
                margin: 0,
                lineHeight: 1.2,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Формула байесовского взвешивания
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Математический закон пропорционального сложения опыта и новых свидетельств
            </p>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: `1px solid ${THEME.colors.border}`,
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.emerald,
            }}
          >
            ТОЧНОЕ РЕШЕНИЕ (БЕЗ MCMC)
          </div>
        </header>

        {/* ELEGANT TYPOGRAPHIC EQUATION (UNBOXED) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '20px 0',
          }}
        >
          {/* Main Formula Line */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 36,
              fontSize: 54,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.textPrimary,
            }}
          >
            {/* Term 1: Posterior */}
            <div
              style={{
                opacity: termPosterior,
                transform: `scale(${0.96 + termPosterior * 0.04})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: THEME.colors.cobalt, fontWeight: 700 }}>
                P(θ | D)
              </span>
              <div
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: THEME.colors.cobalt,
                  margin: '10px 0 6px 0',
                  opacity: 0.5,
                }}
              />
              <span style={{ fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.cobalt, fontWeight: 600 }}>
                Апостериор
              </span>
              <span style={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.textMuted }}>
                Обновленный рейтинг
              </span>
            </div>

            {/* Proportional Sign */}
            <span style={{ color: THEME.colors.textMuted, fontSize: 44, fontWeight: 300, marginBottom: 40 }}>
              ∝
            </span>

            {/* Term 2: Likelihood */}
            <div
              style={{
                opacity: termLikelihood,
                transform: `scale(${0.96 + termLikelihood * 0.04})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: THEME.colors.amber, fontWeight: 700 }}>
                P(D | θ)
              </span>
              <div
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: THEME.colors.amber,
                  margin: '10px 0 6px 0',
                  opacity: 0.5,
                }}
              />
              <span style={{ fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.amber, fontWeight: 600 }}>
                Правдоподобие
              </span>
              <span style={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.textMuted }}>
                Текущие оценки эфира
              </span>
            </div>

            {/* Multiply Sign */}
            <span style={{ color: THEME.colors.textMuted, fontSize: 36, fontWeight: 300, marginBottom: 40 }}>
              ×
            </span>

            {/* Term 3: Prior */}
            <div
              style={{
                opacity: termPrior,
                transform: `scale(${0.96 + termPrior * 0.04})`,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <span style={{ color: THEME.colors.textSecondary, fontWeight: 700 }}>
                P(θ)
              </span>
              <div
                style={{
                  width: '100%',
                  height: 1,
                  backgroundColor: THEME.colors.textMuted,
                  margin: '10px 0 6px 0',
                  opacity: 0.5,
                }}
              />
              <span style={{ fontSize: 13, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.textSecondary, fontWeight: 600 }}>
                Априор
              </span>
              <span style={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.textMuted }}>
                Историческая база
              </span>
            </div>
          </div>

          {/* GAUSSIAN CLOSED-FORM UPDATE RULE (HIGH-END EDITORIAL REVEAL) */}
          <div
            style={{
              opacity: gaussianSolution,
              transform: `translateY(${(1 - gaussianSolution) * 20}px)`,
              marginTop: 48,
              width: '100%',
              maxWidth: 1200,
              borderTop: `1px solid ${THEME.colors.border}`,
              paddingTop: 32,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt, letterSpacing: 1 }}>
                ГАУССОВСКОЕ СОПРЯЖЕННОЕ РЕШЕНИЕ
              </div>
              <div style={{ fontSize: 26, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textPrimary, marginTop: 8, fontWeight: 600 }}>
                μ_post = ( μ₀ / σ₀² + N · x̄ / σ² ) / ( 1 / σ₀² + N / σ² )
              </div>
              <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 10, lineHeight: 1.5, fontFamily: 'Inter, system-ui, sans-serif' }}>
                Каждый источник голосует своим весом, равным точности (1 / σ²).<br />
                Больше объем выборки N — тем сильнее вес наблюдаемых данных x̄.
              </div>
            </div>

            <div
              style={{
                borderLeft: `1px solid ${THEME.colors.borderSubtle}`,
                paddingLeft: 40,
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
              }}
            >
              <div>
                <div style={{ fontSize: 11, color: THEME.colors.textMuted, textTransform: 'uppercase' }}>
                  Сложность вычисления
                </div>
                <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.emerald, fontFamily: 'JetBrains Mono, monospace' }}>
                  O(1) · 0.05 мс
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: THEME.colors.textMuted, textTransform: 'uppercase' }}>
                  Применимость
                </div>
                <div style={{ fontSize: 14, color: THEME.colors.textSecondary }}>
                  Мгновенный real-time расчет
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM PHILOSOPHICAL LAW FOOTER */}
        <div
          style={{
            borderTop: `1px solid ${THEME.colors.border}`,
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: THEME.colors.textSecondary,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <span>
            При N → 0 рейтинг строго равен априору μ₀. При N → ∞ рейтинг стремится к истинному среднему зрителей x̄.
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt }}>
            НЕПРЕРЫВНЫЙ БАЛАНС →
          </span>
        </div>
      </div>
    </div>
  );
};
