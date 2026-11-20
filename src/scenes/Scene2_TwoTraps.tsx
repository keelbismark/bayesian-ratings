import React, { useMemo } from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';

export const Scene2_TwoTraps: React.FC = () => {
  const frame = useCurrentFrame();

  // Smooth continuous noise waveform for Trap 1
  const leftNoisePath = useMemo(() => {
    const pointsCount = 70;
    const width = 800;
    const height = 260;
    return Array.from({ length: pointsCount })
      .map((_, i) => {
        const x = (i / (pointsCount - 1)) * width;
        const scrollT = i * 0.28 + frame * 0.045;
        const noise =
          Math.sin(scrollT * 1.1) * 36 +
          Math.sin(scrollT * 2.3) * 20 +
          Math.cos(scrollT * 0.4) * 24;
        const y = height / 2 + noise;
        return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`;
      })
      .join(' ');
  }, [frame]);

  // Inertia line for Trap 2 with lagging drop
  const rightInertiaPath = useMemo(() => {
    const width = 800;
    const height = 260;
    return `M 0 ${height * 0.48} L ${width * 0.72} ${height * 0.48} L ${width} ${height * 0.46}`;
  }, []);

  // Alert beacon blinking
  const alertBlink = interpolate(
    Math.sin((frame * Math.PI * 2) / 45),
    [-1, 1],
    [0.3, 1]
  );

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bg,
        overflow: 'hidden',
        width: 1920,
        height: 1080,
      }}
    >
      <BackgroundGrid intensity={1} />

      {/* UNBOXED SPLIT SCREEN CONTAINER */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px 80px 40px 80px',
          boxSizing: 'border-box',
        }}
      >
        {/* MASTHEAD HEADER */}
        <header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderBottom: `1px solid ${THEME.colors.border}`,
            paddingBottom: 20,
          }}
        >
          <div>
            <div
              style={{
                fontSize: 12,
                fontFamily: 'Inter, system-ui, sans-serif',
                fontWeight: 600,
                letterSpacing: 2,
                textTransform: 'uppercase',
                color: THEME.colors.amber,
                marginBottom: 8,
              }}
            >
              02 / ДИЛЕММА ОЦЕНКИ · ДВЕ КЛАССИЧЕСКИЕ КРАЙНОСТИ
            </div>
            <h1
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: THEME.colors.textPrimary,
                letterSpacing: -0.8,
                margin: 0,
                lineHeight: 1.2,
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Две ловушки оценки данных в прямом эфире
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Почему простое усреднение разрушает доверие на разных стадиях эфира
            </p>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: `1px solid ${THEME.colors.border}`,
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.textMuted,
            }}
          >
            ГИПЕРРЕАКЦИЯ vs ИНЕРЦИЯ
          </div>
        </header>

        {/* OPEN 2-COLUMN COMPARISON (UNBOXED) */}
        <div
          style={{
            flex: 1,
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'center',
            position: 'relative',
            margin: '24px 0',
          }}
        >
          {/* Vertical Hairline Divider */}
          <div
            style={{
              position: 'absolute',
              top: '5%',
              bottom: '5%',
              left: '50%',
              width: 1,
              backgroundColor: THEME.colors.border,
            }}
          />

          {/* COLUMN 1: TRAP 1 (EARLY NOISE) */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingRight: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: THEME.colors.amber,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  Ловушка 01 · Старт эфира
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textMuted }}>
                  (N &lt; 50 голосов)
                </span>
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  marginTop: 10,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: -0.5,
                }}
              >
                Паника на шуме первых откликов
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Один случайный хейтер на старте обрушивает среднее с 5.0 до 3.0. Система устраивает ложные тревоги, когда данных ещё нет.
              </p>
            </div>

            {/* Waveform SVG */}
            <div style={{ height: 260, position: 'relative', margin: '16px 0' }}>
              <svg width="100%" height="100%" viewBox="0 0 800 260" style={{ overflow: 'visible' }}>
                <line x1="0" y1="130" x2="800" y2="130" stroke={THEME.colors.borderSubtle} strokeDasharray="4 4" strokeWidth="1" />
                <line x1="0" y1="60" x2="800" y2="60" stroke={THEME.colors.borderSubtle} strokeDasharray="2 4" strokeWidth="1" />
                <line x1="0" y1="200" x2="800" y2="200" stroke={THEME.colors.borderSubtle} strokeDasharray="2 4" strokeWidth="1" />

                <text x="0" y="55" fill={THEME.colors.textMuted} fontSize="11" fontFamily="JetBrains Mono, monospace">
                  5.0 ★
                </text>
                <text x="0" y="195" fill={THEME.colors.textMuted} fontSize="11" fontFamily="JetBrains Mono, monospace">
                  2.5 ★
                </text>

                <path
                  d={leftNoisePath}
                  fill="none"
                  stroke={THEME.colors.amber}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Outlier markers */}
                <circle cx="280" cy="50" r="5" fill={THEME.colors.amber} />
                <text x="290" y="45" fill={THEME.colors.amber} fontSize="11" fontFamily="JetBrains Mono, monospace">
                  +1 голос ★5
                </text>

                <circle cx="510" cy="210" r="5" fill={THEME.colors.amber} />
                <text x="520" y="225" fill={THEME.colors.amber} fontSize="11" fontFamily="JetBrains Mono, monospace">
                  -1 голос ★1
                </text>
              </svg>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                borderTop: `1px solid ${THEME.colors.borderSubtle}`,
                paddingTop: 12,
              }}
            >
              <span style={{ fontSize: 12, textTransform: 'uppercase', color: THEME.colors.textMuted }}>
                Следствие:
              </span>
              <span style={{ fontSize: 13, color: THEME.colors.amber, fontWeight: 600 }}>
                Дисперсия слишком велика, чтобы верить цифрам напрямую
              </span>
            </div>
          </div>

          {/* COLUMN 2: TRAP 2 (LATE INERTIA) */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', paddingLeft: 20 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: 'uppercase',
                    color: THEME.colors.textSecondary,
                    fontFamily: 'Inter, system-ui, sans-serif',
                  }}
                >
                  Ловушка 02 · Зрелый эфир
                </span>
                <span style={{ fontSize: 13, color: THEME.colors.textMuted }}>
                  (N &gt; 10 000 голосов)
                </span>
              </div>
              <h2
                style={{
                  fontSize: 24,
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  marginTop: 10,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  letterSpacing: -0.5,
                }}
              >
                Слепая инерция накопленной массы
              </h2>
              <p
                style={{
                  fontSize: 14,
                  color: THEME.colors.textSecondary,
                  lineHeight: 1.5,
                  marginTop: 6,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Скользящее среднее цементируется. Если на 30-й минуте пропадает звук или падает качество, рейтинг продолжит показывать 4.8.
              </p>
            </div>

            {/* Flat Inertia SVG */}
            <div style={{ height: 260, position: 'relative', margin: '16px 0' }}>
              <svg width="100%" height="100%" viewBox="0 0 800 260" style={{ overflow: 'visible' }}>
                <line x1="0" y1="130" x2="800" y2="130" stroke={THEME.colors.borderSubtle} strokeDasharray="4 4" strokeWidth="1" />

                <path
                  d={rightInertiaPath}
                  fill="none"
                  stroke={THEME.colors.textMuted}
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                />

                {/* Incident beacon marker */}
                <circle cx="580" cy="125" r="6" fill={THEME.colors.amber} opacity={alertBlink} />
                <circle cx="580" cy="125" r="14" fill="none" stroke={THEME.colors.amber} strokeWidth="1" opacity={alertBlink * 0.5} />

                <text x="595" y="115" fill={THEME.colors.amber} fontSize="11" fontFamily="JetBrains Mono, monospace">
                  Сбой трансляции (звук пропал)
                </text>
                <text x="595" y="132" fill={THEME.colors.textMuted} fontSize="10" fontFamily="Inter, system-ui, sans-serif">
                  Рейтинг не шелохнулся из-за инерции
                </text>
              </svg>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 12,
                borderTop: `1px solid ${THEME.colors.borderSubtle}`,
                paddingTop: 12,
              }}
            >
              <span style={{ fontSize: 12, textTransform: 'uppercase', color: THEME.colors.textMuted }}>
                Следствие:
              </span>
              <span style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 600 }}>
                Запаздывание реакции в 12–15 минут лишает смысла аналитику
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM EDITORIAL SYNTHESIS (SMOOTH ENTERPRISE BAR) */}
        <div
          style={{
            borderTop: `1px solid ${THEME.colors.border}`,
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <span
              style={{
                padding: '4px 10px',
                borderRadius: 4,
                backgroundColor: 'rgba(56, 189, 248, 0.12)',
                color: THEME.colors.cobalt,
                fontSize: 12,
                fontFamily: 'JetBrains Mono, monospace',
                fontWeight: 600,
              }}
            >
              РЕШЕНИЕ БАЙЕСА
            </span>
            <span style={{ fontSize: 14, color: THEME.colors.textPrimary, fontFamily: 'Inter, system-ui, sans-serif' }}>
              Баланс доверия: на старте доверяем априорному опыту, по мере накопления голосов — наблюдениям.
            </span>
          </div>

          <div style={{ fontSize: 13, color: THEME.colors.cobalt, fontFamily: 'JetBrains Mono, monospace' }}>
            Вес данных ∝ N / σ² →
          </div>
        </div>
      </div>
    </div>
  );
};
