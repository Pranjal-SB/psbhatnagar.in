'use client';
import { useAppStore, SECTIONS } from '../../store/useAppStore';

export function Spines() {
  const active = useAppStore((s) => s.active);
  const setActive = useAppStore((s) => s.setActive);
  return (
    <nav
      aria-label="Sections"
      className="fixed left-4 top-1/2 z-10 flex -translate-y-1/2 flex-col gap-2"
    >
      {SECTIONS.map((name, i) => (
        <button
          key={name}
          data-idx={i}
          aria-current={i === active ? 'true' : undefined}
          onClick={() => setActive(i)}
          className={`text-left font-mono text-sm transition-colors ${
            i === active ? 'text-accent' : 'text-muted hover:text-text'
          }`}
        >
          {name}
        </button>
      ))}
    </nav>
  );
}
