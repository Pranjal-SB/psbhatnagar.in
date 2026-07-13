import { describe, it, expect } from 'vitest';
import { PALETTES } from '../../src/theme/palettes';

describe('palettes', () => {
  it('exposes all four palettes with swatches', () => {
    expect(PALETTES.map((p) => p.name)).toEqual(['indigo', 'oxblood', 'pine', 'ochre']);
    for (const p of PALETTES) expect(p.swatch).toMatch(/^#[0-9a-f]{6}$/i);
  });
});
