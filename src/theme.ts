export const THEME = {
  colors: {
    bg: '#0D1B2A',
    bgCard: '#132238',
    bgCardHighlight: '#1B2E4B',
    electricBlue: '#4EA8DE',
    electricBlueGlow: 'rgba(78, 168, 222, 0.4)',
    electricBlueSubtle: 'rgba(78, 168, 222, 0.15)',
    warmCoral: '#FF7B54',
    warmCoralGlow: 'rgba(255, 123, 84, 0.4)',
    warmCoralSubtle: 'rgba(255, 123, 84, 0.15)',
    gridLine: 'rgba(255, 255, 255, 0.04)',
    wireframe: 'rgba(78, 168, 222, 0.5)',
    textMuted: '#6C8299',
    white: '#FFFFFF',
  },
  dimensions: {
    width: 3840,
    height: 2160,
    fps: 30,
  },
  timings: {
    scene1: { from: 0, duration: 40 * 30 }, // 0:00 - 0:40 (1200 frames)
    scene2: { from: 40 * 30, duration: 40 * 30 }, // 0:40 - 1:20 (1200 frames)
    scene3: { from: 80 * 30, duration: 40 * 30 }, // 1:20 - 2:00 (1200 frames)
    scene4: { from: 120 * 30, duration: 35 * 30 }, // 2:00 - 2:35 (1050 frames)
    scene5: { from: 155 * 30, duration: 25 * 30 }, // 2:35 - 3:00 (750 frames)
    scene6: { from: 180 * 30, duration: 45 * 30 }, // 3:00 - 3:45 (1350 frames)
    scene7: { from: 225 * 30, duration: 45 * 30 }, // 3:45 - 4:30 (1350 frames)
    scene8: { from: 270 * 30, duration: 30 * 30 }, // 4:30 - 5:00 (900 frames)
    totalFrames: 300 * 30, // 9000 frames (5:00 min)
  },
};
