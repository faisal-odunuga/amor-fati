import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'The Philosophy',
  description:
    'Discover the principles behind Amor Fati — Believe, Begin, Breakthrough, Become — and the mental-alignment mindset: “Everything you want physically, you must first have mentally.”',
};

export default function PhilosophyPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            The Philosophy
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            The principles that guide our work and your transformation.
          </p>
        </div>
      </section>

      {/* Core Framework */}
      <section className='py-16 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-16'>
          <div className='text-center space-y-4'>
            <h2 className='font-serif text-4xl md:text-5xl font-bold'>
              Believe. Begin. Breakthrough. Become.
            </h2>
            <p className='text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
              Our four-stage framework for personal transformation and peak performance.
            </p>
          </div>

          <div className='grid md:grid-cols-2 gap-8'>
            {[
              {
                stage: 'Believe',
                description:
                  'Everything starts with belief. Not hope. Not wishful thinking. But deep, unshakeable conviction that what you desire is already yours mentally.',
              },
              {
                stage: 'Begin',
                description:
                  'Action without alignment is chaos. Begin from a place of clarity, moving with intention rather than desperation. The right action at the right time creates momentum.',
              },
              {
                stage: 'Breakthrough',
                description:
                  "Breakthroughs don't happen by accident. They're the result of consistent pressure applied to the right points. We help you identify and leverage those points.",
              },
              {
                stage: 'Become',
                description:
                  "Transformation isn't about becoming someone new. It's about becoming who you've always been beneath the conditioning, fear, and doubt.",
              },
            ].map((item, index) => (
              <Card key={item.stage} className='border-none shadow-none bg-background'>
                <CardContent className='p-8 space-y-4'>
                  <div className='flex items-center gap-4'>
                    <span className='font-serif text-5xl font-bold text-accent'>{index + 1}</span>
                    <h3 className='font-serif text-3xl font-bold'>{item.stage}</h3>
                  </div>
                  <p className='text-muted-foreground leading-relaxed'>{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Core Principles */}
      <section className='py-24 px-6'>
        <div className='max-w-5xl mx-auto space-y-16'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-center'>Core Principles</h2>

          <div className='space-y-12'>
            {[
              {
                title: 'Create a life worth reliving',
                description:
                  "Most people live lives they'd rather forget. We help you create a life so aligned, so purposeful, so fulfilling that you'd gladly live it again and again.",
                image: '/person-journaling-at-sunrise-peaceful-moment.jpg',
              },
              {
                title: "You don't attract what you want — you attract what you are",
                description:
                  "The external world is a mirror of your internal state. Change who you are, and you change what shows up in your life. It's not manifestation. It's alignment.",
                image: '/reflection-in-water-mirror-concept.jpg',
              },
              {
                title: 'The mind creates first. The world follows',
                description:
                  'Everything that exists in the physical world was first created mentally. Your thoughts, beliefs, and mental patterns are the blueprint for your reality.',
                image: '/creative-mind-visualization-concept-art.jpg',
              },
            ].map((principle, index) => (
              <div
                key={principle.title}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className={`space-y-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <h3 className='font-serif text-2xl md:text-3xl font-bold text-balance'>
                    {principle.title}
                  </h3>
                  <p className='text-muted-foreground leading-relaxed'>{principle.description}</p>
                </div>
                <div
                  className={`relative aspect-video bg-muted rounded-lg overflow-hidden ${
                    index % 2 === 1 ? 'md:order-1' : ''
                  }`}
                >
                  <img
                    src={principle.image || '/placeholder.svg'}
                    alt={principle.title}
                    className='w-full h-full object-cover'
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-4xl mx-auto text-center space-y-8'>
          <blockquote className='font-serif text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-balance'>
            "Your frequency determines your reality. Shift your frequency. Shape your future."
          </blockquote>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 px-6'>
        <div className='max-w-3xl mx-auto text-center space-y-6'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold'>Ready to begin?</h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Explore our offerings and find the path that resonates with you.
          </p>
          <div className='pt-6'>
            <Button
              asChild
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground'
            >
              <Link href='/offerings'>
                View Our Offerings
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
