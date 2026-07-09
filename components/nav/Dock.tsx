'use client';
import { motion, AnimatePresence } from 'motion/react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';
import { SPRING, DURATION, useReducedMotionSafe } from '../../lib/motion';

export function Dock() {
  const active = useAppStore((s) => s.active);
  const setActive = useAppStore((s) => s.setActive);
  const reduced = useReducedMotionSafe();

  return (
    <nav className="dock" aria-label="Sections">
      <div className="dock-tabs">
        {SECTIONS.map((name, i) => (
          <button
            key={name}
            type="button"
            className={`dock-tab${i === active ? ' is-active' : ''}`}
            aria-current={i === active ? 'true' : undefined}
            aria-label={name}
            onClick={() => setActive(i)}
          >
            {i === active && (
              <motion.span
                className="dock-flag"
                layoutId="dock-flag"
                aria-hidden
                transition={reduced ? { duration: 0 } : SPRING.snappy}
              />
            )}
            <span className="dock-num">{i + 1}</span>
          </button>
        ))}
      </div>
      <div className="dock-label" aria-hidden>
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : DURATION.fast }}
          >
            {SECTIONS[active]}
          </motion.span>
        </AnimatePresence>
      </div>
    </nav>
  );
}
