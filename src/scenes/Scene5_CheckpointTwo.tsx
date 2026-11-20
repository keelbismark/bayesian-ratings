import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { WaitingFrame } from '../components/common/WaitingFrame';
import { BellCurve } from '../components/common/BellCurve';

export const Scene5_CheckpointTwo: React.FC = () => {
  const frame = useCurrentFrame();

  const isPausedCheckpoint = frame < 150;

  // Comparison animation progression
  const comparisonEntrance = interpolate(frame, [150, 210], [0, 1], {
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

      {/* 5-second Interactive Checkpoint 2 */}
      {isPausedCheckpoint && (
        <WaitingFrame
          durationInFrames={150}
          title="Контрольная точка 2: сколько голосов нужно, чтобы перевесить априорный опыт?"
        />
      )}

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
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 500 }}>
            Раздел 5 · Масштаб выборки и вес данных
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
            Автоматическое взвешивание объёма данных
          </div>
        </div>

        {/* 2 Scenarios Split Screen: N = 10 vs N = 10,000 */}
        <div
          style={{
            opacity: comparisonEntrance,
            transform: `translateY(${(1 - comparisonEntrance) * 20}px)`,
            width: '100%',
            maxWidth: 2200,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 40,
          }}
        >
          {/* SCENARIO A: SMALL SAMPLE N = 10 */}
          <div
            style={{
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.8)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  padding: '4px 10px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(249, 115, 22, 0.1)',
                  color: THEME.colors.amber,
                  fontWeight: 600,
                }}
              >
                Сценарий А: малая выборка
              </span>
              <span style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 700 }}>
                N = 10 голосов
              </span>
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 14 }}>
              Доминирует априорная оценка (85%)
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
              Случайные 10 оценок не могут разрушить репутацию трансляции. Система страхует от локального троллинга и скачков.
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <BellCurve
                width={700}
                height={240}
                mean={0.52}
                stdDev={0.21}
                color={THEME.colors.amber}
                priorOutline={{ mean: 0.5, stdDev: 0.22 }}
                showConfidenceInterval
                label="Широкий интервал: вес данных мал"
              />
            </div>
          </div>

          {/* SCENARIO B: LARGE SAMPLE N = 10,000 */}
          <div
            style={{
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              padding: 36,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 12,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  padding: '4px 10px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  color: THEME.colors.cobalt,
                  fontWeight: 600,
                }}
              >
                Сценарий Б: массовый эфир
              </span>
              <span style={{ fontSize: 14, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt, fontWeight: 700 }}>
                N = 10 000 голосов
              </span>
            </div>

            <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 14 }}>
              Доминируют свежие данные (98%)
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
              Огромная масса наблюдений сжимает неопределённость до минимума. Рейтинг точно следует за мнением многотысячной аудитории.
            </div>

            <div style={{ marginTop: 24, display: 'flex', justifyContent: 'center' }}>
              <BellCurve
                width={700}
                height={240}
                mean={0.68}
                stdDev={0.06}
                color={THEME.colors.cobalt}
                priorOutline={{ mean: 0.5, stdDev: 0.22 }}
                showConfidenceInterval
                label="Узкий интервал: высокая точность"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
