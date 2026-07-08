'use client';
import { motion } from 'motion/react';
import { panelVariants, useReducedMotionSafe } from '../../lib/motion';

export function Panel({ children, dir }: { children: React.ReactNode; dir: number }) {
  const reduced = useReducedMotionSafe();

  if (reduced) {
    return <section className="panel">{children}</section>;
  }

  return (
    <motion.section
      className="panel"
      custom={dir}
      variants={panelVariants}
      initial="initial"
      animate="enter"
      exit="exit"
      style={{ willChange: 'transform, opacity, clip-path' }}
    >
      {children}
    </motion.section>
  );
}
