import { test, expect, type Page } from '@playwright/test';

const PALETTES = ['indigo', 'oxblood', 'pine', 'ochre'] as const;
const THEMES = ['light', 'dark'] as const;
const WIDTHS = [1440, 768, 375];

async function seed(page: Page, palette: string, theme: string) {
  await page.addInitScript(
    ([p, t]) => {
      localStorage.setItem(
        'psb.state',
        JSON.stringify({ state: { active: 0, palette: p, theme: t }, version: 0 }),
      );
    },
    [palette, theme],
  );
  await page.emulateMedia({ reducedMotion: 'reduce' });
}

// Layout / responsive / theme coverage: home shelf at each width in both themes.
for (const width of WIDTHS) {
  for (const theme of THEMES) {
    test(`shelf visual — ${width}px ${theme}`, async ({ page }) => {
      await seed(page, 'indigo', theme);
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      await expect(page).toHaveScreenshot(`shelf-${width}-${theme}.png`, {
        maxDiffPixelRatio: 0.02,
      });
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(overflow).toBe(false);
    });
  }
}

// Palette color-token coverage: home at 1440 light for each palette.
for (const palette of PALETTES) {
  test(`palette visual — ${palette}`, async ({ page }) => {
    await seed(page, palette, 'light');
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveScreenshot(`palette-${palette}.png`, {
      maxDiffPixelRatio: 0.02,
    });
  });
}

test('all four palette swatches render on hover', async ({ page }) => {
  await page.goto('/');
  // palette kit rests collapsed to the selected swatch; hover fans it out
  await page.locator('.controls .palettes').hover();
  for (const pal of PALETTES) {
    await expect(page.locator(`.pal[data-pal="${pal}"]`)).toBeVisible();
  }
});
