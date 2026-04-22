import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const EventsCTA = () => {
  return (
    <section className='py-24 px-6 text-center relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none' />
      <div className='max-w-3xl mx-auto relative z-10'>
        <h2 className='text-3xl sm:text-4xl md:text-6xl font-serif font-extrabold mb-6 sm:mb-8'>
          Ready to live an extraordinary life?
        </h2>
        <p className='text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10'>
          Now is your time. Connect with us to learn more about upcoming events and private
          coaching opportunities.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button className='w-full sm:w-auto bg-primary text-primary-foreground px-6 sm:px-10 py-4 sm:py-6 rounded-full font-bold uppercase tracking-[0.2em] sm:tracking-wider hover:scale-105 transition-all shadow-xl shadow-primary/20 text-xs sm:text-sm'>
            <Link href='#upcoming'>Book Your Seat</Link>
          </Button>
          <Button
            variant='outline'
            className='w-full sm:w-auto px-6 sm:px-10 py-4 sm:py-6 rounded-full font-bold uppercase tracking-[0.2em] sm:tracking-wider hover:bg-secondary transition-all text-xs sm:text-sm border-border'
          >
            <Link href='/contact'>Talk to a Coach</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsCTA;
