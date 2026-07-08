import { siteData } from '../../data/site';

export function About() {
  const { about } = siteData;
  return (
    <div>
      <div className="ring" aria-hidden />
      <div className="orb orb-b about-orb" aria-hidden />
      <p className="eyebrow">02 — about</p>
      <p className="about-lead">{about.lead}</p>
      <div className="rule" />
      <p className="body-copy">{about.body}</p>
      <div className="tag-row">
        {about.tags.map((t) => (
          <span key={t}>{t}</span>
        ))}
      </div>
    </div>
  );
}
