import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { WaitingFrame } from '../components/common/WaitingFrame';

export const Scene7_CheckpointThree: React.FC = () => {
  const frame = useCurrentFrame();

  const isPausedCheckpoint = frame < 150;

  // Comparison curve values
  const curvePoints = Array.from({ length: 40 }).map((_, i) => {
    const t = i / 39;
    const x = t * 1100;
    // Raw noisy rating
    const rawY = 160 + Math.sin(i * 1.4) * 55 + (i % 3 === 0 ? 40 : -35);
    // Smooth bayesian rating
    const bayesY = 160 + Math.sin(t * Math.PI) * 15;
    return { x, rawY, bayesY };
  });

  const rawPath = curvePoints.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.rawY.toFixed(1)}`, '');
  const bayesPath = curvePoints.reduce((acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.bayesY.toFixed(1)}`, '');

  const reveal = interpolate(frame, [150, 450], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
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

      {/* 5-second Interactive Checkpoint 3 */}
      {isPausedCheckpoint && (
        <WaitingFrame
          durationInFrames={150}
          title="КОНТРОЛЬНАЯ ТОЧКА 3 // ЧТО ВИДИТ ЗРИТЕЛЬ: ДИКИЕ СКАЧКИ ИЛИ СТАБИЛЬНЫЙ РЕЙТИНГ?"
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
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted, letterSpacing: 2 }}>
            SECTION 07 // EMPIRICAL PRODUCTION BENCHMARK
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
            Практический результат на реальном эфире
          </div>
        </div>

        {/* Big Comparative Dashboard: Raw Average vs Bayesian */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            borderRadius: 18,
            backgroundColor: 'rgba(21, 29, 46, 0.8)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '36px 48px',
            marginBottom: 36,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted }}>
                LIVE COMPARISON DUAL-TRACK (40 MIN BROADCAST)
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 4 }}>
                Сырое среднее (оранжевый) против Байесовской оценки (синий)
              </div>
            </div>

            <div style={{ display: 'flex', gap: 24 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: THEME.colors.amber, fontFamily: 'JetBrains Mono, monospace' }}>
                <span style={{ width: 14, height: 3, backgroundColor: THEME.colors.amber }} />
                СЫРОЕ СРЕДНЕЕ (ДИКИЕ СКАЧКИ)
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: THEME.colors.cobalt, fontFamily: 'JetBrains Mono, monospace' }}>
                <span style={{ width: 14, height: 3, backgroundColor: THEME.colors.cobalt }} />
                БАЙЕСОВСКИЙ РЕЙТИНГ (СТАБИЛЬНЫЙ)
              </div>
            </div>
          </div>

          {/* SVG Multi-track Graph */}
          <div style={{ width: '100%', height: 320, position: 'relative' }}>
            <svg width="100%" height="100%" viewBox="0 0 1100 320" style={{ overflow: 'visible' }}>
              <clipPath id="reveal-clip">
                <rect x="0" y="0" width={reveal * 1100} height="320" />
              </clipPath>

              {/* Reference Grid */}
              <line x1="0" y1="80" x2="1100" y2="80" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <line x1="0" y1="160" x2="1100" y2="160" stroke="rgba(255,255,255,0.08)" />
              <line x1="0" y1="240" x2="1100" y2="240" stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />

              {/* Confidence corridor for Bayesian */}
              <rect
                x="0"
                y="135"
                width={reveal * 1100}
                height="50"
                fill="rgba(56, 189, 248, 0.08)"
                stroke="rgba(56, 189, 248, 0.2)"
                strokeDasharray="4 4"
              />

              {/* Raw volatile line */}
              <path
                d={rawPath}
                fill="none"
                stroke={THEME.colors.amber}
                strokeWidth="2"
                clipPath="url(#reveal-clip)"
                opacity={0.8}
              />

              {/* Stable Bayesian line */}
              <path
                d={bayesPath}
                fill="none"
                stroke={THEME.colors.cobalt}
                strokeWidth="3.5"
                strokeLinecap="round"
                clipPath="url(#reveal-clip)"
              />
            </svg>
          </div>
        </div>

        {/* 3 Core Benefits Pill Badges */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 28,
          }}
        >
          <div style={{ padding: '20px 28px', borderRadius: 12, backgroundColor: 'rgba(21, 29, 46, 0.65)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.textPrimary }}>
              1. Защита от троллинга
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
              Случайные единицы не валят рейтинг эфира.
            </div>
          </div>

          <div style={{ padding: '20px 28px', borderRadius: 12, backgroundColor: 'rgba(21, 29, 46, 0.65)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.textPrimary }}>
              2. Мгновенная честность
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
              При реальной поддержке зрителей рейтинг быстро поднимается.
            </div>
          </div>

          <div style={{ padding: '20px 28px', borderRadius: 12, backgroundColor: 'rgba(21, 29, 46, 0.65)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: THEME.colors.textPrimary }}>
              3. Измеримая погрешность
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
              Всегда виден 95% доверительный интервал.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
