import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';

export const Scene2_TwoTraps: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth continuous scrolling noise waveform
  const leftNoisePath = useMemo(() => {
    const pointsCount = 80;
    const width = 1100;
    const height = 280;
    return Array.from({ length: pointsCount })
      .map((_, i) => {
        const x = (i / (pointsCount - 1)) * width;
        const scrollT = (i * 0.3) + (frame * 0.05);
        const noise = Math.sin(scrollT * 1.1) * 35 + Math.sin(scrollT * 2.3) * 18 + Math.cos(scrollT * 0.4) * 22;
        const y = height / 2 + noise;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [frame]);

  // Inertia line for right trap
  const rightInertiaPath = useMemo(() => {
    const width = 1100;
    const height = 280;
    return `M 0 ${height * 0.55} L ${width * 0.75} ${height * 0.55} L ${width} ${height * 0.52}`;
  }, []);

  // Alert beacon
  const alertBlink = interpolate(Math.sin((frame * Math.PI * 2) / 60), [-1, 1], [0.3, 1]);

  // Center scale entrance in the second half
  const scaleEntrance = interpolate(frame, [450, 560], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });

  // Scale oscillation settling into equilibrium
  const scaleTilt = interpolate(
    Math.sin((frame - 450) * 0.08) * Math.exp(-(frame - 450) / 250),
    [-1, 1],
    [-14, 14]
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
      <BackgroundGrid intensity={1} />

      {/* Main Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          padding: '40px 60px',
          boxSizing: 'border-box',
          width: 1920,
          height: 1080,
          overflow: 'hidden',
        }}
      >
        {/* Top Editorial Scene Header */}
        <div style={{ textAlign: 'center', marginBottom: 30 }}>
          <div style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 500 }}>
            Методологическая дилемма
          </div>
          <div style={{ fontSize: 34, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
            Две ловушки оценки данных в прямом эфире
          </div>
        </div>

        {/* Split Screen Cards */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 36,
            width: '100%',
            maxWidth: 1760,
            margin: '0 auto',
          }}
        >
          {/* TRAP 1: OVER-REACTION TO EARLY NOISE */}
          <div
            style={{
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.75)',
              border: '1px solid rgba(249, 115, 22, 0.3)',
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(249, 115, 22, 0.12)',
                    color: THEME.colors.amber,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Ловушка 1: Паника на шуме
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.amber, fontWeight: 600 }}>Ошибка гиперреакции</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 14 }}>
                Слепо верить первым 5 оценкам
              </div>
              <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
                Случайный всплеск или 1 хейтер мгновенно обрушивает рейтинг стрима. Ошибка сверхчувствительности.
              </div>
            </div>

            {/* Noisy Oscillation Path */}
            <div style={{ position: 'relative', height: 280, margin: '14px 0' }}>
              <svg width="100%" height="100%" viewBox="0 0 1100 280" style={{ overflow: 'visible' }}>
                <line x1="0" y1="140" x2="1100" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <path
                  d={leftNoisePath}
                  fill="none"
                  stroke={THEME.colors.amber}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <div
              style={{
                padding: '14px 20px',
                borderRadius: 10,
                backgroundColor: 'rgba(249, 115, 22, 0.08)',
                border: '1px solid rgba(249, 115, 22, 0.2)',
                fontSize: 13,
                color: THEME.colors.amber,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              Риск: ложные тревоги и резкие скачки рейтинга
            </div>
          </div>

          {/* TRAP 2: COMPLETE INERTIA */}
          <div
            style={{
              borderRadius: 18,
              backgroundColor: 'rgba(21, 29, 46, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '28px 36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span
                  style={{
                    padding: '6px 14px',
                    borderRadius: 6,
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    color: THEME.colors.textSecondary,
                    fontSize: 13,
                    fontWeight: 600,
                  }}
                >
                  Ловушка 2: Запоздание реакции
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 600 }}>Ошибка инерции</span>
              </div>
              <div style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 14 }}>
                Игнорировать свежие сигналы
              </div>
              <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.5 }}>
                Ждать тысячи голосов, удерживая старый рейтинг. Система «засыпает» и не реагирует на реальные сбои эфира.
              </div>
            </div>

            {/* Flat Inactive Path with Alert Beacon */}
            <div style={{ position: 'relative', height: 280, margin: '14px 0' }}>
              <svg width="100%" height="100%" viewBox="0 0 1100 280" style={{ overflow: 'visible' }}>
                <line x1="0" y1="140" x2="1100" y2="140" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 4" />
                <path
                  d={rightInertiaPath}
                  fill="none"
                  stroke={THEME.colors.textMuted}
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                />
                <circle
                  cx={825}
                  cy={148}
                  r={7}
                  fill={THEME.colors.amber}
                  opacity={alertBlink}
                />
              </svg>
            </div>

            <div
              style={{
                padding: '14px 20px',
                borderRadius: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                fontSize: 13,
                color: THEME.colors.textSecondary,
                textAlign: 'center',
                fontWeight: 500,
              }}
            >
              Риск: потеря сигнала и запоздалая реакция
            </div>
          </div>
        </div>
      </div>

      {/* CENTER DIALOGUE: THE BAYESIAN RESOLUTION */}
      {frame >= 450 && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: `translate(-50%, -50%) scale(${scaleEntrance})`,
            width: 920,
            height: 600,
            borderRadius: 24,
            backgroundColor: '#0E1422',
            border: '1px solid rgba(56, 189, 248, 0.4)',
            boxShadow: '0 30px 90px rgba(0, 0, 0, 0.85)',
            padding: 44,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'space-between',
            backdropFilter: 'blur(30px)',
            zIndex: 30,
            boxSizing: 'border-box',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <span
              style={{
                padding: '4px 14px',
                borderRadius: 6,
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: THEME.colors.cobalt,
                fontSize: 12,
                fontWeight: 600,
              }}
            >
              Байесовский баланс
            </span>
            <div style={{ fontSize: 24, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 8 }}>
              Взвешивание: накопленный опыт + текущие наблюдения
            </div>
          </div>

          {/* Minimalist Vector Balance Scale */}
          <div style={{ position: 'relative', width: 600, height: 240 }}>
            <svg width="600" height="240" viewBox="0 0 600 240" style={{ overflow: 'visible' }}>
              {/* Stand */}
              <line x1="300" y1="40" x2="300" y2="210" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <line x1="240" y1="210" x2="360" y2="210" stroke="rgba(255,255,255,0.4)" strokeWidth="3" strokeLinecap="round" />
              <circle cx="300" cy="40" r="6" fill={THEME.colors.cobalt} />

              {/* Tilting Beam */}
              <g transform={`rotate(${scaleTilt}, 300, 40)`}>
                <line x1="80" y1="40" x2="520" y2="40" stroke={THEME.colors.cobalt} strokeWidth="3" />
                {/* Left Pan (Prior) */}
                <line x1="120" y1="40" x2="120" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <path d="M 60 100 Q 120 125 180 100 Z" fill="rgba(56, 189, 248, 0.15)" stroke={THEME.colors.cobalt} strokeWidth="1.5" />
                {/* Right Pan (Data) */}
                <line x1="480" y1="40" x2="480" y2="100" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                <path d="M 420 100 Q 480 125 540 100 Z" fill="rgba(249, 115, 22, 0.15)" stroke={THEME.colors.amber} strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Bottom Mathematical Sum Formula */}
          <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
            <div
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                backgroundColor: 'rgba(56, 189, 248, 0.08)',
                border: '1px solid rgba(56, 189, 248, 0.25)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: THEME.colors.cobalt,
              }}
            >
              Априорный вес (опыт)
            </div>
            <span style={{ fontSize: 24, color: THEME.colors.textMuted, fontWeight: 700 }}>+</span>
            <div
              style={{
                padding: '12px 24px',
                borderRadius: 10,
                backgroundColor: 'rgba(249, 115, 22, 0.08)',
                border: '1px solid rgba(249, 115, 22, 0.25)',
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 14,
                fontWeight: 600,
                color: THEME.colors.amber,
              }}
            >
              Текущие наблюдения (данные)
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
