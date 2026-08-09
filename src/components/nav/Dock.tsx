'use client';
import { motion } from 'motion/react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';
import { SPRING, useReducedMotionSafe } from '../../lib/motion';

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
            {/* Every destination is named at rest — a bare 1-6 strip told a
                first-time visitor nothing. This replaces the single active
                label that used to sit on its own row below. */}
            <span className="dock-name">{name}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
