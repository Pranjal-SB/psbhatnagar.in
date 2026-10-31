import Link from 'next/link';

// Reuses the shelf's page surface (stage → spread → panel) so a dead link still
// lands somewhere that looks like the site, in whatever palette/theme is saved.
export default function NotFound() {
  return (
    <div className="stage-root desktop">
      <div className="grain" aria-hidden />
      <header className="topbar">
        <Link className="brand" href="/">
          psbhatnagar<span className="brand-dot">.</span>
          <svg className="brand-squiggle" viewBox="0 0 220 16" preserveAspectRatio="none" aria-hidden>
            <path
              d="M3 10 C 44 3, 88 15, 130 8 S 200 4, 217 11"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
        </Link>
      </header>
      <div className="stage">
        <main className="spread" data-active={0}>
          <section className="panel">
            <div className="panel-body panel-fill">
              <span className="ghost-num" aria-hidden>
                404
              </span>
              <h1 className="hero-h rise">wrong turn.</h1>
              <p className="lead rise rise-2">This page doesn&rsquo;t exist. The rest of the site does.</p>
              <div className="hero-cta rise rise-3">
                <Link className="link-btn" href="/">
                  take me home&nbsp;→
                </Link>
                <Link className="link-underline" href="/#projects">
                  see my projects
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
