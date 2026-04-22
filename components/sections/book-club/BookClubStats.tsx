import React from 'react';
import { bookClubStats } from '@/lib/book-club';

const BookClubStats = () => {
  return (
    <section className='py-16 bg-primary'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='grid grid-cols-2 lg:grid-cols-5 gap-8'>
          {bookClubStats.map((s, idx) => (
            <div 
              key={s.label} 
              className={`text-center ${idx === bookClubStats.length - 1 ? 'col-span-2 lg:col-span-1' : ''}`}
            >
              <p className='text-4xl md:text-5xl font-serif font-black text-primary-foreground mb-1'>
                {s.number}
              </p>
              <p className='text-primary-foreground/70 text-[10px] font-bold uppercase tracking-widest'>
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BookClubStats;
