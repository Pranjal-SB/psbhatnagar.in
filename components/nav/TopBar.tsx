'use client';
import { useAppStore, SECTIONS } from '../../store/useAppStore';
import { PALETTES } from '../../theme/palettes';

export function TopBar() {
  const active = useAppStore((s) => s.active);
  const theme = useAppStore((s) => s.theme);
  const setActive = useAppStore((s) => s.setActive);
  const setPalette = useAppStore((s) => s.setPalette);
  const toggleTheme = useAppStore((s) => s.toggleTheme);

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

      <div className="notches" aria-hidden>
        {SECTIONS.map((name, i) => (
          <span key={name} className={`notch${i === active ? ' is-active' : ''}`} />
        ))}
      </div>

      <div className="controls">
        <div className="palettes" role="group" aria-label="Color palette">
          {PALETTES.map((p) => (
            <button
              key={p.name}
              className="pal"
              data-pal={p.name}
              aria-label={`${p.label} palette`}
              style={{ '--diamond': p.swatch } as React.CSSProperties}
              onClick={() => setPalette(p.name)}
            />
          ))}
        </div>
        <button className="theme-toggle" aria-label="Toggle light and dark theme" onClick={toggleTheme}>
          <span className="theme-dot" aria-hidden />
          <span>{theme === 'light' ? 'dark' : 'light'}</span>
        </button>
      </div>
    </header>
  );
}
