import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { siteData } from '../data/site';
import { ThemeProvider } from '../theme/ThemeProvider';
import { NO_FLASH_SCRIPT } from '../theme/no-flash';

const { name: title, blurb: description } = siteData.profile;

export const metadata: Metadata = {
  metadataBase: new URL('https://psbhatnagar.in'),
  title,
  description,
  openGraph: { title, description, url: '/', siteName: title, type: 'website' },
  twitter: { card: 'summary_large_image', title, description },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return (
    <html lang="en" data-palette="indigo" data-theme="light" suppressHydrationWarning>
      <head>
        <script
          nonce={nonce}
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }}
        />
        <link rel="preload" href="/fonts/ClashDisplay-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/GeneralSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
