import { siteData } from '../../data/site';

export function About() {
  const { about } = siteData;
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-4xl">about</h2>
      <p className="mt-6 text-2xl leading-snug">{about.lead}</p>
      <p className="mt-4 text-muted">{about.body}</p>
      <p className="mt-8 font-mono text-sm text-muted">{about.tags.join(' ')}</p>
    </div>
  );
}
