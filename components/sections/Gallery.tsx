import { siteData } from '../../data/site';

export function Gallery() {
  const { gallery } = siteData;
  return (
    <div>
      <p className="eyebrow">05 — gallery</p>
      <h2 className="section-h tight">through my lens</h2>
      <p className="sub-copy">a few frames — film &amp; digital.</p>
      <div className="frames">
        {gallery.map((g) => (
          <figure
            className="frame"
            key={g.caption}
            style={
              {
                '--rot': `${g.rotate}deg`,
                '--from': g.from,
                '--to': g.to,
              } as React.CSSProperties
            }
          >
            <div className="frame-img" />
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
      <a className="link-underline gallery-link" href={siteData.links.instagram} target="_blank" rel="noreferrer">
        more on instagram&nbsp;↗
      </a>
    </div>
  );
}
