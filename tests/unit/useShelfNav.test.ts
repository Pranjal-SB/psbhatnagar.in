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
  it('swipe left (negative dx) past threshold → +1 (next, matches wipe direction)', () => {
    expect(stepFromSwipe({ dx: -60, dy: 5 }, 40)).toBe(1);
  });
  it('swipe right (positive dx) past threshold → -1 (prev)', () => {
    expect(stepFromSwipe({ dx: 60, dy: -3 }, 40)).toBe(-1);
  });
  it('sub-threshold horizontal → 0', () => {
    expect(stepFromSwipe({ dx: -20, dy: 0 }, 40)).toBe(0);
  });
  it('vertical-dominant drag → 0 (leave content scrolling alone)', () => {
    expect(stepFromSwipe({ dx: -10, dy: -120 }, 40)).toBe(0);
  });
});
