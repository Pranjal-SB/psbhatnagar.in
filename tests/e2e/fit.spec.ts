import { test, expect, devices, type Page } from '@playwright/test';

// The panel-never-scrolls invariant (docs/2026-08-09-mobile-ux-audit.md, D2).
// Vertical swipe owns the vertical gesture on mobile, so no section may ever
// hand it to an in-panel scroll — in either orientation.
test.use({ ...devices['Pixel 7'] });

const SECTIONS = ['home', 'about', 'skills', 'projects', 'gallery', 'connect'];

// Smallest viewport we support, and the same device rotated.
const PORTRAIT = { width: 375, height: 667 };
const LANDSCAPE = { width: 667, height: 375 };

async function open(page: Page, size: { width: number; height: number }) {
  // reduced motion makes the wipe resolve synchronously, so a dock tap lands
  // the new section without a timing race
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.setViewportSize(size);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
}

async function panelOverflow(page: Page): Promise<number> {
  return page.evaluate(() => {
    const panel = document.querySelector('.panel');
    if (!panel) throw new Error('.panel missing');
    return panel.scrollHeight - panel.clientHeight;
  });
}

// A Pixel 7 on its side: wider than the 768px mobile breakpoint but only 412px
// tall, so it used to land on the desktop shelf with no room for it.
const LANDSCAPE_LARGE = { width: 915, height: 412 };

for (const [orientation, size] of [
  ['portrait', PORTRAIT],
  ['landscape', LANDSCAPE],
  ['landscape-large', LANDSCAPE_LARGE],
] as const) {
  test(`${orientation} ${size.width}x${size.height}: no section scrolls the panel`, async ({
    page,
  }) => {
    await open(page, size);

    const overflows: Record<string, number> = {};
    for (const [i, name] of SECTIONS.entries()) {
      await page.locator('.dock-tab').nth(i).click();
      await expect(page.locator('.dock-tab.is-active .dock-num')).toHaveText(String(i + 1));
      overflows[name] = await panelOverflow(page);
    }

    // assert all at once so a failure names every offending section, not just the first
    expect(overflows).toEqual(Object.fromEntries(SECTIONS.map((s) => [s, 0])));
  });
}

for (const [orientation, size] of [
  ['portrait', PORTRAIT],
  ['landscape', LANDSCAPE],
] as const) {
  test(`${orientation}: every dock tab is named at rest, untruncated and tappable`, async ({
    page,
  }) => {
    await open(page, size);

    const tabs = await page.evaluate(() =>
      [...document.querySelectorAll('.dock-tab')].map((tab) => {
        const label = tab.querySelector('.dock-name') as HTMLElement | null;
        const box = tab.getBoundingClientRect();
        return {
          name: label?.textContent ?? null,
          // scrollWidth beating clientWidth is the tell for an ellipsis/clip
          clipped: label ? label.scrollWidth > label.clientWidth + 0.5 : true,
          height: Math.round(box.height),
        };
      }),
    );

    expect(tabs.map((t) => t.name)).toEqual(SECTIONS);
    expect(tabs.filter((t) => t.clipped)).toEqual([]);
    // 44px is the touch floor; the labels must not have squeezed the tabs under it
    expect(Math.min(...tabs.map((t) => t.height))).toBeGreaterThanOrEqual(44);
  });
}

test('gallery frames stay legible on a phone (2 columns, not 3)', async ({ page }) => {
  await open(page, PORTRAIT);
  await page.locator('.dock-tab').nth(4).click();
  await expect(page.locator('.frames')).toBeVisible();

  const { columns, captionPx } = await page.evaluate(() => {
    const frames = document.querySelector('.frames');
    if (!frames) throw new Error('.frames missing');
    const caption = document.querySelector('.frame figcaption');
    return {
      columns: getComputedStyle(frames).gridTemplateColumns.split(' ').length,
      captionPx: caption ? parseFloat(getComputedStyle(caption).fontSize) : 0,
    };
  });

  expect(columns).toBe(2);
  expect(captionPx).toBeGreaterThanOrEqual(11);
});
