export interface Project {
  name: string;
  blurb: string;
  slug: string;
  links: { live?: string; repo?: string };
}
export interface SkillGroup {
  label: string;
  items: string[];
}
export interface GalleryItem {
  caption: string;
  from: string;
  to: string;
  rotate: number;
  src?: string; // real photo path under /public; designed texture placeholder when absent
}
export interface Links {
  email: string;
  resume: string;
  instagram: string;
  /** rendered in order on the connect section */
  social: { label: string; href: string }[];
}

export interface SiteData {
  profile: { name: string; role: string; blurb: string };
  about: { lead: string; body: string };
  skills: SkillGroup[];
  projects: Project[];
  gallery: GalleryItem[];
  links: Links;
}

// Live resume: the auto-resume repo regenerates resume.pdf weekly; the Google
// viewer renders that raw PDF inline instead of forcing a download.
const RESUME_URL =
  'https://docs.google.com/viewer?url=https://raw.githubusercontent.com/Pranjal-SB/auto-resume/main/resume.pdf';

export const siteData: SiteData = {
  profile: {
    name: 'Pranjal Swarup Bhatnagar',
    role: 'software developer',
    blurb:
      'Software developer, CSE & cybersecurity at SRMIST. I take pictures and watch too many movies.',
  },
  about: {
    lead: 'I like making things that feel good to use, not just work.',
    body: 'Been obsessed with computers since I was a kid, taking them apart, breaking them, putting them back. Now I build the things that run on them.',
  },
  skills: [
    { label: 'languages', items: ['TypeScript', 'Python', 'SQL', 'C', 'Java'] },
    { label: 'frameworks', items: ['Next.js', 'React', 'FastAPI', 'Node', 'Tailwind'] },
    { label: 'infra', items: ['Postgres', 'Redis', 'Docker', 'Bun', 'Git', 'Linux'] },
  ],
  projects: [
    {
      name: 'examdb',
      blurb: 'every competitive exam date, kept fresh by scrapers',
      slug: 'examdb',
      links: { live: 'https://examdb.org' },
    },
    {
      name: 'outn',
      blurb: 'machine learning that names the Pokémon in a picture',
      slug: 'outn',
      links: { repo: 'https://github.com/Pranjal-SB/outn' },
    },
  ],
  gallery: [
    { caption: 'psb · 01', from: '#8fb5d6', to: '#3f6f9e', rotate: -3 },
    { caption: 'psb · 02', from: '#7fa87a', to: '#345c3c', rotate: 1.5 },
    { caption: 'psb · 03', from: '#d98a8a', to: '#8f3d54', rotate: -1.5 },
    { caption: 'psb · 04', from: '#e0b46a', to: '#a06a2c', rotate: 2.5 },
    { caption: 'psb · 05', from: '#b79bd6', to: '#6a4d9e', rotate: -2 },
  ],
  links: {
    email: 'mailto:psbhatnagar.in@gmail.com',
    resume: RESUME_URL,
    instagram: 'https://www.instagram.com/psbhatnagarin/',
    social: [
      { label: 'GitHub', href: 'https://github.com/Pranjal-SB' },
      { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pranjalsb/' },
      { label: 'Blog', href: 'https://psb.bearblog.dev' },
      { label: 'Instagram', href: 'https://www.instagram.com/psbhatnagarin/' },
      { label: 'Chess', href: 'https://www.chess.com/member/psbhatnagar' },
      { label: 'Resume', href: RESUME_URL },
    ],
  },
};
