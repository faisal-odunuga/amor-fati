import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, BookOpen, Mail } from 'lucide-react';
import Link from 'next/link';
import { siteMetadata } from '@/lib/metadata';
import { Metadata } from 'next';
import { articles } from '@/lib/data';

export const metadata: Metadata = {
  ...siteMetadata,
  title: 'Journal & Newsletter',
  description:
    'Read reflections on growth, belief, and alignment from Amor Fati. Subscribe to the newsletter and receive weekly letters from Sheriff Muhammad.',
};

export default function JournalPage() {
  return (
    <main className='min-h-screen pt-20'>
      {/* Hero Section */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto text-center space-y-6'>
          <h1 className='font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-balance'>
            Journal
          </h1>
          <p className='text-xl text-muted-foreground leading-relaxed'>
            Thoughts on transformation, philosophy, and the art of living intentionally.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className='py-16 px-6 bg-secondary/30'>
        <div className='max-w-2xl mx-auto'>
          <Card className='border-border'>
            <CardHeader className='text-center'>
              <div className='mx-auto mb-4 h-12 w-12 rounded-full bg-accent/10 flex items-center justify-center'>
                <Mail className='h-6 w-6 text-accent' />
              </div>
              <CardTitle className='font-serif text-2xl'>Subscribe to the Newsletter</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-col items-center space-y-4'>
                <p className='text-center text-muted-foreground leading-relaxed'>
                  Weekly insights on personal growth, philosophy, and creating a life worth
                  reliving. No fluff, just substance.
                </p>
                <a href='https://mohsheriff.substack.com/subscribe' target='_blank'>
                  <Button
                    type='submit'
                    size='lg'
                    className='bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-105'
                  >
                    Subscribe
                  </Button>
                </a>
                <p className='text-xs text-center text-muted-foreground'>
                  Join 2,000+ readers. Unsubscribe anytime.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className='py-24 px-6'>
        <div className='max-w-3xl mx-auto text-center space-y-6'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold'>Ready to transform?</h2>
          <p className='text-lg text-muted-foreground leading-relaxed'>
            Explore our offerings and find the right path for your journey.
          </p>
          <div className='pt-6'>
            <Button
              asChild
              size='lg'
              className='bg-accent hover:bg-accent/90 text-accent-foreground'
            >
              <Link href='/offerings'>
                View Offerings
                <ArrowRight className='ml-2 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
