import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { WaitingFrame } from '../components/common/WaitingFrame';
import { BellCurve } from '../components/common/BellCurve';

export const Scene3_CheckpointOne: React.FC = () => {
  const frame = useCurrentFrame();

  // 5-second interactive pause (150 frames at 30 fps)
  const isPausedCheckpoint = frame < 150;

  // Three cards entrance staggered after frame 150
  const card1Entrance = interpolate(frame, [150, 210], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const card2Entrance = interpolate(frame, [230, 290], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const card3Entrance = interpolate(frame, [310, 370], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Transformation of cards into graphs (fade in graph components)
  const graph1Opacity = interpolate(frame, [220, 280], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const graph2Opacity = interpolate(frame, [300, 360], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const graph3Opacity = interpolate(frame, [380, 440], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Connecting bayesian graph spark
  const sparkProgress = interpolate(frame, [360, 600], [0, 1], {
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
      <BackgroundGrid intensity={1.0} />

      {/* 5-second Interactive Checkpoint 1 Waiting Frame */}
      {isPausedCheckpoint && <WaitingFrame durationInFrames={150} />}

      {/* Main Container */}
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
        {/* Top Header Placeholder: Checkpoint / Three Steps */}
        <div style={{ marginBottom: 50, display: 'flex', gap: 24, alignItems: 'center' }}>
          <PlaceholderBox width={460} height={56} variant="pill" accent="blue" glow>
            <div style={{ width: '50%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
          </PlaceholderBox>
          <PlaceholderBox width={140} height={56} variant="pill" accent="coral" />
        </div>

        {/* Bayesian Flow Arrows / Network lines */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 2800,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 1fr',
            gap: 70,
            alignItems: 'center',
          }}
        >
          {/* STEP 1: PRIOR (Wide Gaussian Curve) */}
          <div
            style={{
              opacity: isPausedCheckpoint ? 0.6 : card1Entrance,
              transform: `translateY(${(1 - card1Entrance) * 40}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Step Card Title Placeholder */}
            <div style={{ marginBottom: 20 }}>
              <PlaceholderBox width={320} height={52} variant="card" accent="blue" cornerMarks glow>
                <div style={{ width: '60%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
              </PlaceholderBox>
            </div>

            {/* Graph Card: Wide Prior Curve */}
            <div
              style={{
                width: '100%',
                height: 520,
                borderRadius: 24,
                backgroundColor: THEME.colors.bgCard,
                border: `2px solid rgba(78, 168, 222, 0.4)`,
                padding: 30,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {frame >= 200 ? (
                <div style={{ opacity: graph1Opacity, width: '100%' }}>
                  <BellCurve
                    width={760}
                    height={420}
                    mean={0.42}
                    stdDev={0.28}
                    color={THEME.colors.electricBlue}
                    showFill
                  />
                </div>
              ) : (
                <PlaceholderBox width="90%" height={380} variant="dashed" accent="blue" pulse />
              )}
            </div>
          </div>

          {/* STEP 2: LIKELIHOOD (Observed Data Points) */}
          <div
            style={{
              opacity: isPausedCheckpoint ? 0.6 : card2Entrance,
              transform: `translateY(${(1 - card2Entrance) * 40}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Step Card Title Placeholder */}
            <div style={{ marginBottom: 20 }}>
              <PlaceholderBox width={320} height={52} variant="card" accent="coral" cornerMarks glow>
                <div style={{ width: '60%', height: 16, backgroundColor: THEME.colors.warmCoral, borderRadius: 4 }} />
              </PlaceholderBox>
            </div>

            {/* Graph Card: Scatter Observations */}
            <div
              style={{
                width: '100%',
                height: 520,
                borderRadius: 24,
                backgroundColor: THEME.colors.bgCard,
                border: `2px solid rgba(255, 123, 84, 0.4)`,
                padding: 30,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              }}
            >
              {frame >= 280 ? (
                <div style={{ opacity: graph2Opacity, width: '100%' }}>
                  <BellCurve
                    width={760}
                    height={420}
                    mean={0.68}
                    stdDev={0.16}
                    color={THEME.colors.warmCoral}
                    showFill
                    dataPoints={[
                      { x: 0.62 },
                      { x: 0.66 },
                      { x: 0.71 },
                      { x: 0.69 },
                      { x: 0.74 },
                    ]}
                  />
                </div>
              ) : (
                <PlaceholderBox width="90%" height={380} variant="dashed" accent="coral" pulse />
              )}
            </div>
          </div>

          {/* STEP 3: POSTERIOR (Updated Narrower Curve) */}
          <div
            style={{
              opacity: isPausedCheckpoint ? 0.6 : card3Entrance,
              transform: `translateY(${(1 - card3Entrance) * 40}px)`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Step Card Title Placeholder */}
            <div style={{ marginBottom: 20 }}>
              <PlaceholderBox width={320} height={52} variant="card" accent="blue" cornerMarks glow>
                <div style={{ width: '70%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
              </PlaceholderBox>
            </div>

            {/* Graph Card: Posterior (Sharp narrow curve + prior comparison) */}
            <div
              style={{
                width: '100%',
                height: 520,
                borderRadius: 24,
                backgroundColor: THEME.colors.bgCardHighlight,
                border: `3px solid ${THEME.colors.electricBlue}`,
                padding: 30,
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: `0 20px 60px rgba(0,0,0,0.6), 0 0 40px ${THEME.colors.electricBlueGlow}`,
              }}
            >
              {frame >= 360 ? (
                <div style={{ opacity: graph3Opacity, width: '100%' }}>
                  <BellCurve
                    width={760}
                    height={420}
                    mean={0.61}
                    stdDev={0.12} // narrower!
                    color={THEME.colors.electricBlue}
                    priorOutline={{ mean: 0.42, stdDev: 0.28 }} // compares with initial prior!
                    showFill
                    showConfidenceInterval
                  />
                </div>
              ) : (
                <PlaceholderBox width="90%" height={380} variant="dashed" accent="blue" pulse />
              )}
            </div>
          </div>
        </div>

        {/* Bottom Flow Connectors and Legend Placeholders */}
        <div style={{ marginTop: 60, display: 'flex', gap: 40, alignItems: 'center' }}>
          <PlaceholderBox width={260} height={46} variant="pill" accent="neutral" />
          <div style={{ width: 140, height: 3, backgroundColor: THEME.colors.electricBlueGlow }} />
          <PlaceholderBox width={260} height={46} variant="pill" accent="coral" />
          <div style={{ width: 140, height: 3, backgroundColor: THEME.colors.electricBlueGlow }} />
          <PlaceholderBox width={260} height={46} variant="pill" accent="blue" glow />
        </div>
      </div>
    </div>
  );
};
