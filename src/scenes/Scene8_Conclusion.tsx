import React from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { PlaceholderBox } from '../components/common/PlaceholderBox';
import { BellCurve } from '../components/common/BellCurve';
import { AlertTriangle, ShieldAlert, AlertCircle } from 'lucide-react';

export const Scene8_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Part 1: Warnings entrance (0 - 300 frames)
  const warningsOpacity = interpolate(frame, [0, 40, 260, 300], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Part 2: Summary card entrance (280 - 600 frames)
  const summaryOpacity = interpolate(frame, [280, 340, 560, 600], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Part 3: Finale Bell curve and credits (580 - 900 frames)
  const finaleOpacity = interpolate(frame, [580, 640], [0, 1], {
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
        {/* PART 1: THREE WARNING ICONS WITH PLACEHOLDERS (Frames 0 - 300) */}
        {frame < 300 && (
          <div
            style={{
              opacity: warningsOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 60,
            }}
          >
            {/* Header Placeholder */}
            <PlaceholderBox width={500} height={56} variant="pill" accent="coral" glow>
              <div style={{ width: '60%', height: 16, backgroundColor: THEME.colors.warmCoral, borderRadius: 4 }} />
            </PlaceholderBox>

            {/* 3 Warning Cards */}
            <div style={{ display: 'flex', gap: 60 }}>
              {[
                { icon: AlertTriangle, id: 1 },
                { icon: ShieldAlert, id: 2 },
                { icon: AlertCircle, id: 3 },
              ].map((item, idx) => {
                const Icon = item.icon;
                const cardEntrance = interpolate(
                  frame,
                  [20 + idx * 30, 60 + idx * 30],
                  [0, 1],
                  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
                );

                return (
                  <div
                    key={item.id}
                    style={{
                      transform: `scale(${cardEntrance})`,
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 24,
                    }}
                  >
                    <div
                      style={{
                        width: 150,
                        height: 150,
                        borderRadius: 30,
                        backgroundColor: 'rgba(255, 123, 84, 0.15)',
                        border: `3px solid ${THEME.colors.warmCoral}`,
                        boxShadow: `0 0 40px ${THEME.colors.warmCoralGlow}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: THEME.colors.warmCoral,
                      }}
                    >
                      <Icon size={70} strokeWidth={2.2} />
                    </div>

                    <PlaceholderBox width={320} height={50} variant="card" accent="coral">
                      <div style={{ width: '65%', height: 14, backgroundColor: THEME.colors.warmCoral, borderRadius: 4 }} />
                    </PlaceholderBox>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* PART 2: SUMMARY CARD WITH 3 STACKED PLACEHOLDER ROWS (Frames 280 - 600) */}
        {frame >= 280 && frame < 600 && (
          <div
            style={{
              opacity: summaryOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 40,
            }}
          >
            {/* Header Placeholder */}
            <PlaceholderBox width={460} height={56} variant="pill" accent="blue" glow>
              <div style={{ width: '55%', height: 16, backgroundColor: THEME.colors.electricBlue, borderRadius: 4 }} />
            </PlaceholderBox>

            {/* Stacked Summary Card */}
            <div
              style={{
                width: 1100,
                borderRadius: 28,
                backgroundColor: THEME.colors.bgCardHighlight,
                border: `3px solid ${THEME.colors.electricBlue}`,
                boxShadow: `0 24px 80px rgba(0, 0, 0, 0.6), 0 0 50px ${THEME.colors.electricBlueGlow}`,
                padding: '50px 60px',
                display: 'flex',
                flexDirection: 'column',
                gap: 30,
                boxSizing: 'border-box',
              }}
            >
              {[1, 2, 3].map((row) => (
                <div
                  key={row}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 30,
                    padding: '16px 24px',
                    borderRadius: 16,
                    backgroundColor: 'rgba(13, 27, 42, 0.7)',
                    border: '1.5px solid rgba(78, 168, 222, 0.25)',
                  }}
                >
                  <div
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: '50%',
                      backgroundColor: THEME.colors.electricBlue,
                      boxShadow: `0 0 12px ${THEME.colors.electricBlue}`,
                    }}
                  />
                  <div style={{ flex: 1, height: 20, backgroundColor: 'rgba(255, 255, 255, 0.25)', borderRadius: 6 }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* PART 3: FINALE BELL CURVE + UPWARD ARROW + TEAM CREDITS (Frames 580 - 900) */}
        {frame >= 580 && (
          <div
            style={{
              opacity: finaleOpacity,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: '100%',
              maxWidth: 2400,
            }}
          >
            {/* Top Finale Graph with Upward Arrow */}
            <div
              style={{
                position: 'relative',
                width: 1400,
                height: 440,
                borderRadius: 28,
                backgroundColor: THEME.colors.bgCard,
                border: `2px solid rgba(78, 168, 222, 0.4)`,
                padding: 30,
                boxSizing: 'border-box',
                marginBottom: 40,
                boxShadow: '0 24px 80px rgba(0, 0, 0, 0.7), 0 0 40px rgba(78, 168, 222, 0.2)',
              }}
            >
              <BellCurve
                width={1340}
                height={370}
                mean={0.5}
                stdDev={0.11}
                color={THEME.colors.electricBlue}
                showFill
                showConfidenceInterval
                dataPoints={[{ x: 0.35 }, { x: 0.44 }, { x: 0.52 }, { x: 0.58 }, { x: 0.64 }]}
              />

              {/* Upward Vector Arrow floating above the peak */}
              <div
                style={{
                  position: 'absolute',
                  top: 40,
                  right: 180,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  padding: '12px 24px',
                  borderRadius: 9999,
                  backgroundColor: 'rgba(13, 27, 42, 0.85)',
                  border: `2px solid ${THEME.colors.electricBlue}`,
                  boxShadow: `0 0 25px ${THEME.colors.electricBlueGlow}`,
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M7 17L17 7M17 7H9M17 7V15"
                    stroke={THEME.colors.electricBlue}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div style={{ width: 80, height: 12, backgroundColor: THEME.colors.electricBlue, borderRadius: 6 }} />
              </div>
            </div>

            {/* Bottom Title Placeholder Card */}
            <div style={{ marginBottom: 40 }}>
              <PlaceholderBox width={700} height={70} variant="card" accent="blue" glow cornerMarks>
                <div style={{ width: '70%', height: 20, backgroundColor: THEME.colors.electricBlue, borderRadius: 6 }} />
              </PlaceholderBox>
            </div>

            {/* AUTHOR CREDITS: Голомидова Женя, Селиванов Илья, Константин Толов, Фураев Никита */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 14,
                padding: '24px 48px',
                borderRadius: 20,
                backgroundColor: 'rgba(13, 27, 42, 0.75)',
                border: '1.5px solid rgba(78, 168, 222, 0.25)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div
                style={{
                  fontSize: 18,
                  fontWeight: 600,
                  letterSpacing: 4,
                  textTransform: 'uppercase',
                  color: THEME.colors.textMuted,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                НАД ПРОЕКТОМ РАБОТАЛИ
              </div>
              <div
                style={{
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: 1.5,
                  color: THEME.colors.white,
                  fontFamily: 'system-ui, sans-serif',
                  display: 'flex',
                  gap: 24,
                }}
              >
                <span>Голомидова Женя</span>
                <span style={{ color: THEME.colors.electricBlue }}>•</span>
                <span>Селиванов Илья</span>
                <span style={{ color: THEME.colors.electricBlue }}>•</span>
                <span>Константин Толов</span>
                <span style={{ color: THEME.colors.electricBlue }}>•</span>
                <span>Фураев Никита</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
