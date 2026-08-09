import { describe, it, expect, beforeEach } from 'vitest';
import { useAppStore, clampIndex, SECTIONS } from '../../src/store/useAppStore';

type AppSnapshot = { active: number; palette: string; theme: string };

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

  it('setActive records the wipe axis, defaulting to the sideways sweep', () => {
    useAppStore.getState().setActive(2);
    expect(useAppStore.getState().wipeAxis).toBe('x');
    useAppStore.getState().setActive(3, 'y');
    expect(useAppStore.getState().wipeAxis).toBe('y');
    // a later non-swipe change must put the sweep back
    useAppStore.getState().setActive(1);
    expect(useAppStore.getState().wipeAxis).toBe('x');
  });

  it('palette switch preserves theme (orthogonal)', () => {
    useAppStore.getState().setTheme('dark');
    useAppStore.getState().setPalette('oxblood');
    expect(useAppStore.getState().theme).toBe('dark');
    expect(useAppStore.getState().palette).toBe('oxblood');
  });

  it('does not persist active — site reopens on home', () => {
    useAppStore.getState().setActive(4);
    useAppStore.getState().setPalette('pine');

    const stored = JSON.parse(localStorage.getItem('psb.state') ?? '{}');
    expect(stored.state).not.toHaveProperty('active');
    expect(stored.state.palette).toBe('pine');
  });

  it('merge ignores a stale persisted active — the URL owns the section', () => {
    const { merge } = useAppStore.persist.getOptions();
    const out = merge?.(
      { active: 4, palette: 'pine', theme: 'dark' },
      useAppStore.getState(),
    ) as AppSnapshot;
    expect(out.active).toBe(0);
    expect(out.palette).toBe('pine');
    expect(out.theme).toBe('dark');
  });

  it('merge never clobbers a default with undefined', () => {
    // A payload missing palette/theme must leave the defaults standing —
    // ThemeProvider would stringify undefined into data-palette="undefined".
    const { merge } = useAppStore.persist.getOptions();
    expect((merge?.({ active: 4 }, useAppStore.getState()) as AppSnapshot).palette).toBe('indigo');
    expect((merge?.({}, useAppStore.getState()) as AppSnapshot).theme).toBe('light');
  });

  it('toggleTheme flips light/dark', () => {
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('dark');
    useAppStore.getState().toggleTheme();
    expect(useAppStore.getState().theme).toBe('light');
  });
});
