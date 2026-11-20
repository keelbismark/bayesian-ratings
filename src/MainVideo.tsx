import React from 'react';
import { Series, Audio, staticFile, interpolate, useCurrentFrame, Easing } from 'remotion';
import { THEME } from './theme';
import { Scene1_LiveBroadcast } from './scenes/Scene1_LiveBroadcast';
import { Scene2_TwoTraps } from './scenes/Scene2_TwoTraps';
import { Scene3_CheckpointOne } from './scenes/Scene3_CheckpointOne';
import { Scene4_Formula } from './scenes/Scene4_Formula';
import { Scene5_CheckpointTwo } from './scenes/Scene5_CheckpointTwo';
import { Scene6_StepPipeline } from './scenes/Scene6_StepPipeline';
import { Scene7_CheckpointThree } from './scenes/Scene7_CheckpointThree';
import { Scene8_Conclusion } from './scenes/Scene8_Conclusion';

const SmoothScene: React.FC<{ durationInFrames: number; children: React.ReactNode }> = ({
  durationInFrames,
  children,
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, 18, durationInFrames - 18, durationInFrames],
    [0, 1, 1, 0],
    {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    }
  );
  return (
    <div style={{ position: 'absolute', inset: 0, opacity, width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};

export const MainVideo: React.FC = () => {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundColor: THEME.colors.bg,
        width: '100%',
        height: '100%',
      }}
    >
      {/* Background Soft Ambient Soundtrack (Low volume 25%, no harsh beats) */}
      <Audio src={staticFile('ambient.mp3')} volume={0.25} />

      <Series>
        {/* СЦЕНА 1 (0:00–0:40) — Заставка: трансляция идет в прямом эфире */}
        <Series.Sequence durationInFrames={THEME.timings.scene1.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene1.duration}>
            <Scene1_LiveBroadcast />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 2 (0:40–1:20) — Две ловушки */}
        <Series.Sequence durationInFrames={THEME.timings.scene2.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene2.duration}>
            <Scene2_TwoTraps />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 3 (1:20–2:00) — ИНТЕРАКТИВНАЯ КОНТРОЛЬНАЯ ТОЧКА 1 + три шага */}
        <Series.Sequence durationInFrames={THEME.timings.scene3.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene3.duration}>
            <Scene3_CheckpointOne />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 4 (2:00–2:35) — Формула */}
        <Series.Sequence durationInFrames={THEME.timings.scene4.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene4.duration}>
            <Scene4_Formula />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 5 (2:35–3:00) — ИНТЕРАКТИВНАЯ КОНТРОЛЬНАЯ ТОЧКА 2 + автоматическое взвешивание */}
        <Series.Sequence durationInFrames={THEME.timings.scene5.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene5.duration}>
            <Scene5_CheckpointTwo />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 6 (3:00–3:45) — Пошаговый конвейер */}
        <Series.Sequence durationInFrames={THEME.timings.scene6.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene6.duration}>
            <Scene6_StepPipeline />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 7 (3:45–4:30) — ИНТЕРАКТИВНАЯ КОНТРОЛЬНАЯ ТОЧКА 3 + преимущества + мини-пример */}
        <Series.Sequence durationInFrames={THEME.timings.scene7.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene7.duration}>
            <Scene7_CheckpointThree />
          </SmoothScene>
        </Series.Sequence>

        {/* СЦЕНА 8 (4:30–5:00) — Предостережения + краткое изложение + заключение */}
        <Series.Sequence durationInFrames={THEME.timings.scene8.duration}>
          <SmoothScene durationInFrames={THEME.timings.scene8.duration}>
            <Scene8_Conclusion />
          </SmoothScene>
        </Series.Sequence>
      </Series>
    </div>
  );
};
