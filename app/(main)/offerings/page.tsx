import type { Metadata } from 'next';
import ProgramHero, { Stats } from '@/components/sections/offerings/ProgramHero';
import SignatureExperience from '@/components/sections/offerings/SignatureExperience';
import DigitalPrograms from '@/components/sections/offerings/DigitalPrograms';
import Testimonials from '@/components/sections/offerings/Testimonials';
import Newsletter from '@/components/sections/home/Newsletter';

export const metadata: Metadata = {
  title: 'Offerings & Programmes',
  description:
    'Explore Amor Fati’s coaching programmes, courses, and books — including Overconfidence 101, Mental Mastery Blueprint, and the 11 Letters book by Moh Sheriff.',
  alternates: { canonical: '/offerings' },
  openGraph: {
    title: 'Offerings & Programmes | Amor Fati',
    description:
      'Courses, coaching, and books by Moh Sheriff to help you master your mind and create a life worth reliving.',
    url: 'https://www.amorfatihq.com/offerings',
  },
};

export default function OfferingsPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <ProgramHero />
      <Stats />
      <SignatureExperience />
      <DigitalPrograms />
      <Testimonials />
      <Newsletter />
    </main>
  );
}
