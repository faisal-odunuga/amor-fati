import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { ArrowRight, Play } from 'lucide-react';

const Hero = () => {
  return (
    <section className='relative h-screen flex items-center overflow-hidden bg-background'>
      {/* Background Image */}
      <div className='absolute inset-0 z-0'>
        <img
          src='/images/fire.jpg'
          alt='High performance professional'
          className='w-full h-full object-cover opacity-40'
        />
        <div className='absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-6 pt-20 w-full'>
        <div className='max-w-3xl animate-in fade-in slide-in-from-bottom-8 duration-1000'>
          <span className='text-primary font-bold tracking-[0.3em] uppercase mb-4 block'>
            Redefining Potential
          </span>
          <h1 className='text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-foreground mb-8 leading-tight'>
            Mastery of the <br /> <span className='italic text-primary'>Unconquerable</span> Mind.
          </h1>
          <p className='text-lg md:text-xl text-muted-foreground mb-10 max-w-xl leading-relaxed'>
            A premium ecosystem for those who demand more. We don't just coach performance; we
            architect legacies through the lens of modern stoicism.
          </p>
          <div className='flex flex-wrap gap-6'>
            <Button
              asChild
              size='lg'
              className='bg-primary text-primary-foreground px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:scale-105 transition-transform rounded-none'
            >
              <Link href='/offerings'>Explore Programs</Link>
            </Button>
            <Button
              asChild
              variant='outline'
              size='lg'
              className='border-primary/30 text-foreground px-10 py-6 h-auto text-sm font-bold uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-all rounded-none'
            >
              <Link href='/philosophy'>
                Watch Manifesto <Play className='ml-2 w-4 h-4' />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className='absolute bottom-12 right-12 hidden lg:flex items-center gap-4 text-muted-foreground text-xs tracking-widest uppercase animate-in fade-in duration-1000 delay-500'>
        <span>Scroll to explore</span>
        <div className='w-px h-12 bg-primary/50' />
      </div>
    </section>
  );
};

export default Hero;
