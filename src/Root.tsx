import React from 'react';
import { Composition } from 'remotion';
import { THEME } from './theme';
import { MainVideo } from './MainVideo';
import { Scene1_LiveBroadcast } from './scenes/Scene1_LiveBroadcast';
import { Scene2_TwoTraps } from './scenes/Scene2_TwoTraps';
import { Scene3_CheckpointOne } from './scenes/Scene3_CheckpointOne';
import { Scene4_Formula } from './scenes/Scene4_Formula';
import { Scene5_CheckpointTwo } from './scenes/Scene5_CheckpointTwo';
import { Scene6_StepPipeline } from './scenes/Scene6_StepPipeline';
import { Scene7_CheckpointThree } from './scenes/Scene7_CheckpointThree';
import { Scene8_Conclusion } from './scenes/Scene8_Conclusion';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full 5:00 min Video Master in 4K */}
      <Composition
        id="Main-4K"
        component={MainVideo}
        durationInFrames={THEME.timings.totalFrames}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      {/* Full 5:00 min Video in 1080p (Fast preview) */}
      <Composition
        id="Main-1080p"
        component={MainVideo}
        durationInFrames={THEME.timings.totalFrames}
        fps={THEME.dimensions.fps}
        width={1920}
        height={1080}
      />

      {/* Individual Scene Compositions for Studio Scrubbing */}
      <Composition
        id="Scene-1-LiveBroadcast"
        component={Scene1_LiveBroadcast}
        durationInFrames={THEME.timings.scene1.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-2-TwoTraps"
        component={Scene2_TwoTraps}
        durationInFrames={THEME.timings.scene2.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-3-CheckpointOne"
        component={Scene3_CheckpointOne}
        durationInFrames={THEME.timings.scene3.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-4-Formula"
        component={Scene4_Formula}
        durationInFrames={THEME.timings.scene4.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-5-CheckpointTwo"
        component={Scene5_CheckpointTwo}
        durationInFrames={THEME.timings.scene5.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-6-StepPipeline"
        component={Scene6_StepPipeline}
        durationInFrames={THEME.timings.scene6.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-7-CheckpointThree"
        component={Scene7_CheckpointThree}
        durationInFrames={THEME.timings.scene7.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />

      <Composition
        id="Scene-8-Conclusion"
        component={Scene8_Conclusion}
        durationInFrames={THEME.timings.scene8.duration}
        fps={THEME.dimensions.fps}
        width={3840}
        height={2160}
      />
    </>
  );
};
