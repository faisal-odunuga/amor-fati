import type { Metadata } from 'next';
import BookClubHero from '@/components/sections/book-club/BookClubHero';
import BookClubStats from '@/components/sections/book-club/BookClubStats';
import BookClubFomo from '@/components/sections/book-club/BookClubFomo';
import BookClubBenefits from '@/components/sections/book-club/BookClubBenefits';
import BookClubPioneers from '@/components/sections/book-club/BookClubPioneers';
import BookClubCTA from '@/components/sections/book-club/BookClubCTA';
import BookClubPillars from '@/components/sections/book-club/BookClubPillars';
import BookClubBonuses from '@/components/sections/book-club/BookClubBonuses';
import BookClubAnnouncementBar from '@/components/sections/book-club/BookClubAnnouncementBar';

export const metadata: Metadata = {
  title: 'Amor Fati Book Club',
  description:
    'Amor Fati Book Club is a community for people who want to read, implement, and reflect until their mindset, presence, and results change.',
  alternates: { canonical: '/book-club' },
  openGraph: {
    title: 'Amor Fati Book Club | Read. Implement. Reflect.',
    description:
      'A community built around exceptional living, mindset shifts, and practical transformation through books.',
    url: 'https://www.amorfatihq.com/book-club',
  },
};

export default function BookClubPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <BookClubAnnouncementBar />
      <BookClubHero />
      <BookClubStats />
      <BookClubBenefits />
      <BookClubPillars />
      <BookClubBonuses />
      <BookClubPioneers />
      <BookClubFomo />
      <BookClubCTA />
    </main>
  );
}
