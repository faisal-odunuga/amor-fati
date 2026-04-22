import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';
import { SiteImage } from '@/components/ui/site-image';

const JournalHero = () => {
  return (
    <section className='relative h-[70vh] flex items-center justify-center overflow-hidden group'>
      <div className='absolute inset-0 z-0'>
        <SiteImage
          src='https://oufksmargaiutcykyjne.supabase.co/storage/v1/object/public/general/vb-2.jpg'
          alt='Journal Hero'
          fill
          priority
          sizes='100vw'
          className='grayscale transition-all duration-1000 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6'>
        <div className='inline-block px-3 py-1 border border-white/30 text-xs font-bold uppercase tracking-widest backdrop-blur-sm mb-4'>
          Featured Insight
        </div>
        <h1 className='font-serif text-4xl sm:text-5xl md:text-7xl font-bold leading-tight'>
          The Art of <br /> <span className='italic text-primary'>Strategic Silence.</span>
        </h1>
        <p className='text-base sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed'>
          Why the most powerful people in the room are often the quietest, and how you can wield
          silence as a weapon of influence.
        </p>
        <div className='pt-8'>
          <Button
            asChild
            size='lg'
            className='w-full sm:w-auto bg-white text-black hover:bg-primary hover:text-white font-bold uppercase tracking-[0.2em] sm:tracking-widest px-6 sm:px-10 py-4 sm:py-6 h-auto rounded-none transition-all'
          >
            <Link href='/journal/strategic-silence'>Read Article</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JournalHero;
