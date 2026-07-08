import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pranjal Bhatnagar',
  description: 'software developer',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
