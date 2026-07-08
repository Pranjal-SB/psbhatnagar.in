import type { PaletteName } from '../store/useAppStore';

// swatch = the light-theme accent for each palette (matches tokens.css)
export const PALETTES: { name: PaletteName; label: string; swatch: string }[] = [
  { name: 'indigo', label: 'indigo', swatch: '#4a39ff' },
  { name: 'oxblood', label: 'oxblood', swatch: '#7d2027' },
  { name: 'pine', label: 'pine', swatch: '#1f6d4e' },
  { name: 'ochre', label: 'ochre', swatch: '#b5730d' },
];
