// 'use client';

import React from 'react';
import Hero from '@/components/sections/home/Hero';
import Philosophy from '@/components/sections/home/Philosophy';
import Summits from '@/components/sections/home/Summits';
import Legacy from '@/components/sections/home/Legacy';
import Toolkit from '@/components/sections/home/Toolkit';
import Newsletter from '@/components/sections/home/Newsletter';

export default function HomePage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <Hero />
      <Philosophy />
      {/* <Summits /> */}
      <Legacy />
      <Toolkit />
      <Newsletter />
    </main>
  );
}
