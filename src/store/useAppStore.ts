import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const SECTIONS = ['home', 'about', 'skills', 'projects', 'gallery', 'connect'] as const;
export type PaletteName = 'indigo' | 'oxblood' | 'pine' | 'ochre';
export type ThemeName = 'light' | 'dark';

const MAX = SECTIONS.length - 1;
export function clampIndex(i: number): number {
  return Math.max(0, Math.min(MAX, Math.trunc(i)));
}

interface AppState {
  active: number;
  palette: PaletteName;
  theme: ThemeName;
  setActive: (i: number) => void;
  setPalette: (p: PaletteName) => void;
  setTheme: (t: ThemeName) => void;
  toggleTheme: () => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      active: 0,
      palette: 'indigo',
      theme: 'light',
      setActive: (i) => set({ active: clampIndex(i) }),
      setPalette: (palette) => set({ palette }), // theme untouched — orthogonal
      setTheme: (theme) => set({ theme }),
      toggleTheme: () => set((s) => ({ theme: s.theme === 'light' ? 'dark' : 'light' })),
    }),
    {
      name: 'psb.state',
      storage: createJSONStorage(() => localStorage),
      partialize: (s) => ({ active: s.active, palette: s.palette, theme: s.theme }),
    },
  ),
);
