import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const Newsletter = () => {
  return (
    <section className='relative py-40 overflow-hidden bg-background border-t border-border'>
      <div className='absolute inset-0 bg-muted/20' />
      <div className='absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] border border-primary/5 rounded-full' />

      <div className='relative z-10 max-w-4xl mx-auto px-6 text-center'>
        <h2 className='text-5xl md:text-7xl font-serif font-bold text-foreground mb-8'>
          Ready to live an extraordinary life?
        </h2>
        <p className='text-xl text-muted-foreground mb-12'>
          The journey to peak performance starts with a single decision. Apply for our next
          intensive.
        </p>
        <div className='flex flex-col md:flex-row gap-6 justify-center'>
          <Button
            asChild
            size='lg'
            className='bg-primary text-primary-foreground px-12 py-8 h-auto text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-none'
          >
            <Link href='/offerings'>Start Your Application</Link>
          </Button>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='border-primary/30 text-foreground px-12 py-8 h-auto text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all rounded-none'
          >
            <Link href='/contact'>Talk to a Coach</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
