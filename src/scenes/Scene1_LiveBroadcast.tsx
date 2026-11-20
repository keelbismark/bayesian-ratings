import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';

export const Scene1_LiveBroadcast: React.FC = () => {
  const frame = useCurrentFrame();

  // Timeline progress filling up second by second
  const timelineProgress = interpolate(frame, [0, 1200], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // High-precision engagement curve data
  const fullCurveData = useMemo(() => {
    const pointsCount = 180;
    const pts = Array.from({ length: pointsCount }).map((_, i) => {
      const t = i / (pointsCount - 1);
      const x = t * 1600;
      const baseGrowth = Math.pow(t, 0.85);
      const wave = Math.sin(t * 14) * 26;
      const y = 420 - (baseGrowth * 280 + wave);
      return { x, y, t };
    });
    const d = pts.reduce((acc, pt, idx) => (idx === 0 ? `M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}` : `${acc} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`), '');
    let len = 0;
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i].x - pts[i - 1].x;
      const dy = pts[i].y - pts[i - 1].y;
      len += Math.sqrt(dx * dx + dy * dy);
    }
    return { pts, d, len };
  }, []);

  // Curve draw progression
  const curveProgress = interpolate(frame, [60, 900], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.2, 0.8, 0.2, 1),
  });

  const dotX = curveProgress * 1600;
  const dotBaseGrowth = Math.pow(curveProgress, 0.85);
  const dotWave = Math.sin(curveProgress * 14) * 26;
  const dotY = 420 - (dotBaseGrowth * 280 + dotWave);

  // Timecode calculation
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

      {/* Main Studio Analytics Console (Stripe / Bloomberg Terminal Aesthetic) */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 1780,
          height: 980,
          borderRadius: 20,
          backgroundColor: 'rgba(17, 23, 38, 0.85)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '32px 48px',
          boxSizing: 'border-box',
        }}
      >
        {/* Top Control Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 20,
          }}
        >
          {/* LIVE ● В ЭФИРЕ Badge */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '8px 20px',
                borderRadius: 9999,
                backgroundColor: 'rgba(249, 115, 22, 0.1)',
                border: '1px solid rgba(249, 115, 22, 0.35)',
              }}
            >
              <div
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  backgroundColor: THEME.colors.amber,
                }}
              />
              <span
                style={{
                  color: THEME.colors.textPrimary,
                  fontSize: 16,
                  fontWeight: 700,
                  letterSpacing: 2,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                LIVE ● В ЭФИРЕ
              </span>
            </div>

            <div
              style={{
                fontSize: 14,
                fontFamily: 'Inter, system-ui, sans-serif',
                color: THEME.colors.textSecondary,
              }}
            >
              Время эфира: <span style={{ color: THEME.colors.cobalt, fontFamily: 'JetBrains Mono, monospace', fontWeight: 600 }}>{timecode}</span>
            </div>
          </div>

          {/* Metric Status Badges */}
          <div style={{ display: 'flex', gap: 16 }}>
            <div
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                fontSize: 13,
                fontFamily: 'Inter, system-ui, sans-serif',
                color: THEME.colors.textSecondary,
              }}
            >
              Входящие оценки: <span style={{ color: THEME.colors.textPrimary, fontWeight: 600 }}>прямой поток</span>
            </div>
            <div
              style={{
                padding: '8px 18px',
                borderRadius: 8,
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.2)',
                fontSize: 13,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                color: THEME.colors.cobalt,
              }}
            >
              Модель: фильтр Байеса
            </div>
          </div>
        </div>

        {/* Center Display: Curve & Editorial Metric Hierarchy */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            margin: '12px 0',
          }}
        >
          {/* Main Visual Heading (Editorial) */}
          <div style={{ position: 'absolute', top: 0, left: 0, zIndex: 5 }}>
            <div style={{ fontSize: 26, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5 }}>
              Оценка рейтинга в прямом эфире
            </div>
            <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 4 }}>
              Сглаживание случайных выбросов зрительского голосования
            </div>
          </div>

          {/* Real-time Engagement Curve */}
          <div style={{ width: '100%', height: 420, position: 'relative' }}>
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1600 440"
              style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
            >
              <defs>
                <linearGradient id="editorial-curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={THEME.colors.cobalt} stopOpacity="0.15" />
                  <stop offset="100%" stopColor={THEME.colors.cobalt} stopOpacity="0.0" />
                </linearGradient>
                <clipPath id="editorial-curve-clip">
                  <rect x="0" y="0" width={dotX} height="440" />
                </clipPath>
              </defs>

              {/* Horizontal Reference Lines */}
              <line x1="0" y1="420" x2="1600" y2="420" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <line x1="0" y1="280" x2="1600" y2="280" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" strokeWidth="1" />
              <line x1="0" y1="140" x2="1600" y2="140" stroke="rgba(255,255,255,0.04)" strokeDasharray="4 4" strokeWidth="1" />

              {/* Curve path */}
              {curveProgress > 0 && (
                <>
                  <path
                    d={`${fullCurveData.d} L 1600 420 L 0 420 Z`}
                    fill="url(#editorial-curve-gradient)"
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
                  {/* Leading pointer dot */}
                  <circle
                    cx={dotX}
                    cy={dotY}
                    r={6}
                    fill={THEME.colors.textPrimary}
                    stroke={THEME.colors.cobalt}
                    strokeWidth="2.5"
                  />
                </>
              )}
            </svg>
          </div>

          {/* High-End Metric Cards (Clean Data, No Slop) */}
          <div
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'space-between',
              marginTop: 14,
            }}
          >
            {/* Card 1: Raw Rating Average */}
            <div
              style={{
                flex: 1,
                padding: '16px 24px',
                borderRadius: 12,
                backgroundColor: 'rgba(21, 29, 46, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 500 }}>
                Сырая средняя оценка
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                <span style={{ fontSize: 34, fontWeight: 700, color: THEME.colors.textPrimary, fontFamily: 'Inter, sans-serif' }}>
                  ★ 4.85
                </span>
                <span style={{ fontSize: 12, color: THEME.colors.amber, fontWeight: 600 }}>
                  Высокий шум
                </span>
              </div>
              <div style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 10 }}>
                <div style={{ width: '85%', height: '100%', backgroundColor: THEME.colors.amber, borderRadius: 2 }} />
              </div>
            </div>

            {/* Card 2: Sample Size Volume */}
            <div
              style={{
                flex: 1,
                padding: '16px 24px',
                borderRadius: 12,
                backgroundColor: 'rgba(21, 29, 46, 0.6)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <div style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 500 }}>
                Число голосов
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                <span style={{ fontSize: 34, fontWeight: 700, color: THEME.colors.textPrimary, fontFamily: 'JetBrains Mono, monospace' }}>
                  {Math.floor(curveProgress * 3420)}
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textSecondary }}>
                  оценок
                </span>
              </div>
              <div style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 10 }}>
                <div style={{ width: `${curveProgress * 100}%`, height: '100%', backgroundColor: THEME.colors.cobalt, borderRadius: 2 }} />
              </div>
            </div>

            {/* Card 3: Bayesian Robust Posterior */}
            <div
              style={{
                flex: 1,
                padding: '16px 24px',
                borderRadius: 12,
                backgroundColor: 'rgba(21, 29, 46, 0.6)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
              }}
            >
              <div style={{ fontSize: 13, color: THEME.colors.cobalt, fontWeight: 600 }}>
                Байесовская оценка
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
                <span style={{ fontSize: 34, fontWeight: 700, color: THEME.colors.cobalt, fontFamily: 'Inter, sans-serif' }}>
                  ★ 4.62
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textSecondary, fontFamily: 'JetBrains Mono, monospace' }}>
                  ±0.12 (95% CI)
                </span>
              </div>
              <div style={{ width: '100%', height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.06)', marginTop: 10 }}>
                <div style={{ width: '65%', height: '100%', backgroundColor: THEME.colors.cobalt, borderRadius: 2 }} />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Horizontal Timeline */}
        <div style={{ marginTop: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 8,
              fontSize: 12,
              fontFamily: 'Inter, system-ui, sans-serif',
              color: THEME.colors.textSecondary,
            }}
          >
            <span>00:00</span>
            <span>Прогресс эфира: {Math.round(timelineProgress * 100)}%</span>
            <span>05:00</span>
          </div>
          <div
            style={{
              width: '100%',
              height: 4,
              borderRadius: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${timelineProgress * 100}%`,
                height: '100%',
                backgroundColor: THEME.colors.cobalt,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
