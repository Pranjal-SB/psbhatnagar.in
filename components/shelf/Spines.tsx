'use client';
import { motion } from 'motion/react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';
import { SPRING, useReducedMotionSafe } from '../../lib/motion';

export function Spines() {
  const active = useAppStore((s) => s.active);
  const setActive = useAppStore((s) => s.setActive);
  const reduced = useReducedMotionSafe();
  return (
    <nav className="shelf shelf-right" aria-label="Sections">
      {SECTIONS.map((name, i) => (
        <button
          key={name}
          type="button"
          className={`spine${i === active ? ' is-active' : ''}`}
          data-idx={i}
          aria-current={i === active ? 'true' : undefined}
          aria-label={name}
          onClick={() => setActive(i)}
        >
          {i === active && (
            <motion.span
              className="spine-flag"
              layoutId="spine-flag"
              aria-hidden
              transition={reduced ? { duration: 0 } : SPRING.snappy}
            />
          )}
          <span className="spnum">{String(i + 1).padStart(2, '0')}</span>
          <span className="spname">{name}</span>
        </button>
      ))}
    </nav>
  );
}
