import React from 'react';
import { interpolate, useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { BellCurve } from '../components/common/BellCurve';

export const Scene8_Conclusion: React.FC = () => {
  const frame = useCurrentFrame();

  // Part 1: Warnings (frames 0 - 350)
  const part1Opacity = interpolate(frame, [0, 30, 320, 350], [0, 1, 1, 0], {
    extrapolateRight: 'clamp',
  });

  // Part 2: Finale Summary & Credits (frames 330 - 900)
  const part2Opacity = interpolate(frame, [330, 380], [0, 1], {
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
      }}
    >
      <BackgroundGrid intensity={1} />

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
        {/* PART 1: THREE CRITICAL WARNINGS */}
        {frame < 350 && (
          <div
            style={{
              opacity: part1Opacity,
              width: '100%',
              maxWidth: 2200,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <div style={{ textAlign: 'center', marginBottom: 44 }}>
              <div style={{ fontSize: 13, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, letterSpacing: 2 }}>
                SECTION 08 // PRODUCTION HARDENING
              </div>
              <div style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
                Три предостережения при внедрении
              </div>
            </div>

            <div
              style={{
                width: '100%',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                gap: 36,
              }}
            >
              <div style={{ padding: '36px 32px', borderRadius: 16, backgroundColor: 'rgba(21, 29, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 700 }}>
                  РИСК 01
                </span>
                <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  Слишком жёсткий априор
                </div>
                <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
                  Если задать нулевую дисперсию, модель откажется слышать зрителей и навсегда застрянет в прошлом.
                </div>
              </div>

              <div style={{ padding: '36px 32px', borderRadius: 16, backgroundColor: 'rgba(21, 29, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 700 }}>
                  РИСК 02
                </span>
                <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  Коррелированные боты
                </div>
                <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
                  Байес предполагает независимость наблюдений. Накрутку необходимо фильтровать до передачи в модель.
                </div>
              </div>

              <div style={{ padding: '36px 32px', borderRadius: 16, backgroundColor: 'rgba(21, 29, 46, 0.8)', border: '1px solid rgba(249, 115, 22, 0.3)' }}>
                <span style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.amber, fontWeight: 700 }}>
                  РИСК 03
                </span>
                <div style={{ fontSize: 20, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  Сдвиг тренда стрима
                </div>
                <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 8, lineHeight: 1.5 }}>
                  Контент трансляции меняется со временем — полезно вводить коэффициент забывания старых данных.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PART 2: GRAND FINALE & AUTHORS */}
        {frame >= 330 && (
          <div
            style={{
              opacity: part2Opacity,
              width: '100%',
              maxWidth: 2000,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                padding: '6px 18px',
                borderRadius: 9999,
                backgroundColor: 'rgba(56, 189, 248, 0.1)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                fontSize: 13,
                fontFamily: 'JetBrains Mono, monospace',
                color: THEME.colors.cobalt,
                letterSpacing: 2,
                marginBottom: 20,
              }}
            >
              SUMMARY // ЗАКЛЮЧЕНИЕ
            </div>

            <div style={{ fontSize: 44, fontWeight: 800, color: THEME.colors.textPrimary, letterSpacing: -1, maxWidth: 1400, lineHeight: 1.25 }}>
              Байесовское обновление — надёжный фундамент оценки рейтингов в реальном времени
            </div>

            <div style={{ fontSize: 18, color: THEME.colors.textSecondary, maxWidth: 1000, marginTop: 18, lineHeight: 1.6 }}>
              Баланс между историческим доверием и свежей реакцией зала даёт устойчивый, честный и математически строгий рейтинг без паники и задержек.
            </div>

            {/* Bell Curve Final Seal */}
            <div style={{ margin: '36px 0' }}>
              <BellCurve
                width={800}
                height={200}
                mean={0.5}
                stdDev={0.12}
                color={THEME.colors.cobalt}
                showConfidenceInterval
                label="Итоговая модель конвергенции рейтинга"
              />
            </div>

            {/* Authors Credits in Video */}
            <div
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                paddingTop: 32,
                width: '100%',
                maxWidth: 1200,
              }}
            >
              <div style={{ fontSize: 12, fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.textMuted, letterSpacing: 2 }}>
                НАД ПРОЕКТОМ РАБОТАЛИ
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 32, marginTop: 14, flexWrap: 'wrap' }}>
                {authors.map((auth, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: THEME.colors.textPrimary,
                      fontFamily: 'Inter, sans-serif',
                    }}
                  >
                    {auth}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
