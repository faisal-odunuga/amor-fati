// 'use client';

import React from 'react';
import CoachProfile from '@/components/sections/about/CoachProfile';
import MissionStatement from '@/components/sections/about/MissionStatement';
import ContactForm from '@/components/sections/contact/ContactForm';
import FeaturedIn from '@/components/sections/about/FeaturedIn';

export default function AboutPage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <CoachProfile />
      <MissionStatement />
      <ContactForm />
      <FeaturedIn />
    </main>
  );
}
