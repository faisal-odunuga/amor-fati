import React from 'react';
import { bookClubBenefits } from '@/lib/book-club';

const BookClubBenefits = () => {
  return (
    <section id='benefits' className='py-24 bg-background'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            What You Get
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            This Isn't Just a Book Club.
          </h2>
          <p className='text-muted-foreground text-lg max-w-2xl mx-auto'>
            It's a growth infrastructure — built for people who are serious about becoming a
            better version of themselves, one book at a time.
          </p>
          <div className='w-24 h-1 bg-primary mx-auto mt-6' />
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {bookClubBenefits.map((b) => (
            <div
              key={b.title}
              className='p-8 border border-border bg-card hover:border-primary/40 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group'
            >
              <div className='w-12 h-12 bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors'>
                <b.icon className='w-6 h-6 text-primary' />
              </div>
              <h3 className='font-serif font-bold text-xl mb-3'>{b.title}</h3>
              <p className='text-muted-foreground leading-relaxed text-sm'>{b.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookClubBenefits;
