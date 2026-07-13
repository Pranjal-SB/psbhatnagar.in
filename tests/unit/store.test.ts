import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore, clampIndex, SECTIONS } from '../../src/store/useAppStore';

const reset = () =>
  useAppStore.setState({ active: 0, palette: 'indigo', theme: 'light' });

describe('store', () => {
  beforeEach(reset);

  it('clamps active to section bounds', () => {
    expect(clampIndex(-2)).toBe(0);
    expect(clampIndex(99)).toBe(SECTIONS.length - 1);
    expect(clampIndex(2)).toBe(2);
  });

  it('setActive updates within bounds', () => {
    useAppStore.getState().setActive(3);
    expect(useAppStore.getState().active).toBe(3);
    useAppStore.getState().setActive(99);
    expect(useAppStore.getState().active).toBe(SECTIONS.length - 1);
  });

  it('palette switch preserves theme (orthogonal)', () => {
    useAppStore.getState().setTheme('dark');
    useAppStore.getState().setPalette('oxblood');
    expect(useAppStore.getState().theme).toBe('dark');
    expect(useAppStore.getState().palette).toBe('oxblood');
  });

  it('toggleTheme flips light/dark', () => {
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });
});
