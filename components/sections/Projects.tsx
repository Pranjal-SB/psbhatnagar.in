import { siteData } from '../../data/site';

export function Projects() {
  const { projects } = siteData;
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-4xl">projects</h2>
      <ul className="mt-8 space-y-6">
        {projects.map((p) => (
          <li key={p.name} className="border-t border-faint pt-4">
            <a href={p.href} target="_blank" rel="noreferrer" className="group block">
              <div className="flex items-baseline justify-between gap-4">
                <span className="font-display text-3xl group-hover:text-accent">{p.name}</span>
                <span className="font-mono text-sm text-muted group-hover:text-accent">
                  {p.cta}
                </span>
              </div>
              <p className="mt-1 text-muted">{p.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
