import { describe, it, expect } from 'vitest';
import { indexFromHash } from '../../src/components/nav/useHashSection';
import { SECTIONS } from '../../src/store/useAppStore';

describe('indexFromHash', () => {
  it('maps every section name to its index', () => {
    SECTIONS.forEach((name, i) => {
      expect(indexFromHash(`#${name}`)).toBe(i);
    });
  });

  it('tolerates a missing leading #', () => {
    expect(indexFromHash('projects')).toBe(3);
  });

  it('is case-insensitive', () => {
    expect(indexFromHash('#Projects')).toBe(3);
    expect(indexFromHash('#GALLERY')).toBe(4);
  });

  it('decodes percent-encoding', () => {
    expect(indexFromHash('#%70rojects')).toBe(3);
  });

  it('falls back to home for empty, unknown, or malformed input', () => {
    expect(indexFromHash('')).toBe(0);
    expect(indexFromHash('#')).toBe(0);
    expect(indexFromHash('#nope')).toBe(0);
    expect(indexFromHash('#%')).toBe(0); // malformed encoding must not throw
    expect(indexFromHash('#../../etc')).toBe(0);
  });
});
