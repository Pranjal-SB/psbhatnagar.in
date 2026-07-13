import { useReducedMotion } from 'motion/react';

export const EASE = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
} as const;
export const SPRING = {
  soft: { type: 'spring', stiffness: 120, damping: 22, mass: 1 },
  snappy: { type: 'spring', stiffness: 320, damping: 30 },
} as const;

export function useReducedMotionSafe(): boolean {
  return useReducedMotion() ?? false;
}
