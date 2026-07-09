import { test, expect, type Page } from '@playwright/test';

async function seedMobile(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem(
      'psb.state',
      JSON.stringify({ state: { active: 0, palette: 'indigo', theme: 'light' }, version: 0 }),
    );
  });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize({ width: 375, height: 812 });
}

test('mobile dock is visible and switches sections', async ({ page }) => {
  await seedMobile(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('nav.dock')).toBeVisible();
  await expect(page.locator('.dock-label')).toHaveText('home');
  await page.locator('.dock-tab', { hasText: '3' }).click();
  await expect(page.locator('.dock-tab.is-active .dock-num')).toHaveText('3');
  await expect(page.locator('.dock-label')).toHaveText('skills');
});

test('mobile: no horizontal overflow', async ({ page }) => {
  await seedMobile(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  expect(overflow).toBe(false);
});

test('mobile popover toggles palette + theme controls', async ({ page }) => {
  await seedMobile(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.topbar-pop')).toHaveCount(0);
  await page.locator('.topbar-toggle').click();
  await expect(page.locator('.topbar-pop')).toBeVisible();
  await expect(page.locator('.topbar-pop .pal[data-pal="pine"]')).toBeVisible();
  await page.locator('.topbar-pop .pal[data-pal="pine"]').click();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'pine');
  await page.keyboard.press('Escape');
  await expect(page.locator('.topbar-pop')).toHaveCount(0);
});
