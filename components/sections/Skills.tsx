import { siteData } from '../../data/site';

export function Skills() {
  const { skills } = siteData;
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-4xl">skills</h2>
      <dl className="mt-8 space-y-6">
        {skills.map((group) => (
          <div key={group.label} className="border-t border-faint pt-4">
            <dt className="font-mono text-sm uppercase tracking-wide text-muted">
              {group.label}
            </dt>
            <dd className="mt-2 text-2xl font-display">{group.items.join(' · ')}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
