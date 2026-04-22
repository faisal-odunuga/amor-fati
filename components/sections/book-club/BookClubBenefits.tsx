import React from 'react';
import { bookClubBenefits } from '@/lib/book-club';

const BookClubBenefits = () => {
  return (
    <section id='benefits' className='py-24 bg-background'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            What's Inside
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            Everything you need <span className='italic text-primary'>to force growth.</span>
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            The Amor Fati Book Club is a system built to force your development. Here's everything waiting on the other side of your investment.
          </p>
          <div className='w-24 h-1 bg-primary mx-auto mt-6' />
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {bookClubBenefits.map((b) => (
            <div
              key={b.title}
              className='p-8 border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group relative'
            >
              <div className='w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors'>
                <b.icon className='w-6 h-6 text-primary' />
              </div>
              <h3 className='font-serif font-bold text-xl mb-3'>{b.title}</h3>
              <p className='text-muted-foreground leading-relaxed text-sm mb-4'>{b.description}</p>
              {b.tag && (
                <span className='inline-block text-[10px] uppercase tracking-widest font-bold text-primary border border-primary/30 px-2 py-1'>
                  {b.tag}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookClubBenefits;
