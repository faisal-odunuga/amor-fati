import React from 'react';
import { Quote, TrendingUp } from 'lucide-react';
import { bookClubStories } from '@/lib/book-club';

const BookClubStories = () => {
  return (
    <section className='py-24 bg-background border-t border-border'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            Member Results
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            Real Stories. Real Results.
          </h2>
          <p className='text-muted-foreground text-lg max-w-xl mx-auto'>
            These aren't testimonials written by a marketing team. These are messages from people
            inside the club.
          </p>
          <div className='w-24 h-1 bg-primary mx-auto mt-6' />
        </div>

        <div className='grid md:grid-cols-3 gap-8'>
          {bookClubStories.map((s) => (
            <div
              key={s.name}
              className='bg-muted/30 p-10 relative group hover:shadow-lg transition-all duration-300'
            >
              <Quote className='text-primary/20 w-12 h-12 absolute top-6 right-6' />
              <div className='inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 text-xs font-bold uppercase tracking-widest mb-6'>
                <TrendingUp className='w-3.5 h-3.5' />
                {s.result}
              </div>
              <p className='italic text-muted-foreground text-base leading-relaxed mb-8 relative z-10'>
                {s.quote}
              </p>
              <div className='flex items-center gap-4 border-t border-border pt-6'>
                <img
                  src={s.avatar}
                  alt={s.name}
                  className='w-14 h-14 rounded-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500'
                  loading='lazy'
                  decoding='async'
                />
                <div>
                  <h4 className='font-bold font-serif'>{s.name}</h4>
                  <p className='text-sm text-muted-foreground'>{s.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookClubStories;
