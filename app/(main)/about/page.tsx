import type { Metadata } from 'next';
import CoachProfile from '@/components/sections/about/CoachProfile';
import MissionStatement from '@/components/sections/about/MissionStatement';
import ContactForm from '@/components/sections/contact/ContactForm';
import FeaturedIn from '@/components/sections/about/FeaturedIn';

export const metadata: Metadata = {
  title: 'About Amor Fati',
  description:
    'Amor Fati is a Lagos-based mindset and personal development company. We help individuals, teams, and organisations realign their thinking for peak performance, radical confidence, and a life worth reliving — rooted in Stoic philosophy.',
  alternates: { canonical: '/about' },
  openGraph: {
    title: 'About Amor Fati | Create a Life Worth Reliving',
    description:
      'A mindset and personal development company rooted in Stoic philosophy. Coaching, courses, books, and live events — based in Lagos, available worldwide.',
    url: 'https://www.amorfatihq.com/about',
  },
};

export default function AboutPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <CoachProfile />
      <MissionStatement />
      <ContactForm />
      <FeaturedIn />
    </main>
  );
}
