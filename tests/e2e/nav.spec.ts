import { test, expect, type Page } from '@playwright/test';

async function seed(page: Page) {
  await page.addInitScript(() => {
    localStorage.setItem(
      'psb.state',
      JSON.stringify({ state: { active: 0, palette: 'indigo', theme: 'light' }, version: 0 }),
    );
  });
}

test('the curtain names the section being entered, not the one being left', async ({ page }) => {
  await seed(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');

  await page.keyboard.press('4');
  await page.waitForTimeout(100); // mid cover sweep (WIPE_HALF is 280ms)
  // single synchronous sample — no retry, or the settled state would mask it
  const midFlight = await page.evaluate(() => ({
    name: document.querySelector('.wipe-name')?.textContent,
    num: document.querySelector('.wipe-num')?.textContent,
  }));
  expect(midFlight).toEqual({ name: 'projects', num: '04' });

  await expect(page.locator('.eyebrow')).toHaveText('04 - projects', { timeout: 8000 });
});

test('rapid section changes mid-wipe settle on the last target', async ({ page }) => {
  await seed(page);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');

  // fire the second and third press while the first wipe is still running
  await page.keyboard.press('3');
  await page.waitForTimeout(150);
  await page.keyboard.press('5');
  await page.waitForTimeout(150);
  await page.keyboard.press('2');

  await expect(page.locator('.eyebrow')).toHaveText('02 - about', { timeout: 8000 });

  // nav must still be alive afterwards (regression: wipe used to deadlock)
  await page.keyboard.press('6');
  await expect(page.locator('.eyebrow')).toHaveText('06 - connect', { timeout: 8000 });
});
