// 'use client';

import React from 'react';
import ProgramHero, { Stats } from '@/components/sections/offerings/ProgramHero';
import SignatureExperience from '@/components/sections/offerings/SignatureExperience';
import DigitalPrograms from '@/components/sections/offerings/DigitalPrograms';
import Testimonials from '@/components/sections/offerings/Testimonials';
import Newsletter from '@/components/sections/home/Newsletter';

export default function OfferingsPage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <ProgramHero />
      <Stats />
      <SignatureExperience />
      <DigitalPrograms />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
