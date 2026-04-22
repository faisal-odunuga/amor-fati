import React from 'react';

const EventsHero = () => {
  return (
    <header className='relative pt-32 pb-16 px-6 bg-background'>
      <div className='max-w-7xl mx-auto'>
        <span className='text-primary font-bold tracking-[0.2em] uppercase text-xs mb-4 block animate-in fade-in slide-in-from-bottom-4 duration-700'>
          Transformation Awaits
        </span>
        <h1 className='text-5xl md:text-7xl font-serif font-extrabold mb-6 max-w-3xl leading-tight animate-in fade-in slide-in-from-bottom-4 duration-700 delay-100'>
          Events & Experience <span className='text-primary'>Gallery</span>
        </h1>
        <p className='text-muted-foreground text-xl max-w-2xl leading-relaxed animate-in fade-in slide-in-from-bottom-4 duration-700 delay-200'>
          Join thousands of high-performers worldwide. From intensive virtual workshops to
          life-changing global retreats, your journey to an extraordinary life starts here.
        </p>
      </div>
    </header>
  );
};

export default EventsHero;
