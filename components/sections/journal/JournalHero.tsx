import React from 'react';
import { Button } from '../../ui/button';
import Link from 'next/link';

const JournalHero = () => {
  return (
    <section className='relative h-[70vh] flex items-center justify-center overflow-hidden group'>
      <div className='absolute inset-0 z-0'>
        <img
          src='/images/vb-2.jpg'
          alt='Journal Hero'
          className='w-full h-full object-cover grayscale transition-all duration-1000 group-hover:scale-105'
        />
        <div className='absolute inset-0 bg-black/60' />
      </div>

      <div className='relative z-10 max-w-4xl mx-auto px-6 text-center text-white space-y-6'>
        <div className='inline-block px-3 py-1 border border-white/30 text-xs font-bold uppercase tracking-widest backdrop-blur-sm mb-4'>
          Featured Insight
        </div>
        <h1 className='font-serif text-5xl md:text-7xl font-bold leading-tight'>
          The Art of <br /> <span className='italic text-primary'>Strategic Silence.</span>
        </h1>
        <p className='text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed'>
          Why the most powerful people in the room are often the quietest, and how you can wield
          silence as a weapon of influence.
        </p>
        <div className='pt-8'>
          <Button
            asChild
            size='lg'
            className='bg-white text-black hover:bg-primary hover:text-white font-bold uppercase tracking-widest px-10 py-6 h-auto rounded-none transition-all'
          >
            <Link href='/journal/strategic-silence'>Read Article</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JournalHero;
