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
      // Only real preferences persist. `active` is UI position — the URL hash
      // owns it (see useHashSection), so it must never come back from storage.
      partialize: (s) => ({ palette: s.palette, theme: s.theme }),
      // Older payloads still hold an `active`; drop it on rehydrate rather than
      // bumping `version`. No version bump means no storage rewrite, so an
      // older build reads this same payload fine (clean rollback), and a stale
      // index can never win over the URL. Spreading `persisted` as-is also
      // can't clobber a default with `undefined` — absent keys stay absent.
      merge: (persisted, current) => ({
        ...current,
        ...(persisted as Partial<AppState>),
        active: current.active,
      }),
    },
  ),
);
