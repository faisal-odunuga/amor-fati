import React from 'react';
import Link from 'next/link';
import { Button } from '../../ui/button';
import { ArrowRight } from 'lucide-react';
import { SiteImage } from '@/components/ui/site-image';

import { articles } from '@/utils/journal';

const ArticleGrid = () => {
  return (
    <section className='py-24 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <div className='flex flex-col md:flex-row justify-between md:items-end mb-12 sm:mb-16 gap-4'>
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
                <SiteImage
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes='(min-width: 1024px) 45vw, 100vw'
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
