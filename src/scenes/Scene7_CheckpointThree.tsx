import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { WaitingFrame } from '../components/common/WaitingFrame';

export const Scene7_CheckpointThree: React.FC = () => {
  const frame = useCurrentFrame();

  const isPausedCheckpoint = frame < 150;

  // Narrowing confidence interval along x-axis
  // Wide at 1 min (left), narrow at 5 min (right)
  const ciWidthFactor = interpolate(frame, [150, 600], [1, 0.3], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Outlier appearance and smooth assimilation
  const outlierEntrance = interpolate(frame, [300, 340], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const outlierDampen = interpolate(frame, [380, 520], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const outlierY = 160 - (1 - outlierDampen) * 110; // high outlier dampening towards the mean line (160)

  // Example layout animated shimmer values (number growth without actual digits)
  const barGrowth = interpolate(frame, [500, 900], [0.4, 0.85], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const varianceNarrowing = interpolate(frame, [500, 900], [0.8, 0.25], {
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
      <BackgroundGrid intensity={1.1} />

      {/* 5-second Interactive Checkpoint 3 */}
      {isPausedCheckpoint && <WaitingFrame durationInFrames={150} />}

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
        {/* Top Header Placeholder */}
        <div style={{ marginBottom: 40, display: 'flex', gap: 30, alignItems: 'center' }}>
          <PlaceholderBox width={580} height={56} variant="pill" accent="blue" glow>
            <div style={{ width: '65%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
          </PlaceholderBox>
        </div>

        {/* UPPER VISUALIZATION: CONFIDENCE INTERVAL NARROWING + OUTLIER SMOOTHING */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            height: 440,
            borderRadius: 24,
            backgroundColor: THEME.colors.bgCard,
            border: `2px solid rgba(78, 168, 222, 0.35)`,
            padding: 30,
            boxSizing: 'border-box',
            position: 'relative',
            marginBottom: 60,
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
          }}
        >
          {/* Timeline labels at top */}
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 40px', marginBottom: 15 }}>
            <PlaceholderBox width={120} height={28} variant="pill" accent="neutral" />
            <PlaceholderBox width={120} height={28} variant="pill" accent="blue" glow />
          </div>

          <svg width="100%" height="320" viewBox="0 0 2100 320" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="ci-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={THEME.colors.electricBlue} stopOpacity="0.35" />
                <stop offset="100%" stopColor={THEME.colors.electricBlue} stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Baseline trend prediction line */}
            <line x1="80" y1="160" x2="2020" y2="160" stroke="rgba(255,255,255,0.2)" strokeWidth="2" strokeDasharray="6 6" />

            {/* Narrowing Confidence Band (Funnel-shaped polygon narrowing from left to right) */}
            <path
              d={`M 80 ${160 - 110 * ciWidthFactor} 
                  C 700 ${160 - 80 * ciWidthFactor}, 1400 ${160 - 45 * ciWidthFactor}, 2020 ${160 - 25 * ciWidthFactor} 
                  L 2020 ${160 + 25 * ciWidthFactor} 
                  C 1400 ${160 + 45 * ciWidthFactor}, 700 ${160 + 80 * ciWidthFactor}, 80 ${160 + 110 * ciWidthFactor} Z`}
              fill="url(#ci-grad)"
              stroke={THEME.colors.electricBlue}
              strokeWidth="2.5"
            />

            {/* Central estimate curve */}
            <path
              d="M 80 160 C 600 155, 1200 162, 2020 160"
              fill="none"
              stroke={THEME.colors.white}
              strokeWidth="4"
              filter="drop-shadow(0 0 8px rgba(255,255,255,0.6))"
            />

            {/* Normal points along prediction */}
            <circle cx="450" cy="158" r="6" fill={THEME.colors.electricBlue} />
            <circle cx="820" cy="163" r="6" fill={THEME.colors.electricBlue} />
            <circle cx="1550" cy="160" r="6" fill={THEME.colors.electricBlue} />

            {/* OUTLIER POINT: High extreme deviation, smoothly dampened */}
            {frame >= 300 && (
              <g opacity={outlierEntrance}>
                {/* Outlier dot */}
                <circle
                  cx="1150"
                  cy={outlierY}
                  r={12}
                  fill={THEME.colors.warmCoral}
                  filter="drop-shadow(0 0 16px #FF7B54)"
                />
                {/* Dampening trajectory line */}
                <line
                  x1="1150"
                  y1={50}
                  x2="1150"
                  y2={160}
                  stroke={THEME.colors.warmCoral}
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                  opacity={0.6}
                />
              </g>
            )}
          </svg>
        </div>

        {/* LOWER SECTION: WORKING EXAMPLE LAYOUT
            «Было: □ ± □ → Наблюдения выше → Сейчас: □ ± □» */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 36,
          }}
        >
          {/* STEP A: BEFORE (БЫЛО: □ ± □) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <PlaceholderBox width={140} height={32} variant="pill" accent="neutral" />
            <PlaceholderBox width={460} height={120} variant="card" accent="neutral" cornerMarks>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Base value bar */}
                <div style={{ width: 140, height: 28, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 6 }} />
                <span style={{ fontSize: 36, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>±</span>
                {/* Wide variance bar */}
                <div style={{ width: 100, height: 28, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 6 }} />
              </div>
            </PlaceholderBox>
          </div>

          {/* ARROW: → */}
          <div style={{ fontSize: 50, color: THEME.colors.electricBlue, fontWeight: 700 }}>→</div>

          {/* STEP B: OBSERVATIONS HIGHER (НАБЛЮДЕНИЯ ВЫШЕ) */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <PlaceholderBox width={220} height={32} variant="pill" accent="coral" />
            <PlaceholderBox width={380} height={120} variant="card" accent="coral" glow cornerMarks>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 180, height: 28, backgroundColor: THEME.colors.warmCoral, borderRadius: 6 }} />
                {/* Upward trend motion hint */}
                <div style={{ width: 32, height: 4, backgroundColor: 'rgba(255,255,255,0.6)', borderRadius: 2 }} />
              </div>
            </PlaceholderBox>
          </div>

          {/* ARROW: → */}
          <div style={{ fontSize: 50, color: THEME.colors.electricBlue, fontWeight: 700 }}>→</div>

          {/* STEP C: NOW (СЕЙЧАС: □ ± □) - HIGHER VALUE, TIGHTER VARIANCE */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
            <PlaceholderBox width={140} height={32} variant="pill" accent="blue" glow />
            <PlaceholderBox width={460} height={120} variant="card" accent="blue" glow pulse cornerMarks>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                {/* Increased base value bar (animating smoothly up) */}
                <div
                  style={{
                    width: 140 * barGrowth + 40,
                    height: 28,
                    backgroundColor: THEME.colors.electricBlue,
                    borderRadius: 6,
                    boxShadow: `0 0 16px ${THEME.colors.electricBlueGlow}`,
                  }}
                />
                <span style={{ fontSize: 36, color: THEME.colors.electricBlue, fontWeight: 600 }}>±</span>
                {/* Tighter variance bar (narrowed uncertainty) */}
                <div
                  style={{
                    width: 100 * varianceNarrowing + 20,
                    height: 28,
                    backgroundColor: 'rgba(78, 168, 222, 0.45)',
                    borderRadius: 6,
                  }}
                />
              </div>
            </PlaceholderBox>
          </div>
        </div>
      </div>
    </div>
  );
};
