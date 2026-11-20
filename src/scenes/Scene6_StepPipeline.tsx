import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { BellCurve } from '../components/common/BellCurve';
import { BarChart3, Radio, Scale, RefreshCw } from 'lucide-react';

export const Scene6_StepPipeline: React.FC = () => {
  const frame = useCurrentFrame();

  // Cycle period: 300 frames per loop (~10 seconds)
  const cycleFrame = frame % 300;
  const cycleCount = Math.floor(frame / 300); // 0, 1, 2, 3, 4

  // Active stage in current cycle (0, 1, 2, 3)
  const activeStage = Math.min(3, Math.floor(cycleFrame / 75));

  // Gaussian stdDev narrows and mean shifts with each cycle iteration
  // Starts wide (0.24), narrows down to (0.09) by 4th cycle
  const currentStdDev = Math.max(0.08, 0.24 - cycleCount * 0.035 - (cycleFrame / 300) * 0.035);
  const currentMean = 0.45 + (cycleCount * 0.04) + (cycleFrame / 300) * 0.04;

  const stages = [
    { id: 0, icon: BarChart3, labelAccent: 'blue' as const },
    { id: 1, icon: Radio, labelAccent: 'blue' as const },
    { id: 2, icon: Scale, labelAccent: 'coral' as const },
    { id: 3, icon: RefreshCw, labelAccent: 'blue' as const },
  ];

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
        {/* Top Header Placeholder: 4-Step Conveyor */}
        <div style={{ marginBottom: 50 }}>
          <PlaceholderBox width={540} height={56} variant="pill" accent="blue" glow>
            <div style={{ width: '60%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
          </PlaceholderBox>
        </div>

        {/* HORIZONTAL CONVEYOR PIPELINE CONTAINER */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 2400,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 60,
            padding: '40px 60px',
            boxSizing: 'border-box',
          }}
        >
          {/* Closed-loop return track arrow (from stage 4 back to stage 1) */}
          <svg
            width="100%"
            height="180"
            viewBox="0 0 2200 180"
            style={{ position: 'absolute', top: -30, left: 0, overflow: 'visible', pointerEvents: 'none' }}
          >
            {/* Top Loop Return Arc */}
            <path
              d="M 1950 40 C 1950 -60, 250 -60, 250 40"
              fill="none"
              stroke={THEME.colors.electricBlue}
              strokeWidth="3"
              strokeDasharray="10 10"
              strokeDashoffset={-frame * 2.5}
              opacity={0.45}
            />
            {/* Return Arrow Head */}
            <polygon
              points="240,40 260,40 250,55"
              fill={THEME.colors.electricBlue}
            />
          </svg>

          {/* 4 Conveyor Stages */}
          {stages.map((stg, idx) => {
            const Icon = stg.icon;
            const isActive = activeStage === stg.id;
            const pulse = isActive
              ? interpolate(Math.sin(frame * 0.2), [-1, 1], [1.02, 1.08])
              : 1;

            return (
              <React.Fragment key={stg.id}>
                {/* Stage Node Card */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 18,
                    transform: `scale(${pulse})`,
                    transition: 'transform 0.15s ease',
                  }}
                >
                  {/* Icon Circle */}
                  <div
                    style={{
                      width: 140,
                      height: 140,
                      borderRadius: 28,
                      backgroundColor: isActive ? 'rgba(78, 168, 222, 0.25)' : THEME.colors.bgCard,
                      border: `3px solid ${isActive ? THEME.colors.electricBlue : 'rgba(78, 168, 222, 0.3)'}`,
                      boxShadow: isActive ? `0 0 40px ${THEME.colors.electricBlueGlow}` : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: isActive ? THEME.colors.white : THEME.colors.electricBlue,
                    }}
                  >
                    <Icon
                      size={60}
                      strokeWidth={2.2}
                      style={{
                        transform: stg.id === 3 ? `rotate(${frame * 2}deg)` : 'none',
                      }}
                    />
                  </div>

                  {/* Stage Placeholder Label Box */}
                  <PlaceholderBox
                    width={220}
                    height={44}
                    variant="card"
                    accent={stg.labelAccent}
                    glow={isActive}
                    pulse={isActive}
                  >
                    <div
                      style={{
                        width: '60%',
                        height: 12,
                        backgroundColor: isActive ? THEME.colors.electricBlue : 'rgba(78, 168, 222, 0.4)',
                        borderRadius: 4,
                      }}
                    />
                  </PlaceholderBox>
                </div>

                {/* Connector Arrow Between Stages */}
                {idx < stages.length - 1 && (
                  <div style={{ display: 'flex', alignItems: 'center', opacity: 0.7 }}>
                    <svg width="100" height="24" viewBox="0 0 100 24">
                      <line
                        x1="0"
                        y1="12"
                        x2="90"
                        y2="12"
                        stroke={THEME.colors.electricBlue}
                        strokeWidth="3"
                        strokeDasharray="6 6"
                        strokeDashoffset={-frame * 2}
                      />
                      <polygon points="85,6 98,12 85,18" fill={THEME.colors.electricBlue} />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* PROGRESSIVELY NARROWING & SHIFTING BELL CURVE */}
        <div
          style={{
            width: 1400,
            height: 400,
            borderRadius: 24,
            backgroundColor: THEME.colors.bgCardHighlight,
            border: `2px solid rgba(78, 168, 222, 0.4)`,
            padding: 30,
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            marginBottom: 35,
          }}
        >
          <BellCurve
            width={1320}
            height={340}
            mean={currentMean}
            stdDev={currentStdDev}
            color={THEME.colors.electricBlue}
            priorOutline={{ mean: 0.45, stdDev: 0.24 }}
            showFill
            showConfidenceInterval
          />
        </div>

        {/* Bottom Status Placeholder: "FORECAST UPDATES AS BROADCAST PROGRESSES" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              backgroundColor: 'rgba(78, 168, 222, 0.2)',
              border: `2px solid ${THEME.colors.electricBlue}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: '50%',
                backgroundColor: THEME.colors.electricBlue,
                boxShadow: `0 0 14px ${THEME.colors.electricBlue}`,
              }}
            />
          </div>
          <PlaceholderBox width={560} height={52} variant="card" accent="blue" glow cornerMarks>
            <div style={{ width: '70%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
          </PlaceholderBox>
        </div>
      </div>
    </div>
  );
};
