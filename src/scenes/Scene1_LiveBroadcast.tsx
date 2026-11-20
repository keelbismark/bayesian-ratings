import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';

export const Scene1_LiveBroadcast: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth camera zoom-in over 40 seconds
  const cameraScale = interpolate(frame, [0, 1200], [1.0, 1.12], {
    easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    extrapolateRight: 'clamp',
  });

  // Timeline progress filling up second by second
  const timelineProgress = interpolate(frame, [0, 1200], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // Engagement curve dynamic wave growth
  const curvePoints = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => {
      const x = (i / 23) * 1600;
      const baseGrowth = Math.pow(i / 23, 0.85);
      const wave = Math.sin(i * 0.7) * 45;
      const y = 500 - (baseGrowth * 340 + wave);
      return { x, y };
    });
  }, []);

  // Curve draw progression
  const curveProgress = interpolate(frame, [60, 900], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const visibleCurveLength = Math.max(2, Math.floor(curvePoints.length * curveProgress));
  const activeCurvePoints = curvePoints.slice(0, visibleCurveLength);

  const curvePath = activeCurvePoints.reduce((acc, pt, idx) => {
    return idx === 0 ? `M ${pt.x} ${pt.y}` : `${acc} L ${pt.x} ${pt.y}`;
  }, '');

  // Pulsing live indicator
  const livePulse = interpolate(Math.sin((frame * Math.PI * 2) / 25), [-1, 1], [0.8, 1.2]);

  // Question mark glow and floating animation
  const questionFloat = interpolate(Math.sin(frame * 0.06), [-1, 1], [-12, 12]);
  const questionOpacity = interpolate(frame, [150, 240], [0, 1], {
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
        transform: `scale(${cameraScale})`,
        transformOrigin: 'center center',
      }}
    >
      <BackgroundGrid intensity={1.1} />

      {/* Main Broadcast Monitor Frame */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 2400,
          height: 1400,
          borderRadius: 24,
          backgroundColor: 'rgba(15, 29, 48, 0.75)',
          border: `3px solid rgba(78, 168, 222, 0.35)`,
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(78, 168, 222, 0.15)',
          backdropFilter: 'blur(20px)',
          display: 'flex',
          flexDirection: 'column',
          padding: 48,
          boxSizing: 'border-box',
        }}
      >
        {/* Top Control Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '2px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: 24,
          }}
        >
          {/* LIVE ● В ЭФИРЕ Badge */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 16,
              padding: '10px 24px',
              borderRadius: 9999,
              backgroundColor: 'rgba(255, 123, 84, 0.15)',
              border: `2px solid ${THEME.colors.warmCoral}`,
              boxShadow: `0 0 24px ${THEME.colors.warmCoralGlow}`,
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: THEME.colors.warmCoral,
                transform: `scale(${livePulse})`,
                boxShadow: `0 0 12px ${THEME.colors.warmCoral}`,
              }}
            />
            <span
              style={{
                color: THEME.colors.white,
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: 3,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              LIVE ● В ЭФИРЕ
            </span>
          </div>

          {/* Broadcast Studio Status Placeholders */}
          <div style={{ display: 'flex', gap: 20 }}>
            <PlaceholderBox width={140} height={42} variant="pill" accent="neutral" />
            <PlaceholderBox width={100} height={42} variant="pill" accent="neutral" />
          </div>
        </div>

        {/* Center Display: Curve & Glowing Question Mark */}
        <div
          style={{
            flex: 1,
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '30px 0',
          }}
        >
          {/* Real-time Engagement Curve */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1600 600"
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="curve-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={THEME.colors.electricBlue} stopOpacity="0.4" />
                <stop offset="100%" stopColor={THEME.colors.electricBlue} stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid references inside monitor */}
            <line x1="0" y1="500" x2="1600" y2="500" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
            <line x1="0" y1="350" x2="1600" y2="350" stroke="rgba(255,255,255,0.05)" strokeDasharray="6 6" />
            <line x1="0" y1="200" x2="1600" y2="200" stroke="rgba(255,255,255,0.05)" strokeDasharray="6 6" />

            {/* Curve path */}
            {curvePath && (
              <>
                <path
                  d={`${curvePath} L ${activeCurvePoints[activeCurvePoints.length - 1].x} 500 L 0 500 Z`}
                  fill="url(#curve-gradient)"
                />
                <path
                  d={curvePath}
                  fill="none"
                  stroke={THEME.colors.electricBlue}
                  strokeWidth="5"
                  strokeLinecap="round"
                />
                {/* Leading pulse head */}
                <circle
                  cx={activeCurvePoints[activeCurvePoints.length - 1].x}
                  cy={activeCurvePoints[activeCurvePoints.length - 1].y}
                  r={9}
                  fill={THEME.colors.white}
                  stroke={THEME.colors.electricBlue}
                  strokeWidth="4"
                  filter="drop-shadow(0 0 12px #4EA8DE)"
                />
              </>
            )}
          </svg>

          {/* Large Glowing Question Mark over Counters */}
          <div
            style={{
              position: 'absolute',
              top: '18%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `translateY(${questionFloat}px)`,
              opacity: questionOpacity,
              zIndex: 10,
            }}
          >
            <div
              style={{
                fontSize: 160,
                fontWeight: 900,
                color: THEME.colors.white,
                lineHeight: 1,
                fontFamily: 'system-ui, sans-serif',
                textShadow: `0 0 35px ${THEME.colors.electricBlue}, 0 0 70px ${THEME.colors.electricBlueGlow}`,
              }}
            >
              ?
            </div>
          </div>

          {/* Numeric Counters (in the form of sleek empty placeholder cards) */}
          <div
            style={{
              position: 'absolute',
              bottom: 20,
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: 40,
            }}
          >
            <PlaceholderBox width={340} height={110} variant="card" cornerMarks glow pulse>
              <div style={{ width: '70%', height: 22, backgroundColor: 'rgba(78, 168, 222, 0.3)', borderRadius: 6 }} />
            </PlaceholderBox>
            <PlaceholderBox width={340} height={110} variant="card" cornerMarks glow pulse>
              <div style={{ width: '55%', height: 22, backgroundColor: 'rgba(78, 168, 222, 0.3)', borderRadius: 6 }} />
            </PlaceholderBox>
            <PlaceholderBox width={340} height={110} variant="card" cornerMarks glow pulse>
              <div style={{ width: '80%', height: 22, backgroundColor: 'rgba(78, 168, 222, 0.3)', borderRadius: 6 }} />
            </PlaceholderBox>
          </div>
        </div>

        {/* Bottom Horizontal Timeline Filling Second by Second */}
        <div style={{ marginTop: 10 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: 10,
              opacity: 0.6,
            }}
          >
            <PlaceholderBox width={80} height={16} variant="pill" accent="neutral" />
            <PlaceholderBox width={80} height={16} variant="pill" accent="neutral" />
          </div>
          <div
            style={{
              width: '100%',
              height: 12,
              borderRadius: 6,
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                width: `${timelineProgress * 100}%`,
                height: '100%',
                backgroundColor: THEME.colors.electricBlue,
                boxShadow: `0 0 16px ${THEME.colors.electricBlue}`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
