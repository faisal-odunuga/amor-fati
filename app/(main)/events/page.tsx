import type { Metadata } from 'next';
import EventsHero from '@/components/sections/events/EventsHero';
import UpcomingEvents from '@/components/sections/events/UpcomingEvents';
import Gallery from '@/components/sections/events/Gallery';
import EventsSocialProof from '@/components/sections/events/EventsSocialProof';
import EventsCTA from '@/components/sections/events/EventsCTA';

export const metadata: Metadata = {
  title: 'Events & Retreats',
  description:
    'Join Amor Fati live events, retreats, and workshops hosted by Moh Sheriff in Lagos and beyond. Transform your mindset in an immersive, in-person experience.',
  alternates: { canonical: '/events' },
  openGraph: {
    title: 'Events & Retreats | Amor Fati',
    description:
      'Live retreats, workshops, and transformational events by Moh Sheriff. Currently Lagos-based with global expansion planned.',
    url: 'https://www.amorfatihq.com/events',
  },
};

export default function EventsPage() {
  return (
    <main className='min-h-screen overflow-x-hidden bg-background text-foreground'>
      <EventsHero />
      <UpcomingEvents />
      <Gallery />
      <EventsSocialProof />
      <EventsCTA />
    </main>
  );
}
