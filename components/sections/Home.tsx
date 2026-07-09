'use client';
import { siteData } from '../../data/site';
import { useAppStore } from '../../store/useAppStore';

export function Home() {
  const { profile } = siteData;
  const setActive = useAppStore((s) => s.setActive);
  return (
    <div className="panel-body">
      <p className="eyebrow">01 — home</p>
      <h1 className="hero-h">
        <span className="rise">builds tools that</span>
        <br />
        <span className="rise rise-2 nowrap">
          <span className="squiggle-word">
            <span className="squiggle-text">feel good</span>
            <svg className="word-squiggle" viewBox="0 0 300 24" preserveAspectRatio="none" aria-hidden>
              <path
                d="M4 15 C 60 6, 120 22, 175 12 S 270 6, 296 14"
                fill="none"
                stroke="var(--accent)"
                strokeWidth="6"
                strokeLinecap="round"
              />
            </svg>
          </span>{' '}
          to use.
        </span>
      </h1>
      <p className="lead rise rise-3">{profile.blurb}</p>
      <div className="hero-cta rise rise-4">
        <button className="link-btn" onClick={() => setActive(3)}>
          see my projects&nbsp;→
        </button>
        <a className="link-underline" href={siteData.links.resume}>
          resume&nbsp;↗
        </a>
      </div>
    </div>
  );
}
