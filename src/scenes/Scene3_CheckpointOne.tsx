import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { WaitingFrame } from '../components/common/WaitingFrame';
import { BellCurve } from '../components/common/BellCurve';

export const Scene3_CheckpointOne: React.FC = () => {
  const frame = useCurrentFrame();

  // 5-second interactive pause (150 frames at 30 fps)
  const isPausedCheckpoint = frame < 150;

  // Staggered card entrances
  const card1Entrance = interpolate(frame, [150, 200], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const card2Entrance = interpolate(frame, [220, 270], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const card3Entrance = interpolate(frame, [290, 340], [0, 1], {
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

      {/* 5-second Interactive Checkpoint 1 */}
      {isPausedCheckpoint && (
        <WaitingFrame
          durationInFrames={150}
          title="Контрольная точка 1: как объединить опыт и наблюдения?"
        />
      )}

      {/* Main Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 60px',
          boxSizing: 'border-box',
          width: 1920,
          height: 1080,
          overflow: 'hidden',
        }}
      >
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 500 }}>
            Фундамент байесовского анализа
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
            Три шага байесовского обновления
          </div>
        </div>

        {/* 3 Step Cards Grid */}
        <div
          style={{
            width: '100%',
            maxWidth: 1760,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 28,
            alignItems: 'stretch',
          }}
        >
          {/* STEP 1: PRIOR */}
          <div
            style={{
              opacity: card1Entrance,
              transform: `translateY(${(1 - card1Entrance) * 30}px)`,
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.8)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '28px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: THEME.colors.textSecondary,
                  fontWeight: 600,
                }}
              >
                Шаг 1: Априор
              </span>
              <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textSecondary, fontWeight: 600 }}>
                P(θ)
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
              Априорная вероятность
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
              Широкое распределение на основе прошлых эфиров. Мы ещё не уверены в сегодняшнем стриме.
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <BellCurve
                width={480}
                height={210}
                mean={0.5}
                stdDev={0.24}
                color="rgba(255, 255, 255, 0.5)"
                showConfidenceInterval
                label="Широкий априорный интервал"
              />
            </div>
          </div>

          {/* STEP 2: LIKELIHOOD */}
          <div
            style={{
              opacity: card2Entrance,
              transform: `translateY(${(1 - card2Entrance) * 30}px)`,
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.8)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              padding: '28px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(249, 115, 22, 0.1)',
                  color: THEME.colors.amber,
                  fontWeight: 600,
                }}
              >
                Шаг 2: Правдоподобие
              </span>
              <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 600 }}>
                P(D | θ)
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
              Правдоподобие наблюдений
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
              Поток реальных голосов и кликов из чата и плеера за последние минуты трансляции.
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <BellCurve
                width={480}
                height={210}
                mean={0.62}
                stdDev={0.16}
                color={THEME.colors.amber}
                dataPoints={[
                  { x: 0.58 }, { x: 0.61 }, { x: 0.63 }, { x: 0.66 }, { x: 0.22, isOutlier: true }
                ]}
                label="Точки наблюдаемых голосов"
              />
            </div>
          </div>

          {/* STEP 3: POSTERIOR */}
          <div
            style={{
              opacity: card3Entrance,
              transform: `translateY(${(1 - card3Entrance) * 30}px)`,
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.8)',
              border: '1px solid rgba(56, 189, 248, 0.4)',
              padding: '28px 28px',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span
                style={{
                  fontSize: 12,
                  padding: '4px 10px',
                  borderRadius: 4,
                  backgroundColor: 'rgba(56, 189, 248, 0.12)',
                  color: THEME.colors.cobalt,
                  fontWeight: 600,
                }}
              >
                Шаг 3: Апостериор
              </span>
              <span style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt, fontWeight: 600 }}>
                P(θ | D)
              </span>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
              Апостериорная оценка
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
              Обновлённая узкая кривая: неопределённость снизилась, рейтинг скорректирован с учётом данных.
            </div>

            <div style={{ marginTop: 20, display: 'flex', justifyContent: 'center' }}>
              <BellCurve
                width={480}
                height={210}
                mean={0.59}
                stdDev={0.09}
                color={THEME.colors.cobalt}
                showConfidenceInterval
                label="Сконцентрированное распределение"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
