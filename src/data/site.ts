export interface Project {
  name: string;
  blurb: string;
  slug: string;
  // true → the row opens /projects/<slug> (an MDX write-up); otherwise it
  // links straight out to live, else repo
  caseStudy?: boolean;
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
      caseStudy: true,
      links: { live: 'https://examdb.org' },
    },
    {
      name: 'outn',
      blurb: 'machine learning that names the Pokémon in a picture',
      slug: 'outn',
      caseStudy: true,
      links: { repo: 'https://github.com/Pranjal-SB/outn' },
    },
    {
      name: 'type',
      blurb: 'a full IDE that lives in the terminal, mouse and all',
      slug: 'type',
      links: { repo: 'https://github.com/Pranjal-SB/type' },
    },
    {
      name: 'cowbird',
      blurb: 'disposable inboxes from ~55 backends behind one interface',
      slug: 'cowbird',
      links: { repo: 'https://github.com/Pranjal-SB/cowbird' },
    },
    {
      name: 'x-runner revival',
      blurb: 'a 2014 Android game, decompiled and rebuilt on Unity 6',
      slug: 'x-runner-revival',
      links: { repo: 'https://github.com/Pranjal-SB/X-Runner-Revival' },
    },
    {
      name: 'blood & glory revival',
      blurb: "Glu's 2012 Blood & Glory games, patched to run offline on today's Android",
      slug: 'blood-and-glory-revival',
      links: { repo: 'https://github.com/Pranjal-SB/Blood-and-Glory-Revival' },
    },
  ],
  gallery: [
    { caption: '10 apr 26', from: '#8fb5d6', to: '#3f6f9e', src: '/gallery/01.jpg' },
    { caption: '03 apr 26', from: '#7fa87a', to: '#345c3c', src: '/gallery/02.jpg' },
    { caption: '18 mar 26', from: '#d98a8a', to: '#8f3d54', src: '/gallery/03.jpg' },
    { caption: '21 oct 25', from: '#e0b46a', to: '#a06a2c', src: '/gallery/04.jpg' },
    { caption: '07 sep 25', from: '#b79bd6', to: '#6a4d9e', src: '/gallery/05.jpg' },
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
