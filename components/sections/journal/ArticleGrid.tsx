import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';

const articles = [
  {
    title: 'Beyond Motivation: The Discipline of Destiny',
    category: 'Mindset',
    date: 'October 12, 2024',
    image:
      'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800',
    excerpt:
      'Motivation is a feeling. Discipline is a command. Learn how to operate from a place of resolve, regardless of your emotional state.',
    slug: 'beyond-motivation',
  },
  {
    title: 'The Mirror Principal: Reality Reflects You',
    category: 'Philosophy',
    date: 'October 05, 2024',
    image:
      'https://images.unsplash.com/photo-1518655048521-f130df041f66?auto=format&fit=crop&q=80&w=800',
    excerpt:
      'Stop trying to change the reflection without changing the face. Your external world is a perfect mirror of your internal condition.',
    slug: 'mirror-principal',
  },
  {
    title: 'Killing the Imposter',
    category: 'Psychology',
    date: 'September 28, 2024',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    excerpt:
      "Imposter syndrome isn't humility. It's a refusal to own your power. Here is the framework to dismantle it for good.",
    slug: 'killing-imposter',
  },
  {
    title: 'Deep Work in a Distracted World',
    category: 'Productivity',
    date: 'September 15, 2024',
    image:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=800',
    excerpt:
      'Focus is the new IQ. In an economy of distraction, the ability to go deep is a superpower. Here is how to cultivate it.',
    slug: 'deep-work',
  },
];

const ArticleGrid = () => {
  return (
    <section className='py-24 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex justify-between items-end mb-16'>
          <div>
            <h2 className='text-sm font-bold tracking-[0.4em] uppercase text-primary mb-4'>
              The Archive
            </h2>
            <h3 className='font-serif text-4xl md:text-5xl font-bold'>Latest Insights</h3>
          </div>
          <div className='hidden md:block'>
            <Button variant='link' className='text-primary decoration-primary/30'>
              View All <ArrowRight className='ml-2 w-4 h-4' />
            </Button>
          </div>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-2 gap-x-12 gap-y-16'>
          {articles.map((article, index) => (
            <div key={index} className='group cursor-pointer'>
              <div className='relative aspect-[16/9] overflow-hidden mb-6 bg-muted'>
                <img
                  src={article.image}
                  alt={article.title}
                  className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0'
                />
                <div className='absolute top-4 left-4 bg-background/90 backdrop-blur px-3 py-1 text-xs font-bold uppercase tracking-widest border border-border'>
                  {article.category}
                </div>
              </div>
              <div className='space-y-3'>
                <div className='text-xs font-bold uppercase tracking-widest text-muted-foreground'>
                  {article.date}
                </div>
                <h3 className='font-serif text-3xl font-bold group-hover:text-primary transition-colors leading-tight'>
                  <Link href={`/journal/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className='text-muted-foreground leading-relaxed text-lg'>{article.excerpt}</p>
                <div className='pt-2'>
                  <span className='text-sm font-bold uppercase tracking-widest border-b border-primary/30 pb-1 group-hover:border-primary transition-colors'>
                    Read More
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 text-center md:hidden'>
          <Button variant='outline' className='w-full'>
            View All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ArticleGrid;
