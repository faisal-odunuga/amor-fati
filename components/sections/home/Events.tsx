import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Events = () => {
  return (
    <section className='py-32 px-6'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='space-y-6 order-2 md:order-1'>
            <div className='inline-flex items-center gap-2 text-accent font-medium'>
              <Calendar className='h-5 w-5' />
              <span>Events</span>
            </div>
            <h2 className='font-serif text-4xl md:text-5xl font-bold text-balance'>
              Transform in community
            </h2>
            <p className='text-lg text-muted-foreground leading-relaxed'>
              Immersive retreats and masterclasses where breakthrough happens. Join others on the
              path to peak performance.
            </p>
            <Button asChild size='lg' variant='outline' className='group bg-transparent'>
              <Link href='/events'>
                See Upcoming Events
                <ArrowRight className='ml-2 h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
            </Button>
          </div>
          <div className='relative h-[500px] rounded-2xl overflow-hidden group order-1 md:order-2'>
            <img
              src='/ziba-beach-retreat-vision-board-peaceful-setting.jpg'
              alt='Events'
              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-background/80 to-transparent' />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
