import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';

export const Scene2_TwoTraps: React.FC = () => {
  const frame = useCurrentFrame();

  // High-frequency jittery noise curve for left trap
  const leftNoisePath = useMemo(() => {
    const pointsCount = 40;
    const width = 1100;
    const height = 400;
    return Array.from({ length: pointsCount })
      .map((_, i) => {
        const x = (i / (pointsCount - 1)) * width;
        // high frequency erratic swings
        const jitter = Math.sin(i * 1.8 + (frame * 0.2)) * 60 + Math.cos(i * 3.4) * 35;
        const y = height / 2 + jitter;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [frame]);

  // Inertia line for right trap: flat, delayed response
  const rightInertiaPath = useMemo(() => {
    const width = 1100;
    const height = 400;
    return `M 0 ${height * 0.6} L ${width * 0.7} ${height * 0.6} L ${width} ${height * 0.58}`;
  }, []);

  // Flashing alert on the right
  const alertBlink = interpolate(Math.sin(frame * 0.3), [-1, 1], [0.2, 1]);

  // Left & Right Cross (✗) appearance
  const crossOpacity = interpolate(frame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Center scale entrance in the second half
  const scaleEntrance = interpolate(frame, [450, 570], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Scale oscillation settling into balance
  const scaleTilt = interpolate(
    Math.sin((frame - 450) * 0.08) * Math.exp(-(frame - 450) / 250),
    [-1, 1],
    [-18, 18]
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bg,
        overflow: 'hidden',
      }}
    >
      <BackgroundGrid intensity={1.0} />

      {/* Split Screen Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 60,
          padding: 80,
          boxSizing: 'border-box',
        }}
      >
        {/* LEFT TRAP: OVER-REACTING TO NOISE */}
        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            backgroundColor: 'rgba(15, 29, 48, 0.6)',
            border: `2px solid rgba(255, 123, 84, 0.35)`,
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header Placeholder: "NOISE / REACT" */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <PlaceholderBox width={260} height={48} variant="pill" accent="coral" glow />
            <PlaceholderBox width={120} height={40} variant="card" accent="coral" />
          </div>

          {/* Jittery Chart Display */}
          <div style={{ position: 'relative', height: 420, margin: '20px 0' }}>
            <svg width="100%" height="100%" viewBox="0 0 1100 400" style={{ overflow: 'visible' }}>
              <path
                d={leftNoisePath}
                fill="none"
                stroke={THEME.colors.warmCoral}
                strokeWidth="4"
                filter="drop-shadow(0 0 10px rgba(255, 123, 84, 0.5))"
              />
            </svg>
          </div>

          {/* Hovering Hand / Pointer above big "TRUST" Button */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            {/* Vector Hover Pointer */}
            <div
              style={{
                width: 36,
                height: 36,
                transform: `translateY(${Math.sin(frame * 0.15) * 8}px)`,
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2v14M12 16l-4-4M12 16l4-4"
                  stroke={THEME.colors.warmCoral}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Big "TRUST" Button Placeholder */}
            <PlaceholderBox width={380} height={76} variant="card" accent="coral" glow pulse>
              <div style={{ width: '45%', height: 16, backgroundColor: THEME.colors.warmCoral, borderRadius: 4 }} />
            </PlaceholderBox>

            {/* Error Cross (✗) */}
            <div
              style={{
                fontSize: 84,
                color: THEME.colors.warmCoral,
                fontWeight: 900,
                opacity: crossOpacity,
                textShadow: `0 0 25px ${THEME.colors.warmCoralGlow}`,
                lineHeight: 1,
              }}
            >
              ✗
            </div>
          </div>
        </div>

        {/* RIGHT TRAP: COMPLETE INERTIA / IGNORING */}
        <div
          style={{
            position: 'relative',
            borderRadius: 24,
            backgroundColor: 'rgba(15, 29, 48, 0.6)',
            border: `2px solid rgba(108, 130, 153, 0.35)`,
            padding: 48,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          {/* Header Placeholder: "IGNORE / INERTIA" */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <PlaceholderBox width={260} height={48} variant="pill" accent="neutral" />
            <PlaceholderBox width={120} height={40} variant="card" accent="neutral" />
          </div>

          {/* Stagnant Lagging Chart Display */}
          <div style={{ position: 'relative', height: 420, margin: '20px 0' }}>
            <svg width="100%" height="100%" viewBox="0 0 1100 400" style={{ overflow: 'visible' }}>
              <path
                d={rightInertiaPath}
                fill="none"
                stroke={THEME.colors.textMuted}
                strokeWidth="4"
                strokeDasharray="10 10"
              />
              {/* Blinking missed update beacon */}
              <circle
                cx={770}
                cy={240}
                r={16}
                fill={THEME.colors.warmCoral}
                opacity={alertBlink}
                filter="drop-shadow(0 0 16px #FF7B54)"
              />
            </svg>
          </div>

          {/* "IGNORE" Button & Blinking Notification */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            {/* Minimalist abstract eye-closed / shield vector icon (No human face!) */}
            <div style={{ opacity: alertBlink }}>
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
                <path
                  d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"
                  stroke={THEME.colors.textMuted}
                  strokeWidth="2"
                />
                <path d="M4 4l16 16" stroke={THEME.colors.warmCoral} strokeWidth="2.5" />
              </svg>
            </div>

            {/* "IGNORE" Button Placeholder */}
            <PlaceholderBox width={380} height={76} variant="card" accent="neutral">
              <div style={{ width: '45%', height: 16, backgroundColor: THEME.colors.textMuted, borderRadius: 4 }} />
            </PlaceholderBox>

            {/* Error Cross (✗) */}
            <div
              style={{
                fontSize: 84,
                color: THEME.colors.warmCoral,
                fontWeight: 900,
                opacity: crossOpacity,
                textShadow: `0 0 25px ${THEME.colors.warmCoralGlow}`,
                lineHeight: 1,
              }}
            >
              ✗
            </div>
          </div>
        </div>
      </div>

      {/* CENTER EMERGENCE: THE BALANCED SCALE (WEIGHT OLD + NEW) */}
      {frame >= 450 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${scaleEntrance})`,
            width: 880,
            height: 620,
            borderRadius: 32,
            backgroundColor: 'rgba(13, 27, 42, 0.95)',
            border: `3px solid ${THEME.colors.electricBlue}`,
            boxShadow: `0 30px 100px rgba(0, 0, 0, 0.8), 0 0 50px ${THEME.colors.electricBlueGlow}`,
            padding: 40,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(24px)',
            zIndex: 30,
          }}
        >
          {/* Header Placeholder: "WEIGHT OLD + NEW" */}
          <PlaceholderBox width={520} height={56} variant="pill" accent="blue" glow pulse>
            <div style={{ width: '60%', height: 18, backgroundColor: THEME.colors.electricBlue, borderRadius: 6 }} />
          </PlaceholderBox>

          {/* Animated Balance Beam Scale */}
          <div style={{ position: 'relative', width: 650, height: 260, margin: '20px 0' }}>
            <svg width="650" height="260" viewBox="0 0 650 260" style={{ overflow: 'visible' }}>
              {/* Stand */}
              <line x1="325" y1="50" x2="325" y2="240" stroke={THEME.colors.white} strokeWidth="6" />
              <path d="M 270 240 L 380 240" stroke={THEME.colors.white} strokeWidth="6" strokeLinecap="round" />
              {/* Fulcrum Pivot */}
              <circle cx="325" cy="50" r="10" fill={THEME.colors.electricBlue} />

              {/* Tilting Beam */}
              <g transform={`rotate(${scaleTilt}, 325, 50)`}>
                <line x1="100" y1="50" x2="550" y2="50" stroke={THEME.colors.electricBlue} strokeWidth="6" />
                {/* Left Pan (Old Prior) */}
                <line x1="130" y1="50" x2="130" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                <path d="M 70 120 Q 130 150 190 120 Z" fill={THEME.colors.electricBlueSubtle} stroke={THEME.colors.electricBlue} strokeWidth="3" />
                {/* Right Pan (New Likelihood) */}
                <line x1="520" y1="50" x2="520" y2="120" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
                <path d="M 460 120 Q 520 150 580 120 Z" fill={THEME.colors.warmCoralSubtle} stroke={THEME.colors.warmCoral} strokeWidth="3" />
              </g>
            </svg>
          </div>

          {/* Bottom Balanced Card Placeholder */}
          <div style={{ display: 'flex', gap: 30, width: '100%', justifyContent: 'center' }}>
            <PlaceholderBox width={260} height={70} variant="card" accent="blue" />
            <div style={{ fontSize: 40, color: THEME.colors.white, fontWeight: 700, alignSelf: 'center' }}>+</div>
            <PlaceholderBox width={260} height={70} variant="card" accent="coral" />
          </div>
        </div>
      )}
    </div>
  );
};
