import React from 'react';
import { bookClubBonuses } from '@/lib/book-club';

const BookClubBonuses = () => {
  return (
    <section className='py-24 bg-background'>
      <div className='max-w-4xl mx-auto px-6'>
        <div className='text-center mb-16'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-4 block'>
            Exclusive Bonuses
          </span>
          <h2 className='text-4xl md:text-5xl font-serif font-black mb-4'>
            Free with Your <span className='italic text-primary'>Membership</span>
          </h2>
          <p className='text-muted-foreground text-lg'>
            Every product on Selar. Every resource Moh has built. Included in your quarterly investment.
          </p>
          <div className='w-24 h-1 bg-primary mx-auto mt-6' />
        </div>

        <div className='space-y-0'>
          {bookClubBonuses.map((bonus) => (
            <div 
              key={bonus.id} 
              className='group flex flex-col md:flex-row md:items-center justify-between py-8 border-b border-border hover:bg-primary/[0.02] transition-colors px-4'
            >
              <div className='flex items-start gap-6 mb-4 md:mb-0'>
                <span className='text-primary font-serif font-black text-sm pt-1'>
                  {bonus.id}
                </span>
                <div>
                  <h3 className='font-serif font-bold text-xl group-hover:text-primary transition-colors'>
                    {bonus.name}
                  </h3>
                  <p className='text-sm text-muted-foreground mt-1'>
                    {bonus.sub}
                  </p>
                </div>
              </div>
              
              <div className='flex flex-row md:flex-col items-center md:items-end gap-3 md:gap-0 pl-11 md:pl-0'>
                <span className='text-xs text-muted-foreground line-through'>
                  {bonus.was}
                </span>
                <span className='text-2xl font-serif font-black text-primary tracking-widest'>
                  FREE
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className='mt-16 bg-foreground text-background p-8 flex flex-col md:flex-row items-center justify-between gap-8'>
          <div>
            <h4 className='font-serif font-black text-2xl uppercase tracking-wider mb-2'>
              Total Value Received
            </h4>
            <p className='text-background/60 text-sm max-w-md'>
              You receive over ₦251,500 in digital products alone — before you count the community, 
              expert sessions, and 3rd wheel access.
            </p>
          </div>
          <div className='text-center md:text-right'>
            <div className='text-4xl font-serif font-black text-primary mb-1'>₦251,500+</div>
            <div className='text-[10px] uppercase tracking-widest font-bold text-background/50'>For only ₦75,000 per quarter</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookClubBonuses;
