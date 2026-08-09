import { describe, it, expect } from 'vitest';
import { stepFromSwipe } from '../../src/components/nav/useShelfNav';

describe('stepFromSwipe', () => {
  it('swipe up (negative dy) past threshold → +1 (next)', () => {
    expect(stepFromSwipe({ dx: 5, dy: -60 }, 40)).toBe(1);
  });
  it('swipe down (positive dy) past threshold → -1 (prev)', () => {
    expect(stepFromSwipe({ dx: -3, dy: 60 }, 40)).toBe(-1);
  });
  it('sub-threshold vertical → 0', () => {
    expect(stepFromSwipe({ dx: 0, dy: -20 }, 40)).toBe(0);
  });
  it('horizontal-dominant drag → 0 (left to the browser back/forward swipe)', () => {
    expect(stepFromSwipe({ dx: -120, dy: -10 }, 40)).toBe(0);
  });
  it('exactly at threshold commits', () => {
    expect(stepFromSwipe({ dx: 0, dy: -40 }, 40)).toBe(1);
    expect(stepFromSwipe({ dx: 0, dy: 40 }, 40)).toBe(-1);
  });
});
