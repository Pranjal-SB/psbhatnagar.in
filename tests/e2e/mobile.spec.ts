import { test, expect, devices, type Page } from '@playwright/test';

// real mobile emulation: touch events + (hover: none) media, which the
// theme-kit fan-out logic depends on
test.use({ ...devices['Pixel 7'] });

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

test('mobile theme kit: tap fans out palettes, second tap picks', async ({ page }) => {
  await seedMobile(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const palettes = page.locator('.controls .palettes');
  // collapsed at rest: only the selected swatch visible
  await expect(page.locator('.controls .pal[data-pal="indigo"]')).toBeVisible();
  await expect(page.locator('.controls .pal[data-pal="pine"]')).not.toBeVisible();
  // first tap opens the fan without switching
  await page.locator('.controls .pal[data-pal="indigo"]').tap();
  await expect(palettes).toHaveClass(/is-open/);
  await expect(page.locator('.controls .pal[data-pal="pine"]')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'indigo');
  // second tap picks and collapses
  await page.locator('.controls .pal[data-pal="pine"]').tap();
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'pine');
  await expect(palettes).not.toHaveClass(/is-open/);
  // theme toggle is always one tap away
  await page.locator('.controls .theme-toggle').tap();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});
