'use client';
import { useEffect, useRef, useState } from 'react';
import { Sun, Moon, SunMoon } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { PALETTES } from '../../theme/palettes';

function PaletteGroup({ onPick }: { onPick: (name: (typeof PALETTES)[number]['name']) => void }) {
  return (
    <div className="palettes" role="group" aria-label="Color palette">
      {PALETTES.map((p) => (
        <button
          key={p.name}
          className="pal"
          data-pal={p.name}
          title={`${p.label} palette`}
          aria-label={`${p.label} palette`}
          style={{ '--diamond': p.swatch } as React.CSSProperties}
          onClick={() => onPick(p.name)}
        />
      ))}
    </div>
  );
}

function ThemeToggle({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  return (
    <button
      className="theme-toggle"
      title={theme === 'light' ? 'switch to dark' : 'switch to light'}
      aria-label="Toggle light and dark theme"
      onClick={onToggle}
    >
      <span className="theme-icons" aria-hidden>
        <Sun size={16} strokeWidth={2} className="theme-sun" />
        <Moon size={16} strokeWidth={2} className="theme-moon" />
      </span>
    </button>
  );
}

export function TopBar() {
  const theme = useAppStore((s) => s.theme);
  const setActive = useAppStore((s) => s.setActive);
  const setPalette = useAppStore((s) => s.setPalette);
  const toggleTheme = useAppStore((s) => s.toggleTheme);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

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

      <div className="controls">
        <PaletteGroup onPick={setPalette} />
        <span className="controls-rule" aria-hidden />
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
      </div>

      <div className="topbar-toggle-wrap" ref={wrapRef}>
        <button
          className="topbar-toggle"
          aria-label="Theme and palette"
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <SunMoon size={18} strokeWidth={2} aria-hidden />
        </button>
        {open && (
          <div className="topbar-pop" role="group" aria-label="Theme and palette">
            <div className="pop-group">
              <p className="pop-label">Palette</p>
              <PaletteGroup onPick={setPalette} />
            </div>
            <div className="pop-group">
              <p className="pop-label">Theme</p>
              <ThemeToggle theme={theme} onToggle={toggleTheme} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
