import { siteData } from '../../data/site';

export function Skills() {
  const { skills } = siteData;
  return (
    <div>
      <p className="eyebrow rise">03 — skills</p>
      <h2 className="section-h rise rise-2">what I reach for</h2>
      <div className="skill-groups rise rise-3">
        {skills.map((group) => (
          <div className="skill-row" key={group.label}>
            <span className="skill-label">{group.label}</span>
            <p className="skill-set">
              {group.items.map((item) => (
                <span className="skill" key={item}>
                  {item}
                </span>
              ))}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
