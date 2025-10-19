import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

const Newsletter = () => {
  return (
    <section className='py-32 px-6 bg-accent/5'>
      <div className='max-w-3xl mx-auto text-center space-y-8'>
        <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
          Join our newsletter
        </h2>
        <p className='text-xl text-muted-foreground leading-relaxed'>
          Weekly insights on transformation, philosophy, and living intentionally. No fluff—just
          substance that shifts perspective.
        </p>

        <a href='https://mohsheriff.substack.com/subscribe' target='_blank'>
          <Button
            type='submit'
            size='lg'
            className='bg-accent hover:bg-accent/90 text-accent-foreground transition-all duration-300 hover:scale-105'
          >
            Subscribe
          </Button>
        </a>
        <p className='text-sm text-muted-foreground'>
          Join 1,000+ readers committed to creating a life worth reliving.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
