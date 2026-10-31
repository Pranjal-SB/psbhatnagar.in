import Link from 'next/link';
import { siteData, type Project } from '../../data/site';

function RowBody({ p, cta }: { p: Project; cta: string }) {
  return (
    <>
      <span className="proj-main">
        <span className="proj-name">{p.name}</span>
        <span className="proj-blurb">{p.blurb}</span>
      </span>
      <span className="proj-cta">{cta}</span>
    </>
  );
}

export function Projects() {
  const { projects } = siteData;
  return (
    <div>
      <p className="eyebrow rise">04 - projects</p>
      <h2 className="section-h rise rise-2">built &amp; shipped</h2>
      <div className="proj-list rise rise-3">
        {projects.map((p) =>
          p.caseStudy ? (
            <Link className="proj-row" key={p.slug} href={`/projects/${p.slug}`}>
              <RowBody p={p} cta={"read\u00a0→"} />
            </Link>
          ) : (
            <a
              className="proj-row"
              key={p.slug}
              href={p.links.live ?? p.links.repo}
              target="_blank"
              rel="noopener noreferrer"
            >
              <RowBody p={p} cta={p.links.live ? 'live ↗' : 'repo ↗'} />
            </a>
          ),
        )}
      </div>
    </div>
  );
}
