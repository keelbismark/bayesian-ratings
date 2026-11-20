import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';

export const Scene1_LiveBroadcast: React.FC = () => {
  const frame = useCurrentFrame();

  // High-precision smooth engagement curve data across 1760px
  const fullCurveData = useMemo(() => {
    const pointsCount = 200;
    const pts = Array.from({ length: pointsCount }).map((_, i) => {
      const t = i / (pointsCount - 1);
      const x = 80 + t * 1600;
      // Realistic live broadcast audience score: starts with early noise, settles into steady 4.62
      const baseTrend = 420 - Math.pow(t, 0.7) * 230;
      const smoothWave = Math.sin(t * 11) * 22 * (1 - t * 0.65);
      const y = baseTrend - smoothWave;
      return { x, y, t };
    });

    const d = pts.reduce(
      (acc, pt, idx) => (idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`),
      ''
    );

    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return { pts, d, len };
  }, []);

  // Curve draw progression
  const curveProgress = interpolate(frame, [30, 950], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const currentIdx = Math.min(
    fullCurveData.pts.length - 1,
    Math.floor(curveProgress * (fullCurveData.pts.length - 1))
  );
  const currentPt = fullCurveData.pts[currentIdx];

  const currentVotes = Math.floor(curveProgress * 3420);
  const seconds = Math.floor(frame / 30);
  const timecode = `00:${String(seconds).padStart(2, '0')}:00`;

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

      {/* UNBOXED EDITORIAL CANVAS (1920x1080) */}
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
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                fontSize: 12,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: THEME.colors.textSecondary,
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  backgroundColor: THEME.colors.amber,
                  boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
                }}
              />
              <span>01 / ПРЯМОЙ ЭФИР · МОДЕЛЬ ОЦЕНКИ В РЕАЛЬНОМ ВРЕМЕНИ</span>
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
              Эволюция зрительского рейтинга в прямом эфире
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Непрерывный байесовский пересчет отсекает ложные колебания на старте эфира
            </p>
          </div>

          {/* Right Live Telemetry */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: 6,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, monospace',
                color: THEME.colors.cobalt,
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {timecode}
            </div>
            <div
              style={{
                fontSize: 12,
                color: THEME.colors.textMuted,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Частота обновления: 30 кадров/с
            </div>
          </div>
        </header>

        {/* HIGH-DATA-INK CHART (OPEN ON CANVAS) */}
        <div style={{ position: 'relative', width: '100%', height: 460 }}>
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1760 460"
            style={{ overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="editorial-gradient-fill" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={THEME.colors.cobalt} stopOpacity="0.12" />
                <stop offset="100%" stopColor={THEME.colors.cobalt} stopOpacity="0.0" />
              </linearGradient>
              <clipPath id="editorial-curve-clip">
                <rect x="0" y="0" width={currentPt.x} height="460" />
              </clipPath>
            </defs>

            {/* Subtle horizontal grid lines & Y-axis labels */}
            {[
              { val: '5.0 ★', y: 80 },
              { val: '4.5 ★', y: 160 },
              { val: '4.0 ★', y: 240 },
              { val: '3.5 ★', y: 320 },
              { val: '3.0 ★', y: 400 },
            ].map((grid, idx) => (
              <g key={idx}>
                <line
                  x1="80"
                  y1={grid.y}
                  x2="1720"
                  y2={grid.y}
                  stroke={THEME.colors.borderSubtle}
                  strokeWidth="1"
                />
                <text
                  x="65"
                  y={grid.y + 4}
                  textAnchor="end"
                  fill={THEME.colors.textMuted}
                  fontSize="12"
                  fontFamily="Inter, system-ui, sans-serif"
                >
                  {grid.val}
                </text>
              </g>
            ))}

            {/* Time coordinate axis at bottom */}
            <line x1="80" y1="410" x2="1720" y2="410" stroke={THEME.colors.border} strokeWidth="1" />

            {['00:00', '10:00', '20:00', '30:00', '40:00 (Конец трансляции)'].map((label, idx) => {
              const xPos = 80 + idx * 410;
              return (
                <g key={idx}>
                  <line x1={xPos} y1="410" x2={xPos} y2="418" stroke={THEME.colors.border} strokeWidth="1" />
                  <text
                    x={xPos}
                    y="436"
                    textAnchor={idx === 4 ? 'end' : idx === 0 ? 'start' : 'middle'}
                    fill={THEME.colors.textMuted}
                    fontSize="11"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Shaded 95% Credible Interval Band (narrowing as votes accumulate) */}
            {curveProgress > 0 && (
              <path
                d={
                  fullCurveData.pts.reduce(
                    (acc, pt, i) => {
                      const spread = 40 * (1 - pt.t * 0.7);
                      return `${acc} ${i === 0 ? 'M' : 'L'} ${pt.x.toFixed(1)} ${(pt.y - spread).toFixed(1)}`;
                    },
                    ''
                  ) +
                  fullCurveData.pts
                    .slice()
                    .reverse()
                    .reduce((acc, pt) => {
                      const spread = 40 * (1 - pt.t * 0.7);
                      return `${acc} L ${pt.x.toFixed(1)} ${(pt.y + spread).toFixed(1)}`;
                    }, '') +
                  ' Z'
                }
                fill="rgba(56, 189, 248, 0.05)"
                clipPath="url(#editorial-curve-clip)"
              />
            )}

            {/* Scatter dots of incoming viewer ratings */}
            {Array.from({ length: 60 }).map((_, i) => {
              const ptT = i / 59;
              if (ptT > curveProgress) return null;
              const x = 80 + ptT * 1600;
              const noiseY = 240 + Math.sin(i * 3.7) * 90 + (i % 7 === 0 ? 80 : i % 5 === 0 ? -70 : 0);
              const isSpike = Math.abs(noiseY - 240) > 60;
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={noiseY}
                  r={isSpike ? 3.5 : 2.5}
                  fill={isSpike ? THEME.colors.amber : THEME.colors.cobalt}
                  opacity={isSpike ? 0.75 : 0.4}
                />
              );
            })}

            {/* Main Bayesian Posterior Curve */}
            {curveProgress > 0 && (
              <>
                <path
                  d={`${fullCurveData.d} L ${currentPt.x} 410 L 80 410 Z`}
                  fill="url(#editorial-gradient-fill)"
                  clipPath="url(#editorial-curve-clip)"
                />
                <path
                  d={fullCurveData.d}
                  fill="none"
                  stroke={THEME.colors.cobalt}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray={fullCurveData.len}
                  strokeDashoffset={fullCurveData.len * (1 - curveProgress)}
                />
                {/* Active Tracking Point */}
                <circle
                  cx={currentPt.x}
                  cy={currentPt.y}
                  r={5}
                  fill={THEME.colors.textPrimary}
                  stroke={THEME.colors.cobalt}
                  strokeWidth="2.5"
                />
                {/* Clean Numeric Callout at Cursor */}
                <g transform={`translate(${Math.min(1560, currentPt.x + 16)}, ${currentPt.y - 14})`}>
                  <rect
                    x="0"
                    y="-18"
                    width="130"
                    height="28"
                    fill="#0D1017"
                    stroke={THEME.colors.border}
                    rx="4"
                  />
                  <text
                    x="10"
                    y="1"
                    fill={THEME.colors.textPrimary}
                    fontSize="12"
                    fontWeight="600"
                    fontFamily="JetBrains Mono, monospace"
                  >
                    ★ 4.62 ± 0.12
                  </text>
                </g>
              </>
            )}
          </svg>
        </div>

        {/* UNBOXED METRICS ROW (EDITORIAL STRIPE / BLOOMBERG STYLE) */}
        <div
          style={{
            borderTop: `1px solid ${THEME.colors.border}`,
            paddingTop: 24,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 40,
          }}
        >
          {/* Metric 1 */}
          <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 24 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.textMuted, fontWeight: 600 }}>
              Байесовский рейтинг
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.cobalt, fontFamily: 'Inter, system-ui, sans-serif' }}>
                4.62
              </span>
              <span style={{ fontSize: 14, color: THEME.colors.textSecondary, fontFamily: 'JetBrains Mono, monospace' }}>
                ± 0.12 (95% CI)
              </span>
            </div>
            <div style={{ fontSize: 12, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Устойчивое взвешивание
            </div>
          </div>

          {/* Metric 2 */}
          <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 24 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.textMuted, fontWeight: 600 }}>
              Сырое арифметическое
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.amber, fontFamily: 'Inter, system-ui, sans-serif' }}>
                4.85
              </span>
              <span style={{ fontSize: 13, color: THEME.colors.amber, fontWeight: 600 }}>
                Шум
              </span>
            </div>
            <div style={{ fontSize: 12, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Уязвимо к малым выборкам
            </div>
          </div>

          {/* Metric 3 */}
          <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 24 }}>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.textMuted, fontWeight: 600 }}>
              Объем выборки
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary, fontFamily: 'JetBrains Mono, monospace', fontVariantNumeric: 'tabular-nums' }}>
                {currentVotes.toLocaleString('ru-RU')}
              </span>
              <span style={{ fontSize: 13, color: THEME.colors.textSecondary }}>
                голосов
              </span>
            </div>
            <div style={{ fontSize: 12, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Поток оценок в реальном времени
            </div>
          </div>

          {/* Metric 4 */}
          <div>
            <div style={{ fontSize: 12, textTransform: 'uppercase', letterSpacing: 1, color: THEME.colors.textMuted, fontWeight: 600 }}>
              Дисперсия апостериора
            </div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginTop: 6 }}>
              <span style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.emerald, fontFamily: 'JetBrains Mono, monospace' }}>
                σ² = 0.014
              </span>
            </div>
            <div style={{ fontSize: 12, color: THEME.colors.emerald, marginTop: 4, fontWeight: 500 }}>
              Высокая статистическая уверенность
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
