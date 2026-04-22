import type { Metadata } from 'next';
import JournalHero from '@/components/sections/journal/JournalHero';
import ArticleGrid from '@/components/sections/journal/ArticleGrid';
import Newsletter from '@/components/sections/home/Newsletter';

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

export default function JournalPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <JournalHero />
      <ArticleGrid />
      <Newsletter />
    </main>
  );
}
