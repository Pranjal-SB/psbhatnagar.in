import { siteData } from '../../data/site';

export function Connect() {
  const { links } = siteData;
  const entries: [string, string][] = [
    ['GitHub', links.github],
    ['Instagram', links.instagram],
    ['Email', links.email],
    ['Resume', links.resume],
  ];
  return (
    <div>
      <div className="connect-card">
        <p className="eyebrow">06 — connect</p>
        <h2 className="section-h">say hello</h2>
        <div className="connect-links">
          {entries.map(([label, href]) => (
            <a
              className="connect-link"
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
            >
              {label}&nbsp;↗
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
