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

// Browser/OS shortcuts (Ctrl/Cmd+digit tab switch, Alt+Arrow history) and typing
// in a field must not move the shelf.
export function ignoreKey(e: Pick<KeyboardEvent, 'ctrlKey' | 'metaKey' | 'altKey' | 'target'>): boolean {
  if (e.ctrlKey || e.metaKey || e.altKey) return true;
  const el = e.target as HTMLElement | null;
  return !!el && (/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) || el.isContentEditable === true);
}

export function useShelfNav() {
  const setActive = useAppStore((s) => s.setActive);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (ignoreKey(e)) return;
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

    // Only the first finger drives a gesture. A second finger aborts it, and
    // nothing re-arms until every finger lifts.
    let trackId: number | null = null;
    let aborted = false;
    const findTouch = (list: TouchList) =>
      Array.from(list).find((t) => t.identifier === trackId);
    const reset = () => {
      trackId = null;
      aborted = false;
      clearDrag();
    };

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 1) {
        aborted = true;
        trackId = null;
        clearDrag();
        return;
      }
      if (aborted) return;
      const t = e.changedTouches[0];
      trackId = t.identifier;
      startX = t.clientX;
      startY = t.clientY;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isMobile() || reduced() || aborted) return;
      const t = findTouch(e.changedTouches);
      if (!t) return;
      const dx = t.clientX - startX;
      const dy = t.clientY - startY;
      if (Math.abs(dx) > Math.abs(dy)) return; // horizontal: browser's gesture
      const damped = Math.max(-DRAG_CAP_PX, Math.min(DRAG_CAP_PX, dy * DRAG_DAMP));
      setDrag(damped);
    };
    const onTouchEnd = (e: TouchEvent) => {
      clearDrag();
      const t = aborted ? undefined : findTouch(e.changedTouches);
      if (e.touches.length === 0) reset();
      if (!t || !isMobile()) return;
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
    window.addEventListener('touchcancel', reset, { passive: true });
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', reset);
      clearDrag();
    };
  }, [setActive]);
}
