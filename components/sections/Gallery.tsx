import { siteData } from '../../data/site';

export function Gallery() {
  const { gallery } = siteData;
  return (
    <div>
      <p className="eyebrow rise">05 — gallery</p>
      <h2 className="section-h tight rise rise-2">through my lens</h2>
      <p className="sub-copy rise rise-3">a few frames — film &amp; digital.</p>
      <div className="frames rise rise-4">
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
            <div className="frame-img">
              {g.src ? <img src={g.src} alt={g.caption} loading="lazy" /> : null}
            </div>
            <figcaption>{g.caption}</figcaption>
          </figure>
        ))}
      </div>
      <a
        className="link-underline gallery-link rise rise-5"
        href={siteData.links.instagram}
        target="_blank"
        rel="noreferrer"
      >
        more on instagram&nbsp;↗
      </a>
    </div>
  );
}
