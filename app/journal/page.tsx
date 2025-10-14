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
            <CardContent className='space-y-4'>
              <p className='text-center text-muted-foreground leading-relaxed'>
                Weekly insights on personal growth, philosophy, and creating a life worth reliving.
                No fluff, just substance.
              </p>
              <form className='flex gap-3'>
                <Input type='email' placeholder='Enter your email' className='flex-1' />
                <Button
                  type='submit'
                  className='bg-accent hover:bg-accent/90 text-accent-foreground'
                >
                  Subscribe
                  <ArrowRight className='ml-2 h-4 w-4' />
                </Button>
              </form>
              <p className='text-xs text-center text-muted-foreground'>
                Join 2,000+ readers. Unsubscribe anytime.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Articles */}
      <section className='py-24 px-6'>
        <div className='max-w-4xl mx-auto space-y-12'>
          <div className='flex items-center gap-3 text-muted-foreground'>
            <BookOpen className='h-5 w-5' />
            <span className='text-sm font-medium'>Latest Articles</span>
          </div>

          <div className='space-y-8'>
            {articles.map((article) => (
              <Link key={article.slug} href={`/journal/${article.slug}`}>
                <Card className='border-border hover:border-accent transition-colors cursor-pointer group'>
                  <CardHeader>
                    <div className='flex items-center gap-3 text-sm text-muted-foreground mb-3'>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <CardTitle className='font-serif text-3xl group-hover:text-accent transition-colors'>
                      {article.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-muted-foreground leading-relaxed'>{article.excerpt}</p>
                    <div className='mt-4 flex items-center gap-2 text-accent font-medium'>
                      Read more
                      <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className='py-24 px-6 bg-secondary/30'>
        <div className='max-w-4xl mx-auto space-y-8'>
          <h2 className='font-serif text-3xl md:text-4xl font-bold text-center'>
            Explore by Topic
          </h2>
          <div className='flex flex-wrap justify-center gap-3'>
            {[
              'Philosophy',
              'Personal Growth',
              'Confidence',
              'Vision',
              'Mindset',
              'Transformation',
              'Self-Mastery',
              'Purpose',
            ].map((topic) => (
              <Button key={topic} variant='outline' className='rounded-full bg-transparent'>
                {topic}
              </Button>
            ))}
          </div>
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
