import { describe, it, expect } from 'vitest';
import { stepFromWheel } from '../../components/nav/useShelfNav';

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
