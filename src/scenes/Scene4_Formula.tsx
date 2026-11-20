import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { BellCurve } from '../components/common/BellCurve';

export const Scene4_Formula: React.FC = () => {
  const frame = useCurrentFrame();

  // Entrance of each formula term
  const termPosteriorEntrance = interpolate(frame, [30, 90], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const termLikelihoodEntrance = interpolate(frame, [80, 140], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  const termPriorEntrance = interpolate(frame, [130, 190], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Spark stream animation flowing between terms
  const sparkPhase = (frame * 0.08) % 1;

  // Synthesis curve emergence at the bottom
  const synthesisEntrance = interpolate(frame, [220, 320], [0, 1], {
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
      }}
    >
      <BackgroundGrid intensity={1.1} />

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
        {/* Top Header Placeholder: Formula Header */}
        <div style={{ marginBottom: 70 }}>
          <PlaceholderBox width={500} height={60} variant="pill" accent="blue" glow>
            <div style={{ width: '60%', height: 18, backgroundColor: THEME.colors.electricBlue, borderRadius: 6 }} />
          </PlaceholderBox>
        </div>

        {/* THE ANIMATED FORMULA CONTAINER: [ ] ∝ [ ] × [ ] */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 40,
            marginBottom: 80,
          }}
        >
          {/* TERM 1: POSTERIOR P(rating | data) */}
          <div
            style={{
              opacity: termPosteriorEntrance,
              transform: `scale(${termPosteriorEntrance})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <PlaceholderBox width={420} height={130} variant="card" accent="blue" glow pulse cornerMarks>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 140, height: 26, backgroundColor: THEME.colors.electricBlue, borderRadius: 6 }} />
                <div style={{ width: 4, height: 32, backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <div style={{ width: 110, height: 26, backgroundColor: 'rgba(78, 168, 222, 0.5)', borderRadius: 6 }} />
              </div>
            </PlaceholderBox>
            <PlaceholderBox width={180} height={32} variant="pill" accent="neutral" />
          </div>

          {/* SYMBOL: ∝ (PROPORTIONAL TO) */}
          <div
            style={{
              fontSize: 90,
              color: THEME.colors.white,
              fontWeight: 300,
              fontFamily: 'serif',
              textShadow: `0 0 20px ${THEME.colors.electricBlueGlow}`,
              padding: '0 10px',
            }}
          >
            ∝
          </div>

          {/* TERM 2: LIKELIHOOD P(data | rating) */}
          <div
            style={{
              opacity: termLikelihoodEntrance,
              transform: `scale(${termLikelihoodEntrance})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <PlaceholderBox width={420} height={130} variant="card" accent="coral" glow cornerMarks>
              <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                <div style={{ width: 110, height: 26, backgroundColor: THEME.colors.warmCoral, borderRadius: 6 }} />
                <div style={{ width: 4, height: 32, backgroundColor: 'rgba(255,255,255,0.4)' }} />
                <div style={{ width: 140, height: 26, backgroundColor: 'rgba(255, 123, 84, 0.5)', borderRadius: 6 }} />
              </div>
            </PlaceholderBox>
            <PlaceholderBox width={180} height={32} variant="pill" accent="coral" />
          </div>

          {/* SYMBOL: × (MULTIPLY) */}
          <div
            style={{
              fontSize: 70,
              color: THEME.colors.white,
              fontWeight: 400,
              fontFamily: 'sans-serif',
              padding: '0 10px',
            }}
          >
            ×
          </div>

          {/* TERM 3: PRIOR P(rating) */}
          <div
            style={{
              opacity: termPriorEntrance,
              transform: `scale(${termPriorEntrance})`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <PlaceholderBox width={360} height={130} variant="card" accent="blue" cornerMarks>
              <div style={{ width: 180, height: 26, backgroundColor: THEME.colors.electricBlue, borderRadius: 6 }} />
            </PlaceholderBox>
            <PlaceholderBox width={160} height={32} variant="pill" accent="neutral" />
          </div>
        </div>

        {/* CONNECTING SPARKS & CONVERGENCE INTO RESULTING CURVE */}
        <div
          style={{
            position: 'relative',
            width: 1200,
            height: 380,
            opacity: synthesisEntrance,
            transform: `scale(${synthesisEntrance})`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Animated SVG Stream Lines converging */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1200 380"
            style={{ position: 'absolute', inset: 0, overflow: 'visible' }}
          >
            {/* Left flowing stream (from Prior) */}
            <path
              d="M 200 0 C 200 120, 500 140, 600 160"
              fill="none"
              stroke={THEME.colors.electricBlue}
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeDashoffset={-frame * 3}
              opacity={0.6}
            />
            {/* Right flowing stream (from Likelihood) */}
            <path
              d="M 1000 0 C 1000 120, 700 140, 600 160"
              fill="none"
              stroke={THEME.colors.warmCoral}
              strokeWidth="3"
              strokeDasharray="8 8"
              strokeDashoffset={-frame * 3}
              opacity={0.6}
            />
          </svg>

          {/* The Resulting Bell Curve Display */}
          <div
            style={{
              width: 900,
              height: 340,
              borderRadius: 24,
              backgroundColor: 'rgba(19, 34, 56, 0.9)',
              border: `2px solid ${THEME.colors.electricBlue}`,
              boxShadow: `0 0 50px ${THEME.colors.electricBlueGlow}`,
              padding: 20,
              boxSizing: 'border-box',
            }}
          >
            <BellCurve
              width={860}
              height={300}
              mean={0.55}
              stdDev={0.11}
              color={THEME.colors.electricBlue}
              showFill
              showConfidenceInterval
            />
          </div>
        </div>
      </div>
    </div>
  );
};
