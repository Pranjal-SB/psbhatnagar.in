export interface Project {
  name: string;
  blurb: string;
  href: string;
  cta: string;
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
}
export interface Links {
  github: string;
  instagram: string;
  email: string;
  resume: string;
}

export interface SiteData {
  profile: { name: string; role: string; blurb: string; location: string[] };
  about: { lead: string; body: string; tags: string[] };
  skills: SkillGroup[];
  projects: Project[];
  gallery: GalleryItem[];
  links: Links;
}

export const siteData: SiteData = {
  profile: {
    name: 'Pranjal Bhatnagar',
    role: 'software developer',
    blurb:
      'Pranjal Bhatnagar — software developer studying CSE & cybersecurity at SRMIST. Takes pictures & watches too many movies.',
    location: ['based in chennai', '· srmist', '· cse + cybersecurity'],
  },
  about: {
    lead: 'I like making things that feel good to use, not just work.',
    body: 'Design-dev hybrid — happiest in the seam between how a thing looks and how it behaves. Learning where craft and code meet, one small tool at a time.',
    tags: ['based in chennai', '· srmist', '· cse + cybersecurity'],
  },
  skills: [
    { label: 'languages', items: ['TypeScript', 'Python', 'C', 'SQL'] },
    { label: 'frameworks', items: ['React', 'Next.js', 'Node', 'Tailwind'] },
    { label: 'tools', items: ['Figma', 'Git', 'Linux', 'Affinity'] },
  ],
  projects: [
    {
      name: 'examdb',
      blurb: 'past papers, organised — for last-minute studiers',
      href: 'https://examdb.vercel.app',
      cta: 'live ↗',
    },
    {
      name: 'outn',
      blurb: 'on GitHub — small tool, honest scope',
      href: 'https://github.com',
      cta: 'repo ↗',
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
    github: 'https://github.com',
    instagram: 'https://instagram.com/psbhatnagar.in',
    email: 'mailto:hello@psbhatnagar.in',
    resume: '/resume.pdf',
  },
};
