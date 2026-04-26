import type { Metadata } from 'next';
import type React from 'react';
import localFont from 'next/font/local';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import { Toaster } from 'sonner';
import QueryProvider from '@/components/providers/query-provider';
import './globals.css';

const display = localFont({
  src: [
    {
      path: './fonts/NewYork.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/NewYorkItalic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-display',
  display: 'swap',
});

const sans = localFont({
  src: [
    {
      path: './fonts/SFNS.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/SFNSItalic.ttf',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-sans-fallback',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://amorfatihq.com'),
  title: {
    default: 'Amor Fati HQ',
    template: '%s | Amor Fati HQ',
  },
  description:
    'Luxury mindset systems, transformation programs, and the Amor Fati book club platform.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${sans.variable} ${display.variable} ${GeistMono.variable} min-h-screen bg-background text-foreground antialiased`}
      >
        <QueryProvider>
          {children}
        </QueryProvider>
        <Analytics debug={false} />
        <Toaster />
      </body>
    </html>
  );
}
