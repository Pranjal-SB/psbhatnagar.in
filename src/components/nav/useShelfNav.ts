'use client';
import { useEffect } from 'react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';

const SWIPE_THRESHOLD = 50;
// Live drag feedback: the panel follows the finger, damped and capped, so the
// gesture reads as connected before it commits. Purely cosmetic — the commit
// decision is still made from the raw delta on touchend.
const DRAG_DAMP = 0.32;
const DRAG_CAP_PX = 44;
// Kept in sync with the mobile layout in theme/site.css: phones in portrait,
// plus large phones in landscape (915x412 is wider than 768 but only 412 tall).
export const MOBILE_MEDIA = '(max-width: 768px), (orientation: landscape) and (max-height: 500px)';

export function stepFromSwipe(
  e: { dx: number; dy: number },
  threshold: number,
): -1 | 0 | 1 {
  // Vertical only, matching the wipe direction on touch. Horizontal is left to
  // the browser's back/forward swipe. The panel never scrolls (see
  // tests/e2e/fit.spec.ts), so nothing else wants this axis.
  if (Math.abs(e.dx) > Math.abs(e.dy)) return 0;
  if (e.dy <= -threshold) return 1; // swipe up → next
  if (e.dy >= threshold) return -1; // swipe down → prev
  return 0;
}

export function useShelfNav() {
  const setActive = useAppStore((s) => s.setActive);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key >= '1' && e.key <= String(SECTIONS.length)) setActive(Number(e.key) - 1);
      else if (e.key === 'ArrowRight' || e.key === 'ArrowDown')
        setActive(useAppStore.getState().active + 1);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp')
        setActive(useAppStore.getState().active - 1);
    };

    let startX = 0;
    let startY = 0;
    const isMobile = () => window.matchMedia(MOBILE_MEDIA).matches;
    const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const setDrag = (px: number) =>
      document.documentElement.style.setProperty('--drag-y', `${px}px`);
    const clearDrag = () => document.documentElement.style.removeProperty('--drag-y');

    const onTouchStart = (e: TouchEvent) => {
      const t = e.changedTouches[0];
      startX = t.clientX;
      startY = t.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isMobile() || reduced()) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) return; // horizontal: browser's gesture
      const damped = Math.max(-DRAG_CAP_PX, Math.min(DRAG_CAP_PX, dy * DRAG_DAMP));
      setDrag(damped);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearDrag();
      if (!isMobile()) return;
      const t = e.changedTouches[0];
      const step = stepFromSwipe(
        { dx: t.clientX - startX, dy: t.clientY - startY },
        SWIPE_THRESHOLD,
      );
      if (step !== 0) setActive(useAppStore.getState().active + step, 'y');
    };

    window.addEventListener('keydown', onKey);
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('touchcancel', clearDrag, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', clearDrag);
      clearDrag();
    };
  }, [setActive]);
}
