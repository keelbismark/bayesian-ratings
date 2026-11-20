import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { BellCurve } from '../components/common/BellCurve';

export const Scene8_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Part 1: Warnings (frames 0 - 340)
  const part1Opacity = interpolate(frame, [0, 20, 310, 340], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Part 2: Finale & Authors (frames 330 - 900)
  const part2Opacity = interpolate(frame, [330, 370], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const authors = ['Голомидова Женя', 'Селиванов Илья', 'Константин Толов', 'Фураев Никита'];

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

      {/* UNBOXED CONCLUSION CONTAINER */}
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
        {/* PART 1: 3 PRODUCTION ENGINEERING WARNINGS */}
        {frame < 340 && (
          <div
            style={{
              opacity: part1Opacity,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <header
              style={{
                borderBottom: `1px solid ${THEME.colors.border}`,
                paddingBottom: 20,
              }}
            >
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
                08 / ИНЖЕНЕРНЫЕ ПРАВИЛА ВНЕДРЕНИЯ В PRODUCTION
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
                Три предостережения при развертывании модели
              </h1>
              <p
                style={{
                  fontSize: 15,
                  color: THEME.colors.textSecondary,
                  margin: '6px 0 0 0',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Что необходимо учесть перед передачей алгоритма в промышленную эксплуатацию
              </p>
            </header>

            {/* 3 Columns Unboxed */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 60,
                margin: 'auto 0',
              }}
            >
              <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 40 }}>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 700 }}>
                  РИСК 01
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  Слишком жёсткий априор
                </h2>
                <p style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 10, lineHeight: 1.6 }}>
                  Если задать нулевую дисперсию (σ₀² → 0), модель откажется слышать зрителей и навсегда застрянет в начальном значении. Всегда сохраняйте разумную степень сомнения.
                </p>
              </div>

              <div style={{ borderRight: `1px solid ${THEME.colors.borderSubtle}`, paddingRight: 40 }}>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 700 }}>
                  РИСК 02
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  Скоординированные боты
                </h2>
                <p style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 10, lineHeight: 1.6 }}>
                  Байесовская теорема строго опирается на предпосылку о независимости наблюдений (i.i.d.). Атаки накрутки и спам-фермы должны отсекаться до передачи в математическую формулу.
                </p>
              </div>

              <div>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.emerald, fontWeight: 700 }}>
                  РИСК 03
                </span>
                <h2 style={{ fontSize: 22, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  Иллюзия точечной цифры
                </h2>
                <p style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 10, lineHeight: 1.6 }}>
                  Показ одной «голой» цифры лишает зрителя понимания погрешности. Транслируйте доверительный коридор (±0.12) — это делает продукт профессиональным.
                </p>
              </div>
            </div>

            <div
              style={{
                borderTop: `1px solid ${THEME.colors.border}`,
                paddingTop: 16,
                fontSize: 12,
                color: THEME.colors.textMuted,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <span>Контроль качества данных · Data-Ink Ratio</span>
              <span style={{ fontFamily: 'JetBrains Mono, monospace' }}>ФИНАЛЬНОЕ ЗАКЛЮЧЕНИЕ →</span>
            </div>
          </div>
        )}

        {/* PART 2: FINALE SUMMARY & CREDITS */}
        {frame >= 330 && (
          <div
            style={{
              opacity: part2Opacity,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
            }}
          >
            <header
              style={{
                borderBottom: `1px solid ${THEME.colors.border}`,
                paddingBottom: 20,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontWeight: 600,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: THEME.colors.cobalt,
                  marginBottom: 8,
                }}
              >
                ЗАКЛЮЧЕНИЕ · ИТОГОВАЯ МОДЕЛЬ
              </div>
              <h1
                style={{
                  fontSize: 38,
                  fontWeight: 700,
                  color: THEME.colors.textPrimary,
                  letterSpacing: -0.8,
                  margin: 0,
                  lineHeight: 1.2,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Байесовское обновление для оценки рейтингов
              </h1>
              <p
                style={{
                  fontSize: 16,
                  color: THEME.colors.textSecondary,
                  margin: '8px 0 0 0',
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              >
                Надежный математический мост между начальным предположением и реальным мнением аудитории
              </p>
            </header>

            {/* Center Bell Curve Equilibrium */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: 'auto 0',
              }}
            >
              <div style={{ width: 800, height: 260 }}>
                <BellCurve
                  width={800}
                  height={260}
                  mean={0.58}
                  stdDev={0.065}
                  color={THEME.colors.cobalt}
                  showConfidenceInterval={true}
                  label="Сходимость: истинный рейтинг трансляции ★ 4.62 ± 0.12"
                />
              </div>
            </div>

            {/* EDITORIAL CREDITS */}
            <div
              style={{
                borderTop: `1px solid ${THEME.colors.border}`,
                paddingTop: 24,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 11,
                    textTransform: 'uppercase',
                    letterSpacing: 2,
                    color: THEME.colors.textMuted,
                    fontFamily: 'Inter, system-ui, sans-serif',
                    marginBottom: 10,
                  }}
                >
                  Авторы проекта
                </div>
                <div style={{ display: 'flex', gap: 32, fontSize: 15, fontWeight: 600, color: THEME.colors.textPrimary }}>
                  {authors.map((auth, idx) => (
                    <span key={idx}>{auth}</span>
                  ))}
                </div>
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontFamily: 'JetBrains Mono, monospace',
                  color: THEME.colors.textMuted,
                  textAlign: 'right',
                }}
              >
                1080p · 30 FPS · 05:00 МИН<br />
                2026
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
