import Link from 'next/link';
import './case-study.css';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="cs-root">
      <div className="grain" aria-hidden />
      <header className="cs-top">
        <Link href="/" className="cs-back">← the shelf</Link>
      </header>
      <main className="cs-main">
        <article className="cs-article">{children}</article>
      </main>
    </div>
  );
}
