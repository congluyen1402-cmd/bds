export const EASE = {
  luxury: [0.22, 1, 0.36, 1], // Cinematic smooth ease out
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.175, 0.885, 0.32, 1.275],
};

export const TRANSITION = {
  fast: { duration: 0.4, ease: EASE.luxury },
  base: { duration: 0.8, ease: EASE.luxury },
  slow: { duration: 1.2, ease: EASE.luxury },
};

// Colors mapping for animation target states
export const COLORS = {
  gold: "#C8A96B",
  navy: "#0A1628",
  ivory: "#F5F1EA",
  sage: "#2F4A44",
};
