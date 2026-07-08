import { siteData } from '../../data/site';

export function Connect() {
  const { links } = siteData;
  const entries: [string, string][] = [
    ['github', links.github],
    ['instagram', links.instagram],
    ['email', links.email],
    ['resume', links.resume],
  ];
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-4xl">connect</h2>
      <ul className="mt-8 space-y-4">
        {entries.map(([label, href]) => (
          <li key={label} className="border-t border-faint pt-3">
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-baseline justify-between font-display text-2xl hover:text-accent"
            >
              {label}
              <span className="font-mono text-sm text-muted">↗</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
