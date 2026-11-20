import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../../theme';

interface BellCurveProps {
  width: number;
  height: number;
  mean?: number; // 0 to 1 (relative to width)
  stdDev?: number; // 0.05 to 0.4 (relative to width)
  color?: string;
  glowColor?: string;
  showFill?: boolean;
  showConfidenceInterval?: boolean;
  ciWidth?: number; // width of confidence interval
  dataPoints?: Array<{ x: number; isOutlier?: boolean }>;
  priorOutline?: { mean: number; stdDev: number };
  peakGlow?: boolean;
}

export const BellCurve: React.FC<BellCurveProps> = ({
  width,
  height,
  mean = 0.5,
  stdDev = 0.15,
  color = THEME.colors.electricBlue,
  glowColor = THEME.colors.electricBlueGlow,
  showFill = true,
  showConfidenceInterval = false,
  ciWidth = 1.96,
  dataPoints = [],
  priorOutline,
  peakGlow = true,
}) => {
  const frame = useCurrentFrame();

  // Generate smooth Gaussian SVG path
  const { pathD, areaD, peakY, peakX, ciStartX, ciEndX } = useMemo(() => {
    const pointsCount = 120;
    const paddingX = 40;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - 60;
    const baselineY = height - 30;

    const actualMeanX = paddingX + mean * usableWidth;
    const actualStdDevX = stdDev * usableWidth;

    let maxVal = 0;
    const calculated: Array<[number, number]> = [];

    for (let i = 0; i <= pointsCount; i++) {
      const x = paddingX + (i / pointsCount) * usableWidth;
      const diff = (x - actualMeanX) / (actualStdDevX || 1);
      // Gaussian: f(x) = exp(-0.5 * diff^2)
      const val = Math.exp(-0.5 * diff * diff);
      if (val > maxVal) maxVal = val;
      calculated.push([x, val]);
    }

    // Scale to usable height
    const scaledPoints = calculated.map(([x, val]) => {
      const y = baselineY - (val / (maxVal || 1)) * usableHeight;
      return [x, y];
    });

    // Build SVG Path
    const dStr = scaledPoints.reduce((acc, [x, y], idx) => {
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');

    const areaStr = `${dStr} L ${(paddingX + usableWidth).toFixed(1)} ${baselineY.toFixed(1)} L ${paddingX.toFixed(1)} ${baselineY.toFixed(1)} Z`;

    const pX = actualMeanX;
    const pY = baselineY - usableHeight;

    const cStart = Math.max(paddingX, actualMeanX - ciWidth * actualStdDevX);
    const cEnd = Math.min(paddingX + usableWidth, actualMeanX + ciWidth * actualStdDevX);

    return {
      pathD: dStr,
      areaD: areaStr,
      peakX: pX,
      peakY: pY,
      ciStartX: cStart,
      ciEndX: cEnd,
    };
  }, [width, height, mean, stdDev, ciWidth]);

  // Prior comparison path if provided
  const priorPathD = useMemo(() => {
    if (!priorOutline) return null;
    const pointsCount = 80;
    const paddingX = 40;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - 60;
    const baselineY = height - 30;

    const actualMeanX = paddingX + priorOutline.mean * usableWidth;
    const actualStdDevX = priorOutline.stdDev * usableWidth;

    let maxVal = 0;
    const calculated: Array<[number, number]> = [];
    for (let i = 0; i <= pointsCount; i++) {
      const x = paddingX + (i / pointsCount) * usableWidth;
      const diff = (x - actualMeanX) / (actualStdDevX || 1);
      const val = Math.exp(-0.5 * diff * diff);
      if (val > maxVal) maxVal = val;
      calculated.push([x, val]);
    }

    const scaled = calculated.map(([x, val]) => {
      const y = baselineY - (val / (maxVal || 1)) * (usableHeight * 0.7);
      return [x, y];
    });

    return scaled.reduce((acc, [x, y], idx) => {
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  }, [width, height, priorOutline]);

  const pulse = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.85, 1.15]);

  return (
    <div style={{ position: 'relative', width, height }}>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        <defs>
          <linearGradient id={`grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.45" />
            <stop offset="60%" stopColor={color} stopOpacity="0.12" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>

          <filter id="glow-filter" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Baseline axis */}
        <line
          x1={30}
          y1={height - 30}
          x2={width - 30}
          y2={height - 30}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="2"
        />

        {/* Confidence Interval band */}
        {showConfidenceInterval && (
          <rect
            x={ciStartX}
            y={peakY}
            width={Math.max(10, ciEndX - ciStartX)}
            height={height - 30 - peakY}
            fill={THEME.colors.electricBlueSubtle}
            stroke={`2px dashed ${THEME.colors.electricBlue}`}
            rx={8}
            opacity={0.65}
          />
        )}

        {/* Prior Outline (dashed wide historical curve) */}
        {priorPathD && (
          <path
            d={priorPathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
          />
        )}

        {/* Area fill */}
        {showFill && (
          <path
            d={areaD}
            fill={`url(#grad-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
          />
        )}

        {/* Curve stroke */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="4"
          filter="url(#glow-filter)"
        />

        {/* Peak indicator dot */}
        {peakGlow && (
          <circle
            cx={peakX}
            cy={peakY}
            r={7 * pulse}
            fill={color}
            boxShadow={`0 0 20px ${glowColor}`}
          />
        )}

        {/* Observed data scatter points */}
        {dataPoints.map((dp, idx) => {
          const ptX = 40 + dp.x * (width - 80);
          const ptColor = dp.isOutlier ? THEME.colors.warmCoral : THEME.colors.electricBlue;
          return (
            <g key={idx}>
              <circle
                cx={ptX}
                cy={height - 30}
                r={dp.isOutlier ? 9 : 6}
                fill={ptColor}
                opacity={0.9}
              />
              <line
                x1={ptX}
                y1={height - 30}
                x2={ptX}
                y2={height - 55}
                stroke={ptColor}
                strokeWidth="2"
                strokeDasharray="3 3"
                opacity={0.7}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
