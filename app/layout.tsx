import type React from 'react';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { GeistMono } from 'geist/font/mono';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';
import { Navigation } from '@/components/navigation';
import { Footer } from '@/components/footer';
import { Suspense } from 'react';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const BASE_URL = 'https://www.amorfatihq.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Amor Fati | Create a Life Worth Reliving',
    template: '%s | Amor Fati',
  },
  description:
    'Amor Fati is a mindset and personal development brand by Moh Sheriff. We help you realign your mind for peak performance, radical self-confidence, and a life worth reliving.',
  keywords: [
    'Amor Fati',
    'Moh Sheriff',
    'mindset coaching',
    'personal development',
    'overconfidence',
    'Stoic philosophy',
    'mental mastery',
    'life coaching Lagos',
    'self improvement Nigeria',
    '11 Letters book',
  ],
  authors: [{ name: 'Muhammad Sheriff', url: `${BASE_URL}/about` }],
  creator: 'Muhammad Sheriff',
  publisher: 'Amor Fati',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: BASE_URL,
    siteName: 'Amor Fati',
    title: 'Amor Fati | Create a Life Worth Reliving',
    description:
      'Mindset coaching and personal evolution by Moh Sheriff. Rooted in Stoic philosophy — love your fate, master your mind.',
    images: [
      {
        url: '/images/moh-sheriff.jpeg',
        width: 1200,
        height: 630,
        alt: 'Amor Fati — Create a Life Worth Reliving',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Amor Fati | Create a Life Worth Reliving',
    description:
      'Mindset coaching and personal evolution by Moh Sheriff. Rooted in Stoic philosophy — love your fate, master your mind.',
    images: ['/images/moh-sheriff.jpeg'],
    creator: '@amorfati.hq',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
  },
};

// JSON-LD structured data for Google rich results
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE_URL}/#organization`,
      name: 'Amor Fati',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/logo.png`,
      },
      sameAs: [
        'https://www.instagram.com/amorfati.hq/',
        'https://www.linkedin.com/in/muhammad-sheriff-2b9957193/',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+234-906-1447-022',
        email: 'amorfatihq@gmail.com',
        contactType: 'customer service',
        availableLanguage: 'English',
      },
    },
    {
      '@type': 'Person',
      '@id': `${BASE_URL}/#person`,
      name: 'Muhammad Sheriff',
      alternateName: 'Moh Sheriff',
      url: `${BASE_URL}/about`,
      jobTitle: 'Mindset Coach & Author',
      worksFor: {
        '@id': `${BASE_URL}/#organization`,
      },
      sameAs: [
        'https://www.instagram.com/amorfati.hq/',
        'https://www.linkedin.com/in/muhammad-sheriff-2b9957193/',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE_URL}/#website`,
      url: BASE_URL,
      name: 'Amor Fati',
      description: 'Mindset coaching and personal development by Moh Sheriff.',
      publisher: {
        '@id': `${BASE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`font-sans ${inter.variable} ${playfair.variable} ${GeistMono.variable} antialiased`}
      >
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={<div>Loading...</div>}>
          <Navigation />
          {children}
          <Footer />
        </Suspense>
        <Analytics />
      </body>
    </html>
  );
}
