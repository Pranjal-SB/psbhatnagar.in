'use client';
import { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
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
  const [, setPaletteOpen] = useState(false);
  useShelfNav(() => setPaletteOpen(true));
  const Active = SECTION_COMPONENTS[active];
  return (
    <div className="stage-root desktop">
      <div className="grain" aria-hidden />
      <TopBar onOpenPalette={() => setPaletteOpen(true)} />
      <div className="stage">
        <Spines />
        <main className="spread">
          <Panel>
            <Active />
          </Panel>
          {/* CommandPalette mounts here in Task 8 */}
        </main>
      </div>
    </div>
  );
}
