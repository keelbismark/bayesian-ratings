export const THEME = {
  colors: {
    // Pure Editorial Obsidian Palette (Stripe Press / Bloomberg / 3Blue1Brown)
    bg: '#08090C', // Deep matte velvet obsidian (zero generic blue SaaS hue)
    bgElevated: '#0E1015', // Subtle architectural surface
    bgCard: 'rgba(255, 255, 255, 0.02)', // Whisper surface, unboxed by default
    border: 'rgba(255, 255, 255, 0.07)', // Hairline coordinate rule
    borderSubtle: 'rgba(255, 255, 255, 0.04)',
    borderActive: 'rgba(56, 189, 248, 0.5)',
    
    // Semantic Accents (Matte precision, zero radioactive neon)
    cobalt: '#38BDF8', // Precision technical cyan/sky blue for Bayesian model
    cobaltSubtle: 'rgba(56, 189, 248, 0.10)',
    amber: '#F59E0B', // Warm amber / ochre for incoming noise & raw observations
    amberSubtle: 'rgba(245, 158, 11, 0.10)',
    emerald: '#10B981', // Natural emerald for convergence & mathematical proof
    emeraldSubtle: 'rgba(16, 185, 129, 0.10)',
    
    // Typography & Ink Hierarchy
    textPrimary: '#F8FAFC', // Crisp white (Slate 50)
    textSecondary: '#94A3B8', // Clear technical commentary (Slate 400)
    textMuted: '#64748B', // Metadata & axes labels (Slate 500)
    textDim: '#334155', // Hairlines & subtle markers
    
    gridDot: 'rgba(255, 255, 255, 0.035)',
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
