import { siteData } from '../../data/site';

export function Connect() {
  const { links } = siteData;
  return (
    <div className="panel-body">
      <p className="eyebrow rise">06 - connect</p>
      <h2 className="section-h rise rise-2">say hello</h2>
      <a className="connect-mail rise rise-3" href={links.email}>
        {links.email.replace('mailto:', '')}&nbsp;↗
      </a>
      <div className="connect-row rise rise-4">
        {links.social.map(({ label, href }) => (
          <a
            className="link-underline"
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
  );
}
