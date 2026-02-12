'use client';

import React from 'react';

const CoachProfile = () => {
  return (
    <header className='pt-32 pb-20 px-6'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
        <div className='relative group'>
          <div className='absolute -inset-4 bg-primary/10 rounded-lg -z-10 transition-transform group-hover:scale-105'></div>
          <img
            alt='Professional portrait of the MOH'
            className='w-full aspect-[4/5] object-cover rounded shadow-2xl grayscale hover:grayscale-0 transition-all duration-700'
            src='/images/moh-sheriff.jpeg'
            onError={(e) => (e.currentTarget.style.display = 'none')}
          />
          <div className='absolute bottom-8 left-8 bg-background p-6 shadow-xl max-w-xs border border-border'>
            <p className='text-xs uppercase tracking-widest text-primary font-bold mb-2'>
              Master Coach
            </p>
            <h2 className='font-serif italic text-2xl'>Sheriff Muhammad</h2>
          </div>
        </div>
        <div>
          <span className='text-primary font-bold tracking-[0.3em] uppercase text-xs mb-4 block'>
            Meet the Founder
          </span>
          <h1 className='text-5xl md:text-7xl font-serif mb-8 leading-tight'>
            Empowering leaders to reach{' '}
            <span className='italic text-muted-foreground'>unseen potential.</span>
          </h1>
          <div className='space-y-6 text-muted-foreground text-lg leading-relaxed'>
            <p>
              Sheriff Muhammad is the founder of Amor Fati, a human potential teacher and confidence
              coach. His work explores mindset, manifestation, and the psychology of high
              performance.
            </p>
            <p>
              As a Youth Ambassador for the Lagos State Government, Sheriff combines philosophical
              wisdom with practical strategies to help individuals and organizations achieve
              breakthrough results.
            </p>
            <p>
              His approach is grounded in the belief that confidence is not built, it's uncovered.
              That clarity is not found, it's created. And that the life you want is not out there,
              it's within you, waiting to be realized.
            </p>
            <div className='flex gap-12 pt-8'>
              <div>
                <p className='text-3xl font-serif text-foreground'>15k+</p>
                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                  Lives Impacted
                </p>
              </div>
              <div>
                <p className='text-3xl font-serif text-foreground'>5+</p>
                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                  Years Experience
                </p>
              </div>
              <div>
                <p className='text-3xl font-serif text-foreground'>500+</p>
                <p className='text-xs uppercase tracking-widest text-muted-foreground'>
                  Keynote Events
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CoachProfile;
