import './globals.css';
import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { ThemeProvider } from '../theme/ThemeProvider';
import { NO_FLASH_SCRIPT } from '../theme/no-flash';

export const metadata: Metadata = {
  title: 'Pranjal Bhatnagar',
  description: 'software developer',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const nonce = (await headers()).get('x-nonce') ?? undefined;
  return (
    <html lang="en" data-palette="indigo" data-theme="light">
      <head>
        <script nonce={nonce} dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        <link rel="preload" href="/fonts/ClashDisplay-Semibold.woff2" as="font" type="font/woff2" crossOrigin="" />
        <link rel="preload" href="/fonts/GeneralSans-Medium.woff2" as="font" type="font/woff2" crossOrigin="" />
      </head>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
