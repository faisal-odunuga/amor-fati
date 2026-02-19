import React from 'react';
import { Button } from '../../ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const ProgramHero = () => {
  return (
    <section className='relative h-[70vh] flex items-center justify-center text-center text-white px-4 overflow-hidden'>
      <div className='absolute inset-0 z-0'>
        <img
          src='https://res.cloudinary.com/dfrvta0t5/image/upload/v1771457800/JIO_6313_haayda.jpg'
          alt='Hero background'
          className='w-full h-full object-cover opacity-60'
        />
        <div className='absolute inset-0 bg-gradient-to-b from-black/60 to-black/80' />
      </div>

      <div className='relative z-10 max-w-4xl space-y-6'>
        <h4 className='text-primary font-bold uppercase tracking-[0.3em] mb-4 text-sm animate-in fade-in slide-in-from-bottom-4 duration-1000'>
          Design Your Destiny
        </h4>
        <h1 className='text-5xl md:text-7xl font-serif font-black mb-6 leading-tight animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200'>
          MASTER EVERY AREA <br /> OF YOUR LIFE
        </h1>
        <p className='text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto font-light leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400'>
          The world's #1 coaching platform for peak performance, emotional mastery, and wealth
          creation.
        </p>
        <div className='flex flex-col sm:flex-row justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-600'>
          <Button
            size='lg'
            className='bg-primary hover:brightness-110 text-primary-foreground font-bold uppercase tracking-widest px-10 py-6 h-auto rounded-none'
          >
            Start Your Journey
          </Button>
          <Button
            size='lg'
            variant='outline'
            className='bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-widest hover:bg-white/20 px-10 py-6 h-auto rounded-none'
          >
            View All Offerings
          </Button>
        </div>
      </div>
    </section>
  );
};

export const Stats = () => {
  return (
    <section className='py-12 bg-background border-b border-border'>
      <div className='max-w-7xl mx-auto px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8 items-center text-center'>
          <div>
            <div className='text-3xl font-black text-primary font-serif'>400k+</div>
            <div className='text-xs uppercase tracking-widest font-bold opacity-60'>
              Lives Impacted
            </div>
          </div>
          <div>
            <div className='text-3xl font-black text-primary font-serif'>10+</div>
            <div className='text-xs uppercase tracking-widest font-bold opacity-60'>Countries</div>
          </div>
          <div>
            <div className='text-3xl font-black text-primary font-serif'>5+</div>
            <div className='text-xs uppercase tracking-widest font-bold opacity-60'>
              Best Sellers
            </div>
          </div>
          <div>
            <div className='text-3xl font-black text-primary font-serif'>4.9/5</div>
            <div className='text-xs uppercase tracking-widest font-bold opacity-60'>
              Member Rating
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProgramHero;
