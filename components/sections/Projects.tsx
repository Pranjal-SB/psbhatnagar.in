import { siteData } from '../../data/site';

export function Projects() {
  const { projects } = siteData;
  return (
    <div>
      <p className="eyebrow">04 — projects</p>
      <h2 className="section-h">built &amp; shipped</h2>
      <div className="proj-list">
        {projects.map((p) => (
          <a className="proj-row" key={p.name} href={p.href} target="_blank" rel="noreferrer">
            <span className="proj-main">
              <span className="proj-name">{p.name}</span>
              <span className="proj-blurb">{p.blurb}</span>
            </span>
            <span className="proj-cta">{p.cta}</span>
            <span className="peek peek-a" aria-hidden />
          </a>
        ))}
      </div>
    </div>
  );
}
