'use client';
import { useEffect } from 'react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';

export function stepFromWheel(
  e: { deltaX: number; deltaY: number },
  threshold: number,
): -1 | 0 | 1 {
  const d = Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
  if (d >= threshold) return 1;
  if (d <= -threshold) return -1;
  return 0;
}

const WHEEL_THRESHOLD = 40;
const WHEEL_LOCK_MS = 450;

export function useShelfNav(onOpenPalette: () => void) {
  const setActive = useAppStore((s) => s.setActive);
  useEffect(() => {
    let acc = 0;
    let locked = false;
    const onWheel = (e: WheelEvent) => {
      acc += Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (locked) return;
      const step = stepFromWheel({ deltaX: acc, deltaY: 0 }, WHEEL_THRESHOLD);
      if (step !== 0) {
        setActive(useAppStore.getState().active + step);
        acc = 0;
        locked = true;
        setTimeout(() => (locked = false), WHEEL_LOCK_MS);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= String(SECTIONS.length)) setActive(Number(e.key) - 1);
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setActive(useAppStore.getState().active + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setActive(useAppStore.getState().active - 1);
      else if (e.shiftKey && (e.key === 'P' || e.key === 'p')) {
        e.preventDefault();
        onOpenPalette();
      }
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
    };
  }, [setActive, onOpenPalette]);
}
