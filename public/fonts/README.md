# Self-hosted fonts

Drop these woff2 files here (referenced by `src/styles/fonts.css`). No CDN — CSP is self-origin only.

**Clash Display** (Fontshare — https://www.fontshare.com/fonts/clash-display)
- ClashDisplay-Regular.woff2 (400)
- ClashDisplay-Medium.woff2 (500)
- ClashDisplay-Semibold.woff2 (600)
- ClashDisplay-Bold.woff2 (700)

**General Sans** (Fontshare — https://www.fontshare.com/fonts/general-sans)
- GeneralSans-Regular.woff2 (400)
- GeneralSans-Medium.woff2 (500)
- GeneralSans-Semibold.woff2 (600)

**Space Mono** (Google Fonts — https://fonts.google.com/specimen/Space+Mono)
- SpaceMono-Regular.woff2 (400)
- SpaceMono-Bold.woff2 (700)

Until present, the type stacks fall back to `system-ui`. After adding, add preload
links for the two critical weights (ClashDisplay-Semibold, GeneralSans-Medium) to
`index.html`.
