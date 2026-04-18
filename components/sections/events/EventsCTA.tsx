import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const EventsCTA = () => {
  return (
    <section className='py-24 px-6 text-center relative overflow-hidden'>
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none' />
      <div className='max-w-3xl mx-auto relative z-10'>
        <h2 className='text-4xl md:text-6xl font-serif font-extrabold mb-8'>
          Ready to live an extraordinary life?
        </h2>
        <p className='text-xl text-muted-foreground mb-10'>
          Now is your time. Connect with us to learn more about upcoming events and private
          coaching opportunities.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center'>
          <Button className='bg-primary text-primary-foreground px-10 py-7 rounded-full font-bold uppercase tracking-wider hover:scale-105 transition-all shadow-xl shadow-primary/20 text-md'>
            <Link href='#upcoming'>Book Your Seat</Link>
          </Button>
          <Button
            variant='outline'
            className='px-10 py-7 rounded-full font-bold uppercase tracking-wider hover:bg-secondary transition-all text-md border-border'
          >
            <Link href='/contact'>Talk to a Coach</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsCTA;
