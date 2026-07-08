'use client';
import { useAppStore, SECTIONS } from '../../store/useAppStore';

export function Spines() {
  const active = useAppStore((s) => s.active);
  const setActive = useAppStore((s) => s.setActive);
  return (
    <nav className="shelf shelf-left" aria-label="Sections">
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
          <span className="spnum">{String(i + 1).padStart(2, '0')}</span>
          <span className="spname">{name}</span>
        </button>
      ))}
    </nav>
  );
}
