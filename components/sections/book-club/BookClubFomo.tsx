import React from 'react';
import Link from 'next/link';
import { AlertCircle, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JOIN_URL } from '@/lib/book-club';

const BookClubFomo = () => {
  return (
    <section className='py-24 bg-secondary/30'>
      <div className='max-w-7xl mx-auto px-6'>
        <div className='flex flex-col items-center text-center mb-20'>
          <span className='text-primary font-bold tracking-[0.35em] uppercase text-sm mb-6 flex items-center gap-2'>
            <AlertCircle className='w-4 h-4' /> Read This Carefully
          </span>
          <h2 className='text-5xl md:text-7xl font-serif font-black leading-tight mb-8 text-foreground uppercase'>
            While You're Thinking — <br /><span className='italic text-primary'>Someone Else Paid.</span>
          </h2>
          <div className='text-lg text-muted-foreground max-w-2xl leading-relaxed space-y-6'>
            <p>
              There are only <span className='text-foreground font-bold'>300 seats</span> this quarter. And out of those 300, only the first <span className='text-primary font-bold'>100 people</span> get their name on a wall that will outlive all of us.
            </p>
            <p className='italic font-serif text-xl border-y border-border py-6'>
              Imagine explaining to your children in 10 years that you were Seat 47 — the community that was the start of everything. Or imagine explaining why you scrolled past it.
            </p>
          </div>
        </div>

        <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20'>
          {[
            { n: '300', l: 'Seats. This Quarter Only.' },
            { n: '100', l: 'Names on the Wall. Forever.' },
            { n: '₦251k+', l: 'Value. You Pay ₦75k.' },
            { n: '1', l: 'Decision. Between You and Your Old Life.' },
          ].map((item, idx) => (
            <div key={idx} className='p-8 border border-border bg-card text-center group hover:border-primary transition-colors'>
              <div className='text-4xl font-serif font-black mb-2 group-hover:text-primary transition-colors'>{item.n}</div>
              <div className='text-[10px] uppercase tracking-widest text-muted-foreground font-bold leading-tight'>{item.l}</div>
            </div>
          ))}
        </div>

        <div className='text-center'>
          <p className='text-2xl font-serif italic text-primary mb-2'>
            The people who changed their lives didn't wait for the right time.
          </p>
          <p className='text-muted-foreground text-sm uppercase tracking-widest font-bold'>
            They just moved. The right time was yesterday. The next best time is right now.
          </p>
          
          <Button
            asChild
            size='lg'
            className='mt-10 bg-primary text-primary-foreground px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all rounded-none'
          >
            <Link href={JOIN_URL} target='_blank' rel='noopener noreferrer'>
              Lock in Your Seat Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BookClubFomo;
