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

const WHEEL_THRESHOLD = 100;
const WHEEL_LOCK_MS = 650;
const GESTURE_GAP_MS = 200; // silence this long = new scroll gesture
const SWIPE_THRESHOLD = 50;
const EDGE_GUARD_PX = 24; // leave the browser's edge back-swipe alone

export function stepFromSwipe(
  e: { dx: number; dy: number },
  threshold: number,
): -1 | 0 | 1 {
  // Horizontal only — matches the wipe direction; vertical stays free for
  // in-panel content scrolling.
  if (Math.abs(e.dy) > Math.abs(e.dx)) return 0;
  if (e.dx <= -threshold) return 1; // swipe left → next
  if (e.dx >= threshold) return -1; // swipe right → prev
  return 0;
}

export function useShelfNav() {
  const setActive = useAppStore((s) => s.setActive);
  useEffect(() => {
    let acc = 0;
    let locked = false;
    let lastT = 0;
    let swallowMomentum = false;
    const onWheel = (e: WheelEvent) => {
      const now = performance.now();
      const gap = now - lastT;
      lastT = now;
      if (locked) return;
      // after a step, ignore the rest of the same gesture (trackpad momentum)
      if (swallowMomentum) {
        if (gap < GESTURE_GAP_MS) return;
        swallowMomentum = false;
      }
      if (gap > GESTURE_GAP_MS) acc = 0; // fresh gesture
      acc += Math.abs(e.deltaX) >= Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      const step = stepFromWheel({ deltaX: acc, deltaY: 0 }, WHEEL_THRESHOLD);
      if (step !== 0) {
        setActive(useAppStore.getState().active + step);
        acc = 0;
        locked = true;
        swallowMomentum = true;
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
    let fromEdge = false;
    const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
      fromEdge = startX < EDGE_GUARD_PX || startX > window.innerWidth - EDGE_GUARD_PX;
    };
    const onTouchEnd = (e: TouchEvent) => {
      if (!isMobile() || fromEdge) return;
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
