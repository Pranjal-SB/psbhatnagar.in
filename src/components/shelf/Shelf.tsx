'use client';
import { useEffect, useRef, useState } from 'react';
import { useAnimate } from 'motion/react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';
import { useShelfNav } from '../nav/useShelfNav';
import { useHashSection } from '../nav/useHashSection';
import { TopBar } from '../nav/TopBar';
import { Panel } from './Panel';
import { Spines } from './Spines';
import { Dock } from '../nav/Dock';
import { EASE } from '../../lib/motion';
import { Home } from '../sections/Home';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Gallery } from '../sections/Gallery';
import { Connect } from '../sections/Connect';

const SECTION_COMPONENTS = [Home, About, Skills, Projects, Gallery, Connect];
// The curtain names the section being entered from the first frame, so the name
// is already readable during the cover sweep. That removed the hold beat the
// wipe used to need (0.38 + 0.22 + 0.38 = 0.98s) and let the halves tighten.
const WIPE_HALF = 0.28; // seconds per sweep half

function prefersReduced(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

export function Shelf() {
  const active = useAppStore((s) => s.active);
  useShelfNav();

  // `shown` is the panel currently painted; it lags `active` until the
  // wipe curtain fully covers the content, so the swap happens off-screen.
  const [shown, setShown] = useState(active);
  // What the curtain reads. Tracked separately from `shown` because the curtain
  // must name the destination while `shown` is still the section being left.
  const [curtain, setCurtain] = useState(active);
  // The section the URL resolved to at mount, pending its first paint. zustand
  // commits `active` via useSyncExternalStore, separately from this `setShown`,
  // so there is an intermediate commit where active is the deep-linked section
  // and `shown` is still home — that commit must snap, not wipe. Matching on
  // the index (rather than a boolean flag) is what makes it stale-commit-proof.
  const initialTarget = useRef<number | null>(null);
  useHashSection((i) => {
    initialTarget.current = i;
    setShown(i);
    setCurtain(i);
  });
  const [scope, animate] = useAnimate();
  const running = useRef(false);
  const queued = useRef<number | null>(null);
  const unmounted = useRef(false);

  useEffect(() => {
    unmounted.current = false;
    return () => {
      unmounted.current = true;
    };
  }, []);

  useEffect(() => {
    if (active === shown) return;
    // Consume the URL's initial target on the first real divergence, so a later
    // navigation back to that same index still animates normally.
    const initial = initialTarget.current;
    initialTarget.current = null;
    if (initial !== null && active === initial) {
      setShown(active); // deep link lands directly — no wipe
      setCurtain(active);
      return;
    }
    if (running.current) {
      queued.current = active; // fold rapid changes into the in-flight wipe
      return;
    }

    // An in-flight wipe must never be cancelled by `active` changing again —
    // rapid changes are folded via `queued` and consumed when the wipe lands.
    const runWipe = async (from: number, to: number) => {
      setCurtain(to); // the curtain announces where we're going, not where we were
      if (prefersReduced()) {
        setShown(to);
        return;
      }
      running.current = true;
      try {
        const dir = to > from ? 1 : -1;
        const enterFrom = dir > 0 ? '106%' : '-106%';
        const exitTo = dir > 0 ? '-106%' : '106%';
        // Swipe-driven changes sweep along the finger; keys, dock and deep links
        // keep the sideways book-page sweep.
        const axis = useAppStore.getState().wipeAxis;
        const sweep = axis === 'y' ? 'y' : 'x';
        const rest = axis === 'y' ? 'x' : 'y';

        // Park the resting axis first, instantly. Folding it into the sweep
        // below would *animate* it from wherever the last wipe left it, dragging
        // the curtain in diagonally whenever the axis changes.
        await animate(scope.current, { [rest]: '0%' }, { duration: 0 });
        // cover: curtain sweeps in across the spread
        await animate(
          scope.current,
          { [sweep]: [enterFrom, '0%'] },
          { duration: WIPE_HALF, ease: EASE.inOut },
        );
        if (unmounted.current) return;
        setShown(to); // swap under the curtain
        // reveal: slide off the far side
        await animate(
          scope.current,
          { [sweep]: ['0%', exitTo] },
          { duration: WIPE_HALF, ease: EASE.inOut },
        );
      } finally {
        running.current = false;
      }
      if (unmounted.current) return;
      const next = queued.current;
      queued.current = null;
      if (next != null && next !== to) runWipe(to, next);
    };

    runWipe(shown, active);
  }, [active, shown, animate, scope]);

  const Active = SECTION_COMPONENTS[shown];

  return (
    <div className="stage-root desktop">
      <div className="grain" aria-hidden />
      <TopBar />
      <div className="stage">
        <main className="spread" data-active={shown}>
          <Panel key={SECTIONS[shown]}>
            <Active />
          </Panel>
          <div ref={scope} className="wipe" aria-hidden style={{ transform: 'translateX(106%)' }}>
            <span className="wipe-num">{String(curtain + 1).padStart(2, '0')}</span>
            <span className="wipe-name">{SECTIONS[curtain]}</span>
          </div>
        </main>
        <Spines />
        <Dock />
      </div>
    </div>
  );
}
