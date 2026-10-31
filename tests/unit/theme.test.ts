import { describe, it, expect } from 'vitest';
import { PALETTES } from '../../src/theme/palettes';
import { NO_FLASH_SCRIPT } from '../../src/theme/no-flash';

describe('palettes', () => {
  it('exposes all four palettes with swatches', () => {
    expect(PALETTES.map((p) => p.name)).toEqual(['indigo', 'oxblood', 'pine', 'ochre']);
    for (const p of PALETTES) expect(p.swatch).toMatch(/^#[0-9a-f]{6}$/i);
  });
});

describe('no-flash script', () => {
  const run = (payload: unknown) => {
    localStorage.setItem('psb.state', JSON.stringify({ state: payload }));
    new Function(NO_FLASH_SCRIPT)();
    const d = document.documentElement.dataset;
    return [d.palette, d.theme];
  };
  it('applies valid values', () => {
    expect(run({ palette: 'pine', theme: 'dark' })).toEqual(['pine', 'dark']);
  });
  it('falls back to defaults for unknown values', () => {
    expect(run({ palette: 'neon', theme: 'blue' })).toEqual(['indigo', 'light']);
  });
});
