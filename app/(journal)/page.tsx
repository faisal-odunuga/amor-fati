// 'use client';

import type { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'The Journal',
  description:
    'Read essays, reflections, and insights from Moh Sheriff on mindset, Stoic philosophy, overconfidence, and living a life worth reliving. Subscribe for weekly wisdom.',
  alternates: { canonical: '/journal' },
  openGraph: {
    title: 'The Journal | Amor Fati',
    description:
      'Essays and reflections by Moh Sheriff on fate, mindset, and the art of living fully. Subscribe to the newsletter for weekly updates.',
    url: 'https://www.amorfatihq.com/journal',
  },
};
import JournalHero from '@/components/sections/journal/JournalHero';
import ArticleGrid from '@/components/sections/journal/ArticleGrid';
import Newsletter from '@/components/sections/home/Newsletter';

export default function JournalPage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <JournalHero />
      <ArticleGrid />
      <Newsletter />
    </main>
  );
}
