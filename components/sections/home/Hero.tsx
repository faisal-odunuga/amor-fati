import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <section className='relative h-screen flex items-center justify-center overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <img
          src='/cinematic-nature-scene-with-person-in-meditation-o.jpg'
          alt='Hero background'
          className='w-full h-full object-cover opacity-40'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto px-6 text-center space-y-8'>
        <h1 className='font-serif text-5xl md:text-7xl lg:text-8xl font-bold leading-tight text-balance animate-in fade-in slide-in-from-bottom-4 duration-1000'>
          Create a life worth reliving
        </h1>
        <p className='text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200'>
          Where mindset meets manifestation. Realign your mind for peak performance and personal
          evolution.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500'>
          <Button asChild size='lg' className='bg-accent hover:bg-accent/90 text-accent-foreground'>
            <Link href='/philosophy'>
              Discover Our Philosophy
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
          <Button asChild size='lg' variant='outline'>
            <Link href='/contact'>Start Your Journey</Link>
          </Button>
        </div>
      </div>

      <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
        <div className='w-6 h-10 border-2 border-foreground/30 rounded-full flex items-start justify-center p-2'>
          <div className='w-1 h-3 bg-foreground/30 rounded-full' />
        </div>
      </div>
    </section>
  );
};

export default Hero;
