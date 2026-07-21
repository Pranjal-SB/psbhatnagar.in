import createMDX from '@next/mdx';

// CSP is set per-request (nonce) in middleware.ts. These static headers carry
// the rest of the security posture.
const securityHeaders = [
  { key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Pin the tracing root; a stray lockfile above this dir confuses Next's inference.
  outputFileTracingRoot: import.meta.dirname,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  async headers() {
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
