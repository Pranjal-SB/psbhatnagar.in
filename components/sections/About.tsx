import { siteData } from '../../data/site';

export function About() {
  const { about } = siteData;
  return (
    <div>
      <p className="eyebrow rise">02 — about</p>
      <div className="about-grid">
        <p className="about-lead rise rise-2">{about.lead}</p>
        <div className="about-side rise rise-3">
          <div className="rule" />
          <p className="body-copy">{about.body}</p>
          <div className="tag-row">
            {about.tags.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
