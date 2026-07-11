import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home shelf has no serious axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
  expect(serious).toEqual([]);
});

test('case study page has no serious axe violations', async ({ page }) => {
  await page.goto('/projects/examdb');
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
  expect(serious).toEqual([]);
});

test('mobile shelf + fanned-out theme kit have no serious axe violations', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  // fan the palette kit out so the swatch buttons are in the scanned state
  await page.evaluate(() => document.querySelector('.palettes')?.classList.add('is-open'));
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact ?? ''));
  expect(serious).toEqual([]);
});
