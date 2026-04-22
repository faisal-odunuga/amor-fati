import React from 'react';
import Hero from '@/components/sections/home/Hero';
import Philosophy from '@/components/sections/home/Philosophy';
import Legacy from '@/components/sections/home/Legacy';
import Toolkit from '@/components/sections/home/Toolkit';
import Newsletter from '@/components/sections/home/Newsletter';

export default function HomePage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <Hero />
      <Philosophy />
      <Legacy />
      <Toolkit />
      <Newsletter />
    </main>
  );
}
