import { describe, it, expect } from 'vitest';
import { DURATION, EASE, panelVariants } from '../../lib/motion';

describe('motion tokens', () => {
  it('durations ordered fast<normal<slow', () => {
    expect(DURATION.fast).toBeLessThan(DURATION.normal);
    expect(DURATION.normal).toBeLessThan(DURATION.slow);
  });
  it('ease.out is a 4-point cubic bezier', () => {
    expect(EASE.out).toHaveLength(4);
  });
  it('panelVariants has enter and exit', () => {
    expect(panelVariants).toHaveProperty('enter');
    expect(panelVariants).toHaveProperty('exit');
  });
});
