// 'use client';

import React from 'react';
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
