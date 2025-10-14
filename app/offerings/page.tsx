import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Book, Headphones, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { siteMetadata } from '@/lib/metadata';
import { Metadata } from 'next';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Offerings',
  description:
    'Explore Amor Fati programs — The 11 Letters Book, 21-Day Brain Rewiring Audio Experience, and Realign Vision Board Retreat — designed to unlock peak alignment.',
};

export default function OfferingsPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            Our Offerings
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Tools for mental mastery. These are not products — they're portals.
          </p>
        </div>
      </section>

      {/* Tagline */}
      <section className='py-12 px-6 bg-secondary/30'>
        <div className='max-w-3xl mx-auto text-center'>
          <p className='font-serif text-2xl md:text-3xl font-light text-balance'>
            Shift your frequency. Shape your future.
          </p>
        </div>
      </section>

      {/* For Individuals */}
      <section className='py-24 px-6'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <div className='space-y-4'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold'>For Individuals</h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Personal transformation tools designed for deep inner work.
            </p>
          </div>

          <div className='grid md:grid-cols-3 gap-8'>
            {[
              {
                icon: Book,
                title: 'The 11 Letters Book',
                description:
                  'A collection of profound letters exploring mindset, belief, and the art of creating a life worth reliving. Each letter is a portal to deeper self-understanding.',
                cta: 'Get the Book',
                href: '/shop',
              },
              {
                icon: Headphones,
                title: '21-Day Brain Rewiring Audio Experience',
                description:
                  'A transformative audio journey designed to reprogram limiting beliefs and install empowering mental patterns. Daily sessions for 21 days of deep mental realignment.',
                cta: 'Start Your Journey',
                href: '/shop',
              },
              {
                icon: Sparkles,
                title: 'Realign Vision Board Retreat',
                description:
                  "An immersive experience at Ziba Beach where you'll clarify your vision, realign your energy, and create a powerful visual representation of your future self.",
                cta: 'Join the Retreat',
                href: '/events',
              },
            ].map((offering) => (
              <Card
                key={offering.title}
                className='border-border hover:border-accent transition-colors'
              >
                <CardHeader>
                  <div className='w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-4'>
                    <offering.icon className='h-6 w-6 text-accent' />
                  </div>
                  <CardTitle className='font-serif text-2xl'>{offering.title}</CardTitle>
                </CardHeader>
                <CardContent className='space-y-4'>
                  <CardDescription className='text-muted-foreground leading-relaxed'>
                    {offering.description}
                  </CardDescription>
                  <Button asChild variant='outline' className='w-full bg-transparent'>
                    <Link href={offering.href}>
                      {offering.cta}
                      <ArrowRight className='ml-2 h-4 w-4' />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* For Teams & Schools */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-6xl mx-auto space-y-12'>
          <div className='space-y-4'>
            <h2 className='font-serif text-3xl md:text-4xl font-bold'>For Teams & Schools</h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Transformative experiences for organizations and educational institutions.
            </p>
          </div>

          <Card className='border-border'>
            <CardHeader>
              <div className='flex items-start gap-6'>
                <div className='w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0'>
                  <Users className='h-8 w-8 text-accent' />
                </div>
                <div className='space-y-2'>
                  <CardTitle className='font-serif text-3xl'>
                    Overconfidence 101 Masterclass
                  </CardTitle>
                  <CardDescription className='text-lg'>
                    90-minute peak performance session
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className='space-y-6'>
              <p className='text-muted-foreground leading-relaxed'>
                A high-energy, transformative masterclass designed to unlock unshakeable confidence
                in your team or students. Through interactive exercises, powerful frameworks, and
                real-world applications, participants learn to:
              </p>
              <ul className='space-y-2 text-muted-foreground'>
                <li className='flex items-start gap-2'>
                  <span className='text-accent mt-1'>•</span>
                  <span>Identify and eliminate limiting beliefs that hold them back</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-accent mt-1'>•</span>
                  <span>Build authentic confidence rooted in self-knowledge</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-accent mt-1'>•</span>
                  <span>Develop mental resilience for high-pressure situations</span>
                </li>
                <li className='flex items-start gap-2'>
                  <span className='text-accent mt-1'>•</span>
                  <span>Create actionable plans for immediate implementation</span>
                </li>
              </ul>
              <div className='pt-4'>
                <Button
                  asChild
                  size='lg'
                  className='bg-accent hover:bg-accent/90 text-accent-foreground'
                >
                  <Link href='/contact'>
                    Book a Masterclass
                    <ArrowRight className='ml-2 h-4 w-4' />
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-24 px-6'>
        <div className='max-w-3xl mx-auto text-center space-y-6'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold'>Ready to transform?</h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Choose the path that resonates with where you are and where you want to go.
          </p>
          <div className='flex flex-col sm:flex-row gap-4 justify-center pt-6'>
            <Button
              asChild
              size='lg'
              className='bg-primary hover:bg-primary/90 text-primary-foreground'
            >
              <Link href='/shop'>
                Browse Products
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
            <Button asChild size='lg' variant='outline'>
              <Link href='/contact'>Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
