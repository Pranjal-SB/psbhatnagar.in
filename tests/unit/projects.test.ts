import { describe, it, expect } from 'vitest';
import { siteData } from '../../data/site';

describe('project data model', () => {
  it('every project has a non-empty slug', () => {
    for (const p of siteData.projects) {
      expect(p.slug).toBeTruthy();
      expect(p.slug).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it('slugs are unique', () => {
    const slugs = siteData.projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('examdb project exists with a live link', () => {
    const examdb = siteData.projects.find((p) => p.slug === 'examdb');
    expect(examdb).toBeDefined();
    expect(examdb?.links.live).toContain('http');
  });
});
