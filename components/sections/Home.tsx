import { siteData } from '../../data/site';

export function Home() {
  const { profile } = siteData;
  return (
    <div className="max-w-3xl">
      <h1 className="font-display text-6xl leading-[0.95]">{profile.name}</h1>
      <p className="mt-4 text-xl text-muted">{profile.role}</p>
      <p className="mt-6 max-w-xl text-muted">{profile.blurb}</p>
      <p className="mt-8 font-mono text-sm text-muted">{profile.location.join(' ')}</p>
    </div>
  );
}
