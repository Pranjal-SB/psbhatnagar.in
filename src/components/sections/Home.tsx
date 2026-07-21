'use client';
import { siteData } from '../../data/site';
import { useAppStore } from '../../store/useAppStore';

export function Home() {
  const { profile } = siteData;
  const setActive = useAppStore((s) => s.setActive);
  return (
    <div className="panel-body panel-fill">
      <span className="ghost-num" aria-hidden>
        01
      </span>
      <p className="eyebrow rise">01 - home</p>
      <h1 className="hero-h">
        <span className="rise">Hi, I&rsquo;m</span>
        <br />
        <span className="rise rise-2">
          <span className="squiggle-word">
            <span className="squiggle-text">Pranjal</span>
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
          Swarup Bhatnagar
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
