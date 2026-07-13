import { describe, it, expect } from 'vitest';
import { EASE, SPRING } from '../../src/lib/motion';

describe('motion tokens', () => {
  it('eases are 4-point cubic beziers', () => {
    expect(EASE.out).toHaveLength(4);
    expect(EASE.inOut).toHaveLength(4);
  });
  it('springs define stiffness and damping', () => {
    expect(SPRING.soft.stiffness).toBeGreaterThan(0);
    expect(SPRING.snappy.damping).toBeGreaterThan(0);
  });
});
