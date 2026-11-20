import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { WaitingFrame } from '../components/common/WaitingFrame';
import { BellCurve } from '../components/common/BellCurve';

export const Scene5_CheckpointTwo: React.FC = () => {
  const frame = useCurrentFrame();

  const isPausedCheckpoint = frame < 150;

  // Comparison animation entrance
  const comparisonEntrance = interpolate(frame, [150, 200], [0, 1], {
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

      {/* 5-second Interactive Checkpoint 2 */}
      {isPausedCheckpoint && (
        <WaitingFrame
          durationInFrames={150}
          title="Контрольная точка 2: сколько голосов нужно, чтобы перевесить априорный опыт?"
          subtitle="Подумайте, нужен ли искусственный порог или математика регулирует баланс сама"
        />
      )}

      {/* UNBOXED COMPARISON CANVAS */}
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
              05 / МАСШТАБ ВЫБОРКИ · САМОРЕГУЛЯЦИЯ БАЙЕСА
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
              Автоматическое взвешивание объёма данных
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Плавный самонастраивающийся переход от защиты от шума к полной демократии данных
            </p>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: `1px solid ${THEME.colors.border}`,
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.textMuted,
            }}
          >
            N = 10 vs N = 10 000
          </div>
        </header>

        {/* 2 OPEN COLUMNS COMPARISON (UNBOXED) */}
        <div
          style={{
            opacity: comparisonEntrance,
            transform: `translateY(${(1 - comparisonEntrance) * 20}px)`,
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
            position: 'relative',
            margin: '20px 0',
          }}
        >
          {/* Vertical Divider Line */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              bottom: '5%',
              left: '50%',
              width: 1,
              backgroundColor: THEME.colors.border,
            }}
          />

          {/* SCENARIO A: SMALL SAMPLE N = 10 */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingRight: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: THEME.colors.amber,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  Сценарий А · Малая выборка
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textMuted, fontFamily: 'JetBrains Mono, monospace' }}>
                  N = 10
                </span>
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  marginTop: 10,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: -0.5,
                }}
              >
                Априор удерживает центр тяжести
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                10 случайных оценок не могут разрушить исторический ориентир. Рейтинг смещается аккуратно, оберегая зрителей от волатильности.
              </p>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <BellCurve
                width={700}
                height={260}
                mean={0.44}
                stdDev={0.18}
                color={THEME.colors.amber}
                priorOutline={{ mean: 0.40, stdDev: 0.22 }}
                showConfidenceInterval={true}
                label="Апостериор (μ = 4.12) привязан к априору (μ₀ = 4.0)"
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${THEME.colors.borderSubtle}`,
                paddingTop: 12,
                fontSize: 12,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <span style={{ color: THEME.colors.textMuted }}>ВЕС АПРИОРА: 82%</span>
              <span style={{ color: THEME.colors.amber }}>ВЕС ДАННЫХ: 18%</span>
            </div>
          </div>

          {/* SCENARIO B: LARGE SAMPLE N = 10,000 */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingLeft: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: THEME.colors.emerald,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  Сценарий Б · Массовая выборка
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textMuted, fontFamily: 'JetBrains Mono, monospace' }}>
                  N = 10 000
                </span>
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  marginTop: 10,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: -0.5,
                }}
              >
                Данные полностью подчиняют себе модель
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Когда голосуют тысячи, влияние начального априора стремится к нулю. Дисперсия сжимается в тончайшую иглу точной истины.
              </p>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <BellCurve
                width={700}
                height={260}
                mean={0.72}
                stdDev={0.045}
                color={THEME.colors.emerald}
                priorOutline={{ mean: 0.40, stdDev: 0.22 }}
                showConfidenceInterval={true}
                label="Игольчатый апостериор: μ = 4.82 ± 0.02"
              />
            </div>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                borderTop: `1px solid ${THEME.colors.borderSubtle}`,
                paddingTop: 12,
                fontSize: 12,
                fontFamily: 'JetBrains Mono, monospace',
              }}
            >
              <span style={{ color: THEME.colors.textMuted }}>ВЕС АПРИОРА: 0.1%</span>
              <span style={{ color: THEME.colors.emerald }}>ВЕС ДАННЫХ: 99.9%</span>
            </div>
          </div>
        </div>

        {/* BOTTOM INSIGHT FOOTER */}
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
            Разработчику не требуется писать условные конструкции `if (count &lt; 50)`. Математика выполняет непрерывное взвешивание автоматически.
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.emerald }}>
            САМОНАСТРАИВАЕМЫЙ ВЕС ✓
          </span>
        </div>
      </div>
    </div>
  );
};
