import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { WaitingFrame } from '../components/common/WaitingFrame';

export const Scene7_CheckpointThree: React.FC = () => {
  const frame = useCurrentFrame();

  const isPausedCheckpoint = frame < 150;

  // Comparison curve values
  const curvePoints = Array.from({ length: 45 }).map((_, i) => {
    const t = i / 44;
    const x = 80 + t * 1600;
    // Raw noisy rating with dramatic jumps
    const rawY = 220 + Math.sin(i * 1.5) * 65 + (i === 6 ? -85 : i === 32 ? 90 : 0);
    // Smooth bayesian rating with subtle organic drift
    const bayesY = 210 + Math.sin(t * Math.PI * 1.5) * 22;
    return { x, rawY, bayesY, t };
  });

  const rawPath = curvePoints.reduce(
    (acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.rawY.toFixed(1)}`,
    ''
  );
  const bayesPath = curvePoints.reduce(
    (acc, pt, idx) => `${acc} ${idx === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${pt.bayesY.toFixed(1)}`,
    ''
  );

  // Smooth comparison curves

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

      {/* 5-second Interactive Checkpoint 3 */}
      {isPausedCheckpoint && (
        <WaitingFrame
          durationInFrames={150}
          title="Контрольная точка 3: что видит зритель — скачки или устойчивый рейтинг?"
          subtitle="Сравните восприятие скачущей цифры и плавного коридора доверия"
        />
      )}

      {/* UNBOXED COMPARATIVE CANVAS */}
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
              07 / ПРАКТИЧЕСКИЙ РЕЗУЛЬТАТ · ТЕСТИРОВАНИЕ В ЭФИРЕ
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
              Сравнение алгоритмов на реальном 40-минутном эфире
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Сырое арифметическое среднее против непрерывного байесовского фильтра
            </p>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: THEME.colors.amber, fontWeight: 600 }}>
              <span style={{ width: 14, height: 2.5, backgroundColor: THEME.colors.amber }} />
              Сырое среднее (шум и скачки)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: THEME.colors.cobalt, fontWeight: 600 }}>
              <span style={{ width: 14, height: 2.5, backgroundColor: THEME.colors.cobalt }} />
              Байесовский рейтинг (фильтр)
            </div>
          </div>
        </header>

        {/* COMPARISON GRAPH DIRECTLY ON CANVAS */}
        <div style={{ position: 'relative', width: '100%', height: 420 }}>
          <svg width="100%" height="100%" viewBox="0 0 1760 420" style={{ overflow: 'visible' }}>
            {/* Horizontal Grid */}
            {[
              { val: '5.0 ★', y: 70 },
              { val: '4.5 ★', y: 150 },
              { val: '4.0 ★', y: 230 },
              { val: '3.5 ★', y: 310 },
              { val: '3.0 ★', y: 390 },
            ].map((grid, idx) => (
              <g key={idx}>
                <line x1="80" y1={grid.y} x2="1720" y2={grid.y} stroke={THEME.colors.borderSubtle} strokeWidth="1" />
                <text x="65" y={grid.y + 4} textAnchor="end" fill={THEME.colors.textMuted} fontSize="12" fontFamily="Inter, system-ui, sans-serif">
                  {grid.val}
                </text>
              </g>
            ))}

            {/* Event Annotations on Canvas */}
            <g transform="translate(320, 110)">
              <line x1="0" y1="0" x2="0" y2="40" stroke={THEME.colors.amber} strokeWidth="1" strokeDasharray="3 3" />
              <rect x="-10" y="-30" width="220" height="26" fill="#0E121C" stroke={THEME.colors.amber} rx="4" />
              <text x="0" y="-13" fill={THEME.colors.amber} fontSize="11" fontFamily="JetBrains Mono, monospace">
                Всплеск троллей (5 хейтеров)
              </text>
            </g>

            <g transform="translate(1280, 290)">
              <line x1="0" y1="0" x2="0" y2="40" stroke={THEME.colors.cobalt} strokeWidth="1" strokeDasharray="3 3" />
              <rect x="-10" y="-30" width="220" height="26" fill="#0E121C" stroke={THEME.colors.cobalt} rx="4" />
              <text x="0" y="-13" fill={THEME.colors.cobalt} fontSize="11" fontFamily="JetBrains Mono, monospace">
                Реальный сбой трансляции
              </text>
            </g>

            {/* Shaded Credible Interval around Bayesian curve */}
            <path
              d={
                curvePoints.reduce(
                  (acc, pt, i) => `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${(pt.bayesY - 18).toFixed(1)}`,
                  ''
                ) +
                curvePoints
                  .slice()
                  .reverse()
                  .reduce((acc, pt) => `${acc} L ${pt.x.toFixed(1)} ${(pt.bayesY + 18).toFixed(1)}`, '') +
                ' Z'
              }
              fill="rgba(56, 189, 248, 0.06)"
            />

            {/* Raw Noisy Path */}
            <path
              d={rawPath}
              fill="none"
              stroke={THEME.colors.amber}
              strokeWidth="2"
              strokeOpacity={0.7}
              strokeDasharray="4 4"
            />

            {/* Smooth Bayesian Path */}
            <path
              d={bayesPath}
              fill="none"
              stroke={THEME.colors.cobalt}
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Time labels */}
            <line x1="80" y1="400" x2="1720" y2="400" stroke={THEME.colors.border} strokeWidth="1" />
            {['00:00 (Старт)', '10:00', '20:00 (Экватор)', '30:00', '40:00 (Финал)'].map((l, i) => {
              const xPos = 80 + i * 410;
              return (
                <text key={i} x={xPos} y="418" fill={THEME.colors.textMuted} fontSize="11" fontFamily="JetBrains Mono, monospace" textAnchor={i === 4 ? 'end' : i === 0 ? 'start' : 'middle'}>
                  {l}
                </text>
              );
            })}
          </svg>
        </div>

        {/* 3 CLEAN EDITORIAL TAKEAWAYS (NO BOXES, HAIRLINE DIVIDERS) */}
        <div
          style={{
            borderTop: `1px solid ${THEME.colors.border}`,
            paddingTop: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 48,
          }}
        >
          <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 32 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.amber, fontWeight: 700 }}>
              01 · Защита от накруток
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 6 }}>
              Иммунитет к малым всплескам
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
              Случайные 1 или 5 баллов от 3–5 человек не вызывают нервной реакции ведущих и аудитории.
            </div>
          </div>

          <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 32 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.cobalt, fontWeight: 700 }}>
              02 · Чувствительность к правде
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 6 }}>
              Быстрая реакция на тренд
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
              Когда проблема затрагивает сотни зрителей, модель плавно и уверенно перестраивается без запаздывания.
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.emerald, fontWeight: 700 }}>
              03 · Доверие аудитории
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 6 }}>
              Коридор вместо псевдоточки
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
              Отображение ±0.12 снимает вопросы зрителей о точности и повышает доверие к платформе.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
