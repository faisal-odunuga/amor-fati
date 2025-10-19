import { ArrowRight, Compass } from 'lucide-react';
import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const Philosophy = () => {
  return (
    <section className='py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='relative h-[500px] rounded-2xl overflow-hidden group'>
            <img
              src='/person-journaling-at-sunrise-peaceful-moment.jpg'
              alt='Philosophy'
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
          </div>
          <div className='space-y-6'>
            <div className='inline-flex items-center gap-2 text-accent font-medium'>
              <Compass className='h-5 w-5' />
              <span>Philosophy</span>
            </div>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
              Believe. Begin. Breakthrough. Become.
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              A proven framework for transformation. Four stages that shift how you think, act, and
              show up.
            </p>
            <Button
              asChild
              size='lg'
              className='bg-primary hover:bg-primary/90 text-primary-foreground group'
            >
              <Link href='/philosophy'>
                Explore the Framework
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
