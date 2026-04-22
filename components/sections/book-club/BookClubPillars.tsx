import React from 'react';
import { bookClubPillars } from '@/lib/book-club';

const BookClubPillars = () => {
  return (
    <section className='py-24 bg-card border-y border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            The Reading System
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            Three Pillars. <span className='italic text-primary'>No Exceptions.</span>
          </h2>
          <p className='text-muted-foreground text-lg max-w-3xl mx-auto'>
            The books change every quarter. The structure never does. Skills. Strategy. Autobiography.
          </p>
          <div className='w-24 h-1 bg-primary mx-auto mt-6' />
        </div>

        <div className='grid md:grid-cols-3 gap-12'>
          {bookClubPillars.map((p) => (
            <div key={p.id} className='group'>
              <div className='mb-6'>
                <span className='text-[10px] uppercase tracking-[0.3em] font-bold text-primary block mb-2'>
                  Pillar {p.id} · {p.title}
                </span>
                <h3 className='text-2xl font-serif font-black mb-4 group-hover:text-primary transition-colors'>
                  {p.subtitle}
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed mb-8'>
                  {p.description}
                </p>
              </div>
              
              <div className='p-6 border border-border bg-background group-hover:border-primary/50 transition-all duration-300'>
                <div className='flex items-start gap-4'>
                  <div className='text-4xl filter grayscale group-hover:grayscale-0 transition-all duration-500'>
                    {p.icon}
                  </div>
                  <div>
                    <h4 className='font-serif font-bold text-lg leading-tight'>{p.book}</h4>
                    <p className='text-xs text-muted-foreground italic mt-1'>{p.author}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-20 p-8 border border-primary/20 bg-primary/5 text-center'>
          <p className='text-xl font-serif font-bold text-foreground'>
            Every quarter, new books. Same three pillars.{' '}
            <span className='text-primary'>Skills. Mindset. Autobiography. Every single time.</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default BookClubPillars;
