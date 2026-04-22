'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { JOIN_URL } from '@/lib/book-club';

const BookClubCTA = () => {
  const [taken, setTaken] = useState(25);
  const total = 300;

  useEffect(() => {
    // Tick up slowly like in the HTML
    const timer = setInterval(() => {
      setTaken(prev => {
        if (prev >= 298) return prev;
        return prev + 1;
      });
    }, 45000 + Math.random() * 90000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className='py-32 bg-background text-foreground relative overflow-hidden text-center'>
      <div className='max-w-4xl mx-auto px-6 relative z-10'>
        <div className='inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] mb-12 animate-pulse'>
          <span className='w-2 h-2 rounded-full bg-primary-foreground animate-ping' />
          LIVE — {taken} SEATS TAKEN · {total - taken} REMAINING
        </div>

        <h2 className='text-5xl md:text-8xl font-serif font-black leading-[0.9] mb-8 uppercase'>
          This is <br />
          <span className='italic text-primary'>your sign.</span>
        </h2>

        <p className='text-muted-foreground text-lg mb-12 max-w-xl mx-auto leading-relaxed'>
          Stop scrolling. Stop almost-ing. Stop letting the fear of changing keep you in a life that isn't growing. 
          Your name belongs on that wall. Your goals deserve a system.
        </p>

        <div className='p-10 border-4 border-primary bg-primary/[0.03] mb-12 relative group'>
          <div className='absolute -top-4 left-1/2 -translate-x-1/2 bg-background px-4 text-[10px] font-bold tracking-[0.3em] text-primary uppercase'>
            How to Join
          </div>
          <p className='font-serif font-bold text-2xl mb-4'>
            Join immediately to pay and <br /> lock in your seat.
          </p>
          <div className='text-7xl md:text-9xl font-serif font-black text-primary leading-none mb-6 group-hover:scale-105 transition-transform duration-500'>
            NOW
          </div>
          <p className='text-xs text-muted-foreground uppercase tracking-widest font-bold'>
            One decision. Three months. A different you.
          </p>
        </div>

        <div className='flex flex-wrap items-center justify-center gap-8 mb-12 border-y border-border py-8'>
          <div className='text-center'>
            <div className='text-4xl font-serif font-black text-primary'>₦75,000</div>
            <div className='text-[10px] uppercase tracking-widest text-muted-foreground font-bold'>Quarterly · One Payment</div>
          </div>
          <div className='text-2xl font-serif font-black text-muted-foreground/30 italic'>VS</div>
          <div className='text-center'>
            <div className='text-4xl font-serif font-black text-muted-foreground line-through'>₦251,500+</div>
            <div className='text-[10px] uppercase tracking-widest text-muted-foreground font-bold'>Total Value Included</div>
          </div>
        </div>

        <Button
          asChild
          size='lg'
          className='bg-primary text-primary-foreground px-16 py-8 h-auto text-base font-black uppercase tracking-widest hover:brightness-110 hover:scale-105 transition-all rounded-none shadow-2xl shadow-primary/20 mb-8'
        >
          <Link href={JOIN_URL} target='_blank' rel='noopener noreferrer'>
            Lock in Your Seat <ArrowRight className='ml-3 w-5 h-5' />
          </Link>
        </Button>
        
        <p className='text-primary text-[10px] font-bold uppercase tracking-[0.2em]'>
          🔴 300 seats total · Only 100 on the wall · Once it's full, it's full.
        </p>
      </div>
    </section>
  );
};

export default BookClubCTA;
