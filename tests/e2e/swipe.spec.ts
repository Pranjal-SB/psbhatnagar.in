import { test, expect, devices, type Page } from '@playwright/test';

// Vertical swipe owns section navigation on touch (docs/2026-08-09-mobile-ux-audit.md, D1).
test.use({ ...devices['Pixel 7'] });

async function open(page: Page) {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');
}

/** Synthesise a real touch drag on window, where useShelfNav listens. */
async function swipe(page: Page, dx: number, dy: number) {
  await page.evaluate(
    ([dx, dy]) => {
      const x = 180;
      const y = 340;
      const target = document.body;
      const at = (cx: number, cy: number) =>
        new Touch({ identifier: 1, target, clientX: cx, clientY: cy });
      const fire = (type: string, cx: number, cy: number) => {
        const t = at(cx, cy);
        window.dispatchEvent(
          new TouchEvent(type, {
            changedTouches: [t],
            touches: type === 'touchend' ? [] : [t],
            bubbles: true,
          }),
        );
      };
      fire('touchstart', x, y);
      fire('touchmove', x + dx * 0.5, y + dy * 0.5);
      fire('touchend', x + dx, y + dy);
    },
    [dx, dy],
  );
}

test('swipe up goes to the next section', async ({ page }) => {
  await open(page);
  await swipe(page, 0, -120);
  await expect(page.locator('.eyebrow')).toHaveText('02 - about', { timeout: 8000 });
});

test('swipe down goes back to the previous section', async ({ page }) => {
  await open(page);
  await swipe(page, 0, -120);
  await expect(page.locator('.eyebrow')).toHaveText('02 - about', { timeout: 8000 });
  await swipe(page, 0, 120);
  await expect(page.locator('.eyebrow')).toHaveText('01 - home', { timeout: 8000 });
});

test('horizontal swipe is left to the browser, not the shelf', async ({ page }) => {
  await open(page);
  await swipe(page, -160, 0);
  // give a wipe time to start if one were (wrongly) triggered
  await page.waitForTimeout(600);
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');
});

test('a vertical drag moves the panel with the finger before it commits', async ({ page }) => {
  await open(page);
  const readDrag = () =>
    page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--drag-y').trim(),
    );

  expect(await readDrag()).toBe('');

  // hold mid-drag (no touchend) and check the panel has tracked the finger
  await page.evaluate(() => {
    const target = document.body;
    const fire = (type: string, cy: number) => {
      const t = new Touch({ identifier: 1, target, clientX: 180, clientY: cy });
      window.dispatchEvent(new TouchEvent(type, { changedTouches: [t], touches: [t], bubbles: true }));
    };
    fire('touchstart', 340);
    fire('touchmove', 300);
  });

  const dragging = await readDrag();
  expect(dragging).not.toBe('');
  expect(parseFloat(dragging)).toBeLessThan(0); // dragged up → panel follows up
  // damped and capped, never the raw delta
  expect(Math.abs(parseFloat(dragging))).toBeLessThan(40);

  // releasing under threshold clears the nudge and changes nothing
  await page.evaluate(() => {
    const t = new Touch({ identifier: 1, target: document.body, clientX: 180, clientY: 300 });
    window.dispatchEvent(new TouchEvent('touchend', { changedTouches: [t], touches: [], bubbles: true }));
  });
  expect(await readDrag()).toBe('');
  await expect(page.locator('.eyebrow')).toHaveText('01 - home');
});

test('swipe sweeps the curtain vertically; the dock sweeps it sideways', async ({ page }) => {
  await open(page);

  // matrix(a, b, c, d, tx, ty) — which of tx/ty is moving tells us the axis
  const curtainOffset = async () =>
    page.evaluate(() => {
      const el = document.querySelector('.wipe');
      if (!el) throw new Error('.wipe missing');
      const m = new DOMMatrixReadOnly(getComputedStyle(el).transform);
      return { tx: Math.abs(m.m41), ty: Math.abs(m.m42) };
    });

  await swipe(page, 0, -120);
  await page.waitForTimeout(100); // mid cover sweep
  const bySwipe = await curtainOffset();
  expect(bySwipe.ty).toBeGreaterThan(0);
  expect(bySwipe.tx).toBeLessThan(1);
  await expect(page.locator('.eyebrow')).toHaveText('02 - about', { timeout: 8000 });
  // the eyebrow flips at the end of the COVER half, so the reveal half is still
  // running here — clicking now would queue behind it instead of starting a wipe
  await page.waitForTimeout(500);

  await page.locator('.dock-tab').nth(4).click();
  await page.waitForTimeout(100);
  const byDock = await curtainOffset();
  expect(byDock.tx).toBeGreaterThan(0);
  expect(byDock.ty).toBeLessThan(1);
  await expect(page.locator('.eyebrow')).toHaveText('05 - gallery', { timeout: 8000 });
});
