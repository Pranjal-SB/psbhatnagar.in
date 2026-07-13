'use client';
import { useEffect } from 'react';
import { useAppStore } from '../store/useAppStore';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const palette = useAppStore((s) => s.palette);
  const theme = useAppStore((s) => s.theme);
  useEffect(() => {
    const r = document.documentElement;
    r.dataset.palette = palette;
    r.dataset.theme = theme;
  }, [palette, theme]);
  return <>{children}</>;
}
