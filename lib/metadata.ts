import { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: {
    default: 'Amor Fati',
    template: '%s | Amor Fati',
  },
  description:
    'Amor Fati — a human potential and peak performance company helping people create lives worth reliving.',
  openGraph: {
    siteName: 'Amor Fati',
    images: [
      {
        url: '/logo.png', // 👈 your WhatsApp / Twitter / LinkedIn share image
        width: 1200,
        height: 630,
        alt: 'Amor Fati — Create a life worth reliving.',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@amorfati.hq',
  },
};
