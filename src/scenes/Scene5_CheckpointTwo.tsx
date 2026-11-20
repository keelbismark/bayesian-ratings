import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { WaitingFrame } from '../components/common/WaitingFrame';

export const Scene5_CheckpointTwo: React.FC = () => {
  const frame = useCurrentFrame();

  const isPausedCheckpoint = frame < 150;

  // Particle simulation for chaotic noisy stream (left)
  const noisyParticles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      offset: (i * 37) % 100,
      jitterX: Math.sin(i * 1.5) * 60,
      jitterY: Math.cos(i * 2.3) * 40,
      speed: 0.8 + (i % 4) * 0.4,
    }));
  }, []);

  // Particle simulation for dense stable stream (right)
  const denseParticles = useMemo(() => {
    return Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      offset: (i * 23) % 100,
      speed: 1.2 + (i % 3) * 0.2,
    }));
  }, []);

  // Output needle deflection (heavily influenced by the dense stream, barely by noise)
  const needleAngle = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [12, 28] // biased towards informative stream
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
      <BackgroundGrid intensity={1.1} />

      {/* 5-second Interactive Checkpoint 2 */}
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
        {/* Top Header Placeholder: Checkpoint 2 / Automatic Weighing */}
        <div style={{ marginBottom: 40, display: 'flex', gap: 30, alignItems: 'center' }}>
          <PlaceholderBox width={500} height={56} variant="pill" accent="blue" glow>
            <div style={{ width: '55%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
          </PlaceholderBox>
        </div>

        {/* Top Stream Labels */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: 20,
            padding: '0 80px',
            boxSizing: 'border-box',
          }}
        >
          {/* Left: Chaotic Noise Box */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <PlaceholderBox width={340} height={60} variant="card" accent="coral" glow>
              <div style={{ width: '50%', height: 16, backgroundColor: THEME.colors.warmCoral, borderRadius: 4 }} />
            </PlaceholderBox>
            <div style={{ width: 120, height: 10, backgroundColor: 'rgba(255, 123, 84, 0.3)', borderRadius: 5 }} />
          </div>

          {/* Right: Dense Informative Box */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
            <PlaceholderBox width={340} height={60} variant="card" accent="blue" glow>
              <div style={{ width: '65%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
            </PlaceholderBox>
            <div style={{ width: 120, height: 10, backgroundColor: 'rgba(78, 168, 222, 0.3)', borderRadius: 5 }} />
          </div>
        </div>

        {/* THE GLOWING FUNNEL AND FLOWING PARTICLES */}
        <div
          style={{
            position: 'relative',
            width: 1400,
            height: 700,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* SVG Vector Funnel */}
          <svg
            width="1400"
            height="700"
            viewBox="0 0 1400 700"
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            <defs>
              <linearGradient id="funnel-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(78, 168, 222, 0.3)" />
                <stop offset="60%" stopColor="rgba(78, 168, 222, 0.15)" />
                <stop offset="100%" stopColor="rgba(78, 168, 222, 0.4)" />
              </linearGradient>
            </defs>

            {/* Funnel Outline */}
            <path
              d="M 250 80 L 580 420 L 580 620 L 820 620 L 820 420 L 1150 80"
              fill="url(#funnel-grad)"
              stroke={THEME.colors.electricBlue}
              strokeWidth="4"
              strokeLinejoin="round"
              filter="drop-shadow(0 0 25px rgba(78, 168, 222, 0.4))"
            />

            {/* Stream guide tracks */}
            <path
              d="M 280 80 Q 450 300 650 480"
              fill="none"
              stroke="rgba(255, 123, 84, 0.25)"
              strokeWidth="2"
              strokeDasharray="6 6"
            />
            <path
              d="M 1120 80 Q 950 300 750 480"
              fill="none"
              stroke="rgba(78, 168, 222, 0.35)"
              strokeWidth="3"
              strokeDasharray="6 6"
            />

            {/* Chaotic Noise Particles (Left stream - dissipated) */}
            {noisyParticles.map((p) => {
              const flowT = ((frame * p.speed + p.offset) % 100) / 100;
              // Noise particles scatter and lose energy near funnel
              const curX = 280 + flowT * 320 + p.jitterX * (1 - flowT);
              const curY = 80 + flowT * 340 + p.jitterY * (1 - flowT);
              const opacity = flowT > 0.75 ? (1 - flowT) * 4 : 0.8;

              return (
                <circle
                  key={`noise-${p.id}`}
                  cx={curX}
                  cy={curY}
                  r={3.5}
                  fill={THEME.colors.warmCoral}
                  opacity={opacity}
                  filter="drop-shadow(0 0 6px rgba(255,123,84,0.6))"
                />
              );
            })}

            {/* Dense Stable Particles (Right stream - passes through) */}
            {denseParticles.map((p) => {
              const flowT = ((frame * p.speed + p.offset) % 100) / 100;
              // Dense stream stays tight along curve into the neck
              const curX = 1120 - flowT * 400 + Math.sin(flowT * Math.PI) * 15;
              const curY = 80 + flowT * 500;
              return (
                <circle
                  key={`dense-${p.id}`}
                  cx={curX}
                  cy={curY}
                  r={5}
                  fill={THEME.colors.electricBlue}
                  opacity={0.9}
                  filter="drop-shadow(0 0 8px #4EA8DE)"
                />
              );
            })}

            {/* Output Gauge at Funnel Neck */}
            <circle cx="700" cy="540" r="45" fill="rgba(13, 27, 42, 0.9)" stroke={THEME.colors.electricBlue} strokeWidth="3" />
            <line
              x1="700"
              y1="540"
              x2={700 + Math.sin((needleAngle * Math.PI) / 180) * 35}
              y2={540 - Math.cos((needleAngle * Math.PI) / 180) * 35}
              stroke={THEME.colors.electricBlue}
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Bottom Badge: "MATH CALCULATES AUTOMATICALLY" */}
        <div style={{ marginTop: 30, display: 'flex', alignItems: 'center', gap: 20 }}>
          {/* Vector gear / calculation icon */}
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              backgroundColor: 'rgba(78, 168, 222, 0.15)',
              border: `2px solid ${THEME.colors.electricBlue}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `rotate(${frame * 1.5}deg)`,
            }}
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="3" stroke={THEME.colors.electricBlue} strokeWidth="2" />
              <path
                d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"
                stroke={THEME.colors.electricBlue}
                strokeWidth="2"
              />
            </svg>
          </div>

          <PlaceholderBox width={460} height={56} variant="card" accent="blue" glow cornerMarks>
            <div style={{ width: '70%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
          </PlaceholderBox>
        </div>
      </div>
    </div>
  );
};
