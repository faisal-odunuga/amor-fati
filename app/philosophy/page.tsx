// 'use client';

import React from 'react';
import PhilosophyHero from '@/components/sections/philosophy/PhilosophyHero';
import PillarsOfFate from '@/components/sections/philosophy/PillarsOfFate';
import MindsetVsAction from '@/components/sections/philosophy/MindsetVsAction';
import TenetsGrid from '@/components/sections/philosophy/TenetsGrid';
import Newsletter from '@/components/sections/home/Newsletter';

export default function PhilosophyPage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <PhilosophyHero />
      <PillarsOfFate />
      <MindsetVsAction />
      <TenetsGrid />
      <Newsletter />
    </main>
  );
}
