import { useReducedMotion } from 'motion/react';
import type { Variants } from 'motion/react';

export const DURATION = { fast: 0.28, normal: 0.6, slow: 1.1 } as const;
export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;
export const SPRING = {
  soft: { type: 'spring', stiffness: 120, damping: 22, mass: 1 },
  snappy: { type: 'spring', stiffness: 320, damping: 30 },
} as const;

// Cinematic panel: mask-wipe + slight lift, directional.
export const panelVariants: Variants = {
  enter: () => ({
    opacity: 1,
    x: 0,
    clipPath: 'inset(0% 0% 0% 0%)',
    transition: { duration: DURATION.slow, ease: EASE.out, when: 'beforeChildren' },
  }),
  exit: (dir: number = 1) => ({
    opacity: 0,
    x: dir * -40,
    clipPath: 'inset(0% 0% 100% 0%)',
    transition: { duration: DURATION.normal, ease: EASE.inOut },
  }),
  initial: (dir: number = 1) => ({
    opacity: 0,
    x: dir * 40,
    clipPath: 'inset(0% 0% 100% 0%)',
  }),
};

export const staggerParent: Variants = {
  enter: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};
export const staggerChild: Variants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: DURATION.normal, ease: EASE.out } },
};

export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
