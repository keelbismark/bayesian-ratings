import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { BellCurve } from '../components/common/BellCurve';

export const Scene6_StepPipeline: React.FC = () => {
  const frame = useCurrentFrame();

  // Cycle period: 300 frames per loop (~10 seconds)
  const cycleFrame = frame % 300;
  const cycleCount = Math.floor(frame / 300); // 0, 1, 2, 3, 4
  const activeStage = Math.min(3, Math.floor(cycleFrame / 75));

  const currentStdDev = Math.max(0.07, 0.22 - cycleCount * 0.035 - (cycleFrame / 300) * 0.035);
  const currentMean = 0.48 + (cycleCount * 0.03) + (cycleFrame / 300) * 0.03;

  const stages = [
    { num: '01', title: 'Инициализация', desc: 'Загрузка априорного профиля стрима' },
    { num: '02', title: 'Окно наблюдений', desc: 'Батч входящих оценок за последние 30 сек' },
    { num: '03', title: 'Байесовский расчет', desc: 'Аналитическое обновление формулы Гаусса' },
    { num: '04', title: 'Выдача в эфир', desc: 'Публикация сглаженного рейтинга в плеер' },
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
        {/* Top Header */}
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <div style={{ fontSize: 13, color: THEME.colors.textSecondary, fontWeight: 500 }}>
            Раздел 6 · Непрерывный конвейер вычислений
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: THEME.colors.textPrimary, letterSpacing: -0.5, marginTop: 6 }}>
            Пошаговый конвейер обновления в реальном времени
          </div>
        </div>

        {/* 4 Pipeline Stages (Horizontal Flow) */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 24,
            marginBottom: 40,
          }}
        >
          {stages.map((st, idx) => {
            const isActive = activeStage === idx;
            return (
              <div
                key={idx}
                style={{
                  padding: '24px 28px',
                  borderRadius: 14,
                  backgroundColor: isActive ? 'rgba(56, 189, 248, 0.1)' : 'rgba(21, 29, 46, 0.65)',
                  border: isActive ? '1px solid rgba(56, 189, 248, 0.5)' : '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: isActive ? '0 12px 30px rgba(0, 0, 0, 0.5)' : 'none',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span
                    style={{
                      fontSize: 12,
                      fontFamily: 'Inter, system-ui, sans-serif',
                      color: isActive ? THEME.colors.cobalt : THEME.colors.textMuted,
                      fontWeight: 700,
                    }}
                  >
                    Этап {st.num}
                  </span>
                  {isActive && (
                    <span style={{ fontSize: 11, fontFamily: 'Inter, system-ui, sans-serif', color: THEME.colors.cobalt, padding: '2px 8px', borderRadius: 4, backgroundColor: 'rgba(56, 189, 248, 0.15)', fontWeight: 600 }}>
                      Выполняется
                    </span>
                  )}
                </div>

                <div style={{ fontSize: 18, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 12 }}>
                  {st.title}
                </div>
                <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 6, lineHeight: 1.4 }}>
                  {st.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Real-time Dynamic Model Simulation Card */}
        <div
          style={{
            width: '100%',
            maxWidth: 2200,
            borderRadius: 18,
            backgroundColor: 'rgba(21, 29, 46, 0.75)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            padding: '30px 48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ fontSize: 12, color: THEME.colors.cobalt, fontWeight: 600 }}>
              Итеративная сходимость · Цикл #{cycleCount + 1}
            </div>
            <div style={{ fontSize: 24, fontWeight: 700, color: THEME.colors.textPrimary, marginTop: 6 }}>
              С каждым циклом дисперсия уменьшается
            </div>
            <div style={{ fontSize: 14, color: THEME.colors.textSecondary, marginTop: 8, maxWidth: 500, lineHeight: 1.5 }}>
              Новый апостериор автоматически становится априорным знанием для следующей секунды эфира. Рейтинг обновляется плавно, без провалов.
            </div>
          </div>

          <BellCurve
            width={750}
            height={220}
            mean={currentMean}
            stdDev={currentStdDev}
            color={THEME.colors.cobalt}
            showConfidenceInterval
            label={`Текущая дисперсия: σ = ${currentStdDev.toFixed(2)}`}
          />
        </div>
      </div>
    </div>
  );
};
