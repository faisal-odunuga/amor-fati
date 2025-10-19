import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { ArrowRight, Book } from 'lucide-react';

const Offerings = () => {
  return (
    <section className='py-32 px-6 bg-secondary/30'>
      <div className='max-w-6xl mx-auto'>
        <div className='text-center space-y-6 mb-16'>
          <div className='inline-flex items-center gap-2 text-accent font-medium'>
            <Book className='h-5 w-5' />
            <span>Offerings</span>
          </div>
          <h2 className='font-serif text-4xl md:text-6xl font-bold text-balance'>
            Tools for transformation
          </h2>
          <p className='text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto'>
            Books, audio programs, retreats, and masterclasses designed to rewire your mind and
            elevate your life.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          <div className='group relative h-64 rounded-xl overflow-hidden'>
            <img
              src='/premium-leather-journal.jpg'
              alt='Books'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end p-6'>
              <p className='font-serif text-2xl font-bold'>Books</p>
            </div>
          </div>
          <div className='group relative h-64 rounded-xl overflow-hidden'>
            <img
              src='/meditation-audio-headphones.jpg'
              alt='Audio Programs'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end p-6'>
              <p className='font-serif text-2xl font-bold'>Audio Programs</p>
            </div>
          </div>
          <div className='group relative h-64 rounded-xl overflow-hidden'>
            <img
              src='/ziba-beach-retreat-vision-board-peaceful-setting.jpg'
              alt='Retreats'
              className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent flex items-end p-6'>
              <p className='font-serif text-2xl font-bold'>Retreats</p>
            </div>
          </div>
        </div>

        <div className='text-center'>
          <Button
            asChild
            size='lg'
            className='bg-accent hover:bg-accent/90 text-accent-foreground group'
          >
            <Link href='/offerings'>
              View All Offerings
              <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Offerings;
