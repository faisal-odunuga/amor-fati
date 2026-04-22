import type { Metadata } from 'next';
import PhilosophyHero from '@/components/sections/philosophy/PhilosophyHero';
import PillarsOfFate from '@/components/sections/philosophy/PillarsOfFate';
import MindsetVsAction from '@/components/sections/philosophy/MindsetVsAction';
import TenetsGrid from '@/components/sections/philosophy/TenetsGrid';
import Newsletter from '@/components/sections/home/Newsletter';

export const metadata: Metadata = {
  title: 'Our Philosophy',
  description:
    'Explore the Amor Fati philosophy — Stoic principles of radical acceptance, mental mastery, and loving your fate as a path to peak performance and personal evolution.',
  alternates: { canonical: '/philosophy' },
  openGraph: {
    title: 'Our Philosophy | Amor Fati',
    description:
      'Stoic principles and the tenets driving every Amor Fati programme. Love your fate. Master your mind.',
    url: 'https://www.amorfatihq.com/philosophy',
  },
};

export default function PhilosophyPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <PhilosophyHero />
      <PillarsOfFate />
      <MindsetVsAction />
      <TenetsGrid />
      <Newsletter />
    </main>
  );
}
