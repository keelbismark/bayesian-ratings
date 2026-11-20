export const THEME = {
  colors: {
    // High-end Editorial Data Design Palette (Stripe / Bloomberg / 3Blue1Brown)
    bg: '#0A0E17', // Deep obsidian slate
    bgElevated: '#111726', // Subtle elevated surface
    bgCard: '#151D2E', // Crisp matte card background
    border: 'rgba(255, 255, 255, 0.08)',
    borderSubtle: 'rgba(255, 255, 255, 0.04)',
    borderActive: 'rgba(56, 189, 248, 0.4)',
    
    // Semantic Accents (Matte, no neon bloom)
    cobalt: '#38BDF8', // Precision Sky Blue for Bayesian models & posterior
    cobaltSubtle: 'rgba(56, 189, 248, 0.12)',
    amber: '#F97316', // Warm Amber / Orange for raw noisy observations & alerts
    amberSubtle: 'rgba(249, 115, 22, 0.12)',
    emerald: '#10B981', // Muted green for validated convergence
    
    // Typography & Ink
    textPrimary: '#F8FAFC', // Slate 50
    textSecondary: '#94A3B8', // Slate 400
    textMuted: '#64748B', // Slate 500
    textDim: '#334155', // Slate 700
    
    gridDot: 'rgba(255, 255, 255, 0.05)',
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
