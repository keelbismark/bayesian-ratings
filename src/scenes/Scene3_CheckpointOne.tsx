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

  // Staggered reveal for the 3 stages
  const stage1Entrance = interpolate(frame, [150, 195], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const stage2Entrance = interpolate(frame, [210, 255], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const stage3Entrance = interpolate(frame, [270, 315], [0, 1], {
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

      {/* 5-second Interactive Checkpoint 1 */}
      {isPausedCheckpoint && (
        <WaitingFrame
          durationInFrames={150}
          title="Контрольная точка 1: как объединить опыт и наблюдения?"
          subtitle="Сформулируйте, какую роль играет начальное предположение до поступления первых оценок"
        />
      )}

      {/* UNBOXED 3-STAGE CONTINUOUS CANVAS */}
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
              03 / МАТЕМАТИЧЕСКИЙ ФУНДАМЕНТ · ТРИ ЭЛЕМЕНТА СИНТЕЗА
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
              Три шага байесовского обновления
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Непрерывный переход от прошлого опыта к объективной реальности эфира
            </p>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: `1px solid ${THEME.colors.border}`,
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.cobalt,
            }}
          >
            P(θ | D) ∝ P(D | θ) · P(θ)
          </div>
        </header>

        {/* 3 CONTINUOUS HORIZONTAL STAGES (NO REPETITIVE CARDS) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr auto 1fr auto 1fr',
            gap: 24,
            alignItems: 'center',
            margin: '20px 0',
            width: '100%',
          }}
        >
          {/* STAGE 1: PRIOR */}
          <div
            style={{
              opacity: stage1Entrance,
              transform: `translateY(${(1 - stage1Entrance) * 20}px)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 480,
              padding: '16px 20px',
              borderRight: `1px solid ${THEME.colors.borderSubtle}`,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted }}>
                ЭТАП 01
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, margin: '6px 0 4px 0' }}>
                Априор P(θ)
              </h2>
              <div style={{ fontSize: 13, color: THEME.colors.textSecondary, lineHeight: 1.4 }}>
                Историческая база: рейтинг похожих стримов до начала эфира (μ₀ = 4.2).
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <BellCurve
                width={460}
                height={260}
                mean={0.42}
                stdDev={0.24}
                color={THEME.colors.textSecondary}
                label="Широкая дисперсия (неопределенность)"
              />
            </div>

            <div style={{ borderTop: `1px solid ${THEME.colors.borderSubtle}`, paddingTop: 10, fontSize: 12, color: THEME.colors.textMuted }}>
              Защищает рейтинг от шоков первых секунд
            </div>
          </div>

          {/* CONNECTOR 1: PLUS SIGN */}
          <div style={{ opacity: stage2Entrance, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 24, color: THEME.colors.amber, fontWeight: 300 }}>+</span>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted, letterSpacing: 1 }}>
              ДАННЫЕ
            </span>
          </div>

          {/* STAGE 2: LIKELIHOOD */}
          <div
            style={{
              opacity: stage2Entrance,
              transform: `translateY(${(1 - stage2Entrance) * 20}px)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 480,
              padding: '16px 20px',
              borderRight: `1px solid ${THEME.colors.borderSubtle}`,
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber }}>
                ЭТАП 02
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, margin: '6px 0 4px 0' }}>
                Правдоподобие P(D|θ)
              </h2>
              <div style={{ fontSize: 13, color: THEME.colors.textSecondary, lineHeight: 1.4 }}>
                Живой поток зрительских оценок во время трансляции (x̄ = 4.75).
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <BellCurve
                width={460}
                height={260}
                mean={0.68}
                stdDev={0.16}
                color={THEME.colors.amber}
                dataPoints={[
                  { x: 0.62 },
                  { x: 0.68 },
                  { x: 0.71 },
                  { x: 0.35, isOutlier: true },
                ]}
                label="Выборка оценок текущего эфира"
              />
            </div>

            <div style={{ borderTop: `1px solid ${THEME.colors.borderSubtle}`, paddingTop: 10, fontSize: 12, color: THEME.colors.textMuted }}>
              Каждый новый голос смещает фокус модели
            </div>
          </div>

          {/* CONNECTOR 2: ARROW */}
          <div style={{ opacity: stage3Entrance, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: 24, color: THEME.colors.cobalt, fontWeight: 300 }}>⇒</span>
            <span style={{ fontSize: 10, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted, letterSpacing: 1 }}>
              СИНТЕЗ
            </span>
          </div>

          {/* STAGE 3: POSTERIOR */}
          <div
            style={{
              opacity: stage3Entrance,
              transform: `translateY(${(1 - stage3Entrance) * 20}px)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: 480,
              padding: '16px 20px',
            }}
          >
            <div>
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt }}>
                ЭТАП 03
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, margin: '6px 0 4px 0' }}>
                Апостериор P(θ|D)
              </h2>
              <div style={{ fontSize: 13, color: THEME.colors.textSecondary, lineHeight: 1.4 }}>
                Итоговый математический рейтинг с сужающимся доверительным коридором.
              </div>
            </div>

            <div style={{ width: '100%', height: 260 }}>
              <BellCurve
                width={460}
                height={260}
                mean={0.62}
                stdDev={0.09}
                color={THEME.colors.cobalt}
                showConfidenceInterval={true}
                priorOutline={{ mean: 0.42, stdDev: 0.24 }}
                label="Сжатая дисперсия: μ = 4.62 ± 0.12"
              />
            </div>

            <div style={{ borderTop: `1px solid ${THEME.colors.borderSubtle}`, paddingTop: 10, fontSize: 12, color: THEME.colors.textMuted }}>
              Узкий пик означает высокую точность
            </div>
          </div>
        </div>

        {/* BOTTOM MATHEMATICAL LAW SUMMARY */}
        <div
          style={{
            borderTop: `1px solid ${THEME.colors.border}`,
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 4,
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: THEME.colors.cobalt,
                fontSize: 12,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
              }}
            >
              ПРАВИЛО ПРИРОСТА ИНФОРМАЦИИ
            </span>
            <span style={{ fontSize: 14, color: THEME.colors.textPrimary, fontFamily: 'Inter, system-ui, sans-serif' }}>
              Точность апостериора равна сумме точности априора и точности выборки: 1/σ²_post = 1/σ²_0 + N/σ²
            </span>
          </div>

          <div style={{ fontSize: 13, color: THEME.colors.emerald, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>
            Дисперсия монотонно убывает ✓
          </div>
        </div>
      </div>
    </div>
  );
};
