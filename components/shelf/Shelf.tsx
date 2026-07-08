'use client';
import { useRef } from 'react';
import { AnimatePresence } from 'motion/react';
import { useAppStore, SECTIONS } from '../../store/useAppStore';
import { useShelfNav } from '../nav/useShelfNav';
import { TopBar } from '../nav/TopBar';
import { Panel } from './Panel';
import { Spines } from './Spines';
import { Home } from '../sections/Home';
import { About } from '../sections/About';
import { Skills } from '../sections/Skills';
import { Projects } from '../sections/Projects';
import { Gallery } from '../sections/Gallery';
import { Connect } from '../sections/Connect';

const SECTION_COMPONENTS = [Home, About, Skills, Projects, Gallery, Connect];

export function Shelf() {
  const active = useAppStore((s) => s.active);
  useShelfNav();
  const prev = useRef(active);
  const dir = active >= prev.current ? 1 : -1;
  prev.current = active;
  const Active = SECTION_COMPONENTS[active];
  return (
    <div className="stage-root desktop">
      <div className="grain" aria-hidden />
      <TopBar />
      <div className="stage">
        <Spines />
        <main className="spread">
          <AnimatePresence mode="wait" custom={dir}>
            <Panel key={SECTIONS[active]} dir={dir}>
              <Active />
            </Panel>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
