import { test, expect, type Page } from '@playwright/test';

/** Seeds a pre-fix payload: preferences plus a stale `active` the URL must beat. */
async function seedStale(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem(
      'psb.state',
      JSON.stringify({ state: { active: 4, palette: 'ochre', theme: 'dark' }, version: 0 }),
    );
  });
}

test('deep link opens on its section, beating a stale persisted active', async ({ page }) => {
  await seedStale(page);
  await page.goto('/#about');
  await expect(page.locator('.eyebrow')).toHaveText('02 - about');

  // The saved preferences must survive the mount-time section write.
  await expect(page.locator('html')).toHaveAttribute('data-palette', 'ochre');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
});

test('deep link lands directly instead of wiping in from home', async ({ page }) => {
  await page.goto('/#gallery');
  await expect(page.locator('.eyebrow')).toHaveText('05 - gallery');

  // The curtain must still be parked off-screen to the right (its initial
  // translateX(106%)). A completed wipe would have exited to the left.
  const x = await page
    .locator('.wipe')
    .evaluate((el) => new DOMMatrix(getComputedStyle(el).transform).m41);
  expect(x).toBeGreaterThan(0);
});

test('unknown, empty, and malformed hashes fall back to home', async ({ page }) => {
  for (const hash of ['#nope', '#', '#%', '#../../etc']) {
    await page.goto(`/${hash}`);
    await expect(page.locator('.eyebrow')).toHaveText('01 - home');
  }
});

test('a bare URL stays clean — no #home appended', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');
  expect(new URL(page.url()).hash).toBe('');
});

test('navigating updates the hash, and back/forward step through sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');

  await page.keyboard.press('3');
  await expect(page.locator('.eyebrow')).toHaveText('03 - skills', { timeout: 8000 });
  expect(new URL(page.url()).hash).toBe('#skills');

  await page.keyboard.press('5');
  await expect(page.locator('.eyebrow')).toHaveText('05 - gallery', { timeout: 8000 });
  expect(new URL(page.url()).hash).toBe('#gallery');

  await page.goBack();
  await expect(page.locator('.eyebrow')).toHaveText('03 - skills', { timeout: 8000 });

  await page.goBack();
  await expect(page.locator('.eyebrow')).toHaveText('01 - home', { timeout: 8000 });

  await page.goForward();
  await expect(page.locator('.eyebrow')).toHaveText('03 - skills', { timeout: 8000 });
});
