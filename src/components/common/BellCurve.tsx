import React, { useMemo } from 'react';
import { THEME } from '../../theme';

interface BellCurveProps {
  width: number;
  height: number;
  mean?: number; // 0 to 1 (relative to width)
  stdDev?: number; // 0.05 to 0.4 (relative to width)
  color?: string;
  label?: string;
  showFill?: boolean;
  showConfidenceInterval?: boolean;
  ciWidth?: number; // width of confidence interval (default 1.96 for 95%)
  dataPoints?: Array<{ x: number; isOutlier?: boolean }>;
  priorOutline?: { mean: number; stdDev: number };
}

export const BellCurve: React.FC<BellCurveProps> = ({
  width,
  height,
  mean = 0.5,
  stdDev = 0.15,
  color = THEME.colors.cobalt,
  label,
  showFill = true,
  showConfidenceInterval = false,
  ciWidth = 1.96,
  dataPoints = [],
  priorOutline,
}) => {
  // Generate mathematically exact Gaussian SVG path
  const { pathD, areaD, peakY, peakX, ciStartX, ciEndX } = useMemo(() => {
    const pointsCount = 140;
    const paddingX = 40;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - 70;
    const baselineY = height - 35;

    const actualMeanX = paddingX + mean * usableWidth;
    const actualStdDevX = Math.max(10, stdDev * usableWidth);

    let maxVal = 0;
    const calculated: Array<[number, number]> = [];

    for (let i = 0; i <= pointsCount; i++) {
      const x = paddingX + (i / pointsCount) * usableWidth;
      const diff = (x - actualMeanX) / actualStdDevX;
      const val = Math.exp(-0.5 * diff * diff);
      if (val > maxVal) maxVal = val;
      calculated.push([x, val]);
    }

    const scaledPoints = calculated.map(([x, val]) => {
      const y = baselineY - (val / (maxVal || 1)) * usableHeight;
      return [x, y];
    });

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

  // Prior comparison path if provided (dashed historical curve)
  const priorPathD = useMemo(() => {
    if (!priorOutline) return null;
    const pointsCount = 90;
    const paddingX = 40;
    const usableWidth = width - paddingX * 2;
    const usableHeight = height - 70;
    const baselineY = height - 35;

    const actualMeanX = paddingX + priorOutline.mean * usableWidth;
    const actualStdDevX = Math.max(10, priorOutline.stdDev * usableWidth);

    let maxVal = 0;
    const calculated: Array<[number, number]> = [];
    for (let i = 0; i <= pointsCount; i++) {
      const x = paddingX + (i / pointsCount) * usableWidth;
      const diff = (x - actualMeanX) / actualStdDevX;
      const val = Math.exp(-0.5 * diff * diff);
      if (val > maxVal) maxVal = val;
      calculated.push([x, val]);
    }

    const scaled = calculated.map(([x, val]) => {
      const y = baselineY - (val / (maxVal || 1)) * (usableHeight * 0.65);
      return [x, y];
    });

    return scaled.reduce((acc, [x, y], idx) => {
      return idx === 0 ? `M ${x.toFixed(1)} ${y.toFixed(1)}` : `${acc} L ${x.toFixed(1)} ${y.toFixed(1)}`;
    }, '');
  }, [width, height, priorOutline]);

  const baselineY = height - 35;

  return (
    <div style={{ position: 'relative', width, maxWidth: '100%', height }}>
      <svg
        width="100%"
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={`clean-grad-${color.replace(/[^a-zA-Z0-9]/g, '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.18" />
            <stop offset="100%" stopColor={color} stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* Baseline coordinate axis */}
        <line
          x1={30}
          y1={baselineY}
          x2={width - 30}
          y2={baselineY}
          stroke="rgba(255, 255, 255, 0.15)"
          strokeWidth="1.5"
        />

        {/* Axis Ticks */}
        <line x1={ciStartX} y1={baselineY} x2={ciStartX} y2={baselineY + 6} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <line x1={peakX} y1={baselineY} x2={peakX} y2={baselineY + 8} stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <line x1={ciEndX} y1={baselineY} x2={ciEndX} y2={baselineY + 6} stroke="rgba(255,255,255,0.2)" strokeWidth="1" />

        {/* Confidence Interval band */}
        {showConfidenceInterval && (
          <rect
            x={ciStartX}
            y={peakY}
            width={Math.max(8, ciEndX - ciStartX)}
            height={baselineY - peakY}
            fill="rgba(56, 189, 248, 0.08)"
            stroke="rgba(56, 189, 248, 0.25)"
            strokeDasharray="4 4"
            rx={4}
          />
        )}

        {/* Prior Outline (dashed historical curve) */}
        {priorPathD && (
          <path
            d={priorPathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.25)"
            strokeWidth="1.5"
            strokeDasharray="5 5"
          />
        )}

        {/* Area fill */}
        {showFill && (
          <path
            d={areaD}
            fill={`url(#clean-grad-${color.replace(/[^a-zA-Z0-9]/g, '')})`}
          />
        )}

        {/* Curve stroke: clean 2px hairline */}
        <path
          d={pathD}
          fill="none"
          stroke={color}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Vertical center mean line */}
        <line
          x1={peakX}
          y1={peakY}
          x2={peakX}
          y2={baselineY}
          stroke={color}
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity={0.6}
        />

        {/* Observed data scatter points */}
        {dataPoints.map((dp, idx) => {
          const ptX = 40 + dp.x * (width - 80);
          const ptColor = dp.isOutlier ? THEME.colors.amber : THEME.colors.cobalt;
          return (
            <g key={idx}>
              <circle
                cx={ptX}
                cy={baselineY}
                r={dp.isOutlier ? 4.5 : 3.5}
                fill={ptColor}
                opacity={0.85}
              />
              <line
                x1={ptX}
                y1={baselineY}
                x2={ptX}
                y2={baselineY - 18}
                stroke={ptColor}
                strokeWidth="1"
                strokeDasharray="2 2"
                opacity={0.5}
              />
            </g>
          );
        })}
      </svg>

      {/* Label */}
      {label && (
        <div
          style={{
            position: 'absolute',
            bottom: 6,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 12,
            fontFamily: 'Inter, system-ui, sans-serif',
            color: THEME.colors.textSecondary,
            fontWeight: 500,
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
