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
const SWIPE_THRESHOLD = 40;

export function stepFromSwipe(
  e: { dx: number; dy: number },
  threshold: number,
): -1 | 0 | 1 {
  // Vertical only. Ignore horizontal-dominant drags so the browser's
  // edge back-swipe is left untouched (ui-ux gesture-conflicts rule).
  if (Math.abs(e.dx) > Math.abs(e.dy)) return 0;
  if (e.dy <= -threshold) return 1; // swipe up → next
  if (e.dy >= threshold) return -1; // swipe down → prev
  return 0;
}

export function useShelfNav() {
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
    };
    let startX = 0;
    let startY = 0;
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isMobile()) return;
      const t = e.changedTouches[0];
      const step = stepFromSwipe(
        { dx: t.clientX - startX, dy: t.clientY - startY },
        SWIPE_THRESHOLD,
      );
      if (step !== 0) setActive(useAppStore.getState().active + step);
    };
    window.addEventListener('wheel', onWheel, { passive: true });
    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [setActive]);
}
