import { siteData } from '../../data/site';

export function Gallery() {
  const { gallery } = siteData;
  return (
    <div className="max-w-3xl">
      <h2 className="font-display text-4xl">gallery</h2>
      <div className="mt-8 flex flex-wrap gap-4">
        {gallery.map((g) => (
          <figure
            key={g.caption}
            className="w-40 overflow-hidden rounded-lg"
            style={{ transform: `rotate(${g.rotate}deg)` }}
          >
            <div
              className="aspect-[3/4] w-full"
              style={{ background: `linear-gradient(160deg, ${g.from}, ${g.to})` }}
            />
            <figcaption className="mt-2 font-mono text-xs text-muted">{g.caption}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
