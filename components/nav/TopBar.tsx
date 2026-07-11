'use client';
import { useEffect, useRef, useState } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PALETTES } from '../../theme/palettes';

type PaletteName = (typeof PALETTES)[number]['name'];

export function TopBar() {
  const theme = useAppStore((s) => s.theme);
  const setActive = useAppStore((s) => s.setActive);
  const setPalette = useAppStore((s) => s.setPalette);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  // touch devices have no hover: first tap on the collapsed kit fans it out
  const [palOpen, setPalOpen] = useState(false);
  const controlsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!palOpen) return;
    const onDown = (e: PointerEvent) => {
      if (controlsRef.current && !controlsRef.current.contains(e.target as Node)) setPalOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [palOpen]);

  const isTouchUI = () =>
    typeof window !== 'undefined' && window.matchMedia('(hover: none)').matches;

  const handlePick = (name: PaletteName) => {
    if (isTouchUI() && !palOpen) {
      setPalOpen(true); // collapsed tap = open the fan, don't switch yet
      return;
    }
    setPalette(name);
    setPalOpen(false);
  };

  return (
    <header className="topbar">
      <a
        className="brand"
        href="#home"
        onClick={(e) => {
          e.preventDefault();
          setActive(0);
        }}
      >
        psbhatnagar<span className="brand-dot">.</span>
        <svg className="brand-squiggle" viewBox="0 0 220 16" preserveAspectRatio="none" aria-hidden>
          <path
            d="M3 10 C 44 3, 88 15, 130 8 S 200 4, 217 11"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      </a>

      <div className="controls" ref={controlsRef}>
        <div
          className={`palettes${palOpen ? ' is-open' : ''}`}
          role="group"
          aria-label="Color palette"
        >
          {PALETTES.map((p) => (
            <button
              key={p.name}
              className="pal"
              data-pal={p.name}
              title={`${p.label} palette`}
              aria-label={`${p.label} palette`}
              style={{ '--diamond': p.swatch } as React.CSSProperties}
              onClick={() => handlePick(p.name)}
            />
          ))}
        </div>
        <span className="controls-rule" aria-hidden />
        <button
          className="theme-toggle"
          title={theme === 'light' ? 'switch to dark' : 'switch to light'}
          aria-label="Toggle light and dark theme"
          onClick={toggleTheme}
        >
          <span className="theme-icons" aria-hidden>
            <Sun size={16} strokeWidth={2} className="theme-sun" />
            <Moon size={16} strokeWidth={2} className="theme-moon" />
          </span>
        </button>
      </div>
    </header>
  );
}
