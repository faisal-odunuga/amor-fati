import type { Metadata } from 'next';
import BookClubHero from '@/components/sections/book-club/BookClubHero';
import BookClubStats from '@/components/sections/book-club/BookClubStats';
import BookClubFomo from '@/components/sections/book-club/BookClubFomo';
import BookClubBenefits from '@/components/sections/book-club/BookClubBenefits';
import BookClubHowItWorks from '@/components/sections/book-club/BookClubHowItWorks';
import BookClubStories from '@/components/sections/book-club/BookClubStories';
import BookClubAbout from '@/components/sections/book-club/BookClubAbout';
import BookClubCTA from '@/components/sections/book-club/BookClubCTA';

export const metadata: Metadata = {
  title: 'Amor Fati Book Club',
  description:
    'Join the Amor Fati Book Club — a community of high-performers united by great books, deep conversations, and real growth. Read together. Rise together.',
  alternates: { canonical: '/book-club' },
  openGraph: {
    title: 'Amor Fati Book Club | Read Together. Rise Together.',
    description:
      'A community built around growth, deep conversations, and actionable wisdom. Join members already transforming their lives through books.',
    url: 'https://www.amorfatihq.com/book-club',
  },
};

export default function BookClubPage() {
  return (
    <main className='min-h-screen bg-background text-foreground overflow-x-hidden'>
      <BookClubHero />
      <BookClubStats />
      <BookClubFomo />
      <BookClubBenefits />
      <BookClubHowItWorks />
      <BookClubStories />
      <BookClubAbout />
      <BookClubCTA />
    </main>
  );
}
