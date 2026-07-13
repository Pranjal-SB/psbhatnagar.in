import Link from 'next/link';
import { siteData } from '../../data/site';

export function Projects() {
  const { projects } = siteData;
  return (
    <div>
      <p className="eyebrow rise">04 — projects</p>
      <h2 className="section-h rise rise-2">built &amp; shipped</h2>
      <div className="proj-list rise rise-3">
        {projects.map((p) => (
          <Link className="proj-row" key={p.slug} href={`/projects/${p.slug}`}>
            <span className="proj-main">
              <span className="proj-name">{p.name}</span>
              <span className="proj-blurb">{p.blurb}</span>
            </span>
            <span className="proj-cta">read ↗</span>
            <span className="peek peek-a" aria-hidden />
          </Link>
        ))}
      </div>
    </div>
  );
}
