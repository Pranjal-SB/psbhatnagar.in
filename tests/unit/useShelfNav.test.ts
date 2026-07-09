import { describe, it, expect } from 'vitest';
import { stepFromWheel, stepFromSwipe } from '../../components/nav/useShelfNav';

describe('stepFromWheel', () => {
  it('returns +1 when dominant axis exceeds threshold', () => {
    expect(stepFromWheel({ deltaX: 60, deltaY: 5 }, 40)).toBe(1);
    expect(stepFromWheel({ deltaX: 0, deltaY: 60 }, 40)).toBe(1);
  });
  it('returns -1 for negative dominant delta', () => {
    expect(stepFromWheel({ deltaX: -60, deltaY: 0 }, 40)).toBe(-1);
  });
  it('returns 0 below threshold', () => {
    expect(stepFromWheel({ deltaX: 10, deltaY: 8 }, 40)).toBe(0);
  });
});

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
  it('horizontal-dominant drag → 0 (leave system back-swipe alone)', () => {
    expect(stepFromSwipe({ dx: -120, dy: -10 }, 40)).toBe(0);
  });
});
