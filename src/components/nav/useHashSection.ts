'use client';
import { useEffect, useLayoutEffect } from 'react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';

/** `#projects` → 3. Empty, unknown, or malformed → 0 (home). */
export function indexFromHash(hash: string): number {
  let name = hash.replace(/^#/, '');
  try {
    name = decodeURIComponent(name);
  } catch {
    return 0; // malformed percent-encoding, e.g. "#%"
  }
  const i = (SECTIONS as readonly string[]).indexOf(name.toLowerCase());
  return i === -1 ? 0 : i;
}

// The shelf is a client component but still server-rendered; useLayoutEffect
// warns on the server, so fall back to useEffect there.
const useBeforePaint = typeof window === 'undefined' ? useEffect : useLayoutEffect;

/**
 * Two-way binds the section index to `location.hash`, making sections
 * link-shareable and the back button step through them.
 *
 * `onResolve` fires exactly once, with the index resolved from the URL, after
 * persist has rehydrated. The caller uses it to land on that section directly —
 * a deep link should open *on* its section, not wipe in from home. It fires
 * even when the index is unchanged, so the caller can always tell that the URL
 * has settled. Later changes (back/forward, clicks) animate normally.
 */
export function useHashSection(onResolve: (i: number) => void) {
  const active = useAppStore((s) => s.active);
  const setActive = useAppStore((s) => s.setActive);

  // URL → store, once. Must wait for persist to finish rehydrating: any write
  // before that makes the persist middleware flush the store's pre-hydration
  // defaults over the saved palette/theme, silently wiping the user's choice.
  useBeforePaint(() => {
    const apply = () => {
      const i = indexFromHash(window.location.hash);
      if (i !== useAppStore.getState().active) setActive(i);
      onResolve(i); // always — signals "URL has settled", regardless of change
    };
    if (useAppStore.persist.hasHydrated()) {
      apply();
      return;
    }
    return useAppStore.persist.onFinishHydration(apply);
  }, []);

  // Back/forward → store. Real navigations, so these animate.
  useEffect(() => {
    const sync = () => setActive(indexFromHash(window.location.hash));
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, [setActive]);

  // store → URL. pushState (not `location.hash =`) so it never re-fires the
  // listener above, and never triggers the browser's fragment scroll.
  useEffect(() => {
    const want = SECTIONS[active];
    const current = window.location.hash.replace(/^#/, '');
    if (current === want) return;
    // A bare URL already means home — don't dirty it with "#home" on load.
    if (!current && active === 0) return;
    window.history.pushState(null, '', `#${want}`);
  }, [active]);
}
