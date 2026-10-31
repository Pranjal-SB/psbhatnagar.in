import { test, expect } from '@playwright/test';

// Desktop panel must never clip: short viewports scroll the panel from its top
// instead of cutting the first/last lines off (safe centring).
const SECTIONS = ['home', 'about', 'skills', 'projects', 'gallery', 'connect'];
const SIZES = [
  { width: 1280, height: 720 },
  { width: 1366, height: 768 },
  { width: 1024, height: 768 },
];

for (const size of SIZES) {
  test(`desktop ${size.width}x${size.height}: nothing clipped, every link reachable`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.setViewportSize(size);
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    for (const [i, name] of SECTIONS.entries()) {
      await page.keyboard.press(String(i + 1));
      await expect(page.locator('.eyebrow')).toHaveText(new RegExp(`^0${i + 1} - ${name}`));

      const topOk = await page.evaluate(() => {
        const panel = document.querySelector('.panel') as HTMLElement;
        panel.scrollTop = 0;
        const first = panel.firstElementChild as HTMLElement;
        return first.getBoundingClientRect().top >= panel.getBoundingClientRect().top - 0.5;
      });
      expect(topOk, `${name}: first child top inside panel`).toBe(true);

      const links = page.locator('.panel a');
      for (let n = 0; n < (await links.count()); n++) {
        const link = links.nth(n);
        await link.scrollIntoViewIfNeeded();
        const hit = await link.evaluate((el) => {
          const r = el.getBoundingClientRect();
          const hitEl = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
          return !!hitEl && (el === hitEl || el.contains(hitEl));
        });
        expect(hit, `${name} link ${n} clickable`).toBe(true);
      }
    }
  });
}
