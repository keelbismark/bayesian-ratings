import React from 'react';
import { useCurrentFrame } from 'remotion';
import { THEME } from '../theme';
import { BackgroundGrid } from '../components/common/BackgroundGrid';
import { BellCurve } from '../components/common/BellCurve';

export const Scene6_StepPipeline: React.FC = () => {
  const frame = useCurrentFrame();

  // 10-second cycle (300 frames)
  const cycleFrame = frame % 300;
  const cycleCount = Math.floor(frame / 300); // 0, 1, 2, 3, 4
  const activeStage = Math.min(3, Math.floor(cycleFrame / 75));

  // Monotonically shrinking variance as updates accumulate
  const currentStdDev = Math.max(0.065, 0.22 - cycleCount * 0.035 - (cycleFrame / 300) * 0.035);
  const currentMean = 0.46 + cycleCount * 0.03 + (cycleFrame / 300) * 0.03;

  const stages = [
    { num: '01', title: 'Входящий поток', desc: 'События пользовательских оценок через WebSocket' },
    { num: '02', title: 'Окно наблюдений', desc: 'Батчинг за последние 15 сек + фильтрация всплесков' },
    { num: '03', title: 'Формула Гаусса', desc: 'Аналитический пересчет μ_post и σ²_post за 0.05 мс' },
    { num: '04', title: 'Выдача в эфир', desc: 'Плавная анимация доверительного коридора в плеере' },
  ];

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

      {/* UNBOXED PIPELINE CANVAS */}
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
                color: THEME.colors.cobalt,
                marginBottom: 8,
              }}
            >
              06 / АРХИТЕКТУРА СИСТЕМЫ · ПОШАГОВЫЙ КОНВЕЙЕР
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
              Непрерывный конвейер вычислений в реальном времени
            </h1>
            <p
              style={{
                fontSize: 15,
                color: THEME.colors.textSecondary,
                margin: '6px 0 0 0',
                fontFamily: 'Inter, system-ui, sans-serif',
              }}
            >
              Циклический процесс обработки событий без накопления задержек
            </p>
          </div>

          <div
            style={{
              padding: '6px 16px',
              borderRadius: 6,
              border: `1px solid ${THEME.colors.border}`,
              fontSize: 12,
              fontFamily: 'JetBrains Mono, monospace',
              color: THEME.colors.cobalt,
            }}
          >
            ЦИКЛ #{cycleCount + 1} · ТАКТ {activeStage + 1}/4
          </div>
        </header>

        {/* CONTINUOUS PIPELINE TIMELINE (UNBOXED NODES) */}
        <div style={{ position: 'relative', width: '100%', margin: '10px 0' }}>
          {/* Base Connection Track */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 100,
              right: 100,
              height: 2,
              backgroundColor: THEME.colors.border,
            }}
          />
          {/* Active Progress Along Track */}
          <div
            style={{
              position: 'absolute',
              top: 24,
              left: 100,
              width: `${(activeStage / 3) * 88}%`,
              height: 2,
              backgroundColor: THEME.colors.cobalt,
              transition: 'width 0.2s ease',
            }}
          />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 40,
              position: 'relative',
              zIndex: 2,
            }}
          >
            {stages.map((st, idx) => {
              const isActive = activeStage === idx;
              const isPassed = activeStage > idx;
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  {/* Circular Node */}
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: '50%',
                      backgroundColor: isActive ? THEME.colors.cobalt : isPassed ? '#0E1626' : THEME.colors.bg,
                      border: isActive
                        ? `2px solid ${THEME.colors.textPrimary}`
                        : isPassed
                        ? `2px solid ${THEME.colors.cobalt}`
                        : `2px solid ${THEME.colors.border}`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 14,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontWeight: 700,
                      color: isActive ? '#08090C' : isPassed ? THEME.colors.cobalt : THEME.colors.textMuted,
                      marginBottom: 16,
                      boxShadow: isActive ? '0 0 20px rgba(56, 189, 248, 0.4)' : 'none',
                    }}
                  >
                    {st.num}
                  </div>

                  <div style={{ fontSize: 16, fontWeight: 700, color: isActive ? THEME.colors.cobalt : THEME.colors.textPrimary }}>
                    {st.title}
                  </div>
                  <div style={{ fontSize: 13, color: THEME.colors.textSecondary, marginTop: 4, lineHeight: 1.4 }}>
                    {st.desc}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* LIVE BELL CURVE CONVERGENCE VISUALIZATION */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            gap: 60,
            alignItems: 'center',
            borderTop: `1px solid ${THEME.colors.borderSubtle}`,
            paddingTop: 20,
          }}
        >
          <div style={{ width: '100%', height: 260 }}>
            <BellCurve
              width={900}
              height={260}
              mean={currentMean}
              stdDev={currentStdDev}
              color={THEME.colors.cobalt}
              showConfidenceInterval={true}
              priorOutline={{ mean: 0.46, stdDev: 0.22 }}
              label={`Сжатие доверительного коридора: σ = ${currentStdDev.toFixed(3)}`}
            />
          </div>

          {/* Real-time Telemetry Metrics */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ borderBottom: `1px solid ${THEME.colors.borderSubtle}`, paddingBottom: 10 }}>
              <div style={{ fontSize: 11, color: THEME.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
                Время отклика одного шага
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: THEME.colors.emerald, fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>
                0.05 мс
              </div>
            </div>

            <div style={{ borderBottom: `1px solid ${THEME.colors.borderSubtle}`, paddingBottom: 10 }}>
              <div style={{ fontSize: 11, color: THEME.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
                Сжатие неопределенности
              </div>
              <div style={{ fontSize: 26, fontWeight: 700, color: THEME.colors.cobalt, fontFamily: 'JetBrains Mono, monospace', marginTop: 4 }}>
                -68% к 3-й минуте
              </div>
            </div>

            <div>
              <div style={{ fontSize: 11, color: THEME.colors.textMuted, textTransform: 'uppercase', letterSpacing: 1 }}>
                Сложность алгоритма
              </div>
              <div style={{ fontSize: 15, color: THEME.colors.textSecondary, marginTop: 4 }}>
                Константная O(1) память и вычисления
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM ARCHITECTURAL LAW FOOTER */}
        <div
          style={{
            borderTop: `1px solid ${THEME.colors.border}`,
            paddingTop: 20,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 13,
            color: THEME.colors.textSecondary,
            fontFamily: 'Inter, system-ui, sans-serif',
          }}
        >
          <span>
            Архитектура не требует очередей переобучения или MCMC. Аналитическое байесовское обновление работает прямо на потоке событий.
          </span>
          <span style={{ fontFamily: 'JetBrains Mono, monospace', color: THEME.colors.cobalt }}>
            РЕАЛЬНОЕ ВРЕМЯ БЕЗ ЗАДЕРЖЕК →
          </span>
        </div>
      </div>
    </div>
  );
};
