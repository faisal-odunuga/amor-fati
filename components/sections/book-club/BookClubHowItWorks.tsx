import React from 'react';
import { bookClubSteps } from '@/lib/book-club';

const BookClubHowItWorks = () => {
  return (
    <section className='py-24 bg-foreground text-background'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            Simple. Powerful. Consistent.
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black text-white'>
            How the Club Works
          </h2>
        </div>
        <div className='grid md:grid-cols-4 gap-8'>
          {bookClubSteps.map((item) => (
            <div key={item.step} className='text-center'>
              <div className='text-primary/20 font-serif font-black text-6xl mb-4 leading-none'>
                {item.step}
              </div>
              <div className='w-12 h-12 bg-primary/10 flex items-center justify-center mx-auto mb-4'>
                <item.icon className='w-6 h-6 text-primary' />
              </div>
              <h3 className='font-serif font-bold text-xl text-white mb-3'>{item.title}</h3>
              <p className='text-white/50 text-sm leading-relaxed'>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookClubHowItWorks;
